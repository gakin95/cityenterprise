import React, { useState, useEffect } from "react";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import { useRouter } from "next/router";
import useTable from "../tables/useTable";
import Input from "../input/input";
import { Search } from "@material-ui/icons";
import Moment from 'react-moment';
import Checkbox from "./checkbox";
import { getAllAttendees } from "../../src/services/ticket";

const headCells = [
  { id: "name", label: "Name" },
  // { id: "email", label: "email" },
  { id: "phone", label: "phone" },
  { id: "number_of_tickets", label: "number" },
  { id: "payment_method", label: "payment method" },
  { id: "amount_paid", label: "amount paid" },
  { id: "ticketnumber", label: "Ticket Details" },
  { id: "date", label: "Date" },
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  notify: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: 30,
    marginBottom: 40,
  },
});

export default function CustomizedTables() {
  const router = useRouter();
  const id = router.query.attendees;
  const [attendees, setAttendees] = useState([]);
  const classes = useStyles();

  const getData = async () => {
    const token = localStorage.getItem("token");
    const response = await getAllAttendees(token, id);
    if (response && response.data) {
      setAttendees(
        response.data.map((item) => {
          return {
            key: item.id,
            id: item.id,
            slug: event.slug,
            fullName: `${item.firstName} ${item.lastName}`,
            phone: item.phone,
            amount_paid: `₦${item.amount_paid}`,
            no_of_tickets_bought: item.no_of_tickets_bought,
            payment_method: item.payment_method,
            createdAt: item.createdAt,
            AttendeeTickets: item.AttendeeTickets,
          };
        })
      );
    }
    console.log("response.............", response);
  };

  useEffect(() => {
    getData();
  }, [router]);

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
  } = useTable(attendees, headCells, filterFn);

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

  return (
    <>
      <div className={classes.notify}>
        <h3>ATTENDEES</h3>
      </div>
      <Paper>
        <Toolbar>
          <Input
            label="Search Users"
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
                {/* <TableCell>
                  <Checkbox id={item.id}/>
                </TableCell> */}
                <TableCell>{item.fullName}</TableCell>
                {/* <TableCell>{item.ticketnumber}</TableCell> */}
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.no_of_tickets_bought}</TableCell>
                <TableCell>{item.payment_method}</TableCell>
                <TableCell >{item.amount_paid}</TableCell>
                <TableCell>
                  <div>
                    <ul>
                      {item.AttendeeTickets.map(e => <li key={e.id}>
                        <h5>{e.EventTicket.type_of_ticket}</h5>
                      <h6>ticket ref no: {e.ticket_ref_no}</h6>
                      </li>)}
                    </ul>
                  </div>
                </TableCell>
                <TableCell><Moment format="D MMM YYYY">{item.createdAt}</Moment></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    </>
  );
}
