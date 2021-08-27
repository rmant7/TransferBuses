import React from 'react';
import { useStyles } from '../utils/useStyles';
import { Grid, Paper, Typography } from "@material-ui/core";

const Contacts = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={3}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh", padding: "0" }}
    >
      <Grid item xs={12}>
        <Typography component="h3">Contacts:</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="button" display="block" gutterBottom>
          Roman Mantelmakher
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="button" display="block" gutterBottom>
          Founder and Ceo
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="button" display="block" gutterBottom>
          +972545779239
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="button" display="block" gutterBottom>
          <a href="mailto:your@email.com">roman.mantelmakher@gmail.com</a>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Contacts;
