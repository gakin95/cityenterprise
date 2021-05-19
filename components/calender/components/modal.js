import React from "react";
//import Button from './Button';
import Modal from "react-modal";
import { makeStyles } from "@material-ui/core/styles";
//import { css } from 'emotion';
import { MyCustomButton } from "../../../common";

const useStyles = makeStyles((theme) => ({
  containerStyles: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: 450,
    height: 375,
    margin: "0 auto",
    top: "50%",
    left: 0,
    right: 0,
    transform: "translateY(-50%)",
    position: "absolute",
    boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.3)",
    padding: 30,
    backgroundColor: "#FFF",
    "&:focus": {
      outline: "none",
    },
    [theme.breakpoints.down('xs')]:{
        width:300,
        height:300
    }
  },
}));

export default function CalendarModal({ children, isOpen, onRequestClose }) {
    const classes = useStyles();
  return (
    <Modal
      className={classes.containerStyles}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
    >
      <h2>Add to Calendar</h2>
      <div>{children}</div>
      <MyCustomButton changeClass={true} onClick={onRequestClose}>Cancel</MyCustomButton>
    </Modal>
  );
}
