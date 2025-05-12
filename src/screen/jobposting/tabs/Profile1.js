import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BG_COLOR, TEXT_COLOR } from "../../../utils/Colors";
import { moderateScale, scale } from "react-native-size-matters";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { verticalScale } from "react-native-size-matters";
import ProfileOptionItems from "../../../common/ProfileOptionItems";
import { db } from "../../../utils/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile1 = ({ onJobsClick }) => {
  const [name, setName] = useState("");
  const [jobs, setJobs] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = async () => {
    try {
      const userId = await AsyncStorage.getItem("USER_ID");
      if (!userId) {
        console.warn("USER_ID is null or not set in AsyncStorage.");
        navigation.reset({
          index: 0,
          routes: [{ name: "SelectUser" }],
        });
        return;
      }

      const userDocRef = doc(db, "job", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setName(userData.name || "No Name");

        const jobs = await AsyncStorage.getItem("JOBS");
        setJobs(jobs || "0");

        setProfileImg(userData.profileImage || "");
      } else {
        console.log("User document not found.");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              navigation.reset({
                index: 0,
                routes: [{ name: "SelectUser" }],
              });
            } catch (error) {
              console.error("Error during logout: ", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        {profileImg ? (
          <Image source={{ uri: profileImg }} style={styles.profile} />
        ) : (
          <Image
            source={require("../../../images/profile.png")}
            style={styles.profile}
          />
        )}
      </TouchableOpacity>

      <Text style={styles.name}>{name}</Text>

      <View style={styles.BtnView}>
        <TouchableOpacity
          style={styles.Btn1}
          onPress={() => navigation.navigate("UpdateProfileForCompany")}
        >
          <Text style={styles.changeText}>Update Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.Btn2}
          onPress={() => navigation.navigate("ChangeProfilePicForCompany")}
        >
          <Text style={styles.changeText}>Change Image</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.optioinArea}>
        <ProfileOptionItems
          icon={require("../../../images/Jobs.png")}
          title={"My Jobs (" + jobs + ")"}
          onClick={onJobsClick}
        />

        <ProfileOptionItems
          icon={require("../../../images/logout.png")}
          title={"Log out"}
          onClick={handleLogout}
        />
      </View>
    </View>
  );
};

export default Profile1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  Heading: {
    fontSize: moderateScale(22),
    fontWeight: "600",
    color: TEXT_COLOR,
    marginTop: moderateScale(8),
  },
  profile: {
    height: moderateScale(100),
    width: moderateScale(100),
    alignSelf: "center",
    backgroundColor: BG_COLOR,
    marginTop: moderateScale(50),
    borderRadius: moderateScale(50),
  },
  change: {
    alignSelf: "center",
    marginTop: moderateScale(10),
    fontSize: moderateScale(16),
  },
  name: {
    fontSize: moderateScale(30),
    fontWeight: "600",
    marginTop: moderateScale(10),
    alignSelf: "center",
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
  optioinArea: {
    marginTop: moderateScale(60),
  },
});
