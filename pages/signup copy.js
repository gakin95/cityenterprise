import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import {
  Grid,
  Typography,
  Container,
  FormControl,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  FormControlLabel,
  Button,
} from "@material-ui/core";
import ReCAPTCHA from "react-google-recaptcha";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import UserReg from "../components/dialogue/user";
import {
  Header,
  GuestRoute,
  MyTextField,
  MyCustomButton,
  MyDialog,
  TermsAndConditionButton,
  UploadFile,
} from "../common";
import {
  isValidEmail,
  isValidPassword,
  isValidFirstName,
  isValidLastName,
  isValidPhoneNumber,
} from "../src/helpers/validator";
import { recaptchaKey } from "../constants";
import { connect } from "react-redux";
import * as actions from "../src/store/actions";

const useStyles = makeStyles((theme) => ({
  user: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "35ch",
      [theme.breakpoints.down("xs")]: {
        width: "30ch",
      },
    },
  },
  title: {
    height: "150vh",
  },
  textField: {
    width: "70%",
  },
  error: {
    color: theme.palette.error.main,
    margin: "auto",
  },
  google: {
    width: "100%",
    backgroundColor: "#F0385E",
    "&:hover": {
      backgroundColor: "#961c36",
    },
  },
  facebook: {
    width: "100%",
    backgroundColor: "#37B9F0",
    "&:hover": {
      backgroundColor: "#0070f3",
    },
  },
  formControl: {
    width: "100%",
    height: 48,
  },
  rounded: {
    borderRadius: 10,
    borderColor: "#2B2B2B",
  },
  upload: {
    width: 360,
    height: 48,
  },
  uploadLabel: {
    width: 360,
    height: 48,
    borderRadius: 5,
    border: "1px solid #2B2B2B",
  },
}));

