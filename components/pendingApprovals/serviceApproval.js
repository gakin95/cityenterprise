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
import { Search } from "@material-ui/icons";
import { useRouter } from "next/router";
import Avatar from '@material-ui/core/Avatar';
import Moment from "react-moment";

import useTable from "../tables/useTable";
import Input from "../input/input";

import { baseUrl } from "../../constants";
import { pendingServices } from "../../src/services/admin";
import Spinner from "../../common/Backdrop";
import { MyCustomButton } from "../../common";


const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
    height: 30,
  },
  serviceappr: {
    display: "flex",
    justifyContent: "space-between",
  },
  approvals: {
    display: "flex",
    justifyContent: "space-between",
  },
  label: {
    marginLeft: 30,
    color: "whitesmoke",
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
  { id: "price", label:'Price'},
  { id: "title",  label:"title"},
  { id: "category", label: "category"},
  { id: "Status", label: "Status" },
  { id: "Details", label: "Details", disableSorting: true },
  // { id: 'button', label: '', disableSorting: true },
];

function AdminsDashboard() {
  const classes = useStyles();
  const router = useRouter();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [message, setMessage] = useState(null);
  const [services, setServices] = useState([]);
 
  useEffect(() => {
    fetchPendingServices()
  },[]);

  const fetchPendingServices = async () => {
    setOpenBackdrop(true);
    const token = localStorage.getItem('token');
    if (token) {
        const response = await pendingServices(token);
        console.log(response)
        if (response && response.data) {
            setMessage(response.message);
            setOpenBackdrop(response.isLoading);
            setServices(
                response.data.map(item => {
                    return {
                        id: item.id,
                        image: item.banner_image,
                        host_name: `${item.User.firstName} ${item.User.lastName}`,
                        business_name: item.User.business_name,
                        title: item.event_title,
                        category: item.vendorServiceCategory.name,
                        createdAt: item.createdAt,
                        phone:item.User.phone,
                        price:item.price
                    }
                })
            )
        };
        if (response.message === 'invalid token'){
            router.push('/')
          }
    } else {
        router.push('/signin')
    }
  }
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
            x.category.toLowerCase().includes(target.value)
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
      <div>
        <div className={classes.serviceappr}>
          <Toolbar>
            <Input
              label="Search by category"
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
               <TableCell><Avatar alt={item.host_name} src={baseUrl + item.image} /></TableCell>
             <TableCell>{item.host_name}</TableCell>
             <TableCell><Moment format="ddd, MMM Do,yy, hh:mm">{item.createdAt}</Moment></TableCell>
             <TableCell>₦{item.price}</TableCell>
             <TableCell>{item.title}</TableCell>
             <TableCell>{item.category}</TableCell>
             <TableCell>{item.phone}</TableCell>
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
      </div>
    );
  } else {
    content = (
      <Paper className={classes.pageContent}>
        {message && <h1 style={{ textAlign: "center" }}>{message}</h1>}
      </Paper>
    );
  }

  return (
    <div>
        <Spinner loading={openBackdrop}/>
      <div className={classes.approvals}></div>
      {content}
    </div>
  );
}

export default AdminsDashboard;
