import {
  View,
  Text,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { setUser } from "../store/reducer/userReducer";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("kminchelle");
  const [password, setPassword] = useState("0lelplR");

  const handleChangeEmail = (email) => {
    setEmail(email);
  };

  const handleChangePassword = (password) => {
    setPassword(password);
  };
  const dispatch = useDispatch();

  const handleKeyPress = async () => {
    console.log({ email, password });

    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        dispatch(setUser(data));
        AsyncStorage.setItem("jwttoken", data.token);
        navigation.navigate("home");
        Keyboard.dismiss();
      })
      .catch((err) => alert(err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.info}>Please enter below details to continue</Text>

      <Text style={styles.labelText}>Email</Text>
      <TextInput
        style={styles.textInput}
        autoCapitalize={"none"}
        keyboardType={"email-address"}
        value={email}
        onChangeText={(value) => handleChangeEmail(value)}
        placeholder={"Enter email"}
      />

      <Text style={[styles.labelText]}>Password</Text>

      <TextInput
        style={styles.textInput}
        value={password}
        onChangeText={(value) => handleChangePassword(value)}
        placeholder={"Enter Password"}
        secureTextEntry
        autoCorrect={false}
      />

      <TouchableOpacity style={styles.button} onPress={handleKeyPress}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 18,
    fontWeight: "700",
    color: "purple",
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 24,
    borderWidth: 1,
    outlineStyle: "none",
  },
  textInputErrorOverride: {
    borderWidth: 1,
  },
  info: {
    marginTop: 10,
    left: 5,
    top: -15,
    fontSize: 15,
  },
  labelText: {
    color: "grey",
    marginVertical: 10,
    left: 5,
  },
  button: {
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 24,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
  },
  container: {
    padding: 10,
    backgroundColor: "white",
    flex: 1,
    paddingTop: 30,
  },
});