const Signup = (props) => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [verified, setVerified] = useState(false);
  const [openUserDialoge, setOpenUserDialog] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const [uploadDocument, setUploadDocument] = useState(null);
  const [proceed, setProcced] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryType, setCategoryType] = useState("Individual");
  const [error, setErrorMessage] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [positiveDialog, setPositiveDialog] = useState();
  const { onSignup, message, errorMsg, loading } = props;
  const [user, setUser] = useState({
    roleId: "111",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    document: "",
    image: "",
    name_of_institution: "",
    type_of_institution: "",
    rc_number: "",
    title: "Select Title",
    gender: "Select Gender",
    agreeToTandC: false,
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (message && message.status) {
      setDialogTitle(message.status);
      setDialogMessage(message.message);
      setPositiveDialog(true);
      setOpenDialog(true);
      setTimeout(() => {
        router.push("./mailverificationsent");
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
  }, [errorMsg, message]);
  const validatePageOne = ({ email, password, confirmPassword }) => {
    if (!isValidEmail(email)) {
      setErrorMessage("Invalid email");
      return;
    }
    if (!isValidPassword(password.trim()) || password.length < 4) {
      setErrorMessage("Invalid password");
      return;
    }
    if (
      !isValidPassword(confirmPassword.trim()) ||
      confirmPassword.length < 4
    ) {
      setErrorMessage("Invalid password");
      return;
    }
    if (password.trim() !== confirmPassword.trim()) {
      setErrorMessage("Password does not match");
      return;
    }
    if (!verified) {
      setDialogTitle("Hold on!");
      setDialogMessage("Please verify you are human");

      setPositiveDialog(false);

      setOpenDialog(true);
      return;
    }
    return true;
  };
  const validatePageTwo = () => {
    const {
      firstName,
      lastName,
      title,
      gender,
      phone,
      rc_number,
      name_of_institution,
      type_of_institution,
    } = user;
    if (!isValidFirstName(firstName.trim()) || firstName.length < 2) {
      setErrorMessage("Invalid first name");
      return;
    }
    if (!isValidLastName(lastName.trim()) || lastName.length < 2) {
      setErrorMessage("Invalid last name");
      return;
    }
    if (categoryType === "Individual" && title === "Select Title") {
      setErrorMessage("Select a valid title");
      return;
    }
    if (categoryType === "Individual" && gender === "Select Gender") {
      setErrorMessage("Select a valid gender");
      return;
    }
    if (!isValidPhoneNumber(phone.trim()) || phone.length < 8) {
      setErrorMessage("Invalid phone number");
      return;
    }
    if (categoryType === "Institution" && rc_number.length < 4) {
      setErrorMessage("Invalid Rc number");
      return;
    }
    if (categoryType === "Institution" && name_of_institution.length < 4) {
      setErrorMessage("Invalid Name of Institution");
      return;
    }
    if (categoryType === "Institution" && type_of_institution.length < 4) {
      setErrorMessage("Invalid Type of Institution ");
      return;
    }
    if (uploadImage === null) {
      setErrorMessage("You Must Upload an Image");
      return;
    }
    if (uploadDocument === null) {
      setErrorMessage("You Must Upload a Document");
      return;
    }
    return true;
  };
  const handleAddImageClick = (event) => {
    event.stopPropagation();
    let fileInput = event.target.getElementsByTagName("input")[0];
    fileInput.click();
  };
  const handlePageOne = () => {
    if (validatePageOne(user)) {
      setErrorMessage("");
      setProcced(true);
      setTimeout(() => {
        setProcced(false);
        setPage(2);
      }, 1000);
    }
  };
  const handleSelectedType = (name) => {
    setCategory(name);
    if (name === "Vendor") {
      setShowButton(true);
      setUser({ ...user, roleId: "121" });
    } else if (name === "Host") {
      setShowButton(true);
      setUser({ ...user, roleId: "131" });
    } else {
      setShowButton(false);
      setUser({ ...user, roleId: "111" });
      setOpenUserDialog(true);
    }
  };
  const onRecaptcha = (value) => {
    //verified = value;
    if (value) {
      setVerified(true);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePageTwo()) {
      setErrorMessage("");
      setProcced(loading);
      onSignup(user, uploadImage, uploadDocument);
    }
  };
  const classes = useStyles();
  const TypeSelection = (props) => {
    const useStyles = makeStyles((theme) => ({
      root: {
        display: "flex",
        flexDirection: "column",
        padding: "50px 20px 30px 20px",
        alignItems: "center",
        cursor: "pointer",
        boxShadow:
          props.type === category
            ? "0px 0px 20px rgba(252, 99, 107, 0.7)"
            : "none",
        backgroundColor:
          props.type === category ? "rgba(255,255,255,.7)" : "transparent",

        "&:hover": {
          boxShadow: "0px 0px 30px rgba(252, 99, 107, 0.7)",
          backgroundColor: "rgba(255,255,255,.7)",
        },
      },

      active: {
        boxShadow: "0px 0px 30px rgba(252, 99, 107, 0.7)",
      },
      small: {
        font: "normal normal normal 14px/20px Work Sans",
        textAlign: "center",
        width: "60%",
      },
      category: {
        color: theme.palette.primary.main,
      },
    }));

    const classes2 = useStyles();
    return (
      <div
        className={clsx(classes2.root)}
        onClick={() => {
          props.action(props.type);
        }}
      >
        <img src={props.image} alt="" style={{ height: "80px" }} />
        <p style={{ textAlign: "center" }}>{props.type}</p>
        <small className={classes2.small}>
          <span className={classes2.category}>As a {props.type},</span>{" "}
          {props.duty}
        </small>
      </div>
    );
  };
  return (
    <>
      <Header route="signup" />
      <UserReg
        title="Enter Details"
        openDialog={openUserDialoge}
        positiveDialog={true}
        onClose={() => setOpenUserDialog(false)}
      >
        <form className={classes.user} noValidate autoComplete="off">
          <div>
            <TextField
              id="user_first_name"
              label="First name"
              type="text"
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <TextField
              id="user_lastst_name"
              label="Last name"
              type="text"
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <TextField
              id="user_lastst_name"
              label="middle name"
              type="text"
              value={user.middleName}
              onChange={(e) => setUser({ ...user, middleName: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <TextField
              id="user_fisfrst_name"
              label="Phone"
              type="phone"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <MyCustomButton
              onClick={() => onSignup(user, uploadImage, uploadDocument)}
              onClose={() => setOpenUserDialog(false)}
              changeClass={true}
              progress={proceed}
            >
              Submit
            </MyCustomButton>
          </div>
        </form>
      </UserReg>
      <MyDialog
        title={dialogTitle}
        openDialog={openDialog}
        positiveDialog={positiveDialog}
        onClose={() => setOpenDialog(false)}
      >
        {dialogMessage}
      </MyDialog>
      {page === 1 && (
        <GuestRoute
          Class={classes.title}
          title="Sign up"
          greeting="Welcome Back"
          action="Sign up to continue"
        >
          <Grid container spacing={3}>
            <p className={classes.error}>{error}</p>
            <Grid item xs={12}>
              <MyTextField
                id="email"
                type="email"
                name="email"
                required="required"
                label="Email address"
                placeholder="Enter email address"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <MyTextField
                id="password"
                type="password"
                name="password"
                required="required"
                label="Password"
                placeholder="Enter your password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
                 
            </Grid>
            <Grid item xs={12}>
              <MyTextField
                id="RetypePassword"
                type="password"
                name="RetypePassword"
                required="required"
                label="Retype Password"
                placeholder="Retype Password"
                value={user.confirmPassword}
                onChange={(e) =>
                  setUser({ ...user, confirmPassword: e.target.value })
                }
              />
                 
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <ReCAPTCHA sitekey={recaptchaKey} onChange={onRecaptcha} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <MyCustomButton
                onClick={handlePageOne}
                changeClass={true}
                progress={proceed}
              >
                Sign Up
              </MyCustomButton>
            </Grid>
            <Grid item xs={12} className={classes.continue}>
              <Typography component="p">
                Continue with social accounts
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <MyCustomButton processing={false} className={classes.google}>
                Continue with google
              </MyCustomButton>
            </Grid>
            <Grid item xs={12} className={classes.socialItem}>
              <MyCustomButton progress={false} className={classes.facebook}>
                Continue with facebook
              </MyCustomButton>
            </Grid>
          </Grid>
        </GuestRoute>
      )}
      {page === 2 && (
        <Container style={{ marginTop: "100px" }}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              component="h4"
              className={classes.sectionHead}
            >
              Glad to have you here
            </Typography>
            <Typography
              variant="body1"
              component="p"
              className={classes.sectionSubhead}
              style={{ width: "300px" }}
            >
              Kindly select what category you are signing up for to finish your
              registration.
            </Typography>
          </Grid>
          <Grid container spacing={5} style={{ marginTop: "100px" }}>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              onClick={() => handleSelectedType("User")}
            >
              <TypeSelection
                image={"/images/user.svg"}
                type="User"
                duty="you can only book for an event or buy tickets"
                action={setCategory}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              onClick={() => handleSelectedType("Host")}
            >
              <TypeSelection
                image={"/images/host.svg"}
                type="Host"
                duty="you can create and manage events."
                action={setCategory}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              onClick={() => handleSelectedType("Vendor")}
            >
              <TypeSelection
                image={"/images/vendor.svg"}
                type="Vendor"
                duty="you can list and manage your product & services."
                action={setCategory}
              />
            </Grid>
          </Grid>
          {showButton && (
            <div>
              <Button
                onClick={() => setPage(1)}
                variant="contained"
                color="default"
                style={{
                  marginTop: "100px",
                  marginBottom: "100px",
                }}
              >
                Back
              </Button>
              <Button
                startIcon={
                  <img
                    src="/images/progress.gif"
                    alt=""
                    style={{
                      height: "30px",
                      display: proceed ? "inline-block" : "none",
                    }}
                  />
                }
                onClick={() => {
                  setProcced(true);
                  setTimeout(() => {
                    setProcced(false);
                    setPage(3);
                  }, 1000);
                }}
                variant="contained"
                color="primary"
                style={{
                  marginTop: "100px",
                  marginBottom: "100px",
                  marginLeft: "auto",
                  color: "white",
                  float: "right",
                }}
              >
                Continue
              </Button>
            </div>
          )}
        </Container>
      )}
      {page === 3 && (category === "Host" || category === "Vendor") && (
        <GuestRoute
          changeGridSize={true}
          title="Sign up"
          greeting="Glad you are here…"
          action="continue sign up registration"
        >
          <Grid container spacing={3}>
            <p className={classes.error}>{error}</p>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="selectRegType"
                  name="selectRegType"
                  value={categoryType}
                  onChange={(e) => setCategoryType(e.target.value)}
                >
                  <FormControlLabel
                    value="Individual"
                    control={<Radio color="primary" />}
                    label="Individual"
                  />
                  <FormControlLabel
                    value="Institution"
                    control={<Radio color="primary" />}
                    label="Institution"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            {categoryType === "Institution" && (
              <>
                <Grid item xs={12} md={6}>
                  <MyTextField
                    id="firstName"
                    type="text"
                    name="firstName"
                    required="required"
                    label="First Name"
                    placeholder="Enter First Name"
                    value={user.firstName}
                    onChange={(e) =>
                      setUser({ ...user, firstName: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MyTextField
                    id="lastName"
                    type="text"
                    name="lastName"
                    required="required"
                    label="Last Name"
                    placeholder="Enter your Last Name"
                    value={user.lastName}
                    onChange={(e) =>
                      setUser({ ...user, lastName: e.target.value })
                    }
                  />
                     
                </Grid>
                <Grid item xs={12} md={6}>
                  <MyTextField
                    id="name_of_institution"
                    type="text"
                    name="name_of_institution"
                    required="required"
                    label="Name of Institution"
                    placeholder="Enter Name of Bussiness"
                    value={user.name_of_institution}
                    onChange={(e) =>
                      setUser({ ...user, name_of_institution: e.target.value })
                    }
                  />{" "}
                    
                </Grid>
                <Grid item xs={12} md={6}>
                  <MyTextField
                    id="type_of_institution"
                    type="text"
                    name="type_of_institution"
                    required="required"
                    label="Type of Institution"
                    placeholder="Enter Type of Bussiness"
                    value={user.type_of_institution}
                    onChange={(e) =>
                      setUser({ ...user, type_of_institution: e.target.value })
                    }
                  />
                    
                </Grid>
                <Grid item xs={12} md={6}>
                  <MyTextField
                    id="institution_phone_no"
                    type="tel"
                    name="institution_phone_no"
                    required="required"
                    label="Phone number"
                    placeholder="Enter your phone number"
                    value={user.phone}
                    //onChange={handlePhoneChange}
                    onChange={(e) =>
                      setUser({ ...user, phone: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MyTextField
                    id="rc_no"
                    type="text"
                    name="rc_no"
                    required="required"
                    label="RC No."
                    placeholder="Enter RC No."
                    value={user.rc_number}
                    onChange={(e) =>
                      setUser({ ...user, rc_number: e.target.value })
                    }
                  />{" "}
                    
                </Grid>
                <Grid item xs={12}>
                  <MyCustomButton
                    onClick={handleSubmit}
                    changeClass={true}
                    progress={proceed}
                  >
                    Sign Up
                  </MyCustomButton>
                </Grid>
              </>
            )}
            {categoryType === "Individual" && (
              <>
                <Grid item xs={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <Select
                      labelId="title-type"
                      id="title"
                      value={user.title}
                      onChange={(e) =>
                        setUser({ ...user, title: e.target.value })
                      }
                      variant="outlined"
                      InputProps={{
                        classes: { notchedOutline: classes.rounded },
                      }}
                      fullWidth
                    >
                      <MenuItem value="Select Title">Select Title</MenuItem>
                      <MenuItem value="Mr.">Mr.</MenuItem>
                      <MenuItem value="Mrs.">Mrs.</MenuItem>
                      <MenuItem value="Miss">Miss</MenuItem>
                      <MenuItem value="Dr.">Dr.</MenuItem>
                      <MenuItem value="Prof.">Prof.</MenuItem>
                      <MenuItem value="Engr.">Engr.</MenuItem>
                      <MenuItem value="Pastor">Pastor</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MyTextField
                    id="firstName"
                    type="text"
                    name="firstName"
                    required="required"
                    label="First Name"
                    placeholder="Enter First Name"
                    value={user.firstName}
                    onChange={(e) =>
                      setUser({ ...user, firstName: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MyTextField
                    id="lastName"
                    type="text"
                    name="lastName"
                    required="required"
                    label="Last Name"
                    placeholder="Enter your Last Name"
                    value={user.lastName}
                    onChange={(e) =>
                      setUser({ ...user, lastName: e.target.value })
                    }
                  />
                     
                </Grid>
                <Grid item xs={12} md={6}>
                  <MyTextField
                    id="middleName"
                    type="text"
                    name="middleName"
                    required="required"
                    label="Middle Name"
                    placeholder="Enter your Middle Name"
                    value={user.middleName}
                    onChange={(e) =>
                      setUser({ ...user, middleName: e.target.value })
                    }
                  />
                     
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl
                    className={classes.formControl}
                    style={{ margin: "10px 0px" }}
                  >
                    <Select
                      labelId="gender-type"
                      id="gender"
                      variant="outlined"
                      value={user.gender}
                      onChange={(e) =>
                        setUser({ ...user, gender: e.target.value })
                      }
                      // margin="dense"
                      fullWidth
                    >
                      <MenuItem value="Select Gender">Select Gender</MenuItem>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MyTextField
                    id="phone"
                    type="phone"
                    name="phone"
                    required="required"
                    label="Phone no"
                    placeholder="Enter your phone number"
                    value={user.phone}
                    onChange={(e) =>
                      setUser({ ...user, phone: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MyTextField
                    id="type_of_institution"
                    type="text"
                    name="type_of_institution"
                    required="required"
                    label="Type of Institution"
                    placeholder="Enter Type of Bussiness"
                    value={user.type_of_institution}
                    onChange={(e) =>
                      setUser({ ...user, type_of_institution: e.target.value })
                    }
                  />
                    
                </Grid>
                <Grid item xs={12} md={6}>
                  <MyTextField
                    id="name_of_institution"
                    type="text"
                    name="name_of_institution"
                    required="required"
                    label="Name of Institution"
                    placeholder="Enter Name of Bussiness"
                    value={user.name_of_institution}
                    onChange={(e) =>
                      setUser({ ...user, name_of_institution: e.target.value })
                    }
                  />{" "}
                    
                </Grid>
                <Grid item xs={12} md={12}>
                  <MyTextField
                    id="rc_no"
                    type="text"
                    name="rc_no"
                    required="required"
                    label="RC No."
                    placeholder="Enter RC No."
                    value={user.rc_number}
                    onChange={(e) =>
                      setUser({ ...user, rc_number: e.target.value })
                    }
                  />{" "}
                    
                </Grid>
                <Grid item xs={12}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                  >
                    <Grid item xs={12} md={6}>
                      <UploadFile
                        image="/images/upload.png"
                        title="Upload document"
                        text="Max file size (5MB)"
                        doc={uploadDocument && uploadDocument.name}
                        filename="document"
                        accept="application/pdf"
                        onClick={handleAddImageClick}
                        backgroundImage={uploadDocument}
                        setImage={(file) => {
                          setUploadDocument(file);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <UploadFile
                        image="/images/upload.png"
                        title="Upload image or photo"
                        text="Max file size (5MB)"
                        accept="image/*"
                        filename="image"
                        onClick={handleAddImageClick}
                        backgroundImage={uploadImage}
                        setImage={(file) => {
                          setUploadImage(file);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid xs={12}>
                  <p>Read terms and condition</p>
                  <TermsAndConditionButton />
                </Grid>
                <Grid item xs={12}>
                  <MyCustomButton
                    onClick={handleSubmit}
                    changeClass={true}
                    progress={proceed}
                  >
                    Sign Up
                  </MyCustomButton>
                </Grid>
              </>
            )}
          </Grid>
        </GuestRoute>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    errorMsg: state.auth.error,
    message: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignup: (data, uploadImage, uploadDocument) =>
      dispatch(actions.authSignUp(data, uploadImage, uploadDocument)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
