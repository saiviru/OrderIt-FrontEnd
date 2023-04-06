import React from 'react';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../Common/Copyright';
import { makeStyles } from '@mui/styles';
import { useForm } from 'react-hook-form';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import UserPool from '../../UserPool';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import * as toast from '../../constants/ToastConstants'
import * as notify from '../../constants/ToastCaller';


const theme = createTheme();

const useStyles = makeStyles((theme) => ({
	error: {
		color: 'red',
		fontSize: '1rem',
	},
}));

export default function SignUp() {
	const [name, setName] = React.useState('');
	const [mobile, setMobile] = React.useState('');
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
			name: name,
			mobile: mobile,
		});
		const attributeList = [];
	attributeList.push(
		new CognitoUserAttribute({
		  Name: 'phone_number',
		  Value: '+91'+mobile,
		})
	  );
	  attributeList.push(
		new CognitoUserAttribute({
		  Name: 'name',
		  Value: name,
		})
	  );

	UserPool.signUp(attributeList, null, (err, data) => {
		if (err) {
		  console.log(err);
		  alert("Couldn't sign up");
		} else {
		  console.log("data into aws:",data);
		  notify.notifySuccess(toast.loginSuccessfulConfirmCode);
		  navigate('/confirmEmail',
		  {state: {
			name: 'Confirm User Email',
			uname: name
		}
		})
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
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Box component="form" noValidate onSubmit={handleSubmit(handleLogin)} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									{...register('name', {
										required: true,
										maxLength: 10,
										pattern: /\d*(?:[a-zA-Z]){3,}\d*/,
									})}
									onChange={(e) => {
										setName(e.target.value);
									}}
									autoComplete="given-name"
									name="name"
									required
									fullWidth
									id="name"
									label="Name"
									autoFocus
								/>
								{errors?.name?.type === 'required' && (
									<p className={classes.error}>Please enter your First Name</p>
								)}
							</Grid>
							<Grid item xs={12}>
								<TextField
									{...register('mobile', {
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
								{errors?.mobile?.type === 'required' && (
									<p className={classes.error}>Please enter your mobile number</p>
								)}
								{errors?.mobile?.type === 'pattern' && (
									<p className={classes.error}>Please add the phone in right format</p>
								)}
							</Grid>
							<Grid item xs={12}>
								<FormControlLabel
									control={<Checkbox value="allowExtraEmails" color="primary" />}
									label="I want to receive inspiration, marketing promotions and updates via email."
								/>
							</Grid>
						</Grid>
						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
