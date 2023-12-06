import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Button, Card, Heading, Input } from 'native-base'


const MESSAGE_HISTORY = [{
    sender: 'FIRST_USER',
    message: 'hello',
    name: 'SA'
}, {
    sender: 'SECOND_USER',
    message: 'hello sir, How can i help you',
    name: 'RJ'
}, {
    sender: 'SECOND_USER',
    message: 'hello sir, How can i help you',
    name: 'RJ'
}, {
    sender: 'SECOND_USER',
    message: 'hello sir, How can i help you',
    name: 'RJ'
}, {
    sender: 'FIRST_USER',
    message: 'hello',
    name: 'SA'
}]

enum MESSAGE_SENDER_TYPE {
    FIRST_USER = 'FIRST_USER',
    SECOND_USER = 'SECOND_USER',
}

const Chat = () => {
    const [messageInput, setMessageInput] = useState('')
    const [messageHistory, setMessageHistory] = useState(MESSAGE_HISTORY)

    const onMessageInputChange = useCallback((e: any) => {
        setMessageInput(e.target.value)
    }, [messageInput])

    const handleSendMessage = useCallback((e: any) => {
        setMessageHistory((prevMessageContent) => ([...prevMessageContent, {
            sender: 'FIRST_USER',
            message: messageInput,
            name: 'SA',
        }]))
    }, [messageInput, messageHistory])

    const getSenderName = (messageData: any) => (
        <View style={styles.senderNameContainer}>
            <Text>{messageData.name}</Text>
        </View>
    )

    const getMessageContent = (messageData: any) => (
        <Card style={styles.messageContentContainer}>
            <Text>{messageData.message}</Text>
        </Card>
    )

    const getFirstUserMessageView = (messageData: any) => (
        <View style={styles.firstUserContainer}>
            {getMessageContent(messageData)}
            {getSenderName(messageData)}
        </View>
    )

    const getSecondUserMessageView = (messageData: any) => (
        <View style={styles.secondUserContainer}>
            {getSenderName(messageData)}
            {getMessageContent(messageData)}
        </View>
    )

    const getMessageView = (messageData: any) => {
        switch (messageData.sender) {
            case MESSAGE_SENDER_TYPE.FIRST_USER:
                return getFirstUserMessageView(messageData)
            case MESSAGE_SENDER_TYPE.SECOND_USER:
                return getSecondUserMessageView(messageData)
                break;
            default:
                break;
        }
    }

    const getHeaderView = () => (
        <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
                <Text>Back {messageInput}</Text>
                <Heading>Nirav Rawell</Heading>
            </View>
            <Text style={styles.headerDisclaimer}>This Chat will end and deleted in 12 hours</Text>
        </View>
    )

    const getMessagesStackView = () => (
        <ScrollView contentContainerStyle={styles.messageStackContainer}>
            {messageHistory.map(getMessageView)}
        </ScrollView>
    )

    const getFooterView = () => (
        <View style={styles.footerContainer}>
            <Input value={messageInput} onChange={onMessageInputChange} style={styles.textInput} InputRightElement={<Button onPress={handleSendMessage} size="xs" w="1/6">send</Button>} />
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
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 24,
    },
    headerDisclaimer: {
        backgroundColor: '#d1d0d0',
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
        backgroundColor: '#D0A2F7',
        height: 48,
        width: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageContentContainer: {
        backgroundColor: '#F1EAFF',
        borderRadius: 10,
    }
})

export default Chat