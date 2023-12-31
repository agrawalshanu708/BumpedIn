import { Button, FlatList, StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { firebase } from '@react-native-firebase/database'
import { ListItem } from '@rneui/themed';

import MessangerProfileCard from './../../components/messangerProfileCard/MessangerProfileCard'
import { CircleIcon, Text } from 'native-base'
import { SIZE } from '../../enums'
import { UserDataType } from '../../services/type'
import { Use } from 'react-native-svg';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../routes/Routes';

const Inbox = ({ navigation }: { navigation: any }) => {

    const { userData } = useAuth();
    const [matchUsers, setMatchUsers] = useState([])

    const getMatchUsers = () => {
        console.log('gett match users....', userData)
        firebase
            .app()
            .database(
                'https://bumpedin-8bcea-default-rtdb.asia-southeast1.firebasedatabase.app/',
            )
            .ref(`/chatList/${userData._id}`)
            .on('value', snapshot => {
                console.log('chat list data: ', Object.values(snapshot.val()));
                Object.keys(snapshot.val()).length !== 0 && setMatchUsers(Object.values(snapshot.val()))
            });
    }

    useEffect(() => {
        getMatchUsers()
    }, [])

    const handleChatHandler = useCallback((selectedUser) => {
        navigation.navigate(ROUTES.CHAT_SCREEN.name, selectedUser)
    }, [])


    const getContentView = (item: UserDataType) => (
        <View style={styles.contentContainer}>
            <Text fontWeight={600} fontSize={SIZE.MD}>{item.firstName} {item.lastName}</Text>
            <Text fontWeight={600} fontSize={SIZE.MD}>{item.cohort}</Text>
            {item.designation && <Text color={'gray.600'} fontSize={SIZE.MD}>{item.designation}</Text>}
            {item.organization && <Text color={'gray.600'} fontSize={SIZE.MD}>{item.organization}</Text>}
        </View>
    )

    const getMessageTime = () => (
        <Text fontWeight={600} fontSize={SIZE.MD} style={styles.messageTimeText} >11h</Text>
    )

    const getOnlineStatus = () => (
        <CircleIcon size="3" mt="0.5" color={'primary.900'} />
    )

    const renderItem = ({ item }) => (
        <ListItem
            onPress={() => handleChatHandler(item)}
            style={styles.cardWrapper}>
            {getContentView(item)}
            {getMessageTime()}
            {getOnlineStatus()}
        </ListItem>
    );

    return (
        <FlatList
            style={styles.container}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            data={matchUsers}
            renderItem={renderItem}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    cardWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        borderWidth: 1,
        padding: 10,
        marginTop: 4,
    },
    contentContainer: {
        flex: 1
    },
    messageTimeText: {
        justifyContent: 'center',
    }
})

export default Inbox
