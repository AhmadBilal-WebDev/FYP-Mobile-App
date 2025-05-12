// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Image,
//   Modal,
//   Alert,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import NoLoginComponent from "../../../common/NoLoginComponent";
// import { useIsFocused, useNavigation } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { moderateScale, scale, verticalScale } from "react-native-size-matters";
// import { db } from "../../../utils/firebaseConfig";
// import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
// import { TEXT_COLOR } from "../../../utils/Colors";
// import {
//   collection,
//   addDoc,
//   query,
//   where,
//   getDocs,
//   doc,
//   getDoc,
//   deleteDoc,
// } from "firebase/firestore";

// const Profile = () => {
//   const [openSkillModel, setSkillModel] = useState(false);
//   const [openExpModel, setOpenExpModel] = useState(false);
//   const [skill, setSkill] = useState("");
//   const [skillsList, setSkillsList] = useState([]);
//   const [company, setCompany] = useState("");
//   const [startYear, setStartYear] = useState("");
//   const [endYear, setEndYear] = useState("");
//   const [profile, setProfile] = useState("");
//   const [expList, setExpList] = useState("");
//   const [educationList, setEducationList] = useState([]);
//   const [startCollegeYear, setStartCollegeYear] = useState("");
//   const [cgpa, setCGPA] = useState("");
//   const [collage, setCollege] = useState("");
//   const [course, setCourse] = useState("");
//   const [openEduModel, setOpenEduModel] = useState(false);
//   const navigation = useNavigation();

//   useEffect(() => {
//     getSkills();
//     getExperienceList();
//     getEducationList();
//   }, []);

//   const getData = async () => {
//     const id = await AsyncStorage.getItem("USER_ID");
//     const type = await AsyncStorage.getItem("USER_TYPE");
//     if (id != null && type != null) {
//       if (type == "user") {
//         setIsLogin(true);
//       }
//     }
//   };
//   const addSkill = async () => {
//     try {
//       const id = await AsyncStorage.getItem("USER_ID");
//       if (!id) {
//         Alert.alert("Error", "User ID not found");
//         return;
//       }
//       await addDoc(collection(db, "skills"), {
//         skill: skill,
//         userId: id,
//       });
//       Alert.alert("Skill added Successfully");
//       getSkills();
//       setSkill("");
//     } catch (error) {
//       console.error("Error adding skill: ", error);
//       Alert.alert("Error", "Failed to add skill");
//     }
//   };

//   const getSkills = async () => {
//     try {
//       const id = await AsyncStorage.getItem("USER_ID");
//       if (!id) {
//         console.error("Error: User ID not found");
//         return;
//       }

//       const skillsCollection = collection(db, "skills");

//       const q = query(skillsCollection, where("userId", "==", id));

//       const querySnapshot = await getDocs(q);

//       const temp = [];
//       querySnapshot.forEach((doc) => {
//         temp.push({ ...doc.data(), skillId: doc.id });
//       });

//       setSkillsList(temp);
//       console.log("Fetched Skills: ", temp);
//     } catch (error) {
//       console.error("Error fetching documents: ", error);
//     }
//   };
//   const deleteSkill = async (id) => {
//     try {
//       const docRef = doc(db, "skills", id);
//       await deleteDoc(docRef);
//       console.log("Document successfully deleted!");
//       getSkills();
//     } catch (error) {
//       console.error("Error deleting document: ", error);
//     }
//   };

//   const addExperience = async () => {
//     try {
//       const id = await AsyncStorage.getItem("USER_ID");
//       if (!id) {
//         Alert.alert("Error", "User ID not found");
//         return;
//       }
//       await addDoc(collection(db, "experience"), {
//         company: company,
//         startYear: startYear,
//         endYear: endYear,
//         profile: profile,
//         userId: id,
//       });
//       Alert.alert("Experience added Successfully");
//       setCompany("");
//       setEndYear("");
//       setStartYear();
//       setProfile();
//       getExperienceList();
//     } catch (error) {
//       console.error("Error adding Experience: ", error);
//       Alert.alert("Error", "Failed to add Experience");
//     }
//   };

//   const getExperienceList = async () => {
//     try {
//       const id = await AsyncStorage.getItem("USER_ID");
//       if (!id) {
//         console.error("Error: User ID not found");
//         return;
//       }

//       const skillsCollection = collection(db, "experience");

//       const q = query(skillsCollection, where("userId", "==", id));

//       const querySnapshot = await getDocs(q);

//       const temp = [];
//       querySnapshot.forEach((doc) => {
//         temp.push({ ...doc.data(), expId: doc.id });
//       });

//       setExpList(temp);
//       console.log("Fetched Skills: ", temp);
//     } catch (error) {
//       console.error("Error fetching documents: ", error);
//     }
//   };

//   const deleteExp = async (id) => {
//     try {
//       const docRef = doc(db, "experience", id);
//       await deleteDoc(docRef);
//       console.log("Document successfully deleted!");
//       getExperienceList();
//     } catch (error) {
//       console.error("Error deleting document: ", error);
//     }
//   };

//   const addEducation = async () => {
//     try {
//       const id = await AsyncStorage.getItem("USER_ID");
//       if (!id) {
//         Alert.alert("Error", "User ID not found");
//         return;
//       }
//       await addDoc(collection(db, "education"), {
//         collage: collage,
//         startCollegeYear: startCollegeYear,
//         cgpa: cgpa,
//         course: course,
//         userId: id,
//       });
//       Alert.alert("Education added Successfully");
//       setCollege("");
//       setCGPA("");
//       setStartCollegeYear();
//       setCourse();
//       getEducationList();
//     } catch (error) {
//       console.error("Error adding Experience: ", error);
//       Alert.alert("Error", "Failed to add Experience");
//     }
//   };

//   const getEducationList = async () => {
//     try {
//       const id = await AsyncStorage.getItem("USER_ID");
//       if (!id) {
//         console.error("Error: User ID not found");
//         return;
//       }

//       const skillsCollection = collection(db, "education");

//       const q = query(skillsCollection, where("userId", "==", id));

//       const querySnapshot = await getDocs(q);

//       const temp = [];
//       querySnapshot.forEach((doc) => {
//         temp.push({ ...doc.data(), eduId: doc.id });
//       });

//       setEducationList(temp);
//       console.log("Fetched Skills: ", temp);
//     } catch (error) {
//       console.error("Error fetching documents: ", error);
//     }
//   };

//   const deleteEducation = async (id) => {
//     try {
//       const docRef = doc(db, "education", id);
//       await deleteDoc(docRef);
//       console.log("Document successfully deleted!");
//       getEducationList();
//     } catch (error) {
//       console.error("Error deleting document: ", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.headingView}>
//         <Text style={styles.skills}>{"Skills"}</Text>
//         <Text
//           style={styles.plus}
//           onPress={() => {
//             setSkillModel(true);
//           }}
//         >
//           {"+"}
//         </Text>
//       </View>

//       <View>
//         <FlatList
//           data={skillsList}
//           renderItem={({ item, index }) => {
//             return (
//               <View style={styles.skillItem}>
//                 <Text style={styles.skillName}>{item.skill}</Text>
//                 <TouchableOpacity
//                   onPress={() => {
//                     deleteSkill(item.skillId);
//                   }}
//                 >
//                   <Image
//                     source={require("../../../images/close.png")}
//                     style={styles.againCloseIcon}
//                   />
//                 </TouchableOpacity>
//               </View>
//             );
//           }}
//         />
//       </View>

//       <View style={styles.headingView}>
//         <Text style={styles.skills}>{"Experience"}</Text>
//         <Text
//           style={styles.plus}
//           onPress={() => {
//             setOpenExpModel(true);
//           }}
//         >
//           {"+"}
//         </Text>
//       </View>

//       <View>
//         <FlatList
//           data={expList}
//           renderItem={({ item, index }) => {
//             return (
//               <View style={styles.skillItem}>
//                 <View>
//                   <Text style={styles.skillName1}>{item.company}</Text>
//                   <Text style={styles.skillName2}>
//                     {item.startYear + "-" + item.endYear}
//                   </Text>
//                   <Text style={styles.skillName3}>{item.profile}</Text>
//                 </View>
//                 <TouchableOpacity
//                   onPress={() => {
//                     deleteExp(item.expId);
//                   }}
//                 >
//                   <Image
//                     source={require("../../../images/close.png")}
//                     style={styles.againCloseIcon}
//                   />
//                 </TouchableOpacity>
//               </View>
//             );
//           }}
//         />
//       </View>

//       <View style={styles.headingView}>
//         <Text style={styles.skills}>{"Education"}</Text>
//         <Text
//           style={styles.plus}
//           onPress={() => {
//             setOpenEduModel(true);
//           }}
//         >
//           {"+"}
//         </Text>
//       </View>

