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
import { useState } from "react";
import logo from "../assets/airbnb-logo.png";
import axios from "axios";

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const handleSubmit = async () => {
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        { email: email, password: pwd }
      );
      console.log(response.data);
      setIsLoading(false);
      alert("Connexion réussie!");
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };
  return isLoading ? (
    <View>
      <ActivityIndicator />
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextInput
            placeholder="password"
            style={styles.input}
            secureTextEntry={visible}
            onChangeText={(text) => {
              setPwd(text);
            }}
          />
          <Pressable
            onPress={() => {
              setVisible(!visible);
            }}
          >
            <Entypo name="eye" size={24} color="black" />
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
            handleSubmit();
          }}
        >
          <Text style={styles.submitText}>Sign in</Text>
        </Pressable>
        <Pressable>
          <Text
            onPress={() => {
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
