import React, { useState, useEffect } from "react";
import clsx from "clsx";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Menu,
  Slide,
  Grow,
  TextField,
  Button,
} from "@material-ui/core";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import {
  FeaturedEvents,
  FeaturedEventMobileView,
  UpcomingEvents,
} from "./allItems";
import { countries } from "../countries/countries";
import { states } from "../countries/nigeria";
import {
  getAllApprovedEvents,
  getAllEventsCategories,
  getEventByCategoryId,
  getEventByTwoDate,
  getEventByLocation,
} from "../../src/services/eventServices";
import { allEvents } from "../data/data";

function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
}
const useStyles = makeStyles((theme) => ({
  root: {
    margin: 20,
  },
  option: {
    fontSize: 12,
    "& > span": {
      marginRight: 10,
      fontSize: 12,
    },
  },
  explore: {
    backgroundImage: "url('/images/explore2.png')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: 259,
    //borderRadius:14,
    padding: 40,
    color: "#fff",
    [theme.breakpoints.down("xs")]: {
      height: 355,
    },
  },
  formControl: {
    width: "100%",
    color: "#fff",
    "& .MuiSelect-selectMenu": {
      color: "#fff",
    },
    "& .MuiSelect-icon": {
      color: "#fff",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "2px solid #fff",
    },
    //float:'right'
  },
  location: {
    width: "76%",
    color: "#fff",
    "& .MuiSelect-selectMenu": {
      color: "#fff",
    },
    "& .MuiSelect-icon": {
      color: "#fff",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "2px solid #fff",
    },
  },
  btn: { 
    backgroundColor: "white",
     fontSize: 12 ,
      textTransform:'none',
      width:80
    },
  selectContainer: {
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    borderRight: "1px solid #fff",
    color: "#fff",
    //width:'80%'
  },
  selectContainerText: {
    // paddingTop: 10,
    // paddingBottom: 20,
  },
  dflex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  period: {
    width: "80%",
  },
  search: {
    width: 50,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    cursor: "pointer",
  },
  events: {
    marginTop: 20,
  },
}));

