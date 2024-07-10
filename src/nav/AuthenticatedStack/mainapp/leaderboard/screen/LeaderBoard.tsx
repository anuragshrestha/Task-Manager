

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function LeaderBoard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Leader board screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default LeaderBoard;
