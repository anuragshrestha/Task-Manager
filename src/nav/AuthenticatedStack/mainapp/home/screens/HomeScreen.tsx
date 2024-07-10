import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button,
  TextInput,
  Alert,
  StatusBar,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../HomeStack";
import { useColors } from "../../../../../contexts/ColorContext";

type Task = {
  id: string;
  title: string;
  description: string;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "HomeScreen"
>;

const HomeScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Task 1", description: "Description 1" },
    { id: "2", title: "Task 2", description: "Description 2" },
    { id: "3", title: "Task 3", description: "Description 3" },
  ]);

  const navigation = useNavigation<NavigationProp>();

  const handleEditTask = (id: string) => {
    Alert.alert("Edit Task", `Editing task with ID: ${id}`);
    // You can add functionality to edit the task here
  };

  const renderTask = ({ item }: { item: Task }) => (
    <TouchableOpacity
      style={styles.task}
      onPress={() => handleEditTask(item.id)}
    >
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskDescription}>{item.description}</Text>
    </TouchableOpacity>
  );
  const { theme } = useColors();
  return (
    <View style={styles.container}>
      {/* <View>
        will show pie char here 
      </View> */}
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
          padding: 30,
          paddingTop: 70,
        }}
      >
        Your Tasks
      </Text>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.taskStyle}
      />
      <Pressable
          onPress={() => navigation.navigate("AddTask")}
          style={({ pressed }: { pressed: boolean }) => [
            styles.addButtonContainer,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.addButtonText}>Add Task</Text>
        </Pressable>
      <StatusBar
        barStyle={theme !== "dark" ? "light-content" : "dark-content"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "darkblue",
  },
  taskStyle: {
    padding: 16,
  },
  task: {
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 8,
    borderRadius: 8,
    elevation: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
  },
  addButtonContainer: {
   marginBottom: 15,
    marginLeft: 280,
    marginRight: 10,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "white",
  },
  addButtonText: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
    textAlign: 'center'
  }
});

export default HomeScreen;
