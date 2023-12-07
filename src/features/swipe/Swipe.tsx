import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Button, Heading, CloseIcon, Text } from 'native-base'
import { SWIPE_STATICS } from './SwipeStatics'
import { ROUTES } from './../../routes/Routes';
import ProfileCard from './../../components/profileCard/ProfileCard';


const Swipe = ({ navigation }: { navigation: any }) => {

    const [currentProfileData, setCurrentProfileData] = useState(SWIPE_STATICS.FOUND_USER_LIST[0])

    const handleConnectPress = useCallback(() => {
        const lastIndex = SWIPE_STATICS.FOUND_USER_LIST.length - 1;
        const currentIndex = SWIPE_STATICS.FOUND_USER_LIST.findIndex((data) => data.id === currentProfileData.id);
        const isLastProfile = currentIndex === lastIndex;

        if (!isLastProfile) {
            setCurrentProfileData(SWIPE_STATICS.FOUND_USER_LIST[currentIndex + 1])
        } else {
            navigation.navigate(ROUTES.SEARCHING_USER.name)
        }

    }, [navigation, currentProfileData])

    const handleIgnorePress = useCallback(() => {
        const lastIndex = SWIPE_STATICS.FOUND_USER_LIST.length - 1;
        const currentIndex = SWIPE_STATICS.FOUND_USER_LIST.findIndex((data) => data.id === currentProfileData.id);
        const isLastProfile = currentIndex === lastIndex;

        if (!isLastProfile) {
            setCurrentProfileData(SWIPE_STATICS.FOUND_USER_LIST[currentIndex + 1])
        } else {
            navigation.navigate(ROUTES.SEARCHING_USER.name)
        }

    }, [navigation, currentProfileData])


    const getProfileView = () => (
        <View style={styles.profileCardContainer}>
            <ProfileCard
                firstName={currentProfileData?.name}
            />
        </View>
    )

    const getActionView = () => (
        <View style={styles.actionContainer}>
            <Button onPress={handleIgnorePress} style={styles.ignoreCta}><CloseIcon size="5" mt="0.5" color="white" /></Button>
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
        paddingHorizontal: 24,
        paddingVertical: 24,
        flex: 1,
    },
    profileCardContainer: {
        flex: 1,
    },
    actionContainer: {
        paddingVertical: 30,
        flexDirection: 'row',
        columnGap: 12,
    },
    ignoreCta: {
        backgroundColor: '#FF9209',
    },
    connectCta: {
        flex: 1
    },
})

export default Swipe;

