import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    //width:200,
    color: "#fff",
    paddingBottom:12,
    paddingTop:12,
    [theme.breakpoints.down('xs')]:{
      width:340
    }
  },
  content: {
    alignItems: "center",
    display: "flex",
  },
  text:{
      color:'#fff',
      fontWeight:'bold'
  },
  title: {
    fontWeight: 700,
    //font:'normal normal 600 20px/24px Work Sans',
    color:'#fff',
    marginTop:20
  },
}));

const HostCard = (props) => {
  const { className,changeColor, Title, Total, description, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item xs={12}>
            <Typography
              className={clsx(classes.text,changeColor)}
              color="inherit"
              //gutterbottom
              variant="body2"
            >
              {Title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              className={clsx(classes.title, changeColor)}
              color="inherit"
              //gutterbottom
              variant="h6"
            >
              {Total}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

HostCard.propTypes = {
  className: PropTypes.string,
};

export default HostCard;
