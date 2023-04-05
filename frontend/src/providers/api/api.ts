import { AxiosResponse } from 'axios'
import {api_client, unsetToken} from './token'
import {AuthApi} from "./clients/AuthApi";


export enum FailureReason {
    AUTH = 1,
    OTHER,
    SERVER,
    REQUEST_BODY_TOO_LARGE
}
export const MAX_FILE_SIZE_IN_BYTES = 50 * 1024 * 1024

export const Api = (
    onSuccess: (response: AxiosResponse) => void,
    onFailure: (reason: FailureReason, errorCode?: string) => void,
) => {
    const setUpCallbacks = () => {
        api_client.interceptors.request.use((config) => {
            //config.headers[IPAS_STANDORT] = getCurrentUiStandort()
            return config
        })
        api_client.interceptors.response.use(
            (r) => {
                onSuccess(r)
                return r
            },
            (e) => {
                const responseStatus = e?.response?.status

                if (responseStatus == 401) {
                    unsetToken()
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

    const logout = async () => {
        // logout logic
    }


    return {
        onFailure,
        onSuccess,
        logout,
        ...AuthApi,

    }
}

export type newApiType = ReturnType<typeof Api>
