import { makeStyles } from '@material-ui/core';
import { createTheme } from '@material-ui/core';

// ! Color of nav header and nav sidebar
const mainColor = "#536dfe";
const mainColorCeapTrip = "#ff5722";

export const useStyles = makeStyles(theme => ({

  root: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: '5005px !important',
    },
  },

  //!! Material ui default classes

  // !! Top padding modifier.
  topPadding: {
    paddingTop: "120px",
  },

  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },

  paperMenu: {
    width: "188px",
  },

  icon: {
    fill: "white",
  },

  // !! DrivePage

  drivePage: {
    maxWidth: "360px",
    paddingTop: "80px",
    paddingBottom: "80px"
  },

  // !! mainPage

  mainPage: {
    minHeight: "100vh",
  },
  mainPage__btn: {
    minWidth: "280px !important",
  },

  //!! Navbar

  menuButton: {
    marginLeft: theme.spacing(1),
  },
  toolbarContainer: {
    maxWidth: '5000px !important',
  },

  // toolbar: {
  //   // maxWidth: '1980px',
  // },

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

  whiteSelect: {
    color: "#fffffe !important",
  },


  // !! Cheaptrip commercial.

  ctDescription: {
    padding: "0.5rem",
    maxWidth: "270px",
    borderRadius: "1rem",
    fontSize: "calc(18px + 14 * (100vw / 1920))",
    backgroundColor: "rgb(255 87 34)",
    color: "white",
  },


  // !! sidebar

  sidebarCloseButton: {
    width: "1rem",
    height: "1rem",
  },

  // sidebarList: {
  //   color: "#fff",
  //   width: "220px",
  // },

  //!! Contact page
  // contacts: {},
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
    MuiDrawer: {
      paper: {
        backgroundColor: `${mainColorCeapTrip}`,
        color: "#fff",
        width: "220px",
      }
    },
  },

  palette: {
    primary: {
      // main: `${mainColor}`,
      main: `${mainColorCeapTrip}`,
    },
    secondary: {
      main: "#607d8b",
    },
  },
});