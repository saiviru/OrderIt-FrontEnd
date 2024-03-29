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
import { UPDATE_QUANTITY, CLEAR_MENU_ITEMS } from "../redux/menus/ActionTypes";
import { GET_URL_DATA, UNMASKED_URL_DATA } from "../redux/user/ActionTypes";
import InfiniteScroll from 'react-infinite-scroll-component';

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
    marginBottom:'70px',
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
  course1:{
    marginBottom:'70px'
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
    // marginBottom:'70px'

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
    borderRadius: "10px"
  },
}));

const MenuList = ({ category }) => {
  const dispatch = useDispatch();
  const dirtyItems = useSelector((state) => state.menu.dirtyItems);
  const totalState = useSelector((state) => state.menu);
  const user = useSelector((state) => state.user)
  let menuData = useSelector((state) => state.menu.menuItems);
  let searchTerm = totalState.search;
  let rId = user.unmaskedData.rid;

  const [limitedMenu, setLimitedMenu] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch({ type: GET_URL_DATA, payload: id });
      axios.get(`/api/getQrData/${id}`).then((response) => {
        dispatch({ type: UNMASKED_URL_DATA, payload: response.data.data });
      });
      if(dirtyItems.rId !== rId){
        console.log("the rid in matching:",rId,dirtyItems.rId)
        dispatch({type:CLEAR_MENU_ITEMS})
      }
    }
  },[]);

  const fetchData = () => {
    // Simulate API call or fetch data from your data source
    // Append new data to the existing data
    // For this example, let's append some dummy data
    const newData = filteredMenu;

    // Update the data state and determine if there is more data to load
    setData([...data, ...newData]);
    setHasMore(data.length < 50); // Load more data until 50 items are reached
  };

  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [menu, setMenu] = useState();
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const pageSize = 10; // Number of items to load per page

  useEffect(() => {
    axios.get("/api/getMenu/" + rId).then((response) => {
      let menuData = response.data.data.map((item) => ({ ...item, quantity: 0 }));
      setMenu(menuData);
      dispatch({ type: "SET_MENU_ITEMS", payload: menuData });
      setHasMore(menuData.length > pageSize);
      setFilteredMenu(menuData.slice(0, pageSize));
    });
  }, [rId]);

  useEffect(() => {
    if (menu) {
      if (category === "Best Seller") {
        // fetchMoreData()
      } else {
        menuData = menuData.filter((item) => item.category === category);
        setFilteredMenu(menuData);
        setHasMore(false);
      }
    }
  }, [category, menu, menuData]);

  useEffect(() => {
    if (searchTerm) {
      menuData = menuData.filter((item) => item.itemName.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredMenu(menuData);
    }
  }, [searchTerm])

  const classes = useStyles();

  const handleQuantityChange = ( id, quantity, price, name) => {
    dispatch({
      type: UPDATE_QUANTITY,
      payload: { rId ,id, quantity, price, name },
    });

    const updatedFilteredMenu = [...filteredMenu];

  const itemIndex = updatedFilteredMenu.findIndex((item) => item._id === id);

  if (itemIndex !== -1) {
    updatedFilteredMenu[itemIndex].quantity = quantity;
  }
    setFilteredMenu(updatedFilteredMenu);
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

  const fetchMoreData = () => {
  setTimeout(() => {
    const newStartIndex = startIndex + pageSize;
    const newEndIndex = newStartIndex + pageSize;
    const newItems = menuData.slice(newStartIndex, newEndIndex);
    console.log("is quantity change happening:", menuData, filteredMenu);
    setFilteredMenu((prevItems)=>[...prevItems, ...newItems]);
    setStartIndex(newStartIndex);
    setHasMore(newEndIndex < menuData.length);
  }, 500); // Simulating delay for API call
};

  return (
    // <ThemeProvider theme={theme}>
    <Grid className={classes.menuContainer} item xs={12}>
      <InfiniteScroll
        dataLength={filteredMenu.length} // Length of the data array
        next={fetchMoreData} // Function to load more data
        hasMore={hasMore} // Whether there is more data to load
        loader={<h4>Loading...</h4>} // Loader component displayed while loading
        endMessage={<p>That's all folks!.</p>} // Message displayed when all data is loaded
      >
        <Grid className={classes.course1} >
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
      </InfiniteScroll>
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
