import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/routes/RootNavigator';
import { NativeBaseProvider } from 'native-base';
import { theme } from './src/theme';
import { UseAuthProvider } from './src/hooks/useAuth';
import { UseUserDataProvider } from './src/hooks/useUserData';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <SafeAreaView style={styles.container}>
          <UseAuthProvider>
            <UseUserDataProvider>
              <RootNavigator />
            </UseUserDataProvider>
          </UseAuthProvider>
        </SafeAreaView>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white'
  },
});

export default App;
