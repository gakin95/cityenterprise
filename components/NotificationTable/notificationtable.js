import React, { useState } from "react";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { useRouter } from "next/router";
import useTable from "../../components/tables/useTable";
import Input from "../../components/input/input";
import { Search } from "@material-ui/icons";

const headCells = [
  { id: "sn", label: "S/n" },
  { id: "eventhost", label: "Event Host", disableSorting: true },
  { id: "eventname", label: "Event Name" },
  { id: "message", label: "Message" },
  { id: "date", label: "Date" },
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  notify:{
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
      width:30,
      marginBottom:40,
  },
});

export default function CustomizedTables() {
  const router = useRouter();
  const classes = useStyles();
  const handleDialog = () => {
    setOpenDialog(true);
  };
  const [records, setRecords] = useState([
    {
      id: "1",
      sn: 1,
      eventhost: "Samir Leewandoski",
      eventname: "Better Together",
      message: "Please get in touch....",
      date: "20/10/2020",
    },
    {
      id: "2",
      sn: 2,
      eventhost: "Samir Leewandoski",
      eventname: "Better Together",
      message: "Please get in touch....",
      date: "20/10/2020",
    },
    {
      id: "3",
      sn: 3,
      eventhost: "Samir Leewandoski",
      eventname: "Better Together",
      message: "Please get in touch....",
      date: "20/10/2020",
    },
    {
      id: "4",
      sn: 4,
      eventhost: "Samir Leewandoski",
      eventname: "Better Together",
      message: "Please get in touch....",
      date: "20/10/2020",
    },
    {
      id: "5",
      sn: 5,
      eventhost: "Samir Leewandoski",
      eventname: "Better Together",
      message: "Please get in touch....",
      date: "20/10/2020",
    },
    {
      id: "6",
      sn: 6,
      eventhost: "Samir Leewandoski",
      eventname: "Better Together",
      message: "Please get in touch....",
      date: "20/10/2020",
    },
    {
      id: "7",
      sn: 7,
      eventhost: "Samir Leewandoski",
      eventname: "Better Together",
      message: "Please get in touch....",
      date: "20/10/2020",
    },
    {
      id: "8",
      sn: 8,
      eventhost: "Samir Leewandoski",
      eventname: "Better Together",
      message: "Please get in touch....",
      date: "20/10/2020",
    },
  ]);
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
            x.eventname.toLowerCase().includes(target.value)
          );
      },
    });
  };

  return (
      <>
      <div className={classes.notify}>
      <h3>Notifications</h3>
      <NotificationsNoneIcon />
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
              <TableCell>{item.sn}</TableCell>
              <TableCell >{item.eventhost}</TableCell>
              <TableCell>{item.eventname}</TableCell>
              <TableCell>{item.message}</TableCell>
              <TableCell>{item.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </Paper>
    </>
  );
}
