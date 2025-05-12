import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from "react-native-size-matters";
import { BG_COLOR } from "../../../utils/Colors";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    const type = await AsyncStorage.getItem("USER_TYPE");
    if (id != null && type != null) {
      if (type == "user") {
        setIsLogin(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.searchBox}
        onPress={() => {
          navigation.navigate("searchjob");
        }}
      >
        <Image
          style={styles.searchImage}
          source={require("../../../images/jobsfinds.png")}
        />
        <Text style={styles.searchText}>Search...</Text>
      </TouchableOpacity>
      {!isLogin && (
        <View>
          <Text style={styles.firstLine}>
            You’re just a step away from achieving a good job
          </Text>
          <View style={styles.BtnView}>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => {
                navigation.navigate("LoginForUser");
              }}
            >
              <Text style={styles.changeText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signUpBtn}
              onPress={() => {
                navigation.navigate("SignUpForUser");
              }}
            >
              <Text style={styles.changeText}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.searchBoxCart}>
        <Image
          source={require("../../../images/jobsfinds.png")}
          style={styles.joblogo}
        />
      </View>
      <Text style={styles.title}>FindMyJob</Text>
      <View style={styles.nodes}>
        <Image
          style={styles.starLogo}
          source={{
            uri: "https://tse4.mm.bing.net/th?id=OIP.RAd0uJlU289JTM9EGsVjWwHaF7&pid=Api&P=0&h=220",
          }}
        />
        <Text style={styles.startText}>
          Find your ideal job, apply confidently, and achieve success
        </Text>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  searchBox: {
    width: "90%",
    height: verticalScale(43),
    borderWidth: 1.5,
    marginTop: moderateVerticalScale(26),
    alignSelf: "center",
    borderRadius: moderateScale(30),
    flexDirection: "row",
    alignItems: "center",
  },
  searchImage: {
    height: moderateScale(33),
    width: moderateScale(33),
    marginLeft: moderateScale(15),
  },
  searchText: {
    marginLeft: moderateScale(10),
    color: "#9e9e9e",
  },
  firstLine: {
    fontSize: moderateScale(20),
    fontWeight: "700",
    width: "83%",
    alignSelf: "center",
    marginTop: moderateScale(18),
  },
  nodes: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    marginTop: moderateScale(4),
  },
  starLogo: {
    height: moderateScale(25),
    width: moderateScale(25),
    marginTop: moderateScale(10),
  },
  startText: {
    color: "#2f4f4f",
    opacity: 0.7,
    fontSize: moderateScale(15),
    paddingRight: moderateScale(5),
    marginTop: moderateScale(10),
  },
  BtnView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: moderateScale(40),
  },
  loginBtn: {
    width: "35%",
    height: verticalScale(35),
    borderWidth: 1,
    borderRadius: moderateScale(30),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  signUpBtn: {
    width: "35%",
    height: verticalScale(35),
    borderWidth: 1,
    borderRadius: moderateScale(30),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  changeText: {
    color: "white",
  },
  searchBoxCart: {
    width: "90%",
    height: "30%",
    alignSelf: "center",
    marginTop: moderateScale(50),
    backgroundColor: "#f2f2f2",
    borderRadius: moderateScale(10),
    flexDirection: "colum",
    alignItems: "center",
    justifyContent: "center",
  },
  logoGIF: {
    height: "40%",
    width: "40%",
  },
  input: {
    width: "90%",
    height: verticalScale(38),
    borderWidth: 1,
    alignSelf: "center",
    borderRadius: moderateScale(12),
    paddingLeft: moderateScale(10),
  },
  joblogo: {
    height: scale(150),
    width: scale(150),
  },
  title: {
    fontSize: moderateScale(30),
    alignSelf: "center",
    fontWeight: "600",
    marginTop: moderateScale(15),
  },
});
