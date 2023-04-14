import React from 'react'
import './App.css'
import {SnackbarProvider} from 'notistack'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {CssBaseline, StyledEngineProvider} from '@mui/material'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import Keycloak from "keycloak-js";
import {ReactKeycloakProvider} from '@react-keycloak/web'
import ApiProvider from "./providers/api/ApiContext";
import {LoadingOverlay} from "./components/LoadingOverlay";
import UserStoreProvider from "./providers/user/UserStoreContext";
import Routing from "./components/Routing";
import { BrowserRouter } from 'react-router-dom'

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

function App() {
    return (
        <ReactKeycloakProvider
            authClient={keycloak}
            autoRefreshToken
            LoadingComponent={<LoadingOverlay isLoading={true}/>}
        >
            <BrowserRouter>
                <SnackbarProvider
                    maxSnack={3}
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    hideIconVariant={false}
                    preventDuplicate
                >
                    <ApiProvider>
                        <UserStoreProvider>
                            <StyledEngineProvider injectFirst>
                                <ThemeProvider theme={theme}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <CssBaseline>

                                            <Routing/>

                                        </CssBaseline>
                                    </LocalizationProvider>
                                </ThemeProvider>
                            </StyledEngineProvider>
                        </UserStoreProvider>
                    </ApiProvider>
                </SnackbarProvider>
            </BrowserRouter>
        </ReactKeycloakProvider>
    )
        ;
}

export default App;
