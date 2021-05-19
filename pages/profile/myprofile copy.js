import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import EditIcon from "@material-ui/icons/Edit";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LockIcon from "@material-ui/icons/Lock";
import SettingsIcon from "@material-ui/icons/Settings";
import Popover from "@material-ui/core/Popover";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Moment from 'react-moment';
import * as actions from "../../src/store/actions";
import { Header } from "../../common";

const useStyles = makeStyles((theme) => ({
  root: {
    //margin: "5% 0",
    marginTop: "5rem",
    marginBottom: "5rem",
    paddingRight: "5%",
    paddingLeft: "5%",
  },
  profile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  myprofile: {
    font: "normal normal 600 20px/24px Work Sans",
    color: "#F06F38",
    letterSpacing: 0,
  },
  shown: {
    //backgroundColor:'#000',
    //color:'#fff',
    width: 250,
    padding: 20,
    //height:200
  },
  freestyle: {
    "& a": {
      display: "block",
      textDecoration: "none",
      color: "#2B2B2B",
      margin: "1rem",
      font: "normal normal normal 16px/19px Work Sans",
    },
  },
  action: {
    display: "flex",
    alignItems: "center",
    //justifyContent:'space-between',
    "& :hover": {
      color: theme.palette.primary.main,
    },
  },
  title: {
    font: "normal normal 600 16px/19px Work Sans",
    color: "#38B9F0",
    textTransform: "uppercase",
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
    //width: "50%",
    borderRadius: "4px",
    //marginLeft: 20,
  },
  text: {
    font: "normal normal 600 16px/19px Work Sans",
    color: "#2B2B2B",
  },
}));

const Profile = (props) => {
  const [isShown, setIsShown] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const matches = useMediaQuery('(max-width:600px)');
  const { currentUser } = props;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const router = useRouter();
  const classes = useStyles();
  return (
    <>
      <Header route="profile" />
      <Grid 
      container spacing={3} 
      className={classes.root}
      >
        <Grid item xs={12} className={classes.profile}>
          <p className={classes.myprofile}>My Profile</p>
          <SettingsIcon onMouseEnter={handleClick} color="primary" />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Paper className={classes.shown}>
              <div className={classes.freestyle}>
                <Link href="/profile/editprofile">
                  <div className={classes.action}>
                    <EditIcon color="primary" />
                    <a>Edit profile</a>
                  </div>
                </Link>
              </div>
              <div className={classes.freestyle}>
                <Link href="/">
                  <div className={classes.action}>
                    <LockIcon color="primary" />
                    <a>Change password</a>
                  </div>
                </Link>
              </div>
              <div className={classes.freestyle}>
                <Link href="/">
                  <div className={classes.action}>
                    <MailOutlineIcon color="primary" />
                    <a>Messages</a>
                  </div>
                </Link>
              </div>
            </Paper>
          </Popover>
        </Grid>
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
          <div className={classes.details}>{currentUser.middleName}</div>
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
    </>
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
