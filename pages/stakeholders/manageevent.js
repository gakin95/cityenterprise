import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import { useRouter } from "next/router";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

import Attendees from "../stakeholders/Attendees/[attendees]";
import HostandVendorDashBoard from "../../components/dashboards/eventHostAndVendor/dashboard";
import ManageEvents from "../../components/createEvents/action/manageEvents";
import {
  getMyApprovedEvents,
  getMyDisApprovedEvents,
  getMySavedEvents,
  getPendingEvents,
  deleteEvent,
} from "../../src/services/eventServices";
import {
  stopTicketSale,
  resumeTicketSale,
} from '../../src/services/ticket';
import { baseUrl } from "../../constants";
import { Container } from "../../components/section";
import Spinner from "../../common/Backdrop";
import { MyConfirmationDialog } from "../../common";
import CustomizedSnackbars from "../../components/createEvents/action/sticker";

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
        <Box component="div" m={3}>
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
const useStyles = makeStyles((theme) => ({
  container:{
    [theme.breakpoints.down('xs')]:{
      margin:12,
      marginTop:'6rem'
    }
  },
}));

const Manageevent = () => {
  const router = useRouter();
  const [approvedEvents, setApprovedEvents] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  const [value, setValue] = React.useState(0);
  const [dissapprovedEvents, setDisapprovedEvents] = useState([]);
  const [disapprovedMessage, setDisapprovedMessage] = useState(null);
  const [messagePending, setMessgePending] = useState(null);
  const [messageApproved, setMessgeApproved] = useState(null);
  const [messageSaved, setMessgeSaved] = useState(null);
  const [loading, setLoading] = useState(false);
  const [takeAction, setTakeAction] = useState(false);
  const [id, setId] = useState(null);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [clickedPending, setClickPending] = useState(false);
  const [decide, setDecide] = useState(false);
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 

  useEffect(() => {
    setLoading(true);
    const identity = localStorage.getItem("token");
    if (identity) {
      (async () => {
        if (identity) {
          const response = await getMyApprovedEvents(identity);
          console.log('===========================================res',response)
          if (response && response.data) {
            setLoading(response.isLoading);
            setMessgeApproved(response.message);
            setApprovedEvents(
              response.data.map((event) => {
                return {
                  key: event.id,
                  id: event.id,
                  slug: event.slug,
                  image: event.event_banner,
                  title: event.event_title,
                  content: event.event_summary,
                  type_of_event: event.type_of_event,
                  eventCategory: event.eventCategory.name,
                  date: event.starting_date,
                  address: event.event_location,
                  action: event.isSoldOut? 'Resume Sales' : 'Stop Sales',
                };
              })
            );
          } else {
            setLoading(response.isLoading);
            setMessgeApproved(response.message);
          }
        }
      })();
    } else {
      setLoading(false);
      setMessgeApproved(
        "Unauthorized: you are not permitted to access this page if you are not logged in"
      );
      router.push("/signin");
    }
  }, [decide]);
  useEffect(() => {
    const identity = localStorage.getItem("token");
    (async () => {
      if (identity) {
        const response = await getPendingEvents(identity);
        console.log("pending res.......", response);
        if (response && response.data) {
          setMessgePending(
            response.data > 0
              ? response.message
              : "No event created by you is pending, we encourage you to create an event"
          );
          setPendingEvents(
            response.data.map((event) => {
              return {
                key: event.id,
                id: event.id,
                slug: event.slug,
                image: event.event_banner,
                title: event.event_title,
                content: event.event_summary,
                type_of_event: event.type_of_event,
                eventCategory: event.eventCategory.name,
                date: event.starting_date,
                address: event.event_location,
                edit: "Edit",
                delete: "Delete",
              };
            })
          );
        } else {
          setMessgePending(response.message);
        }
      }
    })();
  }, []);
  useEffect(() => {
    const identity = localStorage.getItem("token");
    (async () => {
      if (identity) {
        const response = await getMySavedEvents(identity);
        console.log("saved res", response);
        if (response && response.data) {
          setMessgeSaved(
            response.data > 0 ? response.message : "No message saved"
          );
          setSavedEvents(
            response.data.map((event) => {
              return {
                key: event.id,
                id: event.id,
                slug: event.slug,
                image: event.event_banner,
                title: event.event_title,
                content: event.event_summary,
                type_of_event: event.type_of_event,
                eventCategory: event.eventCategory.name?vent.eventCategory.name:'edit to add category',
                date: event.starting_date,
                address: event.event_location,
                edit: "Edit",
                delete: "Delete",
              };
            })
          );
        } else {
          setMessgeSaved(response.message);
        }
      }
    })();
  }, []);
  useEffect(() => {
    const identity = localStorage.getItem("token");
    (async () => {
      if (identity) {
        const response = await getMyDisApprovedEvents(identity);
        console.log("disapproved res...", response);
        if (response && response.data) {
          setDisapprovedMessage(
            response.data > 0 ? response.message : "No event found"
          );
          setDisapprovedEvents(
            response.data.map((event) => {
              return {
                key: event.id,
                id: event.id,
                slug: event.slug,
                image: event.event_banner,
                title: event.event_title,
                content: event.event_summary,
                type_of_event: event.type_of_event,
                eventCategory: event.eventCategory.name,
                date: event.starting_date,
                address: event.event_location,
                edit: "Edit",
                delete: "Delete",
              };
            })
          );
        } else {
          setDisapprovedMessage(response.message);
        }
      }
    })();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const stopSales = async (id) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const response = await stopTicketSale(token,id);
    console.log('===stopin===',response);
    if (response && response.data){
      setLoading(false);
      setSuccess(response.status === "success" ? true : false);
      setMessage(response.message);
      if (response.status === 'success') {
        setDecide(!decide)
      }
    }
  }

  const resumeSales = async (id) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const response = await resumeTicketSale(token,id);
    console.log('===stopin===',response);
    if (response && response.data){
      setLoading(false);
      setSuccess(response.status === "success" ? true : false);
      setMessage(response.message);
      if (response.status === 'success') {
        setDecide(!decide)
      }
    }
  }

  const DecideSales = async (id) => {
    const tempItems = [...approvedEvents];
    const curItems = tempItems.find((item) => item.slug === id);
    if (curItems.action === 'Resume Sales'){
      resumeSales(id)
    }else{
      stopSales(id)
    }
  }

  const onDeleteSaved = async (id) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const tempItems = [...savedEvents];
    const curItems = tempItems.filter((item) => item.id !== id);
    setSavedEvents(() => curItems);
    const response = await deleteEvent(token, id);
    if (response && response.status) {
      setLoading(false);
      setTakeAction(false);
      setOpen(true);
      setSuccess(response.status === "success" ? true : false);
      setMessage(response.message);
    }
  };

  const onDeletePending = async (id) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const tempItems = [...pendingEvents];
    const curItems = tempItems.filter((item) => item.id !== id);
    setPendingEvents(() => curItems);
    const response = await deleteEvent(token, id);
    if (response && response.status) {
      setLoading(false);
      setTakeAction(false);
      setOpen(true);
      setSuccess(response.status === "success" ? true : false);
      setMessage(response.message);
    }
  };

  return (
    <Container className={classes.container}>
      <Spinner loading={loading} />
      <MyConfirmationDialog
        openDialog={takeAction}
        onClose={() => setTakeAction(false)}
        action={() =>
          clickedPending ? onDeletePending(id) : onDeleteSaved(id)
        }
      >
        Are you sure you want to delete this coupon?
      </MyConfirmationDialog>
      <CustomizedSnackbars
        message={message}
        open={open}
        success={success}
        handleClose={handleClose}
      />
      <KeyboardBackspaceIcon
        style={{ cursor: "pointer" }}
        onClick={() => router.push("/stakeholders/in")}
      />
      <h4>Review events created</h4>
      <AppBar
        style={{ backgroundColor: "white", boxShadow: "none" }}
        position="static"
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="primary"
          aria-label="simple tabs example"
        >
          <Tab
            label="Published events"
            {...a11yProps(0)}
            style={{ textTransform: "none" }}
          />
          <Tab
            label="Events awaiting approvals"
            {...a11yProps(1)}
            style={{ textTransform: "none" }}
          />
          <Tab
            label="Saved events"
            {...a11yProps(2)}
            style={{ textTransform: "none" }}
          />
          <Tab
            label="Disapproved events"
            {...a11yProps(3)}
            style={{ textTransform: "none" }}
          />
        </Tabs>
      </AppBar>
      <div>
        <TabPanel value={value} index={0}>
          {/* <h4 style={{fontSize:16, textAlign:"center"}}>Published Events</h4> */}
          {approvedEvents.length > 0 ? (
            <Grid container spacing={3}>
              {approvedEvents.map((current) => (
                <Grid item xs={12} sm={6} md={4} key={current.id}>
                  <ManageEvents
                    image={baseUrl + current.image}
                    title={current.title}
                    content={current.content}
                    date={current.date}
                    amount={current.amount}
                    action={current.action}
                    type_of_event={current.type_of_event}
                    eventCategory={current.eventCategory}
                    view={"View Attendees"}
                    decision={() => DecideSales(current.slug)}
                    viewAttendees={() =>
                      router.push(`/stakeholders/Attendees/${current.id}`)
                    }
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <div>
              <h3>{messageApproved}</h3>
            </div>
          )}
        </TabPanel>
      </div>
      <div>
        {/* <h4 style={{fontSize:16, textAlign:"center"}}>Events Awaiting Approvals</h4> */}
        <TabPanel value={value} index={1}>
          {pendingEvents.length ? (
            <Grid container spacing={3}>
              {pendingEvents.map((current) => (
                <Grid item xs={12} sm={6} md={4} key={current.id}>
                  <ManageEvents
                    image={baseUrl + current.image}
                    title={current.title}
                    content={current.content}
                    date={current.date}
                    level={current.level}
                    amount={current.amount}
                    edit={current.edit}
                    delete={current.delete}
                    onDelete={() => {
                      setClickPending(true);
                      setId(current.id);
                      setTakeAction(true);
                    }}
                    onEdit={() =>
                      router.push(`/stakeholders/event/${current.slug}`)
                    }
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <div>
              <h3>{messagePending}</h3>
            </div>
          )}
        </TabPanel>
      </div>

      <div>
        <TabPanel value={value} index={2}>
          {/* <h4 style={{fontSize:16, textAlign:"center"}}>Saved Events</h4> */}
          {savedEvents.length ? (
            <Grid container spacing={3}>
              {savedEvents.map((current) => (
                <Grid item xs={12} sm={6} md={4} key={current.id}>
                  <ManageEvents
                    image={baseUrl + current.image}
                    title={current.title}
                    content={current.content}
                    date={current.date}
                    amount={current.amount}
                    action={current.action}
                    type_of_event={current.type_of_event}
                    eventCategory={current.eventCategory}
                    onDelete={() => {
                      setClickPending(false);
                      setId(current.id);
                      setTakeAction(true);
                    }}
                    edit={current.edit}
                    delete={current.delete}
                    onEdit={() =>
                      router.push(`/stakeholders/event/${current.slug}`)
                    }
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <div>
              <h3>{messageSaved}</h3>
            </div>
          )}
        </TabPanel>
      </div>
      <div>
        <TabPanel value={value} index={3}>
          {/* <h4 style={{fontSize:16, textAlign:"center"}}>Disapproved Events</h4> */}
          {dissapprovedEvents.length > 0 ? (
            <Grid container spacing={3}>
              {dissapprovedEvents.map((current) => (
                <Grid item xs={12} sm={6} md={4} key={current.id}>
                  <ManageEvents
                    image={baseUrl + current.image}
                    title={current.title}
                    content={current.content}
                    date={current.date}
                    amount={current.amount}
                    action={current.action}
                    type_of_event={current.type_of_event}
                    eventCategory={current.eventCategory}
                    view={"View Attendees"}
                    viewAttendees={() =>
                      router.push(`/stakeholders/Attendees/${current.id}`)
                    }
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <div>
              <h3>{disapprovedMessage}</h3>
            </div>
          )}
        </TabPanel>
      </div>
    </Container>
  );
};
export default Manageevent;
