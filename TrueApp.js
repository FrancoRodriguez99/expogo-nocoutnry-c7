import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UploadPhoto from "./pages/UploadPhoto";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import OtherOptions from "./pages/OtherOptions";
import MaterialComunityIcons from "react-native-vector-icons/Ionicons";
import { LogIn } from "./redux/slices/userSlice";
import { useEffect } from "react";
import { localStorageCart } from "./redux/slices/cartSlice";
import { useLanguage } from "./hooks/useLanguage";
import { localLang } from "./redux/slices/langSLice";
import Cart from "./pages/Cart";

//Redux toolkit
import { useDispatch, useSelector } from "react-redux";

//Storage local
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TrueApp() {
  const langstring = useSelector((state) => state.lang.lang);
  const { tabScreen } = useLanguage(langstring);

  const dispatch = useDispatch();
  useEffect(() => {
    async function f() {
      const vj = await AsyncStorage.getItem("user");
      const v = vj !== null ? JSON.parse(vj) : false;
      if (v) {
        dispatch(LogIn(v));
      }
    }

    f();
  }, []);

  useEffect(() => {
    async function f() {
      const cart = await AsyncStorage.getItem("cart");
      dispatch(localStorageCart(JSON.parse(cart)));
    }
    f();
  }, []);

  useEffect(() => {
    async function f() {
      const lang = await AsyncStorage.getItem("lang");
      dispatch(localLang(lang));
    }
    f();
  }, []);

  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name={tabScreen.home}
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialComunityIcons
                name="home-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name={tabScreen.profile}
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialComunityIcons
                name="person-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name={tabScreen.upload}
          component={UploadPhoto}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialComunityIcons
                name="cloud-upload-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name={tabScreen.options}
          component={OtherOptions}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialComunityIcons
                name="options-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Tab.Screen
          name={tabScreen.cart}
          component={Cart}
          options={{
            tabBarButton: () => null,
            tabBarVisible: false, //hide tab bar on this screen
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
