import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useCallback } from 'react'
import { Button, Heading, CloseIcon, Text } from 'native-base'
import { SWIPE_STATICS } from './SwipeStatics'
import { ROUTES } from './../../routes/Routes';

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
    firstNameText: {
        // marginTop: 96
    },
    lastNameText: {},
    batchText: {
        marginTop: 20
    },
    designationContainer: {
        marginTop: 20,
        marginBottom: 96
    },

})

const Swipe = ({ navigation }: { navigation: any }) => {

    const handleConnectPress = useCallback(() => {
        navigation.navigate(ROUTES.MATCH_SUCCESS.name)
    }, [navigation])

    const getProfileView = () => (
        <ProfileCard />
    )

    const getActionView = () => (
        <View style={styles.actionContainer}>
            <Button style={styles.ignoreCta}><CloseIcon size="5" mt="0.5" color="white" /></Button>
            <Button onPress={handleConnectPress} style={styles.connectCta}>{SWIPE_STATICS.CONNECT_CTA.name}</Button>
        </View>
    )

    return (
        <ScrollView style={styles.container}>
            {getProfileView()}
            {getActionView()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 36,
        paddingVertical: 36,
    },
    actionContainer: {
        marginTop: 36,
        flexDirection: 'row',
        columnGap: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ignoreCta: {
        backgroundColor: '#FF9209'
    },
    connectCta: {
        flex: 1
    },
})

export default Swipe

