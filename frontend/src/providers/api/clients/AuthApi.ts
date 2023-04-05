import { UserDto } from '../dto'
import {api_client} from '../token'

const BASE_URL = '/api/auth'
export const AuthApi = {
    me: () => api_client.get<UserDto>(`${BASE_URL}/me`).then((r) => r.data),
}
