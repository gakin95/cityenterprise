import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { connect } from "react-redux";
import { PaystackButton } from "react-paystack";
import TextField from "@material-ui/core/TextField";

import { ButtonWithBackdrop, MyDialog } from "../../../common";
import { AddPhoto, Contact } from "../../../common";
import { createServices, getAllServiceCategories } from "../../../src/services/vendorServices";
import * as actions from "../../../src/store/actions";
import styles from "../../../components/payment/payment.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  image: {
    backgroundImage: "url('/images/Anna2.jpg')",
    backgroundSize: "cover",
    width: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  line: {
    border: "1px solid #f1f1f1",
    width: "40em",
    marginTop: 10,
    marginBottom: 15,
  },
  textField: {
    width: "25ch",
  },
  select: {
    marginLeft: 10,
  },
  description: {
    width: "100%",
    height: "5em",
    borderRadius: 5,
  },
  title: {
    margin: 0,
    marginLeft: 20,
  },
  review: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  line2: {
    border: "1px solid #f1f1f1",
    width: "100%",
    marginTop: 30,
    marginBottom: 15,
  },
  contact: {
    backgroundColor: "orangeRed",
    color: "white",
    textAlign: "center",
    margin: "auto 100px",
    borderRadius: 5,
  },
  error: {
    color: theme.palette.error.main,
  },
  des:{
    height:120,
    marginTop:20,
    width:'100%',
    borderRadius:7,
    [theme.breakpoints.down('xs')]:{
      display:'none',
    },

  },
  photo:{
    height:'18rem',
    marginTop:10,
    width:'100%',
    borderRadius:7,
    [theme.breakpoints.down('xs')]:{
      display:'none',
    },
  },
  des1:{
    height:150,
    marginTop:20,
    width:'100%',
    borderRadius:7,
    [theme.breakpoints.down('xs')]:{
      display:'none',
    },
  },
}));

