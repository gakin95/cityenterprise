// import React from "react";
// import { withStyles, makeStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import {Paper, Container} from "@material-ui/core";
// import EditIcon from "@material-ui/icons/Edit";
// import DeleteIcon from "@material-ui/icons/Delete";
// import { useRouter } from 'next/router';

// const StyledTableCell = withStyles((theme) => ({
//   head: {
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.common.white,
//   },
//   body: {
//     fontSize: 14,
//   },
//   action: {
//     backgroundColor: "transparent",
//     border: "none",
//   },
// }))(TableCell);

// const StyledTableRow = withStyles((theme) => ({
//   root: {
//     "&:nth-of-type(odd)": {
//       backgroundColor: theme.palette.action.hover,
//     },
//   },
// }))(TableRow);

//       const useStyles = makeStyles(theme => ({
//         table: {
//             marginTop: theme.spacing(2),
//             '& thead th': {
//                 fontWeight: '600',
//                 color: '#000',
//                 backgroundColor: '#BAB7B7',
//                 fontSize:14,
//                 height:70,
//             },
//             '& tbody td': {
//                 fontWeight: '400',
//                 fontSize:14,
//             },
//             '& tbody tr:hover': {
//                 backgroundColor: 'grey',
//                 cursor: 'pointer',
//             },
//         },
//         paper:{
//             padding:'3rem',
//             marginBottom:12
//         }
//     }))

// export default function CustomizedTables({category}) {
//     const router= useRouter()
//   const classes = useStyles();

//   return (
//     <TableContainer component={Paper} className={classes.paper}>
//         <h3>PHOTOGRAPHERS</h3>
//       <Table className={classes.table} aria-label="customized table">
//         <TableHead>
//           <TableRow>
//           <StyledTableCell>Select</StyledTableCell>
//             <StyledTableCell>Name</StyledTableCell>
//             <StyledTableCell>Mobile Number</StyledTableCell>
//             <StyledTableCell>Email</StyledTableCell>
//             </TableRow>
//         </TableHead>
//         <TableBody>
//           {category.map((row) => (
//             <StyledTableRow key={row.id}>
//                  <StyledTableCell>
//                 <input
//                   type='checkbox'
//                   name='select'
//                  />
//                 </StyledTableCell>
//               <StyledTableCell component="th" scope="row">
//                 {row.name}
//               </StyledTableCell>
//               <StyledTableCell>{row.mobilenumber}</StyledTableCell>
//               <StyledTableCell>{row.email}</StyledTableCell>
//             </StyledTableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }


import React, { useState } from "react";
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
import useTable from "../tables/useTable";
import Input from "../input/input";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 1200,
    padding:'3rem',
    marginBottom:12
  },
  btn: {
    border: "10px solid white",
    [theme.breakpoints.down("xs")]: {
      width: "50%",
    },
  },
  title: {
    fontSize: 14,
    color: "white",
  },
  pos: {
    marginBottom: 12,
  },
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
}));

const headCells = [
  { id: "check", label: "" },
  { id: "category", label: "Category" },
  { id: "fullName", label: "Name" },
  { id: "email", label: "Email Address (Personal)" },
  { id: "mobile", label: "Mobile Number" },
  { id: "Status", label: "Status", disableSorting: true },
  { id: "button", label: "", disableSorting: true },
];

function AdminsDashboard({records}) {
  const classes = useStyles();
  const [id, setId] = useState([]);
  const [isChecked, setChecked] = useState(false);
  console.log('...........id',id)
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
            x.vendorServiceCategory.name.toLowerCase().includes(target.value)
          );
      },
    });
  };
  let content = null;
  if (records && records.length > 0) {
    content = (
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Input
            label="Search Vendors by category"
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
        <TblContainer >
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell >
                <input
                  type='checkbox'
                  name='select'
                  checked={isChecked}
                  onChange={(e) => {
                    let checked = e.target.checked
                    const ids = id.push(item.id);
                    console.log(id)
                  }}
                 />
                </TableCell>
                <TableCell>{item.vendorServiceCategory.name}</TableCell>
                <TableCell>{`${item.User.firstName} ${item.User.lastName}`}</TableCell>
                <TableCell>{item.User.email}</TableCell>
                <TableCell>{item.User.phone}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>Veiw</TableCell>
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
        <h1 style={{ textAlign: "center" }}>There is no data available</h1>
      </Paper>
    );
  }

  return (
      <div className={classes.root}>
          {content}
      </div>
  );
}

export default AdminsDashboard;
