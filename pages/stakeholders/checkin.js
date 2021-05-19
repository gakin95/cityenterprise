import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import Moment from "react-moment";
import { useRouter } from "next/router";
import Checkbox from "@material-ui/core/Checkbox";

import HostandVendorDashBoard from "../../components/dashboards/eventHostAndVendor/dashboard";
import useTable from "../../components/tables/useTable";
import Input from "../../components/input/input";
import Message from "../../components/createEvents/action/sticker";
import { getMyApprovedEvents } from "../../src/services/eventServices";
import {
  getAllTicketsBought,
  checkInCustomer,
  reverseCheckInCustomer,
} from "../../src/services/ticket";
import { Spinner } from "../../common/Backdrop";

const headCells = [
  { id: "check", label: "Check in" },
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "ticketnumber", label: "Ticket number" },
  { id: "ticket_type", label: "Ticket type" },
  { id: "date", label: "Date" },
];

const useStyles = makeStyles((theme) => ({
  pageContent: {
    //margin: theme.spacing(5),
    padding: theme.spacing(3),
    fontSize: 12,
  },
  searchInput: {
    //width: "75%",
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

function CheckInCustomer() {
  const [events, setEvents] = useState([]);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");
  const [message, setMessage] = useState(null);
  const [records, setRecords] = useState([]);
  const [category, setCategory] = useState("Choose Event");
  const router = useRouter();
  const classes = useStyles();
  const fetchEvents = async () => {
    const token = localStorage.getItem("token");
    const response = await getMyApprovedEvents(token);
    if (response && response.data) {
      setEvents(
        response.data.map((event) => {
          return {
            id: event.id,
            image: event.event_banner,
            title: event.event_title,
            content: event.event_summary,
          };
        })
      );
    }
  };

  const checkInAttendees = async (id) => {
    const token = localStorage.getItem('token');
    const response = await checkInCustomer(token,category,id);
    console.log('cheked',response)
    if (response && response.data){
      setSuccess(response.status === 'success'?true:false);
      setMsg(response.message);
      setOpen(true);
    }
  }

  const reverseTicket = async (id) => {
    const token = localStorage.getItem('token');
    const response = await reverseCheckInCustomer(token,category,id);
    console.log('reverseCheckInCustomer',response)
    if (response && response.data){
      setSuccess(response.status === 'success'?true:false);
      setMsg(response.message);
      setOpen(true);
    }
  }

  const handleChange = (id) => event => {
    let  checked  = event.target.checked;
    const temItems = [...records];
    const selectedTicket = temItems.find(item=>item.id === id);
    const index = temItems.indexOf(selectedTicket);
    const ticket = temItems[index];
    ticket.isCheckedIn = checked;
    setRecords(() => [...temItems])
    console.log('selectedTicket',id,checked);
    if (checked){
      checkInAttendees(id)
    }else{
      reverseTicket(id)
    }
  };

  const tickets = async (id) => {
    setOpenBackdrop(true);
    const token = localStorage.getItem("token");
    const response = await getAllTicketsBought(token, id);
    if (response && response.data) {
      setOpenBackdrop(false);
      setRecords(
        response.data.map((item) => {
          return {
            key: item.id,
            id: item.id,
            isChecked: false,
            name: `${item.Attendee.firstName} ${item.Attendee.lastName}`,
            email: item.Attendee.email,
            phone: item.Attendee.phone,
            ticket_ref_no: item.ticket_ref_no,
            type: item.EventTicket.type_of_ticket,
            isCheckedIn: item.isCheckedIn,
            date: item.createdAt,
          };
        })
      );
      setMessage(response.message);
      console.log("tickets", response);
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
  } = useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.ticket_ref_no.toLowerCase().includes(target.value)
          );
      },
    });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  let content = null;
  if (records && records.length > 0) {
    content = (
      <div>
        <TblContainer>
          <TblHead />
          <TableBody  style={{overflowX:'auto'}}>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow
                key={item.id}
                className={item.isRead ? classes.read : null}
              >
                <TableCell>
                  <Checkbox
                    //disabled
                    checked={item.isCheckedIn}
                    onChange={handleChange(item.id)}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.ticket_ref_no}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>
                  <Moment format="D MMM YYYY">{item.date}</Moment>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </div>
    );
  } else {
    content = <h1 style={{ textAlign: "center" }}>{message}</h1>;
  }

  return (
    <div>
      <HostandVendorDashBoard>
        <Spinner loading={openBackdrop} />
        <Message open={open} message={msg} success={success} />
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
                  <MenuItem value="Choose Event">Choose event</MenuItem>
                  {events.map((item) => (
                    <MenuItem
                      key={item.id}
                      value={item.id}
                      onClick={() => tickets(item.id)}
                    >
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <Toolbar>
                <Input
                  label="Search by ticket No."
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
          {content}
        </Paper>
      </HostandVendorDashBoard>
    </div>
  );
}

export default CheckInCustomer;