//       <View>
//         <FlatList
//           data={educationList}
//           renderItem={({ item, index }) => {
//             return (
//               <View style={styles.skillItem}>
//                 <View>
//                   <Text style={styles.skillName1}>
//                     {item.collage + " University"}
//                   </Text>
//                   <Text style={styles.skillName}>{item.startCollegeYear}</Text>
//                   <Text style={styles.skillName3}>{item.course}</Text>
//                   <Text style={styles.skillName3}>{item.cgpa}</Text>
//                 </View>
//                 <TouchableOpacity
//                   onPress={() => {
//                     deleteEducation(item.eduId);
//                   }}
//                 >
//                   <Image
//                     source={require("../../../images/close.png")}
//                     style={styles.againCloseIcon}
//                   />
//                 </TouchableOpacity>
//               </View>
//             );
//           }}
//         />
//       </View>

//       <Modal visible={openSkillModel} transparent>
//         <View style={styles.skillModal}>
//           <View style={styles.modalHeader}>
//             <Text style={styles.title}>Add Skills</Text>
//             <TouchableOpacity
//               onPress={() => {
//                 setSkillModel(false);
//               }}
//             >
//               <Image
//                 source={require("../../../images/close.png")}
//                 style={styles.iconClose}
//               />
//             </TouchableOpacity>
//           </View>
//           <TextInput
//             placeholderTextColor={"#9e9e9e"}
//             placeholder="Enter Your Skills"
//             style={styles.input}
//             value={skill}
//             onChangeText={(txt) => setSkill(txt)}
//           />
//           <TouchableOpacity
//             style={styles.btn}
//             onPress={() => {
//               setSkillModel(false);
//               if (skill != "") {
//                 addSkill();
//               }
//             }}
//           >
//             <Text style={styles.btnText}>Submit Skill</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>

      // <Modal visible={openExpModel} transparent>
      //   <View style={styles.skillModal}>
      //     <View style={styles.modalHeader}>
      //       <Text style={styles.title}>Add Experience</Text>
      //       <TouchableOpacity
      //         onPress={() => {
      //           setOpenExpModel(false);
      //         }}
      //       >
      //         <Image
      //           source={require("../../../images/close.png")}
      //           style={styles.iconClose}
      //         />
      //       </TouchableOpacity>
      //     </View>
      //     <TextInput
      //       placeholderTextColor={"#9e9e9e"}
      //       placeholder="Enter Company Name"
      //       style={styles.input}
      //       value={company}
      //       onChangeText={(txt) => setCompany(txt)}
      //     />

      //     <TextInput
      //       placeholderTextColor={"#9e9e9e"}
      //       placeholder="Enter Start Year"
      //       maxLength={4}
      //       keyboardType="numeric"
      //       style={styles.input}
      //       value={startYear}
      //       onChangeText={(txt) => setStartYear(txt)}
      //     />

      //     <TextInput
      //       placeholderTextColor={"#9e9e9e"}
      //       placeholder="Enter End Year"
      //       maxLength={4}
      //       keyboardType="numeric"
      //       style={styles.input}
      //       value={endYear}
      //       onChangeText={(txt) => setEndYear(txt)}
      //     />

      //     <TextInput
      //       placeholderTextColor={"#9e9e9e"}
      //       placeholder="Profile"
      //       style={styles.input}
      //       value={profile}
      //       onChangeText={(txt) => setProfile(txt)}
      //     />
      //     <TouchableOpacity
      //       style={styles.btn}
      //       onPress={() => {
      //         setOpenExpModel(false);
      //         if (company != "" && startYear != "" && endYear != "") {
      //           addExperience();
      //         }
      //       }}
      //     >
      //       <Text style={styles.btnText}>Submit Experience</Text>
      //     </TouchableOpacity>
      //   </View>
      // </Modal>

//       <Modal visible={openEduModel} transparent>
//         <View style={styles.skillModal}>
//           <View style={styles.modalHeader}>
//             <Text style={styles.title}>Add Education</Text>
//             <TouchableOpacity
//               onPress={() => {
//                 setOpenEduModel(false);
//               }}
//             >
//               <Image
//                 source={require("../../../images/close.png")}
//                 style={styles.iconClose}
//               />
//             </TouchableOpacity>
//           </View>

//           <TextInput
//             placeholderTextColor={"#9e9e9e"}
//             placeholder="University Name"
//             style={styles.input}
//             value={collage}
//             onChangeText={(txt) => setCollege(txt)}
//           />

//           <TextInput
//             placeholderTextColor={"#9e9e9e"}
//             placeholder="Year 2001-20015"
//             maxLength={9}
//             keyboardType="numeric"
//             style={styles.input}
//             value={startCollegeYear}
//             onChangeText={(txt) => setStartCollegeYear(txt)}
//           />

//           <TextInput
//             placeholderTextColor={"#9e9e9e"}
//             placeholder="Enter Course"
//             style={styles.input}
//             value={course}
//             onChangeText={(txt) => setCourse(txt)}
//           />

//           <TextInput
//             placeholderTextColor={"#9e9e9e"}
//             placeholder="CGPA "
//             maxLength={4}
//             keyboardType="numeric"
//             style={styles.input}
//             value={cgpa}
//             onChangeText={(txt) => setCGPA(txt)}
//           />

//           <TouchableOpacity
//             style={styles.btn}
//             onPress={() => {
//               setOpenEduModel(false);
//               if (collage != "" && startCollegeYear != "" && cgpa != "") {
//                 addEducation();
//               }
//             }}
//           >
//             <Text style={styles.btnText}>Submit Education</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default Profile;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },

//   skills: {
//     fontSize: moderateScale(19),
//     fontWeight: "500",
//     marginTop: moderateScale(10),
//   },
//   plus: {
//     fontSize: moderateScale(26),
//     fontWeight: "600",
//     marginTop: moderateScale(30),
//     marginLeft: moderateScale(20),
//   },
//   education: {
//     fontSize: moderateScale(20),
//     fontWeight: "600",
//     marginTop: moderateScale(30),
//     marginLeft: moderateScale(20),
//   },
//   headingView: {
//     width: "90%",
//     justifyContent: "space-between",
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: moderateScale(20),
//     alignSelf: "center",
//   },
//   skillModal: {
//     width: "100%",
//     paddingBottom: moderateScale(20),
//     backgroundColor: "#e4e4dc",
//     position: "absolute",
//     bottom: 0,
//     borderTopLeftRadius: moderateScale(30),
//     borderTopRightRadius: moderateScale(30),
//   },

//   iconClose: {
//     height: scale(25),
//     width: scale(25),
//   },
//   modalHeader: {
//     width: "90%",
//     marginTop: moderateScale(20),
//     flexDirection: "row",
//     alignSelf: "center",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: moderateScale(18),
//     fontWeight: "600",
//   },
//   titleSelf: {
//     fontSize: moderateScale(15),
//     fontWeight: "600",
//   },
//   input: {
//     width: "90%",
//     height: scale(40),
//     borderWidth: 1,
//     borderRadius: moderateScale(10),
//     alignSelf: "center",
//     marginTop: moderateScale(20),
//     paddingLeft: moderateScale(15),
//   },
//   btn: {
//     width: "90%",
//     height: scale(45),
//     backgroundColor: TEXT_COLOR,
//     alignSelf: "center",
//     borderRadius: moderateScale(10),
//     marginTop: moderateScale(20),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   btnText: {
//     color: "white",
//     fontSize: moderateScale(16),
//   },
//   skillItem: {
//     width: "90%",
//     alignSelf: "center",
//     flexDirection: "row",
//     alignItems: "center",
//     paddingLeft: moderateScale(20),
//     justifyContent: "space-between",
//     marginTop: moderateScale(10),
//   },
//   skillName: {
//     fontSize: moderateScale(15),
//   },
//   againCloseIcon: {
//     height: scale(20),
//     width: scale(20),
//   },
//   skillName1: {
//     fontWeight: "500",
//   },
//   skillName3: {
//     fontWeight: "500",
//   },
// });

// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Image,
//   Modal,
//   Alert,
//   TextInput,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// // import NoLoginComponent from "../../../common/NoLoginComponent";
// import { useIsFocused, useNavigation } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { moderateScale, scale } from "react-native-size-matters";
// import {
//   collection,
//   addDoc,
//   query,
//   where,
//   getDocs,
//   doc,
//   deleteDoc,
// } from "firebase/firestore";
// import { db } from "../../utils/firebaseConfig";
// import { ScrollView } from "react-native-gesture-handler";

// const Profile = () => {
//   const [openSkillModel, setSkillModel] = useState(false);
//   const [openExpModel, setOpenExpModel] = useState(false);
//   const [skill, setSkill] = useState("");
//   const [skillsList, setSkillsList] = useState([]);
//   const [company, setCompany] = useState("");
//   const [startYear, setStartYear] = useState("");
//   const [endYear, setEndYear] = useState("");
//   const [profile, setProfile] = useState("");
//   const [expList, setExpList] = useState([]);
//   const [educationList, setEducationList] = useState([]);
//   const [startCollegeYear, setStartCollegeYear] = useState("");
//   const [cgpa, setCGPA] = useState("");
//   const [collage, setCollege] = useState("");
//   const [course, setCourse] = useState("");
//   const [openEduModel, setOpenEduModel] = useState(false);
//   const navigation = useNavigation();

//   useEffect(() => {
//     getSkills();
//     getExperienceList();
//     getEducationList();
//   }, []);

