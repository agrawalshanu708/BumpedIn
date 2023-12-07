import { createContext, useCallback, useContext, useState } from "react";
import { useApi } from './useApi'
import { API_URLS } from "../services/apiUrls";


enum LOADING_STATUS {
    'NOT_YET_STARTED' = 0,
    'LOADING' = 1,
    'COMPLETED' = 2,
    'FAILED' = 3,
}


const isLoadingOrCompletedOrFailed = (...args: LOADING_STATUS[]) => args.some((state: LOADING_STATUS) => state === LOADING_STATUS.LOADING || state === LOADING_STATUS.COMPLETED || state === LOADING_STATUS.FAILED)


const isLoading = (...args: LOADING_STATUS[]) => args.some((state: LOADING_STATUS) => state === LOADING_STATUS.LOADING)


interface UseUserProfessionalDataType {
    onSubmit: () => Promise<any>
    submitStatus: LOADING_STATUS,
    onFormDataChange: () => void,
    UpdateProfessionalData: () => Promise<any>
    updateStatus: LOADING_STATUS,
    formData: {},
}


const UseUserProfessionalDataContext = createContext<UseUserProfessionalDataType>({
    onSubmit: () => Promise.resolve({}),
    submitStatus: LOADING_STATUS.NOT_YET_STARTED,
    onFormDataChange: () => { },
    UpdateProfessionalData: () => Promise.resolve({}),
    updateStatus: LOADING_STATUS.NOT_YET_STARTED,
    formData: {},
})


const useUserProfessionalData = () => useContext(UseUserProfessionalDataContext);


const UseUserProfessionDataProvider = ({ children }) => {
    const { apiGet, apiPost } = useApi()


    const [userProfessionalData, setUserProfessionalData] = useState({})
    const [loadingStatus, setLoadingStatus] = useState<LOADING_STATUS>(LOADING_STATUS.NOT_YET_STARTED)
    const [submitStatus, setSubmitStatus] = useState<LOADING_STATUS>(LOADING_STATUS.NOT_YET_STARTED)
    const [updateStatus, setUpdateStatus] = useState<LOADING_STATUS>(LOADING_STATUS.NOT_YET_STARTED)
    const [formData, setFormData] = useState<Record<string, string>>({})


    const onFormDataChange = useCallback((newFormData: any) => {
        setFormData((prevFormData: any) => ({ ...prevFormData, ...newFormData }))
    }, [formData])


    const onSubmit = useCallback(
        (newFormData) => new Promise((resolve, reject) => {
            if (isLoading(submitStatus)) {
                return;
            }
            setFormData(newFormData)
            setSubmitStatus(LOADING_STATUS.LOADING)
            apiPost(API_URLS.PROFESSIONAL_DATA.SUBMIT, {}, {}, newFormData
            ).then((response: any) => {
                setSubmitStatus(LOADING_STATUS.COMPLETED)
                resolve(response)
            }
            ).catch((error: any) => {
                console.error('Failed to submit professional data', error)
                setSubmitStatus(LOADING_STATUS.FAILED)
                reject(error)
            })
        }), [apiPost, setSubmitStatus, submitStatus])


    const getUserProfessionalData = useCallback(
        () => {
            if (isLoadingOrCompletedOrFailed(loadingStatus)) {
                return;
            }
            apiGet(API_URLS.PROFESSIONAL_DATA.GET).then((response: any) => {
                setUserProfessionalData(response?.data)
                setLoadingStatus(LOADING_STATUS.COMPLETED)
            }).catch((e: any) => {
                console.error(
                    'Error in fetching get professional data', e
                )
                setLoadingStatus(LOADING_STATUS.FAILED)
            })
        }, [apiGet, loadingStatus, userProfessionalData])


    const UpdateProfessionalData = useCallback((newFormData) => new Promise((resolve, reject) => {
        if (isLoading(updateStatus)) {
            return;
        }
        setFormData(newFormData);
        setUpdateStatus(LOADING_STATUS.LOADING)
        apiPost(API_URLS.PROFESSIONAL_DATA.UPDATE, {}, {}, newFormData).then((response: any) => {
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
            getUserProfessionalData,
            submitStatus,
            onFormDataChange,
            UpdateProfessionalData,
            updateStatus,
            formData
        }), [
        onSubmit,
        getUserProfessionalData,
        submitStatus,
        onFormDataChange,
        UpdateProfessionalData,
        updateStatus,
        formData
    ])


    return (
        <UseUserProfessionDataProvider value={contextValue}>
            {children}
        </UseUserProfessionDataProvider>
    )
}


export {
    useUserProfessionalData,
    UseUserProfessionDataProvider
}
