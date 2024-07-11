// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, FlatList } from 'react-native';
// import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
// import { FIREBASE_DB } from "../../../../../firebase/FireBaseAuth"; // Adjust the path as needed

// type User = {
//   id: string;
//   name: string;
//   completedTasks: number;
// };

// function LeaderBoard() {
//   const [topUsers, setTopUsers] = useState<User[]>([]);

//   useEffect(() => {
//     const fetchTopUsers = async () => {
//       try {
//         const q = query(
//           collection(FIREBASE_DB, 'users'),
//           orderBy('completedTasks', 'desc'),
//           limit(10)
//         );
//         const querySnapshot = await getDocs(q);
//         const users: User[] = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         })) as User[];
//         setTopUsers(users);
//       } catch (error) {
//         console.error('Error fetching top users: ', error);
//       }
//     };

//     fetchTopUsers();
//   }, []);

//   const renderUser = ({ item }: { item: User }) => (
//     <View style={styles.userContainer}>
//       <Text style={styles.userName}>{item.name}</Text>
//       <Text style={styles.userTasks}>{item.completedTasks}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.headerText}>Leaderboard</Text>
//       <FlatList
//         data={topUsers}
//         renderItem={renderUser}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.listContainer}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     backgroundColor: 'black',
//     paddingTop: 20,
//   },
//   headerText: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: 'white',
//     paddingVertical: 70,
//     textAlign: 'center',
//   },
//   listContainer: {
//     width: '100%',
//     paddingHorizontal: 20,
//   },
//   userContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderBottomColor: '#ccc',
//     borderBottomWidth: 1,
//     width: '100%',
//   },
//   userName: {
//     fontSize: 18,
//     color: 'white',
//   },
//   userTasks: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'white',
//   },
// });

// export default LeaderBoard;


import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from "../../../../../firebase/FireBaseAuth"; // Adjust the path as needed

type User = {
  id: string;
  name: string;
  completedTasks: number;
};

function LeaderBoard() {
  const [topUsers, setTopUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const q = query(
          collection(FIREBASE_DB, 'users'),
          orderBy('completedTasks', 'desc'),
          limit(10)
        );
        const querySnapshot = await getDocs(q);
        const users: User[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as User[];
        setTopUsers(users);
      } catch (error) {
        console.error('Error fetching top users: ', error);
      }
    };

    fetchTopUsers();
  }, []);

  const renderUser = ({ item }: { item: User }) => (
    <View style={styles.userContainer}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userTasks}>{item.completedTasks}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Leaderboard</Text>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.label}>Completed Tasks</Text>
      </View>
      <FlatList
        data={topUsers}
        renderItem={renderUser}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'black',
    paddingTop: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    paddingVertical: 70,
    textAlign: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  listContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'grey',
  },
  userName: {
    fontSize: 18,
    color: 'white',
  },
  userTasks: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default LeaderBoard;