//   const getData = async () => {
//     const id = await AsyncStorage.getItem("USER_ID");
//     const type = await AsyncStorage.getItem("USER_TYPE");
//     if (id != null && type != null) {
//       if (type == "user") {
//         setIsLogin(true);
//       }
//     }
//   };

//   const addSkill = async () => {
//     try {
//       const id = await AsyncStorage.getItem("USER_ID");
//       if (!id) {
//         Alert.alert("Error", "User ID not found");
//         return;
//       }
//       await addDoc(collection(db, "skills"), { skill, userId: id });
//       Alert.alert("Skill added Successfully");
//       getSkills();
//       setSkill("");
//     } catch (error) {
//       console.error("Error adding skill: ", error);
//       Alert.alert("Error", "Failed to add skill");
//     }
//   };

//   const getSkills = async () => {
//     try {
//       const id = await AsyncStorage.getItem("USER_ID");
//       if (!id) {
//         console.error("Error: User ID not found");
//         return;
//       }

//       const skillsCollection = collection(db, "skills");
//       const q = query(skillsCollection, where("userId", "==", id));
//       const querySnapshot = await getDocs(q);

//       const temp = [];
//       querySnapshot.forEach((doc) =>
//         temp.push({ ...doc.data(), skillId: doc.id })
//       );
//       setSkillsList(temp);
//     } catch (error) {
//       console.error("Error fetching documents: ", error);
//     }
//   };

//   const deleteSkill = async (id) => {
//     try {
//       const docRef = doc(db, "skills", id);
//       await deleteDoc(docRef);
//       getSkills();
//     } catch (error) {
//       console.error("Error deleting document: ", error);
//     }
//   };

//   const addExperience = async () => {
//     try {
//       const id = await AsyncStorage.getItem("USER_ID");
//       if (!id) {
//         Alert.alert("Error", "User ID not found");
//         return;
//       }
//       await addDoc(collection(db, "experience"), {
//         company,
//         startYear,
//         endYear,
//         profile,
//         userId: id,
//       });
//       Alert.alert("Experience added Successfully");
//       setCompany("");
//       setEndYear("");
//       setStartYear("");
//       setProfile("");
//       getExperienceList();
//     } catch (error) {
//       console.error("Error adding Experience: ", error);
//       Alert.alert("Error", "Failed to add Experience");
//     }
//   };

//   const getExperienceList = async () => {
//     try {
//       const id = await AsyncStorage.getItem("USER_ID");
//       if (!id) {
//         console.error("Error: User ID not found");
//         return;
//       }

//       const skillsCollection = collection(db, "experience");
//       const q = query(skillsCollection, where("userId", "==", id));
//       const querySnapshot = await getDocs(q);

//       const temp = [];
//       querySnapshot.forEach((doc) =>
//         temp.push({ ...doc.data(), expId: doc.id })
//       );
//       setExpList(temp);
//     } catch (error) {
//       console.error("Error fetching documents: ", error);
//     }
//   };

//   const deleteExp = async (id) => {
//     try {
//       const docRef = doc(db, "experience", id);
//       await deleteDoc(docRef);
//       getExperienceList();
//     } catch (error) {
//       console.error("Error deleting document: ", error);
//     }
//   };

//   const addEducation = async () => {
//     try {
//       const id = await AsyncStorage.getItem("USER_ID");
//       if (!id) {
//         Alert.alert("Error", "User ID not found");
//         return;
//       }
//       await addDoc(collection(db, "education"), {
//         collage,
//         startCollegeYear,
//         cgpa,
//         course,
//         userId: id,
//       });
//       Alert.alert("Education added Successfully");
//       setCollege("");
//       setCGPA("");
//       setStartCollegeYear("");
//       setCourse("");
//       getEducationList();
//     } catch (error) {
//       console.error("Error adding Experience: ", error);
//       Alert.alert("Error", "Failed to add Experience");
//     }
//   };

//   const getEducationList = async () => {
//     try {
//       const id = await AsyncStorage.getItem("USER_ID");
//       if (!id) {
//         console.error("Error: User ID not found");
//         return;
//       }

//       const skillsCollection = collection(db, "education");
//       const q = query(skillsCollection, where("userId", "==", id));
//       const querySnapshot = await getDocs(q);

//       const temp = [];
//       querySnapshot.forEach((doc) =>
//         temp.push({ ...doc.data(), eduId: doc.id })
//       );
//       setEducationList(temp);
//     } catch (error) {
//       console.error("Error fetching documents: ", error);
//     }
//   };

//   const deleteEducation = async (id) => {
//     try {
//       const docRef = doc(db, "education", id);
//       await deleteDoc(docRef);
//       getEducationList();
//     } catch (error) {
//       console.error("Error deleting document: ", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.headingView}>
//         <Text style={styles.skills}>{"Skills"}</Text>
//         <TouchableOpacity onPress={() => setSkillModel(true)}>
//           <Text style={styles.plus}>{"+"}</Text>
//         </TouchableOpacity>
//       </View>
//       <ScrollView>
//         {skillsList.map((item, index) => (
//           <View key={index} style={styles.skillItem}>
//             <Text style={styles.skillName}>{item.skill}</Text>
//             <TouchableOpacity onPress={() => deleteSkill(item.skillId)}>
//               <Image
//                 source={require("../../images/close.png")}
//                 style={styles.againCloseIcon}
//               />
//             </TouchableOpacity>
//           </View>
//         ))}
//       </ScrollView>

//       <View style={styles.headingView}>
//         <Text style={styles.skills}>{"Experience"}</Text>
//         <TouchableOpacity onPress={() => setOpenExpModel(true)}>
//           <Text style={styles.plus}>{"+"}</Text>
//         </TouchableOpacity>
//       </View>

//       <ScrollView>
//         {expList.map((item, index) => (
//           <View key={index} style={styles.skillItem}>
//             <View>
//               <Text style={styles.skillName1}>{item.company}</Text>
//               <Text style={styles.skillName2}>
//                 {item.startYear + "-" + item.endYear}
//               </Text>
//               <Text style={styles.skillName3}>{item.profile}</Text>
//             </View>
//             <TouchableOpacity onPress={() => deleteExp(item.expId)}>
//               <Image
//                 source={require("../../images/close.png")}
//                 style={styles.againCloseIcon}
//               />
//             </TouchableOpacity>
//           </View>
//         ))}
//       </ScrollView>

//       <View style={styles.headingView}>
//         <Text style={styles.skills}>{"Education"}</Text>
//         <TouchableOpacity onPress={() => setOpenEduModel(true)}>
//           <Text style={styles.plus}>{"+"}</Text>
//         </TouchableOpacity>
//       </View>

//       <ScrollView>
//         {educationList.map((item, index) => (
//           <View key={index} style={styles.skillItem}>
//             <View>
//               <Text style={styles.skillName1}>
//                 {item.collage + " University"}
//               </Text>
//               <Text style={styles.skillName}>{item.startCollegeYear}</Text>
//               <Text style={styles.skillName3}>{item.course}</Text>
//               <Text style={styles.skillName3}>{item.cgpa}</Text>
//             </View>
//             <TouchableOpacity onPress={() => deleteEducation(item.eduId)}>
//               <Image
//                 source={require("../../images/close.png")}
//                 style={styles.againCloseIcon}
//               />
//             </TouchableOpacity>
//           </View>
//         ))}
//       </ScrollView>

//       <Modal visible={openSkillModel} transparent>
//         <View style={styles.skillModal}>
//           <View style={styles.modalHeader}>
//             <Text style={styles.title}>Add Skills</Text>
//             <TouchableOpacity onPress={() => setSkillModel(false)}>
//               <Image
//                 source={require("../../images/close.png")}
//                 style={styles.iconClose}
//               />
//             </TouchableOpacity>
//           </View>
//           <TextInput
//             placeholderTextColor={"#9e9e9e"}
//             placeholder="Enter Your Skills"
//             style={styles.input}
//             value={skill}
//             onChangeText={(txt) => setSkill(txt)}
//           />
//           <TouchableOpacity
//             style={styles.btn}
//             onPress={() => {
//               setSkillModel(false);
//               if (skill != "") {
//                 addSkill();
//               }
//             }}
//           >
//             <Text style={styles.btnText}>Submit Skill</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>

//       <Modal visible={openExpModel} transparent>
//         <View style={styles.skillModal}>
//           <View style={styles.modalHeader}>
//             <Text style={styles.title}>Add Experience</Text>
//             <TouchableOpacity
//               onPress={() => {
//                 setOpenExpModel(false);
//               }}
//             >
//               <Image
//                 source={require("../../images/close.png")}
//                 style={styles.iconClose}
//               />
//             </TouchableOpacity>
//           </View>
//           <TextInput
//             placeholderTextColor={"#9e9e9e"}
//             placeholder="Enter Company Name"
//             style={styles.input}
//             value={company}
//             onChangeText={(txt) => setCompany(txt)}
//           />

//           <TextInput
//             placeholderTextColor={"#9e9e9e"}
//             placeholder="Enter Start Year"
//             maxLength={4}
//             keyboardType="numeric"
//             style={styles.input}
//             value={startYear}
//             onChangeText={(txt) => setStartYear(txt)}
//           />

