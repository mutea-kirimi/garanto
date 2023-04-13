import {AxiosResponse, InternalAxiosRequestConfig} from 'axios'
import {AuthApi} from "./clients/AuthApi";
import {api_client, BEARER_TOKEN_HEADER} from "./ApiClient";


export enum FailureReason {
    AUTH = 1,
    OTHER,
    SERVER,
    REQUEST_BODY_TOO_LARGE
}

export const MAX_FILE_SIZE_IN_BYTES = 50 * 1024 * 1024

export const Api = (
    token: string | undefined,
    onSuccess: (response: AxiosResponse) => void,
    onFailure: (reason: FailureReason, errorCode?: string) => void,
) => {
    console.log("passed token : " + token)

    const setUpCallbacks = () => {
        api_client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
            config.headers[BEARER_TOKEN_HEADER] = `Bearer ${token}`
            return config
        })
        api_client.interceptors.response.use(
            (r: AxiosResponse) => {
                onSuccess(r)
                return r
            },
            (e: any) => {
                const responseStatus = e?.response?.status
                console.log("responseStatus : " + e?.response?.status)
                if (responseStatus == 401) {
                    if (!e?.response?.config?.url?.includes('/api/auth/me')) {
                    // Don't show snackbar on initial /me call
                    onFailure(FailureReason.AUTH)
                    }
                } else if (responseStatus == 413) {
                    onFailure(FailureReason.REQUEST_BODY_TOO_LARGE)
                } else if (responseStatus < 500) {
                    onFailure(FailureReason.OTHER)
                } else {
                    const errorCode = e?.response?.data?.errorCode
                    onFailure(FailureReason.SERVER, errorCode)
                }
                return Promise.reject(e)
            },
        )
    }

    setUpCallbacks()

    return {
        onFailure,
        onSuccess,
        ...AuthApi,
    }
}

export type newApiType = ReturnType<typeof Api>
