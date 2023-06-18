import {useContext,useEffect,useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../Common/Copyright';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { AccountContext } from './Account';
import { useNavigate, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import * as toast from '../../constants/ToastConstants';
import * as notify from '../../constants/ToastCaller';
import {AuthContext} from './GlobalStates';


const theme = createTheme();

const useStyles = makeStyles((theme) => ({
	error: {
		color: 'red',
		fontSize: '1rem',
	},
}));

export default function Login() {
  // const [authState,setAuthState] = useContext(AuthContext);
  const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
  const [confirmed,setConfirmed] = useState(false);
  const {state} = useLocation();
  // const { from } = state;

  const {authenticate}  = useContext(AccountContext);

  const {getSession} = useContext(AccountContext);
  const navigate = useNavigate();

 console.log("the url passed:", state)

	const classes = useStyles();

    const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

  const handleLogin = (event) => {
    // event.preventDefault();
    
    authenticate(email, password)
      .then((data) => {
        console.log("the login data from login:",data);
        // window.location.reload();
        if(state)
          navigate(state)
        else
          navigate("/orderit")
		  notify.notifySuccess(toast.loginSuccessful);
      })
      .catch((err) => {
        console.log("error:",err);
        if (err.code === 'UserNotConfirmedException'){
          navigate("/confirmEmail", {
            state: {
                name: 'Confirm User Email',
                uname: email
            },
        });
		  notify.notifySuccess(toast.loginSuccessfulConfirmCode);
      }
        // alert('login failure');
      });
  };

  // const logggedSession = async () => {
  //   getSession();
  //   // console.log("get state:",authState);
  // }
  
  // useEffect(()=>{
  //   logggedSession()
  // },[])
  
  // if (isAuthenticated) {
  //   return <Navigate to="/menu" />;
  // }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in            
          </Typography>
          <Box component="form" onSubmit={handleSubmit(handleLogin)} noValidate sx={{ mt: 1 }}>
            <TextField
            {...register('email', {
                required: true,
                maxLength: 50,
                pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
            })}
            onChange={(e) => {
                setEmail(e.target.value);
            }}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            {errors?.email?.type === 'required' && (
                <p className={classes.error}>Please enter your email</p>
            )}
            {errors?.email?.type === 'pattern' && (
                <p className={classes.error}>Please add the email in right format</p>
            )}
            <TextField
            {...register('password', {
                required: true,
                // pattern: /\d*(?:[a-zA-Z]){8,}\d*/,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}/
            })}
            onChange={(e) => {
                setPassword(e.target.value);
            }}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {errors?.password?.type === 'required' && (
                <p className={classes.error}>Please enter a password</p>
            )}
            {errors?.password?.type==="pattern" &&(
                <p className={classes.error}>Password must have the right format and atleast 8 characters</p>
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
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}