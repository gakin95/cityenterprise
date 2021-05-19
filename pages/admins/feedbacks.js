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
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Search } from "@material-ui/icons";
import {useRouter} from "next/router";

import useTable from "../../components/tables/useTable";
import Input from "../../components/input/input";
import DashboardContainer from "../../components/dashboards/adminAndCso/dashboard";
import Moment from "react-moment";


import {
  fetchAllContactMessage,
  fetchAllUnreadMessages,
} from "../../src/services/contact";

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
    color: "whitesmoke",
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
  action: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  view: {
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  read: {
    backgroundColor: "lightgrey",
  },
}));

const headCells = [
  { id: "sender", label: "Sender" },
  { id: "Company", label: "Company" },
  { id: "email", label: "Email" },
  { id: "Phone", label: "Phone" },
  { id: "Country", label: "Country" },
  { id: "messages", label: "Messages" },
  { id: "date", label: "Date" },
];

function AdminsDashboard() {
  const classes = useStyles();
  const router = useRouter();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [message, setMessage] = useState(null);
  const [records, setRecords] = useState([]);
  const [category, setCategory] = useState('Select type');
  const contactMessages = async () => {
    setOpenBackdrop(true);
    const token = localStorage.getItem("token");
    const response = await fetchAllContactMessage(token);
    if (response && response.data) {
      setOpenBackdrop(false);
      setMessage(response.message);
      setRecords(
        response.data.map((item) => {
          return {
            id: item.id,
            sender: `${item.firstName} ${item.lastName}`,
            company: item.company,
            email: item.email,
            phone: item.phone,
            country: item.country,
            message: item.message,
            isRead: item.isRead,
            date: item.createdAt,
          };
        })
      );
    }
    console.log("resp..contact................", response);
  };

  const unreadMessages = async () => {
    setOpenBackdrop(true);
    const token = localStorage.getItem("token");
    const response = await fetchAllUnreadMessages(token);
    if (response && response.data) {
      setOpenBackdrop(false);
      setMessage(response.message);
      setRecords(
        response.data.map((item) => {
          return {
            id: item.id,
            sender: `${item.firstName} ${item.lastName}`,
            company: item.company,
            email: item.email,
            phone: item.phone,
            country: item.country,
            message: item.message,
            date: item.createdAt,
          };
        })
      );
    }
  };

  useEffect(() => {
    contactMessages();
  }, []);

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
  } = useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.sender.toLowerCase().includes(target.value)
          );
      },
    });
  };
  let content = null;
  if (records && records.length > 0) {
    content = (
      <Paper className={classes.pageContent}>
        <div className={classes.action}>
          <div>
            <FormControl>
              <Select
                labelId="category"
                id="category"
                variant="outlined"
                 value={category}
                 onChange={(e) => setCategory(e.target.value)}
                fullWidth
              >
                <MenuItem value="Select type">Select type</MenuItem>
                <MenuItem value="all" onClick={() => contactMessages()}>All</MenuItem>
                <MenuItem value="unread" onClick={() => unreadMessages()}>Unread Messages</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <Toolbar>
              <Input
                label="Search by sender"
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
        </div>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow
              onClick={() => router.push(`./communication/${item.id}`)}
                key={item.id}
                className={item.isRead ? classes.read : null}
              >
                <TableCell>{item.sender}</TableCell>
                <TableCell>{item.company}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.country}</TableCell>
                <TableCell>
                  {item.message.substring(1, 30)}
                  {item.message.length > 30 && "..."}
                </TableCell>
                <TableCell>
                  <Moment format="D MMM YYYY">{item.date}</Moment>
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
            <div className={classes.action}>
          <div>
            <FormControl>
              <Select
                labelId="category"
                id="category"
                variant="outlined"
                 value={category}
                 onChange={(e) => setCategory(e.target.value)}
                fullWidth
              >
                <MenuItem value="Select type">Select type</MenuItem>
                <MenuItem value="all" onClick={() => contactMessages()}>All</MenuItem>
                <MenuItem value="unread" onClick={() => unreadMessages()}>Unread Messages</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <Toolbar>
              <Input
                label="Search by date"
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
        </div>
            <h1 style={{ textAlign: "center" }}>{message}</h1>
          </Paper>
        )}
      </div>
    );
  }

  return (
    <DashboardContainer openBackDrop={openBackdrop}>
      <div className={classes.event}>
        <h3 className={classes.label}>Log FeedBack</h3>
      </div>
      {content}
    </DashboardContainer>
  );
}

export default AdminsDashboard;
