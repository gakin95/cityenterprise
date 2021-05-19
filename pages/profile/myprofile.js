import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { connect } from "react-redux";
import Moment from 'react-moment';
import * as actions from "../../src/store/actions";
import {  ProfileContainer } from "../../common";

const useStyles = makeStyles((theme) => ({
  title: {
    font: "normal normal 600 16px/19px Work Sans",
    color: "#38B9F0",
    textTransform: "uppercase",
    [theme.breakpoints.down('xs')]:{
      width:'90%',
      margin:'0 auto'
    }
  },
  imgcover: {
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
  },
  profileimg: {
    width: 269,
    opacity: 1,
    borderRadius:19,
    height: 262,
    backgroundImage:"url('/images/crowd.png')",
    backgroundPosition:'center',
    backgroundRepeat:'no-repeat',
    backgroundSize:'cover',
    [theme.breakpoints.down('xs')]:{
      width:'100%'
    }
  },
  details: {
    border: "1px solid #707070",
    padding: 15,
    color: "#707070",
    borderRadius: "4px",
    [theme.breakpoints.down('xs')]:{
      width:'90%',
      margin:'0 auto'
    }
  },
  text: {
    font: "normal normal 600 16px/19px Work Sans",
    color: "#2B2B2B",
    [theme.breakpoints.down('xs')]:{
      width:'90%',
      margin:'0 auto'
    }
  },
}));

const Profile = (props) => {
  const matches = useMediaQuery('(max-width:600px)');
  const { currentUser } = props;
  const classes = useStyles();
  return (
    <ProfileContainer title='My Profile'>
      <Grid 
      container spacing={3} 
      className={classes.root}
      >
        <Grid item xs={12}>
          <p className={classes.title}>Personal Details</p>
        </Grid>
        <Grid container spacing={3}
        direction={matches?"column-reverse":"row"}
        >
        <Grid item xs={12} sm={9}>
          <Grid 
          container spacing={3}
          >
            <Grid item xs={12} sm={6}>
              <p className={classes.text}>First Name</p>
              <div className={classes.details}>{currentUser.firstName}</div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <p className={classes.text}>Middle Name</p>
          <div className={classes.details} >{currentUser.middleName} Middle Name</div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <p className={classes.text}>Last Name</p>
              <div className={classes.details}>{currentUser.lastName}</div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <p className={classes.text}>Gender</p>
              <div className={classes.details}>{currentUser.gender}</div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <p className={classes.text}>Designation</p>
              <div className={classes.details}>{currentUser.business_name}</div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <p className={classes.text}>Created Date</p>
              <div className={classes.details}><Moment>{currentUser.createdAt}</Moment></div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <p className={classes.text}>Last Modified</p>
              <div className={classes.details}>
              <Moment local>
                2020-10-03T12:59-0500
            </Moment>
              </div>
            </Grid>
            <Grid item xs={12}>
              <p className={classes.title}>CONTACT INFORMATION</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <p className={classes.text}>Email</p>
              <div className={classes.details}>{currentUser.email}</div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <p className={classes.text}>Phone Number</p>
              <div className={classes.details}>{currentUser.phone}</div>
            </Grid>
            <Grid item xs={12}>
              <p className={classes.title}>WEBSITE AND SOCIAL MEDIA LINKS</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <p className={classes.text}>Website</p>
              <div className={classes.details}>https://www.instiq.com/</div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <p className={classes.text}>Facebook</p>
              <div className={classes.details}>gakin95</div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <p className={classes.text}>LinkedIn</p>
              <div className={classes.details}>https://www.linkedin.com/linkedin.com/in/akingbulere-gbenga</div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <p className={classes.text}>Youtube</p>
              <div className={classes.details}>gakin95</div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <p className={classes.text}>Instagram</p>
              <div className={classes.details}>gakin95</div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <p className={classes.text}>Telegram</p>
              <div className={classes.details}>08168187018</div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3} className={classes.imgcover}>
          <div className={classes.profileimg}></div>
        </Grid>
        </Grid>
      </Grid>
    </ProfileContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    loading : state.auth.loading,
    error : state.auth.error ,
    currentUser : state.auth.userId?state.auth.userId:[]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
