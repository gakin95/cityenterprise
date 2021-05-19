import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import { useRouter } from "next/router";
import ErrorIcon from "@material-ui/icons/Error";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Container, Button } from "@material-ui/core";
import {
  verifyUserEmail,
  regenerateEmailToken,
} from "../../src/services/user.service";
import { MyTextField, ButtonWithBackdrop, MyDialog } from "../../common";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  Paper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 140,
    height: 400,
  },

  Congrats: {
    marginTop: 50,
    marginBottom: 60,
  },
  error: {
    textAlign: "center",
    color: "red",
  },
  image: {
    width: 150,
    height: 150,
  },
  form: {
    width: 400,
    marginBottom: "20px",
    [theme.breakpoints.down("xs")]: {
      width: 300,
    },
  },
  button: {
    marginBottom: "20px",
    color: "white",
    backgroundColor: "blue",
    borderRadius: 5,
    width: 200,
    "&:hover": {
      backgroundColor: "#1414cb",
    },
  },
}));

function Mailverification() {
  const router = useRouter();
  const token = router.query.token;
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [positiveDialog, setPositiveDialog] = useState();
  useEffect(() => {
    if (token) {
      (async () => {
        const verify = await verifyUserEmail(token);
        console.log('testing..',verify)
        if (verify.message) {
          setLoading(false);
          setMessage(verify.message);
        }
        if (verify.status === 'success') {
            setTimeout(() => {
                router.push('/signin')
            }, 2000);
        }
      })();
    }
  }, [token]);
  const [loading, setLoading] = useState(true);
  const handleSubmit = async () => {
    setOpen(true);
    const result = await regenerateEmailToken(email);
    if (result && result.status) {
      setOpen(false);
      setDialogTitle(result.status);
      setDialogMessage(result.message);
      setPositiveDialog(result.status !== "Bad request" ? true : false);
      setOpenDialog(true);
    }
  };
  const classes = useStyles();
  let displayMessage = <CircularProgress disableShrink />;
  if (message && message === "Invalid or expired token") {
    displayMessage = (
      <div>
        {page === 1 && (
          <div className={classes.error}>
            <div>
              <ErrorIcon color="error" />
            </div>
            <div>
              <Typography variant="h6">Bad request</Typography>
            </div>
            <div>
              <Typography variant="h6">{message}</Typography>
            </div>
            <div>
              <Button
                onClick={() => setPage(2)}
                color="primary"
                className={classes.button}
              >
                Resend Link
              </Button>
            </div>
          </div>
        )}
        {page === 2 && (
          <div>
            <MyTextField
              className={classes.form}
              id="email"
              name="email"
              type="email"
              label="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className={classes.submit}>
              <ButtonWithBackdrop
                label="submit"
                click={handleSubmit}
                open={open}
              />
            </div>
          </div>
        )}
      </div>
    );
  } else {
    displayMessage = (
      <div>
        {message && <div>
          <img src="/images/emailVerify.jpg" className={classes.image} />
        </div>}
        <div>
          {message && <Typography variant="h4">Email Verified</Typography>}
        </div>
        <div>
          <Typography variant="h6" className={classes.Congrats}>
            {message}
          </Typography>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className={classes.root}>
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
              {displayMessage}
            </Paper>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Mailverification;
