import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Typography,Paper} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { EventApproval, ServiceApproval} from '../../components/pendingApprovals';
import DashboardContainer from '../../components/dashboards/adminAndCso/dashboard';

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
        <Box p={3}>
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
    'aria-controls': `simple-tabpanel-${index}`,
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
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3)
},
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <DashboardContainer openBackDrop={openBackdrop}>
        <Paper className={classes.pageContent}>
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Event Approval" {...a11yProps(0)} style={{textTransform:'none'}}/>
          <Tab label="Service Approval" {...a11yProps(1)} style={{textTransform:'none'}}/>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <EventApproval />
      </TabPanel>
      <TabPanel value={value} index={1}>
       <ServiceApproval />
      </TabPanel>
    </div>
    </Paper>
    </DashboardContainer>
  );
}