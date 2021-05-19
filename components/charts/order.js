import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { Divider } from "@material-ui/core";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";

import { Animation } from "@devexpress/dx-react-chart";

const useStyles = makeStyles((theme) => ({
  payment: {
    paddingLeft: 20,
    paddingTop: 20,
  },
  option: {
    padding: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: 300,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  indicator: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  nodata: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bg: {
    width: 32,
    height: 10,
    margin: 5,
    backgroundColor: "#FF7235",
  },
  revenue: {
    cursor: "pointer",
  },
  hourColor: {
    color: "#38B9F0",
  },
}));

const data = [
  { month: "jan", value: 50 },
  { month: "feb", value: 100 },
  { month: "mar", value: 150 },
  { month: "apr", value: 200 },
  { month: "may", value: 300 },
  { month: "june", value: 250 },
  { month: "july", value: 400 },
  { month: "aug", value: 1000 },
  { month: "sep", value: 1500 },
  { month: "oct", value: 600 },
  { month: "nov", value: 1700 },
  { month: "dec", value: 200 },
];

const Hours = [
  { hour: "1.00", value: 50 },
  { hour: "2.00", value: 100 },
  { hour: "3.00", value: 150 },
  { hour: "4.00", value: 200 },
  { hour: "5.00", value: 300 },
  { hour: "6.00", value: 250 },
  { hour: "7.00", value: 400 },
  { hour: "8.00", value: 1000 },
  { hour: "9.00", value: 1500 },
  { hour: "10.00", value: 600 },
  { hour: "11.00", value: 1700 },
  { hour: "12.00", value: 200 },
  { hour: "13.00", value: 150 },
  { hour: "14.00", value: 200 },
  { hour: "15.00", value: 300 },
  { hour: "16.00", value: 250 },
  { hour: "17.00", value: 400 },
  { hour: "18.00", value: 1000 },
  { hour: "19.00", value: 1500 },
  { hour: "20.00", value: 600 },
  { hour: "21.00", value: 1700 },
  { hour: "22.00", value: 200 },
  { hour: "23.00", value: 50 },
  { hour: "24.00", value: 100 },
];

const Days = [
  { day: "1.00", value: 50 },
  { day: "2.00", value: 100 },
  { day: "3.00", value: 150 },
  { day: "4.00", value: 200 },
  { day: "5.00", value: 300 },
  { day: "6.00", value: 250 },
  { day: "7.00", value: 400 },
];

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data ,
    };
  }

  render() {
    const { data : chartData } = this.state;

    return (
      <Paper>
        <Chart data={chartData}>
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries valueField="value" argumentField="month" />
          <Title text="Orders" />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}

export const HostCharts = () => {
  useEffect(() => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      setData(Hours);
    }, [1000]);
  }, []);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [showHours, setShowHours] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);
  const handleClickOneDay = (hours) => {
    setShowHours(true);
    if (hours === "12") {
      setOpen(true);
      setTimeout(() => {
        setPage(1);
        setOpen(false);
        setData(data.slice(0, 12));
      }, [1000]);
    } else {
      setOpen(true);
      setTimeout(() => {
        setPage(2);
        setOpen(false);
        setData([...Hours]);
      }, [1000]);
    }
  };
  const showWeek = () => {
    setOpen(true);
    setTimeout(() => {
      setPage(3);
      setOpen(false);
      setShowHours(false);
    }, [1000]);
  };
  const classes = useStyles();
  return (
    <div>
      <Paper>
        <h3 className={classes.payment}>Payments</h3>
        <Divider />
        <div className={classes.option}>
          <div
            className={clsx(classes.revenue, page === 1 && classes.hourColor)}
            onClick={() => handleClickOneDay("12")}
          >
            12 hours
          </div>
          <div
            className={clsx(classes.revenue, page === 2 && classes.hourColor)}
            onClick={() => handleClickOneDay("24")}
          >
            24 hours
          </div>
          <div
            className={clsx(classes.revenue, page === 3 && classes.hourColor)}
            onClick={showWeek}
          >
            Last 7 days
          </div>
        </div>
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className={classes.indicator}>
          <div className={classes.bg}></div>
          <div>Revenue</div>
        </div>
        {open && (
          <div className={classes.nodata}>
            <h1>Retriving data....</h1>
          </div>
        )}
        <div>
          {showHours && (
            <>
              {!open && (
                <>
                  {data.length > 0 ? (
                    <Chart data={data}>
                      <ArgumentAxis />
                      <ValueAxis max={7} />

                      <BarSeries
                        style={{ width: 20, fill: "#FF7235" }}
                        valueField="value"
                        argumentField="hour"
                      />
                      <Animation />
                    </Chart>
                  ) : (
                    <div className={classes.nodata}>
                      <h1>No data available</h1>
                    </div>
                  )}
                </>
              )}
            </>
          )}
          {!showHours && (
            <>
              {!open && (
                <>
                  {Days.length > 0 ? (
                    <Chart data={Days}>
                      <ArgumentAxis />
                      <ValueAxis max={7} />

                      <BarSeries
                        style={{ width: 20, fill: "#FF7235" }}
                        valueField="value"
                        argumentField="day"
                      />
                      <Animation />
                    </Chart>
                  ) : (
                    <div className={classes.nodata}>
                      <h1>No data available</h1>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </Paper>
    </div>
  );
};
