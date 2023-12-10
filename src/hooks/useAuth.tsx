import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import axios from 'axios';

import { API_URLS } from 'services/apiUrls';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { generateSignInPayload, isLoading } from '../utils';
import { LOADING_STATUS } from '../enums';

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
    const api = axios.create({});
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
            const response = await api.post(
                API_URLS.AUTH.VERIFY_MAIL,
                requestPayload,
            );
            setUserData({ ...requestPayload, _id: response.data.user._id })
            console.log('checkingUserIsValid', response);
            setSignInStatus(LOADING_STATUS.COMPLETED)
            resolve(response)
        } catch (error) {
            setSignInStatus(LOADING_STATUS.FAILED)
            reject(error)
        }
    }), [signInStatus, userData, api.post])


    // const handleGoogleSignin = async () => {
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         const userInfo = await GoogleSignin.signIn();
    //         console.log('userinfo', userInfo);
    //         const requestPayload = await generateSignInPayload(userInfo);
    //         console.log('requestPayload', requestPayload);
    //         const response = await api.post(
    //             API_URLS.AUTH.VERIFY_MAIL,
    //             requestPayload,
    //         );
    //         setUserData({ ...requestPayload, _id: response.data.user._id })
    //         console.log('checkingUserIsValid', response);
    //     } catch (error: any) {
    //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //             console.log(error);
    //         } else if (error.code === statusCodes.IN_PROGRESS) {
    //             console.log(error);
    //         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //             console.log(error);
    //         } else {
    //         }
    //     }
    // };

    const contextValue = useMemo(() => ({
        userData,
        handleGoogleSignin,
        signInStatus
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
