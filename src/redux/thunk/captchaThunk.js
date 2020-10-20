import { Mensaje } from "../../controls/Mensaje"
import { logErrors } from "../../logErrors"
import { getCaptcha } from "../actions/captchaActions"
import { captchaTypes } from "../../types/captchaTypes"
import { generaCaptcha } from "../../helpers/captchaHelper"

export const getCaptchaSR = ( captcha ) => {
    return async( dispatch ) => {
        try {
            // ProcesoStart()
            dispatch( getCaptcha( captcha ) )
            
            const img = await generaCaptcha()

            dispatch( { type: captchaTypes.CAPTCHA_GET_COMPLETE, payload: img } );
        } catch ( e ) {
            dispatch( { type: captchaTypes.CAPTCHA_GET_ERROR, payload: {} } );
            const err = logErrors( e )
            Mensaje( err.Message, err.Type )
        }
        
    }
}