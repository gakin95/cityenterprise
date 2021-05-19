import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Moment from 'react-moment'

const useStyles = makeStyles((theme) => ({
  
  bg1: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    textAlign: "left",
    padding: 5,
    width: "100%",
    height: 170,
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: theme.palette.primary.main,
    backgroundImage: (props) => `url(${props.image})`,
    backgroundSize: "cover",
  },
  text:{
   width:'100%',
   paddingRight:'20px',
   //fontSize:12
   overflowX:'hidden'
  },
  date: {
    color: "#F06E38",
  },
}));

export default function ImgMediaCard(props) {
  const [like, SetLike] = useState(false);
  const classes = useStyles(props);

  return (
    <a href={props.click} target="_blank">
    <div class="flip-box" >
      <div class="flip-box-inner">
        <div class="flip-box-front">
          <div className={classes.image}></div>
          <div className={classes.bg1}>
            <p >
              <b>{props.title}</b>
            </p>
            <p className={classes.date}>
            <Moment format="ddd, MMM Do, yy">
            {props.date}
            </Moment>
            </p>
          </div>
        </div>
        <div class="flip-box-back">
          <p className={classes.text}>{props.content}</p>
        </div>
      </div>
    </div>
    </a>
  );
}
