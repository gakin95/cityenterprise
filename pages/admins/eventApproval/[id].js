import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Moment from "react-moment";
import { useRouter } from "next/router";
import { Container } from "../../../components/section";
import { MyCustomButton } from "../../../common";
import { getEventDetails } from "../../../src/services/eventServices";
import { ApproveEvent, DisApproveEvent } from "../../../src/services/admin";
import { connect } from "react-redux";
import { baseUrl } from "../../../constants";
import * as actions from "../../../src/store/actions";
// import Calendar from "../../../common/calendar";
import { MyDialog, ReasonForDisapproval } from "../../../common/confirm";
import BackDrop from "../../../common/Backdrop";
import CustomizedSnackbars from "../../../components/createEvents/action/sticker";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 30,
    paddingBottom: 70,
    margin: 50,
    [theme.breakpoints.down("xs")]: {
      margin: 0,
    },
  },
  wrapper: {
    background:
      "transparent linear-gradient(180deg, #FEEDD7 0%, #7F776C 100%) 0% 0% no-repeat padding-box",
  },
  card: {
    maxWidth: "50%",
    margin: "auto",
    marginTop: 30,
    [theme.breakpoints.down("xs")]: {
      maxWidth: "90%",
    },
  },
  icon: {
    display: "flex",
    alignItems: "center",
  },
  media: {
    height: 200,
    width: "50%",
    float: "right",
    backgroundColor: "green",
    [theme.breakpoints.down("xs")]: {
      float: "left",
      width: "100%",
    },
  },
  date: {
    float: "right",
    [theme.breakpoints.down("xs")]: {
      float: "left",
      width: "100%",
    },
    fontSize: 12,
    marginRight: 30,
    fontWeight: "bold",
  },
  price: {
    //fontSize:10,
    paddingLeft: 20,
  },

  tickets: {
    border: "1px solid rgb(236, 91, 38)",
    borderRadius: 0,
  },
  cardfooter: {
    //border:'1px solid grey',
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing(1),
    backgroundColor: "#f1f1f1",
    height: "60%",
    justifyContent: "center",
    top: 700,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  description: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paper1: {
    backgroundColor: "#38b9f0",
    height: "40%",
    color: "white",
    borderRadius: 7,
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  profilegrid: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  textheader: {
    fontWeight: "bold",
  },
  line: {
    height: 2,
    width: "100%",
    backgroundColor: "grey",
  },
  source: {
    fontWeight: "bold",
    textAlign: "center",
    color: "orangeRed",
  },
  textsource: {
    fontWeight: "bold",
    alignItems: "center",
  },
  follow: {
    width: 150,
    height: 40,
    border: "1px solid orangeRed",
    marginLeft: 10,
    backgroundColor: "white",
  },
  contact: {
    width: "50%",
    margin: "0 auto",
  },
  map: {
    width: "100%",
  },
  location: {
    width: "80%",
    margin: "0 auto",
    textAlign: "center",
  },
  location2: {
    width: "20%",
    margin: "0 auto",
    textAlign: "center",
  },
  location3: {
    width: "40%",
    margin: "0 auto",
    textAlign: "center",
  },
  locationIcon: {
    width: "20%",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  otherEvents: {
    width: "40%",
    margin: "0 auto",
    textAlign: "center",
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 110,
    fontSize: 12,
    borderBottom: "1px solid white",
  },
  labeldate: {
    position: "relative",
    top: 39,
    left: -40,
  },
  input: {
    marginTop: 26,
    borderLeft: 0,
    borderRight: 0,
    borderTop: 0,
    width: "80%",
    borderBottom: "1px solid grey",
    // backgroundColor:'transparent',
    cursor: "pointer",
    color: "grey",
  },
  events: {
    color: "white",
    borderRight: "1px solid white",
  },
  filter: {
    color: "grey",
    // borderRight:'1px solid white',
  },
  filterdate: {
    color: "transparent",
    // borderBottom:'1px solid grey'
  },
  filterprice: {
    color: "grey",
  },
  advert: {
    paddingTop: 50,
  },
  description: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  time: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      margin: "0 auto",
    },
  },
  dateheader: {
    color: "#848589",
  },
  tags: {
    display: "flex",
  },
  tic: {
    color: theme.palette.primary.main,
  },
  btngroup: {
    display: "flex",
    //flexDirection: "column",
  },
  tagbtn: {
    textTransform: "none",
    border: "1px solid #fff",
    borderRadius: 5,
    backgroundColor: "#2B2B2B",
    paddingTop: 10,
    paddingBottom: 10,
    color: "#fff",
    //cursor: "pointer",
    marginTop: 10,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  name: {
    font: "normal normal bold 20px/24px Work Sans",
  },
  vendor: {
    background: "#F5F5F5 0% 0% no-repeat padding-box",
    borderRadius: 12,
    padding: 20,
    width: "85%",
    marginBottom: 10,
    [theme.breakpoints.down("sm")]: {
      paddingRight: 0,
      width: "100%",
    },
  },
  action: {
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
  },
  btn: {
    width: 100,
    marginLeft: 19,
  },
}));

