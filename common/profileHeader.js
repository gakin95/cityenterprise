import React, { useState, useEffect } from "react";
import { Grid, Paper, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import EditIcon from "@material-ui/icons/Edit";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockIcon from "@material-ui/icons/Lock";
import SettingsIcon from "@material-ui/icons/Settings";
import Popover from "@material-ui/core/Popover";
import { useRouter } from "next/router";
import { Header } from "../common";

const useStyles = makeStyles((theme) => ({
  root: {
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
    width: 250,
    padding: 20,
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
    "& :hover": {
      color: theme.palette.primary.main,
    },
  },
 
}));

const ProfileContainer = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };
  const router = useRouter();
  const classes = useStyles();
  return (
    <>
      <Header route="profile" />
      <Grid 
      container spacing={3} 
      className={classes.root}
      >
        <Grid item xs={12} >
            <div className={classes.profile}>
          <p className={classes.myprofile}>{props.title}</p>
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
          </div>
          <Divider color='secondary'/>
        </Grid>
        {props.children}
      </Grid>
    </>
  );
};




export default ProfileContainer;
