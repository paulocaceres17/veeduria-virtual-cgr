import { region_get_url, provincia_get_url, distrito_get_url } from "./urlBase"
import { apiCall } from "./apiCall";

const listar_regiones = async () => {

    try {

        const resp = await apiCall( 'GET', region_get_url, null )
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

const listar_provincias = async ( region ) => {

    try {

        const resp = await apiCall( 'GET', `${provincia_get_url}/${region}`, null )
        const response = resp.data

        if ( response.Success ) {
            return response
        }
        else {
            console.log('ubigeoHelper', '36')
            throw response
        }

    } catch ( e ) {
        console.log('ubigeoHelper', '41')
        throw e
    }
}

const listar_distritos = async ( region, provincia ) => {

    try {

        const resp = await apiCall( 'GET', `${distrito_get_url}/${region}/${provincia}`, null )
        const response = resp.data

        if ( response.Success ) {
            return response
        }
        else {
            console.log('ubigeoHelper', '57')
            throw response
        }

    } catch ( e ) {
        console.log('ubigeoHelper', '62')
        throw e
    }
}

export {
    listar_regiones,
    listar_provincias,
    listar_distritos
}