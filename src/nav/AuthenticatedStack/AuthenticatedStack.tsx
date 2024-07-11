import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardingScreen from './onboarding/screen/OnBoardingScreen';
import MainAppStack from './mainapp/MainAppStack';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AuthStackParamList = {
  OnBoarding: undefined;
  MainAppStack: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthenticatedStack() {
  const [onBoarded, setOnBoarded] = useState(false)
  const user = "test"

  useEffect(() => {
    const getOnBoardingStatus = async () => {
      if (!user) return null
    const status = await AsyncStorage.getItem(user)
    if (!!status) setOnBoarded(true)
    }
    getOnBoardingStatus()
  }, [user])
  
  return (
    <Stack.Navigator>
        <Stack.Screen name="MainAppStack" component={MainAppStack} options={{ headerShown: false }} /> 
        <Stack.Screen name="OnBoarding" component={OnBoardingScreen} options={{ headerShown: false }} /> 
    </Stack.Navigator>
  );
}

export default AuthenticatedStack;
