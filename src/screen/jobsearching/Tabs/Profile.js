import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import NoLoginComponent from "../../../common/NoLoginComponent";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { db } from "../../../utils/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import ProfileOptionItems from "../../../common/ProfileOptionItems";
const Profile = () => {
  const isFocused = useIsFocused();
  const [userData, setUserData] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  useEffect(() => {
    getData();
    getProfileData();
    getUserProfileData();
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


  const getProfileData = async () => {
    try {
      const id = await AsyncStorage.getItem("USER_ID");
      if (id) {
        const docRef = doc(db, "User-Registration", id);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
      // else {
      //   console.error("User ID not found in AsyncStorage.");
      // }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

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

  const handleLogout = async () => {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout canceled"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              navigation.replace("SelectUser");
            } catch (error) {
              console.error("Error during logout:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {!isLogin && (
        <Image
          source={require("../../../images/jobsfinds.png")}
          style={styles.logo}
        />
      )}
      {!isLogin && (
        <NoLoginComponent
          heading={"Quickly and easily update your profile/portfolio"}
          desc={
            "Maintain & enhance your portfolio to stand out and attract top jobs"
          }
        />
      )}
      {isLogin && (
        <View style={styles.LoginView}>
          <TouchableOpacity>
            {profileImg ? (
              <Image source={{ uri: profileImg }} style={styles.profile} />
            ) : (
              <Image
                source={require("../../../images/user.png")}
                style={styles.profile}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.userName}>
            {userData ? userData.name : "No Found"}
          </Text>
          <Text style={styles.userEmail}>
            {userData ? userData.email : "No Found"}
          </Text>

          <View style={styles.BtnView}>
            <TouchableOpacity
              style={styles.Btn1}
              onPress={() => navigation.navigate("UpdateProfileForUser")}
            >
              <Text style={styles.changeText}>Update Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.Btn2}
              onPress={() => navigation.navigate("ChangeImageForUser")}
            >
              <Text style={styles.changeText}>Change Image</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.widthView}></View>
          <View style={styles.logout}>
            <ProfileOptionItems
              icon={require("../../../images/logout.png")}
              title={"Log out"}
              onClick={handleLogout}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: moderateScale(-200),
  },
  LoginView: {
    flex: 1,
  },
  profile: {
    height: scale(80),
    width: scale(80),
    borderRadius: moderateScale(50),
    alignSelf: "center",
    marginTop: moderateScale(25),
  },
  userName: {
    fontSize: moderateScale(22),
    fontWeight: "600",
    alignSelf: "center",
    marginLeft: moderateScale(1),
    marginTop: moderateScale(5),
  },
  userEmail: {
    fontSize: moderateScale(15),
    fontWeight: "600",
    alignSelf: "center",
    marginLeft: moderateScale(1),
    marginTop: moderateScale(5),
  },
  BtnView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: moderateScale(18),
  },
  Btn1: {
    width: "35%",
    height: verticalScale(40),
    borderWidth: 1,
    borderRadius: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  Btn2: {
    width: "35%",
    height: verticalScale(40),
    borderWidth: 1,
    borderRadius: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  changeText: {
    fontSize: moderateScale(13),
    color: "white",
  },
  logout: {
    marginTop: moderateScale(25),
  },
  widthView: {
    borderWidth: 1,
    marginTop: moderateScale(40),
    width: "90%",
    alignSelf: "center",
  },
  logo: {
    height: scale("90"),
    width: scale("90"),
    alignSelf: "center",
    marginTop: moderateScale(20),
  },
});
