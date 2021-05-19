import { useState, useEffect } from "react";
import clsx from "clsx";
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
  TextField,
  Container,
  InputLabel,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { Search } from "@material-ui/icons";
import useTable from "../../components/tables/useTable";
import Input from "../../components/input/input";
import DashboardContainer from "../../components/dashboards/adminAndCso/dashboard";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { UploadFile, MyDialog, MyCustomButton } from "../../common";
import Avatar from "@material-ui/core/Avatar";
import { useRouter } from "next/router";
import CustomizedSnackbars from "../../components/createEvents/action/sticker";
import {
  isValidEmail,
  isValidPassword,
  isValidFirstName,
  isValidLastName,
  isValidPhoneNumber,
} from "../../src/helpers/validator";
import {
  allUsers,
  fetchRoles,
  createAdminsAndCso,
} from "../../src/services/admin";
import { baseUrl } from "../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "24ch",
      [theme.breakpoints.down('sm')]:{
        width: "36ch",
      }
    },
  },

  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "70%",
    height: 40,
  },
  tool: {
    display: "flex",
    justifyContent: "space-between",
  },
  users: {
    width: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "flex-start",
      width: "100%",
    },
  },

  userbox: {
    border: "10px solid white",
    width: 500,
    height: 150,
    backgroundColor: "whitesmoke",
    padding: 20,
    cursor: "pointer",
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  active: {
    backgroundColor: theme.palette.primary.dark,
    color: "white",
  },

  line: {
    width: "100%",
    height: 3,
    backgroundColor: theme.palette.primary.main,
    marginTop: 20,
  },
  button: {
    height: 40,
    width: "25%",
    margin: "auto",
    border: "none",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    borderRadius: 3,
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  filter: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: 30,
  },
  searchfield: {
    width: 500,
  },
  formControl: {
    margin: theme.spacing(1),
    width: "24ch",
    [theme.breakpoints.down('sm')]:{
      width: "36ch",
    }
  },
  filtertitle: {
    width: 200,
    display: "flex",
    justifyContent: "space-between",
  },
}));

const headCells = [
  { id: "image", label: "" },
  { id: "fullName", label: "Name" },
  { id: "email", label: "Email address" },
  { id: "business_name", label: "Business_name" },
  { id: "type_of_business", label: "Type of business" },
  { id: "Role", label: "Role" },
  { id: "mobile", label: "Mobile" },
  { id: "Status", label: "Status" },
  { id: "button", label: "", disableSorting: true },
];

