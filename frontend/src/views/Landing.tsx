import {Grid} from "@mui/material";
import {useCurrentUser} from "../hooks/UseCurrentUser";
import Admin from "./Admin";
import User from "./User";
import {Outlet} from "react-router-dom";

const Landing = (): JSX.Element => {
    const currentUser = useCurrentUser()

    return (
        <Grid container spacing={1}>
            {currentUser?.isUserLoggedIn && currentUser.hasAdminPrivilege()
                ? <Admin/>
                : <User/>
            }
            <Outlet />
        </Grid>
    )
}

export default Landing