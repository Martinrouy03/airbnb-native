{
  () => (
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
            <Stack.Screen name="Home">{() => <HomeScreen />}</Stack.Screen>
          </Stack.Navigator>;
        }}
      </Tab.Screen>
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
