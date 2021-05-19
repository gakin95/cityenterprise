import React, { useState } from "react";
import clsx from "clsx";
import Moment from 'react-moment';
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EditIcon from "@material-ui/icons/Edit";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme)=>({
  root: {
    maxWidth: 345,
  },
  amount: {
    backgroundColor: "#fff",
    color: "#000000",
    borderRadius: 5,
    padding: 5,
    position: "relative",
    top: -50,
    left: 183,
  },
  red: {
    color: "red",
  },
  bg: {
   backgroundColor: 'teal',
    padding: "",
    width: "100%",
  },
  bg1: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    textAlign: "left",
    padding: 5,
    width: "100%",
  },
  learn: {
    float: "right",
    height: 30,
    backgroundColor: "orangeRed",
    border: "none",
    color: "white",
  },
  flex: {
    maxWidth: 345,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  flex2: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    height: 200,
    // backgroundImage: (props) => `url(${props.image})`,
    backgroundSize: "cover",
    backgroundColor:'teal',
  },
  padding: {
    paddingLeft: "1rem",
  },
  flex3: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  flex4: {
    display: "flex",
    justifyContent: "space-about",
    paddingTop: "1rem",
  },
  bgAmount: {
    backgroundColor: "#fff",
    padding: ".5rem 1rem",
    borderRadius: 5,
    marginBottom: 5,
  },
  date: {
    color: "#F06E38",
  },
  avatarItem: {
    color: "#000",
    backgroundColor: "#fff",
    border: "1px solid white",
    boxShadow:'0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  },
  experience: {
    display: "flex",
    justifyContent: "space-between",
  },
  view: {
    height: 30,
    color: "#F06E38",
    backgroundColor: "white",
    border: "none",
    cursor: "pointer",
    '&:hover':{
      backgroundColor:theme.palette.primary.main,
      color:'white',
      border:'1ps solid white',
      borderRadius:5,
    }
  },
  level: {
    color: "#F06E38",
  },
}));

export default function ImgMediaCard(props) {
  const [like, SetLike] = useState(false);
  const classes = useStyles();

  return (
    <section className={classes.flex} >
      <div className={clsx(classes.bg)}>
        <div className={classes.flex2}>
        <img src={props.image} />
          {/* <div className={classes.flex3}>
            <div className={classes.flex4}>
              <Avatar className={classes.avatarItem} onClick={props.gotoEdit}>
                <EditIcon />
              </Avatar>
              <div>
                {!like && (
                  <Avatar className={classes.avatarItem}>
                    <FavoriteBorderIcon onClick={() => SetLike(!like)} />
                  </Avatar>
                )}
                {like && (
                  <Avatar className={classes.avatarItem}>
                    <FavoriteIcon
                      onClick={() => SetLike(!like)}
                      color="error"
                    />
                  </Avatar>
                )}
              </div>
            </div>
            <span className={classes.bgAmount}>{props.amount}</span> 
          </div> */}
        </div>
        <Paper className={classes.bg1}>
          <p className={classes.date}>
            <b><Moment>{props.date}</Moment></b>
          </p>
          <p>
            <b>{props.title}</b>
          </p>
          <p>{props.content.substring(0, 35)} ...</p>
          <div className={classes.experience}>
            <Typography variant="body2" className={classes.level}>
              Experience Level
            </Typography>
            <button className={classes.view} onClick={props.click}>VIEW</button>
          </div>
          <Typography variant="body2">{props.experience}</Typography>
        </Paper>
      </div>
    </section>
  );
}
