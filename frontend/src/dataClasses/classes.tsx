import {UserDto} from "./dto";

export enum Role {
    USER = 'user',
    ADMIN = 'admin'
}

export const ALL_ROLES = [Role.USER, Role.ADMIN]

export interface CurrentUser{
    user : UserDto | null,
    isUserLoggedIn : () => boolean,
    setCurrentUser : (user : UserDto) => void,
    unsetCurrentUser : () => void
    hasAdminPrivilege : () => boolean
    hasUserPrivilege : () => boolean
    hasRequiredPermission : (roles: Role[]) => boolean
}