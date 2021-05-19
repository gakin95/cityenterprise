import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
// import EditIcon from "@material-ui/icons/Edit";
// import DeleteIcon from "@material-ui/icons/Delete";
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

function createData(sn, status, subject, lastUpdated) {
    return { sn, status, subject, lastUpdated };
  }
const rows = [
    {
        id: "1",
        sn:'#09882TY1',
        Status: 'Answered',
        subject: "Poor Organization",
        LastUpdated: "08/09/2020 (10:40)",
      },
  {
    id: "2",
    sn:'#09882TY2',
    Status: 'closed',
    subject: "Poor Organization",
    LastUpdated: "08/09/2020 (10:40)",
  },
  {
    id: "3",
    sn:'#09882TY3',
    Status: 'Answered',
    subject: "Poor Organization",
    LastUpdated: "08/09/2020 (10:40)",
  },
  {
    id: "4",
    sn:'#09882TY4',
    Status:'closed',
    subject: "Poor Organization",
    LastUpdated: "08/09/2020 (10:40)",
  },
  {
    id: "5",
    sn:'#09882TY5',
    Status:'Answered',
    subject: "Poor Organization",
    LastUpdated: "08/09/2020 (10:40)",
  },
  {
    id: "6",
    sn:'#09882TY6',
    Status: 'closed',
    subject: "Poor Organization",
    LastUpdated: "08/09/2020 (10:40)",
  },
  {
    id: "7",
    sn:'#09882TY7',
    Status: 'Answered',
    subject: "Poor Organization",
    LastUpdated: "08/09/2020 (10:40)",
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
          <StyledTableCell>SN</StyledTableCell>
            <StyledTableCell>Subject</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Last Updated</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.sn}
              </StyledTableCell>
              <StyledTableCell>{row.subject}</StyledTableCell>
              <StyledTableCell onClick={() => console.log(console.log(row.id))} style={{cursor:'pointer'}} >{row.Status}</StyledTableCell>
              <StyledTableCell>{row.LastUpdated}</StyledTableCell>
              {/* <StyledTableCell>{row.limit}</StyledTableCell>
              <StyledTableCell>{row.usage}</StyledTableCell>
              <StyledTableCell>
                <button
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                >
                  <EditIcon color="primary" style={{cursor:'pointer'}}onClick={() => router.push(`/stakeholders/${row.id}`)}/>
                </button>
                <button
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                >
                  <DeleteIcon color="error" />
                </button>
              </StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
