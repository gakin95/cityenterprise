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
import { useRouter } from "next/router";
import useTable from "../../../../components/tables/useTable";
import Input from "../../../../components/input/input";
import { Search } from "@material-ui/icons";
// import Checkbox from "../Attendees/checkbox";

const headCells = [
  { id: "name", label: "Name" },
  { id: "tokens", label: "Tokens",disableSorting: true },
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
  const classes = useStyles();
  const handleDialog = () => {
    setOpenDialog(true);
  };
  const [records, setRecords] = useState([
    {
      id: "1",
      name: "Climatechange lectures",
      token: "cityevents/token-discounts/432098",
      date: "10/10/2020",
    },
    {
      id: "2",
      name: "The pathway to empowerment",
      token: "cityevents/token-discounts/432098",
      date: "10/10/2020",
    },
    {
      id: "3",
       name: "Orion Exquisite Training",
       token: "cityevents/token-discounts/432098",
      date: "10/10/2020",
    },
    {
      id: "4",
      name: "Climatechange lectures",
      token: "cityevents/token-discounts/432098",
      date: "10/10/2020",
    },
    {
      id: "5",
      name: "The pathway to empowerment",
      token: "cityevents/token-discounts/432098",
      date: "10/10/2020",
    },
    {
      id: "6",
      name: "Orion Exquisite Training",
      token: "cityevents/token-discounts/432098",
      date: "10/10/2020",
    },
    {
      id: "7",
      name: "Climatechange lectures",
      token: "cityevents/token-discounts/432098",
      date: "10/10/2020",
    },
    {
      id: "8",
      name: "The pathway to empowerment",
      token: "cityevents/token-discounts/432098",
      date: "10/10/2020",
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
            x.name.toLowerCase().includes(target.value)
          );
      },
    });
  };

  return (
    <>
      {/* <div className={classes.notify}>
        <h3>ATTENDEES</h3>
      </div> */}
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
                  <Checkbox />
                </TableCell> */}
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.token}</TableCell>
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
