// navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import StudentHome from '../screens/student/StudentHome';
import AdminSignInScreen from '../screens/admin/AdminSignInScreen';
import PostJobScreen from '../screens/admin/PostJobScreen';
import ApplyJobScreen from '../screens/student/ApplyJobScreen';
import ViewPostedJobsScreen from '../screens/admin/ViewPostedJobsScreen';
import JobApplicationsScreen from '../screens/admin/JobApplicationsScreen';
import MyApplicationsScreen from '../screens/student/MyApplicationsScreen'; // New import

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="StudentHome" component={StudentHome} />
        <Stack.Screen name="AdminSignIn" component={AdminSignInScreen} />
        <Stack.Screen name="PostJob" component={PostJobScreen} />
        <Stack.Screen name="ApplyJob" component={ApplyJobScreen} />
        <Stack.Screen name="ViewPostedJobs" component={ViewPostedJobsScreen} />
        <Stack.Screen name="JobApplications" component={JobApplicationsScreen} />
        <Stack.Screen name="MyApplications" component={MyApplicationsScreen} /> {/* New screen */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
