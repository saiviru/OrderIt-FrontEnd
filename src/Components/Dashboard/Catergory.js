import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import image from "../Dashboard/image.jpg"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    overflowX: "auto",
    // position: "fixed",
    marginTop:'60px'
  
    // top: theme.spacing(10),
    // top: 0,
    // left: 0,
    // zIndex: theme.zIndex.appBar,
  },
  categoriesView:{
    display:'flex',
    flexDirection:'column',
    justifyContent:"space-between",
    alignItems:"center"
  },
  categoriesText:{
    marginTop:'6px'
  },
  circle: {
    borderRadius: "50% !important",
    width: "60px",
    height: "60px",
    minWidth: "unset",
    overflow: "hidden",
    margin: "10px !important",
    // border: '2px solid' + theme.palette.primary.main + "!important",
    backgroundImage:`url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));

const CircularButton = () => {
  const [categories, setCategories] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/resCategories/646058aaaf095c028401264a`
        );
        const categories = response.data;
        console.log( categories.data);
        setCategories(categories.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {categories && categories.length > 0 ? (
        categories.map((category, i) => {
        return(
          <div className={classes.categoriesView}>
            <Button
              variant="container"
              color="primary"
              key={i}
              className={classes.circle}
            ></Button>
            <h6 className={classes.categoriesText}>{category}</h6>
          </div>
        )
        })
      ) : (
        <div>no categories </div>
      )}
    </div>
  );
};

export default CircularButton;
