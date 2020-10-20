import { preguntaTypes } from "../../types/preguntaTypes";
import { preguntaState } from "../../states/preguntaState";

export const preguntaReducer = ( state = preguntaState, action ) => {
    switch ( action.type ) {

		case preguntaTypes.PREGUNTA_GET_START:
            return { ...state, isLoading: true };

		case preguntaTypes.PREGUNTA_GET_COMPLETE:
            return { ...state, isLoading: false, message: 'Se buscó con éxito', severity: 'success', ...action.payload };
 
		case preguntaTypes.PREGUNTA_SET_COMPLETE:
            return { ...state, ...action.payload };

        case preguntaTypes.PREGUNTA_SET_HABILITADO:
            console.log(action.payload);
            return {
                ...state,
                preguntas: state.preguntas.map(
                    preg => preg.ID === action.payload.ID
                        ? { ...preg , HABILITADO: action.payload.HABILITADO }
                        : preg
                )
            }
            // return { ...state, ...action.payload };
            
        case preguntaTypes.PREGUNTA_GET_ERROR:
            return { ...state, isLoading: false, 
                grupos: [],
                preguntas: [],
                respuestas: [],
                dependencias: [],
                ...action.payload };

        default:
            return { ...state };
    }
}
