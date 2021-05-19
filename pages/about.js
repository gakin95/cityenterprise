import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography
} from '@material-ui/core';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import BeenhereIcon from '@material-ui/icons/Beenhere';
import { Container } from '../components/section';
import {Contact} from '../common';

const useStyles = makeStyles((theme) => ({
  container:{
    margin:0,
    marginTop:'6rem',
    fontSize:14,
    marginLeft:'2rem',
    [theme.breakpoints.down('xs')]: {
      marginTop:'6rem',
    marginLeft:'1rem',
    marginRight:'1rem',
    },
  },
    spacing: {
    width:'70%',
    [theme.breakpoints.down('xs')]: {
      width:'100%',
    }
  },
  service: {
    marginTop:60
  },
  contact: {
    backgroundColor:theme.palette.primary.main,
    height:160,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    color:'#fff'
  },
  contactContent:{
    width:'60%'
  },
  checker:{
 display:'flex',
 alignItems:'center'

  },
  image: {
    backgroundImage: "url('/images/aboutus.jpg')",
    backgroundSize: "cover",
    width: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  contact:{
    marginTop:20,
  }
}));

export default function Home() {
  const matches = useMediaQuery("(max-width:600px)");
  const classes = useStyles();
  return (
    <>
    <Container title='About Us' className={classes.container}>
      <Grid container spacing={3}>
    <Grid item xs={12} sm={7}>
    <Grid item>
    <Typography variant={matches?'h6':'h6'}>
        About Us
        </Typography>
        <div className={classes.spacing}>
          <p>
          Cityevents.ng is the only portal for buisness events and 
          announcements in Nigeria. Our platform is a value-driven event 
          aggregator and service provider for B2B and B2C companies to reach 
          their target market through event activations and related activities
          </p>
          <Typography variant='h6' className={classes.service}>
           Our Services 
          </Typography>
          <p>
          Listing of free and paid business events, which includes but are not 
          limited to the following; conferences, seminars, trainings, forums, 
          exhibitions, brand/product launches, award ceremonies, etc.
          </p>
          <div className={classes.checker}>
            <BeenhereIcon  color='primary'/>
          <p>
          Registration of event attendees.
          </p>
          </div>
          <div className={classes.checker}>
            <BeenhereIcon  color='primary'/>
          <p>
          Public Relations/ Press Releases on business events via our weekly newsletters.
          </p>
          </div>
          <div className={classes.checker}>
            <BeenhereIcon  color='primary'/>
          <p>
          Resource page for event owners and vendors.
          </p>
          </div>
          <div className={classes.checker}>
            <BeenhereIcon  color='primary'/>
          <p>
          Provision of logistic services to and from business events.
           E.g. travel advisory, hotel recommendations, etc.
          </p>
          </div>
          <div className={classes.checker}>
            <BeenhereIcon  color='primary'/>
          <p>
          Provision of logistic services to and from business events. E.g. travel advisory, hotel recommendations, etc.
          </p>
          </div>
          </div>
    </Grid>
   <Grid item>
   <p>
        We are updated with a comprehensive, well-categorized, and updated database of MICE
         –based events , event attendees and event vendors, which have been thoroughly researched 
         and collated from reliable sources.<br/><br/> Our value proposition is to create awareness, interest
          and optimization of announcements and related events with coverage, contribution , commonality 
          of information, complementarity and versatility, in order to drive attendance, attract and engage attendees,
           while improving event attendee experience . <br/><br/>If you are looking to optimize your business events by creating the widest
            possible reach ( local and international) , visit our portal (Cityevents.ng/submit …) to increase your sales, develop strategic business
             partners, and create the competitive advantage you require.
        </p><br/>    
   </Grid>
    </Grid>
    {!matches && <Grid item xs={12} sm={5} className={classes.image}></Grid>}
    
    <Grid item xs={12} className={classes.contact}>
          <Contact />
        </Grid>
    </Grid>
    </Container>
    </>
  )
}