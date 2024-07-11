import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import ScreenWrapper from "../../../../../components/ScreenWrappper";
import { useColors } from "../../../../../contexts/ColorContext";
import Icon from "react-native-vector-icons/FontAwesome";
import { signOut } from "firebase/auth";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../../../../firebase/FireBaseAuth";
import { RootStackParamList } from "../../home/HomeStack";

const AccountScreen = () => {
  const { colors } = useColors();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  function editProfileButton() {
    console.log("edit profile button is pressed");
  }

  const logOut = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      console.log("User logged out");
      navigation.navigate("SignIn"); 
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  function navigateScreen(screen: string) {
    console.log(`navigating to ${screen} screen`);
  }

  return (
    <ScreenWrapper>
      <ScrollView>
        <Text style={[styles.profileText, { color: colors.primary_black }]}>
          Your Profile
        </Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 25,
          }}
        >
          <View
            style={styles.icon}
          >
            <Icon name="user" size={100} color={colors.primary_black} />
          </View>
          <View style={styles.borderContainer}>
            <View />
            <Pressable
              style={({ pressed }: { pressed: boolean }) => [
                styles.buttonContainer,
                pressed && styles.pressed,
              ]}
              onPress={editProfileButton}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </Pressable>
          </View>
        </View>

        <View>
          <Pressable
            onPress={() => navigateScreen("Payment")}
            style={({ pressed }: { pressed: boolean }) => [
              styles.menuItem,
              pressed && styles.pressed,
            ]}
          >
            <Text style={[{ color: colors.primary_black }, styles.menuText]}>
              Tasks Records
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigateScreen("Subscriptions")}
            style={({ pressed }: { pressed: boolean }) => [
              styles.menuItem,
              pressed && styles.pressed,
            ]}
          >
            <Text style={[{ color: colors.primary_black }, styles.menuText]}>
              Plan new Task
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigateScreen("Settings")}
            style={({ pressed }: { pressed: boolean }) => [
              styles.menuItem,
              pressed && styles.pressed,
            ]}
          >
            <Text style={[{ color: colors.primary_black }, styles.menuText]}>
              Settings
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigateScreen("Contact")}
            style={({ pressed }: { pressed: boolean }) => [
              styles.menuItem,
              pressed && styles.pressed,
            ]}
          >
            <Text style={[{ color: colors.primary_black }, styles.menuText]}>
              Contact us
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigateScreen("FeedBack")}
            style={({ pressed }: { pressed: boolean }) => [
              styles.menuItem,
              pressed && styles.pressed,
            ]}
          >
            <Text style={[{ color: colors.primary_black }, styles.menuText]}>
              Send feedback
            </Text>
          </Pressable>
        </View>
        <Pressable
        onPress={logOut}
          style={({ pressed }: { pressed: boolean }) => [
            styles.logOutItem,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.logout}>Log out</Text>
        </Pressable>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  profileText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 5,
  },
  icon:{
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  borderContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
    position: "relative",
    paddingBottom: 10,
  },
  buttonContainer: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 8,
    zIndex: 1,
  },
  buttonText: {
    color: "blue",
    fontSize: 16,
    fontWeight: "bold",
  },
  menuItem: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    width: "100%",
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  logout: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  logOutItem: {
    borderWidth: 1,
    backgroundColor: "red",
    paddingVertical: 5,
    width: "25%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
    marginLeft: 130,
  },
  pressed: {
    opacity: 0.7,
  },
});

export default AccountScreen;
