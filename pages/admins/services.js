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
import Avatar from "@material-ui/core/Avatar";
import { Search } from "@material-ui/icons";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useRouter } from "next/router";
import Moment from "react-moment";
import useTable from "../../components/tables/useTable";
import Input from "../../components/input/input";
import DashboardContainer from "../../components/dashboards/adminAndCso/dashboard";
import { baseUrl } from "../../constants";
import { AllServices } from "../../src/services/admin";
import { MyCustomButton } from "../../common";

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
    color: "grey",
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
  view: {
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  action: {
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    "&:hover": {
      background: "#F06F38",
      color: "#fff",
    },
  },
  view: {
    width: 50,
    cursor: "pointer",
  },
}));

const headCells = [
  { id: "image", label: "" },
  { id: "Vendor", label: "Vendor's Name" },
  { id: "Date", label: "Date Created" },
  { id: "price", label: "Price" },
  { id: "title", label: "title" },
  { id: "category", label: "category" },
  { id: "Status", label: "Status" },
  { id: "Details", label: "Details", disableSorting: true },
];

function AdminsDashboard() {
  const classes = useStyles();
  const router = useRouter();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [message, setMessage] = useState(null);
  const [services, setServices] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchAllServices();
  }, []);

  const fetchAllServices = async () => {
    setOpenBackdrop(true);
    const token = localStorage.getItem("token");
    if (token) {
      const response = await AllServices(token);
      console.log(response);
      if (response && response.data) {
        setMessage(response.message);
        setOpenBackdrop(response.isLoading);
        setServices(
          response.data.map((item) => {
            return {
              id: item.id,
              image: item.banner_image,
              host_name: `${item.User.firstName} ${item.User.lastName}`,
              business_name: item.User.business_name,
              title: item.event_title,
              category: item.vendorServiceCategory.name,
              createdAt: item.createdAt,
              status: item.approval_status,
              price: item.price,
              isLoading: false,
            };
          })
        );
      }
      if (response.message === "invalid token") {
        router.push("/");
      }
    } else {
      router.push("/signin");
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
  } = useTable(services, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.title.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const handleClick = (id) => {
    const tempServices = [...services];
    const currentItem = tempServices.find((item) => item.id === id);
    const index = tempServices.indexOf(currentItem);
    const service = tempServices[index];
    service.isLoading = true;
    setServices(() => tempServices);
    setTimeout(() => {
      router.push(`/admins/serviceApproval/${id}`);
    }, 1000);
  };

  let content = null;
  if (services && services.length) {
    content = (
      <Paper className={classes.pageContent}>
        <div className={classes.sortbar}>
          <div className={classes.filter}>
            {/* <h4>Filter By</h4>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">
                Services
              </InputLabel>
              <Select
                native
                //   value={state.age}
                //   onChange={handleChange}
                label="Services"
                inputProps={{
                  name: "services",
                  id: "outlined-age-native-simple",
                }}
              >
                <option aria-label="None" value="allEvents" />
                <option value="allEvents">All Events</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </Select>
            </FormControl> */}
          </div>
          <Toolbar>
            <Input
              label="Search by title"
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
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Avatar alt={item.host_name} src={baseUrl + item.image} />
                </TableCell>
                <TableCell>{item.host_name}</TableCell>
                <TableCell>
                  <Moment>{item.createdAt}</Moment>
                </TableCell>
                <TableCell>₦{item.price}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <MyCustomButton
                    changeClass={true}
                    onClick={() => handleClick(item.id)}
                    progress={item.isLoading}
                    className={classes.view}
                  >
                    {!item.isLoading && "View"}
                  </MyCustomButton>
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
            <h1 style={{ textAlign: "center" }}>{message}</h1>
          </Paper>
        )}
      </div>
    );
  }

  return (
    <DashboardContainer openBackDrop={openBackdrop}>
      <div className={classes.event}>
        <h3 className={classes.label}>Events</h3>
      </div>
      {content}
    </DashboardContainer>
  );
}

export default AdminsDashboard;
