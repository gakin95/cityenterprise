import React from 'react';
import clsx from 'clsx';
import Head from 'next/head';
import Drift from "react-driftjs";
import { makeStyles } from '@material-ui/core/styles';
import {Header, Footer} from '../../common';

const useStyles = makeStyles((theme) => ({
  root:{
    overflowX:'hidden',
  },
  container:{
    margin:'5%',
    marginTop:'8rem'
  }
}));

const Container = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
     <Head>
       <title>{props.title}</title>
    </Head>
    <Header />
      <div className={clsx(classes.container, props.className)}>
      <Drift
       appId="af7spmub6tbe" 
       attributes={{ email: "gakin95@gmail.com", company: "City events" }}
       />
      {props.children}
      </div>
    <Footer />
    </div>
  )
}

export default Container
