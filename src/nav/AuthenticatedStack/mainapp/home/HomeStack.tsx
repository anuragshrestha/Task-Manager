
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen, { Task } from './screens/HomeScreen';
import AddScreen from './screens/AddTaskScreen';
// import EditTaskScreen from './screens/EditTaskScreen';

export type RootStackParamList = {
  HomeScreen: undefined;
  AddTask: undefined;
  EditTask: { task: Task };
  SignIn: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();


function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen}  options={{headerShown: false}}/>
      <Stack.Screen name="AddTask" component={AddScreen}  options={{headerShown: false}}/>
      {/* <Stack.Screen
        name="EditTask"
        component={EditTaskScreen}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
   
  );
};

export default HomeStack;
