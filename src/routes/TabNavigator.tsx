import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ROUTES } from './Routes';
// import Swipe from 'features/swipe/Swipe'
// import Accounts from 'features/accounts/Accounts'
// import UserSearching from 'features/userSearching/UserSearching'
// import Inbox from 'features/Inbox/Inbox'
// import Chat from 'features/chat/Chat'

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
    <Tab.Navigator>
        <Tab.Screen
            name={ROUTES.LOCATION.name}
            component={UserSearching}
            initialParams={ROUTES.LOCATION}
        />
        <Tab.Screen
            name={ROUTES.CHAT.name}
            component={Chat}
            initialParams={ROUTES.CHAT}
        />
        <Tab.Screen
            name={ROUTES.ACCOUNT.name}
            component={Accounts}
            initialParams={ROUTES.ACCOUNT}
        />
    </Tab.Navigator>
)

export default TabNavigator