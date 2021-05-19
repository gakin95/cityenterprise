import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import {
  Header,
  GuestRoute,
  MyTextField,
  MyCustomButton,
  ButtonWithBackdrop,
  MyDialog,
} from "../common";
import { forgotPassword } from "../src/services/user.service";

const useStyles = makeStyles((theme) => ({
  container: {
    //marginTop:20
  },
  title: {
    height:'100vh',
    color:'red'
  },
  textField: {
    width: "70%",
  },
  buttonContainer: {
    marginTop: 20,
  },
  link: {
    marginTop: 20,
    "& a": {
      color: "#000000",
    },
  },
  linkSpan: {
    color: theme.palette.primary.main,
  },
}));

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [openDialog, setOpenDialog] = useState();
  const [positiveDialog, setPositiveDialog] = useState(true);
  const [email, setEmail] = useState('')

  const handleSubmit = async () => {
    setOpen(true);
    const reset = await forgotPassword(email);
    setTimeout(() => {
      setOpen(false);
      setOpenDialog(true);
      setDialogTitle(reset.status);
      setDialogMessage(reset.message);
    }, 1000);
  };
  const classes = useStyles();
  return (
    <>
      <MyDialog
        title={dialogTitle}
        openDialog={openDialog}
        positiveDialog={positiveDialog}
        onClose={() => setOpenDialog(false)}
      >
        {dialogMessage}
      </MyDialog>
      <Header />
      <GuestRoute
      Class={classes.title}
        title="Forget password"
        greeting="Forgot Password?"
        action='Let’s help you recover your password'
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MyTextField
              id="email"
              type="email"
              name="email"
              required="required"
              label="Email address"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} className={classes.buttonContainer}>
            <ButtonWithBackdrop
              label="Send Link"
              click={handleSubmit}
              open={open}
            />
          </Grid>
          <Grid item xs={12} className={classes.link}>
            <Link href="/signin">
              <a>
                Remembered password?{" "}
                <span className={classes.linkSpan}>Sign In</span>
              </a>
            </Link>
          </Grid>
        </Grid>
      </GuestRoute>
    </>
  );
}
