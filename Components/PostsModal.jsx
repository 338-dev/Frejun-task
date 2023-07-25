import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";

const PostsModal = ({ visible, setVisible }) => {
  const [hideFullScreen, setHideFullScreen] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const loggedInUser = useSelector((state) => state.user.user);

  const createPost = async () => {
    const token = await AsyncStorage.getItem("jwttoken");
    fetch("https://dummyjson.com/auth/Posts/add", {
      method: "POST" /* or POST/PUT/PATCH/DELETE */,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, details, userId: loggedInUser?.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setVisible(false);
      });
  };
  return (
    <Modal
      hardwareAccelerated
      transparent
      animationType="fade"
      onRequestClose={hideFullScreen}
      visible={visible}
    >
      <View
        style={{
          width: 300,
          height: 300,
          margin: "auto",
          backgroundColor: "white",
          borderRadius: 10,
          alignSelf: "center",
          marginTop: 150,
        }}
      >
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.textInput}
            autoCapitalize={"none"}
            keyboardType={"email-address"}
            value={title}
            onChangeText={(value) => setTitle(value)}
            placeholder={"Enter Title"}
          />
          <TextInput
            style={styles.textInput}
            autoCapitalize={"none"}
            keyboardType={"email-address"}
            value={details}
            onChangeText={(value) => setDetails(value)}
            placeholder={"Enter Description"}
            numberOfLines={5}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            margin: 10,
          }}
        >
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Text style={{ color: "grey", fontWeight: 600 }}>Cancel</Text>
          </TouchableOpacity>
          <View style={{ width: 10 }} />
          <TouchableOpacity onPress={() => createPost()}>
            <Text style={{ color: "purple", fontWeight: 600 }}>
              Create Post
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: 18,
    fontWeight: "700",
    color: "purple",
    // backgroundColor: Color.backgroundGray,
    width: "95%",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    outlineStyle: "none",
    alignSelf: "center",
    margin: 10,
    // borderColor: Color.white,
  },
});

export default PostsModal;
