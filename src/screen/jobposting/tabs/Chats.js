import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../utils/firebaseConfig";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const Chats = () => {
  const navigation = useNavigation();
  const [candidateData, setCandidateData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchCandidateData = async () => {
      try {
        const companyID = await AsyncStorage.getItem("companyId");
        const q = query(
          collection(db, "Job-Application"),
          where("companyId", "==", companyID)
        );
        const querySnapshot = await getDocs(q);

        let data = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });

        setCandidateData(data);
      } catch (error) {
        console.error("Error fetching candidate data: ", error);
      }
    };

    fetchCandidateData();
  }, [isFocused]);

  const handleStatusChange = async (id, status) => {
    try {
      const candidateRef = doc(db, "Job-Application", id);
      await updateDoc(candidateRef, { status });

      const updatedData = candidateData.map((data) =>
        data.id === id ? { ...data, status } : data
      );
      setCandidateData(updatedData);
      await AsyncStorage.setItem("candidates", JSON.stringify(updatedData));

      Alert.alert(
        status === "Accepted" ? "Accepted" : "Rejected",
        `You have ${status.toLowerCase()} the candidate.`,
        [{ text: "OK" }]
      );
    } catch (error) {
      console.error("Error updating candidate status: ", error);
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      const candidateRef = doc(db, "Job-Application", id);
      await deleteDoc(candidateRef);

      const updatedData = candidateData.filter((data) => data.id !== id);
      setCandidateData(updatedData);
      await AsyncStorage.setItem("candidates", JSON.stringify(updatedData));

      Alert.alert("Deleted", "The job has been deleted successfully.", [
        { text: "OK" },
      ]);
    } catch (error) {
      console.error("Error deleting job: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.logoView}>
          <Image
            source={require("../../../images/jobsfinds.png")}
            style={styles.logo}
          />
          <Text style={styles.titles1}>Candidates</Text>
        </View>
        {candidateData.length > 0 ? (
          candidateData.map((data, index) => (
            <View key={index} style={styles.candidateInfo}>
              <View style={styles.closeView}>
                <Text style={styles.title}>{data.jobTitle}</Text>
                <TouchableOpacity onPress={() => handleDeleteJob(data.id)}>
                  <Image
                    source={require("../../../images/close.png")}
                    style={styles.close}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.email}>Name: {data.name}</Text>
              <Text style={styles.email}>Age: {data.age + " Year"}</Text>
              <Text style={styles.email}>Gender: {data.gender}</Text>
              <Text style={styles.email}>
                Experience: {data.experience + " Year"}
              </Text>
              <Text style={styles.email}>Qualification: {data.education}</Text>
              <Text style={styles.email}>Skills: {data.skill}</Text>
              <Text style={styles.email}>Contact: {data.contact}</Text>
              <Text style={styles.email}>Address: {data.address}</Text>
              <Text style={styles.email}>Email: {data.email}</Text>
              <View style={styles.secondView}>
                {data.status === "Accepted" ? (
                  <Text
                    style={styles.TextStyle}
                    onPress={() => {
                      Alert.alert("Contact Options", "Please Select One:", [
                        {
                          text: "Email",
                          onPress: () =>
                            Linking.openURL(`mailto:${data.email}`),
                        },
                        {
                          text: "Call",
                          onPress: () => Linking.openURL(`tel:${data.contact}`),
                        },
                        { text: "Cancel", style: "cancel" },
                      ]);
                    }}
                  >
                    Accepted
                  </Text>
                ) : data.status === "Rejected" ? (
                  <Text
                    style={styles.TextStyle}
                    onPress={() => {
                      Alert.alert("Contact Options", "Please Select One:", [
                        {
                          text: "Email",
                          onPress: () =>
                            Linking.openURL(`mailto:${data.email}`),
                        },
                        {
                          text: "Call",
                          onPress: () => Linking.openURL(`tel:${data.contact}`),
                        },
                        { text: "Cancel", style: "cancel" },
                      ]);
                    }}
                  >
                    Rejected
                  </Text>
                ) : (
                  <>
                    <TouchableOpacity
                      onPress={() => handleStatusChange(data.id, "Accepted")}
                    >
                      <Text style={styles.TextStyle}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleStatusChange(data.id, "Rejected")}
                    >
                      <Text style={styles.TextStyle}>Reject</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noData}>No candidate data found.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginBottom: "20%",
  },
  candidateInfo: {
    padding: 15,
    borderRadius: moderateScale(20),
    backgroundColor: "#f1f1f1",
    elevation: 2,
    marginBottom: moderateScale(10),
    width: "95%",
    alignSelf: "center",
  },
  logo: {
    height: scale(50),
    width: scale(50),
    alignSelf: "center",
    marginTop: moderateScale(10),
  },
  titles: {
    fontSize: moderateScale(20),
    fontWeight: "700",
    marginBottom: moderateScale(25),
    marginTop: moderateScale(15),
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
    marginBottom: moderateScale(10),
    alignSelf: "flex-start",
    width: "90%",
  },
  email: {
    fontSize: 15.5,
    fontWeight: "500",
    marginBottom: moderateScale(5),
  },
  secondView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: moderateScale(15),
  },
  TextStyle: {
    borderWidth: 1,
    padding: moderateScale(10),
    backgroundColor: "black",
    borderRadius: moderateScale(10),
    color: "white",
    fontSize: moderateScale(15),
  },
  noData: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
  closeView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  close: {
    height: scale(25),
    width: scale(25),
  },
  titles1: {
    fontSize: moderateScale(20),
    fontWeight: "700",
    marginBottom: moderateScale(25),
    marginTop: moderateScale(15),
    alignSelf: "center",
  },
});
