import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/routes/RootNavigator';
import { NativeBaseProvider, theme } from 'native-base';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <SafeAreaView style={styles.container}>
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
