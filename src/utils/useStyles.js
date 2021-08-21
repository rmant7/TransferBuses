import { makeStyles } from '@material-ui/core';
import { createTheme } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  ///material ui default classes
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  paper: {
    background: "#536dfe",
  },
  icon: {
    fill: "white",
  },
  /// header
  nav: {
    display: "flex",
    alignItems: "center",
  },
  menuButton: {
    marginLeft: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
    textAlign: "center",
    alignItems: "center",
    display: "flex",
  },
  link: {
    margin: theme.spacing(1, 1.5),
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    position: "relative",
    boxSizing: "border-box",
    transition: "all 500ms ease",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "inset 0 0 0 2px white",
      textDecoration: "none",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  flag: {
    width: "15px",
    height: "15px",
    marginRight: "15px",
  },

  currSelect: {
    color: "white",
  },

  langSelect: {
    color: "white",
  },

  //sidebar
  sidebarHeader: {
    position: "relative",
    // backgroundColor: "#536dfe",
    backgroundColor: "#536dfe",
    color: "#fff",
    padding: "1rem 1rem 1rem 1rem",
    display: "flex",
    flexDirection: "column",
  },
  sidebarHeaderInfo: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0",
  },
  sidebarCloseButton: {
    width: "1rem",
    height: "1rem",
  },
  sidebarList: {
    color: "#fff",
    width: "200px",
  },
  //contact page
  contacts: {
    padding: "60px",
  },
}));

export const theme = createTheme({
  overrides: {
    MuiInputBase: {
      root: {
        // color: "white",
        fontSize: "0.875rem",
        fontFamily: "Roboto",
        fontWeight: 500,
        lineHeight: 1.75,
        letterSpacing: "0.02857em",
        textTransform: "uppercase",
      },
    },
  },
  palette: {
    primary: {
      // main: "#536dfe",
      // main: "#ff5722",
      main: "#536dfe",
    },
    secondary: {
      main: "#607d8b",
    },
  },
});
