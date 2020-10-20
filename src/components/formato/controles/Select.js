import React from 'react'
import { FormControl, Select, InputLabel, MenuItem } from '@material-ui/core'

export const SelectControl = ( { respuestas, preg, handleChange, classes } ) => {

    return (
        <FormControl id={ preg.ID } className={ classes.formControl } >
            <InputLabel>
                Respuesta
            </InputLabel>
            <Select
            name={ preg.ID }
            onChange={ ( e ) => handleChange( e, preg.ID ) } >
            {
                respuestas.filter( rpta => rpta.ID_PREGUNTA === preg.ID )
                .map( rpta => (
                    <MenuItem
                    key={ preg.ID + '_' + rpta.ID }
                    name={ preg.ID + '_' + rpta.ID }
                    value={ preg.ID + '_' + rpta.ID }>{ rpta.DESCRIPCION }</MenuItem>
                ) )
            }
            </Select>
        </FormControl>

    )
}
