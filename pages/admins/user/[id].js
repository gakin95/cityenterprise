import React, {useState, useEffect} from "react";
import DashboardContainer from "../../../components/dashboards/adminAndCso/dashboard";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useRouter } from "next/router";
import { makeStyles, Paper, Grid, Container } from "@material-ui/core";
import {getUserDetailsAdmin} from '../../../src/services/admin';
import {baseUrl} from '../../../constants';



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
  title:{
      color:'grey',
  },
  img:{
      borderRadius:7,
  },
  btn:{
    width:'40%',
    margin:'0 auto'
  },
  btn1:{
    color:'green',
    height:30,
    width:150,
    cursor:'pointer',
    border:'none',
    marginLeft:20,
    "&:hover": {
        backgroundColor: 'green',
        color: "white",
      },
  },
  btn2:{
      color:'red',
      height:30,
    width:150,
    border:'none',
    cursor:'pointer',
    marginLeft:20,
      "&:hover": {
        backgroundColor: 'red',
        color: "white",
      },
  },
  grid:{
      marginBottom:50,
  }
}));

function AdminsDashboard() {
  const router = useRouter();
  const classes = useStyles();
  const [message, setMessage] = useState(null);
  const [details, setDetails] = useState([]);
  const [openBackDrop, setopenBackDrop] = useState(false);
  const {id} = router.query;
  const getUserProfile = async () =>{
      setopenBackDrop(true);
      const token = localStorage.getItem('token')
      const response = await getUserDetailsAdmin(token, id);
      if (response && response.data){
          setopenBackDrop(false);
          setMessage(response.message);
          setDetails(response.data)
      }
      console.log(response)

  }

  useEffect(() => {
      getUserProfile()
  },[router]);
  console.log('y........',details);
let render;
if (details && details.id){
    render = <Paper>
    <Container>
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={12} sm={6} md={2}>
         <img className={classes.img} src={baseUrl + details.profile_picture} alt="profile pix" />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
              <p className={classes.title}>First Name</p>
              <p>{details.firstName}</p> 
              <br />
              <p className={classes.title}>Email</p>
              <p>{details.email}</p>
          </Grid >
          <Grid item xs={12} sm={6} md={2}>
          <p className={classes.title}>Middle Name</p>
              <p>{details.middleName}</p> 
              <br />
              <p className={classes.title}>Document</p>
              <p></p>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
          <p className={classes.title}>Last Name</p>
              <p>{details.lastName}</p> 
              <br />
              <p className={classes.title}>Phone No</p>
              <p>{details.phone}</p>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
          <p className={classes.title}>Gender</p>
              <p>{details.gender}</p> 
              <br />
              <p className={classes.title}>Status</p>
              <p>{details.isEmailVerified?'Active':'Inactive'}</p>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <p className={classes.title}>Body</p>
            <p>{details.business_name}</p>
            </Grid>
          </Grid>
        </Container>
        <div className={classes.btn}>
        <button onClick={() => window.print()} className={classes.btn1}>Activate</button>
        <button className={classes.btn2}>Disable</button>
        </div>
  </Paper>
}else{
    render = <div>
        {message && <Paper><h2>{message}</h2></Paper>}
    </div>
}
  return (
    <DashboardContainer openBackDrop={openBackDrop}>
      <KeyboardBackspaceIcon
        className={classes.backarrow}
        onClick={() => router.back("./newscontent")}
      />
      <h4>User Details</h4>
      {render}
    </DashboardContainer>
  );
}
export default AdminsDashboard;
