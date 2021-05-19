import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "../components/section";
import { News } from "../components/section/allItems";
import { Grid, Typography, Slide } from "@material-ui/core";
import { v4 as uuidv4 } from 'uuid';

import { MyTextField, ButtonWithBackdrop, MyDialog } from "../common";
import { newsAggregator } from '../src/services/news';
import Pagination from "../components/pagination/pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    overflow: "hidden",
    [theme.breakpoints.down("xs")]: {
      margin: 0,
    },
  },
  header: {
    width: "100%",
    height: "50vh",
    backgroundImage: "url('/images/news.png')",
    backgroundPosition: "right",
    backgroundRepeat: "no-repeat",
    display: "flex",
   alignItems: "flex-start",
   justifyContent:'center',
    color: "#000000",
    marginBottom: 20,
    flexDirection:'column',
    [theme.breakpoints.down("xs")]: {
      backgroundPosition: "center",
      backgroundImage: "url('/images/mobilenews.jpg')",
      backgroundSize: "cover",
      height:'75vh'
    },
  },
  headerText: {
    width:'50%',
    paddingLeft:20,
    [theme.breakpoints.down('xs')]:{
      color:'#fff',
      width:'100%',
    }
  },
  newscontainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  newsgrid: {
    width: "70%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    paddingTop: 20,
  },
  leftwing: {
    height: 300,
    backgroundImage: "url('./images/Group.png')",
    backgroundSize: 300,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    paddingBottom: 50,
    marginTop: -65,
  },

  midwing: {
    height: 200,
    border: "1px solid white",
  },
  anything: {
    fontWeight: "bold",
    paddingTop: 50,
  },
  rightwing: {
    height: 300,
    paddingBottom: 47,
    backgroundImage: "url('./images/Group.svg')",
    backgroundSize: 400,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    marginTop: -48,
  },
  image: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  curation: {
    paddingBottom: 30,
    // paddingTop:30,
    fontWeight: "bold",
  },
  load: {
    marginTop: 20,
    textAlign: "center",
  },
  pagination: {
    "& a":{
      textDecoration:'none'
    },
    "& > *": {
      marginTop: theme.spacing(2),
      width: "100%",
      // margin: "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    line: {
     border: "5px solid grey",
     backgroundColor: "grey",
    },
  },
}));

const allNews = [
  {
    id: "fg76545fs",
    title: "World Bank Lagos 2020",
    content:
      "The New Path Leading to the new Future. All purchased tickets remain valid for the new date which will be announced soon. Pls bear with us as we try to manage this unprecedented situation constructively.",
    image: "/images/corp5.jpg",
  },
  {
    id: "fngyug3fs",
    title: "Berlin Entrepreneur corp",
    content:
      " Quisque non turpis id massa. All purchased tickets remain valid for the new date which will be announced soon. Pls bear with us as we try to manage this unprecedented situation constructively.",
    image: "/images/corp3.jpg",
  },
  {
    id: "fgq76f5fs",
    title: "Maranatha Lagos 2020",
    content:
      " Women Empowerment Submit. All purchased tickets remain valid for the new date which will be announced soon. Pls bear with us as we try to manage this unprecedented situation constructively.",
    image: "/images/corp6.jpg",
  },
  {
    id: "fgsfs09tyh",
    title: "Warrior Apparels",
    content:
      " Getting your Foot in the door. All purchased tickets remain valid for the new date which will be announced soon. Pls bear with us as we try to manage this unprecedented situation constructively.",
    image: "/images/corp1.jpg",
  },
  {
    id: "fgfhjs8765",
    title: "Plural Sight ",
    content:
      "The Future of Africa. All purchased tickets remain valid for the new date which will be announced soon. Pls bear with us as we try to manage this unprecedented situation constructively.",
    image: "/images/corp5.jpg",
  },
  {
    id: "fgf2xso87654",
    title: "Berlin Entrepreneur corp",
    content:
      " Quisque non turpis id massa. All purchased tickets remain valid for the new date which will be announced soon. Pls bear with us as we try to manage this unprecedented situation constructively.",
    image: "/images/corp3.jpg",
  },
  {
    id: "fgsvfsitrert",
    title: "Maranatha Lagos 2020",
    content:
      " Women Empowerment Submit. All purchased tickets remain valid for the new date which will be announced soon. Pls bear with us as we try to manage this unprecedented situation constructively.",
    image: "/images/corp6.jpg",
  },
  {
    id: "fg88f98765s",
    title: "Warrior Apparels",
    content:
      " Getting your Foot in the door. All purchased tickets remain valid for the new date which will be announced soon. Pls bear with us as we try to manage this unprecedented situation constructively.",
    image: "/images/corp1.jpg",
  },
  {
    id: "fgfa3s987654",
    title: "Berlin Entrepreneur corp",
    content:
      " Quisque non turpis id massa. All purchased tickets remain valid for the new date which will be announced soon. Pls bear with us as we try to manage this unprecedented situation constructively.",
    image: "/images/corp3.jpg",
  },
  {
    id: "fg35jf9876543s",
    title: "Plural Sight ",
    content:
      "The Future of Africa. All purchased tickets remain valid for the new date which will be announced soon. Pls bear with us as we try to manage this unprecedented situation constructively.",
    image: "/images/corp5.jpg",
  },
  {
    id: "fgsso876543wfsfs",
    title: "Warrior Apparels",
    content:
      " Getting your Foot in the door. All purchased tickets remain valid for the new date which will be announced soon. Pls bear with us as we try to manage this unprecedented situation constructively.",
    image: "/images/corp1.jpg",
  },
  {
    id: "fjyagf876543dfghs",
    title: "World Bank Lagos 2020",
    content:
      "The New Path Leading to the new Future. All purchased tickets remain valid for the new date which will be announced soon. Pls bear with us as we try to manage this unprecedented situation constructively.",
    image: "/images/corp5.jpg",
  },
];

export default function Home() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [news, setNews] = useState([]);
  const [msg, setMsg] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  const spreadNews = async () => {
    const response = await newsAggregator();
    console.log('................------------response',response)
    if(response.status === 'ok'){
      setNews(
        response.data.map(item => {
          return {
            id:uuidv4(),
            title:item.title,
            content:item.content,
            image:item.image,
            url:item.url,
            source:item.source.name,
            author:item.author,
            date:item.publishedAt
          }
        })
      )
    }else{
      setMsg(response.message)
    }
  }

  useEffect(() => {
    spreadNews()
  },[]);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = news.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Container title="News" className={classes.root}>
        <div className={classes.header}>
          <div className={classes.headerText}>
          <Slide direction="down" in={true} mountOnEnter unmountOnExit>
          <h1>The best curation Around events.</h1>
          </Slide>
          <Slide direction="right" in={true} mountOnEnter unmountOnExit>
          <p>
            Enjoy our news revolving only around the best events all over the
            world. See what is trending and what is fresh in the world of
            events.
          </p>
          </Slide>
          </div>
        </div>
        <Grid container>
          <Grid item xs={12} id='#' className={classes.newscontainer}>
            <div className={classes.newsgrid}>
              <Typography variant="h6" className={classes.curation}>
                Our News Curation
              </Typography>
              <News data={currentPosts} message={msg}/>
            </div>
          </Grid>
          <Grid item xs={12} className={classes.pagination}>
        <a  href='#'>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={news.length}
            paginate={paginate}
          />
        </a>
      </Grid>
        </Grid>
      </Container>
    </>
  );
}
