import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { BG_COLOR } from "../../utils/Colors";
import {
  moderateScale,
  moderateVerticalScale,
  verticalScale,
} from "react-native-size-matters";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { query, where, getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const searchjob = () => {
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState("");
  const [savedJobs, setSavedJobs] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  useEffect(() => {
    getSavedJobs();
  }, [isFocused]);
 
  const searchJob = async (txt) => {
    try {
      const normalizedTxt = txt.trim().toLowerCase();

      if (!normalizedTxt) {
        setJobs([]);
        return;
      }

      const q = query(collection(db, "jobs"));
      const querySnapshot = await getDocs(q);

      const filteredJobs = [];

      querySnapshot.forEach((doc) => {
        const jobTitle = doc.data().jobTitle?.toLowerCase();
        if (jobTitle && jobTitle.includes(normalizedTxt)) {
          filteredJobs.push({ ...doc.data(), id: doc.id });
        }
      });

      console.log(filteredJobs);
      setJobs(filteredJobs);
    } catch (e) {
      console.error("Error fetching job documents: ", e);
    }
  };

  // const saveJobs = async () => {  // YT-CODE
  //   const id = await AsyncStorage.getItem("USER_ID");
  //   firestore()
  //     .collection("saved_jobs")
  //     .add({
  //       ...route.params.data,
  //       userId: id,
  //     })
  //     .then(() => {
  //       console.log("Job saved successfully");
  //       getSavedJobs();
  //     });
  // };

  const saveJobs = async () => {
    try {
      const id = await AsyncStorage.getItem("USER_ID");
      if (id) {
        const docRef = await addDoc(collection(db, "saved_jobs"), {
          ...route.params.data,
          userId: id,
        });
        console.log("Job saved successfully with ID: ", docRef.id);
        getSavedJobs(); // Call getSavedJobs() after saving
      } else {
        console.error("User ID not found in AsyncStorage.");
      }
    } catch (error) {
      console.error("Error saving job: ", error);
    }
  };

  // const getSavedJobs = async () => {  //
  //   const id = await AsyncStorage.getItem("USER_ID");
  //   Firestore()
  //     .collection("saves_jobs")
  //     .where("userId", "==", id)
  //     .get()
  //     .then((snapshot) => {
  //       console.log(snapshot.docs);
  //       if (snapshot.docs.length > 0) {
  //         let temp = [];
  //         snapshot.docs.forEach((item) => {
  //           temp.push({ ...item.data(), saveId: item.id });
  //         });
  //         setSavedJobs(temp);
  //       } else {
  //         setSavedJobs([]);
  //       }
  //     });
  // };

  const getSavedJobs = async () => {
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
          temp.push({ ...doc.data(), saveId: doc.id }); // Corrected `saveId`
        });
        setSavedJobs(temp);
      } else {
        // console.error("User ID not found in AsyncStorage.");
        setSavedJobs([]);
      }
    } catch (error) {
      console.error("Error fetching saved jobs: ", error);
    }
  };

  // const removeSavedJob = (id) => { // YT-CODE
  //   const docId=await getSavedJobId(id)
  //   Firestore()
  //     .collection("saved_jobs")
  //     .doc(id)
  //     .delete()
  //     .then(() => {
  //       searchJob(search);
  //     });
  // };

  const checkSavedJob = (id) => {
    let temp = savedJobs;
    let isSaved = false;
    temp.map((item) => {
      console.log("saved item"), item;
      if (item.id == id) {
        isSaved = true;
      }
    });
    return isSaved;
  };

  return (
    <View style={styles.container}>
      <View style={styles.SearchBox}>
        <Image
          style={styles.searchImage}
          source={require("../../images/website.png")}
        />
        <TextInput
          value={search}
          onChangeText={(txt) => {
            setSearch(txt);
            searchJob(txt);
          }}
          style={styles.searText}
          placeholder="Search..."
        />
        {search != "" && (
          <TouchableOpacity
            onPress={() => {
              setSearch("");
              searchJob("");
            }}
          >
            <Image
              style={styles.ClearSearch}
              source={{
                uri: "https://tse3.mm.bing.net/th?id=OIP.JB1euR_h47EiN_QqN4XuZgHaHa&pid=Api&P=0&h=220",
              }}
            />
          </TouchableOpacity>
        )}
      </View>
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
                    if (checkSavedJob(item.id)) {
                      removeSavedJob(item.id);
                    }
                  }}
                >
                  <Image
                    source={
                      checkSavedJob(item.id)
                        ? require("../../images/star2.png")
                        : require("../../images/star1.png")
                    }
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
              <Text style={styles.subTitle}>{"Email:" + item.email}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default searchjob;
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
});
