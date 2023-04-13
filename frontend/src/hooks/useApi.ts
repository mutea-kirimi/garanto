import { useContext } from 'react'

import { newApiType } from '../providers/api/api'
import { ApiContext } from '../providers/api/ApiContext'

export const useApi: () => newApiType = () => {
    const api = useContext(ApiContext)
    if (!api) {
        throw new Error()
    }
    return api
}