import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import { Editor } from "@tinymce/tinymce-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import {
  GoogleMap,
  MyCustomButton,
  MyTextField,
  AddPhoto,
  Contact,
  ReactSelect,
} from "../../../common";
import { eventServices } from '../../../src/services/eventServices'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "80%",
    margin: "0 auto",
  },
  paper: {
    padding: theme.spacing(),
    color: theme.palette.text.secondary,
  },
  line: {
    border: "1px solid #f1f1f1",
    width: "40em",
    marginTop: 10,
    marginBottom: 15,
  },
  select: {
    marginLeft: 10,
  },
  description: {
    width: "100%",
    height: "5em",
    borderRadius: 5,
  },
  title: {
    margin: 0,
    marginLeft: 20,
  },
  gridimg: {
    width: 175,
    marginLeft: "auto",
    alignItems: "right",
    marginTop: -95,
    marginBottom: "-30",
    [theme.breakpoints.down("xs")]: {
      margin: "0 auto",
      width: "80%",
    },
  },
  next: {
    color: "white",
    float: "right",
    marginBottom: 50,
    height: 30,
    backgroundColor: "orangeRed",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    border: "1px solid orangeRed",
    width: 130,
    marginTop: 30,
  },
  line2: {
    border: "1px solid #f1f1f1",
    width: "100%",
    marginTop: 30,
    marginBottom: 15,
  },
  contact: {
    backgroundColor: "orangeRed",
    color: "white",
    textAlign: "center",
    margin: "auto 100px",
    borderRadius: 5,
  },
  gprs: {
    width: "100%",
    height: 65,
    borderRadius: 7,
    marginBottom: 10,
    marginTop: 10,
  },
  map: {
    width: "100%",
    marginTop: 25,
  },
  imgdiv: {
    backgroundColor: "whitesmoke",
    height: 200,
    marginLeft: 25,
  },
  date: {
    width: "100%",
    height: 65,
    borderRadius: 7,
    marginBottom: 10,
    marginTop: 10,
  },
  span: {
    marginLeft: 30,
  },
  span2: {
    marginLeft: 21,
  },
  book: {
    margin: 22,
    marginBottom: -47,
  },
  textarea: {
    marginLeft: 15,
  },
  icon: {
    cursor: "pointer",
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const [tags, setTags] = useState('');
  const [userInput, setUserInput] = useState({
    type_of_event: "free",
    amount_paid: 5000,
    event_category: 1,
    event_title: "",
    experience_level: "choose Experience",
    event_location: "",
    longitude: null,
    latitude: null,
    country: "",
    state: "",
    city: "",
    zip_code: null,
    event_banner: "uploads/image.png",
    description: "",
    event_summary: "",
    tags: [],
    starting_date: "2020-10-24",
    ending_date: "2020-11-24",
    starting_time: "07:30",
    ending_time: "08:30",
    isRecuringEvent: false,
    event_recuring_ends: "2020-12-25",
    event_recuring_frequency: "Event will repeat",
    expected_no_of_attendees: null,
    event_ticket_types: [],
    event_vendors: [],
  });
  const [coordinate, setCoordinate] = useState({
    lat: null,
    lng: null,
  });
  const [location, setLocation] = useState("Venue");
  const [event, setEvent] = useState("Single Event");
  const matches = useMediaQuery("(max-width:600px)");
  const [category, setCategory] = useState("Select category");
  const [description, setDiscription] = useState("");
  const [uploadImage, setUploadImage] = useState(null);
  const [address, setAddress] = useState("");
  const [createTicket, setCreateTicket] = useState([
    {
      type_of_ticket: "Select Type of Ticket",
      available_slots: "",
      amount: "",
    },
  ]);
  const [open, setOpen] = useState(true);
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    console.log(results);
    setCoordinate(latLng);
    setAddress(value);
    setUserInput({
      ...userInput,
      event_location: value,
      longitude: latLng.lng,
      latitude: latLng.lat,
      // country: results[1].address_components[6].long_name,
      // state: results[1].address_components[5].long_name,
      // country: results[1].address_components[4].long_name,
    });
  };
  const handleChangeSelect = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleEditorChange = (e) => {
    setUserInput({ ...userInput, description: e.target.getContent() });
    console.log("Content was updated:", e.target.getContent());
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const [experience, setExperience] = useState("choose Experience");
  const handleExperienceChange = (e) => {
    setExperience(e.target.value);
  };
  const [attendees, setAttendees] = useState("Select a range of attendees");
  const handleAttendeesChange = (e) => {
    setAttendees(e.target.value);
  };
  const [vendor, setVendor] = useState("Select a vendor");
  const handleVendorChange = (e) => {
    setVendor(e.target.value);
  };
  const [fee, setFee] = useState("Select a fee type");
  const handleFeeChange = (e) => {
    setFee(e.target.value);
  };
  const handleAddImageClick = (event) => {
    event.stopPropagation();
    let fileInput = event.target.getElementsByTagName("input")[0];
    fileInput.click();
  };
  const handleLocation = (e) => {
    const { value } = e.target;
    setLocation(value);
    console.log(userInput);
  };
  const handleChangeCreateTicket = (e, index) => {
    const { name, value } = e.target;
    const list = [...createTicket];
    list[index][name] = value;
    setCreateTicket(list);
    setUserInput({ ...userInput, event_ticket_types: list });
    console.log("===============", userInput);
  };

  const addItems = () => {
    const list = [...createTicket];
    list.push({
      type_of_ticket: "Select Type of Ticket",
      available_slots: "",
      amount: "",
    });
    setCreateTicket(list);
    setUserInput({ ...userInput, event_ticket_types: list });
  };

  const removeItems = (index) => {
    const list = [...createTicket];
    list.splice(index, 1);
    setCreateTicket(list);
    setUserInput({ ...userInput, event_ticket_types: list });
  };

  const handleTagChange = (e) => {
    const {value} = e.target;
    setTags(value),
    console.log(userInput)
  }

  const handleFieldChange = (event) => {
    console.log(event);
    event.persist();
    setUserInput((userInput) => ({
      ...userInput,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    }));
    console.log(userInput)
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const response = await eventServices(token,userInput);
    console.log(response)
  };

  
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid
          container
          spacing={3}
          direction={matches ? "column-reverse" : "row"}
        >
          <Grid item xs={12} md={9}>
            <h4 className={classes.title}>Choose category</h4>
            <p className={classes.title}>
              Select the event tags you will like to see more often than the
              others
            </p>
            <FormControl className={classes.formControl} fullWidth>
              <Select
                labelId="category"
                id="category"
                variant="outlined"
                placeholder="select category(e.g stationery design)"
                value={category}
                onChange={handleCategoryChange}
                fullWidth
              >
                <MenuItem value="Select category">Select Category</MenuItem>
                <MenuItem value="Brand product launches">
                  Brand product launches{" "}
                </MenuItem>
                <MenuItem value="Business summits">Business summits</MenuItem>
                <MenuItem value="Conferences">Conferences</MenuItem>
                <MenuItem value="Conventions">Conventions</MenuItem>
                <MenuItem value="Exhibitions">Exhibitions</MenuItem>
                <MenuItem value="Forums">Forums</MenuItem>
                <MenuItem value="Fundraising">Fundraising</MenuItem>
                <MenuItem value="Meetings & incentives">
                  Meetings & incentives
                </MenuItem>
                <MenuItem value="Seminars">Seminars</MenuItem>
                <MenuItem value="Workshops">Workshops</MenuItem>
                <MenuItem value="Webinars">Webinars</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <img
              src="../../../images/Group.png"
              className={classes.gridimg}
            ></img>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            <FormControl className={classes.formControl} fullWidth>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="EVENT NAME"
                  multiline
                  fullWidth
                  rows={3}
                  placeholder="What is the name of your Event?"
                  value={userInput.event_title}
                  onChange={(e) =>
                    setUserInput({ ...userInput, event_title: e.target.value })
                  }
                  variant="outlined"
                  className={classes.textarea}
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h4 className={classes.title}>Experience Level</h4>
            <p className={classes.title}>
              Tell us how experienced you are in organizing an event
            </p>
            <FormControl className={classes.formControl} fullWidth>
              <Select
                labelId="experience-level"
                id="level"
                variant="outlined"
                placeholder=""
                value={userInput.experience_level}
                onChange={(e) =>
                  setUserInput({
                    ...userInput,
                    experience_level: e.target.value,
                  })
                }
                fullWidth
              >
                <MenuItem value="choose Experience">
                  Choose your experience level
                </MenuItem>
                <MenuItem value="beginner">Beginner</MenuItem>
                <MenuItem value="intermediate">Intermediate</MenuItem>
                <MenuItem value="expert">Expert</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <h4 className={classes.title}>Pick the location of your event</h4>
            <p className={classes.title}>Select location</p>
            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                row
                aria-label="selectRegType"
                name="selectRegType"
                value={location}
                onChange={handleLocation}
              >
                <FormControlLabel
                  value="Venue"
                  control={<Radio color="primary" />}
                  label="Venue"
                />
                <FormControlLabel
                  value="Online events"
                  control={<Radio color="primary" />}
                  label="Online events"
                />
                <FormControlLabel
                  value="To be announced"
                  control={<Radio color="primary" />}
                  label="To be announced"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
        <br />
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <FormControl className={classes.formControl} fullWidth>
              <Grid item xs={12}>
                {location === "Venue" && (
                  <PlacesAutocomplete
                    value={address}
                    onChange={setAddress}
                    onSelect={handleSelect}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => (
                      <div>
                        <TextField
                          fullWidth
                          className={classes.formControl}
                          label="enter address"
                          variant="outlined"
                          {...getInputProps({
                            placeholder: "Search Places ...",
                            className: "location-search-input",
                          })}
                        />
                        <div>
                          {loading && <div>Loading...</div>}
                          {suggestions.map((suggestion) => {
                            const className = suggestion.active
                              ? "suggestion-item--active"
                              : "suggestion-item";
                            const style = suggestion.active
                              ? {
                                  backgroundColor: "#F06E38",
                                  //borderRadius:'7px',
                                  padding: "0.5rem",
                                  color: "#fff",
                                  cursor: "pointer",
                                }
                              : {
                                  backgroundColor: "#2B2B2B",
                                  padding: "0.5rem",
                                  color: "#fff",
                                  cursor: "pointer",
                                };
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style,
                                })}
                              >
                                {suggestion.description}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
                )}
              </Grid>
              <Grid item xs={12}>
                {location === "Online events" && (
                  <FormControl className={classes.formControl} fullWidth>
                    <MyTextField
                      id="url"
                      type="url"
                      name="link"
                      required="required"
                      label="Enter social medial link (e.g zoom)"
                      placeholder="https://example.com"
                      value={userInput.event_location}
                      onChange={
                        (e) =>
                          setUserInput({
                            ...userInput,
                            event_location: e.target.value,
                          })
                        //console.log(userInput)
                      }
                    />
                  </FormControl>
                )}
              </Grid>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.map}>
        {location === "Venue" && (
          <GoogleMap
            location={address}
            lat={coordinate.lat}
            lng={coordinate.lng}
          />
        )}
      </div>
      <div className={classes.line2}></div>
      <h4 className={classes.title}>Event Image</h4>
      <p className={classes.title}>
        Add an Image that bests depicts your event
      </p>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <AddPhoto
            //image="/images/upload.png"
            title="Upload image or photo"
            text="Max file size (5MB)"
            accept="image/*"
            filename="image"
            onClick={handleAddImageClick}
            backgroundImage={uploadImage}
            setImage={(file) => {
              setUploadImage(file);
            }}
          />
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
      <div className={classes.line2}></div>
      <Grid container spacing={3}>
        <div>
          <h3>Description</h3>
          <p>Describe your event</p>
        </div>
        <Grid item xs={12}>
          <Editor
            initialValue={`<p>${userInput.description}</p>`}
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
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              label="Event summary"
              multiline
              fullWidth
              rows={3}
              value={userInput.event_summary}
              placeholder="Describe your events in just two lines (will be shown on listing pages)"
              variant="outlined"
              className={classes.textarea}
              onChange={(e) =>
                setUserInput({ ...userInput, event_summary: e.target.value })
              }
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl
            className={classes.paper}
            className={classes.formControl}
            fullWidth
          >
            <MyTextField
              id="tag"
              type="tag"
              name="tag"
              required="required"
              label="Tags"
              placeholder="Tag your network "
              value={tags}
              onChange={handleTagChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
      <div className={classes.line2}></div>
      <h4 className={classes.title}>Date and Time</h4>
      <p className={classes.title}>Set date and time for your event</p>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="selectEvent"
              name="selectEvent"
              value={event}
              onChange={(e) => {
                setEvent(e.target.value);
                setUserInput({
                  ...userInput,
                  isRecuringEvent: event === "Single Event" ? false : true,
                });
              }}
            >
              <FormControlLabel
                value="Single Event"
                control={<Radio color="primary" />}
                label="Single Event"
              />
              <FormControlLabel
                value="Recurring Event"
                control={<Radio color="primary" />}
                label="Recurring Event"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6} md={3}>
          <FormControl className={classes.formControl} fullWidth>
            <MyTextField
              id="date"
              label="Event start"
              type="date"
              defaultValue="2017-05-24"
              value={userInput.starting_date}
              onChange={(e) =>
                setUserInput({ ...userInput, starting_date: e.target.value })
              }
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} md={3}>
          <FormControl className={classes.formControl} fullWidth>
            <MyTextField
              id="time"
              label="Time start"
              type="time"
              value={userInput.starting_time}
              onChange={(e) =>
                setUserInput({ ...userInput, starting_time: e.target.value })
              }
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6} md={3}>
          <FormControl className={classes.formControl} fullWidth>
            <MyTextField
              id="datee"
              label="Event end"
              type="date"
              value={userInput.ending_date}
              onChange={(e) =>
                setUserInput({ ...userInput, ending_date: e.target.value })
              }
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} md={3}>
          <FormControl className={classes.formControl} fullWidth>
            <MyTextField
              id="time"
              label="Time end"
              type="time"
              value={userInput.ending_time}
              onChange={(e) =>
                setUserInput({ ...userInput, ending_time: e.target.value })
              }
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}></Grid>
        {event === "Recurring Event" && (
          <Grid item xs={12} sm={6} md={3}>
            <FormControl className={classes.formControl} fullWidth>
              <Select
                labelId="event_recuring_frequency"
                id="event_recuring_frequency"
                name="event_recuring_frequency"
                variant="outlined"
                value={userInput.event_recuring_frequency}
                onChange={(e) =>
                  setUserInput({
                    ...userInput,
                    event_recuring_frequency: e.target.value,
                  })
                }
                fullWidth
              >
                <MenuItem value="Event will repeat">Event will repeat</MenuItem>
                <MenuItem value="weekly">Regular</MenuItem>
                <MenuItem value="monthly">monthly</MenuItem>
                <MenuItem value="quartly">quartly</MenuItem>
                <MenuItem value="yearly">yearly</MenuItem>
                <MenuItem value="others">others</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}
        {event === "Recurring Event" && (
          <Grid item xs={6} md={3}>
            <FormControl className={classes.formControl} fullWidth>
              <MyTextField
                id="dateeeer"
                label="Event recuring ends"
                type="date"
                value={userInput.event_recuring_ends}
                onChange={(e) =>
                  setUserInput({
                    ...userInput,
                    eevent_recuring_ends: e.target.value,
                  })
                }
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
        )}
      </Grid>
      <div className={classes.line2}></div>
      <h4 className={classes.title}>About your attendees</h4>
      <p className={classes.title}>
        Lets cover some basic information about your first event on cityevents
      </p>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl className={classes.formControl} fullWidth>
            <MyTextField
              id="number"
              type="number"
              name="number"
              required="required"
              label="How many people do you expect to attend this event?"
              placeholder="Enter numbers of expected guest"
              value={userInput.expected_no_of_attendees}
              onChange={(e) =>
                setUserInput({
                  ...userInput,
                  expected_no_of_attendees: e.target.value,
                })
              }
            />
          </FormControl>
        </Grid>
      </Grid>
      <h4 className={classes.book}>Book a Vendor</h4>
      <br />
      <p className={classes.span2}>Choose Vendors from category?</p>
      <Grid container spacing={3}>
      <Grid item xs={12}>
                  <TextField
                    classes={{ root: classes.root }}
                    select
                    name="event_vendors"
                    id="event_vendors"
                    variant="outlined"
                    label="Choose vendors from category"
                    SelectProps={{
                      multiple: true,
                      value: userInput.event_vendors,
                      onChange: handleFieldChange,
                    }}
                  >
                    <MenuItem value="food">food</MenuItem>
                    <MenuItem value="drinks">drinks</MenuItem>
                    <MenuItem value="ushers">ushers</MenuItem>
                  </TextField>
                </Grid>
        <Grid item xs={12}>
          <h3>Ticket</h3>
          <p>
            Let us know the types of tickets that will be available for your
            event
          </p>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {createTicket.map((item, i) => {
            return (
              <Grid container spacing={3} key={i}>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl className={classes.formControl} fullWidth>
                    <Select
                      labelId="type_of_ticket"
                      id="type_of_ticket"
                      name="type_of_ticket"
                      variant="outlined"
                      value={item.type_of_ticket}
                      onChange={(e) => handleChangeCreateTicket(e, i)}
                      fullWidth
                    >
                      <MenuItem value="Select Type of Ticket">
                        Select Type of Ticket
                      </MenuItem>
                      <MenuItem value="Regular">Regular</MenuItem>
                      <MenuItem value="VIP">VIP</MenuItem>
                      <MenuItem value="VVIP">VVIP</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl className={classes.formControl} fullWidth>
                    <MyTextField
                      id="available_slots"
                      type="number"
                      name="available_slots"
                      required="required"
                      label="Available slots"
                      placeholder="Enter available slots"
                      value={item.available_slots}
                      onChange={(e) => handleChangeCreateTicket(e, i)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl className={classes.formControl} fullWidth>
                    <MyTextField
                      id="amount"
                      type="number"
                      name="amount"
                      required="required"
                      label="Amount"
                      placeholder="Enter mount"
                      value={item.amount}
                      onChange={(e) => handleChangeCreateTicket(e, i)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={10} sm={6} md={1}>
                  <AddCircleIcon className={classes.icon} onClick={addItems} />
                </Grid>
                <Grid item xs={1} sm={6} md={1}>
                  <RemoveCircleOutlineIcon
                    className={classes.icon}
                    onClick={() => removeItems(i)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    classes={{ root: classes.root }}
                    select
                    name="event_vendors"
                    id="event_vendors"
                    variant="outlined"
                    label="Choose vendors from category"
                    SelectProps={{
                      multiple: true,
                      value: userInput.event_vendors,
                      onChange: handleFieldChange,
                    }}
                  >
                    <MenuItem value="food">food</MenuItem>
                    <MenuItem value="drinks">drinks</MenuItem>
                    <MenuItem value="ushers">ushers</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <button className={classes.next} onClick={handleSubmit}>Next</button>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Contact />
        </Grid>
      </Grid>
    </div>
  );
}
