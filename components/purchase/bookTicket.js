import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { ButtonWithBackdrop } from "../../common";
import Purchasing from "./purchasing";
import Spinner from "../../common/Backdrop";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  text: {
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 50,
    color: "#2B2B2B",
  },
  buy: {
    font: "normal normal 600 26px/30px Work Sans",
    color: "#2B2B2B",
    textAlign: "center",
  },
  date: {
    font: "normal normal 600 17px/20px Work Sans",
    color: "#2B2B2B",
  },
  content: {
    //border: "1px solid black",
  },
  types: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  typecontent: {
    height: 200,
    width: 200,
    border: "1px solid #707070",
    color: "#707070",
    borderRadius: 7,
  },
  image: {
    backgroundImage: "url('/images/purchase.png')",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: 100,
  },
  order: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  container:{
    '& .MuiDialog-container':{
      background:'#848589',
  },
  '& .MuiDialog-paperFullScreen':{
      width:'40%',
      height:450
  }
  },
  button: {
    margin: "0px auto",
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function BookTicketDialog() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openPurchaseForm, setOpenPurchaseForm] = useState(false);
  const [progress, setProgress] = useState(false);
  const [ticketCategory, setTicketCategory] = useState("Individual");
  const [scroll, setScroll] = useState("paper");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handlePurchasingClose = () => {
    setOpenPurchaseForm(false);
  };

  const handlePurchasingClickOpen = () => {
    setOpenPurchaseForm(true);
    //setScroll(scrollType);
  };
  const handleStartOrdering = () => {
    setProgress(true);
    setTimeout(() => {
      setProgress(false);
      handlePurchasingClickOpen();
    }, 1000);
  };

  const descriptionElementRef = React.useRef(null);
  useEffect(() => {
    if (openPurchaseForm) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openPurchaseForm]);

  return (
    <div>
      <Spinner loading={progress}/>
      <Button
        variant="outlined"
        color="primary"
        style={{ textTransform: "lowerCase" }}
        onClick={handleStartOrdering}
      >
        Book Ticket
      </Button>
     <div >
     <Dialog
     className={classes.container}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <div className={classes.text}>
            The pathfinder is a mastery of breakthrough
          </div>
        </DialogTitle>
        <span className={clsx(classes.text, classes.date)}>
          fRI, NOV 22, 2020 8:00AM-12:00PM CET
        </span>
        <DialogContent dividers>
          <div className={classes.content}>
            <p className={classes.buy}>I want to buy tickets...</p>
            <div className={classes.types}>
              <div className={classes.typecontent}>
                <div className={classes.image}></div>
                <div className={classes.order}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="selectCategory"
                      name="selectCategory"
                      value={ticketCategory}
                      onChange={(e) => setTicketCategory(e.target.value)}
                    >
                      <FormControlLabel
                        value="Individual"
                        control={<Radio color="primary" />}
                        label="As an Individual"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
              <div className={classes.typecontent}>
                <div className={classes.image}></div>
                <div className={classes.order}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="selectGroup"
                      name="selectGroup"
                      value={ticketCategory}
                      onChange={(e) => setTicketCategory(e.target.value)}
                    >
                      <FormControlLabel
                        value="Group"
                        control={<Radio color="primary" />}
                        label="As a group"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <div className={classes.button}>
            <ButtonWithBackdrop
              label="get a ticket"
              click={handleStartOrdering}
              open={progress}
            />
          </div>
        </DialogActions>
      </Dialog>
     </div>
      <Purchasing
        open={openPurchaseForm}
        scroll={scroll}
        handleClose={handlePurchasingClose}
        descriptionElementRef={descriptionElementRef}
      />
    </div>
  );
}
