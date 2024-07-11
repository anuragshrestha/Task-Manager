import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useRef } from "react";
import ScreenWrapper from "../../../../../components/ScreenWrappper";
import { useColors } from "../../../../../contexts/ColorContext";
import Icon from "react-native-vector-icons/FontAwesome";
import { signOut } from "firebase/auth";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../../../firebase/FireBaseAuth";
import { RootStackParamList } from "../../home/HomeStack";
import { onSnapshot, doc } from "firebase/firestore";

const AccountScreen = () => {
  const { colors } = useColors();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      const userDocRef = doc(FIREBASE_DB, "users", user.uid);
      unsubscribeRef.current = onSnapshot(userDocRef, (doc) => {
        // if (doc.exists()) {
        //   // Handle user data
        // }
      });
    }

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  const logOut = async () => {
    try {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
      await signOut(FIREBASE_AUTH);
      console.log("User logged out");
      navigation.navigate("SignIn");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <ScreenWrapper>
      <ScrollView>
        <Text style={[styles.profileText, { color: colors.primary_black }]}>
          Your Profile
        </Text>
        <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: 25 }}>
          <View style={styles.icon}>
            <Icon name="user" size={100} color={colors.primary_black} />
          </View>
          <View style={styles.borderContainer}>
            <Pressable
              style={({ pressed }: { pressed: boolean }) => [
                styles.buttonContainer,
                pressed && styles.pressed,
              ]}
              onPress={() => console.log("edit profile button is pressed")}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </Pressable>
          </View>
        </View>
        <View>
          <Pressable
            onPress={() => console.log(`navigating to Payment screen`)}
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
            onPress={() => console.log(`navigating to Subscriptions screen`)}
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
            onPress={() => console.log(`navigating to Settings screen`)}
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
            onPress={() => console.log(`navigating to Contact screen`)}
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
            onPress={() => console.log(`navigating to FeedBack screen`)}
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
  icon: {
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
