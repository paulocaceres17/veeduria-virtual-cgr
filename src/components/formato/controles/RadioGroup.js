import React from 'react'
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core'

export const RadioGroupControl = ( { respuestas, preg, handleChange } ) => {

    return (
        <FormControl component="fieldset">
            <RadioGroup row name={ preg.ID } onChange={ ( e ) => handleChange( e, preg.ID ) }>
                {
                    respuestas.filter( rpta => rpta.ID_PREGUNTA === preg.ID )
                    .map( rpta => (
                        <FormControlLabel value={ preg.ID + '_' + rpta.ID }
                        name={ preg.ID + '_' + rpta.ID }
                        control={ <Radio color="primary" /> } 
                        label={ rpta.DESCRIPCION } />
                    ) )
                }
            </RadioGroup>
        </FormControl>
    )
}
