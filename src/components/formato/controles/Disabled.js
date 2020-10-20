import React from 'react'
import Fab from '@material-ui/core/Fab';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

export const DisabledControl = () => {
    return (
        <Fab disabled variant="extended">
            <NotInterestedIcon/> Deshabilitado
        </Fab>
    )
}
