
import React from 'react';
import {Typography, Link} from '@mui/material/';

export default function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://orderit.in/">
            OrderIt
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>
    );
  }