import {UserDto} from "../../dataClasses/dto";

export function isAdmin(user: UserDto | null | undefined): boolean {
    return (user?.roles || []).includes('admin')
}

export function isUser(user: UserDto | null | undefined): boolean {
    return (user?.roles || []).includes('user')
}