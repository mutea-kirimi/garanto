import {Button, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Admin = (): JSX.Element => {
    const navigate = useNavigate()
    return (
        <Grid item>
            <Typography> ADMIN yo </Typography>
            <Button variant={"outlined"}  onClick={() => navigate("/landing/admin", )} > nested </Button>
        </Grid>
    )
}

export default Admin
