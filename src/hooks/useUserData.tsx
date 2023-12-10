import { createContext, useCallback, useContext, useMemo, useState } from "react";
import axios from 'axios';

import { useApi } from './useApi'
import { API_URLS } from "../services/apiUrls";
import { LOADING_STATUS } from "../enums";
import { isLoading, isLoadingOrCompletedOrFailed } from "../utils";
import { useAuth } from "./useAuth";

type Props = {
    children: React.ReactNode,
}

type UserFormDataType = {
    designation?: string,
    organization?: string,
}

interface UseUserDataType {
    onSubmit: () => Promise<any>
    submitStatus: LOADING_STATUS,
    onUpdate: () => Promise<any>
    updateStatus: LOADING_STATUS,
    formData: {},
}

const UseUserDataContext = createContext<UseUserDataType>({
    onSubmit: () => Promise.resolve({}),
    submitStatus: LOADING_STATUS.NOT_YET_STARTED,
    onUpdate: () => Promise.resolve({}),
    updateStatus: LOADING_STATUS.NOT_YET_STARTED,
    formData: {},
})

const useUserData = () => useContext(UseUserDataContext);

const UseUserDataProvider = ({ children }: Props) => {
    const { apiGet, apiPost } = useApi()
    const { userData } = useAuth();

    const [submitStatus, setSubmitStatus] = useState<LOADING_STATUS>(LOADING_STATUS.NOT_YET_STARTED)
    const [updateStatus, setUpdateStatus] = useState<LOADING_STATUS>(LOADING_STATUS.NOT_YET_STARTED)
    const [formData, setFormData] = useState<Record<string, string>>({})

    const onSubmit = useCallback(
        (newFormData: UserFormDataType) => new Promise(async (resolve, reject) => {
            if (isLoading(submitStatus)) {
                return;
            }
            console.log('newFormData', newFormData)
            try {
                setSubmitStatus(LOADING_STATUS.LOADING)
                const response = await axios.put(`https://bumpedin.app/api/users/${userData._id}`, JSON.stringify(newFormData))
                setFormData(newFormData)
                setSubmitStatus(LOADING_STATUS.COMPLETED)
                resolve(response)
            } catch (error) {
                console.error('Failed to submit professional data', error)
                setSubmitStatus(LOADING_STATUS.FAILED)
                reject(error)
            }
        }), [apiPost, submitStatus, formData])


    const onUpdate = useCallback((newFormData: UserFormDataType) => new Promise((resolve, reject) => {
        if (isLoading(updateStatus)) {
            return;
        }
        setFormData(newFormData);
        setUpdateStatus(LOADING_STATUS.LOADING)
        apiPost(API_URLS.USER_DATA.UPDATE, {}, {}, newFormData).then((response: any) => {
            setUpdateStatus(LOADING_STATUS.COMPLETED)
            resolve(response)
        }).catch((error: any) => {
            setUpdateStatus(LOADING_STATUS.FAILED)
            reject(error)
            console.error('Error while updating the data', error)
        })
    }), [apiPost, updateStatus, setUpdateStatus])

    const contextValue = useMemo(
        () => ({
            onSubmit,
            submitStatus,
            onUpdate,
            updateStatus,
            formData
        }), [
        onSubmit,
        submitStatus,
        onUpdate,
        updateStatus,
        formData
    ])
    return (
        <UseUserDataContext.Provider value={contextValue}>
            {children}
        </UseUserDataContext.Provider>
    )
}

export {
    useUserData,
    UseUserDataProvider,
}
