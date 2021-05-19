import React, { useState } from "react";
import clsx from 'clsx';
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    width:360,
     height:48,
    color: "white",
    textTransform: 'none',
    '& hover':{
      backgroundColor:'red'
    }
  },
  buttonClass: {
    width: 178
  },
}));

const MyCustomButton = (props) => {
  const classes = useStyles();
  const changeClass = props.changeClass
  return (
    <Button
      variant="contained"
      disabled={props.disabled}
      color="primary"
      className={clsx(classes.root, changeClass === true && classes.buttonClass, props.className)}
      startIcon={
        <img
          src="/images/progress.gif"
          alt=""
          style={{
            height: "30px",
            display: props.progress ? "inline-block" : "none",
          }}
        />
      }
      onClick={props.onClick}
      margin={props.margin}
    >
      {props.children}
    </Button>
  );
};

export default MyCustomButton;
