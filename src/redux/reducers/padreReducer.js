import { padreTypes } from "../../types/padreTypes";
import { padreState } from "../../states/padreState";

export const padreReducer = ( state = padreState, action ) => {
    switch ( action.type ) {
		case padreTypes.PADRE_SAVE_START:
            return { ...state, isLoading: true };

		case padreTypes.PADRE_SAVE_COMPLETE:
            return { ...state, isLoading: false, ...action.payload };

        case padreTypes.PADRE_SAVE_ERROR:
            return { ...state, isLoading: false, ...action.payload };

        case padreTypes.PADRE_VALIDATED:
            return { ...state, isLoading: false, ...action.payload };
            
        default:
            return { ...state };
    }
}
