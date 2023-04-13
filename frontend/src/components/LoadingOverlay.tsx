import { Backdrop, CircularProgress, Typography } from '@mui/material'

import React from 'react'

export function LoadingOverlay(props: { isLoading: boolean; text?: string }): JSX.Element {
    return (
        <Backdrop
            sx={{
                zIndex: (theme) => theme.zIndex.modal + 1,
                color: '#fff',
            }}
            open={props.isLoading}
            data-testid="loading-overlay"
        >
            <div>
                <Typography align={'center'}>
                    <CircularProgress color="inherit" />
                </Typography>
                {props.text && <Typography>{props.text}</Typography>}
            </div>
        </Backdrop>
    )
}