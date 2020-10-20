import React from 'react'
import { FormControl, FormControlLabel, FormGroup, Checkbox } from '@material-ui/core'

export const CheckboxGroupControl = ( { respuestas, preg, handleChange } ) => {

    return (
        <FormControl component="fieldset">
            <FormGroup row>
                {
                    respuestas.filter( rpta => rpta.ID_PREGUNTA === preg.ID )
                    .map( rpta => (
                        <FormControlLabel
                        control={
                            <Checkbox
                                options={ rpta }
                                id={ preg.ID + '_' + rpta.ID  }
                                name={ preg.ID + '_' + rpta.ID }
                                onChange={ ( e ) => handleChange( e, preg.ID ) }
                                color="primary"
                            />
                        }
                        label={ rpta.DESCRIPCION }
                        />
                    ) )
                }
            </FormGroup>
        </FormControl>

    )
}
