import { useState } from "react";
import clsx from "clsx";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import { useRouter } from "next/router";
import { Editor } from "@tinymce/tinymce-react";
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
import { Search, Title } from "@material-ui/icons";
import useTable from "../../components/tables/useTable";
import Input from "../../components/input/input";
import DashboardContainer from "../../components/dashboards/adminAndCso/dashboard";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  UploadFile,
  MyDialog,
  Contact,
  ButtonWithBackdrop,
} from "../../common";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "24ch",
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
  formControl: {
    //width: "100%",
    size: "small",
    fontSize: 12,
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
      width: "400px",
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
    width: '100%',
    paddingBottom: 30,
     },
  searchfield: {
        width: 500,
  },
  filtertitle:{
    width: 200,
    display: "flex",
    justifyContent: "space-between",
  },
  btns:{
    width:'40%',
     display:'flex',
    justifyContent:'space-between',
  },
  button1:{
    border:'none',
    backgroundColor:'transparent',
    cursor:'pointer'
  }
}));

const headCells = [
  { id: "Title", label: "Title" },
  { id: "TimeCreated", label: "Time Created" },
  { id: "DateCreated", label: "Date Created" },
  { id: "Status", label: "Status", disableSorting: true  },
  { id: "button", label: "", disableSorting: true },
];

