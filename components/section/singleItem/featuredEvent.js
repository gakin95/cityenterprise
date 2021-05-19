import React, { useState } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShareIcon from "@material-ui/icons/Share";
import Naira from "react-naira";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "97%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    backgroundImage: (props) => `url(${props.image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    //backgroundPosition: "center",
    height: 344,
    cursor:'pointer'
  },
  cardContent: {
    backgroundColor: "#534C4C",
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    cursor:'pointer'
  },
  content: {
    paddingTop: "8%",
  },
  title: {
    [theme.breakpoints.up("md")]: {
      padding: 25,
    },
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1% 10%",
    [theme.breakpoints.down("xs")]: {
      alignItems: "flex-start",
      justifyContent: "space-evenly",
      flexDirection: "column",
      padding: 0,
    },
  },
  icon: {
    display: "flex",
    alignItems: "center",
  },
  text: {
    color: "#848589",
  },
  text1: {
    color: "#38B9F0",
  },
  avatarItem: {
    color: "#000",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    backgroundColor: "#fff",
    border: "1px solid white",
    cursor:'pointer'
  },
}));

const landingPageEvent = (props) => {
  const [like, SetLike] = useState(false);
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Paper>
        <Grid container spacing={0}>
          <Grid
            item
            xs={12}
            sm={4}
            className={classes.cardContent}
            onClick={props.onClick}
          >
            <div className={classes.content}>
              <Typography variant="body1" className={classes.host}>
                {`${props.host} `}
              </Typography>
              <Typography variant="h5" className={classes.title}>
                {props.title}
              </Typography>
              <p className={classes.amount}>
                Ticket fee: <Naira>{props.amount}</Naira>
              </p>
            </div>
          </Grid>
          <Grid
            onClick={props.onClick}
            item
            xs={12}
            sm={8}
            className={classes.image}
          ></Grid>
          <Grid item xs={12}>
            <div className={classes.cardFooter}>
              <div>
                <div className={classes.icon}>
                  <Avatar className={classes.avatarItem}>
                    <ShareIcon />
                  </Avatar>
                  <div>
                    {!like && (
                      <Avatar className={classes.avatarItem}>
                        <FavoriteBorderIcon onClick={() => SetLike(!like)} />
                      </Avatar>
                    )}
                    {like && (
                      <Avatar className={classes.avatarItem}>
                        <FavoriteIcon
                          onClick={() => SetLike(!like)}
                          color="error"
                        />
                      </Avatar>
                    )}
                  </div>
                </div>
                <Typography variant="body1">
                  Registered attendees: {props.numOfRegAttendees}
                </Typography>
              </div>
              <div>
                <Typography variant="body1">date and time</Typography>
                <Typography className={classes.text} variant="body1">
                  {props.date}
                </Typography>
                <Typography className={classes.text} variant="body1">
                  {props.time}
                </Typography>
                <Typography className={classes.text1} variant="body1">
                  Add to calendar
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default landingPageEvent;
