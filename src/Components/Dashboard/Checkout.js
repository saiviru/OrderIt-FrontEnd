import React,{useState} from "react";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AdjustIcon from "@mui/icons-material/Adjust";


import {
  Grid,
  Box,
  Typography,
  IconButton,
  ListItemAvatar,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ListItemSecondaryAction,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "./MenuList.css";
import Header from "./Header";
import { TextField } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    marginRight: "10px",
    marginTop: "60px", // added
    // justifyContent: "center", // added
  },
  cart: {
     width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex start ",
    alignItems:'center',
    // border: "1px solid black",
    marginBottom:'50px',
   
  },
  itemList: {
    // border: "1px solid black",
    marginLeft:'30px'
  },
  listItem: {
    // border: "2px solid black",
    // display:'flex !important' ,
    // justifyContent:'space-between !important'
  },
  // course: {
  //   backgroundColor: '#fff',
  //   borderRadius: '10px',
  //   boxShadow: '0 10px 10px rgba(0, 0, 0, 0.2)',
  //   display: 'flex',
  //   maxwidth: '100%',
  //   margin: '20px',
  //   overflow: 'hidden',
  // },
  // background: {
  //   backgroundColor: "#2a265f",
  // },
  footer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: "#2a265f",
    padding: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60px",
    borderRadius:'50px',
    hover: {
      "&:hover": {
        backgroundColor: 'rgb(7, 177, 77, 0.42)'
      }
    }
  },
  orderButton: {
    width: "100%",
    height: "50px",
    background: theme.palette.primary.main + "!important",
    
  },
  boxContainer: {
    height: "80%",
    width:"90%",
    display: "flex",
    flexDirection:'column',
    alignItems: "center",
    justifyContent: "flex-start",
    // border: `1px solid ${theme.palette.primary.main}`, // Set the border color to the primary color from the theme
  },
  boxList:{
    // height: "60%",
    width:"100%",
    // border: `1px solid ${theme.palette.primary.main}`, // Set the border color to the primary color from the theme
    // marginBottom:'30px',
    // boxShadow: 'inset 0 0 10px grey',
   
  },
  orderItem:{
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    boxShadow: 'inset 0 0 10px #cfd8dc',
    padding:"10px",
    margin:'10px',
    borderRadius:'5px'
  },
  orderIcon:{ 
  //   display:'flex',
  //  flexDirection:'column',
  //  alignItems:'center',
  //  justifyContent:'flex-start'
   marginLeft:'10px',
   width:'100px'
  },
 
  addButtons: {
    // backgroundColor: "#80cbc4",
    borderRadius: "50%",
    // boxShadow: "0 10px 10px rgb(0 0 0 / 20%)",
    // color: "#fff",
    fontSize: "15px",
    margin: "4px ",
    cursor: "pointer",
    border: '1px solid white'

  },
  singleItem:{
    display:'flex',
    alignItems:'center',
    justifyContent:'flex-start'
  },
  buttonHolder:{
    boxShadow: 'inset 0 0 10px #cfd8dc',
    borderRadius: "5px",
    border: '0'

  },
  cookPop:{
    width:'100%',
  }
  
}));

