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
import EditIcon from "@material-ui/icons/Edit";
import Moment from "react-moment";
import DeleteIcon from "@material-ui/icons/Delete";
import { useRouter } from "next/router";
import { Search } from "@material-ui/icons";

import useTable from "../../tables/useTable";
import Input from "../../input/input";
import { deleteAccountDiscountCoupon } from "../../../src/services/admin";
import TokenDialogue from "../../dialogue/token";
import { MyConfirmationDialog } from "../../../common";
import Spinner from '../../../common/Backdrop';
import CustomizedSnackbars from '../../createEvents/action/sticker';

const headCells = [
  { id: "sn", label: "S/NO" },
  { id: "title", label: "Copy discount token" },
  { id: "discount", label: "Discount" },
  { id: "limit", label: "Limit" },
  { id: "usage", label: "Usage" },
  { id: "date", label: "Expiration date" },
  { id: "action", label: "Action", disableSorting: true },
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  btnicon: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    width: 50,
  },
  buttons: {
    // display:'flex',
    // alignItems:'center',
    // justifyContent:'space-between'
  },
});

export default function CustomizedTables({ records, setItem, callback }) {
  const router = useRouter();
  const classes = useStyles();
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [takeAction, setTakeAction] = useState(false);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [positiveDialog, setPositiveDialog] = useState(true);
  const [id, setId] = useState(null);
  

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleDialog = (id) => {
    const temItems = [...records];
    const curItem = temItems.find((item) => item.id === id);
    setCoupon(curItem.coupon);
    setOpenDialog(true);
  };
  const onDelete = async (id) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const temItems = [...records];
    const curItem = temItems.filter((item) => item.id !== id);
    setItem(curItem);
    const response = await deleteAccountDiscountCoupon(token, id);
    console.log(response);
    if (response && response.status){
      setLoading(response.isLoading);
      setTakeAction(false);
      setOpen(true);
      setSuccess(response.status === 'success'?true:false);
      setMessage(response.message);
      callback();
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
  } = useTable(records, headCells, filterFn);

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

  return (
    <Paper>
      <Spinner loading={loading}/>
      <TokenDialogue
        coupon={coupon}
        openDialog={openDialog}
        positiveDialog={positiveDialog}
        onClose={() => setOpenDialog(false)}
      />
      <CustomizedSnackbars
        message={message}
        open={open}
        success={success}
        handleClose={handleClose}
      />
      <MyConfirmationDialog
        openDialog={takeAction}
        onClose={() => setTakeAction(false)}
        action={() => onDelete(id)}
      >
        Are you sure you want to delete this coupon?
      </MyConfirmationDialog>
      <Toolbar>
        <Input
          label="Search discount token"
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
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.sn}</TableCell>
              <TableCell onClick={() => handleDialog(item.id)}>
                {item.title}
              </TableCell>
              <TableCell>{item.discount}</TableCell>
              <TableCell>{item.limit}</TableCell>
              <TableCell>{item.usage ? item.usage : 0}</TableCell>
              <TableCell>
                <Moment format="ddd, MMM Do, yy">{item.expires_on}</Moment>
              </TableCell>
              <TableCell>
                <div className={classes.btnicon}>
                  <EditIcon
                    color="primary"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      router.push(`/admins/token/${item.id}`)
                    }
                  />
                  <DeleteIcon color="error" onClick={() => {
                    setId(item.id);
                    setTakeAction(true)
                  }} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </Paper>
  );
}
