import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import Moment from "react-moment";
import * as actions from "../../src/store/actions";
import { ProfileContainer, MyTextField } from "../../common";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  form: {
    width: "70%",
    margin: "auto",
    marginBottom: 40,
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  optional:{
    fontSize:'2em'
  }
}));

const PersonalDetails = (props) => {
  const classes = useStyles();
  const { value, handleChange } = props;
  return (
    <div className={classes.form}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <MyTextField
            id="firstName"
            type="text"
            name="firstName"
            required="required"
            label="First Name"
            placeholder="Enter First Name"
            value={value.firstName}
            onChange={handleChange("firstName")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MyTextField
            id="middleName"
            type="text"
            name="middleName"
            required="required"
            label="middle Name"
            placeholder="Enter your middle Name"
            value={value.middleName}
            onChange={handleChange("middleName")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MyTextField
            id="lastName"
            type="text"
            name="lastName"
            required="required"
            label="Last Name"
            placeholder="Enter your Last Name"
            value={value.lastName}
            onChange={handleChange("lastName")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MyTextField
            id="gender"
            type="text"
            name="gender"
            required="required"
            label="gender"
            disabled={true}
            placeholder="Enter gender"
            value={value.gender}
          />
        </Grid>
        <Grid item xs={12}>
          <MyTextField
            id="roleww"
            type="text"
            name="roleeee"
            required="required"
            label="pics"
            disabled={true}
            placeholder="Enter pic"
            value={value.picture}
          />
        </Grid>
        <Grid item xs={12}>
          <MyTextField
            id="gender"
            type="text"
            name="gender"
            required="required"
            label="Designation"
            disabled={true}
            placeholder="Enter gender"
            value={value.roleId}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MyTextField
            id="CreatedDate"
            type="text"
            required="required"
            name="CreatedDate"
            disabled={true}
            label="Created Date"
            value={value.createdAt}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MyTextField
            id="LastModified"
            type="text"
            name="LastModified"
            required="required"
            disabled={true}
            label="Last Modified"
            value={value.lastModified}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const ContactDetails = (props) => {
  const classes = useStyles();
  const { value, handleChange } = props;
  return (
    <div className={classes.form}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <MyTextField
            id="email"
            type="email"
            name="email"
            required="required"
            label="Email"
            placeholder="Enter email"
            value={value.email}
            onChange={handleChange("email")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MyTextField
            id="phone"
            type="text"
            name="phone"
            required="required"
            label="Phone no"
            placeholder="Enter phone no"
            value={value.phone}
            onChange={handleChange("phone")}
          />
        </Grid>
      </Grid>
    </div>
  );
};

function getSteps() {
  return [
    "Personal Details",
    "CONTACT INFORMATION",
    "WEBSITE AND SOCIAL MEDIA LINKS",
  ];
}

const EditProfile = (props) => {
  const classes = useStyles();
  const { currentUser } = props;
  const [user, setUser] = useState({
    roleId: currentUser.roleId,
    email: currentUser.email,
    firstName: currentUser.firstName,
    middleName: currentUser.middleName,
    lastName: currentUser.lastName,
    phone: currentUser.phone,
    document: currentUser.document,
    image: currentUser.profile_picture,
    name_of_institution: currentUser.business_name,
    type_of_institution: "",
    rc_number: currentUser.rc_number,
    title: currentUser.title,
    gender: currentUser.gender,
    createdAt: currentUser.createdAt,
    lastModified: "",
    agreeToTandC: false,
  });

  useEffect(() => {
    if (currentUser) {
      setUser({
        roleId: currentUser.roleId,
        email: currentUser.email,
        firstName: currentUser.firstName,
        middleName: currentUser.middleName,
        lastName: currentUser.lastName,
        phone: currentUser.phone,
        document: currentUser.document,
        image: currentUser.profile_picture,
        name_of_institution: currentUser.business_name,
        type_of_institution: "",
        rc_number: currentUser.rc_number,
        title: currentUser.title,
        gender: currentUser.gender,
        createdAt: currentUser.createdAt,
        lastModified: "",
        agreeToTandC: false,
      });
    }
  }, [currentUser]);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  const {
    firstName,
    middleName,
    lastName,
    gender,
    phone,
    email,
    createdAt,
    lastModified,
    roleId,
  } = user;
  const value = {
    firstName,
    middleName,
    lastName,
    gender,
    phone,
    email,
    createdAt,
    lastModified,
    roleId,
  };

  const handleChange = (input) => (e) => {
    setUser({ ...user, [input]: e.target.value });
    console.log(user);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PersonalDetails handleChange={handleChange} value={value} />;
      case 1:
        return <ContactDetails handleChange={handleChange} value={value} />;
      case 2:
        return (
          <div>
            <Typography variant="caption" className={classes.optional}>Optional</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <MyTextField
                  id="webite"
                  type="text"
                  name="website"
                  required="required"
                  label="Website"
                  placeholder="aa@upheart.com"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MyTextField
                  id="account"
                  type="text"
                  name="facebook"
                  required="required"
                  label="Facebook"
                  placeholder="Enter your facebook account name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MyTextField
                  id="account"
                  type="text"
                  name="linkedin"
                  required="required"
                  label="Linkedin"
                  placeholder="Enter your linkedin account name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MyTextField
                  id="account"
                  type="text"
                  name="instagram"
                  required="required"
                  label="Instagram"
                  placeholder="Enter your instagram account name"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MyTextField
                  id="account"
                  type="text"
                  name="youtube"
                  required="required"
                  label="Youtube"
                  placeholder="Enter your youtube account name"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MyTextField
                  id="account"
                  type="text"
                  name="telegram"
                  required="required"
                  label="Telegram"
                  placeholder="Enter your telegram account name"
                />
              </Grid>
            </Grid>
          </div>
        );
      default:
        return "Unknown step";
    }
  }

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <ProfileContainer title="Edit My Profile">
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption"></Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                {isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSkip}
                    className={classes.button}
                  >
                    Skip
                  </Button>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProfileContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    currentUser: state.auth.userId ? state.auth.userId : [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
