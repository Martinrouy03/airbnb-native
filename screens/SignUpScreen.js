import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import logo from "../assets/airbnb-logo.png";
import axios from "axios";

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdconf, setPwdconf] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [pwdMessage, setPwdMessage] = useState("");
  const handleSubmit = async () => {
    setErrorMessage("");
    if (pwd !== pwdconf) {
      setPwdMessage("Passwords must be the same");
      return;
    } else {
      setPwdMessage("");
      try {
        const response = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
          {
            email: email,
            username: username,
            description: description,
            password: pwd,
          }
        );
        console.log(response.data);
        alert("Connexion réussie!");
      } catch (error) {
        setErrorMessage(error.response.data.error);
      }
    }
  };
  return (
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
          Sign up
        </Text>
      </View>
      <View style={{ width: "100%", paddingHorizontal: 30, gap: 20 }}>
        <TextInput
          placeholder="username"
          style={styles.input}
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
        <TextInput
          placeholder="email"
          style={styles.input}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          placeholder="Describe yourself in a few words"
          style={styles.textArea}
          multiline={true}
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
        <TextInput
          placeholder="password"
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(text) => {
            setPwd(text);
          }}
        />
        <TextInput
          placeholder="confirm password"
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(text) => {
            setPwdconf(text);
          }}
        />
        {pwdMessage && (
          <Text style={{ color: "red", fontSize: 15, textAlign: "center" }}>
            "Passwords must be the same"
          </Text>
        )}
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
          <Text style={styles.submitText}>Sign up</Text>
        </Pressable>
        <Pressable>
          <Text
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            Already registered?
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
  textArea: {
    height: 80,
    borderColor: "pink",
    borderWidth: 2,
    textAlignVertical: "top",
    padding: 5,
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
