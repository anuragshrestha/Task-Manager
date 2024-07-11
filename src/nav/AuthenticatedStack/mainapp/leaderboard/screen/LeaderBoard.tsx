import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { collection, query, orderBy, limit, onSnapshot, where, doc } from 'firebase/firestore';
import { FIREBASE_DB, FIREBASE_AUTH } from "../../../../../firebase/FireBaseAuth";

type User = {
  id: string;
  name: string;
  completedTasks: number;
};

function LeaderBoard() {
  const [topUsers, setTopUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const user = FIREBASE_AUTH.currentUser;

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const q = query(
          collection(FIREBASE_DB, 'users'),
          orderBy('completedTasks', 'desc'),
          limit(10)
        );
        const unsubscribeTopUsers = onSnapshot(q, (querySnapshot) => {
          const users: User[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as User[];
          setTopUsers(users);
        });

        if (user) {
          const userDocRef = doc(FIREBASE_DB, "users", user.uid);
          const unsubscribeUser = onSnapshot(userDocRef, (doc) => {
            if (doc.exists()) {
              const userData = doc.data() as User;
              setCurrentUser(userData);
            }
          });

          return () => {
            unsubscribeTopUsers();
            unsubscribeUser();
          };
        }
      } catch (error) {
        console.error('Error fetching top users: ', error);
      }
    };

    fetchTopUsers();
  }, [user]);

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
      {currentUser && !topUsers.find(user => user.id === currentUser.id) && (
        <View style={styles.currentUserContainer}>
          <Text style={styles.userName}>{currentUser.name}</Text>
          <Text style={styles.userTasks}>{currentUser.completedTasks}</Text>
        </View>
      )}
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
  currentUserContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopColor: 'white',
    borderTopWidth: 1,
    backgroundColor: '#222',
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
    paddingBottom: 10,
  },
});

export default LeaderBoard;
