import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Button, Typography, List, ListItem, ListItemText, Tooltip, TextField, InputAdornment, SwipeableDrawer } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import CloseIcon from '@mui/icons-material/Close';
import { SET_SEARCH } from '../redux/menus/ActionTypes';

const drawerWidth = '100%';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'fixed',
    top: 0,
    zIndex: theme.zIndex.appBar,
  },
  toolUi: {
    background: theme.palette.primary.main + '!important',
    display:'flex',
    justifyContent:'flex-end'
  },
  listItem: {
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.primary.light,
    },
    color: '#fff',
    borderBottom: '1px solid #e0e0e0',
    margin: '10px',
    marginTop:'10px',
  },
  sideNav: {

    height:'600px',
    width: drawerWidth,
    // background:theme.palette.primary.light,
    borderRadius:" 0 0 30px 30px"
    // marginTop:'80px',
    // marginBottom:'80px',

    // marginTop: '64px',
  },
  listItemIcon: {
    marginRight: theme.spacing(1),
    color: '#fff',
  },
  search: {
    position: 'absolute',
    top: '56px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '500px',
    background: '#f5f5f5',
    zIndex: theme.zIndex.appBar - 1,
  },
  searchInput: {
    width: '100%',
    textAlign: 'center',
  },
  searchIcon: {
    color: theme.palette.text.secondary,
  },
  CoreHeaderMenu: {
    boxSizing: 'border-box',
    width: '90%',
    height: '60px',
    background: '#fff',
    border: '2px solid #e0e0e0',
    margin: '20px',
    borderRadius: '20px',
  },
  drawerBar: {
    borderRadius: '0 0 30px 30px',
  },
  listBar: {
    background: theme.palette.primary.light,
    boxSizing: 'border-box',
    borderRadius: '10px',
    // margin: '20px',
    width:'100%'
  },
  socialIcons: {
    width:'100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
    // MaxHeight:'200px'
   

  },
  socialIcon: {
    margin: ' 5px',
    // borderRadius: '50%',
    padding: '8px',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },

  },
  close:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    margin:'20px',
    borderRadius:'100%',
    backgroundColor:'#eeeeee',
    width:'40px',
    height:'40px'
  },
  closeIcon:{
    // margin:'20px',
    alignItem:'center',
  }
}));

const Header = () => {
  const classes = useStyles();
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText,setSearchText] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleHistory = () => {
    navigate('/OrderHistory');
  };

  const handleSideNavToggle = () => {
    setSideNavOpen(!sideNavOpen);
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
      dispatch({type:SET_SEARCH,payload:searchText});
      setSearchText('');
  };

  const handleLogout = () => {
    // Handle logout logic here
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    dispatch({type:SET_SEARCH,payload:event.target.value});
  };

  const handleSearch = () => {
    console.log("the search term:",searchText);
    dispatch({type:SET_SEARCH,payload:searchText});
    // onSearch(searchText);
    setSearchOpen(!searchOpen);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolUi}>
          {/* <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleSideNavToggle}>
            <MenuIcon sx={{ fontSize: '30px' }} />
          </IconButton> */}
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'flex-start' }}>
            FOODILICIOUS
          </Typography> */}
          <IconButton edge="end" color="inherit" aria-label="profile">
            <SearchIcon sx={{ fontSize: '30px', justifyContent: 'flex-end'}} onClick={handleSearchToggle} />
          </IconButton>
        </Toolbar>
      </AppBar>
      {searchOpen && (
        <div className={classes.search}>
          <TextField
        className={classes.searchInput}
        value={searchText}
        onChange={handleSearchChange}
        placeholder="Search your favourite item..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" className={classes.searchIcon}>
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Button variant="contained" color="primary" onClick={handleSearch}>
                Search
              </Button>
            </InputAdornment>
          ),
        }}
        onKeyDown={handleKeyPress}
      />
        </div>
      )}
       {/* <SwipeableDrawer
        anchor="top"
        open={sideNavOpen}
        onClose={handleSideNavToggle}
        onOpen={handleSideNavToggle}
        disableBackdropTransition
        className={classes.drawerBar}
      >
        <div className={classes.sideNav}>
          <div className={classes.close}>
            <CloseIcon className={classes.closeIcon} onClose={handleSideNavToggle}/>
          </div>
         
          <div className={classes.listBar}>
            <List>
              <Tooltip title="HOME">
                <ListItem className={classes.listItem} onClick={handleProfile}>
                  <AccountCircleIcon className={classes.listItemIcon} />
                  <ListItemText primary="HOME" />
                </ListItem>
              </Tooltip>
              <Tooltip title="ORDER HISTORY">
                <ListItem className={classes.listItem} onClick={handleHistory}>
                  <HistoryIcon className={classes.listItemIcon} />
                  <ListItemText primary="ORDER HISTORY" />
                </ListItem>
              </Tooltip>
              <Tooltip title="LOGOUT">
                <ListItem className={classes.listItem} onClick={handleLogout}>
                  <LogoutIcon className={classes.listItemIcon} />
                  <ListItemText primary="LOGOUT" />
                </ListItem>
              </Tooltip>
            </List>
          </div>
          <div className={classes.socialIcons}>
            <IconButton className={classes.socialIcon} >
              <FacebookIcon sx={{ color: "#1877F2",fontSize:"30px"  }}/>
            </IconButton>
            <IconButton className={classes.socialIcon}>
              <TwitterIcon sx={{ color: "#1DA1F2",fontSize:"30px"  }} />
            </IconButton>
            <IconButton className={classes.socialIcon}>
              <InstagramIcon sx={{ color: "#E4405F",fontSize:"30px"  }} />
            </IconButton>
          </div>
        </div>
      </SwipeableDrawer>  */}
    </div>
  );
};

export default Header;
