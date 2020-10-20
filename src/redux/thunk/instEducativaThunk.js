import { Mensaje } from "../../controls/Mensaje"
import { logErrors } from "../../logErrors"
import { listar_instituciones } from "../../helpers/institucionHelper"
import { getInstituciones } from "../actions/instEducativaActions"
import { institucionTypes } from "../../types/instEducativaTypes"

export const getInstitucionesBD = ( region, provincia, distrito, nivel ) => {
    return async( dispatch, getState ) => {
        try {
            dispatch( getInstituciones( [] ) )
            
            const response = await listar_instituciones( region, provincia, distrito, nivel )

            if ( response.Validacion !== '' ){
                dispatch( { type: institucionTypes.INSTITUCION_GET_ERROR, payload: { message: response.Validacion, severity: 'error' } } );
            }
            else{
                dispatch( { type: institucionTypes.INSTITUCION_GET_COMPLETE, 
                    payload: response.Data } );
            }

        } catch ( e ) {
            dispatch( { type: institucionTypes.INSTITUCION_GET_ERROR, payload: [] } );
            const err = logErrors( e )
            Mensaje( err.Message, err.Type )
        }
        
    }
}