import { estudianteTypes } from "../../types/estudianteTypes"
import { valida_DNI } from "../actions/estudianteActions"
import { validaDNI } from "../../helpers/estudianteHelper"
import { Mensaje } from "../../controls/Mensaje"
import { logErrors, MessagesError } from "../../logErrors"

export const validarDNI = ( estudiante ) => {
    return async( dispatch, getState ) => {
        try {
            const { dni, message, severity } = getState().estudiante

            if (estudiante.dni === dni && severity === 'success' && message !== '') return;

            dispatch( valida_DNI() )
            
            const response = await validaDNI( estudiante )

            console.log(response)
            if ( response.Validacion !== '' ){
                dispatch( { type: estudianteTypes.ESTUDIANTE_SAVE_ERROR, payload: { message: response.Validacion, severity: 'error' } } );
                Mensaje( response.Validacion, 'Aviso', 'info' )
            }
            else{
                dispatch( { type: estudianteTypes.ESTUDIANTE_SAVE_COMPLETE, 
                    payload: { ...estudiante, message: 'Se validó con éxito', severity: 'success' } } );
            }

        } catch ( e ) {
            dispatch( { type: estudianteTypes.ESTUDIANTE_SAVE_ERROR, payload: [] } );
            const err = logErrors( e )
            Mensaje( err.Message, err.Type )
            
        }
        
    }
}