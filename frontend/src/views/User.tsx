import {Button, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const User = (): JSX.Element => {
    const navigate = useNavigate();

    return (
        <Grid item>
            <Typography> USER </Typography>
            <Button variant={"outlined"}  onClick={() => navigate("/landing/info", )} > nested </Button>
        </Grid>
    )
}

export default User
