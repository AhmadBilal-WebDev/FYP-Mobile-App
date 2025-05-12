import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "../screen/jobsearching/Main";
import searchjob from "../screen/jobsearching/searchjob";
import jobDetails from "../screen/jobsearching/jobDetails";
import LogionForUser from "../screen/jobsearching/LogionForUser";
import SignUpForUser from "../screen/jobsearching/SignUpForUser";
import SavedJobs from "../screen/jobsearching/SavedJobs";
import JobApplication from "../screen/jobsearching/JobApplication";
import ChangeImageForUser from "../screen/jobsearching/ChangeImageForUser";
import UpdateProfileForUser from "../screen/jobsearching/UpdateProfileForUser";
import NewPasswordForUser from "../screen/jobsearching/NewPasswordForUser";
const Stack = createStackNavigator();
const jobSearchingNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="searchjob"
        component={searchjob}
        options={{ headerShown: true, title: "SearchMyJob" }}
      />
      <Stack.Screen
        name="jobDetails"
        component={jobDetails}
        options={{ headerShown: true, title: "SearchMyJob" }}
      />
      <Stack.Screen
        name="LoginForUser"
        component={LogionForUser}
        options={{ headerShown: true, title: "Home" }}
      />
      <Stack.Screen
        name="SignUpForUser"
        component={SignUpForUser}
        options={{ headerShown: true, title: "Home" }}
      />
      <Stack.Screen
        name="SavedJobs"
        component={SavedJobs}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="JobApplication"
        component={JobApplication}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="ChangeImageForUser"
        component={ChangeImageForUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateProfileForUser"
        component={UpdateProfileForUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewPasswordForUser"
        component={NewPasswordForUser}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default jobSearchingNavigator;

const styles = StyleSheet.create({});
