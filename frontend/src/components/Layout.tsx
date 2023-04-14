import {useKeycloak} from "@react-keycloak/web";
import {Button, Grid} from "@mui/material";
import {useCurrentUser} from "../hooks/UseCurrentUser";
import {Outlet} from "react-router-dom";

const Layout = (): JSX.Element => {
    const {keycloak} = useKeycloak();
    const currentUser = useCurrentUser()

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
        /*Add header and footer around the Outlet component*/
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
        </Grid>
    )
}

export default Layout
