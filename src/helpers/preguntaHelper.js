import { pregunta_url } from "./urlBase"
import { apiCall } from "./apiCall";

const listar_preguntas = async () => {

    try {

        const resp = await apiCall( 'GET', pregunta_url, null )
        const response = resp.data

        if ( response.Success ) {
            return response
        }
        else {
            console.log('preguntasHelper', '15')
            throw response
        }

    } catch ( e ) {
        console.log('preguntasHelper', '20')
        throw e
    }
}

export {
    listar_preguntas
}