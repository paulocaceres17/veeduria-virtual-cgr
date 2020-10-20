import { ubigeoTypes } from "../../types/ubigeoTypes";
import { ubigeoState } from "../../states/ubigeoState";

export const regionReducer = ( state = ubigeoState, action ) => {
    switch ( action.type ) {
		case ubigeoTypes.REGION_RESET:
            return { ...state, isLoading: false, listado: [] };

		case ubigeoTypes.REGION_GET_START:
            return { ...state, isLoading: true, listado: action.payload };

		case ubigeoTypes.REGION_GET_COMPLETE:
            return { ...state, isLoading: false, message: 'Se buscó con éxito', severity: 'success', listado: action.payload };
            
        case ubigeoTypes.REGION_GET_ERROR:
            return { ...state, isLoading: false, listado: action.payload };

        default:
            return { ...state };
    }
}


export const provinciaReducer = ( state = ubigeoState, action ) => {
    switch ( action.type ) {
		case ubigeoTypes.PROVINCIA_RESET:
            return { ...state, isLoading: false, listado: [] };

		case ubigeoTypes.PROVINCIA_GET_START:
            return { ...state, isLoading: true, listado: action.payload };

		case ubigeoTypes.PROVINCIA_GET_COMPLETE:
            return { ...state, isLoading: false, message: 'Se buscó con éxito', severity: 'success', listado: action.payload };
            
        case ubigeoTypes.PROVINCIA_GET_ERROR:
            return { ...state, isLoading: false, listado: action.payload };

        default:
            return { ...state };
    }
}


export const distritoReducer = ( state = ubigeoState, action ) => {
    switch ( action.type ) {
		case ubigeoTypes.DISTRITO_RESET:
            return { ...state, isLoading: false, listado: [] };

		case ubigeoTypes.DISTRITO_GET_START:
            return { ...state, isLoading: true, listado: action.payload };

		case ubigeoTypes.DISTRITO_GET_COMPLETE:
            return { ...state, isLoading: false, message: 'Se buscó con éxito', severity: 'success', listado: action.payload };
            
        case ubigeoTypes.DISTRITO_GET_ERROR:
            return { ...state, isLoading: false, listado: action.payload };

        default:
            return { ...state };
    }
}
