import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import { Button, Heading } from 'native-base';
import { WELCOME_SCREEN_STATICS } from './WelcomeScreenStatics';
import { ROUTES } from './../../routes/Routes';
import { API_URLS } from '../../services/apiUrls';
import { useApi } from '../../hooks/useApi';
import { SIZE } from '../../enums';

const WelcomeScreen = ({ navigation }: { navigation: any }) => {

    const { apiGet, apiPost } = useApi()

    const [userData, setUserData] = useState<any>()
    const webClientId = `813451232123-lf4oce7kc1ttcvvovm4cs78jpqtfao6l.apps.googleusercontent.com`

    useEffect(() => {
        GoogleSignin.configure()
    }, [])


    const handleGoogleSignin = async () => {
        console.log('google sigin start')
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const validUser = await apiPost(API_URLS.PROFESSIONAL_DATA.VERIFY_MAIL, {}, {}, userInfo)
            await navigation.navigate(ROUTES.PROFILE_VIEW.name)
            console.log("userinfo", userInfo);
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log(error)
                navigation.navigate(ROUTES.LOGIN_ERROR.name)
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log(error)
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log(error)
                navigation.navigate(ROUTES.LOGIN_ERROR.name)
            } else {
            }
        }
    };


    const onPressHandler = useCallback(() => {
        // handleGoogleSignin()
        navigation.navigate(ROUTES.FORM.name)
    }, [])

    const getHeaderView = () => (
        <View style={styles.headerContainer}>
            <Heading style={styles.heading} size={SIZE.XL}>{WELCOME_SCREEN_STATICS.HEADER.heading}</Heading>
            <Text style={styles.subHeading}>{WELCOME_SCREEN_STATICS.HEADER.subHeading}</Text>
        </View>
    );

    const getSignInText = () => (
        <Text style={styles.disclaimer}>{WELCOME_SCREEN_STATICS.SIGNIN_TEXT}</Text>
    );

    const getActionView = () => (
        <Button onPress={onPressHandler} style={styles.ContinueCta}>{WELCOME_SCREEN_STATICS.CTA.name}</Button>
    );

    return (
        <View style={styles.container}>
            <View>
                {getHeaderView()}
                {getSignInText()}
                {getActionView()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 36,
        paddingVertical: 36,
    },

    headerContainer: {
    },

    heading: {
        textAlign: 'center',
    },

    subHeading: {
        marginTop: 6,
        textAlign: 'center',
    },

    disclaimer: {
        marginTop: 96,
        textAlign: 'center',
    },

    ContinueCta: {
        marginTop: 6,
    },
});

export default WelcomeScreen;
