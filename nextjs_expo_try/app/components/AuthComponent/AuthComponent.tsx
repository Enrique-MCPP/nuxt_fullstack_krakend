import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const AuthComponent = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    var poolData = {
      UserPoolId: 'eu-north-1_33klhhKsD', // Your user pool id here
      ClientId: '5373om1508vq8fjrtseto2vcu', // Your client id here
    };
    var userPool = new CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.getSession(function (err, session) {
        if (err) {
          alert(err.message || JSON.stringify(err));
        }
        setIsAuthenticated(session.isValid());
      });
    } else {
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return <Redirect href="routes/(auth)/SignInScreen" />;
  }
};

export default AuthComponent;
