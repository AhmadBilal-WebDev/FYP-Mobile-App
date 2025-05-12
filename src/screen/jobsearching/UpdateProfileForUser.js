import CustomHeader from "../../common/CustomHeader";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  doc,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
const UpdateProfileForCompany = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [badName, setBadName] = useState("");

  const [email, setEmail] = useState("");
  const [badEmail, setBadEmail] = useState("");

  const [contact, setContact] = useState("");
  const [badContact, setBadContact] = useState("");

  const [createAccount, setCreateAccount] = useState(false);
  const [loading, setLoading] = useState("false");

  const validate = () => {
    let validEmail = true;
    let validName = true;
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

    return validName && validEmail && validContact;
  };

  const updateUser = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    if (!id) {
      console.error("No user ID found in AsyncStorage.");
      return;
    }
    setLoading(true);

    try {
      const userDocRef = doc(db, "User-Registration", id);
      await updateDoc(userDocRef, {
        name,
        email,
        contact,
      });
      setLoading(false);
      await AsyncStorage.setItem("NAME", name);
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      console.error("Error updating user: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const mEmail = await AsyncStorage.getItem("EMAIL");
    if (!mEmail) {
      console.error("No email found in AsyncStorage.");
      return;
    }

    try {
      const jobQuery = query(
        collection(db, "User-Registration"),
        where("email", "==", mEmail)
      );
      const querySnapshot = await getDocs(jobQuery);

      querySnapshot.docs.forEach((item) => {
        const userData = item.data();
        setName(userData.name || "");
        setEmail(userData.email || "");
        setContact(userData.contact || "");
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title={"Edit Profile"}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <Image
        source={require("../../images/jobsfinds.png")}
        style={styles.logo}
      />

      <View style={styles.SecondView}>
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
        {badContact != "" && <Text style={styles.errorMsg}>{badContact}</Text>}

        <CustomSolidBtn
          title={"Update"}
          onClick={() => {
            if (validate()) {
              updateUser();
            }
          }}
        />

        <Loader visible={loading} />
      </View>
    </SafeAreaView>
  );
};

export default UpdateProfileForCompany;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    marginTop: moderateScale(20),
  },
  logo: {
    alignSelf: "center",
    height: scale(80),
    width: scale(80),
    marginTop: moderateScale(40),
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
  SecondView: {
    marginTop: moderateScale(40),
  },
});
