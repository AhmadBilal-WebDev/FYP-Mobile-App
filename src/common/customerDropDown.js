import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from "react-native-size-matters";
import { BG_COLOR } from "../utils/Colors";

const Customerdropdown = ({ title, placeholder, bad, onclick }) => {
  return (
    <TouchableOpacity
      style={[styles.input, { borderColor: bad ? "red" : "#9e9e9e" }]}
      onPress={() => {
        onclick();
      }}
    >
      <Text style={styles.title}>{title}</Text>
      <Text
        style={{ color: placeholder.includes("Select") ? "#9e9e9e" : "black" }}
      >
        {placeholder}
      </Text>
      <Image
        style={styles.skills}
        source={{
          uri: "https://tse4.mm.bing.net/th?id=OIP.uUlv1Tet48FYJCjRzuR8cQHaHa&pid=Api&P=0&h=220",
        }}
      />
    </TouchableOpacity>
  );
};

export default Customerdropdown;

const styles = StyleSheet.create({
  input: {
    width: "90%",
    height: verticalScale(45),
    borderWidth: 0.9,
    alignSelf: "center",
    marginTop: moderateVerticalScale(20),
    borderRadius: moderateScale(10),
    justifyContent: "center",
    paddingRight: moderateScale(15),
    paddingLeft: moderateScale(15),
  },
  title: {
    alignSelf: "flex-start",
    marginLeft: moderateScale(20),
    top: moderateScale(-11),
    position: "absolute",
    backgroundColor: BG_COLOR,
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skills: {
    width: scale(30),
    height: scale(10),
    position: "absolute",
    right: moderateScale(8),
  },
});
