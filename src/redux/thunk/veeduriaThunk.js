import { Mensaje } from "../../controls/Mensaje"
import { logErrors } from "../../logErrors"
import { insertar_veeduria } from "../../helpers/veeduriaHelper"
import { veeduriaTypes } from "../../types/veeduriaTypes"
import { insertVeeduria } from "../actions/veeduriaActions"
import { ProcesoEnd, ProcesoStart } from "../../controls/Proceso"

export const insertVeeduriaBD = (estudiante) => {
    return async( dispatch, getState ) => {
        try {
            const padre = getState().padre
            // const estudiante = getState().estudiante
            const { preguntas } = getState().pregunta


            dispatch( insertVeeduria() )
            
            ProcesoStart()
            const response = await insertar_veeduria({ padre, estudiante, preguntas });

            if ( response.Validacion !== '' ){
                dispatch( { type: veeduriaTypes.VEEDURIA_SAVE_ERROR, payload: { message: response.Validacion, severity: 'error' } } );
            }
            else{
                dispatch( { type: veeduriaTypes.VEEDURIA_SAVE_COMPLETE, 
                    payload: { message: 'ok', severity: 'success' } } );
            }
            
            ProcesoEnd()

        } catch ( e ) {
            ProcesoEnd()
            const err = logErrors( e )
            dispatch( { type: veeduriaTypes.VEEDURIA_SAVE_ERROR, payload: { message: err.Message, severity: 'error' } } );
            // dispatch( { type: veeduriaTypes.VEEDURIA_SAVE_ERROR, payload: { message: 'Se perdió la conexión. Intente nuevamente por favor', severity: 'error' } } );
            Mensaje( err.Message, err.Type )
        }
        
    }
}