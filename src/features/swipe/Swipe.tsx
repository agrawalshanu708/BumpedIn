import React, { useCallback, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Heading, CloseIcon, Text, Tooltip } from 'native-base'

import { SWIPE_STATICS } from './SwipeStatics'
import { ROUTES } from './../../routes/Routes';
import ProfileCard from './../../components/profileCard/ProfileCard';
import { useConnect } from '../../hooks/useConnect';
import { isLastProfileCard } from '../../utils';
import { useAuth } from '../../hooks/useAuth';

const Swipe = ({ navigation }: { navigation: any }) => {

    const { nearByUsers, sendIgnoreRequest, sendConnectionRequest } = useConnect()
    const { userData } = useAuth();

    console.log("userData", userData)

    const [currentProfileData, setCurrentProfileData] = useState(nearByUsers[0])

    console.log('currentProfileData', currentProfileData)

    const [isLastCard, currentIndex] = isLastProfileCard(nearByUsers, currentProfileData)

    const handleConnectPress = useCallback(() => {
        sendConnectionRequest(currentProfileData).then((response) => {
            console.log('success-response', response.data)
            if (response.data.status === 'accepted') {
                navigation.navigate(ROUTES.USER_MATCH.name)
            } else if (!isLastCard) {
                setCurrentProfileData(nearByUsers[currentIndex + 1])
            } else {
                navigation.navigate(ROUTES.SEARCHING_USER.name)
            }
        }).catch((error) => {
            console.error('Error while connecting connection', error)
        })
    }, [navigation, currentProfileData])

    const handleIgnorePress = useCallback(() => {
        sendIgnoreRequest(currentProfileData).then((response) => {
            console.log('ignore-response', response.data)
            if (!isLastCard) {
                setCurrentProfileData(nearByUsers[currentIndex + 1])
            } else {
                navigation.navigate(ROUTES.SEARCHING_USER.name)
            }
        })
            .catch((error) => {
                console.error('Error while ignoring connection', error)
            })
    }, [navigation, currentProfileData])

    // const handleIgnorePress = useCallback(() => {
    //     if (!isLastCard) {
    //         setCurrentProfileData(nearByUsers[currentIndex + 1])
    //     } else {
    //         navigation.navigate(ROUTES.SEARCHING_USER.name)
    //     }
    // }, [navigation, currentProfileData, isLastCard, currentIndex])

    const getProfileView = () => (
        <View style={styles.profileCardContainer}>
            <ProfileCard
                key={currentProfileData.user._id}
                firstName={currentProfileData?.user?.firstName}
                lastName={currentProfileData?.user?.lastName}
                batch={currentProfileData?.user?.class}
                designation={currentProfileData?.user?.designation}
                organization={currentProfileData?.user?.organization}
                course={currentProfileData?.user?.program}
                college={currentProfileData?.user?.school}
                navigation={navigation}
            />
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

