import {useKeycloak} from "@react-keycloak/web";
import {Button, Grid} from "@mui/material";
import {useApi} from "../hooks/useApi";
import {useEffect, useState} from "react";
import {LoadingOverlay} from "./LoadingOverlay";
import {useCurrentUser} from "../hooks/UseCurrentUser";
import {Outlet, useNavigate} from "react-router-dom";

const Layout = (): JSX.Element => {
    const {keycloak, initialized} = useKeycloak();
    const api = useApi();
    const currentUser = useCurrentUser()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (keycloak.authenticated && initialized) {
            setIsLoading(true)
            api.me().then((user) => {
                console.log(user)
                currentUser?.setCurrentUser(user)
            }).catch((error) => {
                console.log(error)
                //navigate to error page
            }).finally(() => {
                setIsLoading(false)
            })
        }

    }, [keycloak.authenticated, initialized, api])

    useEffect(() => {
        if(currentUser?.isUserLoggedIn()){
            currentUser?.hasUserPrivilege() ? navigate("/user") : navigate("/admin")
        }else{
            navigate("/")
        }
    }, [currentUser?.user]);

    const handleLogout = () => {
        keycloak.logout();
        currentUser?.unsetCurrentUser()
    };

    const handleLogin = () => {
        keycloak.login();
       //window.open( keycloak.createLoginUrl(), "_blank")
    };

    const handleRegister = () => {
        keycloak.register();
    };

    const log = () => {
        console.log("isAuthenticated :" + keycloak.authenticated)
        console.log("token : " + keycloak.token)
    }

    return (
        <Grid container>
            {keycloak.authenticated ?
                <>
                    <Grid sm={3} item>
                        <Button variant={"contained"} onClick={handleLogout}>Logout</Button>
                    </Grid>
                    <Grid sm={6} item>
                        {currentUser?.user?.userName}
                    </Grid>
                </>
                :
                <Grid sm={3} item>
                    <Button variant={"contained"} onClick={handleLogin}>Login</Button>
                </Grid>
            }

            {!keycloak.authenticated &&
            <Grid sm={3} item>
                <Button variant={"contained"} onClick={handleRegister}>Register</Button>
            </Grid>
            }

            {keycloak.authenticated &&
            <Grid sm={3} item>
                <Button variant={"outlined"} onClick={log}>print vitals</Button>
            </Grid>
            }

            <Grid container spacing={-1}>
                <Outlet/>
            </Grid>

            <LoadingOverlay isLoading={isLoading}/>
        </Grid>
    )
}

export default Layout
