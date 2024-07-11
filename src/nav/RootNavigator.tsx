import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthenticatedStack from './AuthenticatedStack/AuthenticatedStack'
import AuthStack from './AuthStack/AuthStack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useColors } from '../contexts/ColorContext'
import { useUser } from '../contexts/UserProvider'
import TransitionScreen from './TransitionScreen'

type AuthStackParamList = { 
    AuthStack: undefined;
    AuthenticatedStack: undefined;
  };
  
  const Stack = createNativeStackNavigator<AuthStackParamList>();

const RootNavigator = () => {
    const {theme} = useColors()
    const {user, isAuthenticating} = useUser()

    if (isAuthenticating) return <TransitionScreen />

  return (
    <View style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="AuthenticatedStack" component={AuthenticatedStack} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
    <StatusBar barStyle={theme === "dark" ? "light-content" : "dark-content"} />
  </View>
  )
}

export default RootNavigator

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });