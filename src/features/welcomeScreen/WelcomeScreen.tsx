import { GoogleSignin, User, statusCodes } from '@react-native-google-signin/google-signin';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '@react-native-firebase/database';

import { Button, Heading, Text } from 'native-base';

import { WELCOME_SCREEN_STATICS } from './WelcomeScreenStatics';
import { ROUTES } from './../../routes/Routes';
import { API_URLS } from '../../services/apiUrls';
import { useApi } from '../../hooks/useApi';
import { SIZE } from '../../enums';
import { useAuth } from '../../hooks/useAuth';
import { clearLocal, getValueFromLocal } from '../../storageUtils';

const WelcomeScreen = ({ navigation }: { navigation: any }) => {

    const { userData, handleGoogleSignin, signInStatus } = useAuth()

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '722180858444-tcq97im3otnhojufqhffvjh5j6lplq84.apps.googleusercontent.com',
        })
    }, [])

    useEffect(() => {
        console.log('response-useefect',)
        getValueFromLocal('account').then((response) => {
            console.log('response', response)
            if (response) {
                navigation.navigate(ROUTES.PROFILE_VIEW.name)
            }
        })
        // clearLocal()
    }, [])

    const onPressHandler = useCallback(() => {
        handleGoogleSignin().then(() => {
            console.log('success', userData)
            navigation.navigate(ROUTES.FORM.name)
        }).catch((error) => {
            console.log('error---', error)
            navigation.navigate(ROUTES.LOGIN_ERROR.name)
        })
    }, [navigation])

    const getHeaderView = () => (
        <View style={styles.headerContainer}>
            <Heading fontWeight={600} style={styles.heading} size={SIZE.LG}>{WELCOME_SCREEN_STATICS.HEADER.heading}</Heading>
            <Text fontSize={SIZE.MD} color={'gray.600'} style={styles.subHeading}>{WELCOME_SCREEN_STATICS.HEADER.subHeading}</Text>
        </View>
    );

    const getSignInText = () => (
        <Text fontSize={SIZE.MD} color={'gray.900'} style={styles.disclaimer}>{WELCOME_SCREEN_STATICS.SIGNIN_TEXT_1}<Text bold>{WELCOME_SCREEN_STATICS.SIGNIN_TEXT_2}</Text><Text>{WELCOME_SCREEN_STATICS.SIGNIN_TEXT_3}</Text></Text>
    );

    const getActionView = () => (
        <View style={styles.actionContainer}>
            <Button size={SIZE.SM} onPress={onPressHandler} style={styles.ContinueCta}><Text fontWeight={600} fontSize={15} color={'white'}>{WELCOME_SCREEN_STATICS.CTA.name}</Text></Button>
        </View>
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
        backgroundColor: 'white'
    },

    headerContainer: {
    },

    heading: {
        textAlign: 'center',
        fontFamily: "Assistant-Regular",
    },

    subHeading: {
        marginTop: 6,
        textAlign: 'center',
    },

    disclaimer: {
        marginTop: 110,
        textAlign: 'center',
    },
    actionContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    ContinueCta: {
        marginTop: 12,
    },
});

export default WelcomeScreen;
