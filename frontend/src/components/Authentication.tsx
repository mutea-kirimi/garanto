import {useKeycloak} from "@react-keycloak/web";
import {useEffect, useState} from "react";
import {LoadingOverlay} from "./LoadingOverlay";
import {useCurrentUser} from "../hooks/UseCurrentUser";
import {Outlet, useNavigate} from "react-router-dom";
import {useApi} from "../hooks/UseApi";

const Authentication = (): JSX.Element => {
    const {keycloak, initialized} = useKeycloak();
    const api = useApi();
    const currentUser = useCurrentUser()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (keycloak.authenticated && initialized && !currentUser?.user) {
            setIsLoading(true)
            api.me().then((user) => {
                console.log(user)
                currentUser?.setCurrentUser(user)
                navigate("/landing")
            }).catch((error) => {
                console.log(error)
                navigate("/error")
            }).finally(() => {
                setIsLoading(false)
            })
        }

    }, [keycloak.authenticated, initialized, api, currentUser?.user])


    return (
        <>
            <Outlet/>
            <LoadingOverlay isLoading={isLoading}/>
        </>

    )
}

export default Authentication
