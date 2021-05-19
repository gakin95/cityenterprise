import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Avatar } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/router";
import Moment from "react-moment";

import { ButtonWithBackdrop, MyDialog, UploadFile } from "../../../common";
import HostandVendorDashBoard from "../../../components/dashboards/eventHostAndVendor/dashboard";
import Tags from "../../../common/tags";
import { baseUrl } from "../../../constants";
import {
  getEventDetails,
  updateEvent,
} from "../../../src/services/eventServices";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 40,
  },
  name: {
    font: "normal normal bold 20px/24px Work Sans",
  },
  edit: {
    background: "#F5F5F5 0% 0% no-repeat padding-box",
    borderRadius: 12,
    position: "relative",
    padding: 20,
    width: "70%",
    height: "53px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  description: {
    background: "#F5F5F5 0% 0% no-repeat padding-box",
    borderRadius: 12,
    padding: 20,
    width: "85%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      paddingRight: 0,
      width: "100%",
    },
  },
  summary: {
    background: "#F5F5F5 0% 0% no-repeat padding-box",
    borderRadius: 12,
    position: "relative",
    padding: 20,
    width: "50%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  editdesc: {
    paddingRight: 100,
    width: "85%",
    [theme.breakpoints.down("sm")]: {
      paddingRight: 0,
      width: "100%",
    },
  },
  avatar: {
    cursor: "pointer",
    color: "#000",
    background: "#fff",
  },
  cancel: {
    color: "red",
  },
  image: {
    height: 185,
    position: "relative",
    width: "100%",
    borderRadius: 10,
    backgroundSize: "cover",
    backgroundOrigin: "center",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down("sm")]: {
      paddingRight: 0,
      width: "100%",
    },
  },
  img: {
    width: "100%",
    height: "100%",
  },
  vendor: {
    background: "#F5F5F5 0% 0% no-repeat padding-box",
    borderRadius: 12,
    padding: 20,
    width: "85%",
    marginBottom: 10,
    [theme.breakpoints.down("sm")]: {
      paddingRight: 0,
      width: "100%",
    },
  },
  upload:{
    background: "#F5F5F5 0% 0% no-repeat padding-box",
    height: 185,
    position: "relative",
    width: "100%",
    borderRadius: 10,
    backgroundSize: "cover",
    backgroundOrigin: "center",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down("sm")]: {
      paddingRight: 0,
      width: "100%",
    },
  },
  save: {
    marginBottom: "4rem",
    width: "85%",
    marginTop: "1rem",
  },
  button: {
    width: "25%",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      width: "50%",
      margin: "0 auto",
    },
  },
  datepicker: {
    border: "none",
    width: 200,
    height: 45,
    borderRadius: 5,
  },
  icon: {
    position: "absolute",
    cursor: "pointer",
    top: 0,
    right: 0,
    zIndex: 3,
  },
}));

