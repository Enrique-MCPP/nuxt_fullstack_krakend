import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Linking, View, Image, Text, Platform, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import { Link, useRouter, useSegments, usePathname, Stack } from "expo-router";
import { Provider } from "./context/auth";
import { useState } from "react";
import DimTheme from "./themes/DimTheme";
import COLORS from "./themes/colors";
import { LogoutButton } from "./components/LogoutButtonComponent/LogoutButton";
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { ThemeProvider, DefaultTheme } from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import ImageButtonComponent from "./components/ImageButtonComponent/ImageButtonComponent";

function CustomDrawerContent(props) {
  const [theme, setTheme] = useState(DefaultTheme);
  const router = useRouter();

  const toggleTheme = () => {
    setTheme(theme === DimTheme ? DefaultTheme : DimTheme);
  };

  const [activeRoute, setActiveRoute] = useState('/');

  const handleNavigation = (route) => {
    setActiveRoute(route);
    router.push(route);
  }

  const DrawerButton = ({ buttonTitle, route, iconName, activeRoute, handleNavigation }) => {
    const isActive = activeRoute === route;
    return (
      <TouchableOpacity
        style={style.button}
        onPress={() => handleNavigation(route)}
      >
        <MaterialIcons
          name={iconName}
          size={24}
          color={isActive ? COLORS.appcolor : COLORS.grey}
          style={style.icon}
        />
        <Text style={{ color: isActive ? COLORS.appcolor : COLORS.grey }}>{buttonTitle}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <DrawerContentScrollView {...props}>
      <View style={style.container}>
        <Image
          source={require('./assets/person/person.jpg')}
          style={{ height: 70, width: 70, borderRadius: 20 }}
        />
        <Text
          style={{
            color: theme === DimTheme ? COLORS.white : COLORS.dark,
            fontWeight: 'bold',
            fontSize: 18,
            marginTop: 10,
            marginBottom: 50
          }}>
          Comandante Fernández
        </Text>
        <DrawerButton buttonTitle="ProductScreen 1" route="/screens/ProductScreen" iconName="home" activeRoute={activeRoute} handleNavigation={handleNavigation} />
        <DrawerButton buttonTitle="ProductScreen 3" route="/screens/ProductScreenThree" iconName="pets" activeRoute={activeRoute} handleNavigation={handleNavigation} />
      </View>
    </DrawerContentScrollView>
  );
}


export default function Layout() {
  const pathname = usePathname();

  const screenTitles = {
    ProductScreen: "Custom Title for ProductScreen",
    ProductScreenThree: "Custom Title for ProductScreenThree",
    // Agrega más componentes de pantalla y sus títulos aquí según sea necesario
  };

  const screenName = pathname.substring(pathname.lastIndexOf("/") + 1);
  const drawerTitle = screenTitles[screenName] || screenName;

  const [theme, setTheme] = useState(DefaultTheme);
  const router = useRouter();
  const segments = useSegments();

  const toggleTheme = () => {
    setTheme(theme === DimTheme ? DefaultTheme : DimTheme);
  };

  const inAuthGroup = segments[1] === '(auth)';

  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;


  return (
    <Provider>
      <ThemeProvider value={theme}>
        <Drawer
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={({ navigation }) => ({
            headerShown: inAuthGroup ? false : true,
            headerStyle: {
              backgroundColor: COLORS.appcolor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'left', // Aquí está la modificación
            title: drawerTitle,
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
            headerTitle: () => (
              <View style={isLargeScreen ? style.headerLeftContainerLarge : style.headerLeftContainerSmall}>
                <ImageButtonComponent
                  onPress={() => router.push('/')}
                  source={require('./assets/logos/rokiski-aire-new.png')}
                  style={style.imageStyle}
                  resizeMode='contain'
                />
              </View>
            ),
          })}
        >


        </Drawer>
      </ThemeProvider>
    </Provider>
  );
}

const style = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginVertical: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerButton: {
    marginHorizontal: 5
  },
  headerLeftContainerSmall: {
    flexDirection: 'row',
    marginRight: 'auto',
  },
  headerLeftContainerLarge: {
    flexDirection: 'row',
    marginRight: 'auto',
  },
  imageStyle: {
    width: 100,
    height: 100,
  },

});
