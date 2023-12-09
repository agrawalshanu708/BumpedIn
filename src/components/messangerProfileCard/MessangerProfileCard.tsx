import { StyleSheet, View } from 'react-native'
import React, { useCallback } from 'react'
import { Button, Card, CircleIcon, Text } from 'native-base'
import { ROUTES } from './../../routes/Routes'
import { SIZE } from '../../enums';

const MessangerProfileCard = ({ navigation }: { navigation: any }) => {

    const handleChatPress = useCallback(() => {
        navigation.navigate(ROUTES.CHAT_SCREEN.name)
    }, [navigation])

    const getContentView = () => (
        <View style={styles.contentContainer}>
            <Text fontWeight={600} fontSize={SIZE.MD}>Shanu Agrawal</Text>
            <Text fontWeight={600} fontSize={SIZE.MD}>ISB PGP CLASS OF 2009</Text>
            <Text color={'gray.600'} fontSize={SIZE.MD}>Chief Expendable officer</Text>
            <Text color={'gray.600'} fontSize={SIZE.MD}>Bankrupt Unicorn, Inc.</Text>
        </View>
    )

    const getMessageTime = () => (
        <Text fontWeight={600} fontSize={SIZE.MD} style={styles.messageTimeText} >11h</Text>
    )

    const getOnlineStatus = () => (
        <CircleIcon size="3" mt="0.5" color={'primary.900'} />
    )

    return (
        <Button backgroundColor={'primary.100'} onPress={handleChatPress} style={styles.container}>
            {getContentView()}
            {getMessageTime()}
            {getOnlineStatus()}
        </Button>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    contentContainer: {
        borderWidth: 1,
    },
    messageTimeText: {
        justifyContent: 'center',
    }
});

export default MessangerProfileCard;
