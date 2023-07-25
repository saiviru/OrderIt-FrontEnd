import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { makeStyles } from '@mui/styles';
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
    cart: {
        display: "flex",
        // alignItems:'center',
        justifyContent: "center",
        // margin: theme.spacing(2),
      },
  }));
  

const OrderHistory = () => {
    const classes = useStyles();
  return (
    <div>
         <Header />
         order history
        <Footer />
    </div>
  )
}

export default OrderHistory