function AdminsDashboard() {
  const router = useRouter();
  const classes = useStyles();
  const [progress, setProgress] = useState(false);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [page, setPage] = useState("table");
  const [role, setRole] = useState([]);
  const [category, setCategory] = useState("Select user");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    phone: "",
    roleId: "",
    password: "",
    retype: "",
  });
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [openDialog, setOpenDialog] = useState();
  const [message, setMessage] = useState("");
  const [signups, setSignups] = useState([]);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const [positiveDialog, setPositiveDialog] = useState();
  const [info, setInfo] = useState(null);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchSignups();
    getRoles();
  }, []);
  const fetchSignups = async () => {
    setOpenBackdrop(true);
    const token = localStorage.getItem("token");
    if (token) {
      const response = await allUsers(token);
      if (response && response.data) {
        setMessage(response.message);
        setOpenBackdrop(response.isLoading);
        setSignups(
          response.data.map((item) => {
            return {
              id: item.id,
              fullName: `${item.firstName} ${item.lastName}`,
              email: item.email,
              business_name: item.business_name,
              status: item.isEmailVerified ? "active" : "pending",
              mobile: item.phone,
              role: item.Role.name,
              image: item.profile_picture,
              type_of_business: item.type_of_business,
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

  const getRoles = async () => {
    const token = localStorage.getItem("token");
    const response = await fetchRoles(token);
    console.log("roles....", response);
    if (response && response.data) {
      setRole(
        response.data.map((item) => {
          return {
            id: item.id,
            name: item.name,
          };
        })
      );
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
  } = useTable(signups, headCells, filterFn);

  const handleAddImageClick = (event) => {
    event.stopPropagation();
    let fileInput = event.target.getElementsByTagName("input")[0];
    fileInput.click();
  };
  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.fullName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const validateSignup = () => {
    const {
      firstName,
      lastName,
       phone,
       email,
       password,
       retype
    } = user;
    if (!isValidFirstName(firstName.trim()) || firstName.length < 2) {
      setErr('firstName');
      setMsg("Invalid first name");
      return;
    }
    if (!isValidLastName(lastName.trim()) || lastName.length < 2) {
      setErr('lastName');
      setMsg("Invalid last name");
      return;
    }
    if (!isValidEmail(email)) {
      setErr('email');
      setMsg("Invalid email");
      return;
    }
    if (!isValidPhoneNumber(phone.trim()) || phone.length < 8) {
      setErr('phone');
      setMsg("Invalid phone number");
      return;
    }
    if (category === "Select user") {
      setErr('category');
      setMsg("Select a valid user");
      return;
    }
    if (uploadImage === null) {
      setErr('upload');
      setMsg("You Must Upload an Image");
      return;
    }
    if (!isValidPassword(password.trim()) || password.length < 4) {
      setErr('password');
      setMsg("Invalid password");
      return;
    }
    if (
      !isValidPassword(retype.trim()) ||
      retype.length < 4
    ) {
      setErr('retype');
      setMsg("Invalid password");
      return;
    }
    if (password.trim() !== retype.trim()) {
      setErr('retype');
      setMsg("Password does not match");
      return;
    }
    return true
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (validateSignup()){
      setProgress(true);
      setErr('');
      setMsg("");
      const response = await createAdminsAndCso(token,user,category,uploadImage);
      if (response && response.status){
        setProgress(false);
        setOpen(true);
        setSuccess(response.status === "success" ? true : false);
        setInfo(response.message);
        if (response.status === "success") {
         setUser({
          firstName: "",
          lastName: "",
          middleName: "",
          email: "",
          phone: "",
          roleId: "",
          password: "",
          retype: "",
         });
         setCategory("Select user");
         setUploadImage(null)
        }
      }
    }
  };

  let content = null;
  if (signups && signups.length > 0) {
    content = (
      <Paper className={classes.pageContent}>
        <div className={classes.filter}>
          <div className={classes.filtertitle}>
            {/* <h4>Filter By</h4> */}
          </div>
          <div className={classes.searchfield}>
            <Toolbar>
              <Input
                label="Search users"
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
        </div>

        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Avatar alt={item.fullName} src={baseUrl + item.image} />
                </TableCell>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.business_name}</TableCell>
                <TableCell>{item.type_of_business}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell onClick= {() => router.push(`./user/${item.id}`)} >Veiw</TableCell>
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
        <h1 style={{ textAlign: "center" }}>{message}</h1>
      </Paper>
    );
  }

  return (
    <DashboardContainer openBackDrop={openBackdrop}>
       <CustomizedSnackbars
        message={info}
        open={open}
        success={success}
        handleClose={handleClose}
      />
      <div>
        <h3>User Management</h3>
        <div className={classes.users}>
          <div
            onClick={() => setPage("table")}
            className={clsx(
              classes.userbox,
              page === "table" && classes.active
            )}
          >
            <h4>All Users</h4>
            <p>{signups.length}</p>
          </div>
          <div
            onClick={() => setPage("form")}
            className={clsx(classes.userbox, page === "form" && classes.active)}
          >
            <h4>Create User</h4>
          </div>
        </div>
      </div>
      <div className={classes.line}></div>
      {page === "table" && <div>{content}</div>}
      {page === "form" && (
        <div >
          <MyDialog
            title={dialogTitle}
            openDialog={openDialog}
            positiveDialog={positiveDialog}
            onClose={() => setOpenDialog(false)}
          >
            {dialogMessage}
          </MyDialog>
          <Paper>
            <Container>
              <Grid container spacing={3}>
                <Grid item xs={12}  md={9}>
                  <form className={classes.root} noValidate autoComplete="off">
                    <div>
                      <TextField
                        required
                        id="firstname"
                        label="First Name"
                        placeholder="Enter your first name"
                        variant="outlined"
                        value={user.firstName}
                        onChange={(e) =>
                          setUser({ ...user, firstName: e.target.value })
                        }
                        error={err === "firstName"}
                        helperText={err === "firstName" && msg}
                        autoFocus
                      />
                      <TextField
                        aria-required
                        id="lastName"
                        label="Last Name"
                        placeholder="Enter your last name"
                        variant="outlined"
                        value={user.lastName}
                        onChange={(e) =>
                          setUser({ ...user, lastName: e.target.value })
                        }
                        error={err === "lastName"}
                        helperText={err === "lastName" && msg}
                        autoFocus
                      />
                      <TextField
                        aria-required
                        id="outlined-disabled"
                        label="Middle Name"
                        placeholder="Enter your last name"
                        variant="outlined"
                        value={user.middleName}
                        onChange={(e) =>
                          setUser({ ...user, middleName: e.target.value })
                        }
                        error={err === "middleName"}
                        helperText={err === "middleName" && msg}
                        autoFocus
                      />
                      <TextField
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        variant="outlined"
                        value={user.email}
                        onChange={(e) =>
                          setUser({ ...user, email: e.target.value })
                        }
                        error={err === "email"}
                        helperText={err === "email" && msg}
                        autoFocus
                      />
                      <TextField
                        id="phone"
                        label="Phone number"
                        type="tel"
                        variant="outlined"
                        value={user.phone}
                        onChange={(e) =>
                          setUser({ ...user, phone: e.target.value })
                        }
                        error={err === "phone"}
                        helperText={err === "phone" && msg}
                        autoFocus
                      />
                       <FormControl className={classes.formControl}>
                        <Select
                          labelId="category"
                          id="category"
                          variant="outlined"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          fullWidth
                        >
                          <MenuItem value="Select user">Select user</MenuItem>
                          {role.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                        <div style={{ color: "red" }}>
                      {err === "category" && msg}
                    </div>
                      </FormControl>
                      <TextField
                        id="outlinedinput"
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        variant="outlined"
                        value={user.password}
                        onChange={(e) =>
                          setUser({ ...user, password: e.target.value })
                        }
                        error={err === "password"}
                        helperText={err === "password" && msg}
                        autoFocus
                      />

                      <TextField
                        id="outlined-read-only-input"
                        label="Retype Password"
                        type="password"
                        placeholder="retype your password"
                        variant="outlined"
                        value={user.retype}
                        onChange={(e) =>
                          setUser({ ...user, retype: e.target.value })
                        }
                        error={err === "retype"}
                        helperText={err === "retype" && msg}
                        autoFocus
                      />
                      <div>
                      <UploadFile
                      image="/images/upload.png"
                      title="Upload image or photo"
                      text="Max file size (5MB)"
                      accept="image/*"
                      filename="image"
                      //style={{ marginLeft: 30 }}
                      onClick={handleAddImageClick}
                      backgroundImage={uploadImage}
                      setImage={(file) => {
                        setUploadImage(file);
                      }}
                    />
                    <div style={{ color: "red" }}>
                      {err === "upload" && msg}
                    </div>
                      </div>
                    </div>
                  </form>
                </Grid>
                <Grid item xs={12}>
                  <MyCustomButton progress={progress} className={classes.btn} onClick={handleSubmit}>
                    Create
                  </MyCustomButton>
                </Grid>
              </Grid>
            </Container>
          </Paper>
        </div>
      )}
    </DashboardContainer>
  );
}

export default AdminsDashboard;
