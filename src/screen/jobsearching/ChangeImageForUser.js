import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { BG_COLOR } from "../../utils/Colors";
import { moderateScale, scale } from "react-native-size-matters";
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import CustomSolidBtn from "../../common/CustomSolidBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Loader from "../../common/Loader";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";

const ChangeProfilePicForCompany = () => {
  const [imageData, setImageData] = useState(null);
  const [profileImg, setProfileImg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  const getData = async () => {
    try {
      const userId = await AsyncStorage.getItem("USER_ID");
      if (!userId) throw new Error("USER_ID not found in AsyncStorage");

      const userDocRef = doc(db, "User-Registration", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setProfileImg(userDoc.data()?.profileImage || "");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const openGallery = async () => {
    try {
      const res = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!res.canceled && res.assets) {
        setImageData(res);
      }
    } catch (error) {
      console.error("Error opening gallery: ", error);
    }
  };

  const openCamera = async () => {
    try {
      const res = await launchCameraAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!res.canceled && res.assets) {
        setImageData(res);
      }
    } catch (error) {
      console.error("Error opening camera: ", error);
    }
  };

  const uploadPic = async () => {
    try {
      setLoading(true);

      const userId = await AsyncStorage.getItem("USER_ID");
      if (!userId) throw new Error("USER_ID not found in AsyncStorage");

      const imageUri = imageData.assets[0]?.uri;
      if (!imageUri) throw new Error("Image URI not found");

      const userDocRef = doc(db, "User-Registration", userId);
      await updateDoc(userDocRef, { profileImage: imageUri });

      await AsyncStorage.setItem("PROFILE_IMAGE", imageUri);
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      console.error("Error uploading picture: ", error);
    }
  };

  const removePic = async () => {
    try {
      setLoading(true);

      const userId = await AsyncStorage.getItem("USER_ID");
      if (!userId) throw new Error("USER_ID not found in AsyncStorage");

      const userDocRef = doc(db, "User-Registration", userId);
      await updateDoc(userDocRef, { profileImage: "" });

      await AsyncStorage.removeItem("PROFILE_IMAGE");
      setImageData(null);
      setProfileImg("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error removing picture: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.BackBtn} onPress={navigation.goBack}>
        <Image
          source={require("../../images/left-arrow.png")}
          style={styles.back}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <Image
          source={
            imageData
              ? { uri: imageData.assets[0].uri }
              : profileImg
              ? { uri: profileImg }
              : require("../../images/profile.png")
          }
          style={styles.profile}
        />
      </TouchableOpacity>

      <CustomSolidBtn title="Take Picture" onClick={openCamera} />
      <CustomSolidBtn title="Choose From Gallery" onClick={openGallery} />
      <CustomSolidBtn title="Remove Picture" onClick={removePic} />

      {imageData && (
        <CustomSolidBtn title="Upload Picture" onClick={uploadPic} />
      )}

      <Loader visible={loading} />
    </SafeAreaView>
  );
};

export default ChangeProfilePicForCompany;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  back: {
    width: scale(24),
    height: scale(24),
    marginTop: moderateScale(40),
    marginLeft: moderateScale(10),
  },
  BackBtn: {
    marginTop: moderateScale(10),
    marginLeft: moderateScale(5),
  },
  profile: {
    width: scale(170),
    height: scale(170),
    alignSelf: "center",
    borderRadius: scale(150),
    marginTop: moderateScale(50),
  },
});
