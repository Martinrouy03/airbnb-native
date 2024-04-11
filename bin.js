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

{
  /* <FlatList
          horizontal={true}
          data={data.photos}
          keyExtractor={(elem) => elem.picture_id}
          renderItem={({ item }) => (
            // <Image
            //   source={{ uri: item.url }}
            //   style={{ width: 200, height: 140 }}
            //   resizeMode="contain"
            // />

            <Image
              source={{ uri: item.url }}
              style={{ width: "100%", height: 300 }}
              resizeMode="contain"
            />
          )}
        /> */
}
