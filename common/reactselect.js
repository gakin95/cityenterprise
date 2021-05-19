import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    width: "200px"
  }
}));

export default function SelectTextField() {
  const classes = useStyles();
  const [formState, setFormState] = React.useState({
    userRoles: []
  });
console.log(formState);
  const handleFieldChange = event => {
    console.log(event);
    event.persist();
    setFormState(formState => ({
      ...formState,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value
    }));
  };

  return (
    <TextField
      classes={{ root: classes.root }}
      select
      name="userRoles"
      id="userRoles"
      variant="outlined"
      label="userRoles"
      SelectProps={{
        multiple: true,
        value: formState.userRoles,
        onChange: handleFieldChange
      }}
    >
      <MenuItem value="admin">Admin</MenuItem>
      <MenuItem value="user1">User1</MenuItem>
      <MenuItem value="user2">User2</MenuItem>
    </TextField>
  );
}
