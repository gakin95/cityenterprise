import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
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

function createData(name, mobilenumber, email, status) {
    return { name, mobilenumber, email, status};
  }
const rows = [
            {
          id: "1",
         name:'JAMES ALLEN',
          mobilenumber: "234-0803-011-1111",
          email: "xyz@demo.ail",
          status: "",
        },
        {
          id: "2",
          name:'JAMES ALLEN',
           mobilenumber: "234-0803-011-1111",
           email: "xyz@demo.ail",
           status: "",
        },
        {
          id: "3",
         name:'JAMES ALLEN',
          mobilenumber: "234-0803-011-1111",
          email: "xyz@demo.ail",
          status: "",
        },
        {
          id: "4",
         name:'JAMES ALLEN',
          mobilenumber: "234-0803-011-1111",
          email: "xyz@demo.ail",
          status: "",
        },
        {
          id: "5",
          name:'JAMES ALLEN',
           mobilenumber: "234-0803-011-1111",
           email: "xyz@demo.ail",
           status: "",
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
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Mobile Number</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Select</StyledTableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell>{row.mobilenumber}</StyledTableCell>
              <StyledTableCell>{row.email}</StyledTableCell>
                 <StyledTableCell>
                <input
                  type='checkbox'
                  name='select'
                 />
                </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
