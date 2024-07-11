import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

function OnBoardingScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to your Task Manager</Text>
      <View style={styles.buttonText}>
        <Button
          title="Get Started"
          color="white"
          onPress={() => navigation.navigate("MainAppStack")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
    paddingBottom: 120,
  },
  welcomeText: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonText: {
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "black",
  },
});

export default OnBoardingScreen;
