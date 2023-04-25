import React from 'react';
// import { useStyles } from '../utils/useStyles';
import css from './Contacts.module.css'
import { Grid,  Typography } from "@material-ui/core";
import SocialButtons from '../components/SocialButtons/SocialButtons';
import i18n from "../i18n";

const Contacts = () => {
  // const classes = useStyles();
  return (
    <div>
      <Grid
          container
          // spacing={3}
          direction="column"
          // alignItems="center"
          // justifyContent="center"
          // style={{ minHeight: "80vh", padding: "0" }}
          className={css.container}
      >
          {/* <Grid item xs={12}>
              <Typography variant="h5">
                {i18n.t("Contacts")}:
              </Typography>
          </Grid> */}
          <Grid item xs={12} className={css.item}>
            <Typography style={{fontWeight: 400}} display="block" gutterBottom>
            {i18n.t("Name")}
            </Typography>
          </Grid>
          <Grid item xs={12} className={css.item}>
            <Typography display="block" gutterBottom>
            {i18n.t("Founder and Ceo")} 
            </Typography>
          </Grid>
          <Grid item xs={12} className={css.item}>
            <Typography display="block" gutterBottom>
              +972545779239
            </Typography>
          </Grid>
          <Grid item xs={12} className={css.item}>
            <Typography display="block" gutterBottom>
              <a href="mailto:roman.mantelmakher@gmail.com" rel="noreferrer" target='_blank'>roman.mantelmakher@gmail.com</a>
            </Typography>
          </Grid>
        </Grid>
  
        <SocialButtons />
      </div>
  );
};

export default Contacts;
