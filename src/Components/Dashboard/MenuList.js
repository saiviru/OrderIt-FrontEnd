import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AdjustIcon from "@mui/icons-material/Adjust";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    UPDATE_QUANTITY
} from "../redux/menus/ActionTypes";
import "./MenuList.css";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const theme = createTheme({
  components: {
    // Name of the component ⚛️
    Box: {
      defaultProps: {
        padding: 0,
      },
    },
  },
  palette:{

  }
});

const useStyles = makeStyles((theme) => ({
  buttonHolder: {
    position: "absolute",
    bottom: "1px",
    right: "3px",
    letterSpacing: "1px",
    padding: "5px",
  },
  addButtons: {
    backgroundColor: "#2a265f",
    border: "0",
    borderRadius: "50px",
    boxShadow: "0 10px 10px rgb(0 0 0 / 20%)",
    color: "#fff",
    fontSize: "18px",
    padding: "4px 8px",
    cursor: "pointer",
  },
  categoryHolder: {
    display: "inline-flex",
    verticalAlign: "middle",
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: "#2a265f",
    padding: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const baseURL = "https://apisuper.thedigitallicious.online/api";

const MenuList = () => {
  const dispatch = useDispatch();
  const dirtyItems = useSelector((state) => state.menu.dirtyItems);
  const totalState = useSelector((state) => state.menu);
  const menuData = useSelector((state) => state.menu.menuItems);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(baseURL + "/menuGet").then((response) => {
      let menuData = response.data.map((item) => ({ ...item, quantity: 0 }));
      dispatch({ type: "SET_MENU_ITEMS", payload: menuData });
    });
  }, []);

  useEffect(() => {
    // dispatch({ type: "UPDATE_UI" });
  }, [menuData, dispatch]);

  const classes = useStyles();

  const handleQuantityChange = (id, quantity, price, name) => {
    dispatch({ type: UPDATE_QUANTITY, payload: { id, quantity, price, name } });
    console.log("the updated quantity:", totalState);
  };

  const checkoutPage = () =>{
    navigate("/checkout")
  }

  

  return (
    <ThemeProvider theme={theme}>
      <Grid className="courses-container" item xs={12}>
        <Grid>
          {menuData !== ""
            ? menuData.map((item, key) => {
                return (
                  <Grid className="course" key={key}>
                    <Box className="course-preview">
                      <Box
                        component="img"
                        className="dish-image"
                        src={
                          "https://foodappdata.s3.ap-south-1.amazonaws.com/josh/" +
                          item.image
                        }
                        alt={"the menu picture for" + item.itemName}
                      />
                    </Box>
                    <Grid className="course-info">
                      {/* <div className="progress-container">
                                    <div className="progress"></div>
                                    <span className="progress-text">
                                        6/9 Challengess
                                    </span>
                                </div> */}
                      <Box className={classes.categoryHolder} component="span">
                        {" "}
                        <AdjustIcon
                          sx={{
                            color: "green",
                            display: "inline",
                            fontSize: "small",
                          }}
                        />
                        <h6> &nbsp;Dish Category</h6>{" "}
                      </Box>
                      <h5>{item.itemName}</h5>
                      <h5>&#x20B9; {item.price}</h5>
                      <StyledRating
                        name="customized-color"
                        defaultValue={2}
                        getLabelText={(value) =>
                          `${value} Heart${value !== 1 ? "s" : ""}`
                        }
                        precision={0.5}
                        icon={<FavoriteIcon fontSize="inherit" />}
                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                        size="small"
                      />
                      {/* <button className="btn">Add</button> */}
                      {item.quantity > 0 ? (
                        <Box className={classes.buttonHolder} component="span">
                          <Box
                            component="button"
                            className={classes.addButtons}
                            onClick={() => {
                              handleQuantityChange(item._id, item.quantity - 1, item.price, item.itemName);
                            }}
                          >
                            -
                          </Box>{" "}
                          {item.quantity}{" "}
                          <Box
                            component="button"
                            className={classes.addButtons}
                            onClick={() => {
                              handleQuantityChange(item._id, item.quantity + 1, item.price, item.itemName);
                            }}
                          >
                            +
                          </Box>
                        </Box>
                      ) : (
                        <Box className={classes.buttonHolder} component="span">
                          <Box
                            component="button"
                            className={classes.addButtons}
                            onClick={() => {
                              handleQuantityChange(item._id, item.quantity + 1, item.price, item.itemName);
                            }}
                          >
                            Add
                          </Box>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                );
              })
            : null}
        </Grid>
        <div className={classes.footer}>
          <Button variant="contained" color="primary" onClick={checkoutPage}>
            Checkout
          </Button>
        </div>
      </Grid>
    </ThemeProvider>
  );
};

export default MenuList;
