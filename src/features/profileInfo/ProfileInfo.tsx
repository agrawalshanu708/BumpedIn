import React, { useCallback, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Button, Heading, Modal } from 'native-base'
import { PROFILE_INFO_STATICS } from './ProfileInfoStatics'
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

const ProfileInfo = ({ navigation }: { navigation: any }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handlePress = useCallback(() => {
        setModalVisible(true)
        navigation.navigate(ROUTES.TAB_NAVIGATOR_ROOT.name)
    }, [modalVisible])

    const getHeaderView = () => (
        <View style={styles.headerContainer}>
            <Heading style={styles.heading}>{PROFILE_INFO_STATICS.HEADER.heading}</Heading>
            <Text style={styles.subHeading}>{PROFILE_INFO_STATICS.HEADER.subHeading}</Text>
        </View>
    )

    const getCardView = () => (
        <View style={styles.cardWrapper}>
            <ProfileCard />
        </View>
    )

    const getFooterView = () => (
        <View style={styles.footerContainer}>
            <Text style={styles.footerText}>{PROFILE_INFO_STATICS.FOOTER.text}</Text>
            <Button onPress={handlePress} style={styles.aroundCta}>{PROFILE_INFO_STATICS.FOOTER.cta.name}</Button>
        </View>
    )

    const getModalView = () => (
        <View>
            <Text>hello</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            {getHeaderView()}
            {getCardView()}
            {getFooterView()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 36,
        paddingVertical: 36,
        flex: 1,
    },
    headerContainer: {
    },
    heading: {},
    subHeading: {
        marginTop: 18,
    },
    cardWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    footerContainer: {},
    footerText: {},
    aroundCta: {
        marginTop: 18,
    },
})

export default ProfileInfo;
