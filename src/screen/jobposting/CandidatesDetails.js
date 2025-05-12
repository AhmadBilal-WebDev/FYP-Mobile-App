import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { scale } from "react-native-size-matters";

const SearchCandidateDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();

  if (!route.params || !route.params.data) {
    return (
      <View style={styles.container}>
        <Text style={styles.noData}>No data found</Text>
      </View>
    );
  }

  const { name, email, contact } = route.params.data;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.BackBtn} onPress={navigation.goBack}>
        <Image source={require("../../images/close.png")} style={styles.back} />
      </TouchableOpacity>
      <View style={styles.logoView}>
        <Image
          source={require("../../images/jobsfinds.png")}
          style={styles.logo}
        />
      </View>

      <View style={styles.secondContainer}>
        <Text style={styles.jobTitle}>Name: {name}</Text>
        <Text style={styles.email}>Email: {email}</Text>
        <Text style={styles.contact}>Contact: {contact}</Text>
      </View>
    </View>
  );
};

export default SearchCandidateDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  back: {
    width: scale(30),
    height: scale(33),
    marginTop: scale(15),
    marginLeft: scale(10),
  },
  logo: {
    height: scale(50),
    width: scale(50),
    alignSelf: "center",
    marginTop: scale(-45),
  },
  jobTitle: {
    fontSize: scale(20),
    fontWeight: "bold",
    marginBottom: scale(10),
  },
  email: {
    fontSize: scale(16),
    marginBottom: scale(10),
  },
  contact: {
    fontSize: scale(16),
  },
  noData: {
    fontSize: scale(18),
    textAlign: "center",
    marginTop: scale(20),
  },
});
