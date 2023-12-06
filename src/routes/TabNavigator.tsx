import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ROUTES } from './Routes';
// import Swipe from 'features/swipe/Swipe'
import Accounts from './../features/accounts/Accounts';
import UserSearching from './../features/userSearching/UserSearching';
// import Inbox from 'features/Inbox/Inbox'
import Chat from './../features/chat/Chat';
import Inbox from './../features/Inbox/Inbox';
import NewMatch from './../features/newMatch/NewMatch';
import Swipe from './../features/swipe/Swipe';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
    <Tab.Navigator>
        <Tab.Screen
            name={ROUTES.LOCATION.name}
            component={Swipe}
            initialParams={ROUTES.LOCATION}
        />
        <Tab.Screen
            name={ROUTES.CHAT.name}
            component={Inbox}
            initialParams={ROUTES.CHAT}
        />
        <Tab.Screen
            name={ROUTES.ACCOUNT.name}
            component={NewMatch}
            initialParams={ROUTES.ACCOUNT}
        />
    </Tab.Navigator>
)

export default TabNavigator