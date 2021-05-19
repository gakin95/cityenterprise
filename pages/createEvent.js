import React, {useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Container } from '../components/section';
import ContainerFluid from '@material-ui/core/Container';
import CreateEvents from '../components/createEvents/createEvents'
import { ButtonWithBackdrop } from "../common";

const useStyles = makeStyles(theme => ({
  container:{
    margin:0,
    marginTop:'6rem',
    fontSize:14,
    //marginLeft:'2rem',
    [theme.breakpoints.down('xs')]: {
      marginTop:'6rem',
    }
  },
  image: {
    backgroundImage: "url('/images/un.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundOrigin: "center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "80vh",
  },
}))

const CreateEventPage = (props) => {
  const [token, setToken] = useState(null);
  const router = useRouter();
  const classes = useStyles();
  const {currentUser} = props;
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(null);
  const handleSubmit = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      token?router.replace('/profile/myprofile'):router.replace("/signin");
    }, 3000);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setRole(currentUser.roleId)
    }
  }, []);
  let renderEvents = <CreateEvents />;
  if (!token || currentUser.roleId !== 131) {
    renderEvents = <div>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <ContainerFluid>
        <h1>Sign in as an event host</h1>
        <ButtonWithBackdrop
        label="Continue"
        click={handleSubmit}
            open={open}
         />
         </ContainerFluid>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.image}></Grid>
      </Grid>
    </div>
  }
  return (
    <>
    <Container title='Create event' className={classes.container}>
   {renderEvents}
    </Container>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.userId ? state.auth.userId : [],
  };
};

export default connect(mapStateToProps)(CreateEventPage)