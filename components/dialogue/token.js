import React from 'react';
import clsx from "clsx";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import {Button} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    //border: '2px solid #000',
    maxWidth:500,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 7
  },
  bgimg:{
    width:118,
    height:92,
    backgroundImage:"url('/images/set.jpeg')",
    backgroundSize:'cover',
    backgroundPosition:'center'
  },
  modalContent:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'column'
  },
  success:{
    color:'green',
  },
  error:{
    color:'red'
  },
  message:{
    font:'normal normal normal 16px/19px Work Sans',
    textAlign:'center'
  },
  button:{
    background:'#F06F38 0% 0% no-repeat padding-box',
    width: 187,
    height: 46,
    color:'#fff',
    marginTop:20,
    textTransform: 'none',
  },
  tokenborder:{
  display:'flex',
  justifyContent:'space-between',  
  allignItems:'center',
  width:'68%'
  },
  token:{
    border:'1px solid grey',
    padding:10,
    fontSize:12,
    margin:'auto',
  
  },
  copy:{
      backgroundColor:'transparent',
     borderColor:theme.palette.primary.main,
    cursor:'pointer',
     }
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const handleClose = () => {
    props.onClose();
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.openDialog }
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide in={props.openDialog}>
          <div className={classes.paper}>
            <div className={classes.bgimg}></div>
            <div className={clsx (classes.modalContent,props.positiveDialog?classes.success:classes.error)}>
            <h6 id="transition-modal-title">The link to your token has been generated</h6>
            <div id="transition-modal-description" className={classes.message}>{props.children}</div>
            <div className={classes.tokenborder}>
                 <p className={classes.token}>{props.coupon}</p>
                <button onClick ={props.copy} className={classes.copy}>Copy</button>
                </div>
             <Button 
             className={classes.button}
             onClick={handleClose}
             >continue</Button>
             </div>
          </div>
        </Slide>
      </Modal>
    </>
  );
}

