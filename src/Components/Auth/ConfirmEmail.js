import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../Common/Copyright";
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom'
import { AccountContext } from './Account';
import 'react-toastify/dist/ReactToastify.css';
import * as toast from '../../constants/ToastConstants'
import * as notify from '../../constants/ToastCaller';




const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  error: {
    color: "red",
    fontSize: "1rem",
  },
}));

export default function ConfirmEmail() {
  const [code, setCode] = React.useState('');
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state.uname;
  const {confirmUser}  = React.useContext(AccountContext);
  const {resendConfirmation} = React.useContext(AccountContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleCode = (event) => {
    console.log("the current user:",username);
    // var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    confirmUser(username,code)
    .then((data) => {
      console.log("the login data from confirm email:",data);
      // alert('login success');
      navigate('/login',{ replace: true });
			notify.notifySuccess(toast.emailConfirmed);
    })
    .catch((err) => {
      console.log("error:",err);
      // alert('login failure');
    });
  };

  const resend =() =>{
    resendConfirmation(username);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Enter the code to Confirm Email
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(handleCode)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              {...register("code", {
                required: true,
                maxLength: 10,
                // pattern: /^[6-9]\d{9}$/,
              })}
              onChange={(e) => {
                setCode(e.target.value);
              }}
              required
              fullWidth
              id="code"
              label="Code"
              name="code"
            />
            {errors?.code?.type === "required" && (
              <p className={classes.error}>Please enter the code</p>
            )}
            {errors?.code?.type === "pattern" && (
              <p className={classes.error}>
                Please add the phone in right format
              </p>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link onClick={resend}>
                  Resend confirmation code?
                </Link>
              </Grid>
              <Grid item>
                {/* <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
