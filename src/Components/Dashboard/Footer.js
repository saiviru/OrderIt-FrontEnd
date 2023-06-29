import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import NewsIcon from '@mui/icons-material/Announcement';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  footer: {
    
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    // backgroundColor: theme.palette.primary.main,
    zIndex: theme.zIndex.appBar,
  },
 icon:{
    color:theme.palette.primary.main + '!important',

  },
  footerIcons:{
    color:theme.palette.primary.main + '!important',
  }
}));

const Footer = ({footerActiveTab}) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [active, setActive] = useState('menu');
  // footerActiveTab('menu');

  const OrderStatus = () => {
    setActive('orderList');
    footerActiveTab('orderList')
  };
  const Home = () => {
    setActive('menu');
    footerActiveTab('menu');
  };



  return (
    <BottomNavigation value={value} className={classes.footer}>
      <BottomNavigationAction onClick={Home} className={classes.footerIcons} label="Home" icon={<HomeIcon className={classes.icon} />} />
      {/* <BottomNavigationAction className={classes.footerIcons} label="News" icon={<NewsIcon className={classes.icon}  />} /> */}
      <BottomNavigationAction onClick={OrderStatus} className={classes.footerIcons} label="List" icon={<ListIcon className={classes.icon}  />} />
    </BottomNavigation>
  );
};

export default Footer;
