import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardingScreen from './onboarding/screen/OnBoardingScreen';
import MainAppStack from './mainapp/MainAppStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../../contexts/UserProvider';
import TransitionScreen from '../TransitionScreen';

export type AuthStackParamList = {
  OnBoarding: undefined;
  MainAppStack: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthenticatedStack() {
 const {onBoarded, isOnBoardingChecking} = useUser()

 if (isOnBoardingChecking) return <TransitionScreen />
  
  return (
    <Stack.Navigator>
      {onBoarded ?
        <Stack.Screen name="MainAppStack" component={MainAppStack} options={{ headerShown: false }} /> :
        <Stack.Screen name="OnBoarding" component={OnBoardingScreen} options={{ headerShown: false }} /> 
      }
    </Stack.Navigator>
  );
}

export default AuthenticatedStack;
