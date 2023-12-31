import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '@react-native-firebase/database';

import { getValueFromLocal, removeFromLocal, setValueToLocal } from '../storageUtils'
import { API_URLS } from '../services/apiUrls';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { generateSignInPayload, isLoading } from '../utils';
import { LOADING_STATUS } from '../enums';
import { useApi } from './useApi';

type Props = {
    children: React.ReactNode,
}
export type UserDataType = {
    _id: string,
    school: string,
    email: string,
    firstName: string,
    lastName: string,
    class: string,
    program: string,
    cohort: string,
}

interface useAuthType {
    userData: UserDataType,
    handleGoogleSignin: () => Promise<any>,
    signInStatus: LOADING_STATUS,
    signout: () => Promise<any>,
    signOutStatus: LOADING_STATUS,
}

const UseAuthContext = createContext<useAuthType>({
    userData: {
        _id: '',
        school: '',
        email: '',
        firstName: '',
        lastName: '',
        class: '',
        program: '',
        cohort: '',
    },
    handleGoogleSignin: () => Promise.resolve({}),
    signInStatus: LOADING_STATUS.NOT_YET_STARTED,
    signout: () => Promise.resolve({}),
    signOutStatus: LOADING_STATUS.NOT_YET_STARTED,
});

const useAuth = () => useContext(UseAuthContext);

const UseAuthProvider = ({ children }: Props) => {
    const [userData, setUserData] = useState<UserDataType>({})
    const [signInStatus, setSignInStatus] = useState(LOADING_STATUS.NOT_YET_STARTED)
    const [signOutStatus, setSignOutStatus] = useState(LOADING_STATUS.NOT_YET_STARTED)

    // GoogleSignin.configure({
    // });

    const registerUser = async (id: any, userData: any) => {
        console.log('Registering')
        firebase
            .app()
            .database('https://bumpedin-8bcea-default-rtdb.asia-southeast1.firebasedatabase.app/')
            .ref('/users/' + id)
            .set(userData)
            .then(() => {
                console.log('successfully registered')
            }).catch((e) => {
                console.error('Failed to register', e)
            });
    };

    const handleGoogleSignin = useCallback(() => new Promise(async (
        resolve, reject
    ) => {
        if (isLoading(signInStatus)) {
            return;
        }
        try {
            setSignInStatus(LOADING_STATUS.LOADING)
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID and user token
            const { idToken, user } = await GoogleSignin.signIn();
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            // Sign-in the user with the credential
            auth().signInWithCredential(googleCredential);
            const requestPayload = await generateSignInPayload(user);
            const response = await axios.post(
                API_URLS.AUTH.VERIFY_MAIL,
                requestPayload,
            );
            console.log('uswerr', response.data.user._id, userData)
            setValueToLocal('account', response.data.user._id)
            registerUser(response.data.user._id, { ...requestPayload, _id: response.data.user._id })
            setUserData({ ...requestPayload, _id: response.data.user._id })
            setSignInStatus(LOADING_STATUS.COMPLETED)
            resolve(response)
        } catch (error: any) {
            setSignInStatus(LOADING_STATUS.FAILED)
            reject(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }), [signInStatus, userData])

    const signout = useCallback(() => new Promise(async (
        resolve, reject
    ) => {
        console.log('signOutStatus', signOutStatus)
        if (isLoading(signOutStatus)) {
            console.log('in loadinf check')
            return;
        }
        try {
            console.log('in tryyy', userData)
            setSignOutStatus(LOADING_STATUS.LOADING)
            await GoogleSignin.signOut();
            const response = await axios.delete(`https://bumpedin.app/api/users/${userData._id}`);
            removeFromLocal('account')
            setSignOutStatus(LOADING_STATUS.COMPLETED)
            resolve('response')
        } catch (error) {
            setSignOutStatus(LOADING_STATUS.FAILED)
            reject(error)
        }
    }), [signOutStatus, userData])

    const contextValue = useMemo(() => ({
        userData,
        handleGoogleSignin,
        signInStatus,
        signout,
        signOutStatus,
    }),
        [
            userData,
            handleGoogleSignin,
            signInStatus,
            signout,
            signOutStatus,
        ])

    return (
        <UseAuthContext.Provider value={contextValue}>
            {children}
        </UseAuthContext.Provider>
    );
};

export {
    useAuth,
    UseAuthProvider,
};
