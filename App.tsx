import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// import RootNavigator from 'routes/RootNavigator';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaView>
        <Text>hey there</Text>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export default App;
