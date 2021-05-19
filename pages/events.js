import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Pagination from "../components/pagination/pagination";
import {
  Grid,
  FormControl,
  Paper,
  MenuItem,
  InputLabel,
  Select,
  Slide,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

//import Date from "../components/date/datePicker";
import { Container } from "../components/section";
import { EventsListing } from "../components/section/allItems";
import {
  getAllApprovedEvents,
  getAllEventsCategories,
  getEventByCategoryId,
  getEventByType,
  getEventByDate
} from "../src/services/eventServices";
import BackDrop from "../common/Backdrop";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    overflow: "hidden",
    [theme.breakpoints.down("xs")]: {
      margin: 0,
    },
  },
  header: {
    width: "100%",
    height: "50vh",
    backgroundImage: "url('/images/eventNew.jpg')",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    color: "#fff",
    marginBottom: 20,
    backgroundSize: "cover",
    // opacity: 0.3,
  },
  textHeader: {
    paddingLeft: "3%",
    paddingTop: "8%",
  },
  leftwing: {
    height: 200,
    backgroundImage: "url('./images/Group.svg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  image: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  midwing: {
    height: 200,
    border: "1px solid white",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  anything: {
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: 40,
  },
  rightwing: {
    height: 200,
  },
  search: {
    height: 30,
    width: "50%",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: 5,
  },
  searchdiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 20,
  },
  gridcontent: {
    paddingLeft: "3%",
    paddingRight: "3%",
    [theme.breakpoints.down("xs")]: {
      //margin: "5%",
    },
    // border: "1px solid red",
  },
  grid: {
    width: "90%",
    margin: "auto",
  },
  price: {
    paddingLeft: 20,
  },

  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#f1f1f1",
    padding: "10%",
  },
  formControl: {
    width: 250,
    [theme.breakpoints.down("md")]: {
      width: 183,
    },
  },
  filter: {
    height: 600,
  },
  pagination: {
    "& a":{
      textDecoration:'none'
    },
    "& > *": {
      marginTop: theme.spacing(2),
      width: "100%",
      // margin: "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    line: {
     border: "5px solid grey",
     backgroundColor: "grey",
    },
  },
}));

const Events = () => {
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [lisetedCategories, setListedCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));

  const handleDateChange = (date) => {
    setSelectedDate(date);
    sortEventsByDate(date)
  };

  const getAllEvents = async () => {
    setLoading(true);
    const response = await getAllApprovedEvents();
    console.log(response.data);
    if (response && response.data) {
      setLoading(response.isLoading);
      setMessage(response.message);
      setPosts(
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
            address: event.event_location,
          };
        })
      );
    }
  };

  const getEventsByCategory = async (id) => {
    setLoading(true);
    const response = await getEventByCategoryId(id);
    console.log("getting from cat...", response);
    if (response && response.data) {
      setLoading(response.isLoading);
      setMessage(
        response.data > 0
          ? response.message
          : "No event was found in this category"
      );
      setPosts(
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
            address: event.event_location,
          };
        })
      );
    }
  };

  const sortEventsByType = async (type) => {
    setLoading(true);
    const response = await getEventByType(type);
    console.log("getting from cat...", response);
    if (response && response.data) {
      setLoading(response.isLoading);
      setMessage(
        response.data > 0
          ? response.message
          : "No event was found in this category"
      );
      setPosts(
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
            address: event.event_location,
          };
        })
      );
    }
  };

  const sortEventsByDate = async (type) => {
    setLoading(true);
    const response = await getEventByDate(type);
    console.log("getting from cat...", response);
    if (response && response.data) {
      setLoading(response.isLoading);
      setMessage(
        response.data > 0
          ? response.message
          : "No event was found in this day"
      );
      setPosts(
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
            address: event.event_location,
          };
        })
      );
    }
  };

  const eventCategory = async () => {
    const response = await getAllEventsCategories();
    console.log("categoryid....", response);
    if (response && response.data) {
      setListedCategories(response.data);
    }
  };

  useEffect(() => {
    getAllEvents();
    eventCategory();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const mobile = useMediaQuery("(max-width:960px)");
  const classes = useStyles();
  let renderItems = <BackDrop loading={loading} />;
  if (posts.length) {
    renderItems = <EventsListing data={currentPosts} />;
  } else {
    renderItems = <h5>{message}</h5>;
  }
  return (
    <Container title="events" className={classes.root}>
      <div className={classes.header} id='events'>
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
          <h1 className={classes.textHeader}> Search for events</h1>
        </Slide>
      </div>
      <Grid container spacing={4} className={classes.gridcontent}>
        <Grid item xs={12} sm={12} md={9} id='#'>
          {renderItems}
        </Grid>
        {!mobile && (
          <Grid item xs={12} sm={4} md={3} className={classes.filter}>
            <Slide direction="down" in={true} mountOnEnter unmountOnExit>
              <Paper className={classes.paper}>
                <h3>Filter</h3>
                <div>
                  {/* <Date /> */}
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <div>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">
                      Type of event
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    >
                      <MenuItem value="All" onClick={() => getAllEvents()}>
                        All
                      </MenuItem>
                      <MenuItem
                        value="free"
                        onClick={() => sortEventsByType("free")}
                      >
                        Free
                      </MenuItem>
                      <MenuItem
                        value="Paid"
                        onClick={() => sortEventsByType("paid")}
                      >
                        Paid
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">
                      Select category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <MenuItem value="All" onClick={() => getAllEvents()}>
                        All Events
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
                </div>
              </Paper>
            </Slide>
          </Grid>
        )}
      </Grid>

      <Grid item xs={12} className={classes.pagination}>
        <a  href='#'>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
        </a>
      </Grid>
      {/* </Grid> */}
    </Container>
  );
};

export default Events;
