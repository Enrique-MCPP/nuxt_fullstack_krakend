import {
    // Import the creation function
    createDrawerNavigator,
    // Import the types
    DrawerNavigationOptions,
  } from "@react-navigation/drawer";
  
  import { withLayoutContext } from "expo-router";
  
  const { Navigator } = createDrawerNavigator();
  

  export const Drawer = withLayoutContext<
    DrawerNavigationOptions,
    typeof Navigator
  >(Navigator);