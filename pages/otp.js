import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import * as actions from "../src/store/actions";
import { isValidEmail, isValidPassword } from "../src/helpers/validator";
import {
  Header,
  GuestRoute,
  MyTextField,
  MyCustomButton,
  MyDialog,
} from "../common";


const useStyles = makeStyles((theme) => ({
  title: {
    height: "120vh",
  },
  textField: {
    width: "70%",
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "70%",
    "& a": {
      color: "#F06E38",
    },
  },
  google: {
    backgroundColor: "#F0385E",
    width: "100%",
    "&:hover": {
      backgroundColor: "#961c36",
    },
  },
  facebook: {
    backgroundColor: "#37B9F0",
    width: "100%",
    "&:hover": {
      backgroundColor: "#0070f3",
    },
  },
}));

const Signin = (props) => {
  const [otp, setOtp] = useState('');
  const [error, setErrorMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [positiveDialog, setPositiveDialog] = useState();
  const isAthenticated = props.isAuth;
  const message = props.message;
  const errorMsg = props.error;
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("ygdgdgdgy", token);
    if (isAthenticated && message.status) {
      setDialogTitle(message.status);
      setDialogMessage(message.message);
      setPositiveDialog(true);
      setOpenDialog(true);
      setTimeout(() => {
        router.push("./");
      }, 2000);
    } else if (errorMsg && errorMsg.status) {
      setDialogTitle(errorMsg.status);
      setDialogMessage(errorMsg.message);
      setPositiveDialog(false);
      setOpenDialog(true);
    } else if (token) {
      router.push("./");
    } else {
      setDialogTitle("");
      setDialogMessage("");

      setPositiveDialog(false);

      setOpenDialog(false);
    }
  }, [isAthenticated, message, errorMsg]);
  const proceed = props.loading;
  const router = useRouter();
  const validateLogin = ({ email, password }) => {
    if (!isValidEmail(email)) {
      setErrorMessage("Invalid email");
      return;
    }
    if (!isValidPassword(password.trim()) || password.length < 4) {
      setErrorMessage("Invalid password");
      return;
    }
    return true;
  };

  const handleSubmit = () => {
    
  };
  const classes = useStyles();
  return (
    <>
      <Header route="otp" />
      <GuestRoute
        Class={classes.title}
        title="Sign in"
        greeting="Enter Otp"
      >
        <Grid container spacing={3}>
          <MyDialog
            title={dialogTitle}
            openDialog={openDialog}
            positiveDialog={positiveDialog}
            onClose={() => setOpenDialog(false)}
          >
            {dialogMessage}
          </MyDialog>
          <Grid item xs={12}>
            <MyTextField
              id="otp"
              type="otp"
              name="otp"
              required="required"
              label="Otp"
              placeholder="Enter Otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <MyCustomButton
              onClick={handleSubmit}
              changeClass={true}
              progress={proceed}
            >
              Login
            </MyCustomButton>
          </Grid>
        </Grid>
      </GuestRoute>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    message: state.auth.message,
    isAuth: state.auth.idToken != null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
