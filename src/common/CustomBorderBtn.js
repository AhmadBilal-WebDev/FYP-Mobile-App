import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  moderateScale,
  moderateVerticalScale,
  verticalScale,
} from "react-native-size-matters";
import { TEXT_COLOR } from "../utils/Colors";

const CustomBorderBtn = ({ title, onClick }) => {
  return (
    <TouchableOpacity
      style={styles.Btn}
      onPress={() => {
        onClick();
      }}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomBorderBtn;

const styles = StyleSheet.create({
  Btn: {
    width: "90%",
    height: verticalScale(45),
    borderColor: TEXT_COLOR,
    borderWidth: 1,
    alignSelf: "center",
    marginTop: moderateVerticalScale(20),
    borderRadius: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: TEXT_COLOR,
    fontWeight: "500",
    fontSize: moderateScale(16),
  },
});
