import { StyleSheet, Text, View, Image } from "react-native";
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
import CustomBorderBtn from "../../common/CustomBorderBtn";
import { useNavigation } from "@react-navigation/native";
import Loader from "../../common/Loader";

import { getDocs, query, where, collection } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginForUser = () => {
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

  const loginUser = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "User-Registration"),
        where("email", "==", email)
      );
      const querySnapshot = await getDocs(q);
      setLoading(false);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.password === password) {
            setBadEmail("");
            setBadPassword("");
            goToNextScreen(doc.id, data.email, data.name);
          } else {
            setBadPassword("Wrong Password");
          }
        });
      } else {
        setBadEmail("No user exists with this email");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error logging in: ", error);
    }
  };

  const goToNextScreen = async (id, email, name) => {
    try {
      await AsyncStorage.setItem("NAME", name);
      await AsyncStorage.setItem("EMAIL", email);
      await AsyncStorage.setItem("USER_ID", id);
      await AsyncStorage.setItem("USER_TYPE", "user");
      navigation.navigate("Main");
    } catch (error) {
      console.error("Error saving user data: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../images/jobsfinds.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Login</Text>

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
        title={"Password"}
        placeholder={"********"}
        bad={badPassword != "" ? true : false}
      />
      {badPassword != "" && <Text style={styles.errorMsg}>{badPassword}</Text>}

      <Text
        style={styles.BtnForgot}
        onPress={() => {
          navigation.navigate("NewPasswordForUser");
        }}
      >
        Forgot Password?{" "}
      </Text>

      <CustomSolidBtn
        title={"Login"}
        onClick={() => {
          if (validate()) {
            loginUser();
          }
        }}
      />
      <CustomBorderBtn
        onClick={() => {
          navigation.navigate("SignUpForUser");
        }}
        title={"Create Account"}
      />
      <Loader visible={loading} />
    </SafeAreaView>
  );
};

export default LoginForUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  logo: {
    width: scale(90),
    height: scale(90),
    alignSelf: "center",
  },
  title: {
    fontSize: moderateScale(25),
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
});
