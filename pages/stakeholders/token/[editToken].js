import React, {useState, useEffect} from "react";
import { useRouter } from "next/router";
import HostandVendorDashBoard from "../../../components/dashboards/eventHostAndVendor/dashboard";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  Grid,
  Typography,
  TextField,
  Container,
  Avatar,
} from "@material-ui/core";
import Moment from 'react-moment';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import Alert from "@material-ui/lab/Alert";
import EditTokenTable from '../token/EditToken/edittokentable'
import { DiscountTable, MyCustomButton } from "../../../common";
import { discountTokenDetails, updateToken } from "../../../src/services/eventServices";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom:50
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  avatarIcon: {
    color: "#ffffff",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formControl: {
    width: "100%",
  },
  proceed: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  price: {
    display: "flex",
    justifyContent: "space-between",
  },
  pricetag:{
    //   backgroundImage: "url('/images/pricetag.png')",
      backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height:100,
    width:100,
  },
  back: {
    cursor: "pointer",
  },
  tokencode: {
    backgroundColor: "whitesmoke",
    color: theme.palette.primary.main,
    borderRadius: 7,
    textAlign: "center",
    height: 50,
  },
  list:{
    textAlign:'center',
    fontSize:18,
    marginBottom:20,
    fontWeight:'bold',
  }
}));

function EditToken() {
  const [details, setDetails] = useState({
    id:null,
    eventId:null,
    coupon:'',
    percentage_discount:'',
    max_no_of_usage:'',
    number_used:0,
    expires_on:'',
    createdAt: "",
  });
  console.log(details)
  const [err, setErr] = useState('');
  const [msg, setMsg] = useState('');
  const [progress, setProgress] = useState(false);
  const router = useRouter();
  const {editToken} = router.query;
console.log('ed',editToken)
  const tokenDetail = async () => {
    const token = localStorage.getItem('token');
    const response = await discountTokenDetails(token,editToken);
    if (response && response.data){
      setDetails({
        id:response.data.id,
        eventId:response.data.eventId,
        coupon:response.data.coupon,
        percentage_discount:response.data.percentage_discount,
        max_no_of_usage:response.data.max_no_of_usage,
        number_used:response.data.number_used?response.data.number_used:0,
        expires_on:convert(response.data.expires_on),
        createdAt:response.data.createdAt
      })
    }
  };
  const convert = (str) => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  useEffect(() => {
    tokenDetail()
  },[editToken])
 let body = {};
  const handleSubmit = async () => {
    body.eventId = details.eventId;
    body.expires_on = details.expires_on;
    body.percentage_discount = details.percentage_discount;
    body.max_no_of_usage = details.max_no_of_usage
    setProgress(true);
    const token = localStorage.getItem('token');
    const response = await updateToken(token,editToken,body);
    if (response && response.status) {
      setProgress(response.isLoading);
      setErr('others');
      setMsg(response.message);
      if (response.status==='success'){
        setTimeout = () =>{
          setErr('')
          setMsg('')
        },3000}
    }
    console.log(response);
  }
    const classes = useStyles();
  return (
    <HostandVendorDashBoard>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className={classes.price}>
            <div>
              <ArrowBackIcon onClick={()=>router.back()}  className={classes.back} />
            </div>
            <div className={classes.pricetag}>
              <img src='/images/pricetag.png' alt="pricetag" />
            </div>
          </div>
        </Grid>
      </Grid>
      <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <EditIcon className={classes.avatarIcon} />
            </Avatar>
            <p ><b>Edit discount</b></p>
            <form className={classes.form} noValidate>
              {err === "others" && <Alert severity="warning">{msg}</Alert>}

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    type="text"
                    disabled
                    id="coupon"
                    value={details.coupon}
                    label={"token code"}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    type="number"
                    id="discount"
                    value={details.percentage_discount}
                    onChange={(e) => setDetails({...details, percentage_discount:e.target.value})}
                    error={err === "discount"}
                    helperText={err === "discount" && msg}
                    label={"discount(%)"}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="num"
                    type="number"
                    label={"Number of people to use token"}
                    name="Number-of-people-to-use-token"
                    value={details.max_no_of_usage}
                    onChange={(e) => setDetails({...details, max_no_of_usage:e.target.value})}
                    error={err === "max_no_of_usage"}
                    helperText={err === "max_no_of_usage" && msg}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} >
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="numhh"
                    type="number"
                    disabled
                    label={"Number  of token used"}
                    value={details.number_used}
                    name="Number-of-people-to-use-token"
                    error={err === "max_no_of_usage"}
                    helperText={err === "max_no_of_usage" && msg}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} >
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="date"
                    type="text"
                    label="created at"
                    disabled
                    value={new Date(details.createdAt)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} >
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="date"
                    type="date"
                    label="expires on"
                    value={details.expires_on}
                    onChange={(e) => setDetails({...details, expires_on:e.target.value})}
                    name="Expiry_date"
                    error={err === "expires_on"}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                <div className={classes.proceed}>
                <MyCustomButton
                onClick={handleSubmit}
                  changeClass={true}
                  progress={progress}
                >
                 Submit
                </MyCustomButton>
                </div>
              </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      <div className={classes.list}>List of tokens used</div>
      <EditTokenTable />
        </HostandVendorDashBoard>
  );
}

export default EditToken;
