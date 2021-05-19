import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ContainerFluid from "@material-ui/core/Container";
import { Grid, Paper } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CallToActionIcon from "@material-ui/icons/CallToAction";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import { deepOrange, deepPurple, pink, yellow } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";

import { Container } from "../../components/section";
import { Contact } from "../../common";
import { Invitations, Complaints, Reminder } from '../../components/notifications'

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 0,
    marginTop: "6rem",
    fontSize: 14,
    //marginLeft:'2rem',
    [theme.breakpoints.down("xs")]: {
      marginTop: "6rem",
    },
  },
  title: {
    textAlign: "center",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    paddingBottom: 15,
    paddingTop: 15,
  },
  column: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    cursor: "pointer",
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  pink: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: pink[500],
  },
  yellow: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: yellow[500],
  },
  text:{
    color:'inherit'
  },
  activeText:{
      color:'#F06E38'
  },
  content:{
      padding:'20px 10px'
  }
}));

function Notication() {
  const [page, setPage] = useState("invitations");
  const classes = useStyles();
  return (
    <Container title="Notification" className={classes.container}>
      <ContainerFluid>
        <Paper component="div" className={classes.title}>
          Notification
        </Paper>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            {/* <ContainerFluid> */}
            <Paper className={classes.column}>
              <div className={classes.row} onClick={() => setPage('invitations')}>
                <FavoriteIcon />
                <p className={page==='invitations' ? classes.activeText : classes.text}>Invitation</p>
                <Avatar className={classes.orange}>25</Avatar>
              </div>
              <div className={classes.row} onClick={() => setPage('complaints')}>
                <CallToActionIcon />
                <p className={page==='complaints' ? classes.activeText : classes.text}>Complaints</p>
                <Avatar className={classes.pink}>5</Avatar>
              </div>
              <div className={classes.row} onClick={() => setPage('reminders')}>
                <AddAlertIcon />
                <p className={page==='reminders' ? classes.activeText : classes.text}>Reminder</p>
                <Avatar className={classes.yellow}>17</Avatar>
              </div>
            </Paper>
            {/* </ContainerFluid> */}
          </Grid>
          <Grid item xs={12} sm={9}>
            <Paper component='div' className={classes.content}>
            {page === "invitations" && <Invitations />}
            {page === "complaints" && <Complaints />}
            {page === "reminders" && <Reminder />}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Contact />
          </Grid>
        </Grid>
      </ContainerFluid>
    </Container>
  );
}

export default Notication;
