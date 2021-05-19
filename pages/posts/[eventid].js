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
  Paper,
  Divider,
  Grid,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShareIcon from "@material-ui/icons/Share";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import DateRangeIcon from "@material-ui/icons/DateRange";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Avatar from "@material-ui/core/Avatar";
import Moment from "react-moment";
// import AddToCalendar from 'react-add-to-calendar';
import { useRouter } from "next/router";
import { Container } from "../../components/section";
import { GoogleMap } from "../../common";
import BookTicketDialog from "../../components/purchase/bookTicket";
import { getEventDetails } from "../../src/services/eventServices";
import { connect } from "react-redux";
import { baseUrl } from "../../constants";
import * as actions from "../../src/store/actions";
import Calendar from "../../components/calender/calendar";
import BackDrop from "../../common/Backdrop";
import SocialShare from "../../components/share/share";
import ShareModal from "../../components/modal/share";

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
  share: {
    cursor: "pointer",
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
  avatarItem: {
    color: "#000",
    backgroundColor: "#fff",
    boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
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
   // cursor: "pointer",
    marginTop: 10,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const UpcomingEventDetails = ({ LoadData }) => {
  const router = useRouter();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const { eventid } = router.query;
  const [like, SetLike] = useState(false);
  const [message, setMessage] = useState(null);
  const [tags, setTags] = useState([]);
  const [Prices, setPrices] = useState([]);
  let [open, setOpenDialog] = useState(false);
  const link = "http://cityevents.tk/posts/" + eventid;
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await getEventDetails(eventid);
      if (response && response.data) {
        setLoading(response.isLoading);
        setMessage(response.message);
        setEventDetails(response.data);
        setTags(response.data.id ? response.data.tags.split(",") : []);
        setPrices(
          response.data.id
            ? response.data.EventTickets.map((item) => item.amount)
            : []
        );
        LoadData(response.data);
      }
      if (response && response.status === "Bad request") {
        setLoading(response.isLoading);
        setMessage(response.message);
      }
    })();
  }, [router]);

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
                <div className={classes.icon}>
                <Avatar className={classes.avatarItem}>
                  <ShareIcon
                    className={classes.share}
                    onClick={() => setOpenDialog(true)}
                  />
                  </Avatar>
                  <div>
                    {like ? (
                      <Avatar className={classes.avatarItem}>
                      <FavoriteIcon
                        onClick={() => SetLike(!like)}
                        color="error"
                      />
                      </Avatar>
                    ) : (
                      <Avatar className={classes.avatarItem}>
                      <FavoriteBorderIcon onClick={() => SetLike(!like)} />
                      </Avatar>
                    )}
                  </div>
                </div>
                <p className={classes.price}>
                  <b>
                    {eventDetails.type_of_event === "free"
                      ? eventDetails.type_of_event
                      : `Starts from ₦${min}`}
                  </b>
                </p>
                <BookTicketDialog />
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
                <Moment format="ddd, MMM Do, yy">
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
              <Calendar
                description={eventDetails.event_summary}
                title={eventDetails.event_title}
              />
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
                <button key={i} className={classes.tagbtn} disabled={true}>
                  {item}
                </button>
              ))}
            </div>
          </div>
          <p className={classes.textheader}>Share with Friends</p> <br />
          <FacebookIcon style={{ color: "blue" }} />
          <LinkedInIcon style={{ color: "blue" }} />
          <TwitterIcon style={{ color: "#38b9f0" }} />
          <InstagramIcon color="orangeRed" />
        </Grid>
        <Grid item xs={12}>
          <div className={classes.contact}>
            <button className={classes.follow}>Follow</button>
            <button className={classes.follow}>Contact</button>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.map}>
            <GoogleMap
              location={eventDetails.event_location}
              lat={eventDetails.latitude}
              lng={eventDetails.longitude}
            />
          </div>
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
        <Grid item xs={12}>
          <div className={classes.otherEvents}>
            <p className={classes.textsource}>Other Events You May Like</p>
          </div>
        </Grid>
        <ShareModal openDialog={open} onClose={() => setOpenDialog(false)}>
          <SocialShare
            name={eventDetails.event_title}
            url={baseUrl + eventDetails.event_banner}
            link={link}
          />
        </ShareModal>
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
