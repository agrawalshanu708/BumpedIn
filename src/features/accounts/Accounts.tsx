import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { ACCOUNT_STATICS } from './AccountStatics'
import { Button, Heading } from 'native-base'
import { ROUTES } from './../../routes/Routes'

const ProfileCard = () => {

    const getNameView = () => (
        <View>
            <Heading style={styles2.firstNameText}>Shanu</Heading>
            <Heading style={styles2.lastNameText}>Agrawal</Heading>
        </View>
    )

    const getBatchContentView = () => (
        <Text style={styles2.batchText}>ISB PGP CLASS OF 2009</Text>
    )

    const getDesignationView = () => (
        <View style={styles2.designationContainer}>
            <Heading>Chief Expendable officer</Heading>
            <Heading>Bankrupt Unicorn, Inc.</Heading>
        </View>
    )

    return (
        <View style={styles2.container}>
            {getNameView()}
            {getBatchContentView()}
            {getDesignationView()}
        </View>
    )
}

const styles2 = StyleSheet.create({
    container: {
        backgroundColor: '#E0F4FF',
        paddingTop: 30,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 100,
    },
    firstNameText: {},
    lastNameText: {},
    batchText: {
        marginTop: 20
    },
    designationContainer: {
        marginTop: 20,
    },

})

const Accounts = ({ navigation }: { navigation: any }) => {

    const handlePress = useCallback(() => {
        navigation.navigate(ROUTES.EDIT_FORM.name)
    }, [navigation])

    const getProfileCard = () => (
        <ProfileCard />
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
        paddingHorizontal: 36,
        paddingVertical: 36,
    },
    contentContainer: {
        marginTop: 36
    },
    contentText: {},
    signoutCta: {
        marginTop: 12
    },
    footerText: {
        marginTop: 36,
        textAlign: 'center',
    },

})

export default Accounts