export const Checkout = () => {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [popup, setPopup] = React.useState(false);
  const totalState = useSelector((state) => state.menu);
  const dirtyItems = useSelector((state) => state.menu.dirtyItems);
  console.log("the state now:", totalState);
  const [popupOpen, setPopupOpen] = useState(false);

  const navigate = useNavigate();

  const classes = useStyles();

  const Demo = styled("div")(({ theme }) => ({
    // backgroundColor: theme.palette.background.paper,
  }));

  const handleClickOpen = () => {
    setPopup(true);
  };

  const handleClose = () => {
    setPopup(false);
    navigate("/menu");
  };
  const handleGoBack = () => {
    navigate("/menu"); // Navigate back to the previous page
  };
  const handleOpenPopup = () => {
    setPopupOpen(true);
  };
  
  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  async function placeOrder() {
    setPopup(false);
    let finalItems = [];
    let totalPrice = 0;
    let indPrice = 0;
    dirtyItems.map((each) => {
      finalItems.push({
        itemId: each.id,
        quantity: each.quantity,
        price: each.price,
        name: each.name,
      });
      indPrice = parseFloat(each.price) * parseFloat(each.quantity);
      totalPrice += parseFloat(indPrice);
    });
    axios
      .post("/api/orders", {
        items: finalItems,
        totalAmount: totalPrice,
        status: "New",
        restaurantId: "6176a9a6c0c6e906c36a4d10",
        userId: "6176a9a6c0c6e906c36a4d10",
      })
      .then(function (response) {
        console.log("the response:", response);
        setPopup(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <Header />
      {/* <Box className={classes.root}>
        <Grid item xs={12} md={6}>
          <div className={classes.cart}>
            {" "}
            <Button
              // variant="outlined"
              color="primary"
              className={classes.backButton}
              startIcon={<ArrowBackIcon />}
              onClick={handleGoBack}
            ></Button>
            <Typography
              sx={{ mt: 4, mb: 2, ml:5, textAlign: "center" }}
              variant="h6"
              component="div"
            >
              Your Cart!
            </Typography>
          </div>
          {totalState.dirtyItems !== ""
            ? totalState.dirtyItems.map((item) => {
                return (
                  // <Demo className={classes.course}>
                    <List className={classes.itemList} dense={dense}>
                      <ListItem
                        className={classes.listItem}
                        // secondaryAction={
                        //   <IconButton edge="end" aria-label="delete">
                        //     <DeleteIcon style={{ color: "#80cbc4" ,marginLeft:'15px' }} />
                        //   </IconButton>
                        // }
                      >
                       
                          <ListItemAvatar>
                            <Avatar>
                              <FolderIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={item.name + " - " + item.quantity}
                            secondary={secondary ? "Secondary text" : null}
                          />
                       
                        
                          <ListItemSecondaryAction>
                            {/* <IconButton edge="end" aria-label="delete">
                              <DeleteIcon style={{ color: "#2a265f" }} />
                            </IconButton> 
                          </ListItemSecondaryAction>
                        
                      </ListItem>
                    </List>
                  // </Demo>
                );
              })
            : null}
          <div className={classes.footer}>
            <Button
              className={classes.orderButton}
              variant="contained"
              color="primary"
              onClick={placeOrder}
            >
              Place Order
            </Button>
          </div>
          {popup && (
            <div>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Popup Title</DialogTitle>
                <DialogContent dividers>
                  <p>Your order has been sent successfully!</p>
                </DialogContent>
                <DialogActions
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleClose} autoFocus>
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          )}
        </Grid>
      </Box> */}
       
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box className={classes.boxContainer}>
        <div className={classes.cart}>
            {" "}
            <Button
              // variant="outlined"
              color="primary"
              className={classes.backButton}
              startIcon={<ArrowBackIcon />}
              onClick={handleGoBack}
            ></Button>
            <Typography
              sx={{ ml:'40px', textAlign: "center" }}
              variant="h6"
              component="div"
            >
              View Order
            </Typography>
            
          </div>
          <Box className={classes.boxList}>
          <div className={classes.orderItem}> 
      <div  className={classes.singleItem}>  <AdjustIcon
                          sx={{
                            color: "green",
                            display: "inline",
                            fontSize: "medium",
                          }}
                        />
                        <div className={classes.orderIcon}>
                           <h5>chicken biryani tasty</h5> 
                            {/* <p>&#x20B9; </p> */}
                        </div></div> 

                         <p>&#x20B9; 300</p>  
      
                        {/* {item.quantity > 0 ? ( */}
                        <Box className={classes.buttonHolder} component="span">
                          <Box
                            component="button"
                            className={classes.addButtons}
                            // onClick={() => {
                            //   handleQuantityChange(item._id, item.quantity - 1, item.price, item.itemName);
                            // }}
                          >
                            -
                          </Box>{" "}
                          {/* {item.quantity}{" "} */} 2
                          <Box
                            component="button"
                            className={classes.addButtons}
                            // onClick={() => {
                            //   handleQuantityChange(item._id, item.quantity + 1, item.price, item.itemName);
                            // }}
                          >
                            +
                          </Box>
                        </Box>
                    
                        {/* <Box className={classes.buttonHolder} component="span">
                          <Box
                            component="button"
                            className={classes.addButtons}
                            // onClick={() => {
                            //   handleQuantityChange(item._id, item.quantity + 1, item.price, item.itemName);
                            // }}
                          >
                            Add
                          </Box>
                        </Box> */}
                    
          </div>
          <div className={classes.orderItem}> 
      <div  className={classes.singleItem}>  <AdjustIcon
                          sx={{
                            color: "green",
                            display: "inline",
                            fontSize: "medium",
                          }}
                        />
                        <div className={classes.orderIcon}>
                           <h5>Biryani</h5> 
                            {/* <p>&#x20B9; </p> */}
                        </div></div>   
                        <p>&#x20B9; 200 </p>  
      
                        {/* {item.quantity > 0 ? ( */}
                        <Box className={classes.buttonHolder} component="span">
                          <Box
                            component="button"
                            className={classes.addButtons}
                            // onClick={() => {
                            //   handleQuantityChange(item._id, item.quantity - 1, item.price, item.itemName);
                            // }}
                          >
                            -
                          </Box>{" "}
                          {/* {item.quantity}{" "} */} 1
                          <Box
                            component="button"
                            className={classes.addButtons}
                            // onClick={() => {
                            //   handleQuantityChange(item._id, item.quantity + 1, item.price, item.itemName);
                            // }}
                          >
                            +
                          </Box>
                        </Box>
                    
                        {/* <Box className={classes.buttonHolder} component="span">
                          <Box
                            component="button"
                            className={classes.addButtons}
                            // onClick={() => {
                            //   handleQuantityChange(item._id, item.quantity + 1, item.price, item.itemName);
                            // }}
                          >
                            Add
                          </Box>
                        </Box> */}
                    
          </div>
         
         
          

          </Box>
          <div>
          <a  onClick={handleOpenPopup} style={{
                            color: "blue",
                            // display: "inline",
                            fontSize: "small",
                            marginRight:"100px"
                          }} >Add cooking instructions?</a>
         </div>
          </Box>
       

          <div className={classes.footer}>
            <Button
              className={classes.orderButton}
              variant="contained"
              color="primary"
              onClick={placeOrder}
             
            >
              Place Order
            </Button>
          </div>
          {popup && (
            <div>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Popup Title</DialogTitle>
                <DialogContent dividers>
                  <p>Your order has been sent successfully!</p>
                </DialogContent>
                <DialogActions
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleClose} autoFocus>
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            
          )}
      </div>
      <Dialog  className={ classes.cookPop} open={popupOpen} onClose={handleClosePopup}>
  <DialogTitle>Cooking Instructions</DialogTitle>
  <DialogContent>
    <TextField
      label="Instructions"
      multiline
      rows={4}
      variant="outlined"
      fullWidth
      // Add any necessary props or event handlers
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClosePopup} color="primary">
      Close
    </Button>
  </DialogActions>
</Dialog>

    </div>
  );
};

export default Checkout;
