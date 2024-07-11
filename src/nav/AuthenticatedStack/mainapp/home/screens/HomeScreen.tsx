import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Pressable,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../HomeStack";
import { useColors } from "../../../../../contexts/ColorContext";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  FIREBASE_AUTH,
  FIREBASE_DB,
} from "../../../../../firebase/FireBaseAuth";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "HomeScreen"
>;

const HomeScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<number>(0);
  const navigation = useNavigation<NavigationProp>();
  const user = FIREBASE_AUTH.currentUser;

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const userDocRef = doc(FIREBASE_DB, "users", user.uid);
          const unsubscribeUser = onSnapshot(userDocRef, (doc) => {
            if (doc.exists()) {
              const userData = doc.data() as FirestoreUser;
              setCompletedTasks(userData?.completedTasks || 0);
            }
          });

          return () => unsubscribeUser();
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      };

      fetchUserData();

      const q = query(
        collection(FIREBASE_DB, "tasks"),
        where("userId", "==", user.uid)
      );
      const unsubscribeTasks = onSnapshot(q, (querySnapshot) => {
        const tasksList: Task[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Task[];
        setTasks(tasksList);
      });

      return () => {
        unsubscribeTasks();
      };
    }
  }, [user]);

  const handleToggleTaskStatus = async (taskId: string, currentStatus: string) => {
    try {
      const taskDocRef = doc(FIREBASE_DB, "tasks", taskId);
      const newStatus = currentStatus === "Completed" ? "Not Completed" : "Completed";

      await updateDoc(taskDocRef, { status: newStatus });
      if (newStatus === "Completed") {
        await updateDoc(doc(FIREBASE_DB, "users", user!.uid), {
          completedTasks: completedTasks + 1,
        });
      } else {
        await updateDoc(doc(FIREBASE_DB, "users", user!.uid), {
          completedTasks: completedTasks - 1,
        });
      }
    } catch (error) {
      console.error("Error updating task status: ", error);
    }
  };

  const handleEditTask = (task: Task) => {
    navigation.navigate("EditTask", { task });
  };

  const renderTask = ({ item }: { item: Task }) => (
    <TouchableOpacity style={styles.task} onPress={() => handleEditTask(item)}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <View style={styles.statusContainer}>
        <Text style={styles.taskStatus}>
          Status: {item.status}
        </Text>
        <Switch
          value={item.status === "Completed"}
          onValueChange={() => handleToggleTaskStatus(item.id, item.status)}
        />
      </View>
      <Text style={styles.taskDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  const { theme } = useColors();

  return (
    <View style={styles.container}>
      <Text style={styles.taskText}>All Tasks</Text>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.taskStyle}
      />
      <Pressable
        onPress={() => navigation.navigate("AddTask")}
        style={({ pressed }) => [
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
  userName: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    padding: 20,
    paddingTop: 80,
  },
  taskStyle: {
    padding: 12,
  },
  task: {
    padding: 12,
    backgroundColor: "#fff",
    marginBottom: 8,
    borderRadius: 8,
    elevation: 1,
  },
  taskText: {
    color: "green",
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
    marginLeft: 10,
    paddingTop: 80,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 5,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  taskStatus: {
    fontSize: 14,
    color: "#666",
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
  },
  addButtonContainer: {
    marginBottom: 10,
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
    textAlign: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});

export default HomeScreen;

export type Task = {
  status: string;
  id: string;
  title: string;
  description: string;
};

export type FirestoreUser = {
  completedTasks: number;
  uid: string;
  name: string;
};
