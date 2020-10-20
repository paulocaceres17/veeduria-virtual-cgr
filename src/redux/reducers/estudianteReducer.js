import { estudianteState } from "../../states/estudianteState";
import { estudianteTypes } from "../../types/estudianteTypes";

export const estudianteReducer = ( state = estudianteState, action ) => {
    switch ( action.type ) {
		case estudianteTypes.ESTUDIANTE_SAVE_START:
            return { ...state, isLoading: true, message: '' };

		case estudianteTypes.ESTUDIANTE_SAVE_COMPLETE:
            return { ...state, isLoading: false, ...action.payload };

        case estudianteTypes.ESTUDIANTE_SAVE_ERROR:
            return { ...state, isLoading: false, ...action.payload };

        case estudianteTypes.ESTUDIANTE_VALIDATED:
            return { ...state, isLoading: false, ...action.payload };
            
        default:
            return { ...state };
    }
}
