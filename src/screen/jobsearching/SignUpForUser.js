import { StyleSheet, Text, View, Image, Alert } from "react-native";
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
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Loader from "../../common/Loader";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";

const SignUpForUser = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [badName, setBadName] = useState("");

  const [email, setEmail] = useState("");
  const [badEmail, setBadEmail] = useState("");

  const [contact, setContact] = useState("");
  const [badContact, setBadContact] = useState("");

  const [password, setPassword] = useState("");
  const [badPassword, setBadPassword] = useState("");

  const [createAccount, setCreateAccount] = useState(false);
  const [loading, setLoading] = useState("false");

  const validate = () => {
    let validEmail = true;
    let validName = true;
    let validPass = true;
    let validContact = true;

    let nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    if (name == "") {
      validName = false;
      setBadName("Please Enter Name");
    } else if (name != "" && name.length < 3) {
      validName = false;
      setBadName("Please Enter Valid Name");
    } else if (
      name != "" &&
      name.length >= 3 &&
      !name.toString().match(nameRegex)
    ) {
      validName = false;
      setBadName("Please Enter Valid Name");
    } else if (
      name != "" &&
      name.length >= 3 &&
      name.toString().match(nameRegex)
    ) {
      validName = true;
      setBadName("");
    }

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

    let contactRegex = /^\d+$/;
    if (contact == "") {
      validContact = false;
      setBadContact("Please Enter Contact Number");
    } else if (contact != "" && contact.length < 11) {
      validContact = false;
      setBadContact("Please Enter Valid Contact Number");
    } else if (
      contact != "" &&
      contact.length >= 11 &&
      !contact.match(contactRegex)
    ) {
      validContact = false;
      setBadContact("Please Enter Valid Contact Number");
    } else if (
      contact != "" &&
      contact.length >= 11 &&
      contact.match(contactRegex)
    ) {
      validContact = true;
      setBadContact("");
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

    return validName && validEmail && validContact && validPass;
  };

  const registerUser = async () => {
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, "User-Registration"), {
        name,
        email,
        contact,
        password,
      });
      console.log("Document written with ID: ", docRef.id);
      setLoading(false);
      setName("");
      setEmail("");
      setPassword("");
      setContact("");
      setCreateAccount(true);
      setLoading(false);
      setTimeout(() => {
        navigation.navigate("LoginForUser");
      }, 3000);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error adding document: ", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "User-Registration"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} =>`, doc.data());
      });
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!createAccount ? (
        <ScrollView>
          <Image
            style={styles.logo}
            source={require("../../images/jobsfinds.png")}
          />
          <Text style={styles.title}>Create Account</Text>

          <CustomTextInput
            value={name}
            onChangeText={(txt) => {
              setName(txt);
            }}
            title={"Name"}
            bad={badName != "" ? true : false}
            placeholder={"abc"}
          />
          {badName != "" && <Text style={styles.errorMsg}>{badName}</Text>}

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
            value={contact}
            onChangeText={(txt) => {
              setContact(txt);
            }}
            title={"Contact"}
            placeholder={"+92 03*********"}
            bad={badContact != "" ? true : false}
          />
          {badContact != "" && (
            <Text style={styles.errorMsg}>{badContact}</Text>
          )}

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
          {badPassword != "" && (
            <Text style={styles.errorMsg}>{badPassword}</Text>
          )}

          <CustomSolidBtn
            title={"Sign Up"}
            onClick={() => {
              if (validate()) {
                registerUser();
                fetchUsers();
              }
            }}
          />
          <CustomBorderBtn
            title={"Login"}
            onClick={() => {
              navigation.navigate("LoginForUser");
            }}
          />
          <Loader visible={loading} />
        </ScrollView>
      ) : (
        <View style={styles.doneAccount}>
          <Image
            style={styles.logo}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/190/190411.png",
            }}
          />
          <Text style={styles.AccountText}>
            {"Account Created Successfully"}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SignUpForUser;

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
    fontSize: moderateScale(30),
    alignSelf: "center",
    fontWeight: 600,
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
});
