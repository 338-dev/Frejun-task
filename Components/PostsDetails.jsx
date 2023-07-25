import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomDrawer } from "./BottomDrawer";

const PostsDetails = ({ route }) => {
  const id = route.params?.id;
  const [post, setPost] = useState({});
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const getPosts = async () => {
    const token = await AsyncStorage.getItem("jwttoken");

    fetch(`https://dummyjson.com/auth/posts/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setPost(data))
      .catch((err) => alert(err));
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post?.title}</Text>

      <Text>{post?.body}</Text>
      <TouchableOpacity
        style={styles.commentButton}
        onPress={() => setIsBottomSheetOpen(true)}
      >
        <Text style={{ color: "white" }}>comments</Text>
      </TouchableOpacity>
      <BottomDrawer
        setIsBottomSheetOpen={setIsBottomSheetOpen}
        isBottomSheetOpen={isBottomSheetOpen}
        id={id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  commentButton: {
    backgroundColor: "purple",
    borderRadius: 10,
    padding: 5,
    margin: 5,
    maxWidth: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PostsDetails;
