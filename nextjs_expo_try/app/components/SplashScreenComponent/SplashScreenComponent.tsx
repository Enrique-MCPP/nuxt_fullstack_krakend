// SplashScreenComponent.js
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Redirect, SplashScreen } from 'expo-router';
import { useAuth } from '../../context/auth';

const SplashScreenComponent = () => {
  const { user } = useAuth();
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    setTimeout(() => {
      setReady(true);
      SplashScreen.hideAsync();
    }, 3000); // Cambia el tiempo según tus necesidades
  }, []);

  if (!isReady && !user) {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/logos/rokiski-aire-new.png')}
          style={styles.image}
        />
      </View>
    );
  }

  return <Redirect href={user ? '/screens/HomeScreen' : '/routes/(auth)/SignInScreen'} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffff',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});

export default SplashScreenComponent;
