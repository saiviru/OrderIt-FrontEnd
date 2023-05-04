import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AdjustIcon from "@mui/icons-material/Adjust";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
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
}));

const baseURL = "https://apisuper.thedigitallicious.online/api";

const MenuList = () => {
  const [menu, setMenu] = useState("");

  console.log("before useEffect:");

  useEffect(() => {
    axios.get(baseURL + "/menuGet").then((response) => {
      setMenu(response.data);
    });
    console.log("res:");
  }, []);

  console.log("after useEffect");

  const classes = useStyles();
  console.log("menu");

  return (
    <ThemeProvider theme={theme}>
      <Grid className="courses-container" item xs={12}>
        <Grid>
          {menu !== ""
            ? menu.map((item) => {
                return (
                  <Grid className="course">
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
                      <Box className={classes.buttonHolder} component="span">
                        <Box component="button" className={classes.addButtons}>
                          -
                        </Box>{" "}
                        1{" "}
                        <Box component="button" className={classes.addButtons}>
                          +
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                );
              })
            : null}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default MenuList;
