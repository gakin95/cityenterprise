import React, {useState} from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Message from "../createEvents/action/sticker";

export default function Checkboxes({ id }) {
  const [checked, setChecked] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { checked } = event.target;
    setChecked(checked);
    console.log("id...", id, checked);
  };

  return (
    <div>
      <Message
        open={open}
        message={message}
        success={success}
      />
      <Checkbox
        //disabled
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "primary checkbox" }}
      />
    </div>
  );
}
