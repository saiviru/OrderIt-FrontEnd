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
import { useNavigate } from "react-router-dom";
import { UPDATE_QUANTITY } from "../redux/menus/ActionTypes";
import { GET_URL_DATA, UNMASKED_URL_DATA } from "../redux/user/ActionTypes";

import "./MenuList.css";
import { useParams } from 'react-router-dom';

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const useStyles = makeStyles((theme) => ({
  menuContainer: {
    overflowY: "auto",
    paddingBottom: "45px",
  },
  buttonHolder: {
    position: "absolute",
    bottom: "1px",
    right: "3px",
    letterSpacing: "1px",
    padding: "5px",
  },
  addButtons: {
    backgroundColor: theme.palette.primary.main + "!important",
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
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: "100%",
    position: "fixed",
    bottom: "60px",
    // height:'30px',
    // right: "15px",
    padding: "8px",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.6)",
    zIndex: "999",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid black",
  },
  popupContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  outButton: {
    background: theme.palette.primary.main + "!important",
  },
  // courseInfo: {
  //   padding: "10px",
  //   position: "relative",
  //   width: " 100%",
  // },
  // courseInfo: {
  //   "& h6": {
  //     opacity: 0.6,
  //     margin: 0,
  //     letterSpacing: "1px",
  //     textTransform: "uppercase",
  //   },
  // },
  // // courseInfo: {
  // //   "& h5": {
  // //     letterSpacing: "1px",
  // //     margin: "10px 0",
  // //   },
  // // },
  course: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 10px 10px rgba(0, 0, 0, 0.2)",
    display: "flex",
    maxWidth: "100%",
    margin: "20px",
    overflow: "hidden",
  },
  coursePreview: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    maxWidth: "200px",
    width: "200px",
    maxHeight: "125px",
    minHeight: "125px",
    // height:'auto',
  },
  dishImage: {
    // display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius:"10px"
  },
}));

const MenuList = ({ category }) => {
  const dispatch = useDispatch();
  const dirtyItems = useSelector((state) => state.menu.dirtyItems);
  const totalState = useSelector((state) => state.menu);
  const user = useSelector((state) => state.user)
  let menuData = useSelector((state) => state.menu.menuItems);
  let searchTerm = totalState.search;
  // const store = useSelector((state) => state)

  const {id} = useParams();

  useEffect(()=>{
    if(id){
      dispatch({type:GET_URL_DATA,payload:id});
      console.log("the store state now:",user);
      axios.get(`/api/getQrData/${id}`).then((response) => {
        console.log("the response deducing qr data:",response.data.data);
        dispatch({type:UNMASKED_URL_DATA,payload:response.data.data});
      });
    }
  },[])

  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [menu, setMenu] = useState();
  const [filteredMenu, setFilteredMenu] = useState([]);

  useEffect(() => {
    if(menuData.length>0){
      setMenu(menuData);
      console.log("menu items:",menu)
    }
    else{
      axios.get("/api/menuGet").then((response) => {
        let menuData = response.data.map((item) => ({ ...item, quantity: 0 }));
        setMenu(menuData);
        console.log("menu items:",menu)
        dispatch({ type: "SET_MENU_ITEMS", payload: menuData });
      });
    }
  }, []);

  useEffect(() => {
    if (menu) {
      console.log("am I being called?")
      if (category === "Best Seller") {
        setFilteredMenu(menuData);
      } else {
        menuData = menuData.filter((item) => item.category === category);
        setFilteredMenu(menuData);
      }
    }
  }, [category,menu,menuData]);

  useEffect(() =>{
    console.log("the total state:",totalState,searchTerm)
    if(searchTerm){
      menuData = menuData.filter((item) => item.itemName.toLowerCase().includes(searchTerm.toLowerCase()));
      console.log("the filtered search menu:",menuData);
      setFilteredMenu(menuData);
    }
  },[searchTerm])

  const classes = useStyles();

  const handleQuantityChange = (id, quantity, price, name) => {
    console.log("the quantity change:",dirtyItems)
    dispatch({
      type: UPDATE_QUANTITY,
      payload: { id, quantity, price, name },
    });
  };

  const checkoutPage = () => {
    navigate("/checkout");
  };

 

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const selectedItemCount = dirtyItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    // <ThemeProvider theme={theme}>
    <Grid className={classes.menuContainer} item xs={12}>
      <Grid>
        {filteredMenu && filteredMenu !== ""
          ? filteredMenu.map((item, key) => {
              return (
                <Grid className="course" key={key}>
                  <Box className={classes.coursePreview}>
                    <Box
                      component="img"
                      className={classes.dishImage}
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
                      <h6> &nbsp;{item.category}</h6>{" "}
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
                            handleQuantityChange(
                              item._id,
                              item.quantity - 1,
                              item.price,
                              item.itemName
                            );
                          }}
                        >
                          -
                        </Box>{" "}
                        {item.quantity}{" "}
                        <Box
                          component="button"
                          className={classes.addButtons}
                          onClick={() => {
                            handleQuantityChange(
                              item._id,
                              item.quantity + 1,
                              item.price,
                              item.itemName
                            );
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
                            handleQuantityChange(
                              item._id,
                              item.quantity + 1,
                              item.price,
                              item.itemName
                            );
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
      {selectedItemCount > 0 && (
        <div className={classes.popup}>
          <h4>Items selected: </h4> ({selectedItemCount} items)
          <Button
            className={classes.outButton}
            variant="contained"
            color="primary"
            onClick={checkoutPage}
          >
            View Order
          </Button>
        </div>
      )}
      {/* <div className={classes.footer}>
          <Button variant="contained" color="primary" onClick={checkoutPage}>
            Checkout
          </Button>
        </div> */}
    </Grid>
    // </ThemeProvider>
  );
};

export default MenuList;
