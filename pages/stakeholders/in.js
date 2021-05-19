import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import HostandVendorDashBoard from "../../components/dashboards/eventHostAndVendor/dashboard";
import Card from "../../components/card/card";
import HostCard from "../../components/card/host";
import Chart from "../../components/charts/order";
import { HostCharts } from '../../components/charts/order'
import { connect } from "react-redux";
import * as actions from "../../src/store/actions";

const useStyles = makeStyles((theme) => ({
  root: {},
  services: {
    backgroundColor: "#00A4ED",
  },
  profit: {
    backgroundColor: "#ED8900",
  },
  totalorder: {
    backgroundColor: "#B94AFF",
  },
  neworder: {
    backgroundColor: "#27D927",
  },
  sold: {
    backgroundColor: "#F0CB38",
  },
  revenue: {
    backgroundColor: "#38B9F0",
  },
  sales: {
    background: '#F1F1F1 0% 0% no-repeat padding-box',
    padding:12
  }
}));

function In(props) {
  const { onGetProfile, currentUser, onLogout, error } = props;
  const classes = useStyles();
  return (
    <div>
      <HostandVendorDashBoard>
        {currentUser.roleId === 131 && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <HostCard
                className={classes.sold}
                Title="Total quantity sold"
                Total="1"
                description="This number includes all tickets sold on City events platform"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <HostCard
                className={classes.revenue}
                Title="Revenue"
                Total="NGN50,000"
                description="This number includes all tickets sold on City events platform"
              />
            </Grid>
            <Grid item xs={12}>
                <HostCharts />
            </Grid>
            {/* <Grid item xs={12}>
                <div className={classes.sales}>
                    <h3>Sales from Online</h3>
                    <div>Under  construction</div>
                </div>
            </Grid> */}
          </Grid>
        )}
        {currentUser.roleId === 121 && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                className={classes.services}
                Title="Total Services"
                TotalPayment="50"
              >
                <img src="/images/service.png" alt="ser" />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                className={classes.profit}
                Title="Total Profit"
                TotalPayment="₦50,000"
              >
                <img src="/images/profit.png" alt="ser" />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                className={classes.totalorder}
                Title="Total Orders"
                TotalPayment="105"
              >
                <img src="/images/order.png" alt="ser" />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                className={classes.neworder}
                Title="New Orders"
                TotalPayment="320"
              >
                <img src="/images/neworder.png" alt="ser" />
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Chart />
            </Grid>
          </Grid>
        )}
      </HostandVendorDashBoard>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    currentUser: state.auth.userId ? state.auth.userId : [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetProfile: (token) => dispatch(actions.profile(token)),
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(In);
