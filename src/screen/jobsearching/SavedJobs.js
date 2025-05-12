import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { BG_COLOR } from "../../utils/Colors";
import {
  moderateScale,
  moderateVerticalScale,
  verticalScale,
} from "react-native-size-matters";
import { FlatList, TextInput } from "react-native-gesture-handler";
import {
  query,
  where,
  getDocs,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SavedJobs = () => {
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    getJob();
  }, []);



  const getJob = async () => {
    try {
      const id = await AsyncStorage.getItem("USER_ID");
      if (id) {
        const jobsQuery = query(
          collection(db, "saved_jobs"),
          where("userId", "==", id)
        );
        const querySnapshot = await getDocs(jobsQuery);

        let temp = [];
        querySnapshot.forEach((doc) => {
          temp.push({ ...doc.data(), savedId: doc.id });
        });
        setJobs(temp);
      } else {
        console.error("User ID not found in AsyncStorage.");
      }
    } catch (error) {
      console.error("Error fetching saved jobs: ", error);
    }
  };

 
  const removeSavedJob = async (id) => {
    try {
      await deleteDoc(doc(db, "saved_jobs", id));
      console.log("Job removed successfully");
      getJob();
    } catch (error) {
      console.error("Error removing saved job: ", error);
    }
  };

  return (
    <View style={styles.container}>
      {jobs.length > 0 ? (
        <FlatList
          data={jobs}
          renderItem={({ item, index }) => {
            console.log(item);

            return (
              <TouchableOpacity
                style={styles.jobItem}
                onPress={() => {
                  navigation.navigate("jobDetails", { data: item });
                }}
              >
                <View style={styles.TopView}>
                  <Text style={styles.jobTitle}>{item.jobTitle}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      removeSavedJob(item.savedId);
                    }}
                  >
                    <Image
                      source={require("../../images/star2.png")}
                      style={styles.star1}
                    />
                  </TouchableOpacity>
                </View>

                <Text style={styles.subTitle}>
                  {"Job Category: " + item.category}
                </Text>
                <Text style={styles.subTitle}>
                  {"Posted By:" + item.posterName}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>No Saved Jobs</Text>
        </View>
      )}
    </View>
  );
};

export default SavedJobs;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  SearchBox: {
    width: "90%",
    height: verticalScale(43),
    borderWidth: 1.5,
    marginTop: moderateVerticalScale(26),
    alignSelf: "center",
    borderRadius: moderateScale(30),
    flexDirection: "row",
    alignItems: "center",
  },
  searchImage: {
    height: moderateScale(33),
    width: moderateScale(33),
    marginLeft: moderateScale(15),
  },
  searText: {
    marginLeft: moderateScale(10),
    width: "68%",
    height: "100%",
  },
  ClearSearch: {
    width: moderateScale(25),
    height: moderateScale(25),
  },
  jobItem: {
    width: "90%",
    backgroundColor: "#f2f2f2",
    alignSelf: "center",
    marginTop: moderateScale(20),
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
  },
  jobTitle: {
    fontSize: moderateScale(20),
    fontWeight: "600",
    width: "90%",
  },
  subTitle: {
    fontSize: moderateScale(15),
    fontWeight: "500",
    color: "#2e2e2e",
    marginTop: moderateScale(5),
  },
  TopView: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  star1: {
    height: moderateScale(18),
    width: moderateScale(18),
  },
  emptyView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    alignSelf: "center",
    fontSize: moderateScale(20),
    fontWeight: "600",
  },
});
