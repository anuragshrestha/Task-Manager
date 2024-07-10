import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, StatusBar, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure you have react-native-vector-icons installed
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../HomeStack';
import { useColors } from '../../../../../contexts/ColorContext';


type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

const AddTaskScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation<NavigationProp>();

  const  saveTask= () => {
    console.log('Task added:', { title, description });
  };

  const { theme } = useColors();
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")} style={styles.backButton}>
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
        <Pressable
          onPress={() => saveTask()}
          style={({ pressed }: { pressed: boolean }) => [
            styles.addButtonContainer,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.addButtonText}>Save Task</Text>
        </Pressable>
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
    backgroundColor: 'lightwhite',
    paddingTop: 20,
  },
  backButton: {
    marginBottom: 16,
    paddingTop: 30,
  },
  pressed:{
    opacity: 0.2
  },
  label: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: 'bold',
    padding: 5,
  },
  input: {
    fontSize: 16,
    padding: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
  },
  descriptionInput:{
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
    padding: 8,
    textAlignVertical: 'top',
    height: 160, 
  },
  addButtonContainer: {
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "black",
    padding: 10,
    width: '40%', 
    marginLeft: 120,
    margin: 10
     
   },
   addButtonText: {
     color: "black",
     fontSize: 20,
     fontWeight: "bold",
     textAlign: 'center'
   }
});

export default AddTaskScreen;
