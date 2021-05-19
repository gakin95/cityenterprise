import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {Paper} from '@material-ui/core'
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  amount:{
      backgroundColor:'#fff',
      color:'#000000',
      borderRadius:5,
      padding:5,
      position:'relative',
      top:-50,
      left: 183
  },
  red: {
      color: 'red'
  },
  bg: {
    backgroundColor: 'teal',
    padding: '',
    width: '100%'
  },
  bg1: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    textAlign:'center',
    width: '100%'
    // padding: '5rem'
  },
  flex: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: "pointer",
      transition:'all 0.5s',

      "&:hover": {
        //boxShadow: "0px 0px 30px rgba(252, 99, 107, 0.7)",
        //backgroundColor: "rgba(255,255,255,.7)",
        transform:'scale(1.1)'
      },
    },

    active: {
      boxShadow: "0px 0px 30px rgba(252, 99, 107, 0.7)",
  },
  flex2: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    height: 200,
    backgroundImage: props => `url(${props.image})`,
    backgroundSize: 'cover'
  },
  padding: {
      paddingLeft: '1rem',
  },
  flex3: {
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'space-between'
  },
  flex4: {
      display: 'flex',
      justifyContent:'space-about',
      paddingTop:'1rem'
      
  }, 
  bgAmount: {
    backgroundColor:'#fff',
    padding: '.5rem 1rem',
    borderRadius:5,
    marginBottom:5
  },
  date: {
    color:'#F06E38'
  },
  avatarItem: {
    color: '#000',
    backgroundColor: '#fff',
    border: '1px solid white'
  },
  button:{
      display:'flex',
      justifyContent:'space-between',
  }  
});

export default function ImgMediaCard(props) {
    const [like, SetLike] = useState(false);
  const classes = useStyles(props);

  return (
      <section className={classes.flex} onClick = {props.click}>
          <div className={clsx(classes.bg)}>
            <div className={classes.flex2} > 
                <div className={classes.flex3}>
                    <div className={classes.flex4}>
                        <Avatar className={classes.avatarItem}>
                        <ShareIcon />
                        </Avatar>
                  <div>
                    {!like && (
                        <Avatar className={classes.avatarItem}>
                            <FavoriteBorderIcon onClick={() => SetLike(!like)} />
                        </Avatar>
                    )}
                    {like && (
                        <Avatar className={classes.avatarItem}>
                            <FavoriteIcon
                             onClick={() => SetLike(!like)}
                             color="error"
                           />
                        </Avatar>
                    )}
                  </div>
                    </div>
                    <span className={classes.bgAmount}>{props.amount !== 'free' && 'paid'}{props.amount}</span> 
                </div>
                
            </div>
          </div>
          <Paper className={classes.bg1}>
            <p className={classes.date}>{props.date}</p>
            <p>{props.title}</p>
            <p>{props.content}</p>
            <div className={classes.button}>
            <button>Accept</button>  
            <button>Reject</button>  
            </div>
           

          </Paper>
      </section>
  );
}
