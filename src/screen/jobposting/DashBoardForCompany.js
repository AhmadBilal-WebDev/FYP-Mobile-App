import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BG_COLOR } from "../../utils/Colors";
import { moderateScale, verticalScale } from "react-native-size-matters";
import MyJobs from "./tabs/MyJobs";
import SearchCandidates from "./tabs/SearchCandidates";
import Profile1 from "./tabs/Profile1";
import Chats from "./tabs/Chats";
import { useNavigation } from "@react-navigation/native";

const DashBoardForCompany = () => {
  const [selectTab, setSelectTab] = useState(0);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {selectTab == 0 ? (
        <MyJobs />
      ) : selectTab == 1 ? (
        <SearchCandidates />
      ) : selectTab == 2 ? (
        <Chats />
      ) : (
        <Profile1
          onJobsClick={() => {
            setSelectTab(0);
          }}
        />
      )}
      <View style={styles.bottomView}>
        <TouchableOpacity
          style={[
            styles.bottomBtn,
            { borderTopWidth: selectTab == 0 ? 3 : 0, borderTopColor: "red" },
          ]}
          onPress={() => {
            setSelectTab(0);
          }}
        >
          <Image
            style={[
              styles.tabIcon,
              { tintColor: selectTab == 0 ? "red" : "black" },
            ]}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/553/553376.png",
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.bottomBtn,
            { borderTopWidth: selectTab == 1 ? 3 : 0, borderTopColor: "red" },
          ]}
          onPress={() => {
            setSelectTab(1);
          }}
        >
          <Image
            style={[
              styles.tabIcon,
              { tintColor: selectTab == 1 ? "red" : "black" },
            ]}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/15582/15582721.png",
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomBtn}
          onPress={() => {
            navigation.navigate("AddJob");
          }}
        >
          <Image
            style={styles.tabIcon}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/6997/6997175.png",
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.bottomBtn,
            { borderTopWidth: selectTab == 2 ? 3 : 0, borderTopColor: "red" },
          ]}
          onPress={() => {
            setSelectTab(2);
          }}
        >
          <Image
            style={[
              styles.tabIcon,
              { tintColor: selectTab == 2 ? "red" : "black" },
            ]}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/9383/9383383.png",
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.bottomBtn,
            { borderTopWidth: selectTab == 3 ? 3 : 0, borderTopColor: "red" },
          ]}
          onPress={() => {
            setSelectTab(3);
          }}
        >
          <Image
            style={[
              styles.tabIcon,
              { tintColor: selectTab == 3 ? "red" : "black" },
            ]}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/17123/17123222.png",
            }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DashBoardForCompany;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  bottomView: {
    width: "100%",
    height: verticalScale(70),
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderTopWidth: 1,
    borderTopColor: "#9e9e9e",
    backgroundColor: "#f2f2f2",
  },
  bottomBtn: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  tabIcon: {
    height: moderateScale(35),
    width: moderateScale(35),
  },
});
