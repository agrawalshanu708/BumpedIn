import React, { useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { Button, Heading, Text } from 'native-base'
import { PROFILE_INFO_STATICS } from './ProfileInfoStatics'
import { ROUTES } from './../../routes/Routes'
import { useUserProfessionalData } from '../../hooks/useUserProfessionalData'
import ProfileCard from '../../components/profileCard/ProfileCard';
import { SIZE } from '../../enums'

const ProfileInfo = ({ navigation }: { navigation: any }) => {

    const { formData } = useUserProfessionalData()

    console.log('formData', formData)

    const [modalVisible, setModalVisible] = useState(false);

    const handlePress = useCallback(() => {
        setModalVisible(true)
        navigation.navigate(ROUTES.TAB_NAVIGATOR_ROOT.name)
    }, [modalVisible])

    const getHeaderView = () => (
        <View style={styles.headerContainer}>
            <Heading size={SIZE['2XL']} fontWeight={600} style={styles.heading}>{PROFILE_INFO_STATICS.HEADER.heading}</Heading>
            <Text fontSize={SIZE.XL} style={styles.subHeading}>{PROFILE_INFO_STATICS.HEADER.subHeading}</Text>
        </View>
    )

    const getCardView = () => (
        <View style={styles.cardWrapper}>
            <ProfileCard
                firstName={'shanu'}
                lastName={'Agrawal'}
                batch={2009}
                designation={'software developer'}
                organization={'Evive sofwatare analytics'}
                course={'PGP'}
                college={'ISB'}
                navigation={navigation}
            />
        </View>
    )

    const getFooterView = () => (
        <View style={styles.footerContainer}>
            <Text fontSize={SIZE.LG} style={styles.footerText}>{PROFILE_INFO_STATICS.FOOTER.text}</Text>
            <Button onPress={handlePress} style={styles.aroundCta}>{PROFILE_INFO_STATICS.FOOTER.cta.name}</Button>
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
    footerContainer: {
        marginTop: 80,
    },
    footerText: {},
    aroundCta: {
        marginTop: 36,
    },
})

export default ProfileInfo;
