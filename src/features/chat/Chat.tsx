import { ScrollView, StyleSheet, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, Heading, Input, Text } from 'native-base'
import { SIZE } from '../../enums'
import { useAuth } from '../../hooks/useAuth'
import { firebase } from '@react-native-firebase/database'

type MESSAGE_DATA_TYPE = {
    roomId?: string,
    from?: string,
    to?: string,
    message?: string,
}

const Chat = ({ navigation, route }) => {
    const { params: selectedUserData } = route
    const { userData } = useAuth();

    const [messageInput, setMessageInput] = useState('')
    const [messageHistory, setMessageHistory] = useState<MESSAGE_DATA_TYPE[]>([])

    useEffect(() => {
        const onChildAdd = firebase
            .app()
            .database('https://bumpedin-8bcea-default-rtdb.asia-southeast1.firebasedatabase.app/')
            .ref(`/messaging/${selectedUserData.roomId}`)
            .on('child_added', snapshot => {
                console.log('A new node has been added', snapshot.val());
                setMessageHistory((prevState) => [...prevState, snapshot.val()])
            });

        // Stop listening for updates when no longer required
        return () => firebase
            .app()
            .database('https://bumpedin-8bcea-default-rtdb.asia-southeast1.firebasedatabase.app/')
            .ref(`/messaging/${selectedUserData.roomId}`)
            .off('child_added', onChildAdd);
    }, []);

    const onMessageInputChange = (value) => {
        setMessageInput(value)
    }

    const handleSendMessage = useCallback((e: any) => {
        let messageData = {
            roomId: selectedUserData.roomId,
            message: messageInput,
            from: userData?._id,
            to: selectedUserData._id,
        }

        const newReference = firebase
            .app()
            .database('https://bumpedin-8bcea-default-rtdb.asia-southeast1.firebasedatabase.app/')
            .ref(`/messaging/${selectedUserData.roomId}`)
            .push();

        console.log('Auto generated key: ', newReference.key);
        messageData.id = newReference.key

        newReference
            .set(messageData)
            .then(() => {
                setMessageInput('')
            });

    }, [messageInput])

    const getSenderName = (messageData: any) => (
        <Card backgroundColor={messageData.from === userData._id ? 'primary.900' : 'gray.500'} style={styles.senderNameContainer}>
            <Text color={'white'}>{messageData.name}</Text>
        </Card>
    )

    const getMessageContent = (messageData: any) => (
        <Card style={styles.messageContentContainer}>
            <Text>{messageData.message}</Text>
        </Card>
    )

    const getFirstUserMessageView = (messageData: any) => (
        <Card style={styles.firstUserContainer}>
            {getMessageContent(messageData)}
            {getSenderName(messageData)}
        </Card>
    )

    const getSecondUserMessageView = (messageData: any) => (
        <View style={styles.secondUserContainer}>
            {getSenderName(messageData)}
            {getMessageContent(messageData)}
        </View>
    )

    const getMessageView = (messageData: MESSAGE_DATA_TYPE) => {
        if (messageData.from === userData._id) {
            return getFirstUserMessageView(messageData)
        } else {
            return getSecondUserMessageView(messageData)
        }
    }

    const getHeaderView = () => (
        <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
                <Heading fontWeight={600} size={SIZE.LG} style={styles.senderName}>{selectedUserData.firstName} {selectedUserData.lastName}</Heading>
            </View>
            <Card padding={2} backgroundColor={'gray.400'} style={styles.headerDisclaimer}>This Chat will end and deleted in 12 hours</Card>
        </View>
    )

    const getMessagesStackView = () => (
        <ScrollView contentContainerStyle={styles.messageStackContainer}>
            {messageHistory.map(getMessageView)}
        </ScrollView>
    )

    const getFooterView = () => (
        <View style={styles.footerContainer}>
            <Input value={messageInput} onChangeText={onMessageInputChange} style={styles.textInput} InputRightElement={<Button backgroundColor={'primary.900'} onPress={handleSendMessage} size="xs" w="1/6">send</Button>}
            />
        </View>
    )


    return (
        <View style={styles.container}>
            {getHeaderView()}
            {getMessagesStackView()}
            {getFooterView()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 6,
        paddingVertical: 6,
    },
    headerContainer: {
    },
    headerContent: {
        alignItems: 'center',
    },
    senderName: {
        textAlign: 'center',
    },
    headerDisclaimer: {
        paddingVertical: 6,
        textAlign: 'center',
    },
    messageStackContainer: {
        flex: 1,
        paddingVertical: 12,
        flexGrow: 1,
        justifyContent: 'flex-end',
        rowGap: 12
    },
    footerContainer: {
    },
    textInput: {
    },
    sendCta: {
    },
    firstUserContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        columnGap: 6,
        alignItems: 'center'
    },
    secondUserContainer: {
        flexDirection: 'row',
        columnGap: 6,
        alignItems: 'center'
    },
    senderNameContainer: {
        height: 48,
        width: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageContentContainer: {
        borderRadius: 10,
        backgroundColor: '#ffff'
    }
})

export default Chat