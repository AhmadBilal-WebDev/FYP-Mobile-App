import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import loginForCompany from "../screen/jobposting/loginForCompany";
import signUpForCompany from "../screen/jobposting/signUpForCompany";


const jobPostingNavigator = () => {
  const STACK = createStackNavigator();
  return (
    <STACK.Navigator>
      <STACK.Screen
        name="loginForCompany"
        component={loginForCompany}
        options={{ headerShown: false }}
      />
      <STACK.Screen
        name="signUpForCompany"
        component={signUpForCompany}
        options={{ headerShown: false }}
      />
    </STACK.Navigator>
  );
};

export default jobPostingNavigator;
