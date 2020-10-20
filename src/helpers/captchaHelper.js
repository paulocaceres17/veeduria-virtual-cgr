import { genera_captcha_url } from "./urlBase"
import { apiCall } from "./apiCall";

const generaCaptcha = async () => {

    try {
        const resp = await apiCall( 'GET', genera_captcha_url, null )
        const response = resp.data

        if ( response.Success ) {
            return response.Data
        }
        else {
            console.log('captchaHelper', '14')
            throw response
        }

    } catch ( e ) {
        console.log(e)
        console.log('captchaHelper', '20')
        throw e
    }
}

export {
    generaCaptcha
}