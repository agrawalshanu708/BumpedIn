import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ROUTES } from './Routes';
import WelcomeScreen from './../features/welcomeScreen/WelcomeScreen';
import LoginError from './../features/loginError/LoginError';
// import Form from 'features/form/Form';
// import ProfileInfo from 'features/profileInfo/ProfileInfo';
// import TabNavigator from './TabNavigator';
// import EditForm from 'features/editForm/EditForm';
// import NewMatch from 'features/newMatch/NewMatch';

const Stack = createStackNavigator();

const RootNavigator = () => (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}>
        <Stack.Screen
            name={ROUTES.WELCOME.name}
            component={WelcomeScreen}>
        </Stack.Screen>
        <Stack.Screen name={ROUTES.LOGIN_ERROR.name} component={LoginError}></Stack.Screen>
        {/* <Stack.Screen name={ROUTES.FORM.name} component={Form}></Stack.Screen>
        <Stack.Screen name={ROUTES.PROFILE_VIEW.name} component={ProfileInfo}></Stack.Screen>
        <Stack.Screen name={ROUTES.TAB_NAVIGATOR_ROOT.name} component={TabNavigator}></Stack.Screen>
        <Stack.Screen name={ROUTES.EDIT_FORM.name} component={EditForm}></Stack.Screen>
        <Stack.Screen name={ROUTES.MATCH_SUCCESS.name} component={NewMatch}></Stack.Screen> */}
    </Stack.Navigator>
);

export default RootNavigator;
