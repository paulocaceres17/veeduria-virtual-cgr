import { captchaState } from "../../states/captchaState";
import { captchaTypes } from "../../types/captchaTypes";

export const captchaReducer = ( state = captchaState, action ) => {
    switch ( action.type ) {
		case captchaTypes.CAPTCHA_GET_START:
            return { ...state, isLoading: true  };

		case captchaTypes.CAPTCHA_GET_COMPLETE:
            return { ...state, isLoading: false, ...action.payload };

        case captchaTypes.CAPTCHA_GET_ERROR:
            return { ...state, isLoading: false };
            
        default:
            return { ...state };
    }
}
