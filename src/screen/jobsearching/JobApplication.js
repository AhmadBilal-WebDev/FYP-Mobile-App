import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { moderateScale, scale } from "react-native-size-matters";
import CustomTextInput from "../../common/CustomTextInput";
import CustomSolidBtn from "../../common/CustomSolidBtn";
import Loader from "../../common/Loader";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { verticalScale } from "react-native-size-matters";
import { BG_COLOR, TEXT_COLOR } from "../../utils/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const JobApplication = () => {
  const [name, setName] = useState("");
  const [badName, setBadName] = useState("");

  const [skill, setSkill] = useState("");
  const [badSkill, setBadSkill] = useState("");

  const [experience, setExperience] = useState("");
  const [badExperience, setBadExperience] = useState("");

  const [age, setAge] = useState("");
  const [badAge, setBadAge] = useState("");

  const [gender, setGender] = useState("");
  const [badGender, setBadGender] = useState("");

  const [education, setEducation] = useState("");
  const [badEducation, setBadEducation] = useState("");

  const [email, setEmail] = useState("");
  const [badEmail, setBadEmail] = useState("");

  const [address, setAddress] = useState("");
  const [badAddress, setBatAddress] = useState("");

  const [contact, setContact] = useState("");
  const [badContact, setBadContact] = useState("");

  const [jobTitle, setJobTitle] = useState("");
  const [badJobTitle, setBadJobTitle] = useState("");

  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  const navigation = useNavigation();

  const validate = () => {
    let validName = name.length >= 3;
    let validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    let validContact = contact.length >= 11 && /^\d+$/.test(contact);
    let validAddress =
      address.length >= 5 && /^[a-zA-Z0-9\s,.'-]{5,}$/.test(address);
    let validSkills = skill.length > 0 && /^[a-zA-Z\s,]+$/.test(skill.trim());
    let validExperience =
      /^\d+$/.test(experience) &&
      Number(experience) >= 0 &&
      Number(experience) <= 50;
    let validEducation =
      education.length >= 2 && /^[a-zA-Z\s]+$/.test(education.trim());
    let validAge = /^\d+$/.test(age) && Number(age) >= 18 && Number(age) <= 100;
    let validGender = ["Male", "Female", "Other"].includes(gender.trim());
    let validJobTitle = name.length >= 3;

    setBadName(validName ? "" : "Please enter a valid name.");
    setBadEmail(validEmail ? "" : "Please enter a valid email.");
    setBadContact(validContact ? "" : "Please enter a valid contact number.");
    setBatAddress(validAddress ? "" : "Please enter valid address");
    setBadSkill(validSkills ? "" : "Please enter valid skills");
    setBadExperience(validExperience ? "" : "Please enter valid experence");
    setBadEducation(validEducation ? "" : "Please enter valid qualification ");
    setBadAge(validAge ? "" : "Please enter valid age");
    setBadGender(validGender ? "" : "Please enter valid Male or Female");
    setBadJobTitle(validJobTitle ? "" : "Please enter valid Job Title");

    return (
      validName &&
      validEmail &&
      validContact &&
      validAddress &&
      validSkills &&
      validExperience &&
      validEducation &&
      validAge &&
      validGender &&
      validJobTitle
    );
  };

  const submitForm = async () => {
    try {
      setLoading(true);
      const companyID = await AsyncStorage.getItem("companyId");
      await addDoc(collection(db, "Job-Application"), {
        name,
        email,
        contact,
        address,
        skill,
        experience,
        education,
        age,
        gender,
        jobTitle,
        companyId: companyID,
      });
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      console.error("Error adding document: ", error);
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image
          source={require("../../images/jobsfinds.png")}
          style={styles.logo}
        />
        <CustomTextInput
          value={name}
          onChangeText={setName}
          title="Full Name"
          bad={badName !== ""}
          placeholder="Enter your name"
        />
        {badName && <Text style={styles.errorMsg}>{badName}</Text>}

        <CustomTextInput
          value={jobTitle}
          onChangeText={setJobTitle}
          title="Job Title"
          bad={badJobTitle !== ""}
          placeholder="Enter your Job Title"
        />
        {badJobTitle && <Text style={styles.errorMsg}>{badJobTitle}</Text>}

        <CustomTextInput
          value={email}
          onChangeText={setEmail}
          title="Email"
          bad={badEmail !== ""}
          placeholder="Enter your email"
        />
        {badEmail && <Text style={styles.errorMsg}>{badEmail}</Text>}

        <CustomTextInput
          value={contact}
          onChangeText={setContact}
          title="Contact Number"
          bad={badContact !== ""}
          placeholder="Enter your contact number"
        />
        {badContact && <Text style={styles.errorMsg}>{badContact}</Text>}

        <CustomTextInput
          value={address}
          onChangeText={setAddress}
          title="Address"
          bad={badAddress !== ""}
          placeholder="Enter your address"
        />
        {badAddress && <Text style={styles.errorMsg}>{badAddress}</Text>}

        <CustomTextInput
          value={age}
          onChangeText={setAge}
          title="Age"
          bad={badAge !== ""}
          placeholder="Enter your age"
        />
        {badAge && <Text style={styles.errorMsg}>{badAge}</Text>}

        <CustomTextInput
          value={gender}
          onChangeText={setGender}
          title="Gender"
          bad={badGender !== ""}
          placeholder="Male or Female"
        />
        {badGender && <Text style={styles.errorMsg}>{badGender}</Text>}

        <CustomTextInput
          value={skill}
          onChangeText={setSkill}
          title="Skills"
          bad={badSkill !== ""}
          placeholder="Enter your skills"
        />
        {badSkill && <Text style={styles.errorMsg}>{badSkill}</Text>}

        <CustomTextInput
          value={experience}
          onChangeText={setExperience}
          title="Experience"
          bad={badExperience !== ""}
          placeholder="Enter your experience"
        />
        {badExperience && <Text style={styles.errorMsg}>{badExperience}</Text>}

        <CustomTextInput
          value={education}
          onChangeText={setEducation}
          title="Qualification"
          bad={badEducation !== ""}
          placeholder="Enter your qualification"
        />
        {badEducation && <Text style={styles.errorMsg}>{badEducation}</Text>}

        <CustomSolidBtn
          title="Submit"
          onClick={() => {
            if (validate()) {
              submitForm();
            }
          }}
        />
        <Loader visible={loading} />
      </View>
    </ScrollView>
  );
};

export default JobApplication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 20,
  },

  applyBtn: {
    width: "70%",
    height: verticalScale(40),
    backgroundColor: TEXT_COLOR,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(10),
  },
  errorMsg: {
    color: "red",
    marginLeft: 20,
  },
  successView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  successText: {
    fontSize: 20,
    marginTop: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: moderateScale(15),
  },
  btnText: {
    color: BG_COLOR,
    fontSize: moderateScale(15),
  },
  skills: {
    fontSize: moderateScale(19),
    fontWeight: "500",
    marginTop: moderateScale(10),
  },
  plus: {
    fontSize: moderateScale(26),
    fontWeight: "600",
    marginTop: moderateScale(30),
    marginLeft: moderateScale(20),
  },
  education: {
    fontSize: moderateScale(20),
    fontWeight: "600",
    marginTop: moderateScale(30),
    marginLeft: moderateScale(20),
  },
  headingView: {
    width: "90%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(20),
    alignSelf: "center",
    borderBottomWidth: 1,
  },
  skillModal: {
    width: "100%",
    paddingBottom: moderateScale(20),
    backgroundColor: "#e4e4dc",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
  },

  iconClose: {
    height: scale(25),
    width: scale(25),
  },
  modalHeader: {
    width: "90%",
    marginTop: moderateScale(20),
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: "600",
  },
  titleSelf: {
    fontSize: moderateScale(15),
    fontWeight: "600",
  },
  input: {
    width: "90%",
    height: scale(40),
    borderWidth: 1,
    borderRadius: moderateScale(10),
    alignSelf: "center",
    marginTop: moderateScale(20),
    paddingLeft: moderateScale(15),
  },
  btn: {
    width: "90%",
    height: scale(45),
    backgroundColor: TEXT_COLOR,
    alignSelf: "center",
    borderRadius: moderateScale(10),
    marginTop: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: moderateScale(16),
  },
  skillItem: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: moderateScale(20),
    justifyContent: "space-between",
    marginTop: moderateScale(10),
  },
  skillName: {
    fontSize: moderateScale(15),
  },
  againCloseIcon: {
    height: scale(20),
    width: scale(20),
  },
  skillName1: {
    fontWeight: "500",
  },
  skillName3: {
    fontWeight: "500",
  },
  same: {
    fontSize: moderateScale(15),
  },
  profile: {
    height: moderateScale(85),
    width: moderateScale(85),
    alignSelf: "center",
    backgroundColor: BG_COLOR,
    borderRadius: moderateScale(50),
    marginTop: moderateScale(20),
  },
});
