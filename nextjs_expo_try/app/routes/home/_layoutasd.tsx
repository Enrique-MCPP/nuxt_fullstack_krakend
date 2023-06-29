import React, { useState } from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";

import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { ThemeProvider, DefaultTheme } from "@react-navigation/native";
import DimTheme from '../../themes/DimTheme';

import { LogoutButton } from '../../components/LogoutButtonComponent/LogoutButton';

import COLORS from '../../themes/colors';
import { CustomDrawerComponent } from '../../components/CustomDrawerComponent/CustomDrawerComponent';
import ImageButtonComponent from '../../components/ImageButtonComponent/ImageButtonComponent';
import ProductScreen from '../../screens/ProductScreen';
import { Drawer } from '../../Drawer';




// const Drawer = createDrawerNavigator();

export default function RootLayout() {
  const [theme, setTheme] = useState(DefaultTheme);
  const router = useRouter();

  const toggleTheme = () => {
    setTheme(theme === DimTheme ? DefaultTheme : DimTheme);
  };

  return (
    <ThemeProvider value={theme}>
      <Drawer
        drawerContent={props => <CustomDrawerComponent {...props} />}
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: COLORS.appcolor,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerTintColor: COLORS.white,
          headerRight: () => (
            <View style={style.header}>
              <LogoutButton color={theme === DimTheme ? COLORS.dark : COLORS.white} />
              <MaterialCommunityIcons
                name="theme-light-dark"
                size={24}
                color={COLORS.white}
                onPress={toggleTheme}
                style={style.headerButton}
              />
              <AntDesign
                name="questioncircleo"
                size={24}
                color={COLORS.white}
                onPress={() => router.push('/about')}
                style={style.headerButton}
              />
            </View>
          ),
          headerLeft: () => (
            <View style={style.headerLeftContainer}>
              <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={style.menuButton}
              >
                <MaterialCommunityIcons
                  name="menu"
                  size={24}
                  color={COLORS.white}
                />
              </TouchableOpacity>
              <ImageButtonComponent
                onPress={() => navigation.navigate('MyPets')}
                source={require('../../assets/logos/rokiski-aire.png')}
                style={style.imageStyle}
                resizeMode='contain'
              />
            </View>
          ),

        })}



      >
        <Drawer.Screen
          name="/"
         
          options={{
            title: 'Products',
            drawerIcon: ({ color }) => (

              <MaterialIcons name="pets" size={24} color={color} />
            ),
          }}
        />


       
      </Drawer>
    </ThemeProvider>
  );

}
const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerButton: {
    marginHorizontal: 5
  },
  imageStyle: {
    width: Platform.OS === 'web' ? 0 : 40,
    height: Platform.OS === 'web' ? 50 : 40,
    borderRadius: Platform.OS === 'web' ? 50 / 2 : 40 / 2,
    overflow: "hidden",
    marginHorizontal: 10,
    marginLeft: 10,
  },

  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    maxWidth: '50%',
  },
  menuButton: {
    marginLeft: 10,
    marginRight: 10,
  },

});

