import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './home/HomeStack';
import LeaderBoard from './leaderboard/screen/LeaderBoard';
import ProfileScreen from './profile/screen/ProfileScreen';



export type MainTabParamList = {
  HomeStack: undefined;
  LeaderBoard: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainAppStack(){
  return (
    <Tab.Navigator>
      <Tab.Screen  name="HomeStack" component={HomeStack} options={{headerShown: false,  title: 'Home'}}/>
      <Tab.Screen name="LeaderBoard" component={LeaderBoard}  options={{headerShown: false}}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}} />
    </Tab.Navigator>
  );
};

export default MainAppStack;
