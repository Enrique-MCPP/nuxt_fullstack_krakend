import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Text,
  Switch,
  Platform,
} from 'react-native';
import { translate } from '../../assets/i18n/Language';
import { useAuth } from '../../context/auth';
import CustomInput from '../../components/CustomInputComponent/CustomInput';
import CustomButton from '../../components/CustomButtonComponent/CustomButton';

import { useRouter, useLocalSearchParams } from 'expo-router';
import { useForm } from 'react-hook-form';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import SplashScreenComponent from '../../components/SplashScreenComponent/SplashScreenComponent';
import {

  getCredentials,

} from '../../utils/secureStore';


const SignInScreen = () => {
  const { control, handleSubmit, formState: { errors }, setValue } = useForm();
  const { height } = useWindowDimensions();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setToken } = useAuth();
  const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const params = useLocalSearchParams();


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplashScreen(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const setSavedCredentials = async () => {
      const { email, password } = await getCredentials();
      setValue('email', email);
      setValue('password', password);
    };

    setSavedCredentials();
  }, []);

  const isPhone = Platform.OS === 'ios' || Platform.OS === 'android';

  const onSignInPressed = async data => {
    console.log(' onSignInPressed');
    if (loading) {
      return;
    }
    setLoading(true);

    // datos del grupo pool
    const poolData = {
      UserPoolId: 'eu-north-1_33klhhKsD',
      ClientId: '5373om1508vq8fjrtseto2vcu',
    };
    const userPool = new CognitoUserPool(poolData);

    // datos del user
    const userData = {
      Username: data.email,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    // credenciales
    const authData = {
      Username: data.email,
      Password: data.password,
    };

    const authDetails = new AuthenticationDetails(authData);

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: function (result) {
        cognitoUser.getSession((err, session) => {

          if (err) {
            alert(err.message || JSON.stringify(err));
            return;
          }
          const idToken = session.getIdToken().getJwtToken();
          setToken(idToken);
        });
        router.push('/');

      },

      onFailure: function (err) {
        alert(err.message);
      },
    });

    setLoading(false);
  };



  if (showSplashScreen && (Platform.OS === 'android' || Platform.OS === 'ios')) {
    return <SplashScreenComponent />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={!isPhone && styles.container || styles.containerMobile}>
      <View style={styles.root}>
        <Image
          source={require('../../assets/logos/rokiski-aire-new.png')}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <CustomInput
          name="email"
          control={control}
          placeholder={translate('login.email')}
          secureTextEntry={false}
          rules={{
            required: 'Email is required',
            pattern: { value: EMAIL_REGEX, message: translate('login.emailRequired') },
          }}
        />

        <CustomInput
          name="password"
          placeholder={translate('login.password')}
          secureTextEntry
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 3,
              message: translate('login.passwordRequired'),
            },
          }}
        />

        <CustomButton
          text={loading ? 'Loading...' : translate('login.login')}
          onPress={handleSubmit(onSignInPressed)}
          bgColor={undefined}
          fgColor={undefined}
        />


      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
  
  },
  containerMobile: {
    backgroundColor: 'white',
  },
  root: {
    alignItems: 'center',
    padding: 20,
    margin: 'auto',
    marginTop: 30,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  logo: {
    width: '80%',
    maxWidth: 350,
    maxHeight: 150,
    marginBottom: 20,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  rememberMeText: {
    fontWeight: 'bold',
    color: 'gray',
  },
});

export default SignInScreen;
