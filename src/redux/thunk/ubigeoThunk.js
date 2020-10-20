import { getRegiones, getProvincias, getDistritos } from "../actions/ubigeoActions"
import { Mensaje } from "../../controls/Mensaje"
import { logErrors } from "../../logErrors"
import { listar_regiones, listar_provincias, listar_distritos } from "../../helpers/ubigeoHelper"
import { ubigeoTypes } from "../../types/ubigeoTypes"

export const getRegionesBD = () => {
    return async( dispatch, getState ) => {
        try {
            dispatch( getRegiones( [] ) )
            
            const response = await listar_regiones()

            if ( response.Validacion !== '' ){
                dispatch( { type: ubigeoTypes.REGION_GET_ERROR, payload: { message: response.Validacion, severity: 'error' } } );
            }
            else{
                dispatch( { type: ubigeoTypes.REGION_GET_COMPLETE, 
                    payload: response.Data } );
            }

        } catch ( e ) {
            dispatch( { type: ubigeoTypes.REGION_GET_ERROR, payload: [] } );
            const err = logErrors( e )
            // Mensaje( err.Message, err.Type )
            Mensaje( 'Se perdió la conexión. Intente nuevamente por favor', err.Type )
        }
        
    }
}


export const getProvinciasBD = ( region ) => {
    return async( dispatch, getState ) => {
        try {
            dispatch( getProvincias( [] ) )
            
            const response = await listar_provincias( region )

            if ( response.Validacion !== '' ){
                dispatch( { type: ubigeoTypes.PROVINCIA_GET_ERROR, payload: { message: response.Validacion, severity: 'error' } } );
            }
            else{
                dispatch( { type: ubigeoTypes.PROVINCIA_GET_COMPLETE, 
                    payload: response.Data } );
            }

        } catch ( e ) {
            dispatch( { type: ubigeoTypes.PROVINCIA_GET_ERROR, payload: [] } );
            const err = logErrors( e )
            // Mensaje( err.Message, err.Type )
            Mensaje( 'Se perdió la conexión. Intente nuevamente por favor', err.Type )
        }
        
    }
}


export const getDistritosBD = ( region, provincia ) => {
    return async( dispatch, getState ) => {
        try {
            dispatch( getDistritos( [] ) )
            
            const response = await listar_distritos( region, provincia )

            if ( response.Validacion !== '' ){
                dispatch( { type: ubigeoTypes.DISTRITO_GET_ERROR, payload: { message: response.Validacion, severity: 'error' } } );
            }
            else{
                
                dispatch( { type: ubigeoTypes.DISTRITO_GET_COMPLETE, 
                    payload: response.Data } );
            }

        } catch ( e ) {
            dispatch( { type: ubigeoTypes.DISTRITO_GET_ERROR, payload: [] } );
            const err = logErrors( e )
            // Mensaje( err.Message, err.Type )
            Mensaje( 'Se perdió la conexión. Intente nuevamente por favor', err.Type )
        }
        
    }
}