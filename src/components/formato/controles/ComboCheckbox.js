import React from 'react'
import { FormControl, Select, InputLabel, MenuItem, Checkbox, ListItemText, Input } from '@material-ui/core'

export const ComboCheckboxControl = ( { respuestas, preg, handleChange, classes, MenuProps } ) => {

    return (
        <FormControl className={ classes.multiSelect }>
            <InputLabel>Respuesta</InputLabel>
            <Select
            id={ preg.ID }
            multiple
            value={ preg.RESPUESTA }
            onChange={ ( e ) => handleChange( e, preg.ID ) }
            input={ <Input/> }
            renderValue={ ( selected ) =>{ 
                let arrDes = []
                selected.forEach(element => {
                    arrDes.push( element.split('_')[2] )
                });
                return arrDes.join(', ')
            } }
            MenuProps={ MenuProps }
            >
            {
                respuestas.filter( rpta => rpta.ID_PREGUNTA === preg.ID )
                .map( rpta => (
                    <MenuItem 
                    key={ preg.ID + '_' + rpta.ID }
                    value={ preg.ID + '_' + rpta.ID + '_' + rpta.DESCRIPCION }>
                        <Checkbox
                        checked={ preg.RESPUESTA.indexOf( preg.ID + '_' + rpta.ID + '_' + rpta.DESCRIPCION  ) > -1}
                        color="primary" />
                        <ListItemText primary={ rpta.DESCRIPCION } />
                    </MenuItem>
                ) )
            }
            </Select>
        </FormControl>

    )
}
