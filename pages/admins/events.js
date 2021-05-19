import React, { useState, useEffect } from "react";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { Search } from "@material-ui/icons";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useRouter } from "next/router";
import Moment from "react-moment";

import useTable from "../../components/tables/useTable";
import Input from "../../components/input/input";
import DashboardContainer from "../../components/dashboards/adminAndCso/dashboard";
import { baseUrl } from "../../constants";
import { AllEvents } from "../../src/services/admin";
import { MyCustomButton } from "../../common";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
    fontSize: 12,
  },
  searchInput: {
    width: "75%",
  },
  event: {
    display: "flex",
    justifyContent: "space-between",
  },
  label: {
    marginLeft: 30,
    color: "grey",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    height: 20,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  filter: {
    display: "flex",
  },
  sortbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  view: {
    width: 50,
    cursor: "pointer",
  },
}));

const headCells = [
  { id: "image", label: "" },
  { id: "Name", label: "Host's Name" },
  { id: "title", label: "Event title" },
  { id: "category", label: "Category" },
  { id: "phone", label: "Phone" },
  { id: "Date", label: "Date Created" },
  { id: "Status", label: "Status" },
  { id: "Details", label: "Details", disableSorting: true },
];

function AdminsDashboard() {
  const classes = useStyles();
  const router = useRouter();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [message, setMessage] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEventsServices();
  }, []);

  const fetchEventsServices = async () => {
    setOpenBackdrop(true);
    const token = localStorage.getItem("token");
    if (token) {
      const response = await AllEvents(token);
      if (response && response.data) {
        setMessage(response.message);
        setOpenBackdrop(response.isLoading);
        setEvents(
          response.data.map((item) => {
            return {
              id: item.id,
              slug: item.slug,
              image: item.event_banner,
              host_name: `${item.User.firstName} ${item.User.lastName}`,
              business_name: item.User.business_name,
              title: item.event_title,
              category: item.eventCategory.name,
              createdAt: item.createdAt,
              status: item.isApproved,
              phone: item.User.phone,
              isLoading: false
            };
          })
        );
      }
      if (response.message === "invalid token") {
        router.push("/");
      }
    } else {
      router.push("/signin");
    }
  };

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(events, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.title.toLowerCase().includes(target.value)
          );
      },
    });
  };
  const handleClick = (slug) => {
   const tempEvents = [...events];
   const currentItem = tempEvents.find(item => item.slug === slug);
   const index = tempEvents.indexOf(currentItem);
   const event = tempEvents[index];
   event.isLoading = true;
   setEvents(() => tempEvents);
   setTimeout(() => {
     router.push(`./eventApproval/${slug}`)
   },1000)
  };

  let content = null;
  if (events && events.length) {
    content = (
      <Paper className={classes.pageContent}>
        <div className={classes.sortbar}>
          <Toolbar>
            <Input
              label="Search by title"
              className={classes.searchInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
            />
          </Toolbar>
        </div>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Avatar alt={item.host_name} src={baseUrl + item.image} />
                </TableCell>
                <TableCell>{item.host_name}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>
                  <Moment format="ddd, MMM Do,yy">{item.createdAt}</Moment>
                </TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <MyCustomButton
                    changeClass={true}
                    onClick={() => handleClick(item.slug)}
                    progress={item.isLoading}
                    className={classes.view}
                  >
                    {!item.isLoading && 'View'}
                  </MyCustomButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    );
  } else {
    content = (
      <div>
        {message && (
          <Paper className={classes.pageContent}>
            <h1 style={{ textAlign: "center" }}>{message}</h1>
          </Paper>
        )}
      </div>
    );
  }

  return (
    <DashboardContainer openBackDrop={openBackdrop}>
      <div className={classes.event}>
        <h3 className={classes.label}>Events</h3>
      </div>
      {content}
    </DashboardContainer>
  );
}

export default AdminsDashboard;
