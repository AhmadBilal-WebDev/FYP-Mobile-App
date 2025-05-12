import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Alert,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import NoLoginComponent from "../../../common/NoLoginComponent";
import { BG_COLOR } from "../../../utils/Colors";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  query,
  where,
  getDocs,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../utils/firebaseConfig";
import { moderateScale, scale } from "react-native-size-matters";

const Inbox = () => {
  const isFocused = useIsFocused();
  const [isLogin, setIsLogin] = useState(false);
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getData();
    getJob();
  }, [isFocused]);

  const getData = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    const type = await AsyncStorage.getItem("USER_TYPE");
    if (id && type === "user") {
      setIsLogin(true);
    }
  };

  const getJob = async () => {
    try {
      const id = await AsyncStorage.getItem("USER_ID");
      // if (!id) {
      //   console.error("USER_ID not found in AsyncStorage");
      //   return;
      // }

      const q = query(
        collection(db, "applied_jobs"),
        where("userId", "==", id)
      );
      const querySnapshot = await getDocs(q);

      let temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({ ...doc.data(), appliedId: doc.id });
      });

      setJobs(temp);
    } catch (error) {
      console.error("Error fetching jobs: ", error);
    }
  };

  const handleDeleteJob = async (appliedId) => {
    try {
      await deleteDoc(doc(db, "applied_jobs", appliedId));
      setJobs(jobs.filter((job) => job.appliedId !== appliedId));
      Alert.alert("Success", "Job deleted successfully.");
    } catch (error) {
      console.error("Error deleting job: ", error);
    }
  };

  return (
    <View style={styles.container}>
      {!isLogin && (
        <Image
          source={require("../../../images/jobsfinds.png")}
          style={styles.logo}
        />
      )}
      {!isLogin && (
        <NoLoginComponent
          heading={"Get in touch with recruiters from top MNCs"}
          desc={
            "Discuss job recommendations with Comapny Acception or Rejection With Company"
          }
        />
      )}
      {isLogin && jobs.length > 0 ? (
        <FlatList
          data={jobs}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.jobItem}>
              <View style={styles.TopView}>
                <Text style={styles.jobTitle}>{item.jobTitle}</Text>

                <TouchableOpacity
                  onPress={() => {
                    handleDeleteJob(item.appliedId);
                  }}
                >
                  <Image
                    source={require("../../../images/close.png")}
                    style={styles.close}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.subTitle}>{item.jobDesc}</Text>

              <Text style={styles.subTitle}>
                {"Posted By: " + item.posterName}
              </Text>

              <Text style={styles.subTitle}>
                {"Job Category: " + item.category}
              </Text>

              <Text style={styles.subTitle}>{"Skill: " + item.skill}</Text>

              <Text style={styles.subTitle}>
                {"Experience: " + item.exp + " Year"}
              </Text>
              <Text style={styles.subTitle}>
                {"Company Name: " + item.company}
              </Text>

              <View style={styles.btnView}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    Alert.alert("Contact Options", "Please Select One:", [
                      {
                        text: "Email",
                        onPress: () => Linking.openURL(`mailto:${item.email}`),
                      },
                      {
                        text: "Call",
                        onPress: () => Linking.openURL(`tel:${item.contact}`),
                      },
                      { text: "Cancel", style: "cancel" },
                    ]);
                  }}
                >
                  <Text style={styles.btnText}>Acception/Rejection</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.appliedId}
        />
      ) : null}
      {isLogin && jobs.length < 1 ? (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>No Applied Jobs</Text>
        </View>
      ) : null}
    </View>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
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
  btnView: {
    marginTop: moderateScale(10),
    alignSelf: "center",
  },
  btnText: {
    borderWidth: 1,
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    color: "white",
    backgroundColor: "black",
    alignSelf: "center",
  },
  close: {
    height: scale(25),
    width: scale(25),
  },
  closeView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    height: scale("90"),
    width: scale("90"),
    alignSelf: "center",
    marginTop: moderateScale(20),
  },
});
