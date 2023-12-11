import React, { useCallback, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Heading, CloseIcon, Text, Tooltip } from 'native-base'

import { SWIPE_STATICS } from './SwipeStatics'
import { ROUTES } from './../../routes/Routes';
import ProfileCard from './../../components/profileCard/ProfileCard';
import { useConnect } from '../../hooks/useConnect';
import { isLastProfileCard } from '../../utils';
import { UserDataType } from '../../services/type';

const Swipe = ({ navigation }: { navigation: any }) => {

    const { nearByUsers, sendIgnoreRequest, sendConnectionRequest } = useConnect()

    console.log('nearByUsers', nearByUsers)

    const [currentProfileData, setCurrentProfileData] = useState(SWIPE_STATICS.FOUND_USER_LIST[0])

    const [isLastCard, currentIndex] = isLastProfileCard(SWIPE_STATICS.FOUND_USER_LIST, currentProfileData)

    const handleConnectPress = useCallback(() => {
        sendConnectionRequest(currentProfileData).then((response) => {
            if (response.status === 'MATCH_SUCCESS') {
                navigation.navigate(ROUTES.USER_MATCH.name)
            } else if (!isLastCard) {
                setCurrentProfileData(SWIPE_STATICS.FOUND_USER_LIST[currentIndex + 1])
            } else {
                navigation.navigate(ROUTES.SEARCHING_USER.name)
            }
        }).catch((error) => {
            console.error('Error while connecting connection', error)
        })
    }, [navigation, currentProfileData])

    const handleIgnorePress = useCallback(() => {
        sendIgnoreRequest(currentProfileData).then((response) => {
            if (!isLastCard) {
                setCurrentProfileData(SWIPE_STATICS.FOUND_USER_LIST[currentIndex + 1])
            } else {
                navigation.navigate(ROUTES.SEARCHING_USER.name)
            }
        }).catch((error) => {
            console.error('Error while ignoring connection', error)
        })
    }, [navigation, currentProfileData])

    const getUserProfile = (profileData: UserDataType) => (
        <ProfileCard
            key={profileData._id}
            firstName={profileData?.firstName}
            lastName={profileData?.lastName}
            batch={profileData?.class}
            designation={profileData?.designation}
            organization={profileData?.organization}
            course={profileData?.program}
            college={profileData?.school}
            navigation={navigation}
        />
    )

    const getProfileView = () => (
        <View style={styles.profileCardContainer}>
            {nearByUsers.map(getUserProfile)}
        </View>
    )

    const getActionView = () => (
        <View style={styles.actionContainer}>
            <Button onPress={handleIgnorePress} style={styles.ignoreCta}><CloseIcon size="5" mt="0.5" color="white" /></Button>
            <Tooltip label="Click here to read more" openDelay={500}>
                <Button onPress={handleConnectPress} style={styles.connectCta}>{SWIPE_STATICS.CONNECT_CTA.name}</Button>
            </Tooltip>
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
        paddingHorizontal: 24,
        paddingVertical: 24,
    },
    profileCardContainer: {
        height: 400,   //remove this
    },
    actionContainer: {
        paddingVertical: 30,
        flexDirection: 'row',
        columnGap: 12,
        marginTop: 30,
    },
    ignoreCta: {
        backgroundColor: '#FF9209',
    },
    connectCta: {
        flex: 1
    },
})

export default Swipe;

