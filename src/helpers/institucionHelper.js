import { institucion_get_url } from "./urlBase"
import { apiCall } from "./apiCall";

const listar_instituciones = async ( region, provincia, distrito, nivel ) => {

    try {

        const resp = await apiCall( 'GET', `${institucion_get_url}/${region}/${provincia}/${distrito}/${nivel}`, null )
        const response = resp.data

        if ( response.Success ) {
            return response
        }
        else {
            console.log('ubigeoHelper', '15')
            throw response
        }

    } catch ( e ) {
        console.log('ubigeoHelper', '20')
        throw e
    }
}

export {
    listar_instituciones
}