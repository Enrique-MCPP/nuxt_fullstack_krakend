import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, Platform, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Provider } from './context/auth';
import { LogoutButton } from './components/LogoutButtonComponent/LogoutButton';
import ImageButtonComponent from './components/ImageButtonComponent/ImageButtonComponent';
import COLORS from './themes/colors';
import { ThemeProvider, DefaultTheme } from "@react-navigation/native";
import DimTheme from './themes/DimTheme';
import { Drawer } from './Drawer';
import { CustomDrawerComponent } from './components/CustomDrawerComponent/CustomDrawerComponent';



export default () => {

  const [theme, setTheme] = useState(DefaultTheme);
  const router = useRouter();

  const toggleTheme = () => {
    setTheme(theme === DimTheme ? DefaultTheme : DimTheme);
  };
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (

    <Provider >
      <ThemeProvider value={theme}>

        <View style={{ flex: 1 }}>





          <Stack
           

          >

          

          </Stack>

        </View>
      
      </ThemeProvider>
    </Provider >

  );

};
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
    width: Platform.OS === 'web' ? 100 : 40,
    height: Platform.OS === 'web' ? 100 : 40,
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