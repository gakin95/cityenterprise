import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    color: "#fff",
    paddingBottom:12,
    paddingTop:12,
  },
  content: {
    alignItems: "center",
    display: "flex",
  },
  title: {
    fontWeight: 700,
    font:'normal normal 600 20px/24px Work Sans'
  },
}));

const HostCard = (props) => {
  const { className, Title, Total, description, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="inherit"
              //gutterbottom
              variant="h6"
            >
              {Title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              className={classes.title}
              color="inherit"
              //gutterbottom
              variant="h6"
            >
              {Total}
            </Typography>
          </Grid>
        </Grid>
        <div>
          <p>
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

HostCard.propTypes = {
  className: PropTypes.string,
};

export default HostCard;
