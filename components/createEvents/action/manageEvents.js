import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Moment from "react-moment";

const useStyles = makeStyles({
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
    padding: "",
    width: "100%",
    backgroundColor: "#2B2B2B",
  },
  bg1: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    textAlign: "left",
    padding: 5,
    width: "100%",
    //height: 250,
    font: "normal normal 16px/19px Work Sans",
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
    //backgroundImage: (props) => `url(${props.image})`,
    backgroundSize: "cover",
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
  img: {
    width: "100%",
  },
  bgAmount: {
    backgroundColor: "#fff",
    padding: ".5rem 1rem",
    borderRadius: 5,
    marginBottom: 5,
  },
  date: {
    color: "#F06E38",
    font: "normal normal bold 16px/19px Work Sans",
  },
  avatarItem: {
    color: "#000",
    backgroundColor: "#fff",
    border: "1px solid white",
  },
  experience: {
    display: "flex",
    justifyContent: "space-between",
  },
  edit: {
    height: 30,
    color: "#F06E38",
    backgroundColor: "white",
    border: "none",
    cursor: "pointer",
  },
  level: {
    color: "#F06E38",
  },
  approval: {
    color: "#F06E38",
  },

  status: {
    display: "flex",
    justifyContent: "space-between",
  },
  delete: {
    width: 70,
    color: "#F06E38",
    border: "1px solid #F06E38",
    backgroundColor: "transparent",
    borderRadius: 5,
    cursor: "pointer",
  },
  review: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  action: {
    //width: 70,
    color: "#F06E38",
    border: "1px solid #F06E38",
    backgroundColor: "transparent",
    borderRadius: 5,
    cursor: "pointer",
  },
});

export default function ImgMediaCard(props) {
  const [like, SetLike] = useState(false);
  const classes = useStyles();

  return (
    <section className={classes.flex} onClick={props.click}>
      <div className={clsx(classes.bg)}>
        <div className={classes.flex2}>
          <img src={props.image} className={classes.img} />
        </div>
      </div>
      <Paper className={classes.bg1}>
        <p className={classes.date}>
          <Moment format="ddd, MMM Do, yy">{props.date}</Moment>
        </p>
        <p>
          <b>{props.title}</b>
        </p>
        <p>
          <b>{props.eventCategory}</b>
        </p>
        <p>{props.content}</p>
        <p>
          <b>{props.type_of_event}</b>
        </p>
        <div className={classes.review}>
          {props.delete && (
            <button className={classes.delete} onClick={props.onDelete}>
              {props.delete}
            </button>
          )}
          {props.edit && (
            <button className={classes.edit} onClick={props.onEdit}>
              {props.edit}
            </button>
          )}
        </div>
        <div className={classes.review}>
          {props.action && (
            <button className={classes.action} onClick={props.decision}>{props.action}</button>
          )}
          {props.view && (
            <p onClick={props.viewAttendees} className={classes.edit}>
              {props.view}
            </p>
          )}
        </div>
      </Paper>
    </section>
  );
}
