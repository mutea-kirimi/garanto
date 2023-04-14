import {createContext, ReactNode, useState} from "react";
import {UserDto} from "../../dataClasses/dto";
import {isAdmin, isUser} from "./userHelper";
import {CurrentUser, Role} from "../../dataClasses/classes";

export const UserStoreContext = createContext<CurrentUser | null>(null)

interface UserStoreProviderProps {
    children: ReactNode | undefined
}

const UserStoreProvider = ({ children }: UserStoreProviderProps): JSX.Element => {
    const [user, setUser] = useState<UserDto | null>(null)

    const isUserLoggedIn = () : boolean => {
        return !!user
    }

    const setCurrentUser = (loggedInUser : UserDto): void => {
        setUser(loggedInUser);
    }

    const unsetCurrentUser = (): void => {
        setUser(null)
    }

    const hasAdminPrivilege = () => {
        return isUserLoggedIn() && isAdmin(user)
    }

    const hasUserPrivilege = () => {
        return isUserLoggedIn() && isUser(user) && !hasAdminPrivilege()
    }

    const hasRequiredPermission = (roles: Role[]) => {
        return (
            isUserLoggedIn() &&
            roles.some(
                (role) =>
                    user?.roles.includes(role),
            )
        )
    }

    const currentUser = {
        user : user,
        isUserLoggedIn : isUserLoggedIn,
        setCurrentUser : setCurrentUser,
        unsetCurrentUser : unsetCurrentUser,
        hasAdminPrivilege : hasAdminPrivilege,
        hasUserPrivilege : hasUserPrivilege,
        hasRequiredPermission : hasRequiredPermission
    }

    return <UserStoreContext.Provider value={currentUser}>{ children }</UserStoreContext.Provider>
}

export default UserStoreProvider