import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { createContext,useContext, useEffect } from 'react';
import UserPool from '../../UserPool';
import { useDispatch } from 'react-redux';
import { USER_DETAILS } from '../redux/user/ActionTypes'

const AccountContext = createContext();

const Account = (props) => {
  const dispatch = useDispatch();
  // const { login } = useContext(AuthContext);

  const getSession = async () => {
    await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject(err);
          } else {
            console.log("the user session from get session:",session.idToken.payload)
            dispatch({ type: USER_DETAILS, payload: session.idToken.payload })
            // login(session.idToken.jwtToken);
            // setAuthState({
            //   ...setAuthState,
            //   _id:session.idToken.jwtToken,
            //   email: 'session.idToken.payload.email',
            //   name: session.idToken.payload.name,
            //   phone: session.idToken.payload.phone_number
            // })
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });
  };

  const authenticate = async (Username, Password) => {
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username,
        Pool: UserPool,
      });

      const authDetails = new AuthenticationDetails({
        Username,
        Password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (result) => {
          console.log('login success', result.idToken.payload);
          console.log("the user from get session:",user.signInUserSession.accessToken.jwtToken);
          localStorage.setItem('token', JSON.stringify(result.idToken.jwtToken));
          // dispatch({ type: LOGGED_USER, payload: result.idToken.payload })
          // login(result.idToken.jwtToken);
          resolve(result);
        },
        onFailure: (err) => {
          console.log('login failure', err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log('new password required', data);
          resolve(data);
        },
      });
    });
  };

  const confirmUser = async (email,code) => {
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username:email,
        Pool: UserPool,
      });

      console.log('the details in account:',email,code)
      user.confirmRegistration(code, true, (err,result) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        resolve(result)
      })
    });
  }

  const resendConfirmation = async (email) => {
    await new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username:email,
        Pool: UserPool,
      });
      cognitoUser.resendConfirmationCode(function(err, result) {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        console.log('call result: ' + JSON.stringify(result));
      });
    })
  }

  const logout = () => {
    const user = UserPool.getCurrentUser();
    user.signOut();
    window.location.href = '/';
    logout();
  };


  return (
    <AccountContext.Provider value={{ authenticate, getSession, logout, confirmUser, resendConfirmation }}>
        {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };