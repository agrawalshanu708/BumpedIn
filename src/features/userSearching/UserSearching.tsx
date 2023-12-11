import React, { useEffect, useState } from 'react'
import { Easing, StyleSheet, View } from 'react-native'
import { Button, Card, Text, Heading } from 'native-base'

import { USER_SEARCHING_STATICS } from './UserSearchingStatics'
import { useConnect } from '../../hooks/useConnect'
import { SIZE } from '../../enums'
import { ROUTES } from '../..//routes/Routes'
import PulseAnimation from '../../components/PulseAnimation'
import { useAuth } from '../../hooks/useAuth'

const UserSearching = ({ navigation }: { navigation: any }) => {

    const { loadingStatus, getNearByUsers, nearByUsers } = useConnect()
    const { userData } = useAuth()

    const firstName = userData?.firstName?.charAt(0).toUpperCase() || ''
    const lastName = userData?.lastName?.charAt(0).toUpperCase() || ''


    const userNameInitials = `${firstName}${lastName}`

    const [isUserNotFoundContentSHown, setIsUserNotFoundContentSHown] = useState(false)

    const location = {
        user: '657755c339e7e327b0b84e78',
        location: [37.4219783, -122.0840513]
    }
    // useEffect(() => {
    //     console.log('ruunug function')
    //     getNearByUsers(location).then((res: any) => {
    //         res.data.length > 0 ? navigation.navigate(ROUTES.SWIPE_USER.name) : setIsUserNotFoundContentSHown(true)
    //     }).catch((err: any) => {
    //         console.error(err)
    //     })
    // }, [navigation, getNearByUsers])



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('in useeffect', 'loadingstatus', loadingStatus)
            getNearByUsers(location).then((response: any) => {
                console.log('response-location', response.data)
                response.data.location.length > 0 ? navigation.navigate(ROUTES.SWIPE_USER.name) : setIsUserNotFoundContentSHown(true)
            }).catch(((error) => {
                console.log('error', error)
            }))
        });
        return unsubscribe;
    }, [navigation, getNearByUsers]);

    console.log('final-loadingStatus', loadingStatus);

    const getUserSearchingView = () => (
        <View style={styles.searchingContainer}>
            <View style={styles.bigRing}>
                <View style={styles.wrapper}>
                    <Card backgroundColor={'primary.100'} style={styles.userInitialsWrapper}>
                        <Heading style={styles.userInitialsText}>{USER_SEARCHING_STATICS.USER_INITIALS}</Heading>
                    </Card>
                </View>
            </View>
        </View>
    )

    const getNoUserFoundContentView = () => (
        isUserNotFoundContentSHown && (
            <View style={styles.noUserFoundContentContainer}>
                <Text fontSize={SIZE.XL} style={styles.alumsCountText}>{USER_SEARCHING_STATICS.ALUMS_COUNT_TEXT}</Text>
                <Text fontSize={SIZE.XL} style={styles.NoUserFoundText}>{USER_SEARCHING_STATICS.NO_FOUND_USER_TEXT}</Text>
                <View style={styles.actionContainer}>
                    <Button style={styles.inviteCta}>{USER_SEARCHING_STATICS.CTA.name}</Button>
                </View>
            </View>
        )
    )

    return (
        <View style={styles.container}>
            {/* {getUserSearchingView()} */}
            <PulseAnimation
                initials={'SA'}
            />
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
    },
    actionContainer: {
        alignItems: 'center',
    },
    inviteCta: {
        marginTop: 24
    },
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center'
    },

})

export default UserSearching;