//           <TextInput
//             placeholderTextColor={"#9e9e9e"}
//             placeholder="Enter End Year"
//             maxLength={4}
//             keyboardType="numeric"
//             style={styles.input}
//             value={endYear}
//             onChangeText={(txt) => setEndYear(txt)}
//           />

//           <TextInput
//             placeholderTextColor={"#9e9e9e"}
//             placeholder="Profile"
//             style={styles.input}
//             value={profile}
//             onChangeText={(txt) => setProfile(txt)}
//           />
//           <TouchableOpacity
//             style={styles.btn}
//             onPress={() => {
//               setOpenExpModel(false);
//               if (company != "" && startYear != "" && endYear != "") {
//                 addExperience();
//               }
//             }}
//           >
//             <Text style={styles.btnText}>Submit Experience</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>

//       <Modal visible={openEduModel} transparent>
//         <View style={styles.skillModal}>
//           <View style={styles.modalHeader}>
//             <Text style={styles.title}>Add Education</Text>
//             <TouchableOpacity
//               onPress={() => {
//                 setOpenEduModel(false);
//               }}
//             >
//               <Image
//                 source={require("../../images/close.png")}
//                 style={styles.iconClose}
//               />
//             </TouchableOpacity>
//           </View>

//           <TextInput
//             placeholderTextColor={"#9e9e9e"}
//             placeholder="University Name"
//             style={styles.input}
//             value={collage}
//             onChangeText={(txt) => setCollege(txt)}
//           />

//           <TextInput
//             placeholderTextColor={"#9e9e9e"}
//             placeholder="Year 2001-20015"
//             maxLength={9}
//             keyboardType="numeric"
//             style={styles.input}
//             value={startCollegeYear}
//             onChangeText={(txt) => setStartCollegeYear(txt)}
//           />

//           <TextInput
//             placeholderTextColor={"#9e9e9e"}
//             placeholder="Enter Course"
//             style={styles.input}
//             value={course}
//             onChangeText={(txt) => setCourse(txt)}
//           />

//           <TextInput
//             placeholderTextColor={"#9e9e9e"}
//             placeholder="CGPA "
//             maxLength={4}
//             keyboardType="numeric"
//             style={styles.input}
//             value={cgpa}
//             onChangeText={(txt) => setCGPA(txt)}
//           />

//           <TouchableOpacity
//             style={styles.btn}
//             onPress={() => {
//               setOpenEduModel(false);
//               if (collage != "" && startCollegeYear != "" && cgpa != "") {
//                 addEducation();
//               }
//             }}
//           >
//             <Text style={styles.btnText}>Submit Education</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: scale(10),
//   },
//   headingView: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     // marginVertical: scale(10),
//   },
//   skills: {
//     fontSize: moderateScale(16),
//     fontWeight: "bold",
//   },
//   plus: {
//     fontSize: moderateScale(24),
//     fontWeight: "bold",
//     color: "#000",
//   },
//   skillItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#f2f2f2",
//     padding: scale(10),
//     borderRadius: 5,
//   },
//   skillName: {
//     fontSize: moderateScale(14),
//   },
//   skillName1: {
//     fontSize: moderateScale(14),
//     fontWeight: "bold",
//   },
//   skillName2: {
//     fontSize: moderateScale(12),
//     color: "#666",
//   },
//   skillName3: {
//     fontSize: moderateScale(12),
//     color: "#444",
//   },
//   againCloseIcon: {
//     width: scale(20),
//     height: scale(20),
//   },
//   skillModal: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#00000080",
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: "80%",
//   },
//   title: {
//     fontSize: moderateScale(18),
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   iconClose: {
//     width: scale(20),
//     height: scale(20),
//   },
//   input: {
//     width: "80%",
//     padding: scale(10),
//     marginVertical: scale(5),
//     backgroundColor: "#fff",
//     borderRadius: 5,
//     fontSize: moderateScale(14),
//     color: "#333",
//   },
//   btn: {
//     width: "80%",
//     backgroundColor: "#007BFF",
//     paddingVertical: scale(12),
//     alignItems: "center",
//     borderRadius: 5,
//     marginTop: scale(10),
//   },
//   btnText: {
//     fontSize: moderateScale(16),
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });

// export default Profile;

// const showCandidate = async () => {
//     setLoading(true);
//     try {
//       const jobApplicationID = await AsyncStorage.getItem("jobApplicationID");

//       if (jobApplicationID) {
//         const docRef = doc(db, "Job-Application", jobApplicationID);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setCandidateData(docSnap.data());
//         } else {
//           console.log("No such document!");
//         }
//       } else {
//         console.log("No job application ID found in AsyncStorage.");
//       }
//     } catch (error) {
//       console.error("Error fetching job data: ", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//     const submitForm = async () => {
//   if (!validate()) return;

//   try {
//     setLoading(true);
//     const docRef = await addDoc(collection(db, "Job-Application"), {
//       name,
//       email,
//       contact,
//       createdAt: new Date(),
//     });

//     console.log("Document written with ID: ", docRef.id); // Displaying the ID in CLI
//     console.log("Name: ", name);
//     console.log("Email: ", email);
//     console.log("Contact: ", contact); // Display all form data in CLI

//     setName("");
//     setEmail("");
//     setContact("");
//     setCreateAccount(true);
//   } catch (error) {
//     console.error("Error adding document: ", error);
//   } finally {
//     setLoading(false);
//   }
// };

//   const submitForm = async () => {
//     if (!validate()) return;

//     try {
//       setLoading(true);
//       const userID = await AsyncStorage.getItem("USER_ID");
//       const docRef = await addDoc(collection(db, "Job-Application"), {
//         name,
//         email,
//         contact,
//         userID,
//       });

//       console.log("Document written with ID: ", docRef.id);
//       console.log("Name: ", name);
//       console.log("Email: ", email);
//       console.log("Contact: ", contact);
//       await AsyncStorage.setItem("jobApplicationID", docRef.id);
//       setName("");
//       setEmail("");
//       setContact("");
//       setCreateAccount(true);
//     } catch (error) {
//       console.error("Error adding document: ", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//  const submitForm = async () => {
//     try {
//       setLoading(true);
//       const companyID = await AsyncStorage.getItem("companyId");
//       await addDoc(collection(db, "Job-Application"), {
//         name,
//         email,
//         contact,
//         companyId: companyID,
//       });
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       console.error("Error adding document: ", error);
//     }
//   };

// const submitForm = async () => {
//   try {
//     setLoading(true); // Start loading
//     const id = await AsyncStorage.getItem("User_ID");

//     await addDoc(collection(db, "Job-Application"), {
//       name,
//       email,
//       contact,
//       companyId: id,
//     });

//     setLoading(false); // Stop loading after successful submission
//   } catch (error) {
//     setLoading(false); // Stop loading in case of an error
//     console.error("Error adding document: ", error);
//   }
// };

// const submitForm = async () => {
//   try {
//     const companyID = await AsyncStorage.getItem("companyId");
//     if (!companyID) {
//       console.error("Company ID not found!");
//       return;
//     }

//     await addDoc(collection(db, "Job-Application"), {
//       name,
//       email,
//       contact,
//       companyId: companyID,
//     });
//   } catch (error) {
//     console.error("Error adding document: ", error);
//   }
// };

// const fetchCandidateData = async () => {
//   try {
//     const id = await AsyncStorage.getItem("USER_ID");
//     if (!id) {
//       console.error("Company ID not found!");
//       return;
//     }

//     const q = query(
//       collection(db, "Job-Application"),
//       where("companyId", "==", id)
//     );
//     const querySnapshot = await getDocs(q);

//     let data = [];
//     querySnapshot.forEach((doc) => {
//       data.push(doc.data());
//     });

//     setCandidateData(data);
//   } catch (error) {
//     console.error("Error fetching candidate data: ", error);
//   }
// };

// const showCandidate = async () => { // may be original
//   setLoading(true);
//   try {
//     const docRef = doc(db, "candidates", "candidateId");
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       setCandidateData(docSnap.data());
//     } else {
//       setCandidateData(null);
//     }
//   } catch (error) {
//     console.error("Error fetching candidate data: ", error);
//   } finally {
//     setLoading(false);
//   }
// };

//  This is The codekghcekgjvdhek.fjgbwe;iufb

// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "../../../utils/firebaseConfig";
// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const SearchCandidate = () => {
//   const [candidateData, setCandidateData] = useState(null);

//   useEffect(() => {
//     const fetchCandidateData = async () => {
//       try {
//         const companyID = await AsyncStorage.getItem("companyId");
//         const q = query(
//           collection(db, "Job-Application"),
//           where("companyId", "==", companyID)
//         );
//         const querySnapshot = await getDocs(q);

//         let data = [];
//         querySnapshot.forEach((doc) => {
//           data.push(doc.data());
//         });

//         setCandidateData(data);
//       } catch (error) {
//         console.error("Error fetching candidate data: ", error);
//       }
//     };

