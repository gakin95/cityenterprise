import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import CreateServices from "./action/createServices";
import ManageServices from "./action/manageServices";
import Grid from "@material-ui/core/Grid";
import { baseUrl } from "../../constants";
import { ButtonWithBackdrop } from "../../common";
import { getServicesByCurrentVendor } from "../../src/services/vendorServices";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box component="div" m={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    "& .MuiAppBar-colorPrimary": {
      backgroundColor: "#fff",
      color: "red",
      "& :active": {
        color: "blue",
      },
    },
    "& .MuiPaper-elevation4": {
      boxShadow: "none",
    },
  },
  gridContainer: {
    width: "80%",
    margin: "auto",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  nodata: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    //paddingBottom:200
  },
  image: {
    backgroundImage: "url('/images/un.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundOrigin: "center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "80vh",
  },
}));

export default function SimpleTabs() {
  const [open, setOpen] = useState(false);
  const [vendorServices, setVendorServices] = useState([]);
  const [denyAccess, setDenyAccess] = useState(null);
  const [token, setToken] = useState(null);
  console.log("another", vendorServices.length);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setToken(null);
    } else {
      (async () => {
        setToken(token);
        const outcome = await getServicesByCurrentVendor(token);
        outcome.message === "Access denied"
          ? setDenyAccess(outcome.message)
          : setVendorServices(outcome.data);
        setLoading(outcome.isLoading);
        if (outcome.message === "Access denied") {
          router.replace("/");
        }
      })();
    }
  }, [value, token]);
  const classes = useStyles();
  console.log('vendorS-------------------------------------',vendorServices)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSubmit = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      router.replace("/signin");
    }, 3000);
  };
  let content = (
    <div>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={classes.nodata}>
        <h1>Retriving data....</h1>
      </div>
    </div>
  );
  if (denyAccess) {
    content = (
      <div className={classes.nodata}>
        <h1>{denyAccess}</h1>
      </div>
    );
  } else if (!denyAccess && vendorServices.length > 0) {
    content = vendorServices.map((current) => (
      <Grid item xs={12} sm={6} md={4} key={current.id}>
        <ManageServices
          image={baseUrl + current.banner_image}
          title={current.category}
          content={current.description}
          date={current.createdAt}
          experience={current.experience_level}
          amount={current.price == 0?'free':'paid'}
          click={() => router.push(`/service/${current.id}`)}
          gotoEdit={() => router.push(`/service/edit/${current.id}`)}
        />
      </Grid>
    ));
  } else {
    content = (
      <div className={classes.nodata}>
        <h1>No data available</h1>
      </div>
    );
  }

  let renderServices = (
    <div>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="primary"
          aria-label="simple tabs example"
        >
          <Tab
            label="List Services"
            {...a11yProps(0)}
            style={{ textTransform: "none" }}
          />
          <Tab
            label="Manage Services"
            {...a11yProps(1)}
            style={{ textTransform: "none" }}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <CreateServices />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={3} className={classes.gridContainer}>
          {content}
        </Grid>
      </TabPanel>
    </div>
  );

  if (!token) {
    renderServices = (
      <div>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <h1>Sign in as a vendor</h1>
            <ButtonWithBackdrop
              label="Continue"
              click={handleSubmit}
              open={open}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={classes.image}></Grid>
        </Grid>
      </div>
    );
  }

  return <div className={classes.root}>{renderServices}</div>;
}
