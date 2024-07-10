import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthenticatedStack from "./src/nav/AuthenticatedStack/AuthenticatedStack";
import SignInScreen from "./src/nav/AuthStack/SignIn";
import SignUpScreen from "./src/nav/AuthStack/SignUp";
import { ColorContextProvider, useColors } from "./src/contexts/ColorContext";
import { StatusBar, View, StyleSheet } from "react-native";
import AuthStack from "./src/nav/AuthStack/AuthStack";

type AuthStackParamList = { 
  AuthStack: undefined;
  AuthenticatedStack: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

function App() {
  const { theme } = useColors();

  return (
    <ColorContextProvider>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="AuthenticatedStack"
              component={AuthenticatedStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AuthStack"
              component={AuthStack}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar barStyle={theme === "dark" ? "light-content" : "dark-content"} />
      </View>
    </ColorContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
