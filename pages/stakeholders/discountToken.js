import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Container,
  Avatar,
} from "@material-ui/core";
import { useRouter } from "next/router";
import AddIcon from "@material-ui/icons/Add";
import Alert from "@material-ui/lab/Alert";
import Divider from "@material-ui/core/Divider";

import HostandVendorDashBoard from "../../components/dashboards/eventHostAndVendor/dashboard";
import { DiscountTable, MyCustomButton } from "../../common";
import { getMyApprovedEvents, createDiscountToken, ListDiscountToken } from "../../src/services/eventServices";
import TokenDialogue from "../../components/dialogue/token";

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
}));

function DiscountToken() {
  const [listDiscount, setListDiscount] = useState([]);
  const [formData, setFormData] = useState({
    eventId: null,
    percentage_discount: '',
    max_no_of_usage:'',
    expires_on:convert( Date.now()),
  });
  const [discount, setDiscount] = useState('');
  const [numbers, setNumbers] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [positiveDialog, setPositiveDialog] = useState(true);
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("Select an event");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [progress, setProgress] = useState(false);
  const router = useRouter();
  const classes = useStyles();
  const fetchEvents = async () => {
    const token = localStorage.getItem("token");
    const response = await getMyApprovedEvents(token);
    if (response && response.data) {
      setEvents(
        response.data.map((event) => {
          return {
            id: event.id,
            image: event.event_banner,
            title: event.event_title,
            content: event.event_summary,
          };
        })
      );
    }
  };
  console.log('listing...',listDiscount)
  const fetchDiscountToken = async () => {
    const token = localStorage.getItem("token");
    const response = await ListDiscountToken(token);
    //console.log(response)
    if (response && response.data) {
      setListDiscount(
        response.data.map((event,i) => {
          return {
            id: event.id,
            sn: i+1,
            coupon: event.coupon,
            title: event.event.event_title,
            discount:`${event.percentage_discount}%`,
            limit:event.max_no_of_usage,
            usage:event.number_used,
            expires_on:event.expires_on,
            createdAt:event.createdAt
          };
        })
      );
    }
  };
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
useEffect(() => {
  fetchEvents();
  fetchDiscountToken();
},[]);

const validateForm = () => {
  if (title === 'Select an event') {
    setErr('title');
    setMsg('select a valid title');
    return
  }
  if (discount.length<1) {
    setErr('discount');
    setMsg('set a percentage discount');
    return
  }
  if (numbers.length<1) {
    setErr('max_no_of_usage');
    setMsg('state the number of people to use token');
    return
  }
  if (formData.expires_on === '') {
    setErr('expires_on');
    setMsg('state  the date you want to expire your token');
    return
  }
  return true
}
const handleChange = (name) => (event) => {
  const value = event.target.value;
  setFormData({
    ...formData, [name]: name !== 'expires_on'?parseInt(value):value,
  });
};
let body = {};
const handleSubmit = async () => {
  const token = localStorage.getItem('token');
  if (validateForm()) {
    setErr('');
    setMsg('');
    setProgress(true)
    const response = await createDiscountToken(token,formData);
    console.log(response)
    if(response && response.status) {
      setProgress(response.isLoading);
      setErr('others');
       setMsg(response.message);
       if (response.status === 'success'){
        fetchDiscountToken();
        setTimeout(() => {
          setDiscount('');
          setNumbers('');
          setTitle("Select an event");
          setErr('');
          setMsg('');
          setFormData({
            eventId: null,
            percentage_discount: '',
            max_no_of_usage:'',
            expires_on:'',
          })
        },3000)
       }
    }
  }
}

  return (
    <div>
      <HostandVendorDashBoard>
        <TokenDialogue
          openDialog={openDialog}
          positiveDialog={positiveDialog}
          onClose={() => setOpenDialog(false)}
        />
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <AddIcon className={classes.avatarIcon} />
            </Avatar>
            <Typography component="h5" variant="h5" className={classes.sign}>
            Add discount code
            </Typography>
            <form className={classes.form} noValidate>
              {err === "others" && <Alert severity="warning">{msg}</Alert>}

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl className={classes.formControl} fullWidth >
                    <Select
                      labelId="experience-level"
                      id="level"
                      variant="outlined"
                      placeholder=""
                      error={err === "title"}
                      value={title}
                      onChange={(e) => {
                        const value = e.target.value;
                        setTitle(value);
                        setFormData({...formData, eventId:parseInt(value)})
                      }}
                      fullWidth
                    >
                      <MenuItem value="Select an event" >
                        Select an event
                      </MenuItem>
                      {events.map(e => <MenuItem key={e.id} value={e.id}>{e.title}</MenuItem>)}
                    </Select>
                  </FormControl>
                  {err === "title" && <p style={{color:"red"}}>{msg}</p>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    type="number"
                    value={discount}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDiscount(value);
                      setFormData({...formData, percentage_discount:parseInt(value)})
                    }}
                    id="discount"
                    error={err === "discount"}
                    helperText={err === "discount" && msg}
                    label={"discount(e.g 25%)"}
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
                    value={formData.max_no_of_usage}
                    onChange={(e) => {
                      const value = e.target.value;
                      setNumbers(value);
                      setFormData({...formData, max_no_of_usage:parseInt(value)})
                    }}
                    label={"Number of people to use token"}
                    name="Number-of-people-to-use-token"
                    error={err === "max_no_of_usage"}
                    helperText={err === "max_no_of_usage" && msg}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Expiry Date"
                    id="date"
                    type="date"
                    format="MM/dd/yyyy"
                    value={formData.expires_on}
                    onChange={handleChange("expires_on")}
                    name="Expiry_date"
                    error={err === "expires_on"}
                    autoFocus
                  />
                  {err === "expires_on" && <p style={{color:"red"}}>{msg}</p>}
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
        <DiscountTable records={listDiscount} setItem={setListDiscount} callback={fetchDiscountToken}/>
      </HostandVendorDashBoard>
    </div>
  );
}

export default DiscountToken;
