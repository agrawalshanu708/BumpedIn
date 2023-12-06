import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/routes/RootNavigator';
import { NativeBaseProvider } from 'native-base';

// import RootNavigator from 'routes/RootNavigator';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <SafeAreaView style={styles.container}>
          {/* <Text>hey there</Text> */}
          <RootNavigator />
        </SafeAreaView>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export default App;
