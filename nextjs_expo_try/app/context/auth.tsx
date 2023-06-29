// auth.tsx
import { useRouter, useSegments } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

function useProtectedRoute(user) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const poolData = {
      UserPoolId: 'eu-north-1_33klhhKsD',
      ClientId: '5373om1508vq8fjrtseto2vcu',
    };

    const userPool = new CognitoUserPool(poolData);
    const cognitoCurrentUser = userPool.getCurrentUser();

    const inAuthGroup = segments[1] === '(auth)';

    if (!cognitoCurrentUser && !inAuthGroup) {
      router.push('/routes/SignInScreen');
    } else if (user && inAuthGroup) {
      router.push('/');
    }
  }, [user, segments]);
}

export function Provider(props) {
  const [user, setAuth] = useState(null);
  const [token, setToken] = useState(null); // Nuevo estado para el token
  const [rememberMe, setRememberMe] = useState(false);

  useProtectedRoute(user);

 
  const signOut = () => {
    var poolData = {
      UserPoolId: 'eu-north-1_33klhhKsD',
      ClientId: '5373om1508vq8fjrtseto2vcu',
    };
    var userPool = new CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
    }
    setAuth(null);
    setToken(null);
  };

  useEffect(() => {
    const poolData = {
      UserPoolId: 'eu-north-1_33klhhKsD',
      ClientId: '5373om1508vq8fjrtseto2vcu',
    };

    const userPool = new CognitoUserPool(poolData);
    const cognitoCurrentUser = userPool.getCurrentUser();

    if (cognitoCurrentUser) {
      cognitoCurrentUser.getSession((err, session) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        // Guardar el token en el estado
        const idToken = session.getIdToken().getJwtToken();
        setToken(idToken);

        cognitoCurrentUser.getUserAttributes((err, result) => {
          if (err) {
            alert(err.message || JSON.stringify(err));
            return;
          }
          setAuth({ user: cognitoCurrentUser, attributes: result });
        });
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn: () => setAuth({}),
        signOut: signOut,
        user,
        token,
        rememberMe,
        setToken,
        setRememberMe,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
