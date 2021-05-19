import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { Typography, Container } from "@material-ui/core/";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { Avatar } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import { Editor } from "@tinymce/tinymce-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { FacebookProvider, CommentsCount, Comments } from "react-facebook";
import {
  GoogleMap,
  MyCustomButton,
  ButtonWithBackdrop,
  MyTextField,
  AddPhoto,
  Contact,
  MyDialog,
  ReactSelect,
} from "../../common";
import Payment from "../payment/payment";
import {
  eventServices,
  getAllEventsCategories,
} from "../../src/services/eventServices";
import {
  getAllServicesListedByVendors
} from '../../src/services/vendorServices';
import GetVendorsByCategory from "../tables/getVendorByCategory";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function MyTabPanel(props) {
  const { children, valuee, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={valuee !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {valuee === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

MyTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  valuee: PropTypes.any.isRequired,
};

function myA11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //width: "80%",
    margin: "0 auto",
  },
  gridContainer: {
    width: "80%",
    margin: "auto",
  },
  paperr: {
    padding: "8px",
  },
  Paperdiv: {
    backgroundColor: "#38B9F0",
    font: "normal normal 600 20px/24px Work Sans",
    boxShadow: "0px 3px 6px #00000029",
    color: "#fff",
    padding: "1rem .5rem",
    //marginBottom:20
  },
  fees: {
    font: "normal normal bold 16px Work Sans",
    fontWeight: "bold",
    color: "black",
    margin: 7,
  },
  value: {
    margin: 5,
    color: "#2b2b2b",
  },
  buttonRight: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  selectbutton: {
    width: 130,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    border: "1px solid #F06F38",
    "&:hover": {
      background: "#F06F38",
      color: "#fff",
      border: "1px solid #fff",
    },
  },
  imageRight: {
    width: "100%",
    height: 200,
    backgroundImage:
      "url('https://assets.entrepreneur.com/content/3x2/2000/20160420164615-business-people-corporate-meeting.jpeg')",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  dflex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  plan: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    "& .MuiAppBar-colorPrimary": {
      backgroundColor: "#FEEDD7",
      color: "inherit",
      "& :active": {
        color: "#black",
      },
    },
    "& .MuiPaper-elevation4": {
      boxShadow: "none",
      padding: 12,
      borderRadius: 7,
    },
    "& .MuiTabs-indicator": {
      background: "#F06F38",
      height: 5,
    },
    "& .MuiTab-root": {
      textTransform: "none",
    },
    "& .Mui-selected": {
      borderRadius: 20,
      backgroundColor: "#fff",
    },
  },
  likes: {
    display: "flex",
    justifyContent: "space-around",
  },
  icons: {
    width: "20%",
    display: "flex",
    justifyContent: "space-around",
    marginBottom: 100,
    cursor: "pointer",
  },
  formControl: {
    width: `100%  !important`,
    display: "block",
  },
  error: {
    color: theme.palette.error.main,
    textAlign: "center",
  },
  bg: {
    backgroundImage: "url('/images/create.jpg')",
    backgroundSize: "cover",
    width: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  editor: {
    display: "block",
    margin: "0px 16px",
  },
  mr: {
    paddingRight: "16px",
  },
  tags: {
    display: "flex",
    alignItems: "center",
  },
  proceed: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  paper: {
    padding: theme.spacing(),
    color: theme.palette.text.secondary,
  },
  line: {
    border: "1px solid #f1f1f1",
    width: "40em",
    marginTop: 10,
    marginBottom: 15,
  },
  select: {
    marginLeft: 10,
  },
  description: {
    width: "100%",
    height: "5em",
    borderRadius: 5,
  },
  title: {
    margin: 0,
    marginLeft: 20,
  },
  gridimg: {
    width: 175,
    marginLeft: "auto",
    alignItems: "right",
    marginTop: -95,
    marginBottom: "-30",
    [theme.breakpoints.down("xs")]: {
      margin: "0 auto",
      width: "80%",
    },
  },
  next: {
    color: "white",
    float: "right",
    marginBottom: 50,
    height: 30,
    backgroundColor: "orangeRed",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    border: "1px solid orangeRed",
    width: 130,
    marginTop: 30,
  },
  auto: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  line2: {
    border: "1px solid #f1f1f1",
    width: "100%",
    marginTop: 30,
    marginBottom: 15,
  },
  contact: {
    backgroundColor: "orangeRed",
    color: "white",
    textAlign: "center",
    margin: "auto 100px",
    borderRadius: 5,
  },
  gprs: {
    width: "100%",
    height: 65,
    borderRadius: 7,
    marginBottom: 10,
    marginTop: 10,
  },
  map: {
    width: "100%",
    marginTop: "3rem",
  },
  imgdiv: {
    backgroundColor: "whitesmoke",
    height: 200,
    marginLeft: 25,
  },
  date: {
    width: "100%",
    height: 65,
    borderRadius: 7,
    marginBottom: 10,
    marginTop: 10,
  },
  span: {
    marginLeft: 30,
  },
  span2: {
    marginLeft: 21,
  },
  book: {
    margin: 22,
    marginBottom: -47,
  },
  textarea: {
    marginLeft: 15,
  },
  icon: {
    cursor: "pointer",
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const [page, setPage] = useState("submit");
  const [error, setError] = useState("");
  const [errorMsg, setErrorMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [positiveDialog, setPositiveDialog] = useState();
  const [proceed, setProceed] = useState(false);
  const [back, setBack] = useState(false);
  const [plan, setPlan] = useState("free");
  const [valuee, setValuee] = useState(0);
  const [value, setValue] = useState(0);
  const [tags, setTags] = useState([""]);
  const [userInput, setUserInput] = useState({
    type_of_event: "free",
    amount_paid: 5000,
    event_category: null,
    event_title: "",
    experience_level: "choose Experience",
    event_location: "",
    longitude: null,
    latitude: null,
    country: "ghdsghsghs",
    state: "gdsgd",
    city: "hdhsd",
    zip_code: 23401,
    event_banner: "uploads/image.png",
    description: "",
    event_summary: "",
    tags: [],
    starting_date: "2020-10-24",
    ending_date: "2020-11-24",
    starting_time: "07:30",
    ending_time: "08:30",
    isRecuringEvent: false,
    event_recuring_ends: "2020-12-25",
    event_recuring_frequency: "Event will repeat",
    expected_no_of_attendees: null,
    event_ticket_types: [],
    event_vendors: [12, 3, 4, 5, 2],
  });
  const [coordinate, setCoordinate] = useState({
    lat: null,
    lng: null,
  });
  const [location, setLocation] = useState("Venue");
  const [event, setEvent] = useState("Single Event");
  const matches = useMediaQuery("(max-width:600px)");
  const [category, setCategory] = useState("Select category");
  const [lisetedCategories, setListedCategories] = useState(null);
  const [listedVendors, setListedVendors] = useState(null);
  const [vendors, setVendors] = useState(null);
  const [description, setDiscription] = useState("");
  const [uploadImage, setUploadImage] = useState(null);
  const [address, setAddress] = useState("");
  const [createTicket, setCreateTicket] = useState([
    {
      type_of_ticket: "Select Type of Ticket",
      available_slots: "",
      amount: "",
    },
  ]);
  const [open, setOpen] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangePlan = (event, newValue) => {
    setValuee(newValue);
  };
  const handlePayment = () => {
    setOpen(false);
    setDialogTitle("");
    setDialogMessage("This service is currently under construction");
    setPositiveDialog(true);
    setOpenDialog(true);
    setTimeout(() => {
      setOpenDialog(false);
      setPage("payment");
    }, 2000);
  };
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    console.log(results);
    setCoordinate(latLng);
    setAddress(value);
    setUserInput({
      ...userInput,
      event_location: value,
      longitude: latLng.lng,
      latitude: latLng.lat,
      // country: results[1].address_components[6].long_name,
      // state: results[1].address_components[5].long_name,
      // country: results[1].address_components[4].long_name,
    });
  };
  const handleChangeSelect = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleEditorChange = (e) => {
    setUserInput({ ...userInput, description: e.target.getContent() });
    console.log("Content was updated:", e.target.getContent());
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setUserInput({...userInput, event_category:e.target.value})
  };
  const [experience, setExperience] = useState("choose Experience");
  const handleExperienceChange = (e) => {
    setExperience(e.target.value);
  };
  const [attendees, setAttendees] = useState("Select a range of attendees");
  const handleAttendeesChange = (e) => {
    setAttendees(e.target.value);
  };
  const [vendor, setVendor] = useState("Select a vendor");
  const handleVendorChange = (e) => {
    setVendor(e.target.value);
  };
  const [fee, setFee] = useState("Select a fee type");
  const handleFeeChange = (e) => {
    setFee(e.target.value);
  };
  const handleAddImageClick = (event) => {
    event.stopPropagation();
    let fileInput = event.target.getElementsByTagName("input")[0];
    fileInput.click();
  };
  const handleLocation = (e) => {
    setAddress("");
    setUserInput({ ...userInput, event_location: "" });
    const { value } = e.target;
    setLocation(value);
    console.log(userInput);
  };
  const handleChangeCreateTicket = (e, index) => {
    const { name, value } = e.target;
    const list = [...createTicket];
    if (name === "available_slots" || name === "amount") {
      list[index][name] = value >= 0 ? value : 0;
    } else {
      list[index][name] = value;
    }
    setCreateTicket(list);
    setUserInput({ ...userInput, event_ticket_types: list });
    console.log("===============", userInput);
  };

  const addItems = () => {
    const list = [...createTicket];
    list.push({
      type_of_ticket: "Select Type of Ticket",
      available_slots: "",
      amount: "",
    });
    setCreateTicket(list);
    setUserInput({ ...userInput, event_ticket_types: list });
  };

  const removeItems = (index) => {
    const list = [...createTicket];
    list.splice(index, 1);
    setCreateTicket(list);
    setUserInput({ ...userInput, event_ticket_types: list });
  };
  const addTag = () => {
    const list = [...tags];
    list.push("");
    setTags(list);
  };
  const removeTag = (index) => {
    const list = [...tags];
    list.splice(index, 1);
    setTags(list);
  };
  const handleTagChange = (e, index) => {
    const { value } = e.target;
    const list = [...tags];
    list[index] = value;
    setTags(list);
    setUserInput({ ...userInput, tags: list });
    console.log(userInput);
  };

  const handleFieldChange = (event) => {
    console.log(event);
    event.persist();
    setUserInput((userInput) => ({
      ...userInput,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    }));
    console.log(userInput);
  };

  const next = () => {
    if (validateEventInput()) {
      setError("");
      setProceed(true);
      setTimeout(() => {
        setProceed(false);
        setPage("submit");
      }, 1000);
    }
  };

  const previous = () => {
    setBack(true);
    setTimeout(() => {
      setBack(false);
      setPage("Select Plan");
    }, 1000);
  };

  const validateEventInput = () => {
    const {
      event_title,
      experience_level,
      event_location,
      description,
      event_summary,
      expected_no_of_attendees,
      event_ticket_types,
    } = userInput;
    if (event_title === "") {
      setError("Enter a valid event title");
      return;
    }
    if (experience_level === "choose Experience") {
      setError("Select a valid experience level");
      return;
    }
    if (location === "Venue" && event_location === "") {
      setError("Enter a valid Address");
      return;
    }
    if (location === "Online events" && event_location === "") {
      setError("Enter a valid url");
      return;
    }
    if (description === "") {
      setError("Enter a valid event description");
      return;
    }
    if (event_summary.length > 200) {
      setError("Event summary should have a maximum of 200 characters");
      return;
    }
    if (expected_no_of_attendees === "") {
      setError("Provide expected numbers of attendees");
      return;
    }
    if (uploadImage === null) {
      setError("You Must Upload an Image");
      return;
    }
    return true;
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (validateEventInput()) {
      //userInput.event_banner = uploadImage
      setOpen(true);
      const response = await eventServices(token, userInput, uploadImage);
      if (response) {
        setOpen(false);
        setDialogTitle(response.status);
        setDialogMessage(response.message);
        setPositiveDialog(response.status === "success" ? true : false);
        setOpenDialog(true);
      }
      if (response.status !== "success") {
        setPage("form");
      }
    }
  };

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const services = await getAllServicesListedByVendors(token);
        if (services && services.data) {
          setListedVendors(services.data);
          setVendors(services.data.map(item => {
            return {
              isChecked:false,
              category:item.vendorServiceCategory.name,
              name:`${item.User.firstName} ${item.User.lastName}`,
              email:item.User.email,
              phone:item.User.phone,
              price:item.User.price
            }
          }))
        }
      }
      const response = await getAllEventsCategories();
      if (response && response.data) {
        setListedCategories(response.data);
      }
    })();
  }, []);
  console.log('ven....', vendors)
  return (
    <>
      <MyDialog
        title={dialogTitle}
        openDialog={openDialog}
        positiveDialog={positiveDialog}
        onClose={() => setOpenDialog(false)}
      >
        {dialogMessage}
      </MyDialog>
      <p className={classes.error}>{error}</p>
      {page === "Select Plan" && (
        <div className={classes.plan}>
          <h3 style={{ paddingLeft: "3rem" }}>Select your payment plan</h3>
          <AppBar position="static">
            <Tabs
              value={valuee}
              onChange={handleChangePlan}
              aria-label="simple tabs example"
            >
              <Tab
                label="Free"
                style={{ fontSize: 14 }}
                {...myA11yProps(0)}
                onClick={() => setPlan("free")}
              />
              <Tab
                label="Multi Listing Special"
                style={{ fontSize: 14 }}
                {...myA11yProps(1)}
                onClick={() => setPlan("paid")}
              />
            </Tabs>
          </AppBar>
          <MyTabPanel valuee={valuee} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Container>
                  <Paper className={classes.paper}>
                    <div className={classes.Paperdiv}>
                      <h6 style={{ margin: 0 }}>
                        This package allows you to create an event at no cost.
                      </h6>
                    </div>
                    <div>
                      <Grid container spacing={0} className={classes.item}>
                        <Grid item xs={12} sm={6} md={3}>
                          <p className={classes.fees}>Subscription fee:</p>
                        </Grid>
                        <Grid item xs={12} sm={6} md={9}>
                          <p className={classes.value}>₦0.00</p>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <p className={classes.fees}>Package Type:</p>
                        </Grid>
                        <Grid item xs={12} sm={6} md={9}>
                          <p className={classes.value}>Single Submission</p>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <p className={classes.fees}>Listing Duration:</p>
                        </Grid>
                        <Grid item xs={12} sm={6} md={9}>
                          <p className={classes.value}>30 days.</p>
                        </Grid>
                      </Grid>
                      <div className={classes.buttonRight}>
                        <button
                          className={classes.selectbutton}
                          onClick={() => setPage("form")}
                        >
                          Select
                        </button>
                      </div>
                      <p style={{ color: "#f06f38" }}>Connect With Us</p>
                      <div>
                        <a href="https://web.facebook.com/cityevents.ng?_rdc=1&_rdr">
                          <FacebookIcon style={{ color: "blue" }} />
                        </a>
                        <a href="https://twitter.com/cityevents.ng">
                          <TwitterIcon style={{ color: "#38b9f0" }} />
                        </a>
                        <a href="/">
                          <YouTubeIcon style={{ color: "red" }} />
                        </a>
                        <a href="https://www.instagram.com/cityevents.ng/">
                          <InstagramIcon style={{ color: "orangeRed" }} />
                        </a>
                      </div>
                    </div>
                  </Paper>
                </Container>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper>
                  <div className={classes.imageRight}></div>
                  <AppBar position="static">
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="simple tabs example"
                    >
                      <Tab
                        label="200 Likes"
                        style={{ fontSize: 14 }}
                        {...a11yProps(0)}
                      />
                      <Tab
                        label="90 Comments"
                        style={{ fontSize: 14 }}
                        {...a11yProps(1)}
                      />
                      {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
                    </Tabs>
                  </AppBar>
                  <TabPanel value={value} index={0}>
                    <div className={classes.likes}>
                      <div>
                        <Avatar src="./images/Anna1.jpg" />
                        <p style={{ fontSize: 12 }}>Anna Spencer</p>
                      </div>
                      <div>
                        <Avatar src="./images/Anna1.jpg" />
                        <p style={{ fontSize: 12 }}>Anna Spencer</p>
                      </div>
                      <div>
                        <Avatar src="./images/Anna1.jpg" />
                        <p style={{ fontSize: 12 }}>Anna Spencer</p>
                      </div>
                    </div>
                    <div className={classes.likes}>
                      <div>
                        <Avatar src="./images/Anna1.jpg" />
                        <p style={{ fontSize: 12 }}>Anna Spencer</p>
                      </div>
                      <div>
                        <Avatar src="./images/Anna1.jpg" />
                        <p style={{ fontSize: 12 }}>Anna Spencer</p>
                      </div>
                      <div>
                        <Avatar src="./images/Anna1.jpg" />
                        <p style={{ fontSize: 12 }}>Anna Spencer</p>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    Under construction
                    <FacebookProvider appId="662642454397577">
                      <Comments href="http://www.facebook.com" />
                    </FacebookProvider>
                    <FacebookProvider appId="662642454397577">
                      <CommentsCount href="http://www.facebook.com" />
                    </FacebookProvider>
                  </TabPanel>
                </Paper>
              </Grid>
            </Grid>
          </MyTabPanel>
          <MyTabPanel valuee={valuee} index={1}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Container>
                  <Paper className={classes.paper}>
                    <div className={classes.Paperdiv}>
                      <h6 style={{ margin: 0 }}>
                        This is a paid feature and comes with a subscription
                        fee.
                      </h6>
                    </div>
                    <div>
                      <Grid container spacing={0} className={classes.item}>
                        <Grid item xs={12} sm={6} md={3}>
                          <p className={classes.fees}>Subscription fee:</p>
                        </Grid>
                        <Grid item xs={12} sm={6} md={9}>
                          <p className={classes.value}>₦1,500</p>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <p className={classes.fees}>Package Type:</p>
                        </Grid>
                        <Grid item xs={12} sm={6} md={9}>
                          <p className={classes.value}>Subscription</p>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <p className={classes.fees}>Listing Duration:</p>
                        </Grid>
                        <Grid item xs={12} sm={6} md={9}>
                          <p className={classes.value}>30 days.</p>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <p className={classes.fees}>Condition:</p>
                        </Grid>
                        <Grid item xs={12} sm={6} md={9}>
                          <p className={classes.value}>
                            Ticketing has a cost to the Buyer at 4% + flat fee
                            of N500 per sold ticket + payment processing fee of
                            2.5% per order.
                          </p>
                        </Grid>
                      </Grid>
                      <div className={classes.buttonRight}>
                        <button
                          className={classes.selectbutton}
                          onClick={handlePayment}
                        >
                          Make Payment
                        </button>
                      </div>
                      <p style={{ color: "#f06f38" }}>Connect With Us</p>
                      <div>
                        <a href="https://web.facebook.com/cityevents.ng?_rdc=1&_rdr">
                          <FacebookIcon style={{ color: "blue" }} />
                        </a>
                        <a href="https://twitter.com/cityevents.ng">
                          <TwitterIcon style={{ color: "#38b9f0" }} />
                        </a>
                        <a href="/">
                          <YouTubeIcon style={{ color: "red" }} />
                        </a>
                        <a href="https://www.instagram.com/cityevents.ng/">
                          <InstagramIcon style={{ color: "orangeRed" }} />
                        </a>
                      </div>
                    </div>
                  </Paper>
                </Container>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper>
                  <div className={classes.imageRight}></div>
                  <AppBar position="static">
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="simple tabs example"
                    >
                      <Tab
                        label="70 Likes"
                        style={{ fontSize: 14 }}
                        {...a11yProps(0)}
                      />
                      <Tab
                        label="150 Comments"
                        style={{ fontSize: 14 }}
                        {...a11yProps(1)}
                      />
                    </Tabs>
                  </AppBar>
                  <TabPanel value={value} index={0}>
                    <div className={classes.likes}>
                      <div>
                        <Avatar src="./images/Anna1.jpg" />
                        <p style={{ fontSize: 12 }}>Anna Spencer</p>
                      </div>
                      <div>
                        <Avatar src="./images/Anna1.jpg" />
                        <p style={{ fontSize: 12 }}>Anna Spencer</p>
                      </div>
                      <div>
                        <Avatar src="./images/Anna1.jpg" />
                        <p style={{ fontSize: 12 }}>Anna Spencer</p>
                      </div>
                    </div>
                    <div className={classes.likes}>
                      <div>
                        <Avatar src="./images/Anna1.jpg" />
                        <p style={{ fontSize: 12 }}>Anna Spencer</p>
                      </div>
                      <div>
                        <Avatar src="./images/Anna1.jpg" />
                        <p style={{ fontSize: 12 }}>Anna Spencer</p>
                      </div>
                      <div>
                        <Avatar src="./images/Anna1.jpg" />
                        <p style={{ fontSize: 12 }}>Anna Spencer</p>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    No comment
                  </TabPanel>
                </Paper>
              </Grid>
            </Grid>
          </MyTabPanel>
          <Contact />
        </div>
      )}
      {page === "payment" && <Payment />}
      {page === "form" && (
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} className={classes.pr}>
              <Container>
                <h3>Choose category</h3>
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="category"
                    id="category"
                    variant="outlined"
                    placeholder="select category(e.g stationery design)"
                    value={category}
                    onChange={handleCategoryChange}
                    fullWidth
                  >
                    <MenuItem value="Select category">Select Category</MenuItem>
                    {lisetedCategories.map((category) => (
                      <MenuItem value={category.id}>{category.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <h3>Event name</h3>
                <FormControl className={classes.formControl}>
                  <TextField
                    style={{ padding: 0 }}
                    fullWidth
                    id="outlined-multiline-static"
                    type="text"
                    //label="Event name"
                    placeholder="What is the name of your Event?"
                    value={userInput.event_title}
                    onChange={(e) =>
                      setUserInput({
                        ...userInput,
                        event_title: e.target.value,
                      })
                    }
                    variant="outlined"
                  />
                </FormControl>
                <h3>Experience Level</h3>
                <p>Tell us how experienced you are in organizing an event</p>
                <FormControl className={classes.formControl} fullWidth>
                  <Select
                    labelId="experience-level"
                    id="level"
                    variant="outlined"
                    placeholder=""
                    value={userInput.experience_level}
                    onChange={(e) =>
                      setUserInput({
                        ...userInput,
                        experience_level: e.target.value,
                      })
                    }
                    fullWidth
                  >
                    <MenuItem value="choose Experience">
                      Choose your experience level
                    </MenuItem>
                    <MenuItem value="beginner">Beginner</MenuItem>
                    <MenuItem value="intermediate">Intermediate</MenuItem>
                    <MenuItem value="expert">Expert</MenuItem>
                  </Select>
                </FormControl>
                <h3>Pick the location of your event</h3>
                <p>Pick location</p>
                <FormControl component="fieldset" fullWidth>
                  <RadioGroup
                    row
                    aria-label="selectRegType"
                    name="selectRegType"
                    value={location}
                    onChange={handleLocation}
                  >
                    <FormControlLabel
                      value="Venue"
                      control={<Radio color="primary" />}
                      label="Venue"
                    />
                    <FormControlLabel
                      value="Online events"
                      control={<Radio color="primary" />}
                      label="Online events"
                    />
                    <FormControlLabel
                      value="To be announced"
                      control={<Radio color="primary" />}
                      label="To be announced"
                    />
                  </RadioGroup>
                </FormControl>
                {location === "Venue" && (
                  <FormControl className={classes.formControl}>
                    <PlacesAutocomplete
                      value={address}
                      onChange={setAddress}
                      onSelect={handleSelect}
                    >
                      {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                        loading,
                      }) => (
                        <div>
                          <TextField
                            fullWidth
                            className={classes.formControl}
                            label="enter address"
                            variant="outlined"
                            {...getInputProps({
                              placeholder: "Search Places ...",
                              className: "location-search-input",
                            })}
                          />
                          <div>
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion) => {
                              const className = suggestion.active
                                ? "suggestion-item--active"
                                : "suggestion-item";
                              const style = suggestion.active
                                ? {
                                    backgroundColor: "#F06E38",
                                    //borderRadius:'7px',
                                    padding: "0.5rem",
                                    color: "#fff",
                                    cursor: "pointer",
                                  }
                                : {
                                    backgroundColor: "#2B2B2B",
                                    padding: "0.5rem",
                                    color: "#fff",
                                    cursor: "pointer",
                                  };
                              return (
                                <div
                                  {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style,
                                  })}
                                >
                                  {suggestion.description}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
                  </FormControl>
                )}
                {location === "Online events" && (
                  <FormControl className={classes.formControl} fullWidth>
                    <MyTextField
                      id="url"
                      type="url"
                      name="link"
                      required="required"
                      label="Enter social medial link (e.g zoom)"
                      placeholder="https://example.com"
                      value={userInput.event_location}
                      onChange={(e) =>
                        setUserInput({
                          ...userInput,
                          event_location: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                )}
              </Container>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.bg}></Grid>
          </Grid>
          <Container className={classes.map}>
            {address && (
              <GoogleMap
                location={address}
                lat={coordinate.lat}
                lng={coordinate.lng}
              />
            )}
          </Container>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Container>
                <h3>Event Image</h3>
                <p>
                  Add an image that best depicts your events<b>(max:5mb)</b>
                </p>
                <AddPhoto
                  //image="/images/upload.png"
                  title="Upload image or photo"
                  text="Max file size (5MB)"
                  accept="image/*"
                  filename="image"
                  onClick={handleAddImageClick}
                  backgroundImage={uploadImage}
                  setImage={(file) => {
                    setUploadImage(file);
                  }}
                />
              </Container>
            </Grid>
            <Grid item xs={12} className={classes.editor}>
              <h3>Description</h3>
              <p>Describe your event</p>
              <Editor
                initialValue={`<p>${userInput.description}</p>`}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image",
                    "charmap print preview anchor help",
                    "searchreplace visualblocks code",
                    "insertdatetime media table paste wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic | \
                        alignleft aligncenter alignright | \
                        bullist numlist outdent indent | help",
                }}
                onChange={handleEditorChange}
              />
            </Grid>
            <Grid item xs={12} className={classes.editor}>
              <p>
                Describe your events in just two lines (will be shown on listing
                pages)
              </p>
              <TextField
                id="outlined-multiline-static"
                label="Event summary"
                multiline
                fullWidth
                rows={3}
                value={userInput.event_summary}
                variant="outlined"
                onChange={(e) =>
                  setUserInput({ ...userInput, event_summary: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} className={classes.editor}>
              <h3>Tags</h3>
              {tags.map((item, i) => {
                return (
                  <div className={classes.tags} key={i}>
                    <FormControl className={classes.formControl}>
                      <MyTextField
                        id="tag"
                        type="tag"
                        name="tags"
                        required="required"
                        //label="Tags"
                        placeholder="Tag your network "
                        value={item}
                        onChange={(e) => handleTagChange(e, i)}
                      />
                    </FormControl>
                    <AddCircleIcon className={classes.icon} onClick={addTag} />
                    {tags.length > 1 && (
                      <RemoveCircleOutlineIcon
                        className={classes.icon}
                        onClick={() => removeTag(i)}
                      />
                    )}
                  </div>
                );
              })}
            </Grid>
            <Grid item xs={12} className={classes.editor}>
              <h3>Date and Time</h3>
              <p>Set the date and time for your event</p>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="selectEvent"
                  name="selectEvent"
                  value={event}
                  onChange={(e) => {
                    setEvent(e.target.value);
                    setUserInput({
                      ...userInput,
                      isRecuringEvent: event === "Single Event" ? false : true,
                    });
                  }}
                >
                  <FormControlLabel
                    value="Single Event"
                    control={<Radio color="primary" />}
                    label="Single Event"
                  />
                  <FormControlLabel
                    value="Recurring Event"
                    control={<Radio color="primary" />}
                    label="Recurring Event"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} className={classes.editor}>
              <Grid container spacing={3}>
                <Grid item xs={6} md={3}>
                  <FormControl className={classes.formControl} fullWidth>
                    <MyTextField
                      id="date"
                      label="Event start"
                      type="date"
                      defaultValue="2017-05-24"
                      value={userInput.starting_date}
                      onChange={(e) =>
                        setUserInput({
                          ...userInput,
                          starting_date: e.target.value,
                        })
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6} md={3}>
                  <FormControl className={classes.formControl} fullWidth>
                    <MyTextField
                      id="time"
                      label="Time start"
                      type="time"
                      value={userInput.starting_time}
                      onChange={(e) =>
                        setUserInput({
                          ...userInput,
                          starting_time: e.target.value,
                        })
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6} md={3}>
                  <FormControl className={classes.formControl} fullWidth>
                    <MyTextField
                      id="datee"
                      label="Event end"
                      type="date"
                      value={userInput.ending_date}
                      onChange={(e) =>
                        setUserInput({
                          ...userInput,
                          ending_date: e.target.value,
                        })
                      }
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6} md={3}>
                  <FormControl className={classes.formControl} fullWidth>
                    <MyTextField
                      id="time"
                      label="Time end"
                      type="time"
                      value={userInput.ending_time}
                      onChange={(e) =>
                        setUserInput({
                          ...userInput,
                          ending_time: e.target.value,
                        })
                      }
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                </Grid>
                {event === "Recurring Event" && (
                  <Grid item xs={12} sm={6} md={3}>
                    <FormControl className={classes.formControl} fullWidth>
                      <Select
                        labelId="event_recuring_frequency"
                        id="event_recuring_frequency"
                        name="event_recuring_frequency"
                        variant="outlined"
                        value={userInput.event_recuring_frequency}
                        onChange={(e) =>
                          setUserInput({
                            ...userInput,
                            event_recuring_frequency: e.target.value,
                          })
                        }
                        fullWidth
                      >
                        <MenuItem value="Event will repeat">
                          Event will repeat
                        </MenuItem>
                        <MenuItem value="weekly">Regular</MenuItem>
                        <MenuItem value="monthly">monthly</MenuItem>
                        <MenuItem value="quartly">quartly</MenuItem>
                        <MenuItem value="yearly">yearly</MenuItem>
                        <MenuItem value="others">others</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}
                {event === "Recurring Event" && (
                  <Grid item xs={6} md={3}>
                    <FormControl className={classes.formControl} fullWidth>
                      <MyTextField
                        id="dateeeer"
                        label="Event recuring ends"
                        type="date"
                        value={userInput.event_recuring_ends}
                        onChange={(e) =>
                          setUserInput({
                            ...userInput,
                            eevent_recuring_ends: e.target.value,
                          })
                        }
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </FormControl>
                  </Grid>
                )}
              </Grid>
              <h3>About your attendees</h3>
              <p>
                {" "}
                Lets cover some basic information about your first event on
                cityevents
              </p>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl} fullWidth>
                  <MyTextField
                    id="number"
                    type="number"
                    name="number"
                    required="required"
                    label="How many people do you expect to attend this event?"
                    placeholder="Enter numbers of expected guest"
                    value={userInput.expected_no_of_attendees}
                    onChange={(e) =>
                      setUserInput({
                        ...userInput,
                        expected_no_of_attendees:
                          e.target.value >= 0 ? e.target.value : 0,
                      })
                    }
                  />
                </FormControl>
              </Grid>
              <h3>Ticket</h3>
              <p>
                Let us know the types of tickets that will be available for your
                event
              </p>
            </Grid>
            <Grid item xs={12} className={classes.editor}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {createTicket.map((item, i) => {
                    return (
                      <Grid container spacing={3} key={i}>
                        <Grid item xs={12} sm={6} md={3}>
                          <FormControl
                            className={classes.formControl}
                            fullWidth
                          >
                            <Select
                              labelId="type_of_ticket"
                              id="type_of_ticket"
                              name="type_of_ticket"
                              variant="outlined"
                              value={item.type_of_ticket}
                              onChange={(e) => handleChangeCreateTicket(e, i)}
                              fullWidth
                            >
                              <MenuItem value="Select Type of Ticket">
                                Select Type of Ticket
                              </MenuItem>
                              <MenuItem value="Regular">Regular</MenuItem>
                              <MenuItem value="VIP">VIP</MenuItem>
                              <MenuItem value="VVIP">VVIP</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <FormControl
                            className={classes.formControl}
                            fullWidth
                          >
                            <MyTextField
                              id="available_slots"
                              type="number"
                              name="available_slots"
                              required="required"
                              label="Available slots"
                              placeholder="Enter available slots"
                              value={item.available_slots}
                              onChange={(e) => handleChangeCreateTicket(e, i)}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <FormControl
                            className={classes.formControl}
                            fullWidth
                          >
                            <MyTextField
                              id="amount"
                              type="number"
                              name="amount"
                              required="required"
                              label="Amount"
                              placeholder="Enter mount"
                              value={item.amount}
                              onChange={(e) => handleChangeCreateTicket(e, i)}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={10} sm={1} md={1}>
                          <AddCircleIcon
                            className={classes.icon}
                            onClick={addItems}
                          />
                        </Grid>
                        {createTicket.length > 1 && (
                          <Grid item xs={1} sm={5} md={1}>
                            <RemoveCircleOutlineIcon
                              className={classes.icon}
                              onClick={() => removeItems(i)}
                            />
                          </Grid>
                        )}
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.formControl} fullWidth>
                  <TextField
                    style={{ width: "100%" }}
                    select
                    name="event_vendors"
                    id="event_vendors"
                    variant="outlined"
                    label="Choose vendors from category"
                    SelectProps={{
                      multiple: true,
                      value: userInput.event_vendors,
                      onChange: handleFieldChange,
                    }}
                  >
                    <MenuItem value="12">food</MenuItem>
                    <MenuItem value="3">drinks</MenuItem>
                    <MenuItem value="5">ushers</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>
              <div className={classes.proceed}>
                <MyCustomButton
                  onClick={previous}
                  changeClass={true}
                  progress={back}
                >
                  Back
                </MyCustomButton>
                <MyCustomButton
                  onClick={next}
                  changeClass={true}
                  progress={proceed}
                >
                  Next
                </MyCustomButton>
              </div>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Contact />
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
      {page === "submit" && (
        <div>
          <Container>
            <GetVendorsByCategory records={listedVendors} />
            <div className={classes.auto}>
              <ButtonWithBackdrop
                label="Create Event"
                click={handleSubmit}
                open={open}
              />
            </div>
          </Container>
        </div>
      )}
    </>
  );
}
