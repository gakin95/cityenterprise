import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { Paper, Toolbar, InputAdornment } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Moment from "react-moment";

import { baseUrl } from "../../../constants";
import DashboardContainer from "../../../components/dashboards/adminAndCso/dashboard";
import { getSingleServiceDetails } from "../../../src/services/vendorServices";
import {MyDialog, ReasonForDisapproval} from "../../../common/confirm";
import CustomizedSnackbars from "../../../components/createEvents/action/sticker";
import { MyCustomButton } from "../../../common";
import {  ApproveService, DisApproveService } from "../../../src/services/admin";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding:20,
  },
  wrapper: {
    backgroundColor: "red",
  },
  imgtitle: {
    display: "flex",
    justifyContent: "space-between",
  },
  imggrid: {
    backgroundSize: "cover",
    backgroundRepeat: "no repeat",
    [theme.breakpoints.down("sm")]: {
      height: 350,
    },
    [theme.breakpoints.down("xs")]: {
      height: "auto",
    },
  },
  approvalbtn: {
    alignItems: "center",
    justifyContent: "space-around",
  },
  action: {
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
  },
  btn: {
    width: 100,
    marginLeft: 19,
  },
  apprvbtn: {
    height: 30,
    width: 120,
    color: "green",
    border: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "green",
      color: "white",
    },
  },
  disapprvbtn: {
    height: 30,
    width: 120,
    color: "red",
    border: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "red",
      color: "white",
    },
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
  },
  searchInput: {
    width: "100%",
  },
}));

export default function CenteredGrid() {
  const router = useRouter();
  const classes = useStyles();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [details, setDetails] = useState([]);
  const [message, setMessage] = useState(null);
  const { id } = router.query;
  const [progress, setProgress] = useState(false);
  const [reject, setReject] = useState(false);
  const [approve, setApprove] = useState(false);
  const [proceed, setProceed] = useState(false);
  const [info, setInfo] = useState(null);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [openreject, setOpenReject] = useState(false);
  const [reason_for_disapproval, setReason] = useState("");



  const getDetails = async () => {
    setOpenBackdrop(true);
    const token = localStorage.getItem("token");
    const response = await getSingleServiceDetails(token, id);
    console.log('oga mi',response);
    if (response && response.data) {
      setOpenBackdrop(response.isLoading);
      setDetails(response.data);
    } else {
      setOpenBackdrop(response.isLoading);
      setMessage(response.message);
    }
  };

  useEffect(() => {
    getDetails();
  }, [router]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const approveService = async () => {
    setApprove(true);
    const token = localStorage.getItem("token");
    const response = await ApproveService(token, id);
    console.log("acc....", approve);
    if (response && response.status) {
      setApprove(response.isLoading);
      setProgress(false);
      setOpen(true);
      setSuccess(response.status === "success" ? true : false);
      setInfo(response.message);
      if (response.status === "success") {
        setTimeout(() => {
          router.push("/admins/pendingapprovals");
        }, 1000);
      }
    }
  };

  const disApproveService = async () => {
    setProceed(true);
    const token = localStorage.getItem("token");
    const response = await DisApproveService(token, id, reason_for_disapproval);
    console.log('disapp',response)
    if (response && response.status) {
      setProceed(response.isLoading);
      setReject(false)
      setOpen(true);
      setInfo(response.message);
      setSuccess(response.status === "success" ? true : false);
      if (response.status === "success") {
        setTimeout(() => {
          router.push("/admins/pendingapprovals");
        }, 2000);
      }
    }
  };

  let renderItem = null;
  if (details && details.User){
    renderItem = <Grid container spacing={3}>
    <Grid item xs={12} md={6} className={classes.imggrid}>
      <img src={baseUrl + details.banner_image} />
    </Grid>

    <Grid item xs={6} md={3}>
      <h5>Services Category</h5>
      <p>Food & Drinks</p>
      <h5>Host Name</h5>
      <p>{`${details.User.firstName} ${details.User.lastName}`}</p>
      <h5>Fees</h5>
      <p>
        {details.price == 0?'free':'₦' + details.price}
      </p>
    </Grid>
    <Grid item xs={6} md={3}>
      <h5>Type of Service</h5>
      <p>Catering</p>
      <h5>Bussiness Name</h5>
      <p>{details.User.business_name}</p>
      <h5>Phone</h5>
      <p>
       {details.User.phone}
      </p>
    </Grid>
    <Grid item xs={12} md={6}>
      <div className={classes.imgtitle}>
        <div>
          <h6>
            Date Created:{" "}
            <Moment format="D MMM YYYY">{details.createdAt}</Moment>
          </h6>
        </div>
        <div>
          <h6>Experience: {details.experience_level}</h6>
        </div>
      </div>
    </Grid>
    <Grid item xs={12} className={classes.description}>
      <h5>Description</h5>
      <p>{details.description}</p>
    </Grid>
    <Grid item xs={12} className={classes.approvalbtn}>
    <div className={classes.action}>
            <MyCustomButton
              className={classes.btn}
              changeClass={true}
             onClick={() => setProgress(true)}
            >
              { "Approve"}
            </MyCustomButton>
            <MyCustomButton
              className={classes.btn}
              changeClass={true}
              onClick={() => setOpenReject(true)}
            >
              {"Disapprove"}
            </MyCustomButton>
          </div>
    </Grid>
  </Grid>
  }else{
    renderItem = <div>
  <h3>{message}</h3>
</div>
  }

  return (
    <DashboardContainer openBackDrop={openBackdrop}>
      <CustomizedSnackbars
        message={info}
        open={open}
        success={success}
        handleClose={handleClose}
      />
      <MyDialog
        openDialog={progress}
        title="Are you sure you want to approve this service?"
        image={details &&  baseUrl + details.banner_image}
        onClick={() => approveService()}
        onClose={() => setProgress(false)}
      />
      <MyDialog
        openDialog={openreject}
        title="Are you sure you want to disapprove this service?"
        image={details &&  baseUrl + details.banner_image}
        onClick={() => {
          setReject(true);
          setOpenReject(false)
        }}
        onClose={() => setOpenReject(false)}
      />
      <ReasonForDisapproval
      value={reason_for_disapproval}
      onChange={(e) => setReason(e.target.value)}
      openDialog={reject}
      image={details &&  baseUrl + details.banner_image}
      progress={proceed}
      onClick={() => disApproveService()}
      onClose={() => setReject(false)}
       />
      <div className={classes.title}>
        <h4>Service details</h4>
      </div>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          {renderItem}
        </Paper>
      </div>
    </DashboardContainer>
  );
}
