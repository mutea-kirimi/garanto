import {useKeycloak} from "@react-keycloak/web";
import {Button, Grid} from "@mui/material";
import {useApi} from "../hooks/useApi";
import {useEffect, useState} from "react";
import {UserDto} from "../providers/api/dto";
import {LoadingOverlay} from "../components/LoadingOverlay";

const Home = (): JSX.Element => {
    const {keycloak, initialized} = useKeycloak();
    const api = useApi();
    const [user, setUser] = useState<UserDto>()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (keycloak.authenticated && initialized && !user) {
            setIsLoading(true)
            api.me().then((user) => {
                console.log(user)
                setUser(user)
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                setIsLoading(false)
            })
        }

    }, [keycloak.authenticated, initialized, api, !user])


    const handleLogout = () => {
        keycloak.logout();
    };

    const handleLogin = () => {
        keycloak.login()
    };

    const handleRegister = () => {
        keycloak.register();
    };

    const log = () => {
        console.log("isAuthenticated :" + keycloak.authenticated)
        console.log("loginRequired :" + keycloak.loginRequired)
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
                        {user?.userName}
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

            <LoadingOverlay isLoading={isLoading}/>
        </Grid>
    )
}

export default Home
