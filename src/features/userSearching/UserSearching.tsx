import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, Heading } from 'native-base'
import { USER_SEARCHING_STATICS } from './UserSearchingStatics'
import { ROUTES } from './../../routes/Routes'
import { useConnect } from '../../hooks/useConnect'

const UserSearching = ({ navigation }: { navigation: any }) => {

    const { getNearByUsers, nearByUsers } = useConnect

    const [isUserNotFoundContentSHown, setIsUserNotFoundContentSHown] = useState(false)

    const location = { longitude: 11, latitude: 10 }

    // useEffect(() => {
    //     getNearByUsers(location).then((res: any) => {
    //         res.data.length > 0 ? navigation.navigate(ROUTES.SWIPE_USER.name) : setIsUserNotFoundContentSHown(true)
    //     }).catch((err: any) => {
    //         console.error(err)
    //     })
    // }, [navigation, getNearByUsers, setIsUserFound])

    const getUserSearchingView = () => (
        <View style={styles.searchingContainer}>
            <View style={styles.bigRing}>
                <View style={styles.smallRing}>
                    <View style={styles.userInitialsWrapper}>
                        <Heading style={styles.userInitialsText}>{USER_SEARCHING_STATICS.USER_INITIALS}</Heading>
                    </View>
                </View>
            </View>
        </View>
    )

    const getNoUserFoundContentView = () => (
        isUserNotFoundContentSHown && (
            <View style={styles.noUserFoundContentContainer}>
                <Text style={styles.alumsCountText}>{USER_SEARCHING_STATICS.ALUMS_COUNT_TEXT}</Text>
                <Text style={styles.NoUserFoundText}>{USER_SEARCHING_STATICS.NO_FOUND_USER_TEXT}</Text>
                <Button style={styles.inviteCta}>{USER_SEARCHING_STATICS.CTA.name}</Button>
            </View>
        )
    )

    return (
        <View style={styles.container}>
            {getUserSearchingView()}
            {getNoUserFoundContentView()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 24,
    },
    searchingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bigRing: {
        borderWidth: 1,
        borderRadius: 120,
        width: 240,
        height: 240,
        alignItems: 'center',
        justifyContent: 'center',
    },
    smallRing: {
        borderWidth: 1,
        borderRadius: 100,
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userInitialsWrapper: {
        borderRadius: 50,
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E0F4FF',
    },
    userInitialsText: {},
    noUserFoundContentContainer: {
        paddingVertical: 24,
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

export default UserSearching;