//     fetchCandidateData();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {candidateData ? (
//         candidateData.map((data, index) => (
//           <View key={index} style={styles.candidateInfo}>
//             <Text style={styles.title}>Name: {data.name}</Text>
//             <Text style={styles.email}>Email: {data.email}</Text>
//             <Text style={styles.contact}>Contact: {data.contact}</Text>
//           </View>
//         ))
//       ) : (
//         <Text style={styles.noData}>No candidate data found.</Text>
//       )}
//     </View>
//   );
// };

// export default SearchCandidate;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 10 },
//   candidateInfo: {
//     padding: 10,
//     borderRadius: 5,
//     backgroundColor: "#f9f9f9",
//     elevation: 2,
//   },
//   title: { fontSize: 16, fontWeight: "bold" },
//   email: { fontSize: 14 },
//   contact: { fontSize: 14, marginBottom: 5 },
//   noData: { textAlign: "center", marginTop: 20, fontSize: 18 },
// });

// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Alert,
//   TouchableOpacity,
//   Modal,
//   KeyboardAvoidingView,
//   Keyboard,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import {
//   moderateScale,
//   moderateVerticalScale,
//   scale,
// } from "react-native-size-matters";
// import CustomTextInput from "../../common/CustomTextInput";
// import CustomSolidBtn from "../../common/CustomSolidBtn";
// import Loader from "../../common/Loader";
// import {
//   collection,
//   addDoc,
//   query,
//   where,
//   getDocs,
//   doc,
//   deleteDoc,
// } from "firebase/firestore";
// import { db } from "../../utils/firebaseConfig";
// import { verticalScale } from "react-native-size-matters";
// import { BG_COLOR, TEXT_COLOR } from "../../utils/Colors";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   FlatList,
//   ScrollView,
//   TextInput,
//   TouchableWithoutFeedback,
// } from "react-native-gesture-handler";
// import { useNavigation } from "@react-navigation/native";

// const JobApplication = () => {
//   const [name, setName] = useState("");
//   const [badName, setBadName] = useState("");

//   const [email, setEmail] = useState("");
//   const [badEmail, setBadEmail] = useState("");

//   const [contact, setContact] = useState("");
//   const [badContact, setBadContact] = useState("");
//   const [companyId, setCompanyId] = useState("");

//   const [createAccount, setCreateAccount] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigation = useNavigation();

//   const validate = () => {
//     let validName = name.length >= 3;
//     let validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//     let validContact = contact.length >= 11 && /^\d+$/.test(contact);

//     setBadName(validName ? "" : "Please enter a valid name.");
//     setBadEmail(validEmail ? "" : "Please enter a valid email.");
//     setBadContact(validContact ? "" : "Please enter a valid contact number.");

//     return validName && validEmail && validContact;
//   };

