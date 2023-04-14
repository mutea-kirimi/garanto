import {useLocation, Outlet, Navigate} from "react-router-dom";
import {useCurrentUser} from "../hooks/UseCurrentUser";
import {Role} from "../dataClasses/classes";

export interface AuthProps{
    allowedRoles : Role[]
}

const Authorization = (props : AuthProps): JSX.Element => {
    const location = useLocation()
    const currentUser = useCurrentUser()

    const isUserAuthorized = currentUser?.user?.roles.find((role) => {
        return props.allowedRoles.includes(Role[role.toUpperCase()]);
    })

    function handleNotAuthorized() : JSX.Element{
        if(currentUser?.isUserLoggedIn()){
            console.log("Y")
            return <Navigate to="/unauthorized" state={{ from : location}} replace/>
        }else{
            console.log("N")
            return <Navigate to="/" state={{ from : location}} replace/>
        }
    }

    return (
       currentUser?.isUserLoggedIn() && isUserAuthorized
           ? <Outlet/>
           : handleNotAuthorized()
    )
}

export default Authorization