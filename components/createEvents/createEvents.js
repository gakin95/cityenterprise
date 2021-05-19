import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Typography,
  Paper,
  makeStyles,
  AppBar,
  Grid,
  Tabs,
  Tab,
  Box,
  useMediaQuery,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Radio,
  FormLabel,
  RadioGroup,
  FormGroup,
  Checkbox,
  TextField,
  FormControlLabel,
  Avatar,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import InstagramEmbed from 'react-instagram-embed';
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { Search } from "@material-ui/icons";
import InstagramIcon from "@material-ui/icons/Instagram";
import { Editor } from "@tinymce/tinymce-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import {
  FacebookProvider,
  Page,
} from "react-facebook";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { connect } from "react-redux";
import { PaystackButton } from "react-paystack";
import styles from "../../components/payment/payment.module.css";
import { countries } from "../../components/countries/countries";
import { states } from "../../components/countries/nigeria";
import * as actions from "../../src/store/actions";

import {
  GoogleMap,
  MyCustomButton,
  ButtonWithBackdrop,
  MyTextField,
  AddPhoto,
  Contact,
  MyDialog,
} from "../../common";
import Payment from "../payment/payment";
import {
  eventPhoto,
  eventServices,
  getAllEventsCategories,
} from "../../src/services/eventServices";
import { getAllServicesListedByVendors } from "../../src/services/vendorServices";
import GetVendorsByCategory from "../tables/getVendorByCategory";
import useTable from "../tables/useTable";
import Input from "../input/input";
import TagsInput from "./action/createTags";
import { userRouter, useRouter } from "next/router";
import CustomizedSnackbars from "./action/sticker";

const headCells = [
  { id: "check", label: "" },
  { id: "category", label: "Category" },
  { id: "fullName", label: "Name" },
  { id: "email", label: "Email Address (Personal)" },
  { id: "mobile", label: "Mobile Number" },
  { id: "Status", label: "Status", disableSorting: true },
  { id: "button", label: "", disableSorting: true },
];

function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
}

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
          <div>{children}</div>
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
    width: "80%",
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
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  editor: {
    display: "block",
    //margin: "0px 16px",
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
  ml: {
    marginLeft: 10,
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
  small:{
    width:70
  },
  submit:{
    width:132
  },
  vendors: {
    padding: "3rem",
    marginBottom: 12,
    [theme.breakpoints.down('xs')]:{
      padding: 0
    }
  },
  href:{
    color:'black'
  },
  pageContent: {
    padding: theme.spacing(3),
   '&.MuiPaper-root':{
    overflow: 'scroll' 
   },
   [theme.breakpoints.down('xs')]:{
     width:'100%'
   }
  },
  scroll:{
    overflowX:'scroll',
    border: '2px solid red', 
    display:'none'
  },
  searchInput: {
    width: "75%",
  },
}));

