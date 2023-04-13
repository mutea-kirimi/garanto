import {UserDto} from '../dto';
import {api_client} from "../ApiClient";


const BASE_URL = 'http://localhost:8080/api/auth'
export const AuthApi = {
    me: () => api_client.get<UserDto>(`${BASE_URL}/me`).then((r) => r.data),
}
