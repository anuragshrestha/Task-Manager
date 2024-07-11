import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './home/HomeStack';
import LeaderBoard from './leaderboard/screen/LeaderBoard';
import ProfileScreen from './profile/screen/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

export type MainTabParamList = {
  HomeStack: undefined;
  LeaderBoard: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainAppStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#000',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'HomeStack') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'LeaderBoard') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="LeaderBoard"
        component={LeaderBoard}
        options={{ title: 'LeaderBoard' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

export default MainAppStack;
