import React, { useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'native-base'

import { ACCOUNT_STATICS } from './AccountStatics'
import ProfileCard from '../../components/profileCard/ProfileCard';
import { useAuth } from '../../hooks/useAuth';
import { useUserData } from '../../hooks/useUserData';
import { isLoading } from '../../utils';
import { ROUTES } from '../../routes/Routes';

const Accounts = ({ navigation }: { navigation: any }) => {

    const { userData, signout, signOutStatus } = useAuth()
    const { formData } = useUserData()

    const handlePress = useCallback(() => {
        signout().then(() => {
            navigation.navigate(ROUTES.WELCOME.name)
        }).catch((error) => {
            console.log('Failed to sign out', error)
        })
    }, [])

    const getProfileCard = () => (
        <View style={styles.cardWrapper}>
            <ProfileCard
                firstName={userData?.firstName}
                lastName={userData?.lastName}
                batch={userData?.class}
                designation={formData?.designation}
                organization={formData?.organization}
                course={userData?.program}
                college={userData?.school}
                navigation={navigation}
                editCta={true}
            />
        </View>
    )

    const getContentView = () => (
        <View style={styles.contentContainer}>
            <Text style={styles.contentText}>{ACCOUNT_STATICS.ALUMS_TEXT}</Text>
            <Button isLoading={isLoading(signOutStatus)} onPress={handlePress} style={styles.signoutCta}>{ACCOUNT_STATICS.CTA.name}</Button>
        </View>
    )

    const getFooterText = () => (
        <Text style={styles.footerText}>{ACCOUNT_STATICS.FOOTER_TEXT}</Text>
    )

    return (
        <View style={styles.container}>
            {getProfileCard()}
            {getContentView()}
            {getFooterText()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingVertical: 24,
        flex: 1,
    },
    cardWrapper: {
        flex: 1,
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 30,
    },
    contentText: {},
    signoutCta: {
        marginTop: 12
    },
    footerText: {
        textAlign: 'center',
    },
})

export default Accounts;
