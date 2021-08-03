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
