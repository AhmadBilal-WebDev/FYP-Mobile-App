import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";

const CustomDrawer = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImg, setProfileImg] = useState("");

  useEffect(() => {
    getData();
  }, [isFocused]);
  const getData = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    const type = await AsyncStorage.getItem("USER_TYPE");
    const mName = await AsyncStorage.getItem("NAME");
    const mEmail = await AsyncStorage.getItem("EMAIL");

    if (id != null && type != null) {
      if (type == "user") {
        setIsLogin(true);
        setName(mName);
        setEmail(mEmail);
      }
    }
  };
  useEffect(() => {
    getUserProfileData();
  }, []);
  const getUserProfileData = async () => {
    try {
      const userId = await AsyncStorage.getItem("USER_ID");
      const userDocRef = doc(db, "User-Registration", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        setProfileImg(userData.profileImage || "");
      } else {
        console.log("User document not found.");
      }
    } catch (error) {
      // console.error("Error fetching data: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <TouchableOpacity>
          {profileImg ? (
            <Image source={{ uri: profileImg }} style={styles.profile} />
          ) : (
            <Image
              source={require("../../images/user.png")}
              style={styles.profile}
            />
          )}
        </TouchableOpacity>

        <View>
          <Text style={styles.Heading}>
            {isLogin ? name : "Make Your Profile"}
          </Text>
          <Text
            style={[
              styles.SubHeading,
              { width: isLogin ? "80%" : "50%" },
              { marginLeft: isLogin ? moderateScale(10) : moderateScale(17) },
            ]}
          >
            {isLogin ? email : "Discover Your Dream Job at FindMyJob"}
          </Text>
        </View>
      </View>
      {!isLogin && (
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
      )}

      <View style={styles.sperator}></View>

      {isLogin && (
        <FlatList
          contentContainerStyle={{ marginTop: moderateScale(15) }}
          data={[
            { title: "Saved Jobs", icon: require("../../images/save.png") },
          ]}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  if (index == 0) {
                    navigation.closeDrawer();
                    navigation.navigate("SavedJobs");
                  }
                }}
              >
                <View style={styles.menuItemLeftView}>
                  <Image source={item.icon} style={styles.menuItemsIcon} />
                  <Text style={styles.Heading1}>{item.title}</Text>
                  <Text
                    style={styles.Heading1}
                    onPress={() => {
                      navigation.navigate("SlectUser");
                    }}
                  >
                    {/* {item.title2} */}
                  </Text>
                </View>
                <Image
                  source={require("../../images/right-arrow.png")}
                  style={styles.menuItemsIcon1}
                />
              </TouchableOpacity>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf0e6",
  },
  profile: {
    height: scale(60),
    width: scale(60),
    borderRadius: scale(50),
    marginTop: moderateScale(55),
    marginLeft: moderateScale(15),
  },
  topView: {
    flexDirection: "row",
  },
  Heading: {
    fontSize: 18,
    width: "60%",
    fontWeight: "700",
    color: "red",
    marginTop: moderateScale(52),
    marginLeft: moderateScale(10),
  },
  SubHeading: {
    width: "50%",
    marginLeft: moderateScale(17),
    color: "blue",
  },
  BtnView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: moderateScale(20),
  },
  loginBtn: {
    width: "80",
    height: verticalScale(30),
    borderWidth: 1,
    borderRadius: moderateScale(30),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
  signUpBtn: {
    width: "80",
    height: verticalScale(30),
    borderWidth: 1,
    borderRadius: moderateScale(30),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
  changeText: {
    color: "white",
  },
  sperator: {
    width: "90%",
    height: verticalScale(0.5),
    backgroundColor: "black",
    alignSelf: "center",
    marginTop: moderateScale(50),
    opacity: 0.2,
  },
  menuItem: {
    width: "90%",
    height: verticalScale(50),
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuItemLeftView: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemsIcon: {
    height: moderateScale(30),
    width: moderateScale(30),
  },
  menuItemsIcon1: {
    height: moderateScale(20),
    width: moderateScale(20),
  },
  Heading1: {
    fontSize: moderateScale(16),
    marginLeft: moderateScale(5),
  },
});
