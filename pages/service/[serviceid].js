import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Moment from 'react-moment';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { Backdrop } from "../../common";
import { Container } from "../../components/section";
import { baseUrl } from "../../constants"
import { getSingleServiceDetails } from "../../src/services/vendorServices"

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 30,
    paddingBottom: 70,
    margin: 50,
    [theme.breakpoints.down("xs")]: {
      margin: 0,
    },
  },
  wrapper: {
    background:
      "transparent linear-gradient(180deg, #FEEDD7 0%, #7F776C 100%) 0% 0% no-repeat padding-box",
  },
  card: {
    maxWidth: "50%",
    margin: "auto",
    marginTop: 30,
    [theme.breakpoints.down("xs")]: {
      maxWidth: "90%",
    },
  },
  icon: {
    display: "flex",
    alignItems: "center",
  },
  media: {
    height: 250,
    width: "50%",
    float: "right",
    backgroundColor: "green",
    [theme.breakpoints.down("xs")]: {
      float: "left",
      width: "100%",
    },
  },
  category: {
    backgroundColor: "whitesmoke",
    padding: 7,
    borderRadius: 5,
    width: 350,
    marginTop: 15,
  },
  content: {
    backgroundColor: "whitesmoke",
    borderRadius: 5,
    width: "80%",
    padding: 20,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}));

const EditServices = () => {
  const router = useRouter();
  const [details, setDetails] = useState(null);
  const { serviceid } = router.query;
  const [like, SetLike] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      (async() => {
        const outcome = await getSingleServiceDetails(token,serviceid);
        console.log('..here..',outcome.data)
        setDetails(outcome.data)
      })()
    }
  },[router])
  const classes = useStyles();
  let content = <Backdrop loading={!(details && details.id)}/>;
  if (details && details.id) {
    content = <div>
      <Grid container spacing={5}>
          <Grid item xs={12} className={classes.wrapper}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={baseUrl + details.banner_image}
                  title={details.category}
                />
                <CardContent>
                  <p
                    className={classes.date}
                  >
                    <Moment titleFormat="D MMM YYYY" withTitle>{details.createdAt}</Moment>
                  </p>
                  <br />
                  <br />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {details.description.substring(0,70)} ...
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions></CardActions>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={5}>
          <Grid item xs={12} md={3}>
            <h4>Experience Level</h4>
          </Grid>
          <Grid item xs={12} md={9}>
            <div className={classes.category}>
              <p>{details.experience_level}</p>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <h4>Experience Level</h4>
          </Grid>
          <Grid item xs={12} md={9}>
            <div className={classes.category}>
              <p>{details.experience_level}</p>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <h4>Description</h4>
          </Grid>
          <Grid item xs={12} md={9}>
            <div className={classes.content}>
              <p>
                {details.description}
                </p>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <h4>Fees</h4>
          </Grid>
        
          <Grid item xs={12} md={9}>
            <div className={classes.category}>
              <p>{details.price}</p>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <h4>Full Name</h4>
          </Grid>
          <Grid item xs={12} md={9}>
            <div className={classes.category}>
              <p>{`${details.User.firstName} ${details.User.lastName}`}</p>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <h4>Phone Number</h4>
          </Grid>
          <Grid item xs={12} md={9}>
            <div className={classes.category}>
              <p>{details.User.phone}</p>
            </div>
          </Grid>
        </Grid>
    </div>
  }
  return (
    <Container title="listed service">
      <div className={classes.root}>
        {content}
      </div>
    </Container>
  );
};

export default EditServices;
