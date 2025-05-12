import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from "react-native-size-matters";

const ProfileOptionItems = ({ title, icon, onClick }) => {
  return (
    <TouchableOpacity
      style={styles.designBtns}
      onPress={() => {
        onClick();
      }}
    >
      <View style={styles.TextView}>
        <Image source={icon} style={styles.logos} />
        <Text style={styles.titles}>{title}</Text>
      </View>
      <Image
        style={styles.fixedImage}
        source={require("../images/right-arrow.png")}
      />
    </TouchableOpacity>
  );
};

export default ProfileOptionItems;

const styles = StyleSheet.create({
  designBtns: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: moderateVerticalScale(20),
  },
  logos: {
    width: scale(23),
    height: scale(23),
  },
  TextView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(10),
  },
  titles: {
    marginLeft: moderateScale(15),
    fontSize: moderateScale(17),
  },
  fixedImage: {
    height: scale(10),
    width: scale(10),
  },
});
