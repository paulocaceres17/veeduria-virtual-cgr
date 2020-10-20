import { formatoTypes } from "../../types/formatoTypes";
import { formatoState } from "../../states/formatoState";

export const formatoReducer = ( state = formatoState, action ) => {
    switch ( action.type ) {
		case formatoTypes.FORMATO_RESET:
            return { ...state, isLoading: false, listado: [] };

		case formatoTypes.FORMATO_GET_START:
            return { ...state, isLoading: true, listado: action.payload };

		case formatoTypes.FORMATO_GET_COMPLETE:
            return { ...state, isLoading: false, message: 'Se buscó con éxito', severity: 'success', listado: action.payload };
            
        case formatoTypes.FORMATO_GET_ERROR:
            return { ...state, isLoading: false, listado: action.payload };

        default:
            return { ...state };
    }
}
