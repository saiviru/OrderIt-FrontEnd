import React from "react";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../Common/Copyright";
import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import UserPool from "../../UserPool";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import * as toast from "../../constants/ToastConstants";
import * as notify from "../../constants/ToastCaller";

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  error: {
    color: "red",
    fontSize: "1rem",
  },
}));

export default function SignUp() {
  const [firstName, setfirstName] = React.useState("");
  const [lastName, setlastName] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [passError, setpassError] = React.useState(null);
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const classes = useStyles();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleLogin = (event) => {
    console.log({
      email: email,
      password: password,
    });
    const attributeList = [];
    attributeList.push(
      new CognitoUserAttribute({
        Name: "email",
        Value: email,
      })
    );
    attributeList.push(
      new CognitoUserAttribute({
        Name: "phone_number",
        Value: "+91" + mobile,
      })
    );
    attributeList.push(
      new CognitoUserAttribute({
        Name: "name",
        Value: firstName + lastName,
      })
    );

    UserPool.signUp(email, password, attributeList, null, (err, data) => {
      if (err) {
        console.log(err);
		setpassError(err);
        alert("Couldn't sign up"+err);
      } else {
        console.log("data into aws:", data);
        notify.notifySuccess(toast.loginSuccessfulConfirmCode);
        navigate("/confirmEmail", {
          state: {
            name: "Confirm User Email",
            uname: email,
          },
        });
      }
    });
  };

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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleLogin)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("firstName", {
                    required: true,
                    maxLength: 10,
                    pattern: /\d*(?:[a-zA-Z]){3,}\d*/,
                  })}
                  onChange={(e) => {
                    setfirstName(e.target.value);
                  }}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
                {errors?.firstName?.type === "required" && (
                  <p className={classes.error}>Please enter your First Name</p>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("lastName", {
                    required: true,
                    maxLength: 10,
                    // minLength: 3,
                    pattern: /\d*(?:[a-zA-Z]){3,}\d*/,
                  })}
                  onChange={(e) => {
                    setlastName(e.target.value);
                  }}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
                {errors?.lastName?.type === "required" && (
                  <p className={classes.error}>Please enter your Last Name</p>
                )}
                {errors?.lastName?.type === "pattern" && (
                  <p className={classes.error}>
                    Please add the name in right format
                  </p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("mobile", {
                    required: true,
                    maxLength: 10,
                    pattern: /^[6-9]\d{9}$/,
                  })}
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                  required
                  fullWidth
                  id="mobileNumber"
                  label="Mobile Number"
                  name="mobile"
                  autoComplete="phone"
                />
                {errors?.mobile?.type === "required" && (
                  <p className={classes.error}>
                    Please enter your mobile number
                  </p>
                )}
                {errors?.mobile?.type === "pattern" && (
                  <p className={classes.error}>
                    Please add the phone in right format
                  </p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("email", {
                    required: true,
                    maxLength: 50,
                    pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                  })}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                {errors?.email?.type === "required" && (
                  <p className={classes.error}>Please enter your email</p>
                )}
                {errors?.email?.type === "pattern" && (
                  <p className={classes.error}>
                    Please add the email in right format
                  </p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("password", {
                    required: true,
                    // pattern: /\d*(?:[a-zA-Z]){8,}\d*/,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
                  })}
                  onChange={(e) => {
                    setPassword(e.target.value);
					setpassError(null)
                  }}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                {errors?.password?.type === "required" && (
                  <p className={classes.error}>Please enter a password</p>
                )}
                {errors?.password?.type === "pattern" && (
                  <p className={classes.error}>
                    Password must have at least 8 characters
                  </p>
                )}
                {passError && (
                  <p className={classes.error}>
                    Please use a number, a capital letter combination
                  </p>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
