import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { SingleEvent } from "../singleItem";
import { ButtonWithBackdrop } from "../../../common";
import { baseUrl } from "../../../constants";
import BackDrop  from "../../../common/Backdrop";
import SocialShare from "../../../components/share/share";
import ShareModal from "../../../components/modal/share";

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    width: "90%",
    margin: "auto",
    [theme.breakpoints.down('xs')]:{
      width:'100%'
    }
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  upcoming: {
    marginBottom: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  center:{
    textAlign:'center'
  }
}));

function AllEvents({data,message,loading}) {
  const classes = useStyles();
  const router = useRouter();
  let [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [sharedItem, setSharedItem] = useState([]);
  const link = "http://cityevents.cf/posts/";

  const shareItem = (id) => {
    const tempItems = [...data];
    const curItem = tempItems.find(item => item.id === id);
    setSharedItem(() => curItem);
    setOpenDialog(true)
  }

  const handleClick = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      router.push("/events#events");
    }, 1000);
  };

  let renderItems = <BackDrop loading={loading} />;
  if (data && data.length>0) {
    renderItems =  <Grid container spacing={3}>
    {data.map((singleItem) => (
      <Grid item xs={12} sm={6} md={4} key={singleItem.id}>
        <SingleEvent
          click={() => router.push(`posts/${singleItem.slug}`)}
          type_of_event={singleItem.type_of_event}
          title={singleItem.title}
          content={singleItem.content}
          image={baseUrl + singleItem.image}
          eventCategory={singleItem.eventCategory}
          date={singleItem.date}
          share={() => shareItem(singleItem.id)}
        />
      </Grid>
    ))}
    <ShareModal openDialog={openDialog} onClose={() => setOpenDialog(false)}>
          <SocialShare
            name={sharedItem.title}
            url={baseUrl + sharedItem.image}
            link={link + sharedItem.slug}
          />
      </ShareModal>
    <Grid item xs={12} className={classes.button}>
      <ButtonWithBackdrop
        label={"See more"}
        open={open}
        click={handleClick}
      />
    </Grid>
  </Grid>
  }else{
    renderItems = <h3 className={classes.center}>{message}</h3>
  }
  return (
    <div className={classes.cardRoot}>
      <Typography variant="h5" className={classes.upcoming}>
        Recommended events
      </Typography>
      <div>
        {renderItems}
      </div>
    </div>
  );
}

export default AllEvents;
