/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// src/App.tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import UserScreen from './src/screens/UserScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <UserScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
