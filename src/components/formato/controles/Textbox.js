import React from 'react'
import { TextField } from '@material-ui/core'

export const TextboxControl = ( { preg, handleChange, classes } ) => {

    return (
        <TextField
        className={ classes.textField }
        size="small"
        label="Respuesta"
        name={ preg.ID }
        value={ preg.RESPUESTA[0] }
        onChange={ ( e ) => handleChange( e, preg.ID ) }
        />

    )
}
