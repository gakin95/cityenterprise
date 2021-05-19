import React from "react";
import DashboardContainer from "../../../components/dashboards/adminAndCso/dashboard";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useRouter } from "next/router";
import { makeStyles, Paper, Grid, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backarrow: {
    cursor: "pointer",
  },
  button2: {
    display: "flex",
    justifyContent: "space-between",
  },
  activate: {
    width: "20%",
    backgroundColor: theme.palette.primary.main,
    height: 40,
    borderRadius: 5,
    border: "none",
    cursor: "pointer",
  },
  deactivate: {
    width: "20%",
    backgroundColor: "whitesmoke",
    height: 40,
    borderRadius: 5,
    border: "none",
    cursor: "pointer",
  },
}));

function AdminsDashboard() {
  const router = useRouter();
  const classes = useStyles();

  //  const viewpage = () => {
  return (
    <DashboardContainer>
      <KeyboardBackspaceIcon
        className={classes.backarrow}
        onClick={() => router.back("./newscontent")}
      />
      <h4>News Content</h4>
      <Paper>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} md={4}>
              <h6>Title</h6>
              <p>Lorem Ipsum dolor sit amet</p>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <h6>Status</h6>
              <p>Disabled</p>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <h6>Byline</h6>
              <p>Kunle Brown</p>
            </Grid>
            <Grid Item xs={12} sm={12} md={12}>
              <h4>News Content</h4>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet
              </p>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <div className={classes.button2}>
                <button className={classes.activate}>Activate</button>
                <button className={classes.deactivate}>Disabled</button>
                <button className={classes.deactivate}>Save as draft</button>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </DashboardContainer>
  );
}
export default AdminsDashboard;
