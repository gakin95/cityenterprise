import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";
import {Minimal } from '../common';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    paddingTop: 150,
    textAlign: "center"
  },
  image: {
    marginTop: 50,
    display: "inline-block",
    maxWidth: "100%",
    width: 560
  }
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <Minimal>
      <div className={classes.root}>
        <Grid container justify="center" spacing={4}>
          <Grid item lg={6} xs={12}>
            <div className={classes.content}>
              <Typography variant="h5">
                404: The page you are looking for isn’t here
              </Typography>
              <Typography variant="subtitle2">
              Looks like you've followed a broken link or entered a URL that doesn't exist on this site.
                {/* You either tried some shady route or you came here by mistake.
                Whichever it is, try using the navigation */}
              </Typography>
              <img
                alt="Under development"
                className={classes.image}
                src="/images/undraw_page_not_found_su7k.svg"
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </Minimal>
  );
};

export default NotFound;
