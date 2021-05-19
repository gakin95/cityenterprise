import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
  Grid,
  Slide,
  Zoom
} from '@material-ui/core';
import Moment from 'react-moment';
import {baseUrl} from '../../../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    cursor: "pointer",

    "&:hover": {
      boxShadow: "0 16px 64px -16px rgba(46,55,77,0.7)",
      backgroundColor: "rgba(255,255,255,.7)",
    },
  },

  active: {
    boxShadow: "0px 0px 30px rgba(252, 99, 107, 0.7)",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  media:{
    backgroundSize:'cover',
    backgroundRepeat:'no-repeat',
    borderRadius:5,
    height:200,
    width:'80%',
    margin:'20px auto',
    [theme.breakpoints.down("xs")]: {
      width:'100%',
      margin:0,
    },
  },
  image:{
    height:'100%',
    width:'100%',
  },
  details:{
    width:'80%',
    margin:'20px 0',
    [theme.breakpoints.down("xs")]: {
      margin:0,
      paddingLeft:20,
      width:'100%'
    },
},
date:{
  color:theme.palette.primary.main,
  fontSize:12,
  marginTop:-12
},
fee:{
  backgroundColor:theme.palette.primary.main,
  color:'#fff',
  padding:'3px 20px',
  borderRadius:'5px',
  textTransform:'capitalize'
},
title:{
  fontSize:25
},
}));

export default function CenteredGrid({click,title,image,date,content,address,type_of_event}) {
  const classes = useStyles({image});
  return (
   <Slide direction="up" in={true} mountOnEnter unmountOnExit>
      <Paper onClick={click} className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6} md={6}>
          <div className={classes.media}>
            <img className={classes.image} src={`${baseUrl}${image}`} />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <div className={classes.details}>
          <p><b className={classes.title}>{title}</b></p>
          <p className={classes.date}><Moment format="ddd, MMM Do, yy">{date}</Moment></p>
          <p className={classes.content}>{content}</p>
          <p>{address}</p>
           <p><b className={classes.fee}>{type_of_event}</b></p>
          </div>
        </Grid>
      </Grid>
    </Paper>
   </Slide>
  );
}
