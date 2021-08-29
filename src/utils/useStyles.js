import { makeStyles } from '@material-ui/core';
import { createTheme } from '@material-ui/core';

// ! Color of Nav header and Nav Sidebar
const mainColor = "#536dfe";

export const useStyles = makeStyles(theme => ({
  //!! Material ui default classes
  
  // !! Top padding modifier.
  topPadding: {
    paddingTop: "56px",
  },

  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  paper: {
    background: `${mainColor}`,
  },
  icon: {
    fill: "white",
  },

  // !! MainPage

  mainPage: {
    paddingTop: "56px",
    minHeight: "100vh",
  },
  mainPage__btn: {
    minWidth: "280px",
  },

  //!! Navbar
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
    color: "#ffffff",
  },

  langSelect: {
    color: "#ffffff",
  },

  // !! Cheaptrip commercial.
  cheaptrip: {},
  header: {
    fontSize: "28px",
    color: "rgb(255 87 34)",
    textAlign: "center",
  },
  caption__wrapper: {
    width: "50vw",
    margin: "50vx",
    borderRadius: "50px",
  },

  caption__img: {
    margin: "0 auto",
    width: "70%",
    display: "block",
  },
  description: {
    textAlign: "center",
    fontSize: "calc(16px + 16 * (100vw / 1920))",
    backgroundColor: "rgb(255 87 34)",
    color: "white",
    padding: "0.5rem",
  },

  //!! Sidebar
  sidebarHeader: {
    position: "relative",
    backgroundColor: `${mainColor}`,
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
  //!! Contact page
  contacts: {},
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
      main: `${mainColor}`,
    },
    secondary: {
      main: "#607d8b",
    },
  },
});
