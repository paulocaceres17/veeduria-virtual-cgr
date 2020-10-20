import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { padreReducer } from "../reducers/padreReducer";
import thunk from "redux-thunk";
import { captchaReducer } from "../reducers/captchaReducer";
import { regionReducer, provinciaReducer, distritoReducer } from "../reducers/ubigeoReducer";
import { institucionReducer } from "../reducers/instEducativaReducer";
import { estudianteReducer } from "../reducers/estudianteReducer";
import { preguntaReducer } from "../reducers/preguntaReducer";
import { veeduriaReducer } from "../reducers/veeduriaReducer";
import { formatoReducer } from "../reducers/formatoReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const reducers = combineReducers( {
    padre: padreReducer,
    captcha: captchaReducer,
    regiones: regionReducer,
    provincias: provinciaReducer,
    distritos: distritoReducer,
    instituciones: institucionReducer,
    estudiante: estudianteReducer,
    pregunta: preguntaReducer,
    veeduria: veeduriaReducer,
    formatos: formatoReducer,
} );

export const store = createStore(
    reducers,
    composeEnhancers( applyMiddleware( thunk ) )
)