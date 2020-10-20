import { institucionTypes } from "../../types/instEducativaTypes";
import { institucionState } from "../../states/instEducativaState";

export const institucionReducer = ( state = institucionState, action ) => {
    switch ( action.type ) {
		case institucionTypes.INSTITUCION_RESET:
            return { ...state, isLoading: false, listado: [] };

		case institucionTypes.INSTITUCION_GET_START:
            return { ...state, isLoading: true, listado: action.payload };

		case institucionTypes.INSTITUCION_GET_COMPLETE:
            return { ...state, isLoading: false, message: 'Se buscó con éxito', severity: 'success', listado: action.payload };
            
        case institucionTypes.INSTITUCION_GET_ERROR:
            return { ...state, isLoading: false, listado: action.payload };

        default:
            return { ...state };
    }
}
