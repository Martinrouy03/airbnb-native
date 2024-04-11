import { StyleSheet, Text, View, Image } from "react-native";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingScreens";
import RoomScreen from "./screens/RoomScreen";
import AroundMeScreen from "./screens/AroundMeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logo from "./assets/airbnb-logo.png";
import { Ionicons } from "@expo/vector-icons";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [userToken, setUserToken] = useState("");
  useEffect(() => {
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("token");
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserToken(userToken);
      setIsLoading(false);
    };
    bootstrapAsync();
  }, []);
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        {!userToken ? (
          <>
            <Stack.Screen name="SignIn" options={{ headerShown: false }}>
              {() => <SignInScreen setUserToken={setUserToken} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp" options={{ headerShown: false }}>
              {() => <SignUpScreen setUserToken={setUserToken} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Tab" options={{ headerShown: false }}>
              {() => (
                <Tab.Navigator
                  screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;
                      if (route.name === "HomeTab") {
                        iconName = focused ? "home" : "home-outline";
                      } else if (route.name === "Settings") {
                        iconName = focused ? "settings" : "settings-outline";
                      } else if (route.name === "AroundMe") {
                        iconName = focused
                          ? "location-sharp"
                          : "location-outline";
                      }

                      // You can return any component that you like here!
                      return (
                        <Ionicons name={iconName} size={size} color={color} />
                      );
                    },
                    tabBarActiveTintColor: "tomato",
                    tabBarInactiveTintColor: "gray",
                  })}
                >
                  <Tab.Screen
                    name="HomeTab"
                    options={{
                      tabBarLabel: "Home",
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen
                          name="Home"
                          options={{
                            headerTitle: () => (
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: "100%",
                                }}
                              >
                                <Image
                                  source={logo}
                                  style={{ width: 50, height: 75 }}
                                  resizeMode="contain"
                                ></Image>
                              </View>
                            ),
                            // headerStyle: { flex: 1, alignItems: "center" },
                          }}
                        >
                          {() => <HomeScreen />}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                  <Tab.Screen
                    name="AroundMe"
                    component={SettingsScreen}
                    options={{
                      tabBarLabel: "Around me",
                    }}
                  ></Tab.Screen>
                  <Tab.Screen
                    name="Settings"
                    component={AroundMeScreen}
                    options={{
                      tabBarLabel: "Settings",
                    }}
                  />
                </Tab.Navigator>
              )}
            </Stack.Screen>
            <Stack.Screen name="Room">{() => <RoomScreen />}</Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
