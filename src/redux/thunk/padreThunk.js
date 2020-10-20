import { padreTypes } from "../../types/padreTypes"
import { savePadre, validCodigoVerificacion } from "../actions/padreActions"
import { ProcesoStart, ProcesoEnd } from "../../controls/Proceso"
import { validaDNI } from "../../helpers/padreHelper"
import { Mensaje } from "../../controls/Mensaje"
import { logErrors, MessagesError } from "../../logErrors"

export const savePadreBD = ( padre ) => {
    return async( dispatch, getState ) => {
        try {

            const { dni } = getState().padre

            if ( dni !== padre.dni )
            {
                const { codigo } = getState().captcha

                if ( padre.codigo_verificacion.toLowerCase() !== codigo.toLowerCase() )
                {
                    dispatch( validCodigoVerificacion( { message: MessagesError.codigo_verificacion, severity: 'error' } ) )
                }
                else{

                    ProcesoStart()
                    dispatch( savePadre( padre ) )
                    
                    const response = await validaDNI( padre )

                    if ( response.Validacion !== '' ){
                        dispatch( { type: padreTypes.PADRE_SAVE_ERROR, payload: { message: response.Validacion, severity: 'error' } } );
                    }
                    else{
                        dispatch( { type: padreTypes.PADRE_SAVE_COMPLETE, 
                            payload: { ...response.Data, message: 'Se buscó con éxito', severity: 'success' } } );
                    }

                    ProcesoEnd()

                }

            }
        } catch ( e ) {

            ProcesoEnd()
            dispatch( { type: padreTypes.PADRE_SAVE_ERROR, payload: [] } );
            const err = logErrors( e )
            Mensaje( err.Message, err.Type )
            
        }
        
    }
}