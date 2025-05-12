import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { BG_COLOR, TEXT_COLOR } from "../../utils/Colors";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("SelectUser");
      getData();
    }, 2000);
  }, []);
  const getData = async () => {
    let type = await AsyncStorage.getItem("USER_TYPE");
    if (type != null) {
      if (type == "company") {
        navigation.navigate("DashBoardForCompany");
      } else {
        navigation.navigate("jobSearchingNavigator");
      }
    } else {
      navigation.navigate("SelectUser");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../images/jobsfinds.png")}
      />
      <Text style={styles.name}>FindMyJob</Text>
      <Text style={styles.slogan}>
        Discover and share job opportunities all in one hub
      </Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BG_COLOR,
  },
  logo: {
    width: scale(120),
    height: scale(120),
  },
  name: {
    fontWeight: "800",
    fontSize: moderateScale(25),
    marginTop: moderateVerticalScale(10),
    color: TEXT_COLOR,
  },
  slogan: {
    fontSize: moderateScale(12),
    fontStyle: "italic",
    fontWeight: "500",
    position: "absolute",
    bottom: moderateVerticalScale(80),
  },
});
