import {
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/core";
const RoomScreen = () => {
  const route = useRoute();
  console.log(route.params.item);
  return (
    <View>
      <Text>Je suis la Room!</Text>
      <FlatList
        horizontal={true}
        data={route.params.item.photos}
        keyExtractor={(elem) => elem.picture_id}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.url }}
            style={{ width: 200, height: 140 }}
            resizeMode="contain"
          />
        )}
      />
    </View>
  );
};

export default RoomScreen;
