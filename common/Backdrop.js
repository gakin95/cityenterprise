import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  nodata: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function BackDrop(props) {
  const classes = useStyles();
  return (
    <div>
      <Backdrop className={classes.backdrop} open={props.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export const Spinner = (props) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={props.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
  )
}

export default BackDrop;
