import { formato_get_url } from "./urlBase"
import { apiCall } from "./apiCall";

const listar_formatos = async () => {

    try {

        const resp = await apiCall( 'GET', formato_get_url, null )
        const response = resp.data

        if ( response.Success ) {
            return response
        }
        else {
            console.log('formatoHelper', '15')
            throw response
        }

    } catch ( e ) {
        console.log('formatoHelper', '20')
        throw e
    }
}

export {
    listar_formatos
}