import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CircleIcon } from 'native-base'

const MessangerProfileCard = () => {

    const getNameView = () => (
        <Text>Shanu Agrawal</Text>
    )

    const getBatchContentView = () => (
        <Text>ISB PGP CLASS OF 2009</Text>
    )

    const getDesignationView = () => (
        <View>
            <Text>Chief Expendable officer</Text>
            <Text>Bankrupt Unicorn, Inc.</Text>
        </View>
    )

    const getContentView = () => (
        <View style={styles.contentContainer}>
            {getNameView()}
            {getBatchContentView()}
            {getDesignationView()}
        </View>
    )

    const getMessageTime = () => (
        <Text style={styles.messageTimeText} >11h</Text>
    )

    const getOnlineStatus = () => (
        <CircleIcon size="3" mt="0.5" color="emerald.500" />
    )

    return (
        <View style={styles.container}>
            {getContentView()}
            {getMessageTime()}
            {getOnlineStatus()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#E0F4FF',
        flexDirection: 'row',
        columnGap: 10,
    },
    contentContainer: {
        flex: 1
    },
    messageTimeText: {
        justifyContent: 'center',
    }
})

export default MessangerProfileCard
