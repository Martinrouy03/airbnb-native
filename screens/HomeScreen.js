import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";

import { useState, useEffect } from "react";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
      );
      setIsLoading(false);
      setData(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const myRatingFunc = (nb) => {
    let ratingTab = [];
    for (let i = 0; i < 5; i++) {
      if (i < nb) {
        ratingTab.push(<Entypo name="star" size={24} color="gold" />);
      } else {
        ratingTab.push(<Entypo name="star" size={24} color="lightgrey" />);
      }
    }
    return ratingTab;
  };
  return isLoading ? (
    <View>
      <ActivityIndicator />
    </View>
  ) : (
    <FlatList
      style={{ paddingHorizontal: 20 }}
      data={data}
      keyExtractor={(elem) => elem._id}
      renderItem={({ item }) => (
        <View style={{ marginVertical: 10 }}>
          <Pressable
            onPress={() => {
              navigation.navigate("Room", { id: item._id });
            }}
          >
            <Image
              source={{ uri: item.photos[0].url }}
              style={{ width: "100%", height: 200, position: "relative" }}
              resizeMode="cover"
            ></Image>
          </Pressable>
          <Text
            style={{
              backgroundColor: "black",
              color: "white",
              width: 100,
              position: "absolute",
              bottom: 100,
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 10,
            }}
          >
            {item.price} €
          </Text>
          <View style={styles.bottomDiv}>
            <View style={styles.leftDesc}>
              <Text
                style={{ fontSize: 18, paddingVertical: 5 }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.title}
              </Text>
              <View style={styles.rating}>
                {myRatingFunc(item.ratingValue)}
                <Text style={styles.review}>{item.reviews} reviews</Text>
              </View>
            </View>
            <Image
              style={styles.avatar}
              source={{ uri: item.user.account.photo.url }}
            />
          </View>
          {/* <Image source={item.photos[0].url}></Image> */}
        </View>
      )}
    />
    // <Text>Je suis la page HomeScreen</Text>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  bottomDiv: {
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  leftDesc: {
    flex: 1,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  review: {
    fontSize: 14,
    color: "grey",
    paddingLeft: 5,
  },
});
