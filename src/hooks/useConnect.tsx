import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

import { API_URLS } from './../services/apiUrls';
import { LOADING_STATUS } from '../enums';
import { isLoadingOrCompletedOrFailed, isLoading } from '../utils';
import { useApi } from "./useApi";

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

const UseConnectProvider = ({ children }) => {

    const { apiGet, apiPost } = useApi()

    const [nearByUsers, setNearByUsers] = useState({})
    const [totalUsers, setTotalUsers] = useState({})
    const [totalUsersLoadingStatus, setTotalUsersLoadingStatus] = useState<LOADING_STATUS>(LOADING_STATUS.NOT_YET_STARTED)
    const [loadingStatus, setLoadingStatus] = useState<LOADING_STATUS>(LOADING_STATUS.NOT_YET_STARTED)
    const [sendConnectionLoadingStatus, setSendConnectionLoadingStatus] = useState<LOADING_STATUS>(LOADING_STATUS.NOT_YET_STARTED)
    const [ignoreConnectionLoadingStatus, setIgnoreConnectionLoadingStatus] = useState<LOADING_STATUS>(LOADING_STATUS.NOT_YET_STARTED)

    const getNearByUsers = useCallback(
        (location) => new Promise((resolve, reject) => {
            if (isLoadingOrCompletedOrFailed(loadingStatus)) {
                return;
            }
            setTimeout(() => {
                apiPost(API_URLS.CONNECT.GET_NEARBY_USERS, {}, {}, location).then((response: any) => {
                    setNearByUsers(response?.data)
                    setLoadingStatus(LOADING_STATUS.COMPLETED)
                    resolve(response)
                }).catch((e: any) => {
                    console.error(
                        'Error in fetching get nearby data', e
                    )
                    setLoadingStatus(LOADING_STATUS.FAILED)
                    reject(e)
                })
            }, 1000)
        }, [apiPost, loadingStatus, nearByUsers]))

    const getTotalUsers = useCallback(
        () => {
            if (isLoadingOrCompletedOrFailed(loadingStatus)) {
                return;
            }
            apiGet(API_URLS.CONNECT.TOTAL_USERS).then((response: any) => {
                setTotalUsers(response?.data)
                setTotalUsersLoadingStatus(LOADING_STATUS.COMPLETED)
            }).catch((e: any) => {
                console.error(
                    'Error in fetching get nearby data', e
                )
                setTotalUsersLoadingStatus(LOADING_STATUS.FAILED)
            })
        }, [apiGet, totalUsersLoadingStatus, totalUsers])


    const sendConnectionRequest = useCallback((profileData: any) => new Promise((resolve, reject) => {
        if (isLoading(sendConnectionLoadingStatus)) {
            return;
        }
        setSendConnectionLoadingStatus(LOADING_STATUS.LOADING)
        apiPost(API_URLS.CONNECT.SEND_REQUEST, {}, {}, profileData).then((response: any) => {
            setSendConnectionLoadingStatus(LOADING_STATUS.COMPLETED)
            resolve(response)
        }).catch((error: any) => {
            setSendConnectionLoadingStatus(LOADING_STATUS.FAILED);
            reject(error)
            console.error('Error while updating the data', error);
        })
    }), [apiPost, sendConnectionLoadingStatus])

    const sendIgnoreRequest = useCallback((profileData: any) => new Promise((resolve, reject) => {
        if (isLoading(ignoreConnectionLoadingStatus)) {
            return;
        }
        setIgnoreConnectionLoadingStatus(LOADING_STATUS.LOADING);
        apiPost(API_URLS.CONNECT.IGNORE_CONNECT, {}, {}, profileData).then((response: any) => {
            setIgnoreConnectionLoadingStatus(LOADING_STATUS.COMPLETED)
            resolve(response)
        }).catch((error: any) => {
            setIgnoreConnectionLoadingStatus(LOADING_STATUS.FAILED);
            reject(error)
            console.error('Error while updating the data', error);
        })
    }), [apiPost, sendConnectionLoadingStatus])

    const contextValue = useMemo(() => ({
        getNearByUsers,
        getTotalUsers,
        sendConnectionRequest,
        sendIgnoreRequest,
        nearByUsers,
        totalUsers,
    }), [
        getNearByUsers,
        getTotalUsers,
        sendConnectionRequest,
        sendIgnoreRequest,
        nearByUsers,
        totalUsers,
    ])
    //
    return (
        <UseConnectProvider value={contextValue}>
            {children}
        </UseConnectProvider>
    )
}

export {
    useConnect,
    UseConnectProvider
}
