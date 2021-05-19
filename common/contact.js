import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contact: {
    backgroundColor: theme.palette.primary.main,
    height: 70,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width:'70%',
    [theme.breakpoints.down('xs')]: {
      width:'100%',
    },
    
     },
  contactContent: {
    [theme.breakpoints.down('xs')]: {
      padding:20,
    },
    fontSize:16,
  },
}));

export default function Contact() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
    <div className={classes.contact}>
      <div>
      <Typography variant="h5" className={classes.contactContent}>
        Contact us on info@cityevents.ng or 080-cityevents for all enquiries.
      </Typography>
      </div> 
    </div>
    </div>
  );
}