function EditEvent() {
  const router = useRouter();
  const { id } = router.query;
  const [details, setDetails] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSummary, setOpenSummary] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [openDialog, setOpenDialog] = useState();
  const [positiveDialog, setPositiveDialog] = useState(true);
  const [uploadImage, setUploadImage] = useState(null);
  const [editDescription, setEditDescription] = useState(false);
  const [data, setData] = useState([]);

  const handleAddImageClick = (event) => {
    event.stopPropagation();
    let fileInput = event.target.getElementsByTagName("input")[0];
    fileInput.click();
  };

  const handleSave = async () => {
    setOpen(true);
    const token = localStorage.getItem('token');
    const response = await updateEvent(token,data,id);
    if (response && response.status){
      setOpen(false);
      setOpenDialog(true);
      setDialogMessage(response.message);
      if(response.status === 'success'){
        setTimeout(() => {
          router.push('/stakeholders/manageevent')
        },1000)
      }
    }
  };

  const handleEditorChange = (e) => {
    setDescription(e.target.getContent());
    console.log("Content was updated:", e.target.getContent());
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      (async () => {
        const response = await getEventDetails(id);
        //const response = outcome.data;
        console.log('....re.................................',response)
        if (response && response.data.id){
          setDetails(response.data);
          setData({
            type_of_event: response.data.type_of_event,
            eventCategoryId: response.data.eventCategoryId,
            event_title: response.data.event_title,
            experience_level: response.data.experience_level,
            event_location: response.data.event_location,
            longitude: response.data.longitude,
            latitude: response.data.latitude,
            country: response.data.country,
            state: response.data.state,
            city: response.data.city,
            zip_code: response.data.zip_code,
            description: response.data.description,
            event_summary: response.data.event_summary,
            tags: response.data.tags.split(','),
            starting_date: response.data.starting_date,
            ending_date: response.data.ending_date,
            ending_time: response.data.ending_time,
            starting_time: response.data.starting_time,
            isRecuringEvent: response.data.isRecuringEvent,
            event_recuring_ends: response.data.event_recuring_ends,
            expected_no_of_attendees: response.data.expected_no_of_attendees,
            isListed: 1,
          })
        }
      })();
    }
  }, [router]);

  console.log("details..", details);
  console.log("deata..", data);

  const classes = useStyles();

  let content;
  if (details && details.id) {
    content = (
      <Zoom in={true}>
        <Grid container spacing={3} className={classes.root}>
          <MyDialog
            title={dialogTitle}
            openDialog={openDialog}
            positiveDialog={positiveDialog}
            onClose={() => setOpenDialog(false)}
          >
            {dialogMessage}
          </MyDialog>
          <Grid item xs={12} sm={6}>
            <p className={classes.name}>Event Name</p>
            <div className={classes.edit}>
              <div>{details.event_title}</div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <p className={classes.name}>Description</p>
            <div className={classes.description}>
              <div className={classes.editdesc}>
                {!editDescription && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: details && details.description,
                    }}
                  />
                )}
                {editDescription && (
                  <Editor
                    initialValue={`<div>${data.description}</div>`}
                    outputFormat="text"
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        "advlist autolink lists link image",
                        "charmap print preview anchor help",
                        "searchreplace visualblocks code",
                        "insertdatetime media table paste wordcount",
                      ],
                      toolbar:
                        "undo redo | formatselect | bold italic | \
                  alignleft aligncenter alignright | \
                  bullist numlist outdent indent | help",
                    }}
                    onChange={(e) => setData({...data, description: e.target.getContent()})}
                  />
                )}
              </div>
              {!editDescription && (
                <Avatar
                  className={classes.avatar}
                  onClick={() => setEditDescription(!editDescription)}
                >
                  <EditIcon />
                </Avatar>
              )}
              {editDescription && (
                <Avatar
                  className={classes.avatar}
                  onClick={() => setEditDescription(!editDescription)}
                >
                  <CancelIcon className={classes.cancel} />
                </Avatar>
              )}
            </div>
          </Grid>
          <Grid item xs={12}>
            <p className={classes.name}>Event Summary</p>
            {!openSummary && (
              <div className={classes.summary}>
                <div>{details.event_summary}</div>
                <div
                  className={classes.icon}
                  onClick={() => setOpenSummary(true)}
                >
                  <Avatar style={{ backgroundColor: "white", color: "black" }}>
                    <EditIcon color="black" />
                  </Avatar>
                </div>
              </div>
            )}
            {openSummary && (
              <div className={classes.summary}>
                <div>
                  <input
                    type="text"
                    value={data.event_summary}
                    className={classes.datepicker}
                    onChange={(e) => setData({...data,event_summary:e.target.value})}
                  />
                </div>
                <div
                  className={classes.icon}
                  onClick={() => setOpenSummary(false)}
                >
                  <Avatar style={{ backgroundColor: "white", color: "black" }}>
                    <CancelIcon className={classes.cancel} />
                  </Avatar>
                </div>
              </div>
            )}
          </Grid>
          <Grid item xs={12} md={3}>
            <p className={classes.name}>Image</p>
           { !openDate && <div className={classes.image}>
              <img
                className={classes.img}
                src={baseUrl + details.event_banner}
              />
              <div className={classes.icon} onClick={() => setOpenDate(true)}>
                <Avatar style={{ backgroundColor: "white", color: "black" }}>
                  <EditIcon color="black" />
                </Avatar>
              </div>
            </div>}
            {openDate && <div className={classes.upload}>
                <div>
                <UploadFile
                        image="/images/upload.png"
                        title="Upload image or photo"
                        text="Max file size (5MB)"
                        accept="image/*"
                        filename="image"
                        onClick={handleAddImageClick}
                        backgroundImage={uploadImage}
                        setImage={(file) => {
                          setUploadImage(file);
                        }}
                      />
                </div>
                <div
                  className={classes.icon}
                  onClick={() => setOpenDate(false)}
                >
                  <Avatar style={{ backgroundColor: "white", color: "black" }}>
                    <CancelIcon className={classes.cancel} />
                  </Avatar>
                </div>
              </div>}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <p className={classes.name}>Fees</p>
            <div className={classes.edit}>
              <div>{details.type_of_event}</div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <p className={classes.name}>Vendors </p>
            {details.EventVendors.map((item, index) => (
              <div className={classes.vendor} key={index}>
                <div>
                  <b>Name:</b>{" "}
                  {`${item.vendorService.User.firstName} ${item.vendorService.User.lastName} `}
                </div>
                <div>
                  <b>Bussiness Name: </b>
                  {item.vendorService.User.business_name}
                </div>
                <div>
                  <b>description: </b>
                  {item.vendorService.description}
                </div>
                <div>
                  <b>Phone No:</b> {item.vendorService.User.phone}
                </div>
              </div>
            ))}
          </Grid>
          <Grid item xs={12} md={6}>
            <p className={classes.name}>Event location</p>
            {!openLocation && (
              <div className={classes.edit}>
                <div>{details.event_location}</div>
                <div
                  className={classes.icon}
                  onClick={() => setOpenLocation(true)}
                >
                  <Avatar style={{ backgroundColor: "white", color: "black" }}>
                    <EditIcon color="black" />
                  </Avatar>
                </div>
              </div>
            )}
            {openLocation && (
              <div className={classes.edit}>
                <div>
                  <input
                    type="text"
                    value={data.event_location}
                    className={classes.datepicker}
                    onChange={(e) => setData({...data,event_location:e.target.value})}
                  />
                </div>
                <div
                  className={classes.icon}
                  onClick={() => setOpenLocation(false)}
                >
                  <Avatar style={{ backgroundColor: "white", color: "black" }}>
                    <CancelIcon className={classes.cancel} />
                  </Avatar>
                </div>
              </div>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <p className={classes.name}>Event Start Date</p>
            {!openStartDate && (
              <div className={classes.edit}>
                <div>
                  <Moment format="D MMM YYYY">
                    {details.starting_date}
                  </Moment>
                </div>
                <div
                  className={classes.icon}
                  onClick={() => setOpenStartDate(true)}
                >
                  <Avatar style={{ backgroundColor: "white", color: "black" }}>
                    <EditIcon color="black" />
                  </Avatar>
                </div>
              </div>
            )}
            {openStartDate && (
              <div className={classes.edit}>
                <div>
                  <input
                    type="date"
                    className={classes.datepicker}
                    onChange={(e) => setData({...data,starting_date:e.target.value})}
                  />
                </div>
                <div
                  className={classes.icon}
                  onClick={() => setOpenStartDate(false)}
                >
                  <Avatar style={{ backgroundColor: "white", color: "black" }}>
                    <CancelIcon className={classes.cancel} />
                  </Avatar>
                </div>
              </div>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <p className={classes.name}>Event End Date</p>
            {!openEndDate && (
              <div className={classes.edit}>
                <div>
                  <Moment format="D MMM YYYY">{details.ending_date}</Moment>
                </div>
                <div className={classes.icon} onClick={() => setOpenEndDate(true)}>
                  <Avatar style={{ backgroundColor: "white", color: "black" }}>
                    <EditIcon color="black" />
                  </Avatar>
                </div>
              </div>
            )}
            {openEndDate && (
              <div
                className={classes.edit}
              >
                <div>
                  <input
                    type="date"
                    onChange={(e) => setData({...data,ending_date:e.target.value})}
                    className={classes.datepicker}
                  />
                </div>
                <div
                  className={classes.icon}
                  onClick={() => setOpenEndDate(false)}
                >
                  <Avatar style={{ backgroundColor: "white", color: "black" }}>
                    <CancelIcon className={classes.cancel} />
                  </Avatar>
                </div>
              </div>
            )}
          </Grid>
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={2}>
            {" "}
          </Grid>
          <Grid item xs={12} className={classes.save}>
            <div className={classes.button}>
              <ButtonWithBackdrop
                label="Update & Save"
                click={handleSave}
                open={open}
              />
            </div>
          </Grid>
        </Grid>
      </Zoom>
    );
  }

  return (
    <div>
      <HostandVendorDashBoard>{content}</HostandVendorDashBoard>
    </div>
  );
}

export default EditEvent;
