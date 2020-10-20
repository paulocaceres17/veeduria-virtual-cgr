import React from 'react'
import { Snackbar, withStyles, makeStyles } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { theme } from '../styles/setTheme';

const useStyles = makeStyles((theme) => ({
    err: {
        backgroundColor: theme.palette.success.main,
        color: '#fff',
    },
}));


const SuccessAlert = withStyles({
    root: {
        backgroundColor: theme.palette.success.main,
        color: '#fff',
    },
    icon: {
        backgroundColor: theme.palette.success.main,
        color: '#fff',
    },
})(Alert);

const ErrorAlert = withStyles({
    root: {
        backgroundColor: theme.palette.error.main,
        color: '#fff',
    },
    icon: {
        backgroundColor: theme.palette.error.main,
        color: '#fff',
    },
})(Alert);

export const Alerta = ( { state, handleClose } ) => {
    
const classes = useStyles();
    const { vertical, horizontal, open, message, severity } = state
    return (
        <Snackbar
        autoHideDuration={ 2000 }
        anchorOrigin={ { vertical, horizontal } }
        open={ open }
        onClose={ handleClose }
        message={ message }
        key={ vertical + horizontal }>
            {/* {
                ( severity === 'error' )
                ? 
                    <ErrorAlert onClose={ handleClose } severity="error">
                        <AlertTitle>Error</AlertTitle>
                        { message }
                    </ErrorAlert>
                :
                    <SuccessAlert onClose={ handleClose } severity="success">
                        <AlertTitle>Éxito</AlertTitle>
                        { message }
                    </SuccessAlert>
            } */}
            {
                ( severity === 'error' )
                &&
                    <Alert variant="filled" onClose={ handleClose } severity={ severity }>
                        <AlertTitle>Alerta!</AlertTitle>
                        { message }
                    </Alert>
            }
            {/* <Alert variant="filled" onClose={ handleClose } severity={ severity }>
                <AlertTitle>Alerta!</AlertTitle>
                { message }
            </Alert> */}
            
        </Snackbar>


        // <Snackbar
        //     anchorOrigin={ { vertical, horizontal } }
        //     open={ open }
        //     onClose={ handleClose }
        //     message="I love snacks"
        //     key={ vertical + horizontal }
        // />
    )
}
