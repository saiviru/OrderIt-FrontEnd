import React from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { makeStyles } from "@mui/styles";





const useStyles = makeStyles((theme) => ({
  codeBar:{
    margin:'30px',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
  },
  scanCode:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
   width:'95%',
   height:'300px',
   border:'1px solid black',
   marginTop:'30px',
  //  backgroundImage: `url(${qrCodeImage})`,
   backgroundSize: 'cover',
   backgroundPosition: 'center',
  },

  tableNo:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    marginTop:'30px'
  }

}));

const ViewQR = () => {
  const classes = useStyles();
  const handleScan = (data) => {
    if (data) {
      // Handle scanned QR code data
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <div  className={classes.codeBar}>

     
      <Typography variant="h6" align="center" gutterBottom>
        Scan QR Code
      </Typography>
      <div  className={classes.scanCode} style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
       
      </div>
      <div className={classes.tableNo}>
      <Typography variant="h6" align="center" gutterBottom>
       Table.No : 1 
      </Typography>
      </div>
        
      
      {/* <Button variant="contained" color="primary" fullWidth>
        Submit
      </Button> */}
    </div>
  );
};

export default ViewQR;
