import React from 'react';
import clsx from "clsx";
import Head from 'next/head';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {Grid,Typography }from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../common/Footer';

const useStyles = makeStyles((theme => ({
    action: {
        padding : '10% 4%',
        marginTop:'4rem',
        '& .MuiTypography-h5': {
            fontWeight:'bold'
        },
        [theme.breakpoints.down('xs')]: {
            padding : '20% 2%',
        },
    },
   title : {
       backgroundImage:"url('/images/Mask.png')",
       backgroundSize:'cover',
       backgroundRepeat:'no-repeat',
       backgroundPosition:'center',
       height:'120vh',
       '& .MuiTypography-h2':{
        fontWeight:'bold'
       },
       '& div': {
           width:'60%',
           margin:'15% auto',
           MarginBottom:0,
           color:'#fff',
           '& h6':{
               marginTop:'20px'
           },
           [theme.breakpoints.down('sm')]: {
            width:'95%',
            margin:'28% auto',
          },
       },
    //    [theme.breakpoints.down('xs')]: {
    //     display:'none'
    //   },
   } ,
   actionProp: {
    marginBottom:40,
},
footer:{
    marginTop:0,
}
})))

const Guest = (props) => {
    const classes = useStyles();
    const mobile = useMediaQuery("(max-width:600px)");
  return (
    <>
    <Head>
       <title>{props.title}</title>
    </Head>
     <Grid container spacing={0}>
        <Grid item xs={12} sm={6} md={props.changeGridSize===true?8:4}  >
            <div className={classes.action}>
                <Typography variant='h5' component='h5'>{props.greeting}</Typography>
                <Typography variant='body1' className={classes.actionProp} >{props.action}</Typography>
                {props.children}
            </div>
        </Grid>
        {!mobile && <Grid item xs={12} sm={6} md={props.changeGridSize===true?4:8} className={clsx(classes.title,props.Class)}>
           { !props.changeGridSize && <div>
                <Typography variant='h5' >Discover Events</Typography>
                <Typography variant='h6'>Find events that interest you and book tickets.
                 It is really easy and best of all it’s free. </Typography>
            </div>}
        </Grid>}
    </Grid>
    <Footer className={classes.footer}/>
    </>
  )
}

export default Guest
