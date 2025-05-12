import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BG_COLOR } from "../utils/Colors";
import { moderateScale, scale } from "react-native-size-matters";
import CustomSolidBtn from "./CustomSolidBtn";
import { useNavigation } from "@react-navigation/native";

const NoLoginComponent = ({ heading, desc }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading ? heading : ""}</Text>
      <Text style={styles.desc}>{desc ? desc : ""}</Text>
      <View style={styles.signUp}>
        <Text style={styles.text1}>{"Don't have an Account?"}</Text>
        <Text
          style={styles.text2}
          onPress={() => {
            navigation.navigate("SignUpForUser");
          }}
        >
          {"Register Now"}
        </Text>
      </View>
    </View>
  );
};

export default NoLoginComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  heading: {
    fontSize: moderateScale(20),
    alignSelf: "center",
    width: "90%",
    marginTop: moderateScale(30),
    fontWeight: "700",
    textAlign: "center",
  },
  desc: {
    width: "80%",
    alignSelf: "center",
    fontSize: moderateScale(15),
    marginTop: moderateScale(5),
    color: "#778899",
  },
  signUp: {
    flexDirection: "row",
    alignSelf: "center",
    width: "90%",
    marginTop: moderateScale(20),
    justifyContent: "center",
  },
  text1: {
    fontSize: moderateScale(15),
    fontWeight: "500",
  },
  text2: {
    fontSize: moderateScale(15),
    fontWeight: "800",
  },
  title: {
    borderWidth: 1,
    padding: moderateScale(7),
    color: "white",
    backgroundColor: "black",
    borderRadius: moderateScale(15),
    fontSize: moderateScale(18),
    width: "90%",
    alignSelf: "center",
  },
});
