import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { Container, Grid, Paper } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { Colors } from "../constants";
//import { TransitionProps } from '@material-ui/core/transitions';

const useStyles = makeStyles((theme) =>
  createStyles({
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
      color: "white",
    },
    accountCreation: {
      marginTop: "50px",
      backgroundColor: "white",
      display: "block",
      margin: "auto",
      padding: "30px",
      maxWidth: "90%",

      [theme.breakpoints.down("md")]: {
        width: "95% !important",
      },
    },
    textHeadingColor: {
      fontSize: "14px",
      fontWeight: "bold",
      color: theme.palette.primary.main,
    },
    textHContent: {
      fontSize: "10px",
      //fontWeight: "bold",
    },
    spanText: {
      color: Colors.appRed,
    },
  })
);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <p style={{ color: Colors.appRed }} onClick={handleClickOpen}>
        <a
          href="#"
          style={{ color: "inherit", fontWeight: "bold", fontSize: 14 }}
        >
          Read full T&amp;C’s
        </a>
      </p>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Close
            </Typography>
            <Typography variant="h6" className={classes.title}>
              Terms and conditions
            </Typography>
          </Toolbar>
        </AppBar>
        <Container style={{ marginTop: 0 }}>
          <Paper elevation={0} className={classes.accountCreation}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.textHeadingColor}>
                  1. Introduction
                </Typography>
                <Typography variant="small" className={classes.textHContent}>
                  These Website Standard Terms And Conditions (these “Terms” or
                  these “Website Standard Terms And Conditions”) contained
                  herein on this webpage, shall govern your use of this website,
                  including all pages within this website (collectively referred
                  to herein below as this “Website”). These Terms apply in full
                  force and effect to your use of this Website and by using this
                  Website, you expressly accept all terms and conditions
                  contained herein in full. 
                  <br/>
                  You must not use this Website, if
                  you have any objection to any of these Website Standard Terms
                  And Conditions.
                  <br/>
                   This Website is not for use by any minors
                  (defined as those who are not at least 18 years of age), and
                  you must not use this Website if you a minor
                </Typography>
                <br />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.textHeadingColor}>
                  2. Intellectual Property Rights
                </Typography>
                <Typography variant="small" className={classes.textHContent}>
                  Other than content you own, which you may have opted to
                  include on this Website, under these Terms, Cityevents and/or
                  its licensors own all rights to the intellectual property and
                  material contained in this Website, and all such rights are
                  reserved. You are granted a limited license only, subject to
                  the restrictions provided in these Terms, for purposes of
                  viewing the material contained on this Website.
                </Typography>
                <br />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.textHeadingColor}>
                  3. Restrictions
                </Typography>
                <Typography variant="small" className={classes.textHContent}>
                  You are expressly and emphatically restricted from all of the
                  following:
                </Typography>
                <br />
                <br />
                <Typography variant="small" className={classes.textHContent}>
                  publishing any Website material in any media; 
                  <br />
                  selling,sublicensing and/or otherwise commercializing any Website
                  material; 
                  <br />
                  publicly performing and/or showing any Website
                  material; 
                  <br />
                  using this Website in any way that is, or may be,
                  damaging to this Website; 
                  <br />
                  using this Website in any way that
                  impacts user access to this Website; 
                  <br />
                  using this Website
                  contrary to applicable laws and regulations, or in a way that
                  causes, or may cause, harm to the Website, or to any person or
                  business entity; 
                  <br />
                  engaging in any data mining, data harvesting,
                  data extracting or any other similar activity in relation to
                  this Website, or while using this Website; 
                  <br />
                  using this Website
                  to engage in any advertising or marketing; 
                  <br />
                  Certain areas of
                  this Website are restricted from access by you and Cityevents
                  may further restrict access by you to any areas of this
                  Website, at any time, in its sole and absolute discretion.
                  <br />
                   Any
                  user ID and password you may have for this Website are
                  confidential and you must maintain confidentiality of such
                  information. 
                </Typography>
                <br />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.textHeadingColor}>
                  4. Your Content
                </Typography>
                <Typography variant="small" className={classes.textHContent}>
                  In these Website Standard Terms And Conditions, <b>“Your Content”</b>
                  shall mean any audio, video, text, images or other material
                  you choose to display on this Website. With respect to Your
                  Content, by displaying it, you grant Cityevents a
                  non-exclusive, worldwide, irrevocable, royalty-free,
                  sublicensable license to use, reproduce, adapt, publish,
                  translate and distribute it in any and all media.
                </Typography>
                <br />
                <br/>
                <Typography variant="small" className={classes.textHContent}>
                  Your Content must be your own and must not be infringing on
                  any third party’s rights. Cityevents reserves the right to
                  remove any of Your Content from this Website at any time, and
                  for any reason, without notice.
                </Typography>
                <br />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.textHeadingColor}>
                  5. No warranties
                </Typography>
                <Typography variant="small" className={classes.textHContent}>
                  This Website is provided “as is,” with all faults, and
                  Cityevents makes no express or implied representations or
                  warranties, of any kind related to this Website or the
                  materials contained on this Website. Additionally, nothing
                  contained on this Website shall be construed as providing
                  consult or advice to you.
                </Typography>
                <br />
               </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.textHeadingColor}>
                6. Limitation of liability
                </Typography>
                <Typography variant="small" className={classes.textHContent}>
                In no event shall Cityevents, nor any of its officers, directors and employees, be liable to you for anything arising out of or in any way connected with your use of this Website, whether such liability is under contract, tort or otherwise, and Cityevents, including its officers, directors and employees shall not be liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
                </Typography>
                <br />
                 </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.textHeadingColor}>
                7. Indemnification
                </Typography>
                <Typography variant="small" className={classes.textHContent}>
                You hereby indemnify to the fullest extent Cityevents from and against any and all liabilities, costs, demands, causes of action, damages and expenses (including reasonable attorney’s fees) arising out of or in any way related to your breach of any of the provisions of these Terms.
                </Typography>
                <br />
              </Grid>
              
            </Grid>
          </Paper>
        </Container>
      </Dialog>
    </div>
  );
}
