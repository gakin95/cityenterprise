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
import Avatar from "@material-ui/core/Avatar";
import { useRouter } from "next/router";
import Moment from "react-moment";
import useTable from "../tables/useTable";
import Input from "../input/input";
import { baseUrl } from "../../constants";
import { pendingEvents } from "../../src/services/admin";
import { MyCustomButton } from "../../common";
import Spinner from "../../common/Backdrop";

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
  view: {
    width: 50,
    cursor: "pointer",
  },
  action: {
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
  },
}));

const headCells = [
  { id: "image", label: "" },
  { id: "Name", label: "Host's name" },
  { id: "title", label: "Event title" },
  { id: "category", label: "Category" },
  { id: "phone", label: "Phone" },
  { id: "Date", label: "Date created" },
  { id: "Details", label: "Details", disableSorting: true },
];

function AdminsDashboard() {
  const router = useRouter();
  const classes = useStyles();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [message, setMessage] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEventsServices();
  }, []);

  const fetchEventsServices = async () => {
    setOpenBackdrop(true);
    const token = localStorage.getItem("token");
    if (token) {
      const response = await pendingEvents(token);
      console.log("respo", response);
      if (response && response.data) {
        setMessage(response.data>0?response.message:'There is no event awaiting approval');
        setOpenBackdrop(response.isLoading);
        setEvents(
          response.data.map((item) => {
            return {
              id: item.id,
              slug: item.slug,
              image: item.event_banner,
              host_name: `${item.User.firstName} ${item.User.lastName}`,
              business_name: item.User.business_name,
              title: item.event_title,
              category: item.eventCategory.name,
              createdAt: item.createdAt,
              phone: item.User.phone,
              isLoading: false
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
  } = useTable(events, headCells, filterFn);

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
  const handleClick = (slug) => {
    const tempEvents = [...events];
    const currentItem = tempEvents.find(item => item.slug === slug);
    const index = tempEvents.indexOf(currentItem);
    const event = tempEvents[index];
    event.isLoading = true;
    setEvents(() => tempEvents);
    setTimeout(() => {
      router.push(`./eventApproval/${slug}`)
    },1000)
   };
  let content = null;
  if (events && events.length > 0) {
    content = (
      <div>
        <div className={classes.serviceappr}>
          {/* <h4>Event approval</h4> */}
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
                <TableCell>
                  <Avatar alt={item.host_name} src={baseUrl + item.image} />
                </TableCell>
                <TableCell>{item.host_name}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>
                  <Moment format="ddd, MMM Do,yy">{item.createdAt}</Moment>
                </TableCell>
                <TableCell>
                <MyCustomButton
                    changeClass={true}
                    onClick={() => handleClick(item.slug)}
                    progress={item.isLoading}
                    className={classes.view}
                  >
                    {!item.isLoading && 'View'}
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
    <div>
      <Spinner loading={openBackdrop} />
      <div className={classes.approvals}>
      </div>
      {content}
    </div>
  );
}

export default AdminsDashboard;
