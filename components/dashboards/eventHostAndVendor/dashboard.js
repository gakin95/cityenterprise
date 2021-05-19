import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Link from "next/link";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import { useRouter } from "next/router";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Popover from "@material-ui/core/Popover";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { connect } from "react-redux";
import * as actions from "../../../src/store/actions";
import {ProfileCard} from "../../../common";
import {baseUrl} from "../../../constants";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& .MuiAppBar-colorPrimary": {
      backgroundColor: "#fff",
      color: "black",
    },
    "& .MuiPaper-elevation4": {
      boxShadow: "none",
    },
  },
  header: {
    flexGrow: 1,
    "& a": {
      textDecoration: "none",
      marginRight: theme.spacing(2),
      color: "#848589",
    },
    "& a:hover": {
      color: "#F06F38",
    },
    "& a:active": {
      background: "#555",
      padding: "10px 20px",
      display: "inline-block",
      border: "1px solid #fff",
      borderRadius: 2,
      color: "#fff",
    },
  },
  text: {
    color: "grey",
  },
  authenticatedUser: {
    display: "flex",
    alignItems: "center",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  brandlogo: {
    margin: "0px auto",
    position: "relative",
    top: 17,
  },
  brandname: {
    font: "normal normal 600 16px/19px Work Sans",
  },
  image: {
    //backgroundImage:(props) =>  props.image?baseUrl + props.image:"url('/images/host.png')",
    backgroundSize: "cover",
    height: 126,
    width: 160,
    backgroundRepeat: "no-repeat",
    margin: "2rem 2rem auto",
  },
  manage: {
    color: "#F06F38",
    textAlign: "center",
  },
  ListItem: {
    "& a": {
      display: "block",
      textDecoration: "none",
      color: "#2B2B2B",
      margin: "1rem auto",
      font: "normal normal normal 16px/19px Work Sans",
    },
    "& :hover": {
      backgroundColor: theme.palette.primary.dark,
      padding: "10px 20px",
      borderRadius: 5,
      color: "#fff",
    },
  },
  active: {
    backgroundColor: theme.palette.primary.main,
    padding: "10px 20px",
    borderRadius: 5,
    color:'white !important'
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const matches = useMediaQuery("(max-width:884px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { onGetProfile, currentUser, onLogout, error } = props;
  const classes = useStyles();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
    } else {
      onGetProfile(token);
    }
  }, [router]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const goToDashBoard = () => {
    router.push("/stakeholders/in");
  };
  const gotoProfile = () => {
    router.push("/profile/myprofile");
  };
  const logout = () => {
    onLogout();
    router.push("/");
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const authUser = (
    <div className={classes.authenticatedUser}>
      <p className={classes.text}>Welcome {currentUser.firstName}</p>
      <Avatar
        alt="Gbemi"
        src="/images/burnaboy.png"
        className={classes.small}
      />
      <ExpandMoreIcon onClick={handleClick} />
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
        <ProfileCard
          user={currentUser}
          firstName={currentUser.firstName}
          lastName={currentUser.lastName}
          email={currentUser.email}
          phone={currentUser.phone}
          image={currentUser.profile_picture}
          gotoDashboard={goToDashBoard}
          gotoProfile={gotoProfile}
          gotoNotification={() => router.push("/user/notification")}
          gotoRefund={() => router.push("/user/refund")}
          logout={logout}
        />
      </Popover>
    </div>
  );

  let showTitles = null;
  if (!matches) {
    showTitles = (
      <div className={classes.authenticatedUser}>
        <Link href="/events">
          <a>Event</a>
        </Link>
        <Link href="/news">
          <a>News</a>
        </Link>
        <Link href="/about">
          <a>About Us</a>
        </Link>
        <Link href="/help">
          <a>Help</a>
        </Link>
        {currentUser.roleId === 131 && (
          <Link href="/createEvent">
            <a>Create Event</a>
          </Link>
        )}
        {currentUser.roleId === 121 && (
          <Link href="/listServices">
            <a>List Services</a>
          </Link>
        )}
      </div>
    );
  }

  const drawerContent = (
    <div>
      <div className={classes.brand}>
        <Avatar
          className={classes.brandlogo}
          src="https://i2.wp.com/cityevents.ng/wp-content/uploads/2017/04/cityeventsng-logo.jpg?fit=200%2C200&ssl=1"
          alt="cityEvents"
        />
      </div>
      <div className={classes.toolbar} style={{ minHeight: 35 }} />
      <Divider />
      <div className={classes.manage}>
        <p>Manage {currentUser.roleId === 121 ? "Services" : "Events"}</p>
        <div>
          <div className={classes.image}>
          <img src={'/images/host.png'} />
          </div>
          <p className={classes.brandname}>{currentUser.business_name}</p>
        </div>
        <div>
          <div className={classes.ListItem}>
            <Link href="/">
              <a>Home</a>
            </Link>
            <Link href="/stakeholders/in">
              <a className={router.pathname==='/stakeholders/in'?classes.active:''}>{currentUser.roleId === 121 ? "Dashboard" : "Ticket sold"}</a>
            </Link>
            {currentUser.roleId === 131 && (
              <Link href="/stakeholders/manageevent">
                <a className={router.pathname==='/stakeholders/manageevent'?classes.active:''}>Manage Events</a>
              </Link>
            )}
            {currentUser.roleId === 131 && (
              <Link href="/stakeholders/checkin">
                <a className={router.pathname==='/stakeholders/checkin'?classes.active:''}>Check in customers</a>
              </Link>
            )}
            {currentUser.roleId === 121 && (
              <Link href="/stakeholders/notification">
                <a className={router.pathname==='/stakeholders/notification'?classes.active:''}>Notification</a>
              </Link>
            )}
            {currentUser.roleId === 131 && (
              <Link href="/stakeholders/discountToken">
                <a className={router.pathname==='/stakeholders/discountToken'?classes.active:''}>Discount Token</a>
              </Link>
            )}
            {/* {currentUser.roleId === 131 && (
              <Link href="/stakeholders/charges">
                <a>Payment & fees </a>
              </Link>
            )}
            {currentUser.roleId === 131 && (
              <Link href="/stakeholders/payout">
                <a>Payout</a>
              </Link>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap></Typography>
          <div className={classes.header}>{showTitles}</div>
          {authUser}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {/* {drawer} */}
            {drawerContent}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawerContent}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
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
    onGetProfile: (token) => dispatch(actions.profile(token)),
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDrawer);
