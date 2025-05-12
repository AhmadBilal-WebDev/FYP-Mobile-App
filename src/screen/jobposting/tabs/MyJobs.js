import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { TEXT_COLOR } from "../../../utils/Colors";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { db } from "../../../utils/firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
const ShimmerPlaceholder = createShimmerPlaceholder();

const MyJobs = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFocused) {
      getJobs();
    }
  }, [isFocused]);

  const getJobs = async () => {
    setLoading(true);
    try {
      const id = await AsyncStorage.getItem("USER_ID");

      const jobsQuery = query(
        collection(db, "jobs"),
        where("postedBy", "==", id)
      );

      const querySnapshot = await getDocs(jobsQuery);
      let temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      await AsyncStorage.setItem("JOBS", temp.length + "");
      setJobs(temp);
    } catch (error) {
      console.error("Error fetching jobs: ", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id) => {
    try {
      const jobDoc = doc(db, "jobs", id);
      await deleteDoc(jobDoc);
      getJobs();
    } catch (error) {
      console.error("Error deleting job: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../images/jobsfinds.png")}
        style={styles.logo}
      />

      <Text style={styles.Heading}>FindMyJob</Text>

      {loading && (
        <View>
          <FlatList
            data={[1, 2, 3]}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.loaderView}>
                  <ShimmerPlaceholder style={styles.loaderTitle} />
                  <ShimmerPlaceholder style={styles.loaderTitle} />
                  <ShimmerPlaceholder style={styles.loaderTitle} />
                  <ShimmerPlaceholder style={styles.loaderTitle} />
                  <ShimmerPlaceholder style={styles.loaderTitle} />
                  <View style={styles.BottomView}>
                    <ShimmerPlaceholder style={styles.loaderBtn} />
                    <ShimmerPlaceholder style={styles.loaderBtn} />
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}

      {jobs.length > 0 ? (
        <FlatList
          data={jobs}
          renderItem={({ item }) => (
            <View style={styles.jobsItems}>
              <Text style={styles.title}>{item.jobTitle}</Text>
              <Text style={styles.Desc}>{item.jobDesc}</Text>
              <Text style={styles.sameStyle}>
                {"Category: " + item.category}
              </Text>
              <Text style={styles.sameStyle}>{"Skill: " + item.skill}</Text>

              <Text style={styles.sameStyle}>
                {"Salary: " + item.salary + " L "}
              </Text>
              <Text style={styles.sameStyle}>
                {"Experience: " + item.exp + " Years"}
              </Text>

              <Text style={styles.sameStyle}>
                {"Contact Number: " + item.contact}
              </Text>
              <Text style={styles.sameStyle}>{"Email: " + item.email}</Text>

              <View style={styles.bottomBtn}>
                <TouchableOpacity
                  style={styles.EditBtn}
                  onPress={() => {
                    navigation.navigate("EditJob", { data: item });
                  }}
                >
                  <Text style={styles.TextBtn1}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.DeleatBtn}
                  onPress={() => {
                    deleteJob(item.id);
                  }}
                >
                  <Text style={styles.TextBtn2}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingBottom: moderateScale(100),
          }}
        />
      ) : (
        <View style={styles.emptyView}>
          <Text style={styles.title}>Empty Jobs</Text>
        </View>
      )}
    </View>
  );
};

export default MyJobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Heading: {
    fontSize: moderateScale(22),
    fontWeight: "600",
    color: TEXT_COLOR,
    textAlign: "center",
    marginTop: moderateScale(10),
  },
  jobsItems: {
    padding: 15,
    borderRadius: moderateScale(20),
    backgroundColor: "#f1f1f1",
    elevation: 2,
    marginBottom: moderateScale(10),
    width: "90%",
    alignSelf: "center",
    marginTop: moderateScale(20),
  },
  Desc: {
    fontSize: moderateScale(15),
    fontWeight: "500",
    marginTop: moderateScale(1),
  },
  sameStyle: {
    fontSize: moderateScale(15),
    fontWeight: "600",
    marginTop: moderateScale(5),
  },
  bottomBtn: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: moderateScale(20),
    alignItems: "center",
    marginTop: moderateScale(15),
  },
  EditBtn: {
    width: "35%",
    height: verticalScale(35),
    borderWidth: 1,
    borderRadius: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  TextBtn1: {
    color: "white",
  },
  DeleatBtn: {
    width: "35%",
    height: verticalScale(35),
    borderWidth: 1,
    borderRadius: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  TextBtn2: {
    color: "white",
  },
  emptyView: {
    width: "100%",
    height: "100%",
    marginTop: moderateScale(240),
    alignItems: "center",
  },
  logo: {
    height: scale(50),
    width: scale(50),
    alignSelf: "center",
    marginTop: moderateScale(20),
  },
  loaderView: {
    width: "90%",
    alignSelf: "center",
    marginTop: moderateScale(),
  },
  loaderTitle: {
    width: "70%",
    height: verticalScale(30),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(10),
  },
  BottomView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: moderateScale(10),
  },
  loaderBtn: {
    width: "46%",
    height: verticalScale(30),
    borderRadius: moderateScale(10),
  },
  profile: {
    height: moderateScale(90),
    width: moderateScale(90),
    borderRadius: moderateScale(50),
    alignSelf: "center",
    marginTop: moderateScale(10),
  },
  title: {
    fontSize: 17,
    fontWeight: "900",
    marginBottom: moderateScale(10),
  },
  email: {
    fontSize: 15.5,
    fontWeight: "500",
    marginBottom: moderateScale(5),
  },
});
