import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import axios from 'axios';

import { API_URLS } from '../services/apiUrls';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { generateSignInPayload, isLoading } from '../utils';
import { LOADING_STATUS } from '../enums';
import { useApi } from './useApi';

type Props = {
    children: React.ReactNode,
}

type UserDataType = {
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
    signInStatus: LOADING_STATUS.NOT_YET_STARTED
});

const useAuth = () => useContext(UseAuthContext);

const UseAuthProvider = ({ children }: Props) => {
    const [userData, setUserData] = useState<UserDataType>({})
    const [signInStatus, setSignInStatus] = useState(LOADING_STATUS.NOT_YET_STARTED)

    const handleGoogleSignin = useCallback(() => new Promise(async (
        resolve, reject
    ) => {
        console.log('function calling', signInStatus)
        if (isLoading(signInStatus)) {
            return;
        }
        try {
            setSignInStatus(LOADING_STATUS.LOADING)
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('userinfo', userInfo);
            const requestPayload = await generateSignInPayload(userInfo);
            console.log('requestPayload', requestPayload);
            const response = await axios.post(
                API_URLS.AUTH.VERIFY_MAIL,
                requestPayload,
            );
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

    const contextValue = useMemo(() => ({
        userData,
        handleGoogleSignin,
        signInStatus,
    }),
        [
            userData,
            handleGoogleSignin,
            signInStatus
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
