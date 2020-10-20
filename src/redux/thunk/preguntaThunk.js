import { Mensaje } from "../../controls/Mensaje"
import { logErrors } from "../../logErrors"
import { listar_preguntas } from "../../helpers/preguntaHelper"
import { getPreguntas } from "../actions/preguntaActions"
import { preguntaTypes } from "../../types/preguntaTypes"

export const getPreguntasBD = () => {
    return async( dispatch, getState ) => {
        try {
            dispatch( getPreguntas() )
            
            const response = await listar_preguntas()

            if ( response.Validacion !== '' ){
                dispatch( { type: preguntaTypes.PREGUNTA_GET_ERROR, payload: { message: response.Validacion, severity: 'error' } } );
            }
            else{
                console.log(response.Data);
                dispatch( { type: preguntaTypes.PREGUNTA_GET_COMPLETE, 
                    payload: response.Data } );
            }

        } catch ( e ) {
            const err = logErrors( e )
            dispatch( { type: preguntaTypes.PREGUNTA_GET_ERROR, payload: { message: err.Message, severity: 'error' } } );
            Mensaje( err.Message, err.Type )
        }
        
    }
}