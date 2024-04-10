import { StyleSheet, Text, View } from "react-native";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingScreens";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [userToken, setUserToken] = useState("");
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
          <Stack.Screen name="Tab">
            {() => {
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Tab.Screen
                  name="HomeTab"
                  options={{
                    tabBarLabel: "Home",
                  }}
                >
                  {() => {
                    <Stack.Navigator>
                      <Stack.Screen name="Home">
                        {() => <HomeScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>;
                  }}
                </Tab.Screen>
                <Tab.Screen name="Settings" component={SettingsScreen} />
              </Tab.Navigator>;
            }}
          </Stack.Screen>
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
