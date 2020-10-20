import { captchaTypes } from "../../types/captchaTypes"

export const getCaptcha = ( payload ) => ({
    type: captchaTypes.CAPTCHA_GET_START,
    payload
})
