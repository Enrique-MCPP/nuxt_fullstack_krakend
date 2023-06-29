import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Link, Redirect } from 'expo-router';
import { useAuth } from './context/auth';





const SplashScreenComponent = () => {

    const { user } = useAuth();
    return <Link href={user ? '/' : '/routes/(auth)/SignInScreen'} />
    // return <Redirect href={'/(auth)/SignInScreen'} />
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#009ca6',
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
});

export default SplashScreenComponent;