const EventSection = () => {
  const checked = true;
  const [category, setCategory] = useState("Browse category");
  const [location, setLocation] = useState("Select State");
  const [country, setCountry] = useState("Choose a Country");
  const [period, setPeriod] = useState("Choose Period");
  const matches = useMediaQuery("(min-width:600px)");
  const [isNigeria, setIsNigeria] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [lisetedCategories, setListedCategories] = useState([]);
  const [content, setContent] = useState({
    country: "Nigeria",
    state: "",
  });

  const getSearchedDate = (numWeeks) => {
    let now = new Date();
    now.setDate(now.getDate() + numWeeks * 7);
    var month = now.getUTCMonth() + 1; //months from 1-12
    var day = now.getUTCDate();
    var year = now.getUTCFullYear();

    const newdate = year + "/" + month + "/" + day;
    return newdate;
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleLocationChange = (e) => {
    const { value } = e.target;
    setLocation(value);
    content.country = "Nigeria";
    content.state = value;
  };
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };
  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);

    // console.log(category);
  };

  const getAllEvents = async () => {
    setLoading(true);
    const response = await getAllApprovedEvents();
    if (response && response.data) {
      setLoading(response.isLoading);
      setMessage(response.message);
      setData(
        response.data.map((event) => {
          return {
            id: event.id,
            slug: event.slug,
            image: event.event_banner,
            title: event.event_title,
            content: event.event_summary,
            type_of_event: event.type_of_event,
            eventCategory: event.eventCategory.name,
            date: event.starting_date,
          };
        })
      );
    }
  };

  const getEventsByCategory = async (id) => {
    setLoading(true);
    const response = await getEventByCategoryId(id);
    if (response && response.data) {
      setLoading(response.isLoading);
      setMessage(
        response.data > 0
          ? response.message
          : "No event was found in this category"
      );
      setData(
        response.data.map((event) => {
          return {
            id: event.id,
            slug: event.slug,
            image: event.event_banner,
            title: event.event_title,
            content: event.event_summary,
            type_of_event: event.type_of_event,
            eventCategory: event.eventCategory.name,
            date: event.starting_date,
          };
        })
      );
    }
  };

  const getEventsByEventLocation = async (data) => {
    setLoading(true);
    const response = await getEventByLocation(data);
    if (response && response.data) {
      setLoading(response.isLoading);
      setMessage(
        response.data > 0
          ? response.message
          : "No event was found in this Location"
      );
      setData(
        response.data.map((event) => {
          return {
            id: event.id,
            slug: event.slug,
            image: event.event_banner,
            title: event.event_title,
            content: event.event_summary,
            type_of_event: event.type_of_event,
            eventCategory: event.eventCategory.name,
            date: event.starting_date,
          };
        })
      );
    }
  };

  const getEventsByDates = async (data) => {
    setLoading(true);
    const response = await getEventByTwoDate(data);
    if (response && response.data) {
      setLoading(response.isLoading);
      setMessage(response.message);
      setData(
        response.data.map((event) => {
          return {
            id: event.id,
            slug: event.slug,
            image: event.event_banner,
            title: event.event_title,
            content: event.event_summary,
            type_of_event: event.type_of_event,
            eventCategory: event.eventCategory.name,
            date: event.starting_date,
          };
        })
      );
    }
  };

  const eventCategory = async () => {
    const response = await getAllEventsCategories();
    if (response && response.data) {
      setListedCategories(response.data);
    }
  };

  useEffect(() => {
    getAllEvents();
    eventCategory();
  }, []);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <div className={classes.explore}>
            <Grow
              in={checked}
              style={{ transformOrigin: "0 0 0" }}
              {...(checked ? { timeout: 1000 } : {})}
            >
              <Typography variant="h4">Discover events </Typography>
            </Grow>
            <Slide
              direction="up"
              in={checked}
              style={{ transformOrigin: "0 0 0" }}
              {...(checked ? { timeout: 1000 } : {})}
            >
              <Typography variant="body1">
                Find events that interest you and book tickets. It is really
                easy and best of all it’s free.
              </Typography>
            </Slide>
          </div>
        </Grid>
        <Grid item xs={12}>
          {matches ? (
            <FeaturedEvents data={allEvents} />
          ) : (
            <FeaturedEventMobileView data={allEvents} />
          )}
        </Grid>
        <Grid item xs={12} md={1}></Grid>
        <Grid item xs={12} sm={4} md={3} className={classes.selectContainer}>
          <Typography variant="body1" className={classes.selectContainerText}>
            Looking for
          </Typography>
          <FormControl className={classes.formControl}>
            <Select
              labelId="title-type"
              id="title"
              value={category}
              onChange={handleCategoryChange}
              //style={{ width: "100% !important" }}
              fullWidth
            >
              <MenuItem value="Browse category">Browse category</MenuItem>
              <MenuItem value="All" onClick={() => getAllEvents()}>
                All categories
              </MenuItem>
              {lisetedCategories.map((category) => (
                <MenuItem
                  key={category.id}
                  value={category.id}
                  onClick={() => getEventsByCategory(category.id)}
                >
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4} md={4} className={classes.selectContainer}>
          <Typography variant="body1" className={classes.selectContainerText}>
            Select country
          </Typography>
          <div className={classes.dflex}>
            <div>
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Button
                      variant="contained"
                      className={classes.btn}
                      {...bindTrigger(popupState)}
                    >
                      {isNigeria ? "Nigeria" : "Others"}
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem
                        onClick={() => {
                          popupState.close();
                          setIsNigeria(true);
                        }}
                      >
                        Nigeria
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          popupState.close();
                          setIsNigeria(false);
                        }}
                      >
                        Others
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </div>
            <FormControl className={classes.location}>
              {!isNigeria && (
                <Autocomplete
                  id="country-select-demo"
                  fullWidth
                  options={countries}
                  classes={{
                    option: classes.option,
                  }}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(option) => (
                    <div
                      onClick={() =>
                        getEventsByEventLocation({
                          country: option.label,
                          state: null,
                        })
                      }
                    >
                      <span>{countryToFlag(option.code)}</span>
                      {option.label} ({option.code}) +{option.phone}
                    </div>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=""
                      value={country}
                      onChange={handleCountryChange}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              )}
              {isNigeria && (
                <Select
                  labelId="title-type"
                  id="title"
                  value={location}
                  onChange={handleLocationChange}
                  // style={{ width: "80% !important" }}
                  fullWidth
                >
                  <MenuItem value="Select State">Select State</MenuItem>
                  {states.map((state) => (
                    <MenuItem
                      value={state}
                      key={state}
                      onClick={() =>
                        getEventsByEventLocation({
                          country: "Nigeria",
                          state: state,
                        })
                      }
                    >
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={12} sm={4} md={3} className={classes.selectContainer}>
          <Typography variant="body1" className={classes.selectContainerText}>
            When
          </Typography>
          <div className={classes.dflex}>
            <FormControl className={clsx(classes.formControl)}>
              <Select
                labelId="title-type"
                id="title"
                value={period}
                onChange={handlePeriodChange}
                //style={{ width: "100% !important" }}
                fullWidth
              >
                <MenuItem value="Choose Period">Choose Period</MenuItem>
                <MenuItem
                  value="Today"
                  onClick={() =>
                    getEventsByDates({
                      from: getSearchedDate(0),
                      to: getSearchedDate(0),
                    })
                  }
                >
                  Today
                </MenuItem>
                <MenuItem
                  value="This Week"
                  onClick={() =>
                    getEventsByDates({
                      from: getSearchedDate(0),
                      to: getSearchedDate(1),
                    })
                  }
                >
                  One Week
                </MenuItem>
                <MenuItem
                  value="Next Week"
                  onClick={() =>
                    getEventsByDates({
                      from: getSearchedDate(0),
                      to: getSearchedDate(2),
                    })
                  }
                >
                  Two Weeks
                </MenuItem>
                <MenuItem
                  value="This Month"
                  onClick={() =>
                    getEventsByDates({
                      from: getSearchedDate(0),
                      to: getSearchedDate(3),
                    })
                  }
                >
                  Three Weeks
                </MenuItem>
                <MenuItem
                  value="Next Month"
                  onClick={() =>
                    getEventsByDates({
                      from: getSearchedDate(0),
                      to: getSearchedDate(4),
                    })
                  }
                >
                  One Month
                </MenuItem>
              </Select>
            </FormControl>
            {/* <div className={classes.search}>
              <SearchIcon color="primary" />
            </div> */}
          </div>
        </Grid>
        <Grid item xs={12} className={classes.events}>
          <UpcomingEvents data={data} message={message} loading={loading} />
        </Grid>
      </Grid>
    </div>
  );
};

export default EventSection;
