import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import { Paper, Typography, Button } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShareIcon from "@material-ui/icons/Share";
import Naira from "react-naira";
import { useRouter } from "next/router";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Avatar from '@material-ui/core/Avatar';
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  root: {
    //maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  cardDetail: {
    backgroundColor: theme.palette.secondary.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    color: "#fff",
  },
  centralizedDetails: {
    width: "80%",
  },
  avatarItem: {
    color: '#000',
    backgroundColor: 'whitesmoke',
    border: '1px solid white',
    boxShadow:'0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  },
  title: {
    color: "green",
    width: "70%",
    textAlign: "center",
  },
  img: {
    height: 255,
    display: "block",
    maxWidth: 400,
    overflow: "hidden",
    width: "100%",
  },
  desc: {
    position: "relative",
    padding: theme.spacing(2),
    textDecoration: "none !important",
  },
  cardFooter: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    flexDirection: "column",
    padding: 20,
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
  category: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    padding: "5px 10px",
    position: "absolute",
    top: 0,
    right: 0,
  },
  readMore: {
    backgroundColor: "black",
    color: "white",
    height: 42,
    border: "none",
    width: "100%",
    //marginLeft: "auto",
    //float: "right",
    cursor: "pointer",
  },
}));

function SwipeableTextMobileStepper({ data }) {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const [like, SetLike] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = data.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <>
      {data.length > 0 ? (
        <Paper className={classes.root}>
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {data.map((step, index) => (
              <div key={step.id}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <>
                    <div
                      className={classes.cardDetail}
                      onClick={() => router.push(`/posts/${event.slug}`)}
                    >
                      <div className={classes.centralizedDetails}>
                        <p>{step.host}</p>
                        <h1> {step.title}</h1>
                        <p>
                          Ticket fee: <Naira>{step.amount}</Naira>
                        </p>
                      </div>
                    </div>
                    <img
                      className={classes.img}
                      src={step.image}
                      alt={step.title}
                      onClick={() => router.push(`/posts/${event.slug}`)}
                    />
                    <div className={classes.cardFooter}>
                      <div>
                        <div className={classes.icon}>
                        <Avatar className={classes.avatarItem}>
                        <ShareIcon />
                        </Avatar>
                          <div>
                            {!like && (
                               <Avatar className={classes.avatarItem}>
                               <FavoriteBorderIcon onClick={() => SetLike(like)} />
                           </Avatar>
                            )}
                            {like && (
                              <Avatar className={classes.avatarItem}>
                              <FavoriteBorderIcon onClick={() => SetLike(!like)} />
                          </Avatar>
                            )}
                          </div>
                        </div>
                        <Typography variant="body1">
                          Registered attendees: {step.numOfRegAttendees}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="body1">date and time</Typography>
                        <Typography className={classes.text} variant="body1">
                          {step.date}
                        </Typography>
                        <Typography className={classes.text} variant="body1">
                          {step.time}
                        </Typography>
                        <Typography className={classes.text1} variant="body1">
                          Add to calendar
                        </Typography>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position="static"
            variant="dots"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Paper>
      ) : null}
    </>
  );
}

export default SwipeableTextMobileStepper;
