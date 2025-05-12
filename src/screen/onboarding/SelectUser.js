import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BG_COLOR, TEXT_COLOR } from "../../utils/Colors";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

const SelectUser = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require("../../images/jobsfinds.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>What you are looking for?</Text>
      <TouchableOpacity
        style={styles.wantToHire}
        onPress={() => {
          navigation.navigate("jobPostingNavigator");
        }}
      >
        <Text style={styles.btnText1}>Want to Hire Candidate</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.wantToJoin}
        onPress={() => {
          navigation.navigate("jobSearchingNavigator");
        }}
      >
        <Text style={styles.btnText2}>Want to Get Job</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BG_COLOR,
  },
  title: {
    fontSize: moderateScale(15),
    fontWeight: "600",
  },
  wantToHire: {
    width: "90%",
    height: verticalScale(45),
    backgroundColor: TEXT_COLOR,
    borderRadius: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateVerticalScale(20),
  },
  wantToJoin: {
    width: "90%",
    height: verticalScale(45),
    backgroundColor: TEXT_COLOR,
    borderRadius: moderateScale(10),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateVerticalScale(20),
  },
  btnText1: {
    color: BG_COLOR,
    fontSize: moderateScale(16),
    fontWeight: "16",
  },
  btnText2: {
    color: BG_COLOR,
    fontSize: moderateScale(16),
    fontWeight: "16",
  },
  logo: {
    width: scale(120),
    height: scale(120),
    marginBottom: moderateVerticalScale(50),
  },
});
