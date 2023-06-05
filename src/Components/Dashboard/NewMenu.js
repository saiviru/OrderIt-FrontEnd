import React from "react";
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';
import Header from "./Header";
import Catergory from "./Catergory";
// import Search from "./Search";
import MenuList from "./MenuList";
import Footer from "./Footer";
// import Check from "./Check";

const useStyles = makeStyles((theme) => ({
  menuList: {
    
    // width:'full',
   
  },
  // searchInput: {
  //   // marginLeft: theme.spacing(1),
  //   flex: 1,
  // },
}));


const NewMenu = () => {
  const classes = useStyles();
  return (
   
    <div className={classes.menuList} >
      {" "}
      <Header />
       {/* <Search /> */}
      <Catergory />
      <MenuList />
      {/* <Check /> */}
      <Footer />
    </div>
  );
};

export default NewMenu;
