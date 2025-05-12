import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
} from "react-native";
import { BG_COLOR } from "../../utils/Colors";
import { scale, verticalScale } from "react-native-size-matters";
import Home from "./Tabs/Home";
import Applies from "./Tabs/Applies";
import Inbox from "./Tabs/Inbox";
import Profile from "./Tabs/Profile";

const DrawerScreen = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const renderCurrentTab = () => {
    if (currentTab === 0) return <Home />;
    if (currentTab === 1) return <Applies />;
    if (currentTab === 2) return <Inbox />;
    if (currentTab === 3) return <Profile />;
    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>{renderCurrentTab()}</View>

        <View style={styles.bottomNavView}>
          <TouchableOpacity style={styles.tab} onPress={() => setCurrentTab(0)}>
            <Image
              style={styles.tabIcon}
              source={{
                uri:
                  currentTab === 0
                    ? "https://cdn-icons-png.flaticon.com/128/6730/6730449.png"
                    : "https://cdn-icons-png.flaticon.com/128/109/109588.png",
              }}
            />
            <Text
              style={[
                styles.tabText,
                { color: currentTab === 0 ? "#000" : "#888" },
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tab} onPress={() => setCurrentTab(1)}>
            <Image
              style={styles.tabIcon}
              source={{
                uri:
                  currentTab === 1
                    ? "https://cdn-icons-png.flaticon.com/128/3388/3388638.png"
                    : "https://cdn-icons-png.flaticon.com/128/3388/3388597.png",
              }}
            />
            <Text
              style={[
                styles.tabText,
                { color: currentTab === 1 ? "#000" : "#888" },
              ]}
            >
              Applies
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tab} onPress={() => setCurrentTab(2)}>
            <Image
              style={styles.tabIcon}
              source={{
                uri:
                  currentTab === 2
                    ? "https://cdn-icons-png.flaticon.com/128/8315/8315838.png"
                    : "https://cdn-icons-png.flaticon.com/128/8315/8315833.png",
              }}
            />
            <Text
              style={[
                styles.tabText,
                { color: currentTab === 2 ? "#000" : "#888" },
              ]}
            >
              Inbox
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tab} onPress={() => setCurrentTab(3)}>
            <Image
              style={styles.tabIcon}
              source={{
                uri:
                  currentTab === 3
                    ? "https://cdn-icons-png.flaticon.com/128/16874/16874687.png"
                    : "https://cdn-icons-png.flaticon.com/128/14120/14120454.png",
              }}
            />
            <Text
              style={[
                styles.tabText,
                { color: currentTab === 3 ? "#000" : "#888" },
              ]}
            >
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DrawerScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  content: {
    flex: 1,
    paddingBottom: verticalScale(70),
  },
  bottomNavView: {
    width: "100%",
    height: verticalScale(70),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderTopWidth: 2,
    borderTopColor: "#9e9e9e",
    backgroundColor: BG_COLOR,
    position: "absolute",
    bottom: 0,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: {
    width: scale(25),
    height: scale(25),
    marginBottom: 5,
  },
  tabText: {
    fontSize: scale(12),
    textAlign: "center",
  },
});
