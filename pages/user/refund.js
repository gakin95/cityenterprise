import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ContainerFluid from "@material-ui/core/Container";
import { Container } from "../../components/section";
import {
  Paper,
  Grid,
  FormControl,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core/";
import Contact from "../../common/contact";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 0,
    marginTop: "6rem",
    fontSize: 14,
    //marginLeft:'2rem',
    [theme.breakpoints.down("xs")]: {
      marginTop: "6rem",
    },
  },
  formControl: {
    width: `100%  !important`,
    display: "block",
  },
  submitbtn: {
    height: 30,
    backgroundColor: theme.palette.primary.main,
    width: 100,
    border: "none",
    borderRadius: 5,
    marginBottom: 30,
    cursor: "pointer",
  },
  submitdiv: {
    margin: "2% auto",
  },
}));

function Refund() {
  const classes = useStyles();
  const [tickettype, setTicketType] = useState("Ticket Type");
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    eventname: "",
    dateofpurchase: "",
    quantity: "",
    ticketnumber: "",
    accountnumber: "",
    bankname: "",
    description: "",
  });
  const handleTicketType = (e) => {
    setTicketType(e.target.value);
  };
  return (
    <Container title="Refund" className={classes.container}>
      <ContainerFluid>
        <h3>Kindly fill in your details below.</h3>
        <p>
          Please ensure that the information supplied is the same you have on
          your ticket
        </p>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl className={classes.formControl}>
              <TextField
                id="outlined-multiline-static"
                type="text"
                label="First Name"
                fullWidth
                placeholder="Enter first name"
                variant="outlined"
                value={user.firstname}
                onChange={(e) =>
                  setUser({ ...user, firstname: e.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl className={classes.formControl}>
              <TextField
                id="outlined-multiline-static"
                type="text"
                label="Last Name"
                multiline
                fullWidth
                placeholder="Enter last name"
                variant="outlined"
                value={user.lastname}
                onChange={(e) => setUser({ ...user, lastname: e.target.value })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl className={classes.formControl}>
              <TextField
                id="outlined-multiline-static"
                type="email"
                label="Email"
                multiline
                fullWidth
                placeholder="abc@example.com"
                variant="outlined"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl className={classes.formControl}>
              <TextField
                id="outlined-multiline-static"
                type="tel"
                label="Phone Number"
                multiline
                fullWidth
                placeholder="Enter phone number"
                variant="outlined"
                value={user.phonenumber}
                onChange={(e) =>
                  setUser({ ...user, phonenumber: e.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl className={classes.formControl}>
              <TextField
                id="outlined-multiline-static"
                type="text"
                label="Event Name"
                multiline
                fullWidth
                placeholder="Enter event name"
                variant="outlined"
                value={user.eventname}
                onChange={(e) =>
                  setUser({ ...user, eventname: e.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl className={classes.formControl}>
              <TextField
                id="outlined-multiline-static"
                type="date"
                label="Date of Purchase"
                multiline
                fullWidth
                value=""
                placeholder="Enter purchase date"
                variant="outlined"
                value={user.dateofpurchase}
                onChange={(e) =>
                  setUser({ ...user, dateofpurchase: e.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth className={classes.formControl}>
              <Select
                labelId="Ticket type"
                id="tickettype"
                variant="outlined"
                placeholder=""
                fullWidth
                value={tickettype}
                onChange={(e) => setTicketType(e.target.value)}
              >
                <MenuItem value="Ticket Type">Choose your ticket type</MenuItem>
                <MenuItem value="regular">Regular</MenuItem>
                <MenuItem value="vip">VIP</MenuItem>
                <MenuItem value="vvip">VVIP</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth className={classes.formControl}>
              <TextField
                id="outlined-multiline-static"
                type="number"
                label="Quantity"
                multiline
                fullWidth
                value=""
                placeholder="Enter quantity of ticket"
                variant="outlined"
                value={user.quantity}
                onChange={(e) => setUser({ ...user, quantity: e.target.value })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth className={classes.formControl}>
              <TextField
                id="outlined-multiline-static"
                type="number"
                label="Ticket Number"
                multiline
                fullWidth
                value=""
                placeholder="Enter ticket number"
                variant="outlined"
                value={user.ticketnumber}
                onChange={(e) =>
                  setUser({ ...user, ticketnumber: e.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth className={classes.formControl}>
              <TextField
                id="outlined-multiline-static"
                type="number"
                label="Account Number"
                multiline
                fullWidth
                value=""
                placeholder="Enter account number"
                variant="outlined"
                value={user.accountnumber}
                onChange={(e) =>
                  setUser({ ...user, accountnumber: e.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth className={classes.formControl}>
              <TextField
                id="outlined-multiline-static"
                type="text"
                label="Bank Name"
                multiline
                fullWidth
                value=""
                placeholder="Enter bank name"
                variant="outlined"
                value={user.bankname}
                onChange={(e) => setUser({ ...user, bankname: e.target.value })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <FormControl fullWidth className={classes.formControl}>
              <TextField
                id="outlined-multiline-static"
                label="Briefly state reason for this request"
                multiline
                fullWidth
                rows={3}
                placeholder="state reason for this request"
                variant="outlined"
                value={user.description}
                onChange={(e) =>
                  setUser({ ...user, description: e.target.value })
                }
              />
            </FormControl>
          </Grid>
          <div className={classes.submitdiv}>
            <button className={classes.submitbtn}>Submit</button>
          </div>
        </Grid>
      </ContainerFluid>
      <Contact />
    </Container>
  );
}

export default Refund;
