import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  moderateScale,
  moderateVerticalScale,
  verticalScale,
} from "react-native-size-matters";
import { BG_COLOR } from "../utils/Colors";
import { TextInput } from "react-native-gesture-handler";

const CustomTextInput = ({
  title,
  txt,
  placeholder,
  value,
  onChangeText,
  bad,
  keyboardtype,
  secureTextEntry,
}) => {
  return (
    <View style={[styles.input, { borderColor: bad ? "red" : "#9e9e9e" }]}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        value={value}
        onChangeText={(txt) => onChangeText(txt)}
        placeholder={placeholder}
        keyboardtype={keyboardtype ? keyboardtype : "default"}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    width: "90%",
    height: verticalScale(45),
    borderWidth: 0.9,
    alignSelf: "center",
    marginTop: moderateVerticalScale(20),
    borderRadius: moderateScale(10),
    justifyContent: "center",
    paddingRight: moderateScale(15),
    paddingLeft: moderateScale(15),
  },
  title: {
    alignSelf: "flex-start",
    marginLeft: moderateScale(20),
    top: moderateScale(-11),
    position: "absolute",
    backgroundColor: BG_COLOR,
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
  },
});
