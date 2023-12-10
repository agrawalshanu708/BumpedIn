import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import axios from "axios";

import { API_URLS } from './../services/apiUrls';
import { LOADING_STATUS } from '../enums';
import { isLoadingOrCompletedOrFailed, isLoading } from '../utils';

type Props = {
    children: React.ReactNode,
}

interface useConnectType {
    getNearByUsers: () => Promise<any>,
    getTotalUsers: () => void,
    sendConnectionRequest: () => Promise<any>,
    sendIgnoreRequest: () => Promise<any>,
    nearByUsers: any,
    totalUsers: number,
}

const UseConnectContext = createContext<useConnectType>({
    getNearByUsers: () => Promise.resolve({}),
    getTotalUsers: () => { },
    sendConnectionRequest: () => Promise.resolve({}),
    sendIgnoreRequest: () => Promise.resolve({}),
    nearByUsers: {},
    totalUsers: 0,
})

const useConnect = () => useContext(UseConnectContext);

const UseConnectProvider = ({ children }: Props) => {

    const [nearByUsers, setNearByUsers] = useState()
    const [totalUsers, setTotalUsers] = useState({})
    const [totalUsersLoadingStatus, setTotalUsersLoadingStatus] = useState<LOADING_STATUS>(LOADING_STATUS.NOT_YET_STARTED)
    const [loadingStatus, setLoadingStatus] = useState<LOADING_STATUS>(LOADING_STATUS.NOT_YET_STARTED)
    const [sendConnectionLoadingStatus, setSendConnectionLoadingStatus] = useState<LOADING_STATUS>(LOADING_STATUS.NOT_YET_STARTED)
    const [ignoreConnectionLoadingStatus, setIgnoreConnectionLoadingStatus] = useState<LOADING_STATUS>(LOADING_STATUS.NOT_YET_STARTED)

    const getNearByUsers = useCallback(
        (location: any) => new Promise(async (resolve, reject) => {
            if (isLoading(loadingStatus)) {
                return;
            }

            // setTimeout(() => {
            try {
                setLoadingStatus(LOADING_STATUS.LOADING)
                const response = await axios.post(API_URLS.CONNECT.GET_NEARBY_USERS, location)
                setNearByUsers(response?.data)
                setLoadingStatus(LOADING_STATUS.COMPLETED)
                resolve(response)
            } catch (error) {
                console.error(
                    'Error in fetching get nearby data', e
                )
                setLoadingStatus(LOADING_STATUS.FAILED)
                reject(e)
            }
            // }, 1000);
        }, [loadingStatus, nearByUsers]))

    const getTotalUsers = useCallback(
        async () => {
            if (isLoading(totalUsersLoadingStatus)) {
                return;
            }

            try {
                setTotalUsersLoadingStatus(LOADING_STATUS.LOADING)
                const response = await axios.get(API_URLS.CONNECT.TOTAL_USERS)
                setTotalUsers(response?.data)
                setTotalUsersLoadingStatus(LOADING_STATUS.COMPLETED)
            } catch (error) {
                console.error(
                    'Error in fetching get nearby data', error
                )
                setTotalUsersLoadingStatus(LOADING_STATUS.FAILED)
            }
        }, [totalUsersLoadingStatus, totalUsers])


    const sendConnectionRequest = useCallback((profileData: any) => new Promise(async (resolve, reject) => {
        if (isLoading(sendConnectionLoadingStatus)) {
            return;
        }

        try {
            setSendConnectionLoadingStatus(LOADING_STATUS.LOADING)
            const response = await axios.post(API_URLS.CONNECT.SEND_REQUEST, profileData)
            setSendConnectionLoadingStatus(LOADING_STATUS.COMPLETED)
            resolve(response)
        } catch (error) {
            setSendConnectionLoadingStatus(LOADING_STATUS.FAILED);
            reject(error)
            console.error('Error while updating the data', error);
        }

    }), [sendConnectionLoadingStatus])

    const sendIgnoreRequest = useCallback((profileData: any) => new Promise(async (resolve, reject) => {
        if (isLoading(ignoreConnectionLoadingStatus)) {
            return;
        }
        try {
            setIgnoreConnectionLoadingStatus(LOADING_STATUS.LOADING);
            const response = await axios.post(API_URLS.CONNECT.IGNORE_CONNECT, profileData)
            setIgnoreConnectionLoadingStatus(LOADING_STATUS.COMPLETED)
            resolve(response)
        } catch (error) {
            setIgnoreConnectionLoadingStatus(LOADING_STATUS.FAILED);
            reject(error)
            console.error('Error while updating the data', error);
        }
    }), [ignoreConnectionLoadingStatus])

    const contextValue = useMemo(() => ({
        getNearByUsers,
        getTotalUsers,
        sendConnectionRequest,
        sendIgnoreRequest,
        nearByUsers,
        totalUsers,
        loadingStatus,
    }), [
        getNearByUsers,
        getTotalUsers,
        sendConnectionRequest,
        sendIgnoreRequest,
        nearByUsers,
        totalUsers,
        loadingStatus,
    ])
    return (
        <UseConnectContext.Provider value={contextValue}>
            {children}
        </UseConnectContext.Provider>
    )
}

export {
    useConnect,
    UseConnectProvider
}
