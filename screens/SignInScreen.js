import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logo from "../assets/airbnb-logo.png";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";

export default function SignInScreen({ setUserToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleSubmit = async () => {
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        { email: email, password: pwd }
      );
      console.log(response.data.token);
      await AsyncStorage.setItem("token", response.data.token);
      setUserToken(response.data.token);
      alert("Connexion réussie!");
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
    setIsLoading(false);
  };
  return isLoading ? (
    <View style={{ height: "100%", justifyContent: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        height: "100%",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <View>
        <Image
          source={logo}
          style={{ width: 100, height: 150 }}
          resizeMode="contain"
        ></Image>
        <Text style={{ fontSize: 28, fontWeight: "bold", color: "grey" }}>
          Sign in
        </Text>
      </View>
      <View style={{ width: "100%", paddingHorizontal: 30, gap: 20 }}>
        <TextInput
          placeholder="email"
          style={styles.input}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <View
          style={[
            styles.input,
            {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            },
          ]}
        >
          <TextInput
            placeholder="password"
            secureTextEntry={visible ? false : true}
            onChangeText={(text) => {
              setPwd(text);
            }}
          />
          <Pressable
            onPress={() => {
              setVisible(!visible);
            }}
          >
            {visible ? (
              <Entypo name="eye" size={24} color="black" />
            ) : (
              <Entypo name="eye-with-line" size={24} color="black" />
            )}
          </Pressable>
        </View>
        {errorMessage && (
          <Text style={{ color: "red", fontSize: 15, textAlign: "center" }}>
            {errorMessage}
          </Text>
        )}
      </View>
      <View style={{ alignItems: "center", gap: 10 }}>
        <Pressable
          style={styles.submit}
          onPress={() => {
            setIsLoading(true);
            handleSubmit();
          }}
        >
          <Text style={styles.submitText}>Sign in</Text>
        </Pressable>
        <Pressable>
          <Text
            onPress={() => {
              setVisible(false);
              navigation.navigate("SignUp");
            }}
          >
            Not registered yet?
          </Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomColor: "pink",
    borderBottomWidth: 2,
    paddingBottom: 5,
  },
  submit: {
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 25,
    width: 100,
  },
  submitText: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 15,
    textAlign: "center",
  },
});
