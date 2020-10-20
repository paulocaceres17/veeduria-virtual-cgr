import { valida_existe_dni_url } from "./urlBase"
import { apiCall } from "./apiCall";

const validaDNI = async ( estudiante ) => {

    try {
        const resp = await apiCall( 'POST', valida_existe_dni_url, estudiante )
        const response = resp.data

        if ( response.Success ) {
            return response
        }
        else {
            console.log('estudianteHelper', '37')
            throw response
        }

    } catch ( e ) {
        console.log('estudianteHelper', '42')
        throw e
    }
}

export {
    validaDNI
}