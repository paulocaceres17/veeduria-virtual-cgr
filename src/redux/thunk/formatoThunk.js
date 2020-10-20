import { getFormatos } from "../actions/formatoActions"
import { Mensaje } from "../../controls/Mensaje"
import { logErrors } from "../../logErrors"
import { listar_formatos } from "../../helpers/formatoHelper"
import { formatoTypes } from "../../types/formatoTypes"

export const getFormatosBD = () => {
    return async( dispatch, getState ) => {
        try {
            dispatch( getFormatos( [] ) )
            
            const response = await listar_formatos()

            if ( response.Validacion !== '' ){
                dispatch( { type: formatoTypes.FORMATO_GET_ERROR, payload: { message: response.Validacion, severity: 'error' } } );
            }
            else{
                dispatch( { type: formatoTypes.FORMATO_GET_COMPLETE, 
                    payload: response.Data } );
            }

        } catch ( e ) {
            dispatch( { type: formatoTypes.FORMATO_GET_ERROR, payload: [] } );
            const err = logErrors( e )
            Mensaje( err.Message, err.Type )
        }
        
    }
}