function AdminsDashboard() {
  const classes = useStyles();
  const [page, setPage] = useState("table");
  const router = useRouter();
  const [blog, setBlog] = useState({
    title: "",
    name: "",
    content:''
  });
  const handleEditorChange = (e) => {
    setBlog({ ...blog, content: e.target.getContent() });
    console.log("Content was updated:", e.target.getContent());
  };
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [openDialog, setOpenDialog] = useState();

  const handleSubmit = () => {
    // setOpen(true);
    setTimeout(() => {
      // setOpen(false);
      console.log(blog);
      setOpenDialog(true);
      setPositiveDialog(true);
      setDialogTitle("You have Successfully Published your content");
      // setDialogMessage(
      //   "Our agents will contact via any of the communication channel that you have submitted"
      // );
    }, 1000);
  };
  const handleSave = () => {
    // setOpen(true);
    setTimeout(() => {
      // setOpen(false);
      console.log(blog);
      setOpenDialog(true);
      // setDialogMessage(
      //   "Our agents will contact via any of the communication channel that you have submitted"
      // );
    }, 1000);
  };

  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const [positiveDialog, setPositiveDialog] = useState();
  const [records, setRecords] = useState([
    {
      id: "ggsd",
      Title: "Lorem Ipsum dolor sit amet con,...",
      TimeCreated: "10:00pm",
      DateCreated: "Aug 12th 2020",
      Status: "Active",
    },
    {
      id: "ggs654567fgfgxzds",
      Title: "Lorem Ipsum dolor sit amet con,...",
      TimeCreated: "10:00pm",
      DateCreated: "Aug 12th 2020",
      Status: "Pending",
    },
    {
      id: "ggdfshgfdsfg56789d",
      Title: "news 1",
      TimeCreated: "10:00pm",
      DateCreated: "Aug 12th 2020",
      Status: "disabled",
    },
    {
      id: "ggfghsdqwertyuiopoiuytrewqsdf",
      Title: "News 2",
      TimeCreated: "10:00pm",
      DateCreated: "Aug 12th 2020",
      Status: "Active",
    },
    {
      id: "qwertjkv",
      Title: "Lorem Ipsum dolor sit amet con,...",
      TimeCreated: "10:00pm",
      DateCreated: "Aug 12th 2020",
      Status: "Pending",
    },
    {
      id: "ggdertyo0olgusd",
      Title: "Lorem Ipsum dolor sit amet con,...",
      TimeCreated: "10:00pm",
      DateCreated: "Aug 12th 2020",
      Status: "disabled",
    },
    {
      id: "ggh345sjsd",
      Title: "Lorem Ipsum dolor sit amet con,...",
      TimeCreated: "10:00pm",
      DateCreated: "Aug 12th 2020",
      Status: "Active",
    },
    {
      id: "ggsfgghlsd",
      Title: "Lorem Ipsum dolor sit amet con,...",
      TimeCreated: "10:00pm",
      DateCreated: "Aug 12th 2020",
      Status: "Pending",
    },
    {
      id: "ggs45675438wd",
      Title: "Lorem Ipsum dolor sit amet con,...",
      TimeCreated: "10:00pm",
      DateCreated: "Aug 12th 2020",
      Status: "Pending",
    },
    {
      id: "gg542sbfy87d",
      Title: "Lorem Ipsum dolor sit amet con,...",
      TimeCreated: "10:00pm",
      DateCreated: "Aug 12th 2020",
      Status: "Pending",
    },
    {
      id: "ggs90djsd98762345v",
      Title: "Lorem Ipsum dolor sit amet con,...",
      TimeCreated: "10:00pm",
      DateCreated: "Aug 12th 2020",
      Status: "Active",
    },
    {
      id: "ggyws87654edvbnytfd",
      Title: "Lorem Ipsum dolor sit amet con,...",
      TimeCreated: "10:00pm",
      DateCreated: "Aug 12th 2020",
      Status: "Active",
    },
    {
      id: "gguetghoygfwisd",
      Title: "Lorem Ipsum dolor sit amet con,...",
      TimeCreated: "10:00pm",
      DateCreated: "Aug 12th 2020",
      Status: "Active",
    },
    {
      id: "ggs12w1345tgnoad",
      Title: "Lorem Ipsum dolor sit amet con,...",
      TimeCreated: "10:00pm",
      DateCreated: "Aug 12th 2020",
      Status: "disabled",
    },
    {
      id: "gg23499876544567swyud",
      Title: "Lorem Ipsum dolor sit amet con,...",
      TimeCreated: "10:00pm",
      DateCreated: "Aug 12th 2020",
      Status: "disabled",
    },
    {
      id: "ggsi098jkdtuytrqxd",
      Title: "Lorem Ipsum dolor sit amet con,...",
      TimeCreated: "10:00pm",
      DateCreated: "Aug 12th 2020",
      Status: "disabled",
    },
    {
      id: "ggnx987654erhjalsd",
      Title: "Lorem Ipsum dolor sit amet con,...",
      TimeCreated: "10:00pm",
      DateCreated: "Aug 12th 2020",
      Status: "Active",

    },
    {
      id: "ggs87s987654efghbnmd",
      Title: "Lorem Ipsum dolor sit amet con,...",
      TimeCreated: "10:00pm",
      DateCreated: "Aug 12th 2020",
      Status: "Disabled",

    },
    {
      id: "gg789sskjhgfdsq23456d",
      Title: "Lorem Ipsum dolor sit amet con,...",
      TimeCreated: "10:00pm",
      DateCreated: "Aug 12th 2020",
      Status: "Active",

    },
    {
      id: "gg8wm98765434yugfvbhsd",
      Title: "Lorem Ipsum dolor sit amet con,...",
      TimeCreated: "10:00pm",
      DateCreated: "Aug 12th 2020",
      Status: "Disabled",
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
            x.Title.toLowerCase().includes(target.value)
          );
      },
    });
  };
  let content = null;
  if (records && records.length > 0) {
    content = (
      <Paper className={classes.pageContent}>
                  <div className={classes.filter}>
            <div className={classes.filtertitle}>
            {/* <h4>Filter By</h4>
            <div className={classes.tool}>
              <FormControl variant="filled" className={classes.formControl}>
                <Select
                size='small'
                  native
                  inputProps={{
                    name: "All Users",
                    id: "filled-age-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={10} selected>
                    All Users
                  </option>
                  <option value={20}>Event Host</option>
                  <option value={30}>Vendors</option>
                  <option value={30}>Cso</option>
                </Select>
              </FormControl>
            </div> */}
            </div>
            <div className={classes.searchfield}>
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
          </div>
        
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.Title}</TableCell>
                <TableCell>{item.TimeCreated}</TableCell>
                <TableCell>{item.DateCreated}</TableCell>
                <TableCell>{item.Status}</TableCell>
            <TableCell>
              <button
              className={classes.button1}
              onClick= {() => router.push(`./news/${item.id}`)}
              >
                Veiw
                </button>
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
      <Paper className={classes.pageContent}>
        <h1 style={{ textAlign: "center" }}>There is no data available</h1>
      </Paper>
    );
  }

  return (
    <DashboardContainer openBackDrop={openBackdrop}>
      <div>
        <h3>News Content</h3>
        <div className={classes.users}>
          <div
            onClick={() => setPage("table")}
            className={clsx(
              classes.userbox,
              page === "table" && classes.active
            )}
          >
            <h4>Created Contents</h4>
            <p>101</p>
          </div>
          <div
            onClick={() => setPage("form")}
            className={clsx(classes.userbox, page === "form" && classes.active)}
          >
            <h4>Add New Contents</h4>
          </div>
        </div>
      </div>
      <div className={classes.line}></div>
      {page === "table" && <div>{content}</div>}
      {page === "form" && (
        <div style={{ margin: 30 }}>
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
                <Grid item xs={12} sm={12} md={6}>
                  <form className={classes.root} noValidate autoComplete="off">
                    <div>
                      <TextField
                        required
                        id="outlined-required"
                        size="small"
                        label="Title"
                        placeholder="Enter title"
                        variant="outlined"
                        value={Title.firstname}
                        onChange={(e) =>
                          setUser({ ...title, title: e.target.value })
                        }
                      />
                      
                    </div>
                  </form>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                <TextField
                        aria-required
                        id="outlined-disabled"
                        size="small"
                        label="Writer's Name"
                        placeholder="Enter writer's name"
                        variant="outlined"
                        value={name.lastname}
                        onChange={(e) =>
                          setUser({ ...name, lastname: e.target.value })
                        }
                      />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                <Editor
                initialValue={`<p>${blog.content}</p>`}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image",
                    "charmap print preview anchor help",
                    "searchreplace visualblocks code",
                    "insertdatetime media table paste wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic | \
                        alignleft aligncenter alignright | \
                        bullist numlist outdent indent | help",
                }}
                onChange={handleEditorChange}
              />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <div className={classes.btns}>
                <button
                    className={classes.button}
                    onClick={handleSave}
                    // open={open}
                  >
                   Save as Draft
                  </button>
                  <button
                    className={classes.button}
                    onClick={handleSubmit}
                    // open={open}
                  >
                   Publish
                  </button>
                  </div>
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
