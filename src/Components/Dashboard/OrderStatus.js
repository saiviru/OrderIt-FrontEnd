import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from "@mui/material/Box";
import Header from "./Header";
import Footer from "./Footer";
import { Typography } from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    marginRight: "10px",
    marginTop: "120px", // added
    // justifyContent: "center", // added
  },
  boxContainer: {
    height: "80%",
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Align items at the start
    justifyContent: "flex-start", // Center the order section vertically
    border: `1px solid ${theme.palette.primary.main}`,
  },
  boxList: {
    // height: "60%",
    width: "100%",
    // border: `1px solid ${theme.palette.primary.main}`, // Set the border color to the primary color from the theme
    // marginBottom:'30px',
    // boxShadow: 'inset 0 0 10px grey',
  },
  listItem: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    // justifyContent: "flex-start",
  },
  cart: {
    display: "flex",
    // alignItems:'center',
    justifyContent: "center",
    // margin: theme.spacing(2),
  },
  listItemIcon: {
    // minWidth: "20px",
    // marginRight: theme.spacing(2),
  },
  listText: {}
}));

const OrderStatus = () => {
  const classes = useStyles();
  const orderedItems = ["Item 1", "Item 2", "Item 3", "Item 4"];
  const [userOrders, setUserOrders] = useState([]);


  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userStateOrders = useSelector((state) => state.menu.userOrders)
  console.log("the user in orderstatus:", userOrders);


  useEffect(() => {
      axios.get("/api/getUserOrder/" + user.userDetails.sub).then((response) => {
        const today = new Date();
        const todaysOrders = response.data.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return (
            orderDate.getDate() === today.getDate() &&
            orderDate.getMonth() === today.getMonth()
          );
        });
      console.log("Ordered today:", todaysOrders)
      setUserOrders(todaysOrders);
        dispatch({ type: "USER_ORDERS", payload: todaysOrders });
      });
  }, []);

  return (
    <div>
      <Header />
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box className={classes.boxContainer}>
          <div className={classes.cart}>
            <Typography sx={{ textAlign: "center", margin: "10px" }} variant="h6" component="div">
              Your order so far!
            </Typography>
          </div>

          <Box className={classes.boxList}>
            <List>
              {userOrders.map((order, index) => (
                <ListItem key={index} className={classes.listItem}>
                  <ListItemIcon className={classes.listItemIcon}>
                    <RadioButtonCheckedIcon sx={{ fontSize: "10px" }} />
                  </ListItemIcon>
                  {/* <ListItemText primary={`Order ${index + 1}`} /> */}
                  <List>
                    {order.items.map((item, itemIndex) => (
                      <ListItem key={itemIndex} className={classes.subListItem}>
                        <ListItemIcon>
                          <FiberManualRecordIcon />
                        </ListItemIcon>
                        <ListItemText primary={`${item.name} - ${item.quantity}`} />
                      </ListItem>
                    ))}
                  </List>
                </ListItem>
              ))}
            </List>
          </Box>
          <Typography sx={{ textAlign: "right", margin: "10px" }} variant="h6" component="div">
            Order Total - {userOrders.reduce(
              (total, order) => total + order.totalAmount,
              0
            )}
          </Typography>
        </Box>
      </div>
      <Footer />
    </div>
  );
};

export default OrderStatus;
