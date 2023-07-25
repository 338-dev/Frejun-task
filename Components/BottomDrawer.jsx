import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { TextInput } from "react-native";
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";
import {
  Image,
  Modal,
  View,
  Button,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";

export const BottomDrawer = ({
  isBottomSheetOpen,
  setIsBottomSheetOpen,
  id,
}) => {
  const windowHeight = Dimensions.get("window").height;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const loggedInUser = useSelector((state) => state.user.user);

  const getComments = async () => {
    const token = await AsyncStorage.getItem("jwttoken");

    fetch(`https://dummyjson.com/comments/post/${id}`, {
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
      .then((data) => {
        setComments(data.comments);
      })
      .catch((err) => alert(err));
  };
  useEffect(() => {
    getComments();
  }, []);

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem("jwttoken");

    fetch("https://dummyjson.com/comments/add", {
      method: "POST" /* or POST/PUT/PATCH/DELETE */,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: comment,
        postId: id,
        userId: loggedInUser.id,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        alert("comment posted successfully");
        setComment("");
      })
      .catch((err) => alert(err));
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isBottomSheetOpen}
        onRequestClose={handleCloseBottomSheet}
      >
        <View style={[styles.bottomSheet, { height: windowHeight * 0.4 }]}>
          <View style={styles.commentsContainer}>
            <Text style={{ fontSize: 20 }}>Comments</Text>
            <TouchableOpacity
              onPress={handleCloseBottomSheet}
              style={{ alignSelf: "flex-end" }}
            >
              <Icon type="entypo" name="cross" />
            </TouchableOpacity>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ paddingVertical: 5 }}
          >
            {comments.map((comment, index) => (
              <View key={index} style={{ marginHorizontal: 10 }}>
                <Text style={{ fontSize: 17 }}>{comment?.user?.username}</Text>
                <Text style={{ marginLeft: 10 }}>{comment?.body}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.postCommentContainer}>
            <TextInput
              style={styles.textInput}
              value={comment}
              onChangeText={(value) => setComment(value)}
              placeholder={"Write comment"}
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.postComment}
              onPress={() => handleSubmit()}
            >
              <Text style={{ color: "white" }}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheet: {
    position: "absolute",
    width: 350,
    alignSelf: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 10,
    bottom: 0,
    borderWidth: 1,
  },
  textInput: {
    fontSize: 18,
    fontWeight: "700",
    color: "purple",
    width: "80%",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 24,
    borderWidth: 1,
    outlineStyle: "none",
    alignSelf: "center",
  },
  postComment: {
    borderRadius: 10,
    height: 30,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
    alignSelf: "center",
  },
  postCommentContainer: {
    flexDirection: "row",
    marginHorizontal: 5,
    justifyContent: "space-between",
  },
  commentsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
});
