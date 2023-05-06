import React from "react";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, Box, Typography, IconButton, ListItemAvatar, Avatar, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import "./MenuList.css";


const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      display: "flex", // added
      justifyContent: "center", // added
    },
    background:{
        backgroundColor:  '#2a265f'
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

export const Checkout = () => {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
  const totalState = useSelector((state) => state.menu);
  console.log("the state now:",totalState)

  const classes = useStyles();

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));
  

  return (
    <Box className={classes.root}>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2, textAlign: "center" }} variant="h6" component="div">
          Your Cart!
        </Typography>
        {
            totalState.dirtyItems!== ""?
            totalState.dirtyItems.map((item)=>{
        return(<Demo  className="course">
          <List dense={dense}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon style={{ color: "#2a265f" }}/>
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.id + ' - ' + item.quantity}
                  secondary={secondary ? "Secondary text" : null}
                />
              </ListItem>
          </List>
        </Demo>)

            }):null
        }
        <div className={classes.footer}>
          <Button variant="contained" color="primary">
            Place Order
          </Button>
        </div>
      </Grid>
    </Box>
  );
};

export default Checkout;
