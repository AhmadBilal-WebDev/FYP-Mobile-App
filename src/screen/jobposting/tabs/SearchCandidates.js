import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../utils/firebaseConfig";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const SearchCandidate = () => {
  const navigation = useNavigation();
  const [candidateData, setCandidateData] = useState(null);
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
          data.push(doc.data());
        });

        setCandidateData(data);
      } catch (error) {
        console.error("Error fetching candidate data: ", error);
      }
    };

    fetchCandidateData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.logoView}>
          <Image
            source={require("../../../images/jobsfinds.png")}
            style={styles.logo}
          />
          <Text style={styles.titles}>Candidates</Text>
        </View>
        {candidateData ? (
          candidateData.map((data, index) => (
            <View key={index} style={styles.candidateInfo}>
              <Text style={styles.title1}>Job Title: {data.jobTitle}</Text>
              <Text style={styles.title}>Name: {data.name}</Text>
              <Text style={styles.email}>Email: {data.email}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noData}>No candidate data found.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default SearchCandidate;

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
    alignSelf: "center",
    fontWeight: "700",
    marginBottom: moderateScale(25),
    marginTop: moderateScale(15),
  },
  title: {
    fontSize: 17,
    fontWeight: "500",
    marginBottom: moderateScale(5),
  },

  contact: {
    fontSize: 15,
    marginBottom: 5,
  },
  noData: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
  email: {
    fontSize: 15.5,
    fontWeight: "500",
  },
  title1: {
    fontSize: moderateScale(18),
    fontWeight: "700",
    marginBottom: moderateScale(10),
  },
});
