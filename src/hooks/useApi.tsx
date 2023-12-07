import React, { createContext, useCallback, useContext, useMemo } from "react";
import axios from "axios";
import queryString from "query-string";
import stringTemplate from "string-template";

type ApiParamType = Record<string, string>

interface useApiType {
    apiGet: (url: string, pathParams?: ApiParamType, queryParams?: ApiParamType, body?: ApiParamType) => Promise<unknown>,
    apiPost: (url: string, pathParams?: ApiParamType, queryParams?: ApiParamType, body?: ApiParamType) => Promise<unknown>,
}


const UseApiContext = createContext<useApiType>({
    apiGet: () => Promise.resolve(null),
    apiPost: () => Promise.resolve(null)
})

const api = axios.create({})

const useApi = () => useContext(UseApiContext);

const UseApiProvider = ({ children }) => {

    const apiGet = useCallback(
        (url: string,
            pathparams: ApiParamType,
            queryParams: ApiParamType,
            body: ApiParamType) => {

            const fullUrl = queryString.stringify({
                url: stringTemplate(
                    url, pathparams
                ),
                query: queryParams
            })
            return api.get(fullUrl)
        }, [])

    const apiPost = useCallback(
        (url: string,
            pathparams: ApiParamType,
            queryParams: ApiParamType,
            body: ApiParamType) => {

            const fullUrl = queryString.stringify({
                url: stringTemplate(
                    url, pathparams
                ),
                query: queryParams
            })
            return api.post(fullUrl, body)
        }, [])

    const contextValue = useMemo(() => ({
        apiGet,
        apiPost,
    }), [apiGet, apiPost])

    return (
        <UseApiProvider value={contextValue}>
            {children}
        </UseApiProvider>
    )
}

export {
    useApi,
    UseApiProvider
}
