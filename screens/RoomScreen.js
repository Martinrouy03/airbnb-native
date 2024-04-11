import {
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Swiper from "react-native-swiper";
import { Entypo } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/core";
import axios from "axios";
import { useState, useEffect } from "react";
import MyMapView from "../components/MyMapView";

const RoomScreen = () => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [viewMore, setViewMore] = useState(false);
  const route = useRoute();
  const id = route.params.id;
  const url =
    "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/" + id;
  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setIsLoading(false);
      // console.log(url);
      setData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
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
  useEffect(() => {
    fetchData();
  }, []);
  console.log(data.location[1]);
  const obj = {
    longitude: data.location[0],
    latitude: data.location[1],
    title: data.title,
    description: data.description,
  };
  console.log(obj);
  return isLoading ? (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator />
    </View>
  ) : (
    <View style={{ paddingHorizontal: 20 }}>
      {/* <Swiper style={{}} showsButtons={true} loop={false}>
        {data.photos.map((photo) => {
          return (
            <View key={photo.picture_id}>
              <Text>{photo.picture_id}</Text>
              <Image
                source={{ uri: photo.url }}
                style={{ width: 200, height: 140 }}
                resizeMode="contain"
              />
            </View>
          );
        })}
      </Swiper> */}
      <View style={styles.bottomDiv}>
        <View style={styles.leftDesc}>
          <Text
            style={{ fontSize: 18, paddingVertical: 5 }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {data.title}
          </Text>
          <View style={styles.rating}>
            {myRatingFunc(data.ratingValue)}
            <Text style={styles.review}>{data.reviews} reviews</Text>
          </View>
        </View>
        <Image
          style={styles.avatar}
          source={{ uri: data.user?.account.photo.url }}
        />
      </View>
      <View>
        <Pressable
          onPress={() => {
            setViewMore(!viewMore);
          }}
        >
          <Text numberOfLines={viewMore ? 0 : 3} ellipsizeMode="tail">
            {data.description}
          </Text>
        </Pressable>
      </View>
      <MyMapView obj={obj} />
    </View>
  );
};

export default RoomScreen;
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
