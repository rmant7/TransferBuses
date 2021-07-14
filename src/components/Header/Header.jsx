import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import { Trans, useTranslation } from "react-i18next";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#ff8a50",
      main: "#ff5722",
      dark: "#c41c00",
      contrastText: "#fff",
    },
  },
});

export default function Header() {
    
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h3">TransferBuses</Typography>
            <Grid
              container
              spacing={2}
              alignItems="baseline"
              justifyContent="flex-end"
              item
              xs
            >
              <Button color="inherit">Login</Button>
              <FormControl>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem onClick={() => changeLanguage("en")}>English</MenuItem>
                  <MenuItem onClick={() => changeLanguage("ru")}>Русский</MenuItem>
                  <MenuItem onClick={() => changeLanguage("ua")}>Українська</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}
