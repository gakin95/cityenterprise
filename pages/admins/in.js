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
  Grid,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import { useRouter } from "next/router";
import useTable from "../../components/tables/useTable";
import Input from "../../components/input/input";
import DashboardContainer from "../../components/dashboards/adminAndCso/dashboard";
import { todaysSignups,AllEvents, AllServices, allUsers} from "../../src/services/admin";
import { fetchAllUnreadMessages } from "../../src/services/contact";
import CustomizedCard from "../../components/card/admin";
import { baseUrl } from "../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: 200,
    // height: 100,
  },
  btn: {
    border: "10px solid white",
    [theme.breakpoints.down("xs")]: {
      width: "50%",
    },
  },
  button: {
    color: "white",
  },
  title: {
    fontSize: 14,
    color: "white",
  },
  pos: {
    marginBottom: 12,
  },
  pageContent: {
    //margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  users: {
    backgroundColor: "#F0C238",
  },
  host: {
    backgroundColor: "#F0693C",
  },
  vendor: {
    backgroundColor: "#F03A5B",
  },
  cso: {
    backgroundColor: "#8D5002",
  },
  token:{
    color:'#F0C238'
  },
  event:{
    color:"#F0693C"
  },
  service:{
    color:"#F03A5B"
  },
  unreadmessages:{
    color:'#8D5002'
  }
}));

const headCells = [
  { id: "image", label: "" },
  { id: "fullName", label: "Name" },
  { id: "email", label: "Email address (personal)" },
  { id: "business_name", label: "Business_name" },
  { id: "Role", label: "Role" },
  { id: "mobile", label: "Mobile number" },
  { id: "Status", label: "Status" },
  { id: "button", label: "", disableSorting: true },
];

function AdminsDashboard() {
  const router = useRouter();
  const classes = useStyles();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [message, setMessage] = useState("");
  const [signups, setSignups] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);
  const [users, setUsers] = useState(0);
  const [events, setEvents] = useState(0);
  const [services, setServices] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0)

  useEffect(() => {
    fetchSignups();
    AllUser();
    allEvents();
    allservices();
    unAttendedMeesages()
  }, []);

  const AllUser = async () => {
    const token = localStorage.getItem("token");
    if (token){
      const response = await allUsers(token);
      console.log('usere....,.',response)
      if (response && response.data){
        setUsers(response.data.length);
        setTotalUsers(response.data)
      }
    }
  };

  const allEvents = async () => {
    const token = localStorage.getItem("token");
    if (token){
      const response = await AllEvents(token);
      console.log('events....,.',response)
      if (response && response.data){
        setEvents(response.data.length);
      }
    }
  };

  const allservices = async () => {
    const token = localStorage.getItem("token");
    if (token){
      const response = await AllServices(token);
      if (response && response.data){
        setServices(response.data.length);
      }
    }
  };

  const unAttendedMeesages = async () => {
    const token = localStorage.getItem("token");
    if (token){
      const response = await fetchAllUnreadMessages(token);
      if (response && response.data){
        setUnreadMessages(response.data.length);
      }
    }
  };

  const category = [];
  console.log('category',category)

  for (const data of totalUsers) {
    if (totalUsers.length > 0){
      category.push(data.Role.name)
    }
  }

  const hosts = category.filter(element => element === "Event Host");
  const vendors = category.filter(element => element === "Vendor");
  const Cso = category.filter(element => element === "Customer Service");
  console.log('category....',category)


  const fetchSignups = async () => {
    setOpenBackdrop(true);
    const token = localStorage.getItem("token");
    if (token) {
      const response = await todaysSignups(token);
      console.log("respo", response);
      if (response && response.data) {
        setMessage(response.message);
        setOpenBackdrop(response.isLoading);
        console.log('===================================',response.isLoading)
        setSignups(
          response.data.map((item) => {
            return {
              id: item.id,
              fullName: `${item.firstName} ${item.lastName}`,
              email: item.email,
              business_name: item.business_name,
              status: item.isEmailVerified ? "active" : "pending",
              mobile: item.phone,
              role: item.Role.name,
              image: item.profile_picture,
              type_of_business: item.type_of_business,
            };
          })
        );
      }
      if (response.status === "Not found") {
        setOpenBackdrop(response.isLoading);
        setMessage(response.message);
      }
      if (response.message === "Access denied") {
        setOpenBackdrop(response.isLoading);
        setMessage(response.message);
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
  } = useTable(signups, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.fullName.toLowerCase().includes(target.value)
          );
      },
    });
  };
  let content = null;
  if (signups && signups.length > 0) {
    content = (
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Input
            label="Search users"
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
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Avatar alt={item.fullName} src={baseUrl + item.image} />
                </TableCell>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.business_name}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell onClick={() => router.push(`./user/${item.id}`)}>
                  View
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
      <Paper className={classes.pageContent}>
        <h1 style={{ textAlign: "center" }}>{message}</h1>
      </Paper>
    );
  }

  return (
    <DashboardContainer openBackDrop={openBackdrop}>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12} sm={3} md={3}>
          <CustomizedCard
            Title="Total users"
            Total={users}
            className={classes.users}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <CustomizedCard
            Title="Event host"
            Total={hosts.length}
            className={classes.host}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <CustomizedCard
            Title="Vendors"
            Total={vendors.length}
            className={classes.vendor}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <CustomizedCard
            Title="CSO"
            Total={Cso.length}
            className={classes.cso}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <CustomizedCard
            Title="All events"
            Total={events}
            changeColor={classes.event}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <CustomizedCard
            Title="All services"
            Total={services}
            changeColor={classes.service}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <CustomizedCard
            Title="Total discount token"
            Total={discount}
            changeColor={classes.token}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <CustomizedCard
            Title="Unread messages"
            Total={unreadMessages}
            changeColor={classes.unreadmessages}
          />
        </Grid>
        <Grid item xs={12} md={12} className={classes.paperdiv}>
          <h3 className={classes.paperdiv}>Today's signup</h3>
          {content}
        </Grid>
      </Grid>
    </DashboardContainer>
  );
}

export default AdminsDashboard;
