import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const HomePage = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const token = await AsyncStorage.getItem("jwttoken");

    fetch("https://dummyjson.com/auth/posts", {
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
      .then((data) => setPosts(data?.posts))
      .catch((err) => alert(err));
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {posts?.map((post, index) => (
        <View key={index} showsVerticalScrollIndicator={true}>
          <TouchableOpacity
            style={styles.post}
            onPress={() =>
              navigation.navigate("post description", { id: post?.id })
            }
          >
            <Text>{post?.title}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  post: {
    backgroundColor: "white",
    marginVertical: 5,
    paddingVertical: 10,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
});

export default HomePage;
