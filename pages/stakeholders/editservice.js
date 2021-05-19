import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Avatar } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import { Editor } from '@tinymce/tinymce-react';
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import { ButtonWithBackdrop, MyDialog } from "../../common";
import HostandVendorDashBoard from "../../components/dashboards/eventHostAndVendor/dashboard";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 20,
  },
  name: {
    font: "normal normal bold 20px/24px Work Sans",
  },
  edit: {
    background: "#F5F5F5 0% 0% no-repeat padding-box",
    borderRadius: 12,
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
  editdesc: {
    paddingRight: 100,
    width: "85%",
    [theme.breakpoints.down("sm")]: {
      paddingRight: 0,
      width: "100%",
    },
  },
  avatar: {
    color: "#000",
    background: "#fff",
  },
  cancel: {
    color: "red",
  },
  image: {
    backgroundImage: "url('/images/serviceimg.jpg')",
    height: 285,
    width: "85%",
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
    // border:'1px solid green'
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
  },
  button: {
    width: "25%",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      width: "50%",
      margin: "0 auto",
    },
  },
}));

function EditServices() {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [openDialog, setOpenDialog] = useState();
  const [positiveDialog, setPositiveDialog] = useState(true);
  const [bussinessName, setBussinessName] = useState("Caleb Sommelier's & Co.");
  const [editBussinessName, setEditBussinessName] = useState(false);
  const [
    description,
    setDescription,
  ] = useState(`Lorem ipsum dolor sit, amet consectetur adipisicing elit.
   Nam architecto ducimus tempora optio suscipit aut voluptatem et, unde asperiores ad nobis. Corporis, sequi
    eius unde ducimus tenetur similique eos aspernatur?`);
  const [editDescription, setEditDescription] = useState(false);

  const handleSave = () => {
    setOpen(true),
      setTimeout(() => {
        setOpen(false);
        setOpenDialog(true);
        setDialogTitle("Your service has been updated successfully!");
        setDialogMessage("You can manage your services from your dashboard");
      }, 1000);
  };
  const handleEditorChange = (e) => {
    setDescription(e.target.getContent())
    console.log(
      'Content was updated:',
      e.target.getContent(),
    );
  }

  const classes = useStyles();

  return (
    <div>
      <HostandVendorDashBoard>
        <Zoom in={true}>
          <Grid container spacing={3} className={classes.root}>
           somethin else
          </Grid>
        </Zoom>
      </HostandVendorDashBoard>
    </div>
  );
}

export default EditServices