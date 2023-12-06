import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { Button, Card, Heading } from 'native-base'
import { USER_SEARCHING_STATICS } from './UserSearchingStatics'

const UserSearching = () => {

    const getSearchingView = () => (
        <View style={styles.bigRing}>
            <View style={styles.smallRing}>
                <View style={styles.cardWrapper}>
                    <Heading>{USER_SEARCHING_STATICS.USER_INITIALS}</Heading>
                </View>
            </View>
        </View>
    )

    const getContentView = () => (
        <View style={styles.contentContainer}>
            <Text style={styles.alumsCountText}>{USER_SEARCHING_STATICS.ALUMS_COUNT_TEXT}</Text>
            <Text style={styles.NoUserFoundText}>{USER_SEARCHING_STATICS.NO_FOUND_USER_TEXT}</Text>
            <Button style={styles.inviteCta}>{USER_SEARCHING_STATICS.CTA.name}</Button>
        </View>
    )

    return (
        <View style={styles.container}>
            {getSearchingView()}
            {getContentView()}
        </View>
    )
}

export default UserSearching

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardWrapper: {
        borderRadius: 40,
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E0F4FF',
    },
    smallRing: {
        borderWidth: 1,
        borderRadius: 80,
        width: 160,
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bigRing: {
        borderWidth: 1,
        borderRadius: 100,
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        marginTop: 36,
    },
    alumsCountText: {
        textAlign: 'center',
    },
    NoUserFoundText: {
        textAlign: 'center',
        marginTop: 6
    },
    inviteCta: {
        marginTop: 24
    },

})