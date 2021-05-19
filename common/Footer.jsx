import React from 'react';
import clsx from 'clsx';
import {
    Typography,
    Grid,
    Divider
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Link from 'next/link';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';


const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    //bottom:0,
    marginTop: '3rem',
    backgroundColor: theme.palette.secondary.main,
   paddingTop: 50,
    paddingBottom: 50,
  },
  container: {
      paddingRight:50,
      paddingLeft:50,
      [theme.breakpoints.down('sm')]: {
        paddingLeft:66,
      },
      [theme.breakpoints.down('xs')]: {
        paddingLeft:40,
      },
  },
  paymentMethod: {
      display:'flex',
      alignItems:'center',
      paddingTop:10,
      paddingBottom:10,
      [theme.breakpoints.down('xs')]:{
        display:'none'
      }
  },
  image: {
     // marginLeft:12
     //width:70,
  },
  divider: {
      marginTop:12,
      marginBottom:12,
      '& .MuiDivider-root': {
          backgroundColor:'#fff'
      }
  },
  copyRight: {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
      // margin:'0px auto',
      // width:'50%',
      // [theme.breakpoints.down('md')]: {
      //   width:'80%',
      // },
      // [theme.breakpoints.down('xs')]: {
      //   width:'90%',
      // },
  },
  text1: {
    color: "white",
    display: "flex",
    fontSize:12,
    fontFamily:'normal normal normal 16px/19px Work Sans',
    lineHeight:3,
    fontWeight:'none',
    cursor:'pointer',
    [theme.breakpoints.down('xs')]:{
      fontSize:10
    }
  },
  text: {
    color: "white",
    display: "flex",
    fontSize:12,
    fontFamily:'normal normal normal 16px/19px Work Sans',
    lineHeight:3,
    fontWeight:'none',
    cursor:'pointer',
  },
  iconsContainer:{
    display:'flex',
    width:'40%',
    alignItems:'center',
    justifyContent:'space-between',
    [theme.breakpoints.down('xs')]:{
      width:'100%',
    }
  },
  icon:{
    width:20,
  },
  
}));


export default function FooterSection({className}) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root,className)}>
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={4} sm={6} md={3}>
            {/* <Typography variant="h5" className={classes.text} >Product</Typography> */}
            {/* <Link href='/'>
            <Typography variant="body1" className={classes.text1} >Features</Typography>
            </Link> */}
            <Link href='/events'>
              <Typography variant="body1" className={classes.text1} >Pricing</Typography>
            </Link>
            {/* <Link href='/'>
              <Typography variant="body1" className={classes.text1} >Event Promotion</Typography>
            </Link> */}
            <Link href='/events'>
              <Typography variant="body1" className={classes.text1} >Booking</Typography>
            </Link>
            <Link href='/help'>
              <Typography variant="body1" className={classes.text1} >Help</Typography>
            </Link>
        </Grid>
        <Grid item xs={4} sm={6} md={3}>
            {/* <Typography variant="h5" className={classes.text} >Explore More</Typography> */}
            <Link href='/about'>
              <Typography variant="body1" className={classes.text1} >About us</Typography>
            </Link>
            <Link href='/createEvent'>
              <Typography variant="body1" className={classes.text1} >Sell Tickets</Typography>
            </Link>
           
            <Link href='/events'>
              <Typography variant="body1" className={classes.text1} >Events</Typography>
            </Link>
        </Grid>
        <Grid item xs={4} sm={6} md={3} >
            <Typography variant="body1" className={classes.text1} >Connect with Us</Typography>
            <div className={classes.iconsContainer}>
            <a href='https://www.facebook.com/cityeventssocial/' target='_blank'>
              <img className={classes.icon} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEU6VZ////82Up4zUJ1UbKx4ibswTpyMmsQ5V6EtTJupss8nSJnN0+WVosgqSpo4U56eqcyDksDj5vBwgbb3+PxFXqNabqt9jb3S2OhidbC9xdy3v9l0hLjZ3etLY6bq7fTEyt4dQpdJYqekrs2uttK97JEgAAADFUlEQVR4nO3c2XLiMBBAUUZmM3IsFsNgSIAk/P83TsLzjCNbI3c3de9rqlw+BV7VZDIhIiIiIiIiIiIiIiIiIlJeCM4VxbzsrJDey8G50s/3h91ss3jp7LdJYii8262rbfPr545eem/753y9qWJwjypzwqJuT7E6i0JX7459fOaEvn3r5zMmLPy5r8+W0L9Gn15MCkO9GuAzJHSh9xFoS1hcrsOAVoTzdsghaEhYTAcDbQjdfjjQhDAshx6DRoShrhKAFoR+nQI0ICzaJKABYZlyEFoQ1p9pQPVCd0m4UJgQ+lsiULvQXVKB2oW+1ysZg8KwTAYqF5ZpF3sDQr99cqFLvJ3RL0y+2usXDnw1Y0YYUh58TQiL3X8Aql57Kvschs3xdF/9pftC8fphj3vSalZ6X5tbA/axJ5rtzhdBem+HVEeeaKq55s+po1DHAW/vJj+/yfdifdxX1OYX9LuwjxIejH5Fv3LTGOBJ8eXup+KEH056P4cXJby+S+9mQlHCUy29mwlFCddz6d1MKEq4sXsmjRTOEGoOIUL9IUSoP4QI9YcQof4QItQfQoT6Q4hQR27+78qYucRX37GFR7Jrb65ddBQz1Hbv2sCjpSixvEcgEitlhcN+cNenRnZxagThm+wK6ghC4TXiEYSr8tmFwstvIwhb2XX+EYR72St+fmEj6htDuBW+a8svPArPauQXnp9e+CI8jZJfKP38mF8ofDnML2wuwsOn2YVX6ena7MKt9PRpduHt6YUr6eHM7MKF9HBmduGr9OvU7MKp9BR4bmEjDcwulJ9zzy2U/+1hbqH0s1N+4afsq8QRhPKT/LmFB+kb7+xC6Tua7ELhdacRhOLPTtmFCv7ZQOY14LP4xWISlh2FqFkM17UF8VPpF7Hjb3HTJl2nSwXAzp5jnqYrhAj1hxCh/hAi1B9ChPpDiFB/CBHqDyFC/SFEqD+ECPWHEKH+ECLUH0KE+kOIUH8IEeoPIUL9IUSoP4QI9YcQof4QItQfQoT6Q4hQfwgR6g8hQv0hRKg/hAj1hxCh/hAi1B9ChD36A+1ASVvVoq0WAAAAAElFTkSuQmCC' alt='facebook'/>
            </a>
            <a href='https://twitter.com/cityevents.ng' target='_blank'>
              <Typography variant="body1" className={classes.icon} ><TwitterIcon className={classes.twitter}/></Typography>
            </a>
            <a href='https://www.instagram.com/cityevents.ng/' target='_blank'>
              <img className={classes.icon} src='data:image/jpeg;base64,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' alt='instagram'/>
            </a>
            </div>
        </Grid>
        <Grid item xs={4} sm={6} md={3}>
            <div className={classes.paymentMethod}>
                <img src='/images/cardpayments.png' className={classes.image} />
            </div>
        </Grid>
        <Grid item xs={12} className={classes.divider}>
        <Divider />
        </Grid>
        <Grid item xs={12} className={classes.copyRight}>
          <Typography variant="body1" className={clsx(classes.text1, )} >
          Copyright 2020 | cityevents.ng | All right reserved | Website by Instiq
              </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

