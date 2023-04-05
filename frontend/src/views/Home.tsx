import {useKeycloak} from "@react-keycloak/web";
import {Button, Grid} from "@mui/material";

const Home = (): JSX.Element => {
    const { keycloak } = useKeycloak();

    const isAuthenticated = keycloak.authenticated
    const loginRequired = keycloak.loginRequired
    const token = keycloak.token
    const userInfo = keycloak.userInfo;

    const handleLogout = () => {
      keycloak.logout();
    };

    const handleLogin = () => {
        keycloak.login();
    };

    const log =() => {
        console.log("isAuthenticated :"  + isAuthenticated)
        console.log("loginRequired :" + loginRequired)
        console.log("token : " + token)
        console.log("UserInfo :" + userInfo)
    }

    return (
        <Grid container>
            { isAuthenticated ?
                <Grid sm={3} item>
                    <Button variant={"contained"} onClick={handleLogout}>Logout</Button>
                </Grid>
                :
                <Grid sm={3} item>
                    <Button variant={"contained"} onClick={handleLogin}>Login</Button>
                </Grid>
            }

            <Grid sm={3} item>
                <Button variant={"outlined"} onClick={log}>print vitals</Button>
            </Grid>
        </Grid>
    )
}

export default Home