const CreateServices = ({currentUser}) => {
  const [page, setPage] = useState('form');
  const [access, setAccess] = useState("");
  const [lisetedCategories, setListedCategories] = useState([]);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [error, setError] = useState("");
  let [dialogTitle, setDialogTitle] = useState("");
  let [dialogMessage, setDialogMessage] = useState("");
  let [openDialog, setOpenDialog] = useState();
  let [positiveDialog, setPositiveDialog] = useState(true);
  const [category, setCategory] = useState("Select category");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState('');
  const [uploadImage, setUploadImage] = useState([]);
  const [show, setShow] = useState(false);
  const matches = useMediaQuery("(max-width:600px)");

  const publicKey = "pk_test_39c4daf19eaeed726f87da70e2daef48e8717207";
  const amount = 150000; // Remember, set in kobo!
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: (res) => {
      console.log("res", res);
      if (res.status === "success") {
        console.log(res);
        handleSubmit()
      }
    },
    onClose: () => alert("Wait! Don't leave :("),
  };

  useEffect(() => {
   getServices();
   if (currentUser && currentUser.id) {
    setName(`${currentUser.firstName}${currentUser.lastName}`);
    setPhone(currentUser.phone);
    setEmail(currentUser.email);
  }
  }, []);
  
  const getServices = async () => {
    const token = localStorage.getItem("token");
    const response = await getAllServiceCategories(token);
    console.log('lodddsdfsfd..')
      if (response && response.data) {
        setListedCategories(response.data);
      }
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const [experience, setExperience] = useState("choose Experience");
  const handleExperienceChange = (e) => {
    setExperience(e.target.value);
  };
  const [fee, setFee] = useState("Select a fee type");
  const handleFeeChange = (e) => {
    setFee(e.target.value);
  };
  const handleAddImageClick = (event) => {
    event.stopPropagation();
    let fileInput = event.target.getElementsByTagName("input")[0];
    fileInput.click();
  };
  const validateService = () => {
    if (category === "Select category") {
      setError("select a valid category");
      return;
    }
    if (description === "") {
      setError("Provide description");
      return;
    }
    if (experience === "choose Experience") {
      setError("select a valid experience level");
      return;
    }
    if (uploadImage === null) {
      setError("You must upload an image");
      return;
    }
    if (fee === "Select a fee type") {
      setError("Select a fee category that best fits your service");
      return;
    }
    if (fee === "paid" && price === ''||fee === "paid" && price === 0) {
      setError("Enter a valid fee");
      return;
    }
    return true;
  };
  const makePayment = () => {
    if (validateService()){
      setOpenBackdrop(true);
      setTimeout(() => {
        setOpenBackdrop(false);
        setPage('payment')
      },1000)
    }
  };
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (validateService()) {
      setError("");
      setOpenBackdrop(true);
      const outcome = await createServices(
        token,
        category,
        description,
        experience,
        uploadImage,
        price,
      );
      if (outcome && outcome.status) {
        setOpenBackdrop(outcome.isLoading);
        setOpenDialog(true);
        setDialogTitle(outcome.status);
        setDialogMessage(outcome.message);
        setPositiveDialog(outcome.status === "success" ? true : false);
        if (outcome.status === "success"){
          setTimeout(() => {
            setOpenDialog(false);
        setDialogTitle("");
        setDialogMessage(""); 
        window.location = '/listServices'
        // setCategory("Select category");
        // setDescription("");
        // setUploadImage([]);
        // setShow(false);
          },2000)
        }
      }
    }
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MyDialog
        title={dialogTitle}
        openDialog={openDialog}
        positiveDialog={positiveDialog}
        onClose={() => setOpenDialog(false)}
      >
        {dialogMessage}
      </MyDialog>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          {error && (
            <Grid item className={classes.error}>
              <p>{error}</p>
            </Grid>
          )}
         { page === 'form' && <>
          <Grid item>
            <h4 className={classes.title}>Category</h4>
            <p className={classes.title}>Select the category of service</p>
            <FormControl fullWidth className={classes.paper}>
              <Select
                labelId="category"
                id="category"
                variant="outlined"
                placeholder="select category(e.g stationery design)"
                value={category}
                onChange={handleCategoryChange}
                fullWidth
              >
                <MenuItem value="Select category" onClick={getServices}>Select Category</MenuItem>
                {lisetedCategories.map((category) => (
                    <MenuItem value={category.id}>{category.name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth className={classes.paper}>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                fullWidth
                rows={4}
                placeholder="Give a Brief description of your service"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item>
            <h4 className={classes.title}>Experience Level</h4>
            {/* <p className={classes.title}>
              Tell us your level of experience as a vendor
            </p> */}
            <FormControl fullWidth className={classes.paper}>
              <Select
                labelId="experience-level"
                id="level"
                variant="outlined"
                placeholder=""
                value={experience}
                onChange={handleExperienceChange}
                fullWidth
              >
                <MenuItem value="choose Experience">
                  Choose your experience level
                </MenuItem>
                <MenuItem value="beginner">Beginner</MenuItem>
                <MenuItem value="intermediate">Intermediate</MenuItem>
                <MenuItem value="expert">Expert</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <AddPhoto
              //image="/images/upload.png"
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
          </Grid>
          <Grid item>
            <h4 className={classes.title}>Fees</h4>
            <p className={classes.title}>
              Select a fee category that best fits your service
            </p>
            <FormControl fullWidth className={classes.paper}>
              <Select
                labelId="fee"
                id="fee"
                variant="outlined"
                placeholder=""
                value={fee}
                onChange={handleFeeChange}
                fullWidth
              >
                <MenuItem value="Select a fee type">Select a fee type</MenuItem>
                <MenuItem value="free" onClick={() => {
                  setShow(false);
                  setPrice(0)
                }}>
                  Free
                </MenuItem>
                <MenuItem value="paid" onClick={() => setShow(true)}>
                  Paid
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          </>}
          {page === 'payment' && <div className={styles.App}>
          <div className={styles.container}>
            <div className={styles.item}>
              <div className={styles.overlayEffect}></div>
              <img
                className={styles.itemImage}
                src="https://cdn.bcdtravel.com/move-uk/wp-content/uploads/sites/210/credit-card-debit-card.jpg"
                alt="product"
              />
              <div className={styles.itemDetails}>
                <p className={styles.itemDetailsTitle}>Service Charge</p>
                <p className={styles.itemDetailsAmount}>NGN{amount / 100}</p>
              </div>
            </div>
            <div className={styles.checkout}>
              <div className={styles.checkoutForm}>
                <div className={styles.checkoutField}>
                  <label className={styles.checkoutFieldLabel}>Name</label>
                  <input
                    className={styles.checkoutFieldInput}
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className={styles.checkoutField}>
                  <label className={styles.checkoutFieldLabel}>Email</label>
                  <input
                    className={styles.checkoutFieldInput}
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={styles.checkoutField}>
                  <label className={styles.checkoutFieldLabel}>Phone</label>
                  <input
                    className={styles.checkoutFieldInput}
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <PaystackButton
                  className={styles.paystackButton}
                  {...componentProps}
                />
              </div>
            </div>
          </div>
        </div>}
          {(show && page === 'form') && (
            <Grid item>
              <FormControl fullWidth className={classes.paper}>
                <TextField
                  id="outlined-multiline-static"
                  type="number"
                  label="price"
                  multiline
                  fullWidth
                  value={price}
                  placeholder="Enter the price you will charge per service rendered"
                  variant="outlined"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </FormControl>
            </Grid>
          )}
        </Grid>
        {!matches && <Grid item xs={12} sm={6} className={classes.image}></Grid>}
        <Grid item xs={12} className={classes.review}>
          {fee === 'free' && <div>
            <ButtonWithBackdrop
              label="Submit for Review"
              click={handleSubmit}
              open={openBackdrop}
            />
          </div>}
          {(fee === 'paid' && page === 'form') && <div>
            <ButtonWithBackdrop
              label="Continue"
              click={makePayment}
              open={openBackdrop}
            />
          </div>}
        </Grid>
        <Grid item xs={12}>
          <Contact />
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.userId ? state.auth.userId : [],
  };
};

export default connect(mapStateToProps)(CreateServices)