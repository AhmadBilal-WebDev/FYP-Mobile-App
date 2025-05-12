import CustomHeader from "../../common/CustomHeader";
import { StyleSheet, Text, Image } from "react-native";
import React, { useState } from "react";
import { BG_COLOR } from "../../utils/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from "react-native-size-matters";
import CustomTextInput from "../../common/CustomTextInput";
import CustomSolidBtn from "../../common/CustomSolidBtn";
import { useNavigation } from "@react-navigation/native";
import Loader from "../../common/Loader";
import { db } from "../../utils/firebaseConfig";
import {
  collection,
  doc,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
const UpdateProfileForCompany = ({ secureTextEntry }) => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [badEmail, setBadEmail] = useState("");

  const [password, setPassword] = useState("");
  const [badPassword, setBadPassword] = useState("");

  const [loading, setLoading] = useState("false");

  const validate = () => {
    let validEmail = true;
    let validPass = true;

    let emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email == "") {
      validEmail = false;
      setBadEmail("Please Enter Email");
    } else if (email != "" && !email.toString().match(emailRegex)) {
      validEmail = false;
      setBadEmail("Please Enter Valid Email");
    } else if (email != "" && email.toString().match(emailRegex)) {
      validEmail = true;
      setBadEmail("");
    }

    if (password == "") {
      validPass = false;
      setBadPassword("Please Enter Password");
    } else if (password != "" && password.length < 6) {
      validPass = false;
      setBadPassword("Please Enter Min 6 Characters");
    } else if (password != "" && password.length >= 6) {
      validPass = true;
      setBadPassword("");
    }

    return validEmail && validPass;
  };

  const updatePasswordIfEmailExists = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "job"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        const userDocRef = doc(db, "job", docId);
        await updateDoc(userDocRef, {
          password: password,
        });

        setLoading(false);
        console.log("Password updated successfully.");
        navigation.goBack();
      } else {
        setLoading(false);
        setBadEmail("No user exists with this email.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error updating password: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title={"Change Password"}
        onBackPress={() => {
          navigation.goBack();
        }}
      />

      <Image
        source={require("../../images/jobsfinds.png")}
        style={styles.logo}
      />

      <CustomTextInput
        value={email}
        onChangeText={(txt) => {
          setEmail(txt);
        }}
        title={"Email"}
        bad={badEmail != "" ? true : false}
        placeholder={"abc@gmail.com"}
      />
      {badEmail != "" && <Text style={styles.errorMsg}>{badEmail}</Text>}

      <CustomTextInput
        secureTextEntry
        value={password}
        onChangeText={(txt) => {
          setPassword(txt);
        }}
        title={"New Password"}
        placeholder={"******"}
        bad={badPassword != "" ? true : false}
      />
      {badPassword != "" && <Text style={styles.errorMsg}>{badPassword}</Text>}

      <CustomSolidBtn
        title={"Update"}
        onClick={() => {
          if (validate()) {
            updatePasswordIfEmailExists();
          }
        }}
      />

      <Loader visible={loading} />
    </SafeAreaView>
  );
};

export default UpdateProfileForCompany;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },

  title: {
    fontSize: moderateScale(30),
    alignSelf: "center",
    fontWeight: 600,
    marginTop: moderateVerticalScale(30),
  },
  BtnForgot: {
    alignSelf: "flex-end",
    marginRight: moderateScale(10),
    marginTop: moderateVerticalScale(5),
    fontWeight: "500",
    fontSize: moderateScale(14),
  },
  errorMsg: {
    marginLeft: moderateScale(20),
    color: "red",
  },
  doneAccount: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  AccountText: {
    fontSize: moderateScale(15),
    alignSelf: "center",
    fontWeight: 600,
    marginTop: moderateVerticalScale(15),
  },
  logo: {
    width: scale(90),
    height: scale(90),
    alignSelf: "center",
    marginTop: moderateScale(80),
  },
});
