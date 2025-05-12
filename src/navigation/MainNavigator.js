import React from "react";
import Splash from "../screen/onboarding/Splash";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import jobPostingNavigator from "./jobPostingNavigator";
import jobSearchingNavigator from "./jobSearchingNavigator";
import SelectUser from "../screen/onboarding/SelectUser";
import DashBoardForCompany from "../screen/jobposting/DashBoardForCompany";
import AddJob from "../screen/jobposting/tabs/AddJob";
import EditJob from "../screen/jobposting/tabs/EditsJob";
import UpdateProfileForCompany from "../screen/jobposting/UpdateProfileForCompany";
import ChangeProfilePicForCompany from "../screen/jobposting/ChangeProfilePicForCompany";
import CandidatesDetails from "../screen/jobposting/CandidatesDetails";
import CompanyChat from "../screen/jobposting/CompanyChat";
import NewPassword from "../screen/jobposting/NewPassword";
import Chats from "../screen/jobposting/tabs/Chats";
const STACK = createStackNavigator();
const MainNavigator = () => {
  return (
    <NavigationContainer>
      <STACK.Navigator>
        <STACK.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <STACK.Screen
          name="SelectUser"
          component={SelectUser}
          options={{ headerShown: false }}
        />
        <STACK.Screen
          name="jobPostingNavigator"
          component={jobPostingNavigator}
          options={{ headerShown: false }}
        />
        <STACK.Screen
          name="jobSearchingNavigator"
          component={jobSearchingNavigator}
          options={{ headerShown: false }}
        />
        <STACK.Screen
          name="DashBoardForCompany"
          component={DashBoardForCompany}
          options={{ headerShown: false }}
        />
        <STACK.Screen
          name="AddJob"
          component={AddJob}
          options={{ headerShown: true }}
        />
        <STACK.Screen
          name="EditJob"
          component={EditJob}
          options={{ headerShown: false }}
        />
        <STACK.Screen
          name="UpdateProfileForCompany"
          component={UpdateProfileForCompany}
          options={{ headerShown: false }}
        />
        <STACK.Screen
          name="ChangeProfilePicForCompany"
          component={ChangeProfilePicForCompany}
          options={{ headerShown: false }}
        />
        <STACK.Screen
          name="CandidatesDetails"
          component={CandidatesDetails}
          options={{ headerShown: false }}
        />

        <STACK.Screen
          name="CompanyChat"
          component={CompanyChat}
          options={{ headerShown: false }}
        />
        <STACK.Screen
          name="NewPassword"
          component={NewPassword}
          options={{ headerShown: false }}
        />
      </STACK.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
