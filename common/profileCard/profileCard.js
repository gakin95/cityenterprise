import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import { baseUrl } from "../../constants";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "300px",
    borderRadius: "4px",
    background: theme.palette.primary.main,
    color: "white",
  },

  title: {
    fontSize: 14,
    color: "white",
  },
  pos: {
    marginTop: "15px",
  },
  flexx: {
    alignItems: "center",
    paddingBottom: "6px",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  name: {
    //marginLeft: "49px",
  },
  button: {
    textTransform: "none",
  },
  action: {
    marginTop: "-16px",
  },
}));

export default function ProfileCard({user,gotoDashboard,gotoProfile,gotoNotification,gotoRefund,logout}) {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <div
            className={classes.title}
            color="textSecondary"
            //gutterbottom
          >
            <Grid container className={classes.flexx}>
              <Grid item xs={3}>
                <Avatar
                  alt={user.firstName}
                  src={
                    user.image ? baseUrl + user.image : "/images/userg.jpg"
                  }
                  className={classes.large}
                />
              </Grid>
              <Grid item xs={9}>
                <div className={classes.name}>
                  <h3>
                    {user.firstName} {user.lastName}
                  </h3>
                </div>
              </Grid>
            </Grid>
          </div>
          <Divider variant="middle" style={{ background: "white" }} />
        </CardContent>
        <CardActions>
          <Grid container className={classes.action}>
          { (user.roleId !== 111) && <Grid item xs={12}>
              <Button
                className={classes.button}
                onClick={gotoDashboard}
                color="inherit"
              >
                Dashboard
              </Button>
            </Grid>}
            <Grid item xs={12}>
              <Button
                className={classes.button}
                onClick={gotoProfile}
                color="inherit"
              >
                Profile
              </Button>
            </Grid>
           { user.roleId === 111 && <Grid item xs={12}>
              <Button
                className={classes.button}
                onClick={gotoNotification}
                color="inherit"
              >
                Notification
              </Button>
            </Grid>}
           {user.roleId === 111 &&  <Grid item xs={12}>
              <Button
                className={classes.button}
                onClick={gotoRefund}
                color="inherit"
              >
                Refund
              </Button>
            </Grid>}
            <Grid item xs={12}>
            <Button className={classes.button} color="inherit">
              Reset Password
            </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                className={classes.button}
                color="inherit"
                onClick={logout}
              >
                Log Out
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
}
