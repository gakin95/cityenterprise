import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Moment from "react-moment";

import { MyCustomButton } from "../../../common";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
    height:350,
    position: "relative",
    "&:hover": {
      boxShadow: "0 16px 64px -16px rgba(46,55,77,.1)",
     // backgroundColor: "rgba(255,255,255,.7)",
      transform: "scale(1.0)",
    },
    [theme.breakpoints.down('md')]:{
      width:'100%',
      //height:'auto'
    },
    [theme.breakpoints.down('sm')]:{
      width:'100%',
      //height:'auto'
    },
    [theme.breakpoints.down('xs')]:{
      width:'100%',
      height:'auto'
    }
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    cursor:'pointer'
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  showbtn: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    border: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      color: "white",
    },
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
  avatarItem: {
    color: "#000",
    backgroundColor: "#fff",
    boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  },
  title:{
    cursor:'pointer',
    marginTop:-13
  },
  bgAmount: {
    width: 87,
    height: 36,
    borderRadius: 4,
    backgroundColor: "#fff",
    //color:'#fff',
    boxShadow:
      "0 4px 15px 0 rgba(40,44,53,.06), 0 2px 2px 0 rgba(40,44,53,.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 3,
  },
  action:{
    position: "absolute",
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    width:84,
    top: -53,
    right: 0,
    zIndex: 3,
  },
  content:{
    position:'relative'
  },
  btnSpace: {
    marginLeft:"auto"
  },
  btn: {
    width: 140,
    height: "1rem",
  },
  date: {
        color:'#F06E38'
      },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [like, SetLike] = useState(false);
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={props.image}
        title={props.title}
        onClick = {props.click}
      />
      <CardContent >
        <div className={classes.bgAmount}>
          <span>{props.type_of_event}</span>
        </div>
        <div className={classes.content}>
        <p className={classes.date}><Moment format="ddd, MMM Do, yy">{props.date}</Moment></p>
        <h3 className={classes.title} onClick = {props.click}>{props.title}</h3>
        <div className={classes.action}>
        {/* <IconButton aria-label="add to favorites"> */}
          {!like && (
            <Avatar className={classes.avatarItem}>
              <FavoriteBorderIcon onClick={() => SetLike(!like)} />
            </Avatar>
          )}
          {like && (
            <Avatar className={classes.avatarItem}>
              <FavoriteIcon onClick={() => SetLike(!like)} color="error" />
            </Avatar>
          )}
        {/* </IconButton> */}
        {/* <IconButton aria-label="share"> */}
          <Avatar className={classes.avatarItem}>
          <ShareIcon onClick={props.share}/>
          </Avatar>
        {/* </IconButton> */}
        </div>
        </div>
      </CardContent>
      <CardActions disableSpacing>
      </CardActions>
    </Card>
  );
}
