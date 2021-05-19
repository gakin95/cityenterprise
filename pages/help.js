import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Slide } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useRouter } from 'next/router';

import { Container } from "../components/section";
import { MyTextField, ButtonWithBackdrop, MyDialog,Contact } from "../common";
import {
  isValidEmail,
  isValidPassword,
  isValidFirstName,
  isValidLastName,
  isValidPhoneNumber,
} from "../src/helpers/validator";
import { createMessage } from "../src/services/contact";



const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    marginTop: "3.6rem",
    overflow: "hidden",
    [theme.breakpoints.down("xs")]: {
      margin: 0,
    },
  },
  container: {
    margin: "5% 0",
    marginTop: "6.9rem",

    [theme.breakpoints.down("xs")]: {
      margin: "5%",
      marginTop: "8rem",
    },
  },
  header: {
    width: "100%",
    height: "50vh",
    backgroundImage: "url('/images/support.jpg')",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    color: "#000000",
    marginBottom: 20,
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      backgroundPosition: "center",
      //backgroundImage: "url('/images/mobilenews.jpg')",
      backgroundSize: "cover",
      height:'55vh'
    },
  },
  know:{
    marginLeft:'3rem'
  },
  headerText: {
    width: "50%",
    paddingLeft: 20,
    [theme.breakpoints.down("xs")]: {
      //color:'#fff',
      width: "100%",
      paddingBottom: "8%",
      fontSize: 14,
    },
  },
  fill:{
    [theme.breakpoints.down('xs')]:{
      fontSize:14
    }
  },
  formContainter: {
    width: "80%",
    margin: "5% auto",
    marginBottom:0,
  },
  inputContainer: {
    backgroundColor: "#F1F1F1",
    border: "1px solid black",
    padding: "6%",
  },
}));

export default function Help() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState('');
  const [msg, setMsg] = useState('');
  let [dialogTitle, setDialogTitle] = useState("");
  let [dialogMessage, setDialogMessage] = useState("");
  let [openDialog, setOpenDialog] = useState(false);
  let [positiveDialog, setPositiveDialog] = useState(true);
  const [help, setHelp] = useState({
    email:'',
    firstName:'',
    lastName:'',
    company:'',
    country:'',
    phone:'',
    message:''
  });
  const handleChange = name => e => {
    setHelp({...help, [name]:e.target.value})
  };
  const validateForm = () => {
    const {
      email,
      firstName,
      lastName,
      country,
      phone,
      message
    } = help;
    if (!isValidFirstName(firstName.trim()) || firstName.length < 2) {
      setErr('firstName');
      setMsg("Invalid first name");
      return;
    }
    if (!isValidLastName(lastName.trim()) || lastName.length < 2) {
      setErr('lastName');
      setMsg("Invalid last name");
      return;
    }
    if (!isValidEmail(email)) {
      setErr('email');
      setMsg("Invalid email");
      return;
    }
    if (!isValidPhoneNumber(phone.trim()) || phone.length < 8) {
      setErr('phone');
      setMsg("Invalid phone number");
      return;
    }
    if (country === '') {
      setErr('country');
      setMsg("Invalid country");
      return;
    }
    if (message === '') {
      setErr('message');
      setMsg("Invalid message");
      return;
    }
    return true
  };
  const handleSubmit = async () => {
    if (validateForm()){
      setErr('');
      setMsg("");
      setOpen(true);
      const response = await createMessage(help);
      if (response && response.status) {
        setOpen(false);
        setOpenDialog(true);
        setDialogTitle(response.status === 'success'?"Thanks for sending us a feedback!":"error");
        setDialogMessage(response.message)
      }
      if (response.status === 'success'){
        setTimeout(() => {
          router.push('/')
        },2000)
      }
    }
  };
  const classes = useStyles();
  return (
    <Container title="Help" className={classes.root}>
      <MyDialog
        title={dialogTitle}
        openDialog={openDialog}
        positiveDialog={positiveDialog}
        onClose={() => setOpenDialog(false)}
      >
        {dialogMessage}
      </MyDialog>
      <div className={classes.header}>
        <div className={classes.headerText}>
          <Slide direction="down" in={true} mountOnEnter unmountOnExit>
            <h1 className={classes.know}> How  can we support you?</h1>
          </Slide>
        </div>
      </div>
      <div className={classes.formContainter}>
        <h3 className={classes.fill}>
          Please fill out the form below for us to be able to help you better
        </h3>
        <Grid container spacing={3} className={classes.inputContainer}>
          <Grid item xs={12} sm={6}>
            <MyTextField
              id="firstName"
              type="text"
              name="firstName"
              required="required"
              label="First Name"
              placeholder="Enter first name"
              value={help.firstName}
              onChange = {handleChange('firstName')}
              error={err === "firstName"}
              helperText={err === "firstName" && msg}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyTextField
              id="lastName"
              type="email"
              name="lastName"
              required="required"
              label="Last Name"
              placeholder="Enter last name"
              value={help.lastName}
              onChange = {handleChange('lastName')}
              error={err === "lastName"}
              helperText={err === "lastName" && msg}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyTextField
              id="email"
              type="email"
              name="email"
              className="email"
              required="required"
              label="Email:"
              placeholder="Enter email address"
              value={help.email}
              onChange = {handleChange('email')}
              error={err === "email"}
              helperText={err === "email" && msg}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyTextField
              id="phone"
              type="phone"
              name="phone"
              required="required"
              label="Phone No"
              placeholder="Enter phone number"
              value={help.phone}
              onChange = {handleChange('phone')}
              error={err === "phone"}
              helperText={err === "phone" && msg}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyTextField
              id="country"
              type="text"
              name="country"
              required="required"
              label="Country"
              placeholder="Enter your country"
              value={help.country}
              onChange = {handleChange('country')}
              error={err === "country"}
              helperText={err === "country" && msg}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyTextField
              id="company"
              type="text"
              name="company"
              label="Company"
              placeholder="Enter comapany name"
              value={help.company}
              onChange = {handleChange('company')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              label="How can we help you"
              multiline
              fullWidth
              rows={4}
              value={help.message}
              onChange = {handleChange('message')}
              variant="outlined"
              error={err === "message"}
              helperText={err === "message" && msg}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <ButtonWithBackdrop
              label="Contact Us"
              click={handleSubmit}
              open={open}
            />
          </Grid>
          
        </Grid>
      <Grid container spacing={3} style={{marginTop:20}}>
      <Grid item xs={12}>
          <Contact  />
            </Grid>
      </Grid>
      </div>
    </Container>
  );
}
