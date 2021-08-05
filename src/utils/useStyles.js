import { makeStyles } from '@material-ui/core';
import { createTheme } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
  },
  link: {
    margin: theme.spacing(1, 1.5),
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    position: 'relative',
    boxSizing: 'border-box',
    transition: 'all 500ms ease',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: 'inset 0 0 0 2px white',
      textDecoration: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  sidebarHeader: {
    position: 'relative',
    backgroundColor: '#607d8b',
    color: '#fff',
    padding: '1rem 1rem 2rem 1rem',
    display: 'flex',
    flexDirection: 'column',
  },
  sidebarHeaderInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0',
    marginBottom: '20px',
  },
  sidebarCloseButton: {
    width: '1rem',
    height: '1rem',
  },
  sidebarEmail: {
    fontSize: '13px',
    opacity: '.5',
  },
  sidebarAvatar: {
    position: 'absolute',
    top: '80%',
    right: '28%',
    width: '65px',
    height: '65px',
    border: '8px solid #ff5722',
  },
  sidebarList: {
    backgroundColor: '#ff5722',
    color: '#fff',
    zIndex: '-1',
    paddingTop: '45px',
  },
}));

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ff5722',
    },
    secondary: {
      main: '#607d8b',
    },
  },
});
