import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { ROUTES } from './Routes';
import Accounts from './../features/accounts/Accounts';
import UserSearching from './../features/userSearching/UserSearching';
import Chat from './../features/chat/Chat';
import Inbox from './../features/Inbox/Inbox';
import NewMatch from './../features/newMatch/NewMatch';
import Swipe from './../features/swipe/Swipe';
import EditForm from './../features/editForm/EditForm';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function ConnectStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={ROUTES.SEARCHING_USER.name} component={UserSearching}></Stack.Screen>
            <Stack.Screen name={ROUTES.SWIPE_USER.name} component={Swipe}></Stack.Screen>
            <Stack.Screen name={ROUTES.USER_MATCH.name} component={NewMatch}></Stack.Screen>
        </Stack.Navigator>
    )
}

function MessageStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={ROUTES.INBOX.name} component={Inbox}></Stack.Screen>
            <Stack.Screen name={ROUTES.CHAT_SCREEN.name} component={Chat}></Stack.Screen>
        </Stack.Navigator>
    )
}

function AccountStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={ROUTES.USER_ACCOUNT.name} component={Accounts}></Stack.Screen>
            <Stack.Screen name={ROUTES.EDIT_USER_DETAILS.name} component={EditForm}></Stack.Screen>
        </Stack.Navigator>
    )
}


const TabNavigator = () => (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
            name={ROUTES.CONNECT_STACK.name}
            component={ConnectStackScreen}
            initialParams={ROUTES.CONNECT_STACK}
        />
        <Tab.Screen
            name={ROUTES.MESSAGE_STACK.name}
            component={MessageStackScreen}
            initialParams={ROUTES.MESSAGE_STACK}
        />
        <Tab.Screen
            name={ROUTES.ACCOUNT_STACK.name}
            component={AccountStackScreen}
            initialParams={ROUTES.ACCOUNT_STACK}
        />
    </Tab.Navigator>
)

export default TabNavigator;