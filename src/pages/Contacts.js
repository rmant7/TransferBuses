import React from 'react';
// import { useStyles } from '../utils/useStyles';
import { Grid,  Typography } from "@material-ui/core";
import SocialMedia from '../components/SocialMedia/SocialMedia';
import i18n from "../i18n";

const Contacts = () => {
  // const classes = useStyles();
  return (
    <div>
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "70vh", padding: "0" }}
    >
      <Grid item xs={8} style={{marginTop : "15%"}} >
          <Typography  variant="h5" gutterBottom>
            {i18n.t("Contacts")}:
          </Typography>
      </Grid>
      <Grid item xs={8} align="center">
        <Typography variant="h5"  gutterBottom style={{ fontWeight: 600 }}>
        {i18n.t("Name")}
        </Typography>
        <Typography variant="h6"  gutterBottom >
        {i18n.t("Founder and Ceo")} 
        </Typography>
      </Grid>
      <Grid item xs={8} align="center">
          <Typography variant="h6" gutterBottom>
          <a href='tel:+972-54-577-92-39' rel="noreferrer" target='_blank' style={{textDecoration:"none", fontStyle: "italic", color: "darkblue"}}>+972-54-577-92-39</a>
          
        </Typography>
        <Typography variant="h6" align="center" gutterBottom >
            <a href="mailto:roman.mantelmakher@gmail.com" rel="noreferrer" target='_blank' style={{textDecoration:"none", fontStyle: "italic", color: "darkblue", wordWrap:"break-word"}}>roman.mantelmakher@gmail.com</a>
        </Typography>
        </Grid>
 

      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6"  gutterBottom style={{ fontWeight: 300, fontStyle: "italic" }}>
          {i18n.t("Chat or call me")}:
          {/* <br/>
          {i18n.t("Click on button")}    */}
        </Typography>
      </Grid>
      <SocialMedia />
      </div>
  );
};

export default Contacts;