//   const submitForm = async () => {
//     try {
//       const companyID = await AsyncStorage.getItem('companyId');
//       await addDoc(collection(db, "Job-Application"), {
//         name,
//         email,
//         contact,
//         companyId: companyID,
//       });
//     } catch (error) {
//       console.error("Error adding document: ", error);
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {!createAccount ? (
//         <View>
//           <Text style={styles.title1}>Apply Now</Text>
//           <CustomTextInput
//             value={name}
//             onChangeText={setName}
//             title="Name"
//             bad={badName !== ""}
//             placeholder="Enter your name"
//           />
//           {badName && <Text style={styles.errorMsg}>{badName}</Text>}

//           <CustomTextInput
//             value={email}
//             onChangeText={setEmail}
//             title="Email"
//             bad={badEmail !== ""}
//             placeholder="Enter your email"
//           />
//           {badEmail && <Text style={styles.errorMsg}>{badEmail}</Text>}

//           <CustomTextInput
//             value={contact}
//             onChangeText={setContact}
//             title="Contact"
//             bad={badContact !== ""}
//             placeholder="Enter your contact number"
//           />
//           {badContact && <Text style={styles.errorMsg}>{badContact}</Text>}

//           <CustomSolidBtn
//             title="Submit"
//             onClick={() => {
//               if (validate()) {
//                 submitForm();
//               }
//             }}
//           />
//           <Loader visible={loading} />
//         </View>
//       ) : (
//         <View style={styles.successView}>
//           <Image
//             style={styles.logo}
//             source={{
//               uri: "https://cdn-icons-png.flaticon.com/128/190/190411.png",
//             }}
//           />
//           <Text style={styles.successText}>You Applied Successfully</Text>
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// export default JobApplication;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     marginBottom: 20,
//   },
//   title1: {
//     fontSize: moderateScale(30),
//     textAlign: "center",
//     marginVertical: 20,
//   },
//   applyBtn: {
//     width: "70%",
//     height: verticalScale(40),
//     backgroundColor: TEXT_COLOR,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: moderateScale(10),
//   },
//   errorMsg: {
//     color: "red",
//     marginLeft: 20,
//   },
//   successView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   successText: {
//     fontSize: 20,
//     marginTop: 10,
//   },
//   logo: {
//     width: 100,
//     height: 100,
//   },
//   btnText: {
//     color: BG_COLOR,
//     fontSize: moderateScale(15),
//   },
//   skills: {
//     fontSize: moderateScale(19),
//     fontWeight: "500",
//     marginTop: moderateScale(10),
//   },
//   plus: {
//     fontSize: moderateScale(26),
//     fontWeight: "600",
//     marginTop: moderateScale(30),
//     marginLeft: moderateScale(20),
//   },
//   education: {
//     fontSize: moderateScale(20),
//     fontWeight: "600",
//     marginTop: moderateScale(30),
//     marginLeft: moderateScale(20),
//   },
//   headingView: {
//     width: "90%",
//     justifyContent: "space-between",
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: moderateScale(20),
//     alignSelf: "center",
//     borderBottomWidth: 1,
//   },
//   skillModal: {
//     width: "100%",
//     paddingBottom: moderateScale(20),
//     backgroundColor: "#e4e4dc",
//     position: "absolute",
//     bottom: 0,
//     borderTopLeftRadius: moderateScale(30),
//     borderTopRightRadius: moderateScale(30),
//   },

//   iconClose: {
//     height: scale(25),
//     width: scale(25),
//   },
//   modalHeader: {
//     width: "90%",
//     marginTop: moderateScale(20),
//     flexDirection: "row",
//     alignSelf: "center",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: moderateScale(18),
//     fontWeight: "600",
//   },
//   titleSelf: {
//     fontSize: moderateScale(15),
//     fontWeight: "600",
//   },
//   input: {
//     width: "90%",
//     height: scale(40),
//     borderWidth: 1,
//     borderRadius: moderateScale(10),
//     alignSelf: "center",
//     marginTop: moderateScale(20),
//     paddingLeft: moderateScale(15),
//   },
//   btn: {
//     width: "90%",
//     height: scale(45),
//     backgroundColor: TEXT_COLOR,
//     alignSelf: "center",
//     borderRadius: moderateScale(10),
//     marginTop: moderateScale(20),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   btnText: {
//     color: "white",
//     fontSize: moderateScale(16),
//   },
//   skillItem: {
//     width: "90%",
//     alignSelf: "center",
//     flexDirection: "row",
//     alignItems: "center",
//     paddingLeft: moderateScale(20),
//     justifyContent: "space-between",
//     marginTop: moderateScale(10),
//   },
//   skillName: {
//     fontSize: moderateScale(15),
//   },
//   againCloseIcon: {
//     height: scale(20),
//     width: scale(20),
//   },
//   skillName1: {
//     fontWeight: "500",
//   },
//   skillName3: {
//     fontWeight: "500",
//   },
//   same: {
//     fontSize: moderateScale(15),
//   },
// });

<TouchableOpacity
  disabled={isLogin ? false : true}
  style={[styles.applyBtn, { backgroundColor: isLogin ? "black" : "#9e9e9e" }]}
  onPress={() => {
    navigation.navigate("JobApplication");

    // if (!isJobApplied) {
    //   navigation.navigate("JobApplication");
    //   applyJob();
    // } else {
    //   cancelApply();
    // }
  }}
>
  <Text style={styles.btnText}>{isJobApplied ? "Applied" : "Apply Now"}</Text>
  {/* <Text style={styles.btnText}>Apply Now</Text> */}
</TouchableOpacity>;



const applyJob = async () => {
    try {
      const userId = await AsyncStorage.getItem("USER_ID");
      const userName = await AsyncStorage.getItem("NAME");
      const userEmail = await AsyncStorage.getItem("EMAIL");
      if (userId && userName && userEmail) {
        const docRef = await addDoc(collection(db, "applied_jobs"), {
          ...route.params.data,
          userId: userId,
          applicantName: userName,
          applicantEmail: userEmail,
        });
        console.log("Job applied successfully with ID: ", docRef.id);
        getAppliedJobs();
      } else {
        console.error("User data not found in AsyncStorage.");
      }
    } catch (error) {
      console.error("Error applying for job: ", error);
    }
  };



  const submitForm = async () => {// original
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
        companyId: companyID,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error adding document: ", error);
      setLoading(false);
    }
  };


  // import {
  //   StyleSheet,
  //   Text,
  //   TouchableOpacity,
  //   View,
  //   Image,
  //   Modal,
  //   Alert,
  // } from "react-native";
  // import React, { useEffect, useState } from "react";
  // import NoLoginComponent from "../../../common/NoLoginComponent";
  // import { useIsFocused, useNavigation } from "@react-navigation/native";
  // import AsyncStorage from "@react-native-async-storage/async-storage";
  // import { moderateScale, scale, verticalScale } from "react-native-size-matters";
  // import { db } from "../../../utils/firebaseConfig";
  // import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
  // import { TEXT_COLOR } from "../../../utils/Colors";
  // import {
  //   collection,
  //   addDoc,
  //   query,
  //   where,
  //   getDocs,
  //   doc,
  //   getDoc,
  //   deleteDoc,
  // } from "firebase/firestore";
  
  // const Profile = () => {
  //   const isFocused = useIsFocused();
  //   const [userData, setUserData] = useState(null);
  //   const [isLogin, setIsLogin] = useState(false);
  //   const [profileImg, setProfileImg] = useState("");
  
  //   const [openSkillModel, setSkillModel] = useState(false);
  //   const [openExpModel, setOpenExpModel] = useState(false);
  //   const [skill, setSkill] = useState("");
  //   const [skillsList, setSkillsList] = useState([]);
  //   const [company, setCompany] = useState("");
  //   const [startYear, setStartYear] = useState("");
  //   const [endYear, setEndYear] = useState("");
  //   const [profile, setProfile] = useState("");
  //   const [expList, setExpList] = useState("");
  //   const [educationList, setEducationList] = useState([]);
  //   const [startCollegeYear, setStartCollegeYear] = useState("");
  //   const [cgpa, setCGPA] = useState("");
  //   const [collage, setCollege] = useState("");
  //   const [course, setCourse] = useState("");
  //   const [openEduModel, setOpenEduModel] = useState(false);
  //   const navigation = useNavigation();
  //   useEffect(() => {
  //     getData();
  //     getProfileData();
  //     getUserProfileData();
  //   }, [isFocused]);
  
  //   useEffect(() => {
  //     getSkills();
  //     getExperienceList();
  //     getEducationList();
  //   }, []);
  
  //   const getData = async () => {
  //     const id = await AsyncStorage.getItem("USER_ID");
  //     const type = await AsyncStorage.getItem("USER_TYPE");
  //     if (id != null && type != null) {
  //       if (type == "user") {
  //         setIsLogin(true);
  //       }
  //     }
  //   };
  
  //   // const getProfileDta = async () => {  // YT-CODE
  //   //   const id = await AsyncStorage.getItem("USER_ID");
  //   //   Firestore()
  //   //     .collection("User-Registration")
  //   //     .doc(id)
  //   //     .get()
  //   //     .then((data) => {
  //   //       console.log(data.data());
  //   //       setUserData(data.data());
  //   //     });
  //   // };
  //   // const getProfileData = async () => {
  //   //   try {
  //   //     const id = await AsyncStorage.getItem("USER_ID");
  
  //   //     if (!id) {
  //   //       console.error("User ID not found in AsyncStorage.");
  //   //       return;
  //   //     }
  
  //   //     console.log("Fetching user with ID: ", id);
  
  //   //     const docRef = doc(db, "User-Registration", id);
  //   //     const docSnap = await getDoc(docRef);
  
  //   //     if (docSnap.exists()) {
  //   //       console.log("User Data: ", docSnap.data());
  //   //     } else {
  //   //       console.error(
  //   //         "No such document! Please check the user ID in Firestore."
  //   //       );
  //   //     }
  //   //   } catch (e) {
  //   //     console.error("Error fetching user data: ", e);
  //   //   }
  //   // };
  
  //   const getProfileData = async () => {
  //     try {
  //       const id = await AsyncStorage.getItem("USER_ID");
  //       if (id) {
  //         const docRef = doc(db, "User-Registration", id);
  
  //         const docSnap = await getDoc(docRef);
  
  //         if (docSnap.exists()) {
  //           console.log("Document data:", docSnap.data());
  //           setUserData(docSnap.data());
  //         } else {
  //           console.log("No such document!");
  //         }
  //       } else {
  //         console.error("User ID not found in AsyncStorage.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching document:", error);
  //     }
  //   };
  
  //   const getUserProfileData = async () => {
  //     try {
  //       const userId = await AsyncStorage.getItem("USER_ID");
  //       const userDocRef = doc(db, "User-Registration", userId);
  //       const userDoc = await getDoc(userDocRef);
  
  //       if (userDoc.exists()) {
  //         const userData = userDoc.data();
  
  //         setProfileImg(userData.profileImage || "");
  //       } else {
  //         console.log("User document not found.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data: ", error);
  //     }
  //   };
  
  //   // const addSkill = async () => {  // YT-CODE
  //   //   const id = await AsyncStorage.getItem("USER_ID");
  //   //   Firestore()
  //   //     .collection("skills")
  //   //     .add({
  //   //       skill: skill,
  //   //       userId: id,
  //   //     })
  //   //     .then(() => {
  //   //       Alert.alert("Skill added Successfully");
  //   //       getSkills();
  //   //     });
  //   // };
  
  //   // useEffect(() => {
  //   //   getSkills();
  //   // }, []);
  
  //   // const getSkills = async () => {
  //   //   const id = await AsyncStorage.getItem("USER_ID");
  //   //   Firestore()
  //   //     .collection("skills")
  //   //     .where("userId", "==", id)
  //   //     .get()
  //   //     .then((snapshot) => {
  //   //       let temp = [];
  //   //       console.log(snapshot.docs);
  //   //       temp.push({ ...item.data(), skillId: item.id });
  //   //     });
  //   //   setSkillsList(temp);
  //   //   console.log(snapshot.doc);
  //   // };
  
  //   const addSkill = async () => {
  //     try {
  //       const id = await AsyncStorage.getItem("USER_ID");
  //       if (!id) {
  //         Alert.alert("Error", "User ID not found");
  //         return;
  //       }
  //       await addDoc(collection(db, "skills"), {
  //         skill: skill,
  //         userId: id,
  //       });
  //       Alert.alert("Skill added Successfully");
  //       getSkills();
  //       setSkill("");
  //     } catch (error) {
  //       console.error("Error adding skill: ", error);
  //       Alert.alert("Error", "Failed to add skill");
  //     }
  //   };
  
  //   const getSkills = async () => {
  //     try {
  //       const id = await AsyncStorage.getItem("USER_ID");
  //       if (!id) {
  //         console.error("Error: User ID not found");
  //         return;
  //       }
  
  //       const skillsCollection = collection(db, "skills");
  
  //       const q = query(skillsCollection, where("userId", "==", id));
  
  //       const querySnapshot = await getDocs(q);
  
  //       const temp = [];
  //       querySnapshot.forEach((doc) => {
  //         temp.push({ ...doc.data(), skillId: doc.id });
  //       });
  
  //       setSkillsList(temp);
  //       console.log("Fetched Skills: ", temp);
  //     } catch (error) {
  //       console.error("Error fetching documents: ", error);
  //     }
  //   };
  
  //   // const deleteSkill = (id) => {  // YT-CODE
  //   //   Firestore().collection("skills").doc(id).delete();
  //   //   getSkills();
  //   // };
  
  //   const deleteSkill = async (id) => {
  //     try {
  //       const docRef = doc(db, "skills", id);
  //       await deleteDoc(docRef);
  //       console.log("Document successfully deleted!");
  //       getSkills();
  //     } catch (error) {
  //       console.error("Error deleting document: ", error);
  //     }
  //   };
  
  //   // const addExperience = async () => {     //   // YT-CODE
  //   //   const id = await AsyncStorage.getItem("USER_ID");
  //   //   Firestore()
  //   //     .collection("experience")
  //   //     .add({
  //   //       skill: skill,
  //   //       userId: id,
  //   //       startYear: startYear,
  //   //       endYear: endYear,
  //   //       profile: profile,
  //   //       company: company,
  //   //     })
  //   //     .then(() => {
  //   //       Alert.alert("Experience added Successfully");
  //   //       setCompany("");
  //   //       setEndYear("");
  //   //       setStartYear();
  //   //       setProfile();
  //   //     });
  //   // };
  
  //   const addExperience = async () => {
  //     try {
  //       const id = await AsyncStorage.getItem("USER_ID");
  //       if (!id) {
  //         Alert.alert("Error", "User ID not found");
  //         return;
  //       }
  //       await addDoc(collection(db, "experience"), {
  //         company: company,
  //         startYear: startYear,
  //         endYear: endYear,
  //         profile: profile,
  //         userId: id,
  //       });
  //       Alert.alert("Experience added Successfully");
  //       setCompany("");
  //       setEndYear("");
  //       setStartYear();
  //       setProfile();
  //       getExperienceList();
  //     } catch (error) {
  //       console.error("Error adding Experience: ", error);
  //       Alert.alert("Error", "Failed to add Experience");
  //     }
  //   };
  
  //   const getExperienceList = async () => {
  //     try {
  //       const id = await AsyncStorage.getItem("USER_ID");
  //       if (!id) {
  //         console.error("Error: User ID not found");
  //         return;
  //       }
  
  //       const skillsCollection = collection(db, "experience");
  
  //       const q = query(skillsCollection, where("userId", "==", id));
  
  //       const querySnapshot = await getDocs(q);
  
  //       const temp = [];
  //       querySnapshot.forEach((doc) => {
  //         temp.push({ ...doc.data(), expId: doc.id });
  //       });
  
  //       setExpList(temp);
  //       console.log("Fetched Skills: ", temp);
  //     } catch (error) {
  //       console.error("Error fetching documents: ", error);
  //     }
  //   };
  
  //   const deleteExp = async (id) => {
  //     try {
  //       const docRef = doc(db, "experience", id);
  //       await deleteDoc(docRef);
  //       console.log("Document successfully deleted!");
  //       getExperienceList();
  //     } catch (error) {
  //       console.error("Error deleting document: ", error);
  //     }
  //   };
  
  //   const addEducation = async () => {
  //     try {
  //       const id = await AsyncStorage.getItem("USER_ID");
  //       if (!id) {
  //         Alert.alert("Error", "User ID not found");
  //         return;
  //       }
  //       await addDoc(collection(db, "education"), {
  //         collage: collage,
  //         startCollegeYear: startCollegeYear,
  //         cgpa: cgpa,
  //         course: course,
  //         userId: id,
  //       });
  //       Alert.alert("Education added Successfully");
  //       setCollege("");
  //       setCGPA("");
  //       setStartCollegeYear();
  //       setCourse();
  //       getEducationList();
  //     } catch (error) {
  //       console.error("Error adding Experience: ", error);
  //       Alert.alert("Error", "Failed to add Experience");
  //     }
  //   };
  
  //   const getEducationList = async () => {
  //     try {
  //       const id = await AsyncStorage.getItem("USER_ID");
  //       if (!id) {
  //         console.error("Error: User ID not found");
  //         return;
  //       }
  
  //       const skillsCollection = collection(db, "education");
  
  //       const q = query(skillsCollection, where("userId", "==", id));
  
  //       const querySnapshot = await getDocs(q);
  
  //       const temp = [];
  //       querySnapshot.forEach((doc) => {
  //         temp.push({ ...doc.data(), eduId: doc.id });
  //       });
  
  //       setEducationList(temp);
  //       console.log("Fetched Skills: ", temp);
  //     } catch (error) {
  //       console.error("Error fetching documents: ", error);
  //     }
  //   };
  
  //   const deleteEducation = async (id) => {
  //     try {
  //       const docRef = doc(db, "education", id);
  //       await deleteDoc(docRef);
  //       console.log("Document successfully deleted!");
  //       getEducationList();
  //     } catch (error) {
  //       console.error("Error deleting document: ", error);
  //     }
  //   };
  
  //   return (
  //     <View style={styles.container}>
  //       {!isLogin && (
  //         <NoLoginComponent
  //           heading={"Quickly and easily update your profile/portfolio"}
  //           desc={
  //             "Maintain & enhance your portfolio to stand out and attract top jobs"
  //           }
  //         />
  //       )}
  //       {isLogin && (
  //         <View style={styles.LoginView}>
  //           <TouchableOpacity>
  //             {profileImg ? (
  //               <Image source={{ uri: profileImg }} style={styles.profile} />
  //             ) : (
  //               <Image
  //                 source={require("../../../images/user.png")}
  //                 style={styles.profile}
  //               />
  //             )}
  //           </TouchableOpacity>
  //           <Text style={styles.userName}>
  //             {userData ? userData.name : "No Found"}
  //           </Text>
  //           <Text style={styles.userEmail}>
  //             {userData ? userData.email : "No Found"}
  //           </Text>
  
  //           <View style={styles.BtnView}>
  //             <TouchableOpacity
  //               style={styles.Btn1}
  //               onPress={() => navigation.navigate("UpdateProfileForUser")}
  //             >
  //               <Text style={styles.changeText}>Update Profile</Text>
  //             </TouchableOpacity>
  
  //             <TouchableOpacity
  //               style={styles.Btn2}
  //               onPress={() => navigation.navigate("ChangeImageForUser")}
  //             >
  //               <Text style={styles.changeText}>Change Image</Text>
  //             </TouchableOpacity>
  //           </View>
  
  //           {/* Start Here */}
  //           <View style={styles.headingView}>
  //             <Text style={styles.skills}>{"Skills"}</Text>
  //             <Text
  //               style={styles.plus}
  //               onPress={() => {
  //                 setSkillModel(true);
  //               }}
  //             >
  //               {"+"}
  //             </Text>
  //           </View>
  
  //           <View>
  //             <FlatList
  //               data={skillsList}
  //               renderItem={({ item, index }) => {
  //                 return (
  //                   <View style={styles.skillItem}>
  //                     <Text style={styles.skillName}>{item.skill}</Text>
  //                     <TouchableOpacity
  //                       onPress={() => {
  //                         deleteSkill(item.skillId);
  //                       }}
  //                     >
  //                       <Image
  //                         source={require("../../../images/close.png")}
  //                         style={styles.againCloseIcon}
  //                       />
  //                     </TouchableOpacity>
  //                   </View>
  //                 );
  //               }}
  //             />
  //           </View>
  
  //           <View style={styles.headingView}>
  //             <Text style={styles.skills}>{"Experience"}</Text>
  //             <Text
  //               style={styles.plus}
  //               onPress={() => {
  //                 setOpenExpModel(true);
  //               }}
  //             >
  //               {"+"}
  //             </Text>
  //           </View>
  
  //           <View>
  //             <FlatList
  //               data={expList}
  //               renderItem={({ item, index }) => {
  //                 return (
  //                   <View style={styles.skillItem}>
  //                     <View>
  //                       <Text style={styles.skillName1}>{item.company}</Text>
  //                       <Text style={styles.skillName2}>
  //                         {item.startYear + "-" + item.endYear}
  //                       </Text>
  //                       <Text style={styles.skillName3}>{item.profile}</Text>
  //                     </View>
  //                     <TouchableOpacity
  //                       onPress={() => {
  //                         deleteExp(item.expId);
  //                       }}
  //                     >
  //                       <Image
  //                         source={require("../../../images/close.png")}
  //                         style={styles.againCloseIcon}
  //                       />
  //                     </TouchableOpacity>
  //                   </View>
  //                 );
  //               }}
  //             />
  //           </View>
  
  //           <View style={styles.headingView}>
  //             <Text style={styles.skills}>{"Education"}</Text>
  //             <Text
  //               style={styles.plus}
  //               onPress={() => {
  //                 setOpenEduModel(true);
  //               }}
  //             >
  //               {"+"}
  //             </Text>
  //           </View>
  
  //           <View>
  //             <FlatList
  //               data={educationList}
  //               renderItem={({ item, index }) => {
  //                 return (
  //                   <View style={styles.skillItem}>
  //                     <View>
  //                       <Text style={styles.skillName1}>
  //                         {item.collage + " University"}
  //                       </Text>
  //                       <Text style={styles.skillName}>
  //                         {item.startCollegeYear}
  //                       </Text>
  //                       <Text style={styles.skillName3}>{item.course}</Text>
  //                       <Text style={styles.skillName3}>{item.cgpa}</Text>
  //                     </View>
  //                     <TouchableOpacity
  //                       onPress={() => {
  //                         deleteEducation(item.eduId);
  //                       }}
  //                     >
  //                       <Image
  //                         source={require("../../../images/close.png")}
  //                         style={styles.againCloseIcon}
  //                       />
  //                     </TouchableOpacity>
  //                   </View>
  //                 );
  //               }}
  //             />
  //           </View>
  //         </View>
  //       )}
  
  //       <Modal visible={openSkillModel} transparent>
  //         <View style={styles.skillModal}>
  //           <View style={styles.modalHeader}>
  //             <Text style={styles.title}>Add Skills</Text>
  //             <TouchableOpacity
  //               onPress={() => {
  //                 setSkillModel(false);
  //               }}
  //             >
  //               <Image
  //                 source={require("../../../images/close.png")}
  //                 style={styles.iconClose}
  //               />
  //             </TouchableOpacity>
  //           </View>
  //           <TextInput
  //             placeholderTextColor={"#9e9e9e"}
  //             placeholder="Enter Your Skills"
  //             style={styles.input}
  //             value={skill}
  //             onChangeText={(txt) => setSkill(txt)}
  //           />
  //           <TouchableOpacity
  //             style={styles.btn}
  //             onPress={() => {
  //               setSkillModel(false);
  //               if (skill != "") {
  //                 addSkill();
  //               }
  //             }}
  //           >
  //             <Text style={styles.btnText}>Submit Skill</Text>
  //           </TouchableOpacity>
  //         </View>
  //       </Modal>
  
  //       <Modal visible={openExpModel} transparent>
  //         <View style={styles.skillModal}>
  //           <View style={styles.modalHeader}>
  //             <Text style={styles.title}>Add Experience</Text>
  //             <TouchableOpacity
  //               onPress={() => {
  //                 setOpenExpModel(false);
  //               }}
  //             >
  //               <Image
  //                 source={require("../../../images/close.png")}
  //                 style={styles.iconClose}
  //               />
  //             </TouchableOpacity>
  //           </View>
  //           <TextInput
  //             placeholderTextColor={"#9e9e9e"}
  //             placeholder="Enter Company Name"
  //             style={styles.input}
  //             value={company}
  //             onChangeText={(txt) => setCompany(txt)}
  //           />
  
  //           <TextInput
  //             placeholderTextColor={"#9e9e9e"}
  //             placeholder="Enter Start Year"
  //             maxLength={4}
  //             keyboardType="numeric"
  //             style={styles.input}
  //             value={startYear}
  //             onChangeText={(txt) => setStartYear(txt)}
  //           />
  
  //           <TextInput
  //             placeholderTextColor={"#9e9e9e"}
  //             placeholder="Enter End Year"
  //             maxLength={4}
  //             keyboardType="numeric"
  //             style={styles.input}
  //             value={endYear}
  //             onChangeText={(txt) => setEndYear(txt)}
  //           />
  
  //           <TextInput
  //             placeholderTextColor={"#9e9e9e"}
  //             placeholder="Profile"
  //             style={styles.input}
  //             value={profile}
  //             onChangeText={(txt) => setProfile(txt)}
  //           />
  //           <TouchableOpacity
  //             style={styles.btn}
  //             onPress={() => {
  //               setOpenExpModel(false);
  //               if (company != "" && startYear != "" && endYear != "") {
  //                 addExperience();
  //               }
  //             }}
  //           >
  //             <Text style={styles.btnText}>Submit Experience</Text>
  //           </TouchableOpacity>
  //         </View>
  //       </Modal>
  
  //       <Modal visible={openEduModel} transparent>
  //         <View style={styles.skillModal}>
  //           <View style={styles.modalHeader}>
  //             <Text style={styles.title}>Add Education</Text>
  //             <TouchableOpacity
  //               onPress={() => {
  //                 setOpenEduModel(false);
  //               }}
  //             >
  //               <Image
  //                 source={require("../../../images/close.png")}
  //                 style={styles.iconClose}
  //               />
  //             </TouchableOpacity>
  //           </View>
  
  //           <TextInput
  //             placeholderTextColor={"#9e9e9e"}
  //             placeholder="University Name"
  //             style={styles.input}
  //             value={collage}
  //             onChangeText={(txt) => setCollege(txt)}
  //           />
  
  //           <TextInput
  //             placeholderTextColor={"#9e9e9e"}
  //             placeholder="Year 2001-20015"
  //             maxLength={9}
  //             keyboardType="numeric"
  //             style={styles.input}
  //             value={startCollegeYear}
  //             onChangeText={(txt) => setStartCollegeYear(txt)}
  //           />
  
  //           <TextInput
  //             placeholderTextColor={"#9e9e9e"}
  //             placeholder="Enter Course"
  //             style={styles.input}
  //             value={course}
  //             onChangeText={(txt) => setCourse(txt)}
  //           />
  
  //           <TextInput
  //             placeholderTextColor={"#9e9e9e"}
  //             placeholder="CGPA "
  //             maxLength={4}
  //             keyboardType="numeric"
  //             style={styles.input}
  //             value={cgpa}
  //             onChangeText={(txt) => setCGPA(txt)}
  //           />
  
  //           <TouchableOpacity
  //             style={styles.btn}
  //             onPress={() => {
  //               setOpenEduModel(false);
  //               if (collage != "" && startCollegeYear != "" && cgpa != "") {
  //                 addEducation();
  //               }
  //             }}
  //           >
  //             <Text style={styles.btnText}>Submit Education</Text>
  //           </TouchableOpacity>
  //         </View>
  //       </Modal>
  //     </View>
  //   );
  // };
  
  // export default Profile;
  
  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     // backgroundColor: "#faf0e6",
  //     marginBottom: moderateScale(-200),
  //   },
  //   LoginView: {
  //     flex: 1,
  //   },
  //   profile: {
  //     height: scale(80),
  //     width: scale(80),
  //     borderRadius: moderateScale(50),
  //     alignSelf: "center",
  //     marginTop: moderateScale(10),
  //   },
  //   userName: {
  //     fontSize: moderateScale(22),
  //     fontWeight: "600",
  //     alignSelf: "center",
  //     marginLeft: moderateScale(1),
  //     marginTop: moderateScale(5),
  //   },
  //   userEmail: {
  //     fontSize: moderateScale(15),
  //     fontWeight: "600",
  //     alignSelf: "center",
  //     marginLeft: moderateScale(1),
  //     marginTop: moderateScale(5),
  //   },
  //   BtnView: {
  //     width: "100%",
  //     flexDirection: "row",
  //     justifyContent: "space-evenly",
  //     alignItems: "center",
  //     marginTop: moderateScale(18),
  //   },
  //   Btn1: {
  //     width: "35%",
  //     height: verticalScale(40),
  //     borderWidth: 1,
  //     borderRadius: moderateScale(10),
  //     justifyContent: "center",
  //     alignItems: "center",
  //     backgroundColor: "black",
  //   },
  //   Btn2: {
  //     width: "35%",
  //     height: verticalScale(40),
  //     borderWidth: 1,
  //     borderRadius: moderateScale(10),
  //     justifyContent: "center",
  //     alignItems: "center",
  //     backgroundColor: "black",
  //   },
  //   changeText: {
  //     fontSize: moderateScale(13),
  //     color: "white",
  //   },
  //   // start here
  //   skills: {
  //     fontSize: moderateScale(19),
  //     fontWeight: "500",
  //     marginTop: moderateScale(10),
  //   },
  //   plus: {
  //     fontSize: moderateScale(26),
  //     fontWeight: "600",
  //     marginTop: moderateScale(30),
  //     marginLeft: moderateScale(20),
  //   },
  //   education: {
  //     fontSize: moderateScale(20),
  //     fontWeight: "600",
  //     marginTop: moderateScale(30),
  //     marginLeft: moderateScale(20),
  //   },
  //   headingView: {
  //     width: "90%",
  //     justifyContent: "space-between",
  //     flexDirection: "row",
  //     alignItems: "center",
  //     marginTop: moderateScale(20),
  //     alignSelf: "center",
  //   },
  //   skillModal: {
  //     width: "100%",
  //     paddingBottom: moderateScale(20),
  //     backgroundColor: "#e4e4dc",
  //     position: "absolute",
  //     bottom: 0,
  //     borderTopLeftRadius: moderateScale(30),
  //     borderTopRightRadius: moderateScale(30),
  //   },
  
  //   iconClose: {
  //     height: scale(25),
  //     width: scale(25),
  //   },
  //   modalHeader: {
  //     width: "90%",
  //     marginTop: moderateScale(20),
  //     flexDirection: "row",
  //     alignSelf: "center",
  //     justifyContent: "space-between",
  //     alignItems: "center",
  //   },
  //   title: {
  //     fontSize: moderateScale(18),
  //     fontWeight: "600",
  //   },
  //   titleSelf: {
  //     fontSize: moderateScale(15),
  //     fontWeight: "600",
  //   },
  //   input: {
  //     width: "90%",
  //     height: scale(40),
  //     borderWidth: 1,
  //     borderRadius: moderateScale(10),
  //     alignSelf: "center",
  //     marginTop: moderateScale(20),
  //     paddingLeft: moderateScale(15),
  //   },
  //   btn: {
  //     width: "90%",
  //     height: scale(45),
  //     backgroundColor: TEXT_COLOR,
  //     alignSelf: "center",
  //     borderRadius: moderateScale(10),
  //     marginTop: moderateScale(20),
  //     justifyContent: "center",
  //     alignItems: "center",
  //   },
  //   btnText: {
  //     color: "white",
  //     fontSize: moderateScale(16),
  //   },
  //   skillItem: {
  //     width: "90%",
  //     alignSelf: "center",
  //     flexDirection: "row",
  //     alignItems: "center",
  //     paddingLeft: moderateScale(20),
  //     justifyContent: "space-between",
  //     marginTop: moderateScale(10),
  //   },
  //   skillName: {
  //     fontSize: moderateScale(15),
  //   },
  //   againCloseIcon: {
  //     height: scale(20),
  //     width: scale(20),
  //   },
  //   skillName1: {
  //     fontWeight: "500",
  //   },
  //   skillName3: {
  //     fontWeight: "500",
  //   },
  // });
  



  <View style={styles.container}>
  {!isLogin && (
    <NoLoginComponent
      heading={"Get in touch with recruiters from top MNCs"}
      desc={
        "Discuss job recommendations with recruiters from leading MNCs."
      }
    />
  )}
  {isLogin && (
    
  )}
</View>



import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import NoLoginComponent from "../../../common/NoLoginComponent";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Inbox = () => {
  const isFocused = useIsFocused();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    getData();
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
  return (
    <View style={styles.container}>
      {!isLogin && (
        <NoLoginComponent
          heading={"Get in touch with recruiters from top MNCs"}
          desc={
            "Discuss job recommendations with recruiters from leading MNCs."
          }
        />
      )}
    </View>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});




