import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { response } from 'express';



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
  const user = useSelector((state) => state.user);
  const [userOrders, setUserOrders] = useState([]);
  const [resName, setResName] = useState('');

  const getDate = (data) =>{
    const utcDateTime = new Date(data);
    const istDateTime = utcDateTime.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    const istDate = utcDateTime.toLocaleDateString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    const istTime = utcDateTime.toLocaleTimeString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    return istDate;
  }


  useEffect(() => {
    axios.get("/api/getUserOrder/" + user.userDetails.sub).then((response) => {
      console.log("Orders of user:", response.data);
      setUserOrders(response.data);
      // dispatch({ type: "USER_ORDERS", payload: todaysOrders });
      console.log("user details inside user history", userDetails.unmaskedData.rid)
    });

    // axios.get("/api/resName/" + user.userDetails.unmaskedData.rid).then((response)=>{
    //   setResName(response.data)
    // })
  }, []);
  
  return (
    <div>
      <Header />
      {userOrders.map((order, index) => {
        return(
        <ListItem key={index} className={classes.listItem}>
          <ListItemIcon className={classes.listItemIcon}>
            <RadioButtonCheckedIcon sx={{ fontSize: "10px" }} />
          </ListItemIcon>
          <ListItemText primary={` ${resName}`} />
          <List>
            {order.items.map((item, itemIndex) => (
              <ListItem key={itemIndex} className={classes.subListItem}>
                <ListItemIcon>
                  <FiberManualRecordIcon />
                </ListItemIcon>
                <ListItemText primary={`${item.name} - ${item.quantity}`} /> 
                <ListItemText sx={{paddingLeft:'35px'}} primary={`${getDate(order.createdAt)}`} />
              </ListItem>
            ))}
          </List>
        </ListItem>
        )
      })

      }
      <Footer />
    </div>
  )
}

export default OrderHistory