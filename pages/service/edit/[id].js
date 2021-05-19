import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Avatar } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import { Editor } from "@tinymce/tinymce-react";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import { useRouter } from "next/router";
import { ButtonWithBackdrop, MyDialog, Backdrop } from "../../../common";
import { baseUrl } from "../../../constants";
import HostandVendorDashBoard from "../../../components/dashboards/eventHostAndVendor/dashboard";
import {
  getSingleServiceDetails,
  updateService,
} from "../../../src/services/vendorServices";

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
    //backgroundImage: "url('/images/serviceimg.jpg')",
    height: 285,
    width: "50%",
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
  const router = useRouter();
  const { id } = router.query;
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [openDialog, setOpenDialog] = useState();
  const [positiveDialog, setPositiveDialog] = useState(true);
  const [category, setCategory] = useState("");
  const [editCategory, setEditCategory] = useState(false);
  const [experienceLevel, setExperienceLevel] = useState("");
  const [image, setImage] = useState(null);
  const [fees, setFees] = useState("");
  const [access, setAcess] = useState(null);
  const [details, setDetails] = useState(null);
  const [description, setDescription] = useState("");
  const [editDescription, setEditDescription] = useState(false);

  const handleSave = async () => {
    setOpen(true);
    const outcome = await updateService(
      access,
      id,
      category,
      description,
      experienceLevel,
      fees,
      image
    );
    console.log("here", outcome);
    if (outcome) {
      setOpen(outcome.isLoading);
      setOpenDialog(true);
      setDialogTitle(outcome.status);
      setDialogMessage(outcome.message);
      setPositiveDialog(outcome.status === "Bad request" ? false : true);
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
        const outcome = await getSingleServiceDetails(token, id);
        setAcess(token);
        if (outcome.data) {
          setDetails(outcome.data);
          setDescription(outcome.data.description);
          setCategory(outcome.data.category);
          setExperienceLevel(outcome.data.experience_level);
          setImage(outcome.data.banner_image);
          setFees(outcome.data.price);
        }
      })();
    }
  }, [router]);

  const classes = useStyles();

  let render = <Backdrop loading={!(details && details.id)}/>;
  if (details && details.id) {
    render = (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <p className={classes.name}>Category</p>
          <div className={classes.edit}>
            {!editCategory && <div>{category}</div>}
            {editCategory && (
              <TextField
                id="standard-basic"
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            )}
            {!editCategory && (
              <Avatar
                className={classes.avatar}
                onClick={() => setEditCategory(!editCategory)}
              >
                <EditIcon />
              </Avatar>
            )}
            {editCategory && (
              <Avatar
                className={classes.avatar}
                onClick={() => setEditCategory(!editCategory)}
              >
                <CancelIcon className={classes.cancel} />
              </Avatar>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <p className={classes.name}>Experience Level</p>
          <div className={classes.edit}>
            <div>{experienceLevel}</div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <p className={classes.name}>Description</p>
          <div className={classes.description}>
            <div className={classes.editdesc}>
              {!editDescription && <div>{description}</div>}
              {editDescription && (
                <Editor
                  initialValue={`<p>${description}</p>`}
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
                  onChange={handleEditorChange}
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
          <p className={classes.name}>Image</p>
          <div
            className={classes.image}
            style={{ backgroundImage: `url(${baseUrl}${image})` }}
          ></div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <p className={classes.name}>Fees</p>
          <div className={classes.edit}>
            <div>{fees}</div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <p className={classes.name}>Flat Project rate</p>
          <div className={classes.edit}>
            <div>No data</div>
          </div>
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
    );
  }

  return (
    <div>
      <HostandVendorDashBoard>
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
            {render}
          </Grid>
        </Zoom>
      </HostandVendorDashBoard>
    </div>
  );
}

export default EditServices;
