import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Container,
  Grid,
  FormControl,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  Divider,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { MyCustomButton } from "../../common";
import {baseUrl} from '../../constants';
import { connect } from "react-redux";
import * as actions from "../../src/store/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDialog-container": {
      background: "#312E41",
    },
    "& .MuiDialog-paperFullScreen": {
      width: "80%",
    },
  },
  apply: {
    color: theme.palette.primary.dark,
    cursor: "pointer",
    fontSize: 14,
  },
  image: {
    width: "100%",
    height: 200,
  },
  promocode: {
    width: "100%",
    marginBottom: 20,
  },
  ticketDetails: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  level: {
    font: "normal normal 600 22px/25px Work Sans",
  },
  access: {
    font: "normal normal normal 14px/21px Work Sans",
    marginTop: 10,
    marginBottom: 10,
  },
  number: {
    display: "flex",
    alignItems: "center",
    height: 40,
    padding: "20px 5px",
    justifyContent: "space-around",
    border: "1px solid grey",
  },
  pointer: {
    cursor: "pointer",
  },
  calculate: {
    display: "flex",
    alignItems: "center",
    height: 40,
    padding: "20px 5px",
    justifyContent: "space-between",
  },
  total: {
    display: "flex",
    alignItems: "center",
    height: 40,
    padding: "20px 5px",
    justifyContent: "space-between",
  },
  checkout: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '32ch',
      [theme.breakpoints.down('md')]:{
        width: '21ch',
      },
      [theme.breakpoints.down('sm')]:{
        width: '21ch',
      },
      [theme.breakpoints.down('xs')]:{
        width: '22ch',
      }
    },
    '& .MuiInputLabel-formControl':{
        fontSize:14
    }
},
shift:{
    '& > *': {
        margin: theme.spacing(1),
}
},
cancel:{
    background:'white',
    border:'1px solid' + theme.palette.primary.main,
    color:theme.palette.primary.main,
    '&:hover':{
        border:'1px solid #fff',
        color:'#fff'
    }
}
}));

