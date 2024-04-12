import { Text, View, Image, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const MyProfileScreen = () => {
  const [data, setData] = useState("");
  const [pic, setPic] = useState("");
  const [camPic, setCamPic] = useState("");

  const fetchUserData = async () => {
    const token = await AsyncStorage.getItem("token");
    const id = "6615667d62fbcfa27cccadcb";
    try {
      const url =
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/" + id;
      const { data } = await axios.get(url, {
        headers: { Authorization: "Bearer " + token },
      });
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  const sendPicture = async () => {
    // console.log(camPic.uri);
    const tab = camPic.uri.split(".");
    // console.log(tab);
    extension = tab[tab.length - 1];
    // console.log(extension);
    const formData = new FormData();
    formData.append("photo", {
      uri: camPic.uri,
      name: `martin.${extension}`,
      type: `image.${extension}`,
    });
    try {
      const { data } = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/upload_picture",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data) {
        alert("photo envoyée!");
        console.log(data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <KeyboardAwareScrollView style={{ paddingHorizontal: 30 }}>
      <View style={ss.topscreen}>
        <View style={[ss.personView, { borderWidth: pic || camPic ? 0 : 2 }]}>
          {pic || camPic ? (
            <Image
              style={{ width: 200, height: 200, borderRadius: 100 }}
              source={{ uri: pic.uri || camPic.uri }}
            />
          ) : (
            <Ionicons
              // style={ss.person}
              size={120}
              name="person"
              color="lightgrey"
            />
          )}
        </View>
        <View style={ss.icons}>
          <Pressable
            onPress={async () => {
              const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
              console.log(status);
              if (status === "granted") {
                const { assets, canceled } =
                  await ImagePicker.launchImageLibraryAsync();
                if (canceled) {
                  alert("no picture selected");
                } else {
                  setPic(assets[0]);
                  console.log(JSON.stringify(pic, null, 2));
                }
              } else {
                alert("Accès refusé");
              }
            }}
          >
            <Ionicons name="images" size={30} color="grey" />
          </Pressable>
          <Pressable
            onPress={async () => {
              const { status } =
                await ImagePicker.requestCameraPermissionsAsync();
              if (status === "granted") {
                // console.log(status);
                const { assets, canceled } =
                  await ImagePicker.launchCameraAsync();
                if (canceled) {
                  alert("No picture taken");
                } else {
                  setCamPic(assets[0]);
                }
              } else {
                alert("access denied!");
              }
            }}
          >
            <Ionicons name="camera" size={30} color="grey" />
          </Pressable>
        </View>
      </View>
      <Text style={ss.info}>{data.email}</Text>
      <Text style={ss.info}>{data.username}</Text>
      <Text style={ss.textArea}>{data.description}</Text>
      <Pressable style={ss.pressable} onPress={sendPicture}>
        <Text style={ss.buttonText}>Update</Text>
      </Pressable>
      <Pressable style={ss.pressable}>
        <Text style={ss.buttonText}>Log out</Text>
      </Pressable>
    </KeyboardAwareScrollView>
  );
};
export default MyProfileScreen;

const ss = StyleSheet.create({
  topscreen: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    gap: 20,
  },
  personView: {
    borderColor: "tomato",
    borderWidth: 2,
    padding: 20,
    borderRadius: 80,
  },
  icons: {
    // backgroundColor: "pink",
    height: "inherit",
    justifyContent: "space-",
    gap: 30,
  },
  info: {
    borderBottomColor: "pink",
    borderBottomWidth: 2,
    paddingBottom: 5,
    marginBottom: 20,
  },
  pressable: {
    // backgroundColor: "pink",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    width: 150,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 25,
    textAlign: "center",
  },
  textArea: {
    height: 80,
    borderColor: "pink",
    borderWidth: 2,
    textAlignVertical: "top",
    padding: 5,
    marginBottom: 20,
  },
});
