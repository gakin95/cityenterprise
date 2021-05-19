import React, { useState, useEffect } from "react";
import DashboardContainer from "../../../components/dashboards/adminAndCso/dashboard";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useRouter } from "next/router";
import { makeStyles, Paper, Grid, Container } from "@material-ui/core";
import { getSingleContactMessage} from '../../../src/services/contact';
import Moment from "react-moment";


const useStyles = makeStyles((theme) => ({
  backarrow: {
    cursor: "pointer",
  },
  button2: {
    display: "flex",
    justifyContent: "space-between",
  },
  activate: {
    width: "20%",
    backgroundColor: theme.palette.primary.main,
    height: 40,
    borderRadius: 5,
    border: "none",
    cursor: "pointer",
  },
  deactivate: {
    width: "20%",
    backgroundColor: "whitesmoke",
    height: 40,
    borderRadius: 5,
    border: "none",
    cursor: "pointer",
  },
  title: {
    color: "grey",
  },
  img: {
    borderRadius: 7,
  },
  
 msg:{
 marginLeft:30,
 },
  grid: {
    marginBottom: 50,
  },
  check:{
      display:'flex',
  }
}));

function AdminsDashboard() {
  const router = useRouter();
  const classes = useStyles();
  const [message, setMessage] = useState(null);
  const [details, setDetails] = useState([]);
  const [openBackDrop, setopenBackDrop] = useState(false);
  const { id } = router.query;
  const getUsermessage = async () => {
    setopenBackDrop(true);
    const token = localStorage.getItem("token");
    const response = await  getSingleContactMessage(token, id);
    if (response && response.data) {
      setopenBackDrop(false);
      setMessage(response.message);
      setDetails(response.data);
    }
    console.log(response);
  };

  useEffect(() => {
    getUsermessage();
  }, [router]);
  console.log("y........", details);
  let render;
  if (details && details.id) {
    render = (
      <Paper>
        <Container>
          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={12} sm={6} md={3}>
              <p className={classes.title}>Customer Name</p>
              <p>{details.firstName + " " + details.lastName}</p>
              <br />
              <p className={classes.title}>Company</p>
              <p>{details.company}</p>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <p className={classes.title}>Phone Number</p>
              <p>{details.phone}</p>
              <br />
              <p className={classes.title}> Country</p>
              <p>{details.country}</p>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <p className={classes.title}>Email</p>
              <p>{details.email}</p>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <p className={classes.title}>Date</p>
              <p><Moment format="D MMM YYYY">{details.createdAt}</Moment></p>
            </Grid>
          </Grid>
        </Container>
        <div className={classes.msg}>
          <h4>Customer Message</h4>
          <p>
           {details.message}
          </p>
        </div>
      </Paper>
    );
  } else {
    render = (
      <div>
        {message && (
          <Paper>
            <h2>{message}</h2>
          </Paper>
        )}
      </div>
    );
  }
  return (
    <DashboardContainer openBackDrop={openBackDrop}>
      <KeyboardBackspaceIcon
        className={classes.backarrow}
        onClick={() => router.back("./feedbacks")}
      />
      <h4>User Details</h4>
      {render}
    </DashboardContainer>
  );
}
export default AdminsDashboard;