const Purchasing = ({ticketDetails, ...props})  => {
  const [page, setPage] = useState("enter Orders");
  const [tickets, setTickets] = useState([]);
  const [image, setImage] = useState('');
  const [applyPromocode, setApplyPromoCode] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [regular, setRegular] = useState(0);
  const [viewRegular] = useState(5000);
  const [viewVip] = useState(10000);
  const [viewVvip] = useState(800000);
  const [vip, setVip] = useState(0);
  const [vvip, setVvip] = useState(0);
  const total = viewVvip * vvip + viewVip * vip + viewRegular * regular;
  const [proceed, setProceed] = useState(false);
  const [goback, setGoBack] = useState(false)
  console.log('ticket===',tickets)
  useEffect(() => {
    if (ticketDetails && ticketDetails.EventTickets){
      setTickets(ticketDetails.EventTickets);
      setImage(ticketDetails.event_banner)
    }
  },[props.open])
  const increaseRegular = () => {
    setRegular(regular + 1);
  };
  const reduceRegular = () => {
    if (regular >= 1) {
      setRegular(regular - 1);
    }
  };

  const increaseVip = () => {
    setVip(vip + 1);
  };
  const reduceVip = () => {
    if (vip >= 1) {
      setVip(vip - 1);
    }
  };

  const increaseVvip = () => {
    setVvip(vvip + 1);
  };
  const reduceVvip = () => {
    if (vvip >= 1) {
      setVvip(vvip - 1);
    }
  };

  const handleProceed = () => {
    setProceed(true);
    setTimeout(() => {
      setProceed(false);
      setPage("make payment");
    }, 1000);
  };

  const goBack = () => {
    setGoBack(true);
    setTimeout(() => {
      setGoBack(false);
      setPage("enter Orders");
    }, 1000);
  };
  const classes = useStyles();
  return (
    <div>
      <Dialog
        fullScreen={true}
        className={classes.root}
        open={props.open}
        onClose={props.handleClose}
        scroll={props.scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{page === "make payment"?'Make payment':'Start purchasing'}</DialogTitle>
        <DialogContent dividers={props.scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={props.descriptionElementRef}
            tabIndex={-1}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={8}>
                {page === "enter Orders" && (
                  <Container>
                    <div
                      onClick={() => setApplyPromoCode(!applyPromocode)}
                      className={classes.apply}
                    >
                      Apply promo code
                    </div>
                    {applyPromocode && (
                      <FormControl
                        variant="outlined"
                        className={classes.promocode}
                      >
                        <OutlinedInput
                          id="outlined-adornment-weight"
                          fullWidth
                          placeholder="enter promo code"
                          endAdornment={
                            <InputAdornment position="end">
                              Apply
                            </InputAdornment>
                          }
                          aria-describedby="outlined-weight-helper-text"
                          inputProps={{
                            "aria-label": "weight",
                          }}
                          labelWidth={0}
                        />
                        {invalid && (
                          <FormHelperText id="outlined-weight-helper-text">
                            Sorry, that code is invalid
                          </FormHelperText>
                        )}
                      </FormControl>
                    )}
                    {tickets.map(ticket => <div key={ticket.id}>
                      <div className={classes.ticketDetails}>
                    <p className={classes.level}>{ticket.type_of_ticket}</p>
                        <div className={classes.number}>
                          <RemoveIcon
                            className={classes.pointer}
                            onClick={reduceRegular}
                          />
                          <p>{regular}</p>
                          <AddIcon
                            className={classes.pointer}
                            onClick={increaseRegular}
                          />
                        </div>
                      </div>
                      <div className={classes.level}>₦{ticket.amount}</div>
                      <div className={classes.access}>
                        Available slots : <b>{ticket.available_slots}</b>
                      </div>
                      <div className={classes.access}>
                       {ticket.description}
                      </div>
                      <Divider />
                    </div>)}
                    {/* <div>
                      <div className={classes.ticketDetails}>
                        <p className={classes.level}>Level 1: Regular</p>
                        <div className={classes.number}>
                          <RemoveIcon
                            className={classes.pointer}
                            onClick={reduceRegular}
                          />
                          <p>{regular}</p>
                          <AddIcon
                            className={classes.pointer}
                            onClick={increaseRegular}
                          />
                        </div>
                      </div>
                      <div className={classes.level}>₦{viewRegular}</div>
                      <div className={classes.access}>
                        Sales end on Dec 22, 2020
                      </div>
                      <div className={classes.access}>
                        Full access to the live event + access to rewatch for 24
                        hours.
                      </div>
                    </div>
                    <Divider />
                    <div>
                      <div className={classes.ticketDetails}>
                        <p className={classes.level}>Level 2: VIP</p>
                        <div className={classes.number}>
                          <RemoveIcon
                            className={classes.pointer}
                            onClick={reduceVip}
                          />
                          <p>{vip}</p>
                          <AddIcon
                            className={classes.pointer}
                            onClick={increaseVip}
                          />
                        </div>
                      </div>
                      <div className={classes.level}>₦{viewVip}</div>
                      <div className={classes.access}>
                        Sales end on Dec 22, 2020
                      </div>
                      <div className={classes.access}>
                        Full access to the live event + access to rewatch for 3
                        days post conference. You will also receive PDF digital
                        summaries from all the speakers and a code foor 15 days
                        off the Dr. Jordan reconnect shop
                      </div>
                    </div>
                    <Divider />
                    <div>
                      <div className={classes.ticketDetails}>
                        <p className={classes.level}>Level 3: VVIP</p>
                        <div className={classes.number}>
                          <RemoveIcon
                            className={classes.pointer}
                            onClick={reduceVvip}
                          />
                          <p>{vvip}</p>
                          <AddIcon
                            className={classes.pointer}
                            onClick={increaseVvip}
                          />
                        </div>
                      </div>
                      <div className={classes.level}>₦{viewVvip}</div>
                      <div className={classes.access}>
                        Sales end on Dec 22, 2020
                      </div>
                      <div className={classes.access}>
                        Full access to the live event + access to rewatch for 3
                        days post conference. You will also receive PDF digital
                        summaries from all the speakers and a code foor 15 days
                        off the Dr. Jordan reconnect shop
                      </div>
                    </div>
                    <Divider /> */}
                  </Container>
                )}
                {page === "make payment" && (
                  <Container>
                    <h4>Contact information</h4>
                    <form
                      className={classes.form}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="outlined-basic"
                        label="Full Name"
                        variant="outlined"
                      />
                      <TextField
                        id="outlined-basic"
                        label="Phone number"
                        variant="outlined"
                      />
                      <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                      />
                      <TextField
                        id="outlined-basic"
                        label="Confirm Email"
                        variant="outlined"
                      />
                    </form>
                  </Container>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <img
                  src={baseUrl + image}
                  alt="event_name"
                  className={classes.image}
                />
                <div>
                  <h5>Order summary</h5>
                  {regular > 0 && (
                    <div className={classes.calculate}>
                      <h6>{regular} x level 1: Regular</h6>
                      <h6>₦{viewRegular * regular}</h6>
                    </div>
                  )}
                  {vip > 0 && (
                    <div className={classes.calculate}>
                      <h6>{vip} x level 2: vip</h6>
                      <h6>₦{viewVip * vip}</h6>
                    </div>
                  )}
                  {vvip > 0 && (
                    <div className={classes.calculate}>
                      <h6>{vvip} x level 3: vvip</h6>
                      <h6>₦{viewVvip * vvip}</h6>
                    </div>
                  )}
                  {(regular > 0 || vip > 0 || vvip > 0) && (
                    <div>
                      <Divider />
                      <div className={classes.total}>
                        <h3>Total</h3>
                        <h3>₦{total}</h3>
                      </div>
                    </div>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} md={12} className={classes.checkout}>
                {page === "enter Orders" && (
                  <MyCustomButton
                    disabled={total > 0 ? false : true}
                    onClick={handleProceed}
                    changeClass={true}
                    progress={proceed}
                  >
                    Checkout
                  </MyCustomButton>
                )}
                {page === "make payment" && (
                  <div className={classes.shift}>
                      <MyCustomButton
                    onClick={handleProceed}
                    changeClass={true}
                    progress={proceed}
                  >
                    Place Order
                  </MyCustomButton>
                  <MyCustomButton
                    onClick={goBack}
                    changeClass={true}
                    className={classes.cancel}
                    progress={goback}
                  >
                    Back
                  </MyCustomButton>
                  </div>
                )}
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
   ticketDetails:state.ticketDetails?state.ticketDetails.details:[]
  };
};

export default connect(mapStateToProps)(Purchasing)