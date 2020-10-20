
import React from 'react'
import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button, makeStyles,
    List, ListItem, ListItemText } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(17),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export const ConfirmControl = ( props ) => {

    const classes = useStyles();

    const { onSubmit, onClose, open, dni, nombre, ...other } = props;

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        onSubmit();
    };

    return (
        <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        aria-labelledby="confirmation-dialog-title"
        open={open}
        {...other}
        >
        <DialogTitle id="confirmation-dialog-title">Confirmación</DialogTitle>
            <DialogContent dividers>
                <Typography className={ classes.heading }>
                    ¿Desea registrar la veeduría escolar?
                </Typography>

                <List component="div" role="list">
                    <ListItem button divider disabled role="listitem">
                    </ListItem>
                    <ListItem button divider role="listitem">
                        <ListItemText primary={ nombre } secondary={ dni } style={ { textTransform: 'capitalize' } } />
                    </ListItem>
                </List>

            </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={ handleCancel } color="primary"
            variant="outlined">
            Cancelar
            </Button>
            <Button onClick={ handleOk } color="primary"
            type="submit" 
            variant="contained">
                Aceptar
            </Button>
        </DialogActions>
        </Dialog>
    )
}
