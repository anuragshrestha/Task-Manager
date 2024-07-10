import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardingScreen from './onboarding/screen/OnBoardingScreen';
import MainAppStack from './mainapp/MainAppStack';

export type AuthStackParamList = {
  OnBoarding: undefined;
  MainAppStack: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthenticatedStack() {
  return (
    <Stack.Navigator initialRouteName="OnBoarding">
      <Stack.Screen name="OnBoarding" component={OnBoardingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MainAppStack" component={MainAppStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default AuthenticatedStack;
