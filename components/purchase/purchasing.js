import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from 'next/router'
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
import Moment from "react-moment";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DateRangeIcon from "@material-ui/icons/DateRange";
import { PaystackButton } from "react-paystack";

import {
  isValidEmail,
  isValidFirstName,
  isValidLastName,
  isValidPhoneNumber,
} from '../../src/helpers/validator';
import { MyCustomButton } from "../../common";
import {baseUrl} from '../../constants';
import { connect } from "react-redux";
import * as actions from "../../src/store/actions";
import { buyTickets, verifyCoupon } from "../../src/services/ticket";
import Spinner from "../../common/Backdrop";
import CustomizedSnackbars from "../../components/createEvents/action/sticker";
import styles from "../../components/payment/payment.module.css";

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
  applytoken: {
    cursor: "pointer",
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
    fontSize:14,
    //fontFamily: 'Permanent Marker,cursive',
    height: 40,
    padding: "20px 5px",
    justifyContent: "space-between",
  },
  checkout: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  check:{
    display:'flex',
    alignItems:'center',
  },
  time: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      margin: "0 auto",
    },
  },
  space:{
    marginLeft:12
  },
  going:{
    fontSize:'.875rem'
  },
  title:{
    //fontSize:'1.75rem',
    lineHeight: '2.25rem',
    marginTop:2,
    fontWeight: 700
  },
  dFlex:{
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    [theme.breakpoints.down('sm')]:{
      flexDirection:'column',
      justifyContent:'flex-start',
      alignItems:'flex-start',
    }
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

const Purchasing = ({ticketDetails,currentUser,downloadTicket,onPrint, ...props})  => {
  const router = useRouter();
  const id = router.query.eventid;
  const [page, setPage] = useState("enter Orders");
  const [err, setErr] = useState('');
  const [msg, setMsg] = useState('');
  const [backdrop, setBackDrop] = useState(false);
  const [code, setCode] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [tickets, setTickets] = useState([]);
  const [image, setImage] = useState('');
  const [type_of_event, setTypeOfEvent] = useState('');
  const [applyPromocode, setApplyPromoCode] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [regular, setRegular] = useState(0);
  const [viewRegular] = useState(5000);
  const [viewVip] = useState(10000);
  const [viewVvip] = useState(800000);
  const [vip, setVip] = useState(0);
  const [vvip, setVvip] = useState(0);
  const [cartTotal, setCartTotal] = useState({
      cartSubTotal : 0,
      discount : 0,
      Total : 0
  });
  const total = viewVvip * vvip + viewVip * vip + viewRegular * regular;
  const [proceed, setProceed] = useState(false);
  const [goback, setGoBack] = useState(false);
  const [allow, setAllow] = useState(true);
  const [error, setError] = useState('');
  const [openMessage, setOpenMessage] = useState(false);
  const [data, setData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    amount_paid:null,
    no_of_tickets_bought:0,
    eventId:null,
    payment_method:'payStack',
    discountCoupon:null,
    tickets:[]
  });
  const [percentage, setPercentage] = useState(0);
  const [confirmEmail, setConfirmEmail] = useState('');
  const [printOut, setPrintOut] = useState({});
  console.log("type_of_event",type_of_event)
  console.log('ticket printOut===',id,percentage, printOut, data);

  const publicKey = "pk_test_39c4daf19eaeed726f87da70e2daef48e8717207";
  
  const componentProps = {
    email: data.email,
    amount: cartTotal.Total * 100, // convert to kobo
    metadata: {
      name : `${data.firstName} ${data.firstName}`,
      phone: data.phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: (res) => {
      console.log("res", res);
      if (res.status === "success") {
        console.log(res);
        handleSumit()
      }
    },
    onClose: () => alert("Wait! Don't leave :("),
  };

  useEffect(() => {
    if (ticketDetails && ticketDetails.EventTickets){
      setTypeOfEvent(ticketDetails.type_of_event);
      setTickets(
        ticketDetails.EventTickets.map((item) => {
          return {
            id: item.id,
            count: 0,
            total:0,
            inCart:true,
            amount: item.amount,
            available_slots: item.available_slots - item.no_sold,
            description: item.description,
            type_of_ticket: item.type_of_ticket,
            eventId: item.eventId,
            no_sold: item.no_sold
          }
        })
      );
      setImage(ticketDetails.event_banner);
    }
    if (currentUser && currentUser.id){
      setData({
        ...data,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        phone: currentUser.phone,
      })
    }
  },[props.open])
  console.log('totallll',cartTotal);

  const percentageDiscount = async () => {
    setBackDrop(true);
    const response = await verifyCoupon({ eventId:id, coupon:code });
    console.log('discount...', response);
    if (response && response.data){
      setBackDrop(false);
      setCouponMessage(response.status === 'success'?`${response.data.percentage_discount}% off`:response.message);
      if (response.status === 'success'){
        setData({...data, discountCoupon:response.data.coupon});
        setPercentage(response.data.percentage_discount)
      }else{
        setData({...data, discountCoupon:null});
        setPercentage(0)
      }
    }
  };

  const handleExit = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenMessage(false);
  };


  const increment = (id) => {
    const tempCart = [...tickets];
    const selectedProduct = tempCart.find(item=>item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    console.log('this is the temp cart',product);
    if (type_of_event === 'free'){
      if (product.count>0){
        return
      }
    }
    if (product.available_slots<1) {
      return
    }else {
      product.count = product.count + 1;
      product.available_slots = product.available_slots - 1;
      product.total = product.count * product.amount;
      setTickets(() => [...tempCart]);
    }
    addTotals()
  };

  const decrement = (id) => {
    const tempCart = [...tickets];
    const selectedProduct = tempCart.find(item=>item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    console.log('this is the temp cart',product);
    if(product.count <= 0){
      product.count = 0
      //removeItem(id)
    }else{
      product.count = product.count - 1;
      product.total = product.count * product.amount;
      product.available_slots = product.available_slots + 1;
      setTickets(() => [...tempCart]);
    }  
    addTotals()
  };

 const  removeItem = (id) =>{
  let tempProducts = [...tickets];
  const tempCart = tempProducts.filter(item => item.id !== id);
  console.log('temcart......',tempCart)
  setTickets([...tempCart]);
  };

  const addTotals = () =>{
    let subTotal = 0;
    tickets.map(item=>(subTotal += item.total));
    const temDiscount = subTotal * (percentage / 100);
    const discount = parseFloat(temDiscount.toFixed(2));
    const total = subTotal - discount;
    setCartTotal(() => {
      return {
        cartSubTotal:subTotal,
        discount:discount,
        Total:total
      }
    })
    setData(() => ({
      ...data, amount_paid:total
    }))
  }

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
    const temp = [...tickets];
    const filteredItem = temp.filter(item => item.count>0);
    const count = temp.map(item => item.count).reduce((a, b) => a + b, 0);
    console.log('count',count);
    data.no_of_tickets_bought = count;
    data.eventId = ticketDetails.id;
    console.log('-----------filtered-----',filteredItem);
    setData({
      ...data,
      tickets:filteredItem.map(item => {
        return {
          eventTicketId:item.id,
          quantity:item.count
        }
      })
    })
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

  const validateDetails = () => {
    const {
      firstName,
      lastName,
       phone,
       email,
    } = data;
    if (!isValidFirstName(firstName.trim()) || firstName.length < 2) {
      setErr('firstName');
      setMsg("Invalid first name");
      return;
    }
    if (!isValidLastName(lastName.trim()) || lastName.length < 2) {
      setErr('lastName');
      setMsg("Invalid last name");
      return;
    }
    if (!isValidPhoneNumber(phone.trim()) || phone.length < 8) {
      setErr('phone');
      setMsg("Invalid phone number");
      return;
    }
    if (!isValidEmail(email)) {
      setErr('email');
      setMsg("Invalid email");
      return;
    }
    if (!isValidEmail(confirmEmail)) {
      setErr('Confirm Email');
      setMsg("Invalid email");
      return;
    }
    if (email !== confirmEmail) {
      setErr('Confirm Email');
      setMsg("The email provided does not match");
      return;
    }
    return true
  }

  const handleSumit = async () => {
      if (validateDetails()){
        setErr('');
        setMsg('')
        setProceed(true);
        const token = localStorage.getItem('token');
        const online = token? `Bearer: ${token}`:'';
        const response = await buyTickets(online,data);
         console.log('response..',response)
        if (response && response.data){
          setProceed(false);
          if (response.status === 'success'){
            setPrintOut(response.data),
            onPrint(response);
            setBackDrop(true);
            setTimeout(() => {
              setBackDrop(false);
              setPage('printOut')   
            },2000)
          }else{
            setError(response.message)
            setOpenMessage(true)
          }
        }
      }
  }
  const classes = useStyles();
  return (
    <div>
      <Dialog
        fullScreen={true}
        className={classes.root}
        open={props.open}
        //onClose={props.handleClose}
        scroll={props.scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        {page !== 'printOut' && <DialogTitle id="scroll-dialog-title">{page === "make payment"?type_of_event === 'free'?'Place order':'Make payment':'Start purchasing'}</DialogTitle>}
        {page === 'printOut' && <DialogTitle id="scroll-dialog-title">congrats!!</DialogTitle>}
        <DialogContent dividers={props.scroll === "paper"}>
        <Spinner loading={backdrop}/>
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
                          error={invalid}
                          placeholder="enter promo code"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          endAdornment={
                            <InputAdornment position="end" onClick={percentageDiscount} className={classes.applytoken}>
                              Apply
                            </InputAdornment>
                          }
                          aria-describedby="outlined-weight-helper-text"
                          inputProps={{
                            "aria-label": "weight",
                          }}
                          labelWidth={0}
                        />
                        {couponMessage && (
                          <FormHelperText id="outlined-weight-helper-text">
                            {couponMessage}
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
                            onClick={() => decrement(ticket.id)}
                          />
                          <p>{ticket.count}</p>
                          <AddIcon
                            className={classes.pointer}
                            onClick={() => increment(ticket.id)}
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
                        id="outlined-basic_first"
                        label="First Name"
                        variant="outlined"
                        value={data.firstName}
                        onChange={(e) => setData({...data, firstName:e.target.value})}
                        error={err === "firstName"}
                        helperText={err === "firstName" && msg}
                        autoFocus
                      />
                      <TextField
                        id="outlined-basic_last"
                        label="Last Name"
                        variant="outlined"
                        value={data.lastName}
                        onChange={(e) => setData({...data, lastName:e.target.value})}
                        error={err === "lastName"}
                        helperText={err === "lastName" && msg}
                        autoFocus
                      />
                      <TextField
                        id="outlined-basic_num"
                        label="Phone number"
                        type="tel"
                        variant="outlined"
                        value={data.phone}
                        onChange={(e) => setData({...data, phone:e.target.value})}
                        error={err === "phone"}
                        helperText={err === "phone" && msg}
                        autoFocus
                      />
                      <TextField
                        id="outlined-basic_email"
                        type="email"
                        label="Email"
                        variant="outlined"
                        value={data.email}
                        onChange={(e) => setData({...data, email:e.target.value})}
                        error={err === "email"}
                        helperText={err === "email" && msg}
                        autoFocus
                      />
                      <TextField
                        id="outlined-basic_confirm"
                        type='email'
                        label="Confirm Email"
                        variant="outlined"
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                        error={err === "Confirm Email"}
                        helperText={err === "Confirm Email" && msg}
                        autoFocus
                      />
                    </form>
                  </Container>
                )}
                {page === "printOut" && (
                  <Container>
                    {/* <h3>{downloadTicket.firstName} you've got tickets!</h3> */}
                    <div className={classes.check}>
                      <CheckCircleOutlineIcon style={{color:'green'}}/>
                      <p className={classes.space}>{printOut.firstName} you've got ticket</p>
                    </div>
                    <Divider />
                    <h4 className={classes.going}>YOU'RE GOING TO</h4>
                <h3 className={classes.title}>{ticketDetails.event_title}</h3>
                    <Divider />
                    <div className={classes.dFlex}>
                      <div>
                        <p>{data.no_of_tickets_bought} ticket sent to</p>
                        <p>{printOut.email}</p>
                      </div>
                      <div>
                        <p>Date</p>
                        <div className={classes.time}>
                <DateRangeIcon color="primary" />
                <Moment format="D MMM YYYY">
                  {ticketDetails.starting_date}
                </Moment>
              </div>
                      </div>
                    </div>
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
                  {tickets.map((item,i) =><div key={item.id}><div className={classes.calculate}>
                      <h6>{item.type_of_ticket} : {item.amount} x {item.count}</h6>
                      <h6>₦{item.total}</h6>
                    </div></div>)}
                    <div>
                      <Divider />
                      <div className={classes.total}>
                        <h3>Subtotal</h3>
                        <h3>₦{cartTotal.cartSubTotal}</h3>
                      </div>
                      <div className={classes.total}>
                        <h3>Discount</h3>
                        <del><h3>₦{cartTotal.discount}</h3></del>
                      </div>
                      <div className={classes.total}>
                        <h3>Total</h3>
                        <h3>₦{cartTotal.Total}</h3>
                      </div>
                    </div>
                </div>
              </Grid>
              <Grid item xs={12} md={12} className={classes.checkout}>
                {page === "enter Orders" && (
                  <MyCustomButton
                    disabled={type_of_event === 'free' || cartTotal.Total > 0 ? false : true}
                    onClick={handleProceed}
                    changeClass={true}
                    progress={proceed}
                  >
                    Checkout
                  </MyCustomButton>
                )}
                {page === "make payment" && (
                  <div className={classes.shift}>
                    <CustomizedSnackbars
                      message={error}
                      open={openMessage}
                      handleClose={handleExit}
                    />
                      {type_of_event === 'free' && <MyCustomButton
                    onClick={handleSumit}
                    changeClass={true}
                    progress={proceed}
                  >
                    Place Order
                  </MyCustomButton>}
                  {type_of_event === 'paid' && <PaystackButton
                  className={styles.paystack}
                  {...componentProps}
                />}
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
                {page === "printOut" && (
                  <div className={classes.shift}>
                      <MyCustomButton
                    onClick={() => router.push('/events')}
                    changeClass={true}
                    progress={proceed}
                  >
                    checkout
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

const mapDispatchToProps = (dispatch) => {
  return {
    onPrint: (details) => dispatch(actions.printTicket(details)),
  };
};

const mapStateToProps = (state) => {
  return {
   ticketDetails:state.ticketDetails?state.ticketDetails.details:[],
   currentUser : state.auth.userId?state.auth.userId:[],
   downloadTicket: state.printTicketDetails.data?state.printTicketDetails.details.data:[]
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Purchasing)