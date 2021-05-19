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
import { Search } from "@material-ui/icons";
import useTable from "../tables/useTable";
import Input from "../input/input";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 1200,
    padding:'3rem',
    marginBottom:12
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
            x.category.toLowerCase().includes(target.value)
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
                  checked={item.isChecked}
                  onChange={(e) => {
                    let checked = e.target.checked
                    records.map(data => {
                      if(item.id === data.id){
                        data.isChecked = checked
                      }
                    })
                  }}
                 />
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
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
