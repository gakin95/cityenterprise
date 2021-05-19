import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
    AppBar,
    Toolbar,
} from '@material-ui/core';
import Link from 'next/link';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft:'2%',
    marginRight:'2%',
    '& a':{
        textDecoration:'none',
        marginRight: theme.spacing(2),
        color: '#848589',
        '& span':{
          color:'#F06F38'
        },
    },
    '& a:hover': {
        color:'#F06F38'
    },
    '& span:hover':{
      color:'#848589'
    },
    '& .MuiAppBar-colorPrimary': {
        backgroundColor:'#fff',
        border:'1px solid #848589'
    },
    '& .MuiPaper-elevation4': {
        boxShadow: 'none'
    },
    '& .MuiToolbar-regular': {
      minHeight:'32px'
    }
  },
  Brand: {
    flexGrow: 1,
  },
  action: {
    flexGrow: 1,
    display:'flex',
  },
  appBar: {
    background:'green'
  }
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  const [token, setToken] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
  }, []);
  const lowerNav = !token? <div className={classes.action}>
    <div className={classes.Brand}></div>
  {(props.route===undefined || props.route==='signin')?<Link href='/signup'>
   <a 
   style={{color:props.route !== undefined  && '#fff'}}>
   Don't have an account? <span
   style={{color:props.route !== undefined  && '#fff'}}>
   Sign up</span></a>
   </Link>:<Link href='/signin'><a 
   style={{color:props.route !== undefined  && '#fff'}}>
   Have an account? <span
   style={{color:props.route !== undefined  && '#fff'}}>
   Sign in</span></a></Link>}
  </div> : null
  return (
    <div className={classes.root}>
      <AppBar position="fixed"
       style={{top:60,background:props.route !== undefined  && '#000000',
        color:props.route !== undefined  && '#fff'}}>
        <Toolbar>
         {lowerNav}
        </Toolbar>
      </AppBar>
    </div>
  );
}
