import React from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    // position: 'fixed',
    // top: theme.spacing(8), // Adjust this value to set the distance below the header
    // left: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
   padding: theme.spacing(2),
    // zIndex: theme.zIndex.appBar + 1, // Ensure the search bar is above the header
  },
  searchInput: {
    flex: 1,
  },
}));

const SearchBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.searchContainer}>
      <TextField
        className={classes.searchInput}
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton aria-label="search">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchBar;
