import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Slide from "@material-ui/core/Slide";
import { Button, TextField } from "@material-ui/core";
import MyButton from "./Button";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    //border: '2px solid #000',
    maxWidth: 500,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 7,
  },
  bgimg: {
    width: 118,
    height: 92,
    //backgroundImage:props => `url(${props.image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  modalContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  success: {
    color: "green",
  },
  error: {
    color: "red",
  },
  message: {
    font: "normal normal normal 16px/19px Work Sans",
    textAlign: "center",
  },
  button: {
    width: 50,
    marginLeft: 10,
  },
  space:{
    marginBottom:10
  }
}));

export const MyDialog = (props) => {
  const classes = useStyles(props);
  const handleClose = () => {
    props.onClose();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.openDialog}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide in={props.openDialog}>
          <div className={classes.paper}>
            <div className={classes.bgimg}>
                <img src={props.image} />
            </div>
            <div className={clsx(classes.modalContent, classes.success)}>
              <h3 id="transition-modal-title">{props.title}</h3>
              <div>
                <MyButton className={classes.button} onClick={handleClose}>
                  No
                </MyButton>
                <MyButton
                  progress={props.progress}
                  className={classes.button}
                  onClick={props.onClick}
                >
                  {!props.progress && "Yes"}
                </MyButton>
              </div>
            </div>
          </div>
        </Slide>
      </Modal>
    </div>
  );
}
 
export const  ReasonForDisapproval = (props) => {
  const classes = useStyles(props);
  const handleClose = () => {
    props.onClose();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.openDialog}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide in={props.openDialog}>
          <div className={classes.paper}>
            <div className={classes.bgimg}>
                <img src={props.image} />
            </div>
            <div className={clsx(classes.modalContent, classes.success)}>
              <h3 id="transition-modal-title">{props.title}</h3>
              <div className={classes.space}>
                <TextField
                id='reason'
                 type='text'
                 name='reason'
                 multiline
                 rows={4}
                 variant="outlined"
                 label='reason for disapproval'
                 value={props.value}
                 onChange={props.onChange}
                 />
              </div>
              <div>
                <MyButton className={classes.button} onClick={handleClose}>
                  back
                </MyButton>
                <MyButton
                  progress={props.progress}
                  className={classes.button}
                  onClick={props.onClick}
                >
                  {!props.progress && "Submit"}
                </MyButton>
              </div>
            </div>
          </div>
        </Slide>
      </Modal>
    </div>
  );
}
