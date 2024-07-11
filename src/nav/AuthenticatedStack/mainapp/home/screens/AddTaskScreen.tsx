import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../HomeStack";
import { useColors } from "../../../../../contexts/ColorContext";
import {
  FIREBASE_AUTH,
  FIREBASE_DB,
} from "../../../../../firebase/FireBaseAuth";
import { addDoc, Timestamp, collection } from "firebase/firestore";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "HomeScreen"
>;

const AddTaskScreen: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigation = useNavigation<NavigationProp>();
  const user = FIREBASE_AUTH.currentUser;
  const { theme } = useColors();

  const saveTask = async () => {
    if (user) {
      try {
        await addDoc(collection(FIREBASE_DB, "tasks"), {
          userId: user.uid,
          title,
          description,
          createdAt: Timestamp.fromDate(new Date()),
        });
        console.log("Task added:", { title, description });
        navigation.navigate("HomeScreen");
      } catch (error) {
        console.log("Error while adding task: ", error);
      }
    }
  };

  const deleteTask = () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen")}
        style={styles.backButton}
      >
        <Icon name="arrow-left" size={20} color="black" />
      </TouchableOpacity>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task title"
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.descriptionInput}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter task description"
        multiline
      />
      <View style={styles.buttonRow}>
        <Pressable
          onPress={() => deleteTask()}
          style={({ pressed }) => [
            styles.button, styles.buttonbackground1,
            pressed && styles.pressed, 
          ]}
        >
          <Text style={styles.buttonText}>Cancel Task</Text>
        </Pressable>
        <Pressable
          onPress={() => saveTask()}
          style={({ pressed }) => [
            styles.button, styles.buttonbackground2,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.buttonText}>Save Task</Text>
        </Pressable>
      </View>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "lightwhite",
    paddingTop: 20,
  },
  backButton: {
    marginBottom: 16,
    paddingTop: 30,
  },
  pressed: {
    opacity: 0.2,
  },
  label: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: "bold",
    padding: 5,
  },
  input: {
    fontSize: 16,
    padding: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 1,
  },
  descriptionInput: {
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 1,
    padding: 8,
    textAlignVertical: "top",
    height: 160,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "black",
    padding: 10,
    width: "45%",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonbackground1:{
     backgroundColor: 'red'
  },
  buttonbackground2:{
    backgroundColor: 'blue'
 }
});

export default AddTaskScreen;
