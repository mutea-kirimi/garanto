import React from 'react'
import './App.css'
import {SnackbarProvider} from 'notistack'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {CssBaseline, StyledEngineProvider} from '@mui/material'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import Keycloak from "keycloak-js";
import {ReactKeycloakProvider} from '@react-keycloak/web'
import {AuthClientError, AuthClientEvent, AuthClientTokens} from "@react-keycloak/core/lib/types";
import Home from "./views/Home";

const theme = createTheme({
    palette: {
        primary: {
            main: '#0052cc',
        },
        secondary: {
            main: '#edf2ff',
        },
    },
});

const keycloak = new Keycloak({
    url: 'http://localhost:8090',
    realm: 'master',
    clientId: 'garanto-frontend',
});

const initOptions = { onLoad: "login-required"}

const eventLogger = (eventType: AuthClientEvent, error?: AuthClientError) => {
    console.log(eventType)
    console.log(error)
}

const tokenLogger = (tokens: AuthClientTokens) => {
    console.log(tokens)
}

function App() {
    return (
        <ReactKeycloakProvider
            authClient={keycloak}
            initOptions={initOptions}
            onEvent={eventLogger}
            autoRefreshToken
            onTokens={tokenLogger}

        >
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <CssBaseline>

                            <SnackbarProvider
                                maxSnack={3}
                                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                                hideIconVariant={false}
                                preventDuplicate
                            >
                                <Home></Home>
                            </SnackbarProvider>

                        </CssBaseline>
                    </LocalizationProvider>
                </ThemeProvider>
            </StyledEngineProvider>
        </ReactKeycloakProvider>
    );
}

export default App;
