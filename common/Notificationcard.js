import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { useRouter } from 'next/router';
import { SingleEvent } from "../components/section/singleItem";
import {ButtonWithBackdrop} from '../common';

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    width: "90%",
    margin:'auto'
  },
  button: {
   display:'flex',
   alignItems:'center',
   justifyContent:'center',
   marginTop: 40
  },
  upcoming: {
    marginBottom: 40,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    fontWeight:'bold',
  }
}));

const allEvents = [
    {id:'fgfs', title:'Plural Sight',content:'SMEs -The Future of Africa', image:'/images/corp5.jpg', amount:'free', date:'thur, Jul 30, 2020'},
    {id:'fg3fs', title:'AT&T',content:'The Entrepreneur business submit', image:'/images/corp6.jpg', amount:'3000', date:'Mon, Jul 31, 2020'},
    {id:'fgq5fs', title:'Alison Courses',content:'Marchine Learning and Statistics', image:'/images/corp3.jpg', amount:'5000', date:'thur, Jul 20, 2020'},
    {id:'fgsfs', title:'Warrior Apparels',content:'Getting your Foot in the door', image:'/images/corp1.jpg', amount:'10000', date:'thur, May 30, 2020'},
    {id:'fgfhjs', title:'AT&T',content:'The Entrepreneur business submit', image:'/images/corp6.jpg', amount:'1000000000', date:'thur, Jul 30, 2020'},
    {id:'fgf2xs', title:'Plural Sight',content:'SMEs -The Future of Africa', image:'/images/corp5.jpg', amount:'free', date:'thur, Jul 30, 2020'},
    {id:'fgsvfs', title:'Alison Courses',content:'Marchine Learning and Statistics', image:'/images/corp3.jpg', amount:'free', date:'thur, Jul 30, 2020'},
    {id:'fg88fs', title:'AT&T',content:'The Entrepreneur business submit', image:'/images/corp6.jpg', amount:'free', date:'thur, Jul 30, 2020'},
    {id:'fgfa3s', title:'Plural Sight',content:'SMEs -The Future of Africa', image:'/images/corp5.jpg', amount:'free', date:'thur, Jul 30, 2020'},
    {id:'fg35jfs', title:'Alison Courses',content:'Marchine Learning and Statistics', image:'/images/corp3.jpg', amount:'free', date:'thur, Jul 30, 2020'},
    {id:'fgsssfs', title:'Warrior Apparels',content:'Getting your Foot in the door', image:'/images/ccorp1.jpg', amount:'free', date:'thur, Jul 30, 2020'},
    {id:'fjyagfs', title:'AT&T',content:'The Entrepreneur business submit', image:'/images/corp6.jpg', amount:'free', date:'thur, Jul 30, 2020'},
];

function AllEvents() {
  const router = useRouter()
  console.log(router)
  const [open, setOpen] = useState(false);
  const [listAll, setListAll] = useState(false);
  const renderItem = listAll?allEvents:allEvents.slice(0,6);
  console.log('renderItem',renderItem)
  const handleClick = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      setListAll(!listAll)
    },2000)
  };

  const classes = useStyles();
  return (
    <div className={classes.cardRoot}>
      {/* <Typography variant="h5" className={classes.upcoming}>Top Upcoming Events</Typography> */}
      <Grid container spacing={3} style={{marginTop:50}}>
        {renderItem.map(singleItem => <Grid item xs={12} sm={6} md={4} key={singleItem.id}>
          <SingleEvent 
          click={() => router.push(`posts/${singleItem.date}`)}
           title={singleItem.title}
           content={singleItem.content}
           image={singleItem.image}
           amount={singleItem.amount}
           date={singleItem.date}
             />
        </Grid>)}
      </Grid>
      <Grid item xs={12} className={classes.button}>
      <ButtonWithBackdrop 
      label={listAll?'See less':'See more'}
      open={open}
      click={handleClick}
      />
      </Grid>
    </div>
  );
}

export default AllEvents;
