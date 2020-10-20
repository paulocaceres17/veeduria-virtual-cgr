import { veeduria_url } from "./urlBase"
import { apiCall } from "./apiCall";

const insertar_veeduria = async (data) => {

    try {

        const resp = await apiCall( 'POST', veeduria_url, data )
        const response = resp.data

        if ( response.Success ) {
            return response
        }
        else {
            console.log('veeduriaHelper', '15')
            throw response
        }

    } catch ( e ) {
        console.log('veeduriaHelper', '20')
        throw e
    }
}

export {
    insertar_veeduria
}