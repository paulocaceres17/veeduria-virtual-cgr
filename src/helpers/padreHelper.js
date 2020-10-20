import { valida_dni_url } from "./urlBase"
import { apiCall } from "./apiCall";

const validaDNI = async ( padre ) => {

    try {

        // const formData = new FormData()
        // formData.append('dni', dni);
        // const reniec = { dni: dni }
        // for (var k in reniec) {
        //     formData.append(k, reniec[k]);
        // }

        // const resp = await fetch( valida_dni_url, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        //     body: formData
        // })
        // const response = await resp.json()

        // if ( response.Success ) {
        //     return response.Message
        // }
        // else {
        //     console.log('padreHelper', '36')
        //     throw response
        // }

        const resp = await apiCall( 'POST', valida_dni_url, padre )
        const response = resp.data

        if ( response.Success ) {
            return response
        }
        else {
            console.log('padreHelper', '37')
            throw response
        }

    } catch ( e ) {
        console.log('padreHelper', '42')
        throw e
    }
}

export {
    validaDNI
}