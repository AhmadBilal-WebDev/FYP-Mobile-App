import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import CustomTextInput from "../../../common/CustomTextInput";
import { BG_COLOR } from "../../../utils/Colors";
import Customerdropdown from "../../../common/customerDropDown";
import CustomSolidBtn from "../../../common/CustomSolidBtn";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { Profiles } from "../../../utils/Profiles";
import { db } from "../../../utils/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, addDoc } from "firebase/firestore";
import Loader from "../../../common/Loader";

const AddJob = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [badJobTitle, setBadJobTitle] = useState("");

  const [jobDesc, setJobDesc] = useState("");
  const [badJobDec, setBadJobDec] = useState("");

  const [exp, setExp] = useState("");
  const [badExp, setBadExp] = useState("");

  const [salary, setSalary] = useState("");
  const [badSalary, setBadsalary] = useState("");

  const [company, setcompany] = useState("");
  const [badJobcompany, setBadJobcompany] = useState("");

  const [openCategoryModel, setcategoryModel] = useState(false);
  const [openSkillModel, setSkillModel] = useState(false);

  const [selectedCategory, setSelectCategory] = useState("Select Category");
  const [badJobcategory, setBadJobCategory] = useState("");

  const [selectedSkill, setSelectSkill] = useState("Select Skill");
  const [badJobSkill, setBadJobSkill] = useState("");

  const [contact, setContact] = useState("");
  const [badContact, setBadContact] = useState("");

  const [email, setEmail] = useState("");
  const [badEmail, setBadEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const postJob = async () => {
    try {
      const id = await AsyncStorage.getItem("USER_ID");
      const name = await AsyncStorage.getItem("NAME");

      if (!id || !name) {
        id;
        console.error("User ID or Name is missing");
        return;
      }

      setLoading(true);

      await addDoc(collection(db, "jobs"), {
        postedBy: id,
        posterName: name,
        jobTitle,
        jobDesc,
        exp,
        salary,
        company,
        skill: selectedSkill,
        category: Profiles[selectedCategory].category,
        contact,
        email,
      });

      setLoading(true);
      navigation.goBack();
    } catch (err) {
      setLoading(false);
      console.error("Error posting job:", err);
    }
  };

  const validate = () => {
    let validJobTitle = true;
    let validJobDec = true;
    let validCategory = true;
    let validSkill = true;
    let validExp = true;
    let validPakage = true;
    let validCompony = true;
    let validEmail = true;
    let validContact = true;

    if (jobTitle == "") {
      validJobTitle = false;
      setBadJobTitle("Please Enter Job Title");
    } else if (jobTitle != "") {
      validJobTitle = true;
      setBadJobTitle("");
    }

    if (jobDesc == "") {
      validJobDec = false;
      setBadJobDec("Please Enter Job Description");
    } else if (jobDesc != "" && jobDesc.length < 10) {
      validJobDec = true;
      setBadJobDec("Please Enter Job Description min 10 Characters");
    } else if (jobDesc != "" && jobDesc.length >= 10) {
      validJobDec = true;
      setBadJobDec("");
    }

    if (selectedCategory == "Select Category") {
      validCategory = false;
      setBadJobCategory("Please Select Job Category");
    } else if (selectedCategory != "Select Category") {
      validCategory = true;
      setBadJobCategory("");
    }

    if (selectedSkill == "Select Skill") {
      validSkill = false;
      setBadJobSkill("Please Select Skill");
    } else if (selectedSkill != "Select Skill") {
      validSkill = true;
      setBadJobSkill("");
    }

    let expRegex = /^\d+$/;
    if (exp == "") {
      validExp = false;
      setBadExp("Please Enter Experience");
    } else if (exp != "" && exp.length > 2) {
      validExp = false;
      setBadExp("Please Enter Valid Experience");
    } else if (exp != "" && exp.length < 3 && !exp.match(expRegex)) {
      validExp = false;
      validExp("Please Enter Valid Experience");
    } else if (exp != "" && exp.length < 3 && exp.match(expRegex)) {
      validExp = true;
      setBadExp("");
    }

    if (salary == "") {
      validPakage = false;
      setBadsalary("Please Enter Salary");
    } else if (salary != "" && !salary.match(expRegex)) {
      validPakage = false;
      setBadsalary("Please Enter Valid Salary");
    } else if (exp != "" && salary.match(expRegex)) {
      validPakage = true;
      setBadsalary("");
    }

    if (company == "") {
      validCompony = false;
      setBadJobcompany("Please Enter Company");
    } else if (company != "") {
      validCompony = true;
      setBadJobcompany("");
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

    return (
      validJobTitle &&
      validJobDec &&
      validCategory &&
      validSkill &&
      validExp &&
      validPakage &&
      validCompony &&
      validEmail &&
      validContact
    );
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../../../images/jobsfinds.png")}
          style={styles.logo}
        />
        <CustomTextInput
          value={jobTitle}
          onChangeText={(txt) => {
            setJobTitle(txt);
          }}
          title={"Job Title"}
          bad={badJobTitle != "" ? true : false}
          placeholder={"ex.web develpoment"}
        />
        {badJobTitle != "" && (
          <Text style={styles.errorMsg}>{badJobTitle}</Text>
        )}

        <CustomTextInput
          value={jobDesc}
          onChangeText={(txt) => {
            setJobDesc(txt);
          }}
          title={"Job Description"}
          bad={badJobDec != "" ? true : false}
          placeholder={"ex.this is web develpoment"}
        />
        {badJobDec != "" && <Text style={styles.errorMsg}>{badJobDec}</Text>}

        <Customerdropdown
          value={jobDesc}
          onChangeText={(txt) => {
            setJobDesc(txt);
          }}
          title={"Category"}
          bad={badJobcategory != "" ? true : false}
          placeholder={
            selectedCategory == "Select Category"
              ? "Select Category"
              : Profiles[selectedCategory].category
          }
          onclick={() => {
            setcategoryModel(true);
          }}
        />
        {badJobcategory != "" && (
          <Text style={styles.errorMsg}>{badJobcategory}</Text>
        )}

        <Customerdropdown
          value={jobDesc}
          onChangeText={(txt) => {
            setJobDesc(txt);
          }}
          title={"Select Skills"}
          bad={badJobSkill != "" ? true : false}
          placeholder={selectedSkill}
          onclick={() => {
            setSkillModel(true);
          }}
        />
        {badJobSkill != "" && (
          <Text style={styles.errorMsg}>{badJobSkill}</Text>
        )}

        <CustomTextInput
          value={email}
          onChangeText={(txt) => {
            setEmail(txt);
          }}
          title={"Email"}
          bad={badEmail != "" ? true : false}
          placeholder={"company@gmail.com"}
        />
        {badEmail != "" && <Text style={styles.errorMsg}>{badEmail}</Text>}

        <CustomTextInput
          value={contact}
          onChangeText={(txt) => {
            setContact(txt);
          }}
          title={"Contact Number"}
          bad={badContact != "" ? true : false}
          placeholder={"Enter whatsapp contact number"}
        />
        {badContact != "" && <Text style={styles.errorMsg}>{badContact}</Text>}

        <CustomTextInput
          value={company}
          onChangeText={(txt) => {
            setcompany(txt);
          }}
          title={"Company"}
          bad={badJobcompany != "" ? true : false}
          placeholder={"ex. google"}
        />

        {badJobcompany != "" && (
          <Text style={styles.errorMsg}>{badJobcompany}</Text>
        )}

        <CustomTextInput
          value={exp}
          onChangeText={(txt) => {
            setExp(txt);
          }}
          title={"Experience"}
          bad={badExp != "" ? true : false}
          placeholder={"ex. 3 or 5 years experience"}
        />
        {badExp != "" && <Text style={styles.errorMsg}>{badExp}</Text>}

        <CustomTextInput
          value={salary}
          onChangeText={(txt) => {
            setSalary(txt);
          }}
          title={"Package"}
          bad={badSalary != "" ? true : false}
          placeholder={"ex. 10L"}
        />
        {badSalary != "" && <Text style={styles.errorMsg}>{badSalary}</Text>}

        <CustomSolidBtn
          title={"Post Job"}
          onClick={() => {
            if (validate()) {
              postJob();
            }
          }}
        />
        <Modal
          visible={openCategoryModel}
          transparent
          style={styles.ModalStyle}
        >
          <View style={styles.ModelMainView}>
            <View style={styles.listingView}>
              <Text style={[styles.title, { textDecorationLine: "underline" }]}>
                Select category
              </Text>
              <FlatList
                data={Profiles}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={styles.profileItem}
                      onPress={() => {
                        setSelectCategory(index);
                        setcategoryModel(false);
                      }}
                    >
                      <Text>{item.category}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </Modal>

        <Modal visible={openSkillModel} transparent style={styles.ModalStyle}>
          <View style={styles.ModelMainView}>
            <View style={styles.listingView}>
              <Text style={[styles.title, { textDecorationLine: "underline" }]}>
                Select Skill
              </Text>
              <FlatList
                data={
                  selectedCategory == "Select Category"
                    ? Profiles[0].keywords
                    : Profiles[selectedCategory].keywords
                }
                renderItem={({ item, index }) => {
                  console.log(item);

                  return (
                    <TouchableOpacity
                      style={styles.profileItem}
                      onPress={() => {
                        setSelectSkill(item[0]);
                        setSkillModel(false);
                      }}
                    >
                      <Text>{item[0]}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </Modal>
        <Loader visible={loading} />
      </SafeAreaView>
    </ScrollView>
  );
};

export default AddJob;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    marginBottom: moderateScale(20),
  },
  ModalStyle: {
    flex: 1,
  },
  ModelMainView: {
    backgroundColor: "rgba(0,0,0,.3)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  listingView: {
    width: "90%",
    height: "80%",
    borderRadius: moderateScale(10),
    backgroundColor: BG_COLOR,
  },
  profileItem: {
    width: "90%",
    height: verticalScale(40),
    justifyContent: "center",
    paddingLeft: moderateScale(20),
    alignSelf: "center",
    borderBottomWidth: 0.4,
  },
  errorMsg: {
    color: "red",
    marginLeft: moderateScale(25),
  },
  logo: {
    height: scale(90),
    width: scale(90),
    alignSelf: "center",
    marginTop: moderateScale(-20),
  },
  title: {
    fontSize: moderateScale(18),
    marginBottom: moderateScale(10),
    alignSelf: "center",
    marginTop: moderateScale(10),
  },
});