const CreateEvent = ({ currentUser }) => {
  const classes = useStyles();
  const router = useRouter();
  const [page, setPage] = useState("Select Plan");
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
    eventCategoryId: "",
    event_title: "",
    experience_level: "choose Experience",
    event_location: "",
    longitude: null,
    latitude: null,
    country: "",
    state: null,
    city: null,
    zip_code: null,
    eventId: "",
    description: "",
    event_summary: "",
    tags: [],
    starting_date: "",
    ending_date: "",
    starting_time: "",
    ending_time: "",
    isRecuringEvent: false,
    event_recuring_ends: null,
    event_recuring_frequency: "Event will repeat",
    expected_no_of_attendees: null,
    event_ticket_types: [],
    event_vendors: [],
    isListed: 0,
  });
  const [coordinate, setCoordinate] = useState({
    lat: null,
    lng: null,
  });
  //const publicKey = "pk_test_c3e2cb5a767ae87838804c0f318d5908caf9f224";
  const publicKey = "pk_test_39c4daf19eaeed726f87da70e2daef48e8717207";
  const amount = 500000; // Remember, set in kobo!
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: (res) => {
      console.log("res", res);
      if (res.status === "success") {
        setDialogTitle(res.status);
        setDialogMessage(res.message);
        setPositiveDialog(true);
        setOpenDialog(true);
        setTimeout(() => {
          setOpenDialog(false);
          setPage("form");
          setUserInput({ ...userInput, type_of_event: "paid" });
        }, 1000);
      }
    },
    onClose: () => alert("Wait! Don't leave :("),
  };
  const [country, setCountry] = useState("Choose a Country");
  const [area, setArea] = useState("Select State");
  const [location, setLocation] = useState("Venue");
  const [event, setEvent] = useState("Single Event");
  const matches = useMediaQuery("(max-width:600px)");
  const [openMessage, setOpenMesaage] = useState(false);
  const [category, setCategory] = useState("Select category");
  const [lisetedCategories, setListedCategories] = useState([]);
  const [listedVendors, setListedVendors] = useState(null);
  const [vendors, setVendors] = useState(null);
  const [description, setDiscription] = useState("");
  const [uploadImage, setUploadImage] = useState(null);
  const [address, setAddress] = useState("");
  const [createTicket, setCreateTicket] = useState([
    {
      type_of_ticket: "Select Type of Ticket",
      available_slots: null,
      amount: null,
      description: "",
    },
  ]);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  let availableTickets = createTicket
    .filter((el) => el.available_slots)
    .map((x) => x.available_slots);
  const sum = availableTickets.reduce(reducer, 0);
  const [open, setOpen] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCountryChange = (e) => {
    const { value } = e.target;
    setCountry(value);
    console.log(value);
  };

  const handleChangePlan = (event, newValue) => {
    setValuee(newValue);
  };
  const handlePayment = () => {
    setPage("payment");
  };
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    console.log("logging....");
    const latLng = await getLatLng(results[0]);
    setCoordinate(latLng);
    setAddress(value);
    setUserInput({
      ...userInput,
      event_location: value,
      longitude: latLng.lng,
      latitude: latLng.lat,
    });
  };
  const handleChangeSelect = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleEditorChange = (e) => {
    setUserInput({ ...userInput, description: e.target.getContent() });
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setUserInput({ ...userInput, eventCategoryId: e.target.value });
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
      list[index][name] = value >= 0 ? parseInt(value) : 0;
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
      available_slots: null,
      amount: null,
      description: "",
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

  const selectedTags = (tags) => {
    console.log(tags);
    userInput.tags = tags;
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
  const handleSavePhoto = async () => {
    if (validateEventInput()) {
      setError("");
      setProceed(true);
      const token = localStorage.getItem("token");
      const response = await eventPhoto(token, uploadImage);
      if (response && response.id) {
        setProceed(response.isLoading);
        setUserInput({ ...userInput, eventId: response.id });
        setPage("submit");
      }
    }
  };
  const next = () => {
    if (validateEventInput()) {
      setError("");
      setOpenMesaage(false);
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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenMesaage(false);
  };

  const handleAvailableSlot = (e) => {
    console.log(userInput);
    const { value } = e.target;
    const { type_of_event } = userInput;
    if (type_of_event === "paid") {
      setUserInput({
        ...userInput,
        expected_no_of_attendees: value >= 0 ? parseInt(value) : 0,
      });
    } else {
      setUserInput({
        ...userInput,
        expected_no_of_attendees: value >= 0 ? parseInt(value) : 0,
        event_ticket_types: [
          {
            type_of_ticket: "Regular",
            available_slots: value >= 0 ? parseInt(value) : 0,
            amount: 0,
            description: "This is a free event",
          },
        ],
      });
    }
  };

  const validateEventInput = () => {
    const {
      event_title,
      experience_level,
      event_location,
      description,
      event_summary,
      expected_no_of_attendees,
      type_of_event,
      country,
      eventCategoryId,
      event_ticket_types,
    } = userInput;
    const validateCreateTicket = [...createTicket];
    if (event_title === "") {
      setError("Enter a valid event title");
      setOpenMesaage(true);
      return;
    }
    if (category === "Select category") {
      setError("Select a valid category");
    }
    if (experience_level === "choose Experience") {
      setError("Select a valid experience level");
      setOpenMesaage(true);
      return;
    }
    if (country === "") {
      setError("Choose a country");
      setOpenMesaage(true);
      return;
    }
    if (country === "Nigeria" && area === "Select State") {
      setError("Choose a valid state");
      setOpenMesaage(true);
      return;
    }
    if (location === "Venue" && event_location === "") {
      setError("Enter a valid Address");
      setOpenMesaage(true);
      return;
    }
    if (location === "Online events" && event_location === "") {
      setError("Enter a valid url");
      setOpenMesaage(true);
      return;
    }
    if (description === "") {
      setError("Enter a valid event description");
      setOpenMesaage(true);
      return;
    }
    if (event_summary.length > 200) {
      setError("Event summary should have a maximum of 200 characters");
      setOpenMesaage(true);
      return;
    }
    if (expected_no_of_attendees === null) {
      setError("Provide expected numbers of attendees");
      setOpenMesaage(true);
      return;
    }
    for (let i = 0; i < validateCreateTicket.length; i++) {
      let position;
      if (i === 0) {
        position = "first";
      }
      if (i === 1) {
        position = "second";
      }
      if (i === 2) {
        position = "third";
      }
      if (
        type_of_event === "paid" &&
        validateCreateTicket[i].type_of_ticket === "Select Type of Ticket"
      ) {
        setError(`Select a valid ticket Type ${position} ticket you chose`);
        setOpenMesaage(true);
        return;
      }
      if (
        type_of_event === "paid" &&
        validateCreateTicket[i].available_slots == null
      ) {
        setError(`add a valid available slots in the ${position} ticket type`);
        setOpenMesaage(true);
        return;
      }
    }

    for (let i = 0; i < validateCreateTicket.length; i++) {
      let position;
      if (i === 0) {
        position = "first";
      }
      if (i === 1) {
        position = "second";
      }
      if (i === 2) {
        position = "third";
      }
      if (
        type_of_event === "paid" &&
        validateCreateTicket[i].available_slots === ""
      ) {
        setError(`add a valid available slots in the ${position} ticket type`);
        setOpenMesaage(true);
        return;
      }
    }
    for (let i = 0; i < validateCreateTicket.length; i++) {
      let position;
      if (i === 0) {
        position = "first";
      }
      if (i === 1) {
        position = "second";
      }
      if (i === 2) {
        position = "third";
      }
      if (type_of_event === "paid" && validateCreateTicket[i].amount === null) {
        setError(`add a valid available amount in the ${position} ticket type`);
        setOpenMesaage(true);
        return;
      }
    }

    for (let i = 0; i < validateCreateTicket.length; i++) {
      let position;
      if (i === 0) {
        position = "first";
      }
      if (i === 1) {
        position = "second";
      }
      if (i === 2) {
        position = "third";
      }
      if (
        type_of_event === "paid" &&
        validateCreateTicket[i].description === ""
      ) {
        setError(
          `kindly tell your clients the benefits of purchasing this kind of ticket in the ${position} ticket type`
        );
        setOpenMesaage(true);
        return;
      }
    }
    if (type_of_event === "paid" && sum !== expected_no_of_attendees) {
      setError(
        "The expected numbers of attendees must be equal available slots"
      );
      setOpenMesaage(true);
      return;
    }

    if (uploadImage === null) {
      setError("You Must Upload an Image");
      setOpenMesaage(true);
      return;
    }
    return true;
  };
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (validateEventInput()) {
      // userInput.event_banner = uploadImage
      userInput.isListed = 1;
      setOpen(true);
      const response = await eventServices(token, userInput);
      if (response) {
        setOpen(false);
        setDialogTitle(response.status);
        setDialogMessage(response.message);
        setPositiveDialog(response.status === "success" ? true : false);
        setOpenDialog(true);
      }
      if (response.status !== "success") {
        setPage("form");
      } else {
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          router.push("/stakeholders/manageevent");
        }, 1000);
      }
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (validateEventInput()) {
      // userInput.event_banner = uploadImage
      userInput.isListed = 0;
      setOpen(true);
      const response = await eventServices(token, userInput);
      if (response) {
        setOpen(false);
        setDialogTitle(response.status);
        setDialogMessage(response.message);
        setPositiveDialog(response.status === "success" ? true : false);
        setOpenDialog(true);
      }
      if (response.status !== "success") {
        setPage("form");
      } else {
        setUserInput(null);
        setPage("form");
      }
    }
  };

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(vendors, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.category.toLowerCase().includes(target.value)
          );
      },
    });
  };

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const services = await getAllServicesListedByVendors(token);
        if (services && services.data) {
          setListedVendors(services.data);
          setVendors(
            services.data.map((item) => {
              return {
                id: item.id,
                isChecked: false,
                category: item.vendorServiceCategory.name,
                name: `${item.User.firstName} ${item.User.lastName}`,
                email: item.User.email,
                phone: item.User.phone,
                price: item.price,
              };
            })
          );
        }
      }
      const response = await getAllEventsCategories();
      if (response && response.data) {
        setListedCategories(response.data);
      }
      if (currentUser && currentUser.id) {
        setName(`${currentUser.firstName}${currentUser.lastName}`);
        setPhone(currentUser.phone);
        setEmail(currentUser.email);
      }
    })();
  }, []);
  let content = null;
  if (vendors && vendors.length > 0) {
    content = (
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Input
            label="Search Vendors by category"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox
                    type="checkbox"
                    name="select"
                    checked={item.isChecked}
                    onChange={(e) => {
                      let checked = e.target.checked;
                      console.log(checked);
                      setVendors(
                        vendors.map((data) => {
                          if (item.id === data.id) {
                            data.isChecked = checked;
                          }
                          return data;
                        })
                      );
                      const ids = vendors.filter((el) => el.isChecked === true);
                      const lists = [];
                      ids.map((cur) => lists.push(cur.id));
                      userInput.event_vendors = lists;
                      setUserInput({ ...userInput, event_vendors: lists });
                      console.log(userInput);
                    }}
                  />
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell><a className={classes.href}  href={`/service/${item.id}`} target="_blank">Veiw</a></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    );
  } else {
    content = (
      <Paper className={classes.pageContent}>
        <h1 style={{ textAlign: "center" }}>There is no data available</h1>
      </Paper>
    );
  }

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
      <CustomizedSnackbars
        message={error}
        open={openMessage}
        handleClose={handleClose}
      />
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
                label="Paid"
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
                          onClick={() => {
                            setPage("form");
                            setUserInput({
                              ...userInput,
                              type_of_event: "free",
                            });
                          }}
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
                        label="Instagram"
                        style={{ fontSize: 14 }}
                        {...a11yProps(0)}
                      />
                      <Tab
                        label="Facebook"
                        style={{ fontSize: 14 }}
                        {...a11yProps(1)}
                      />
                      {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
                    </Tabs>
                  </AppBar>
                  <TabPanel value={value} index={0}>
                  <InstagramEmbed
                  url='https://www.instagram.com/p/CIROF9QnwLq/'
                  clientAccessToken='662642454397577|ad6311f67f33f67e58d21e561943b6d1'
                  maxWidth={320}
                  hideCaption={false}
                  containerTagName='div'
                  protocol=''
                  injectScript
                  onLoading={() => {}}
                  onSuccess={() => {}}
                  onAfterRender={() => {}}
                  onFailure={() => {}}
                />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <FacebookProvider appId="662642454397577">
                      <Page
                        href="https://www.facebook.com/cityeventssocial"
                        tabs="timeline"
                      />
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
                          <p className={classes.value}>₦5,000</p>
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
      {page === "payment" && (
        <div className={styles.App}>
          <div className={styles.container}>
            <div className={styles.item}>
              <div className={styles.overlayEffect}></div>
              <img
                className={styles.itemImage}
                src="https://cdn.bcdtravel.com/move-uk/wp-content/uploads/sites/210/credit-card-debit-card.jpg"
                alt="product"
              />
              <div className={styles.itemDetails}>
                <p className={styles.itemDetailsTitle}>Service Charge</p>
                <p className={styles.itemDetailsAmount}>NGN{amount / 100}</p>
              </div>
            </div>
            <div className={styles.checkout}>
              <div className={styles.checkoutForm}>
                <div className={styles.checkoutField}>
                  <label className={styles.checkoutFieldLabel}>Name</label>
                  <input
                    className={styles.checkoutFieldInput}
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className={styles.checkoutField}>
                  <label className={styles.checkoutFieldLabel}>Email</label>
                  <input
                    className={styles.checkoutFieldInput}
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={styles.checkoutField}>
                  <label className={styles.checkoutFieldLabel}>Phone</label>
                  <input
                    className={styles.checkoutFieldInput}
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <PaystackButton
                  className={styles.paystackButton}
                  {...componentProps}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {page === "form" && (
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} className={classes.pr}>
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
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
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
              <h3>Choose country</h3>
              <Autocomplete
                id="country-select-demo"
                options={countries}
                classes={{
                  option: classes.option,
                }}
                autoHighlight
                getOptionLabel={(option) => option.label}
                onInputChange={(event, newValue) => {
                  setUserInput({
                    ...userInput,
                    country: newValue,
                    state: null,
                  });
                  setArea("Select State");
                }}
                renderOption={(option) => (
                  <React.Fragment>
                    <span>{countryToFlag(option.code)}</span>
                    {option.label} ({option.code}) +{option.phone}
                  </React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a country"
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
              {userInput.country === "Nigeria" && (
                <div>
                  <h3>Choose state</h3>
                  <FormControl className={classes.formControl}>
                    <Select
                      labelId="title-type"
                      id="state"
                      variant="outlined"
                      value={area}
                      onChange={(e) => {
                        const { value } = e.target;
                        setArea(value);
                        setUserInput({ ...userInput, state: value });
                      }}
                      fullWidth
                    >
                      <MenuItem value="Select State">Select State</MenuItem>
                      {states.map((state) => (
                        <MenuItem value={state} key={state}>
                          {state}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}
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
            </Grid>
            <Grid item xs={12} sm={6} className={classes.bg}></Grid>
          </Grid>
          <div className={classes.map}>
            {address && (
              <GoogleMap
                location={address}
                lat={coordinate.lat}
                lng={coordinate.lng}
              />
            )}
          </div>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <div>
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
              </div>
            </Grid>
            <Grid item xs={12} className={classes.editor}>
              <h3>Description</h3>
              <p>Describe your event</p>
              <Editor
                initialValue={`<p>${userInput.description}</p>`}
                outputFormat="text"
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
              <TagsInput selectedTags={selectedTags} tags={[]} />
              {/* {tags.map((item, i) => {
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
              })} */}
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
                      id="timee"
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
                            event_recuring_ends: e.target.value,
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
              <p>How many people do you expect to attend this event?</p>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl} fullWidth>
                  <MyTextField
                    id="number"
                    type="number"
                    name="number"
                    required="required"
                    label="No. of attendees"
                    placeholder="Enter numbers of expected guest"
                    value={userInput.expected_no_of_attendees}
                    onChange={handleAvailableSlot}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.editor}>
              {userInput.type_of_event === "paid" && (
                <Grid container spacing={3}>
                  <div>
                    <h3>Ticket</h3>
                    <p>
                      Let us know the types of tickets that will be available
                      for your event
                    </p>
                  </div>
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
                          <Grid item xs={12} sm={6} md={3}>
                            <FormControl
                              className={classes.formControl}
                              fullWidth
                            >
                              <MyTextField
                                id="des"
                                variant="outlined"
                                type="text"
                                name="description"
                                required="required"
                                label="Describe benefits"
                                placeholder="Describe benefits"
                                value={item.description}
                                onChange={(e) => handleChangeCreateTicket(e, i)}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      {createTicket.length > 1 && (
                                        <RemoveCircleOutlineIcon
                                          className={classes.icon}
                                          onClick={() => removeItems(i)}
                                        />
                                      )}
                                    </InputAdornment>
                                  ),
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      {createTicket.length < 3 && (
                                        <AddCircleIcon
                                          className={classes.icon}
                                          onClick={addItems}
                                        />
                                      )}
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </FormControl>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              )}
              <div className={classes.proceed}>
                <MyCustomButton
                className={classes.small}
                  onClick={previous}
                  changeClass={true}
                  progress={back}
                >
                  {!back && 'Back'}
                </MyCustomButton>
                <MyCustomButton
                className={classes.small}
                  onClick={userInput.eventId === "" ? handleSavePhoto : next}
                  changeClass={true}
                  progress={proceed}
                >
                  {!proceed && 'Next'}
                </MyCustomButton>
              </div>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} style={{ marginTop: 20 }}>
                <Contact />
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
      {page === "submit" && (
        <div>
          <Container>
            <div className={classes.vendors}>{content}</div>
            <div className={classes.auto}>
              <ButtonWithBackdrop className={classes.submit} label="Save" click={handleSave} open={open} />
              <div className={classes.ml}>
                <ButtonWithBackdrop
                className={classes.submit}
                  label="Create Event"
                  click={handleSubmit}
                  open={open}
                />
              </div>
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.userId ? state.auth.userId : [],
  };
};

export default connect(mapStateToProps)(CreateEvent);
