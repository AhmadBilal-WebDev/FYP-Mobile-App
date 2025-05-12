import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from "react-native-size-matters";
import { BG_COLOR, TEXT_COLOR } from "../utils/Colors";

const CustomSolidBtn = ({ title, onClick }) => {
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

export default CustomSolidBtn;

const styles = StyleSheet.create({
  Btn: {
    width: moderateScale(320),
    height: verticalScale(48),
    backgroundColor: TEXT_COLOR,
    alignSelf: "center",
    marginTop: moderateVerticalScale(20),
    borderRadius: moderateScale(7),
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(5),
  },
  title: {
    color: BG_COLOR,
    fontWeight: "500",
    fontSize: moderateScale(16),
  },
});
