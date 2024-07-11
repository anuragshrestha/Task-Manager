import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, Task } from "../HomeStack"; 
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../../../../firebase/FireBaseAuth";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "EditTask">;

const EditTaskScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp>();
  const { task } = route.params as { task: Task };

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = async () => {
    try {
      const taskDocRef = doc(FIREBASE_DB, "tasks", task.id);
      await updateDoc(taskDocRef, {
        title,
        description,
      });
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.error("Error updating task: ", error);
      Alert.alert("Error", "Failed to update task");
    }
  };

  const handleDelete = async () => {
    try {
      const taskDocRef = doc(FIREBASE_DB, "tasks", task.id);
      await deleteDoc(taskDocRef);
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.error("Error deleting task: ", error);
      Alert.alert("Error", "Failed to delete task");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task title"
      />
      <Text style={styles.label1}>Description</Text>
      <TextInput
        style={styles.input1}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter task description"
        multiline
      />
      <View style={styles.buttonRow}>
        <Pressable
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    paddingTop: 60,
    padding: 8,
  },
  label1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    padding: 8,
    paddingTop: 28,
  },
  input: {
    fontSize: 16,
    padding: 8,
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  input1: {
    fontSize: 16,
    padding: 8,
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    height: "20%",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    
  },
  button: {
      padding: 10,
    backgroundColor: "blue",
    borderRadius: 8,
    marginHorizontal: 10,
    minWidth: 100,
  },
  deleteButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default EditTaskScreen;
