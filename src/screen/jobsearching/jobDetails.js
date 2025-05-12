import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { BG_COLOR, TEXT_COLOR } from "../../utils/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";

const jobDetails = () => {
  const route = useRoute();
  console.log(route.params.data);
  const isFocused = useIsFocused();
  const [isLogin, setIsLogin] = useState(false);
  const [isJobSaved, setIsJobSaved] = useState(false);
  const [savedJobId, setSavedJobId] = useState("");
  const [isJobApplied, setIsJobApplied] = useState(false);
  const [appliedJobId, setAppliedJobId] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    getData();
    getSavedJobs();
    getAppliedJobs();
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

  const saveJobs = async () => {
    try {
      const id = await AsyncStorage.getItem("USER_ID");
      if (id) {
        const docRef = await addDoc(collection(db, "saved_jobs"), {
          ...route.params.data,
          userId: id,
        });
        console.log("Job saved successfully with ID: ", docRef.id);
        getSavedJobs();
      } else {
        console.error("User ID not found in AsyncStorage.");
      }
    } catch (error) {
      console.error("Error saving job: ", error);
    }
  };

  const getSavedJobs = async () => {
    try {
      const id = await AsyncStorage.getItem("USER_ID");
      if (id) {
        const jobsQuery = query(
          collection(db, "saved_jobs"),
          where("userId", "==", id)
        );
        const querySnapshot = await getDocs(jobsQuery);

        if (querySnapshot.size > 0) {
          querySnapshot.forEach((doc) => {
            if (doc.data().id == route.params.data.id) {
              setIsJobSaved(true);
              setSavedJobId(doc.id);
            }
          });
        } else {
          setIsJobSaved(false);
          setSavedJobId("");
        }
      } else {
        // console.error("User ID not found in AsyncStorage.");
      }
    } catch (error) {
      console.error("Error fetching saved jobs: ", error);
    }
  };

  const removeSavedJob = async () => {
    try {
      await deleteDoc(doc(db, "saved_jobs", savedJobId));
      console.log("Job removed successfully");
      getSavedJobs();
    } catch (error) {
      console.error("Error removing saved job: ", error);
    }
  };

  const getAppliedJobs = async () => {
    try {
      const id = await AsyncStorage.getItem("USER_ID");
      if (id) {
        const jobsQuery = query(
          collection(db, "applied_jobs"),
          where("userId", "==", id)
        );
        const querySnapshot = await getDocs(jobsQuery);

        if (querySnapshot.docs.length > 0) {
          querySnapshot.forEach((doc) => {
            if (doc.data().id === route.params.data.id) {
              setIsJobApplied(true);
              setAppliedJobId(doc.id);
            }
          });
        } else {
          setIsJobApplied(false);
          setAppliedJobId("");
        }
      } else {
        // console.error("User ID not found in AsyncStorage.");
      }
    } catch (error) {
      console.error("Error fetching applied jobs: ", error);
    }
  };

  const cancelApply = async () => {
    try {
      await deleteDoc(doc(db, "applied_jobs", appliedJobId));
      console.log("Job application canceled successfully.");
      getAppliedJobs();
    } catch (error) {
      console.error("Error canceling job application: ", error);
    }
  };

  const applyJob = async () => {
    try {
      const id = await AsyncStorage.getItem("USER_ID");
      if (id) {
        const docRef = await addDoc(collection(db, "applied_jobs"), {
          ...route.params.data,
          userId: id,
        });
        console.log("Job applied successfully with ID: ", docRef.id);
        getAppliedJobs();
      } else {
        console.error("User ID not found in AsyncStorage.");
      }
    } catch (error) {
      console.error("Error applying for job: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.jobTitle}>{route.params.data.jobTitle}</Text>
      <View style={styles.detailsView}>
        <Text style={styles.postStyle}>
          {"Posted By:  " + route.params.data.posterName}
        </Text>
      </View>
      <Text style={styles.jobDes}>{route.params.data.jobDesc}</Text>
      <Text style={styles.subTitle}>
        {"Category Required:  " + route.params.data.category}
      </Text>
      <Text style={styles.subTitle}>
        {"Experience Required:  " + route.params.data.exp + " Years"}
      </Text>
      <Text style={styles.subTitle}>
        {"Skill Required:  " + route.params.data.skill}
      </Text>
      <Text style={styles.subTitle}>
        {"Salary:  " + route.params.data.salary + " LPA"}
      </Text>
      <Text style={styles.subTitle}>
        {"Email:  " + route.params.data.email}
      </Text>
      <Text style={styles.subTitle}>
        {"Contact Number:  " + route.params.data.contact}
      </Text>
      <Text style={styles.subTitle}>
        {"Company Name:  " + route.params.data.company}
      </Text>
      <View style={styles.bottomView}>
        <TouchableOpacity
          disabled={isLogin ? false : true}
          style={[styles.saveBtn]}
          onPress={() => {
            if (isJobSaved) {
              removeSavedJob();
            } else {
              saveJobs();
            }
          }}
        >
          <Image
            source={
              isJobSaved
                ? require("../../images/star2.png")
                : require("../../images/star1.png")
            }
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isLogin ? false : true}
          style={[
            styles.applyBtn,
            { backgroundColor: isLogin ? "black" : "#9e9e9e" },
          ]}
          onPress={() => {
            if (!isJobApplied) {
              applyJob();
              navigation.navigate("JobApplication");
            } else {
              cancelApply();
            }
          }}
        >
          <Text style={styles.btnText}>
            {isJobApplied ? "Applied" : "Apply Now"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default jobDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  jobTitle: {
    width: "90%",
    fontSize: moderateScale(30),
    fontWeight: "700",
    alignSelf: "center",
    marginTop: moderateScale(20),
  },
  jobDes: {
    width: "90%",
    marginTop: moderateScale(20),
    fontSize: moderateScale(16),
    fontWeight: "500",
    alignSelf: "center",
  },
  subTitle: {
    marginTop: moderateScale(20),
    fontSize: moderateScale(16),
    fontWeight: "500",
    marginLeft: moderateScale(20),
  },
  detailsView: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    marginTop: moderateScale(10),
  },
  bottomView: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: moderateScale(30),
  },
  saveBtn: {
    width: "25%",
    height: verticalScale(35),
    borderWidth: 0.5,
    borderRadius: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: scale(20),
    width: scale(20),
  },
  applyBtn: {
    width: "70%",
    height: verticalScale(40),
    backgroundColor: TEXT_COLOR,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(10),
  },
  btnText: {
    color: BG_COLOR,
    fontSize: moderateScale(15),
  },
  postStyle: {
    fontSize: moderateScale(16),
    fontWeight: "600",
  },
});
