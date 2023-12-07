import React, { useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'native-base'

import { ACCOUNT_STATICS } from './AccountStatics'
import ProfileCard from '../../components/profileCard/ProfileCard';

const Accounts = ({ navigation }: { navigation: any }) => {

    const handlePress = useCallback(() => {
        //signout
    }, [])

    const getProfileCard = () => (
        <ProfileCard
            firstName={'shanu'}
            lastName={'Agrawal'}
            batch={2009}
            designation={'software developer'}
            organization={'Evive software analytics'}
            course={'PGP'}
            college={'ISB'}
            editCta={true}
            navigation={navigation}
        />
    )

    const getContentView = () => (
        <View style={styles.contentContainer}>
            <Text style={styles.contentText}>{ACCOUNT_STATICS.ALUMS_TEXT}</Text>
            <Button onPress={handlePress} style={styles.signoutCta}>{ACCOUNT_STATICS.CTA.name}</Button>
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
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
