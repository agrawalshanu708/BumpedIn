import React, { createContext, useCallback, useContext, useMemo } from "react";
import { API_URLS } from './../services/apiUrls';

enum LOADING_STATUS {
    'NOT_YET_STARTED' = 0,
    'LOADING' = 1,
    'COMPLETED' = 2,
    'FAILED' = 3,
}


const isLoadingOrCompletedOrFailed = (...args: LOADING_STATUS[]) => args.some((state: LOADING_STATUS) => state === LOADING_STATUS.LOADING || state === LOADING_STATUS.COMPLETED || state === LOADING_STATUS.FAILED)

const isLoading = (...args: LOADING_STATUS[]) => args.some((state: LOADING_STATUS) => state === LOADING_STATUS.LOADING)

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
        () => new Promise((resolve, reject) => {
            if (isLoadingOrCompletedOrFailed(loadingStatus)) {
                return;
            }
            apiGet(API_URLS.CONNECT.GET_NEARBY_USERS).then((response: any) => {
                setTimeout(() => {
                    setNearByUsers(response?.data)
                    setLoadingStatus(LOADING_STATUS.COMPLETED)
                    resolve(response)
                }, 1000)
            }).catch((e: any) => {
                console.error(
                    'Error in fetching get nearby data', e
                )
                setLoadingStatus(LOADING_STATUS.FAILED)
                reject(e)
            })
        }, [apiGet, loadingStatus, nearByUsers]))

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


    const sendConnectionRequest = useCallback(() => new Promise((resolve, reject) => {
        if (isLoading(sendConnectionLoadingStatus)) {
            return;
        }
        setSendConnectionLoadingStatus(LOADING_STATUS.LOADING)
        apiPost(API_URLS.CONNECT.SEND_REQUEST, {}, {}, {}).then((response: any) => {
            setSendConnectionLoadingStatus(LOADING_STATUS.COMPLETED)
            resolve(response)
        }).catch((error: any) => {
            setSendConnectionLoadingStatus(LOADING_STATUS.FAILED);
            reject(error)
            console.error('Error while updating the data', error);
        })
    }), [apiPost, sendConnectionLoadingStatus])

    const sendIgnoreRequest = useCallback(() => new Promise((resolve, reject) => {
        if (isLoading(ignoreConnectionLoadingStatus)) {
            return;
        }
        setIgnoreConnectionLoadingStatus(LOADING_STATUS.LOADING)
        apiPost(API_URLS.CONNECT.IGNORE_CONNECT, {}, {}, {}).then((response: any) => {
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
