import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

const TestScreen = () => {
    const addData = async () => {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                name: "John Doe",
                age: 30,
                email: "john.doe@example.com",
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };
    
    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} =>`, doc.data());
            });
        } catch (e) {
            console.error("Error fetching documents: ", e);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>TestScreen</Text>

            <Button title="Add Data" onPress={addData} />
            <Button title="Fetch Data" onPress={fetchData} />
        </View>
    );
};

export default TestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});





//  <TouchableOpacity style={styles.BackBtn}>
//         <Image
//           source={require("../../images/left-arrow.png")}
//           style={styles.back}
//         />
//       </TouchableOpacity>

//       {imageData && imageData.assets && imageData.assets.length > 0 ? (
//         <Image
//           source={{ uri: imageData.assets[0].uri }}
//           style={styles.profile}
//         />
//       ) : (
//         <Image
//           source={require("../../images/profile.png")}
//           style={styles.profile}
//         />
//       )}

//       <CustomSolidBtn
//         title={"Take Pitcher"}
//         onClick={() => {
//           openCamera();
//         }}
//       />
//       <CustomSolidBtn
//         title={"Choose From Gallery"}
//         onClick={() => {
//           openGallery();
//         }}
//       />
//       {imageData != null && (
//         <CustomSolidBtn title={"Upload Pitcher"} onClick={() => {}} />
//       )} }

// import {
//     StyleSheet,
//     Text,
//     View,
//     Image,
//     Alert,
//     TouchableOpacity,
//     Modal,
//     KeyboardAvoidingView,
//     Keyboard,
//   } from "react-native";
//   import React, { useEffect, useState } from "react";
//   import { SafeAreaView } from "react-native-safe-area-context";
//   import {
//     moderateScale,
//     moderateVerticalScale,
//     scale,
//   } from "react-native-size-matters";
//   import CustomTextInput from "../../common/CustomTextInput";
//   import CustomSolidBtn from "../../common/CustomSolidBtn";
//   import Loader from "../../common/Loader";
//   import {
//     collection,
//     addDoc,
//     query,
//     where,
//     getDocs,
//     doc,
//     deleteDoc,
//   } from "firebase/firestore";
//   import { db } from "../../utils/firebaseConfig";
//   import { verticalScale } from "react-native-size-matters";
//   import { BG_COLOR, TEXT_COLOR } from "../../utils/Colors";
//   import AsyncStorage from "@react-native-async-storage/async-storage";
//   import {
//     FlatList,
//     ScrollView,
//     TextInput,
//     TouchableWithoutFeedback,
//   } from "react-native-gesture-handler";
  
//   const JobApplication = () => {
//     const [name, setName] = useState("");
//     const [badName, setBadName] = useState("");
  
//     const [email, setEmail] = useState("");
//     const [badEmail, setBadEmail] = useState("");
  
//     const [contact, setContact] = useState("");
//     const [badContact, setBadContact] = useState("");
  
//     const [createAccount, setCreateAccount] = useState(false);
//     const [loading, setLoading] = useState(false);  const validate = () => {
//       let validName = name.length >= 3;
//       let validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//       let validContact = contact.length >= 11 && /^\d+$/.test(contact);
  
//       setBadName(validName ? "" : "Please enter a valid name.");
//       setBadEmail(validEmail ? "" : "Please enter a valid email.");
//       setBadContact(validContact ? "" : "Please enter a valid contact number.");
  
//       return validName && validEmail && validContact;
//     };
  
//     useEffect(() => {
//       getSkills();
//       getExperienceList();
//       getEducationList();
//     }, []);
  
//     const submitForm = async () => {
//       if (!validate()) return;
  
//       try {
//         setLoading(true);
//         const docRef = await addDoc(collection(db, "Job-Application"), {
//           name,
//           email,
//           contact,
//         });
  
//         console.log("Document written with ID: ", docRef.id); // Displaying the ID in CLI
//         console.log("Name: ", name);
//         console.log("Email: ", email);
//         console.log("Contact: ", contact); // Display all form data in CLI
  
//         setName("");
//         setEmail("");
//         setContact("");
//         setCreateAccount(true);
//       } catch (error) {
//         console.error("Error adding document: ", error);
//       } finally {
//         setLoading(false);
//       }
//     }; <ScrollView style={styles.container}>
//         {!createAccount ? (
//           <View>
//             <Text style={styles.title1}>Apply Now</Text>
//             <CustomTextInput
//               value={name}
//               onChangeText={setName}
//               title="Name"
//               bad={badName !== ""}
//               placeholder="Enter your name"
//             />
//             {badName && <Text style={styles.errorMsg}>{badName}</Text>}
  
//             <CustomTextInput
//               value={email}
//               onChangeText={setEmail}
//               title="Email"
//               bad={badEmail !== ""}
//               placeholder="Enter your email"
//             />
//             {badEmail && <Text style={styles.errorMsg}>{badEmail}</Text>}
  
//             <CustomTextInput
//               value={contact}
//               onChangeText={setContact}
//               title="Contact"
//               bad={badContact !== ""}
//               placeholder="Enter your contact number"
//             />
//             {badContact && <Text style={styles.errorMsg}>{badContact}</Text>}
//             <CustomSolidBtn title="Submit" onClick={submitForm} />
//             <Loader visible={loading} />
//           </View>
//         ) : (
//           <View style={styles.successView}>
//             <Image
//               style={styles.logo}
//               source={{
//                 uri: "https://cdn-icons-png.flaticon.com/128/190/190411.png",
//               }}
//             />
//             <Text style={styles.successText}>You Applied Successfully</Text>
//           </View>
//         )}</ScrollView> export default JobApplication;
  
//   const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: "#fff" },
//     title1: {
//       fontSize: moderateScale(30),
//       textAlign: "center",
//       marginVertical: 20,
//     },
//     applyBtn: {
//       width: "70%",
//       height: verticalScale(40),
//       backgroundColor: TEXT_COLOR,
//       justifyContent: "center",
//       alignItems: "center",
//       borderRadius: moderateScale(10),
//     },
//     errorMsg: {
//       color: "red",
//       marginLeft: 20,
//     },
//     successView: {
//       flex: 1,
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     successText: {
//       fontSize: 20,
//       marginTop: 10,
//     },
//     logo: {
//       width: 100,
//       height: 100,
//     },
//     btnText: {
//       color: BG_COLOR,
//       fontSize: moderateScale(15),
//     },
//     skills: {
//       fontSize: moderateScale(19),
//       fontWeight: "500",
//       marginTop: moderateScale(10),
//     },
//     plus: {
//       fontSize: moderateScale(26),
//       fontWeight: "600",
//       marginTop: moderateScale(30),
//       marginLeft: moderateScale(20),
//     },
//     education: {
//       fontSize: moderateScale(20),
//       fontWeight: "600",
//       marginTop: moderateScale(30),
//       marginLeft: moderateScale(20),
//     },
//     headingView: {
//       width: "90%",
//       justifyContent: "space-between",
//       flexDirection: "row",
//       alignItems: "center",
//       marginTop: moderateScale(20),
//       alignSelf: "center",
//     },
//     skillModal: {
//       width: "100%",
//       paddingBottom: moderateScale(20),
//       backgroundColor: "#e4e4dc",
//       position: "absolute",
//       bottom: 0,
//       borderTopLeftRadius: moderateScale(30),
//       borderTopRightRadius: moderateScale(30),
//     },
  
//     iconClose: {
//       height: scale(25),
//       width: scale(25),
//     },
//     modalHeader: {
//       width: "90%",
//       marginTop: moderateScale(20),
//       flexDirection: "row",
//       alignSelf: "center",
//       justifyContent: "space-between",
//       alignItems: "center",
//     },
//     title: {
//       fontSize: moderateScale(18),
//       fontWeight: "600",
//     },
//     titleSelf: {
//       fontSize: moderateScale(15),
//       fontWeight: "600",
//     },
//     input: {
//       width: "90%",
//       height: scale(40),
//       borderWidth: 1,
//       borderRadius: moderateScale(10),
//       alignSelf: "center",
//       marginTop: moderateScale(20),
//       paddingLeft: moderateScale(15),
//     },
//     btn: {
//       width: "90%",
//       height: scale(45),
//       backgroundColor: TEXT_COLOR,
//       alignSelf: "center",
//       borderRadius: moderateScale(10),
//       marginTop: moderateScale(20),
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     btnText: {
//       color: "white",
//       fontSize: moderateScale(16),
//     },
//     skillItem: {
//       width: "90%",
//       alignSelf: "center",
//       flexDirection: "row",
//       alignItems: "center",
//       paddingLeft: moderateScale(20),
//       justifyContent: "space-between",
//       marginTop: moderateScale(10),
//     },
//     skillName: {
//       fontSize: moderateScale(15),
//     },
//     againCloseIcon: {
//       height: scale(20),
//       width: scale(20),
//     },
//     skillName1: {
//       fontWeight: "500",
//     },
//     skillName3: {
//       fontWeight: "500",
//     },
//   });



  