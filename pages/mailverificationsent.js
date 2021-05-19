import React, { useState } from "react";
import { withRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Container, Button } from "@material-ui/core";
import { Header, ButtonWithBackdrop, MyDialog } from "../common";
import { regenerateEmailToken } from "../src/services/user.service";

const useStyles = makeStyles((theme) => ({
  Paper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 140,
    height: 400,
  },

  Congrats: {
    // marginTop: 50,
    // marginBottom: 60
  },
  image: {
    width: 150,
    height: 150,
  },
  button: {
    marginBottom: "20",
    color: "white",
    borderRadius: 5,
  },
}));

function Mailverificationsent(props) {
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [positiveDialog, setPositiveDialog] = useState();
  const handleResend = async () => {
    const email = localStorage.getItem("email");
    const result = await regenerateEmailToken(email);
    console.log(result);
    if (result && result.status) {
        setOpen(false);
        setDialogTitle(result.status);
        setDialogMessage(result.message);
        setPositiveDialog(result.status !== "Bad request" ? true : false);
        setOpenDialog(true);
      };
  };
  const classes = useStyles();
  return (
    <div>
      <Header />
      <Container maxWidth="md">
        <MyDialog
          title={dialogTitle}
          openDialog={openDialog}
          positiveDialog={positiveDialog}
          onClose={() => setOpenDialog(false)}
        >
          {dialogMessage}
        </MyDialog>
        <div>
          <Paper elevation="3" className={classes.Paper}>
            <div>
              <img
                src="https://e7.pngegg.com/pngimages/465/245/png-clipart-gray-and-orange-email-envelope-illustration-email-icon-email-miscellaneous-orange.png"
                className={classes.image}
              />
            </div>
            <div>
              <Typography variant="h6">Please verify your email to proceed</Typography>
            </div>
            <div>
              <p className={classes.Congrats}>
                Or click the button below to regenerate an email verification link if you didn't get our previous email.
              </p>
            </div>
            <div className={classes.submit}>
              <ButtonWithBackdrop
                label="continue"
                click={handleResend}
                open={open}
              />
            </div>
          </Paper>
        </div>
      </Container>
    </div>
  );
}

export default Mailverificationsent;
