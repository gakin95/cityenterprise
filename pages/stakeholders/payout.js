import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import { MyTextField, ButtonWithBackdrop, MyDialog } from "../../common";
import HostandVendorDashBoard from "../../components/dashboards/eventHostAndVendor/dashboard";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "5% 0",
    [theme.breakpoints.down("xs")]: {
      margin: "5%",
    },
  },
  root: {
    marginBottom: 40,
  },
  help: {
    width: "70%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  form: {
    width:'85%',
    [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
  },
  fill: {
    font: 'normal normal 600 16px/19px Work Sans'
  },
  inputContainer: {
    backgroundColor: "#F1F1F1",
    border: "1px solid black",
    padding: "6%",
    width:'85%',
    [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
  },
  contact: {
    backgroundColor: theme.palette.primary.main,
    height: 160,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  contactContent: {
    width: "60%",
  },
  note: {
      background:"#38B9F0 0% 0% no-repeat padding-box",
      color: "#fff",
      marginTop:20,
      marginBottom:20
  }
}));

function Payout() {
  const [open, setOpen] = React.useState(false);
  const [err, setErr] = useState('');
  let [dialogTitle, setDialogTitle] = useState("");
  let [dialogMessage, setDialogMessage] = useState("");
  let [openDialog, setOpenDialog] = useState();
  let [positiveDialog, setPositiveDialog] = useState(true);
  const handleSubmit = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      setOpenDialog(true);
      setDialogTitle("You have successfully requested for a payout");
      setDialogMessage(
        "Please check your mail for the receipt of this transaction. Thanks."
      );
    }, 1000);
  };
  const [payout, setPayout] = useState({
    amount:'',
    password:'',
    accountName:'',
    accountNumber:'',
    swiftCode:'',
    bankName:'',
    bankAccountCurrency:''
  });
  const handleChange = name => e => {
    setPayout({...payout, [name]:e.target.value})
  };
 
  const classes = useStyles();
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
          <Grid item sm={12} className={classes.form}>
            <div className={classes.formContent}>
              <p className={classes.fill}>
                Direct Payout to your account? Carefully fill the form below.
              </p>
              <div className={classes.inputContainer}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <MyTextField
                      id="Amount:"
                      type="number"
                      name="Amount:"
                      required="required"
                      label="Amount:"
                      placeholder="Enter Amount:"
                      value={payout.amount}
                      onChange={handleChange('amount')}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MyTextField
                      id="password"
                      type="password"
                      name="password"
                      required="required"
                      label="Password"
                      placeholder="Your City Event Password:"
                      value={payout.password}
                      onChange={handleChange('password')}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MyTextField
                      id="account_name"
                      type="text"
                      name="account_name"
                      required="required"
                      label="Account Name"
                      placeholder="Bank Account Holder Name"
                      value={payout.accountName}
                      onChange={handleChange('accountName')}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MyTextField
                      id="Account_Number"
                      type="number"
                      name="AccountNumber"
                      required="required"
                      label="Account Number"
                      placeholder="NUBAN / Bank Account Number"
                      value={payout.accountNumber}
                      onChange={handleChange('accountNumber')}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MyTextField
                      id="SwiftCode"
                      type="text"
                      name="SwiftCode"
                      required="required"
                      label="Swift Code"
                      placeholder="Enter Swift Code"
                      value={payout.swiftCode}
                      onChange={handleChange('swiftCode')}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MyTextField
                      id="BankName"
                      type="text"
                      name="BankName"
                      required="required"
                      label="Bank Name"
                      placeholder="Enter Bank Name"
                      value={payout.bankName}
                      onChange={handleChange('bankName')}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MyTextField
                      id="BankAccountCurrency"
                      type="text"
                      name="BankAccountCurrency"
                      required="required"
                      label="Bank Account Currency"
                      placeholder="Enter Bank Account Currency"
                      value={payout.bankAccountCurrency}
                      onChange={handleChange('bankAccountCurrency')}v
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.note}>
                    <p>
                      Note that it processing time for payout is 48 hours, after
                      which you can make a complaint if payment has not been
                      received.
                    </p>
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <ButtonWithBackdrop
                      label="Withdraw"
                      click={handleSubmit}
                      open={open}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
              <p className={classes.fill}>You can also request for your payout via any of the means below</p>
              <img src="https://i1.wp.com/consoleguard.com/wp-content/uploads/2017/04/paypal-logo.png?w=510" />
          </Grid>
        </Grid>
        </Zoom>
      </HostandVendorDashBoard>
    </div>
  );
}

export default Payout;
