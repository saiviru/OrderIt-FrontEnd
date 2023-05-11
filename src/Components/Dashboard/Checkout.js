import React from "react";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
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
  DialogActions
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "./MenuList.css";

const baseURL = "https://apisuper.thedigitallicious.online";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex", // added
    justifyContent: "center", // added
  },
  background: {
    backgroundColor: "#2a265f",
  },
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
  },
}));

export const Checkout = () => {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [popup, setPopup] = React.useState(false);
  const totalState = useSelector((state) => state.menu);
  const dirtyItems = useSelector((state) => state.menu.dirtyItems);
  console.log("the state now:", totalState);

  const navigate = useNavigate();

  const classes = useStyles();

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const handleClickOpen = () => {
    setPopup(true);
  };

  const handleClose = () => {
    setPopup(false);
    navigate("/menu");
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
      indPrice = parseFloat(each.price) * parseFloat(each.quantity)
      totalPrice += parseFloat(indPrice);
    });
    axios
      .post(baseURL + "/orders", {
        items: finalItems,
        totalAmount: totalPrice,
        status: "new",
        restaurantId: "6176a9a6c0c6e906c36a4d10",
        userId: "6176a9a6c0c6e906c36a4d10",
      })
      .then(function (response) {
        console.log("the response:",response)
        setPopup(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Box className={classes.root}>
      <Grid item xs={12} md={6}>
        <Typography
          sx={{ mt: 4, mb: 2, textAlign: "center" }}
          variant="h6"
          component="div"
        >
          Your Cart!
        </Typography>
        {totalState.dirtyItems !== ""
          ? totalState.dirtyItems.map((item) => {
              return (
                <Demo className="course">
                  <List dense={dense}>
                    <ListItem
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon style={{ color: "#2a265f" }} />
                        </IconButton>
                      }
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
                    </ListItem>
                  </List>
                </Demo>
              );
            })
          : null}
        <div className={classes.footer}>
          <Button variant="contained" color="primary" onClick={placeOrder}>
            Place Order
          </Button>
        </div>
        {popup && (
          <div>
            <Dialog open={open} onClose={handleClose}>
              {/* <DialogTitle>Popup Title</DialogTitle> */}
              <DialogContent dividers>
                <p>Your order has been sent successfully!</p>
              </DialogContent>
              <DialogActions sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                {/* <Button onClick={handleClose}>Cancel</Button> */}
                <Button  onClick={handleClose} autoFocus >
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </Grid>
    </Box>
  );
};

export default Checkout;
