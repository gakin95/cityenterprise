import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import { useRouter } from 'next/router';
import { ButtonWithBackdrop, MyDialog, MyTextField } from "../../common";
import { resetPassword } from "../../src/services/user.service";
import {
  isValidPassword,
} from '../../src/helpers/validator'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    width: 559,
    height: 466,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
    padding: theme.spacing(1, 8),
    [theme.breakpoints.down('xs')]: {
      width:367
    }
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  error: {
    color:theme.palette.error.main
  },
}));

//#707070

const ResetPassword = () => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [openDialog, setOpenDialog] = useState();
  const [positiveDialog, setPositiveDialog] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const classes = useStyles();
  const router = useRouter();
  const token = router.query.token;
  const validatePassword = () => {
    if (!isValidPassword(password.trim()) || password.length<8) {
      setErrorMessage("Password is not valid. Must be at least 8 characters");
      return ;
    } else if (password.trim() !== confirmPassword.trim()) {
      setErrorMessage("Passwords don't match");
      return ;
    }
    return true;
  };
  const handleResetPassword = async () => {
   if (validatePassword()) {
    setErrorMessage('')
    setOpen(true);
    const result = await resetPassword(password, token);
    setTimeout(() => {
      setOpen(false);
      setOpenDialog(true);
      setDialogTitle(result.status)
      setDialogMessage(result.message);
      if (result.status === 'success') {
        router.push('/signin')
      }
    },1000);
   }
  };

  return (
    <div className={classes.root}>
      <MyDialog
        title={dialogTitle}
        openDialog={openDialog}
        positiveDialog={positiveDialog}
        onClose={() => setOpenDialog(false)}
      >
        {dialogMessage}
      </MyDialog>
      <div className={classes.reset}>
        <Paper className={classes.paper}>
          <div className={classes.flex}>
            <img src="/images/set2.jpeg" className={classes.image} />
            <Typography variant="body1">Reset Password</Typography>
            <div />
          </div>
          <MyTextField
            id="password"
            type="password"
            name="password"
            required="required"
            label="New Password"
            placeholder="Enter New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <MyTextField
            id="retypepassword"
            type="password"
            name="retypepassword"
            required="required"
            label="Retype New Password"
            placeholder="Retype New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errorMessage && <p className={classes.error}>{errorMessage}</p>}
          <ButtonWithBackdrop label="Confirm" click={handleResetPassword} open={open}/>
        </Paper>
      </div>
    </div>
  );
};

export default ResetPassword;
