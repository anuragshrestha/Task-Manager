// import React, { useCallback, useState } from "react";
// import {
//   ScrollView,
//   Text,
//   TextInput,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   Button,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import ScreenWrapper from "../../components/ScreenWrappper";
// import { LinearGradient } from "expo-linear-gradient";
// import Icon from "react-native-vector-icons/FontAwesome";
// import axios from 'axios';



// const SignUpScreen = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const navigation = useNavigation<any>();

//   const isValidName = (name: string) => /^[^\s@]{2,}/.test(name);
//   const isValidEmail = (email: string) =>
//     /^[^\s@]+@[^s@]{5}.[^/s@]{3}$/.test(email);
//   const isValidNumber = (number: string) => /^\d{10}$/.test(number);
//   const isValidPassword = (password: string) => /^[^s@]{6,}/.test(password);

 

//   const saveUserDetails = useCallback(async () => {
//      const userData = {
//       name: username,
//       email: email,
//       mobileNumber: phoneNumber,
//       password: password,
//      }

//      try{
//       await axios.post('https://lendven-37dcb-default-rtdb.firebaseio.com/lendven.json', userData);
//       navigation.navigate("LogIn");
//      } catch(error) {
//       console.log("error saving to list: ",  error);
//      }
    
//   }, [username, email, phoneNumber, password]);
// function createAccount(){
//   console.log("create account");
  
// }

//   return (
//     <ScreenWrapper>
//       <ScrollView contentContainerStyle={styles.container}>
//         <View style={styles.fontContainer}>
//           <Icon
//             name="user-circle"
//             size={20}
//             color="white"
//             style={styles.headerIcon}
//           />
//           <Text style={styles.welcomeText}>Create new account</Text>
//         </View>
//         <View style={styles.mainView}>
//           <Text style={styles.text}>Name</Text>
//           <View style={styles.inputContainer}>
//             <Icon name="user" size={20} color="black" style={styles.icon} />
//             <TextInput
//               style={styles.label}
//               placeholder="Enter your full name"
//               placeholderTextColor="grey"
//               value={username}
//               onChangeText={setUsername}
//             />
//           </View>
//           <Text style={styles.text}>Email address</Text>
//           <View style={styles.inputContainer}>
//             <Icon name="envelope" size={20} color="black" style={styles.icon} />
//             <TextInput
//               style={styles.label}
//               placeholder="Enter your email address"
//               placeholderTextColor="grey"
//               value={email}
//               onChangeText={(text: string) => setEmail(text.toLowerCase())}
//             />
//           </View>
//           <Text style={styles.text}>Password</Text>
//           <View style={styles.inputContainer}>
//             <Icon name="lock" size={20} color="black" style={styles.icon} />
//             <TextInput
//               style={styles.label}
//               placeholder="Enter password"
//               placeholderTextColor="grey"
//               value={password}
//               onChangeText={setPassword}
//             />
//           </View>
//           <LinearGradient
//             colors={["orange", "purple"]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.gradientButton}
//           >
//             <TouchableOpacity style={styles.button} onPress={createAccount}>
//               <Text style={styles.buttonText}>Create account</Text>
//             </TouchableOpacity>
//           </LinearGradient>
//         </View>
//         <View style={styles.row}>
//           <Text style={{ color: "grey" }}>Already have a account?</Text>
//           <TouchableOpacity
//             style={{ marginLeft: 8 }}
//             onPress={() => navigation.navigate("SignIn")}
//           >
//             <Text style={styles.loginText}>log in</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </ScreenWrapper>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 60,
//   },
//   welcomeText: {
//     fontSize: 24,
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   mainView: {
//     flex: 1,
//     justifyContent: "flex-start",
//     paddingTop: 40,
//     padding: 20,
//   },
//   text: {
//     fontSize: 26,
//     marginTop: 10,
//     paddingLeft: 5,
//     color: "white",
//   },
//   label: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: "white",
//     borderRadius: 8,
//   },
//   button: {
//     height: 28,
//     margin: 5,
//     width: "95%",
//   },
//   gradientButton: {
//     borderRadius: 6,
//     margin: 5,
//     width: "90%",
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 20,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   loginText: {
//     fontSize: 16,
//     color: "blue",
//     fontWeight: "bold",
//   },
//   row: {
//     paddingBottom: 20,
//     flexDirection: "row",
//     marginLeft: 70,
//     alignItems: "center",
//   },
//   icon: {
//     marginRight: 10,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "grey",
//     borderRadius: 8,
//     margin: 5,
//     paddingLeft: 10,
//     backgroundColor: "white",
//     width: "90%",
//   },
//   fontContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//     justifyContent: "center",
//     width: "80%",
//   },
//   headerIcon: {
//     marginRight: 10,
//   },
// });

// export default SignUpScreen;


import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebase/FireBaseAuth";
import ScreenWrapper from "../../components/ScreenWrappper";
import { useColors } from "../../contexts/ColorContext";

const SignUpScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation<any>();

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(FIREBASE_DB, "users", user.uid), {
        username: username,
        email: email,
        createdAt: new Date()
      });
      Alert.alert("Success", "Account created successfully");
      navigation.navigate("SignIn");
    } catch (error) {
      Alert.alert("Error");
    }
  };

  const { theme } = useColors();
  
  return (
    <ScreenWrapper>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.fontContainer}>
        <Icon name="user-circle" size={20} color="white" style={styles.headerIcon} />
        <Text style={styles.welcomeText}>Create new account</Text>
      </View>
      <View style={styles.mainView}>
        <Text style={styles.text}>Name</Text>
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="black" style={styles.icon} />
          <TextInput
            style={styles.label}
            placeholder="Enter your full name"
            placeholderTextColor="grey"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <Text style={styles.text}>Email address</Text>
        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="black" style={styles.icon} />
          <TextInput
            style={styles.label}
            placeholder="Enter your email address"
            placeholderTextColor="grey"
            value={email}
            onChangeText={(text: string) => setEmail(text.toLowerCase())}
          />
        </View>
        <Text style={styles.text}>Password</Text>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="black" style={styles.icon} />
          <TextInput
            style={styles.label}
            placeholder="Enter password"
            placeholderTextColor="grey"
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <LinearGradient
          colors={["orange", "purple"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientButton}
        >
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Create account</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View style={styles.row}>
        <Text style={{ color: "grey" }}>Already have a account?</Text>
        <TouchableOpacity
          style={{ marginLeft: 8 }}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.loginText}>log in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    <StatusBar barStyle={theme !== "dark" ? "light-content" : "dark-content"} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  welcomeText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  mainView: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 40,
    padding: 20,
  },
  text: {
    fontSize: 26,
    marginTop: 10,
    paddingLeft: 5,
    color: "white",
  },
  label: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
  },
  button: {
    height: 28,
    margin: 5,
    width: "95%",
  },
  gradientButton: {
    borderRadius: 6,
    margin: 5,
    width: "90%",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  loginText: {
    fontSize: 16,
    color: "blue",
    fontWeight: "bold",
  },
  row: {
    paddingBottom: 20,
    flexDirection: "row",
    marginLeft: 70,
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 8,
    margin: 5,
    paddingLeft: 10,
    backgroundColor: "white",
    width: "90%",
  },
  fontContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "center",
    width: "80%",
  },
  headerIcon: {
    marginRight: 10,
  },
});

export default SignUpScreen;
