import { veeduriaTypes } from "../../types/veeduriaTypes";
import { veeduriaState } from "../../states/veeduriaState";

export const veeduriaReducer = ( state = veeduriaState, action ) => {
    switch ( action.type ) {

		case veeduriaTypes.VEEDURIA_SAVE_START:
            return { ...state, isLoading: true };

		case veeduriaTypes.VEEDURIA_SAVE_COMPLETE:
            return { ...state, isLoading: false, message: 'ok', severity: 'success', ...action.payload };

        case veeduriaTypes.VEEDURIA_SAVE_ERROR:
            return { ...state, isLoading: false, 
                padre: {},
                estudiante: {},
                preguntas: [],
                ...action.payload };

        default:
            return { ...state };
    }
}