const UpcomingEventDetails = ({ LoadData }) => {
  const router = useRouter();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = router.query;
  const [message, setMessage] = useState(null);
  const [tags, setTags] = useState([]);
  const [Prices, setPrices] = useState([]);
  const [progress, setProgress] = useState(false);
  const [reject, setReject] = useState(false);
  const [approve, setApprove] = useState(false);
  const [proceed, setProceed] = useState(false);
  const [info, setInfo] = useState(null);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [openreject, setOpenReject] = useState(false);
  const [reason_for_disapproval, setReason] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      (async () => {
        setLoading(true);
        const response = await getEventDetails(id);
        console.log("..................................res", response);
        if (response && response.data) {
          setMessage(response.message);
          setLoading(response.isLoading);
          setEventDetails(response.data);
          setTags(response.data.id ? response.data.tags.split(",") : []);
          setPrices(
            response.data.id
              ? response.data.EventTickets.map((item) => item.amount)
              : []
          );
          LoadData(response.data);
        }
      })();
    } else {
      router.push("/signin");
    }
  }, [router]);

  const approveEvent = async () => {
    setApprove(true);
    const token = localStorage.getItem("token");
    const response = await ApproveEvent(token, id);
    console.log("acc....", approve);
    if (response && response.status) {
      setApprove(response.isLoading);
      setProgress(false);
      setOpen(true);
      setSuccess(response.status === "success" ? true : false);
      setInfo(response.message);
      if (response.status === "success") {
        setTimeout(() => {
          router.push("/admins/pendingapprovals");
        }, 1000);
      }
    }
  };

  const disApproveEvent = async () => {
    setProceed(true);
    const token = localStorage.getItem("token");
    const response = await DisApproveEvent(token, id, reason_for_disapproval);
    console.log("disapp", response);
    if (response && response.status) {
      setProceed(response.isLoading);
      setReject(false);
      setOpen(true);
      setInfo(response.message);
      setSuccess(response.status === "success" ? true : false);
      if (response.status === "success") {
        setTimeout(() => {
          router.push("/admins/pendingapprovals");
        }, 2000);
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const min = Prices.reduce((a, b) => Math.min(a, b), Infinity);

  const classes = useStyles();
  let render;
  if (eventDetails && eventDetails.User) {
    render = (
      <Grid container spacing={5}>
        <Grid item xs={12} className={classes.wrapper}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={baseUrl + eventDetails.event_banner}
                title={baseUrl + eventDetails.event_banner}
              />

              <Grid item xs={12} md={12}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    className={classes.date}
                  ></Typography>
                  <br />
                  <br />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {eventDetails.event_summary}
                  </Typography>
                </CardContent>
              </Grid>
            </CardActionArea>

            <CardActions>
              <div className={classes.cardfooter}>
                <p className={classes.price}>
                  <b>
                    {eventDetails.type_of_event === "Free"
                      ? eventDetails.type_of_event
                      : `Starts from ₦${min}`}
                  </b>
                </p>
              </div>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <div className={classes.description}>
            <div>
              <p>Description</p>
              <p className={classes.dateheader}>Session overview:</p>
            </div>
            <div>
              <p className={classes.dateheader}>
                {" "}
                <b>Date and Time</b>
              </p>
              <div className={classes.time}>
                <DateRangeIcon color="primary" />
                <Moment format="D MMM YYYY">
                  {eventDetails.starting_date}
                </Moment>
              </div>
              <div className={classes.time}>
                <AccessTimeIcon color="primary" />
                <p>
                  {eventDetails.starting_time}
                  {parseInt(eventDetails.starting_time.substring(0, 2)) > 12
                    ? "pm"
                    : "am"}{" "}
                  to {eventDetails.ending_time}
                  {parseInt(eventDetails.ending_time.substring(0, 2)) > 12
                    ? "pm"
                    : "am"}
                </p>
              </div>
              {/* <Calendar /> */}
            </div>
          </div>
          <br />
          <br />
          <div
            dangerouslySetInnerHTML={{
              __html: eventDetails && eventDetails.description,
            }}
          />
          <h4>Tags</h4>
          <div className={classes.tags}>
            <div className={classes.btngroup}>
              {tags.map((item, i) => (
                <button key={i} className={classes.tagbtn}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <h4>Ticket details</h4>
          {eventDetails.EventTickets.map((item) => (
            <div key={item.id}>
              <h4 className={classes.tic}>{item.type_of_ticket}</h4>
              <p>
                <b>Price:</b> {item.amount}
              </p>
              <p>
                <b>Available slots:</b> {item.available_slots}
              </p>
              <p>
                <b>Description:</b> {item.description}
              </p>
            </div>
          ))}
        </Grid>
        <Grid item xs={12}>
          <p className={classes.name}>Vendors</p>
          {eventDetails.EventVendors.map((item, index) => (
            <div className={classes.vendor} key={index}>
              <div>
                <b>Name:</b>{" "}
                {`${item.vendorService.User.firstName} ${item.vendorService.User.lastName} `}
              </div>
              <div>
                <b>Bussiness Name: </b>
                {item.vendorService.User.business_name}
              </div>
              <div>
                <b>description: </b>
                {item.vendorService.description}
              </div>
              <div>
                <b>Phone No:</b> {item.vendorService.User.phone}
              </div>
            </div>
          ))}
        </Grid>
        <Grid item xs={12}>
          <div className={classes.location}>
            <p className={classes.textsource}>{eventDetails.event_title}</p>
          </div>
          <div className={classes.location2}>
            <p className={classes.textsource}>at</p>
          </div>
          <div className={classes.location3}>
            <p className={classes.textsource}>{eventDetails.event_location}</p>
          </div>
          <div className={classes.locationIcon}>
            <DriveEtaIcon />
            <DirectionsBusIcon />
            <TransferWithinAStationIcon />
            <DirectionsBikeIcon />
          </div>
        </Grid>
        {!eventDetails.isApproved && (
          <Grid item xs={12}>
            <div className={classes.action}>
              <MyCustomButton
                className={classes.btn}
                changeClass={true}
                onClick={() => setProgress(true)}
              >
                {"Approve"}
              </MyCustomButton>
              <MyCustomButton
                className={classes.btn}
                changeClass={true}
                onClick={() => setOpenReject(true)}
              >
                {"Disapprove"}
              </MyCustomButton>
            </div>
          </Grid>
        )}
      </Grid>
    );
  } else {
    render = (
      <div>
        <h3>{message}</h3>
      </div>
    );
  }
  return (
    <Container title="event">
      <CustomizedSnackbars
        message={info}
        open={open}
        success={success}
        handleClose={handleClose}
      />
      <MyDialog
        openDialog={progress}
        title="Are you sure you want to approve this event?"
        image={eventDetails && baseUrl + eventDetails.event_banner}
        onClick={() => approveEvent()}
        onClose={() => setProgress(false)}
      />
      <MyDialog
        openDialog={openreject}
        title="Are you sure you want to disapprove this event?"
        image={eventDetails && baseUrl + eventDetails.event_banner}
        onClick={() => {
          setReject(true);
          setOpenReject(false);
        }}
        onClose={() => setOpenReject(false)}
      />
      <ReasonForDisapproval
        value={reason_for_disapproval}
        onChange={(e) => setReason(e.target.value)}
        openDialog={reject}
        image={eventDetails && baseUrl + eventDetails.event_banner}
        progress={proceed}
        onClick={() => disApproveEvent()}
        onClose={() => setReject(false)}
      />
      <BackDrop loading={loading} />
      <div className={classes.root}>{render}</div>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    LoadData: (data) => dispatch(actions.ticketDetails(data)),
  };
};

export default connect(null, mapDispatchToProps)(UpcomingEventDetails);
