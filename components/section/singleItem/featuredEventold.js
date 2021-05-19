import React, {useState} from "react";
import clsx from "clsx";
import { 
    Paper,
    Typography
 } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import Naira from "react-naira";
import { Colors } from "../../../constants";

const useStyles = makeStyles((theme) => ({
    container:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    },
  root: {
    padding: "0px !important",
    textDecoration: "none !important",
    width: "90%",
    height: "28.8rem",
    // display:'flex',
    // alignItems:'center',
    // justifyContent:'center',
    //flexDirection:'column',
    [theme.breakpoints.down("xs")]: {
      height: "50rem",
      width: "95%",
    },
  },
  item: {
    height: "21.5rem",
    width: "100%",
    display: "flex",
    padding: "0px !important",
    overflow: "hidden",
    cursor: "pointer",
    textDecoration: "none !important",
    "&:hover": {
      backgroundColor: "#ddd",
      "& div:first-child": {
        backgroundSize: "110% 110%",
        transition: "background-size 10s",
        "-webkit-transition": "background-size 10s",
      },
    },
    [theme.breakpoints.down("xs")]: {
       height: '40rem',
      flexDirection: "column"
    },
  },
  image: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    flex: 0.45,
  },
  right: {
    flex: 0.55,
    position: "relative",
    textDecoration: "none !important",
    backgroundColor: "#534C4C",
    color: "#fff",
  },
  desc: {
    position: "relative",
    padding: theme.spacing(2),
    textDecoration: "none !important",
  },
  category: {
    backgroundColor: "#AB0825",
    color: "white",
    padding: "5px 10px",
    position: "absolute",
    top: 0,
    right: 0,
  },
  donate: {
    backgroundColor: Colors.appRed,
    color: "white",
    height: 42,
    border: "none",
    width: "140px",
    cursor: "pointer",
  },
  style: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      bottom: 0,
    },
  },
  readMore: {
    backgroundColor: "black",
    color: "white",
    height: 42,
    border: "none",
    width: "140px",
    marginLeft: "auto",
    float: "right",
    cursor: "pointer",
  },
  icon: {
      display:'flex',
      alignItems:'center', 
  },
  text: {
    color:'#848589'
  },
  text1: {
    color:'#38B9F0'
  },
  cardFooter: {
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
      padding:'1% 10%',
      [theme.breakpoints.down("xs")]: {
        alignItems:'flex-start',
        justifyContent:'space-evenly',
       flexDirection: "column",
       padding:0,
     },
  },
}));

const FeaturedEvent = (props) => {
    const [like, SetLike] = useState(false);
  const classes = useStyles(props);
  return (
    <div className={classes.container}>
      <Paper
        className={classes.root}
        elevation="4"
        // onClick={() => (window.location = `/`)}
      >
        <div className={clsx(classes.item, classes.root)}>
          <div
            style={{ backgroundImage: "url('/images/crowd.png')" }}
            className={clsx(classes.image)}
          ></div>
          <div className={classes.right}>
            <div className={classes.desc}>
              <span className={classes.category}>{props.category}</span>
              <h4 style={{ color: Colors.appRed }}>{props.host}</h4>
              <p style={{ fontWidth: "bold", fontSize: 30 }}>{props.title}</p>
              <p>
                Ticket fee: <Naira>{props.amount}</Naira>
              </p>
            </div>
            <div className={clsx(classes.style)}>
              <button className={classes.readMore}>Read more</button>
            </div>
          </div>
        </div>
        <div className={classes.cardFooter}>
            <div>
                <div className={classes.icon}>
                <ShareIcon />
                <div>
                    {!like && <FavoriteBorderIcon
                    onClick = {() => SetLike(!like)}
                    />}
                    {like && <FavoriteIcon 
                    onClick = {() => SetLike(!like)}
                    color='error'/>
                    }
                </div>
                </div>
                <Typography variant='body1'>
                Registered attendees: 50
                </Typography>
            </div>
            <div>
                <Typography variant='body1'>date and time</Typography>
                <Typography className={classes.text} variant='body1'>Thu, July 31, 2020</Typography>
                <Typography className={classes.text} variant='body1'>8:00AM-12:00PM</Typography>
                <Typography className={classes.text1} variant='body1'>Add to calendar</Typography>
            </div>
        </div>
      </Paper>
    </div>
  );
};

export default FeaturedEvent;
