import { useSnackbar } from 'notistack'
import React, { createContext, ReactNode } from 'react'
import {AxiosResponse} from "axios";
import {Api, FailureReason, MAX_FILE_SIZE_IN_BYTES, newApiType} from './api';
import {useKeycloak} from "@react-keycloak/web";


export const ApiContext = createContext<newApiType | null>(null)

const savedMethods = new Set(['post', 'put', 'delete'])
const silentEndpoints = ['update-data-status']

interface ApiProviderProps {
    children?: ReactNode
}

const ApiProvider = ({ children }: ApiProviderProps): JSX.Element => {
    const { enqueueSnackbar } = useSnackbar()
    const { keycloak } = useKeycloak();

    const api = Api(
        keycloak?.token,
        (response : AxiosResponse) => {
            const silent = silentEndpoints.some((endpoint) => {
                return response?.config?.url?.includes(endpoint)
            })
            if (response?.config?.method && savedMethods.has(response.config.method) && !silent) {
                enqueueSnackbar('SnackbarMessage.Success.Saved', { variant: 'success' })
            }
        },
        (reason: FailureReason, errorCode?: string) => {
            if (reason == FailureReason.AUTH) {
                enqueueSnackbar('SnackbarMessage.Warning.AuthenticationFailed', { variant: 'warning' })
                //navigate(routeForName('login'))
            } else if (reason == FailureReason.REQUEST_BODY_TOO_LARGE) {
                const sizeInfo = MAX_FILE_SIZE_IN_BYTES / (1024 * 1024) + ' MB'
                enqueueSnackbar('SnackbarMessage.Warning.UploadTooLarge' + sizeInfo, {
                    variant: 'warning',
                })
            } else if (reason == FailureReason.OTHER) {
                // TODO what about redirects (3xx)? would be FailureReason.OTHER, but Warning.ServerDeniedRequest does not seem right
                enqueueSnackbar('SnackbarMessage.Warning.ServerDeniedRequest', { variant: 'warning' })
            } else if (reason == FailureReason.SERVER) {
                const errorMessage = errorCode ? 'SnackbarMessage.Error.ServerError.' + errorCode : null
                const displayMessage =
                    'SnackbarMessage.Error.ServerError' + (errorMessage ? ': ' + errorMessage : '.')
                enqueueSnackbar(displayMessage, { variant: 'error' })
            } else {
                enqueueSnackbar('SnackbarMessage.Error.OperationFailed', { variant: 'error' })
            }
        },
    )

    return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}

export default ApiProvider
