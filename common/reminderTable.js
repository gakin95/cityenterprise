import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useRouter } from 'next/router';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
  action: {
    backgroundColor: "transparent",
    border: "none",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(event, location, date) {
  return {event, location, date};
}
const rows = [
    {
        id: "1",
        event:'Ride With The Giants',
       location: '12, Osborne Drive, Victoria Island Lagos',
        datetime: "14/10/2020 11:00PM",
      },
  {
    id: "2",
    event:'Ride With The Giants',
    location: '12, Osborne Drive, Victoria Island Lagos',
     datetime: "14/10/2020 11:00PM",
  },
  {
    id: "3",
    event:'Ride With The Giants',
    location: '12, Osborne Drive, Victoria Island Lagos',
     datetime: "14/10/2020 11:00PM",
  },
  {
    id: "4",
    event:'Ride With The Giants',
    location: '12, Osborne Drive, Victoria Island Lagos',
     datetime: "14/10/2020 11:00PM",
  },
  {
    id: "5",
    event:'Ride With The Giants',
    location: '12, Osborne Drive, Victoria Island Lagos',
     datetime: "14/10/2020 11:00PM",
  },
  {
    id: "6",
    event:'Ride With The Giants',
    location: '12, Osborne Drive, Victoria Island Lagos',
     datetime: "14/10/2020 11:00PM",
  },
  {
    id: "7",
    event:'Ride With The Giants',
    location: '12, Osborne Drive, Victoria Island Lagos',
     datetime: "14/10/2020 11:00PM",
  },
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
    const router= useRouter()
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>EVENT</StyledTableCell>
            <StyledTableCell>LOCATION</StyledTableCell>
            <StyledTableCell>DATE/TIME</StyledTableCell>           
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.event}
              </StyledTableCell>
              <StyledTableCell>{row.location}</StyledTableCell>
              <StyledTableCell onClick={() => console.log(console.log(row.id))} style={{cursor:'pointer'}} >{row.datetime}</StyledTableCell>
                           
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
