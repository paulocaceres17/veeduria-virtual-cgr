import { preguntaTypes } from '../../types/preguntaTypes'

export const getPreguntas = ( payload ) => ({
    type: preguntaTypes.PREGUNTA_GET_START,
    payload
})

export const setComplete = ( payload ) => ({
    type: preguntaTypes.PREGUNTA_SET_COMPLETE,
    payload
})

export const setHabilitado = ( payload ) => ({
    type: preguntaTypes.PREGUNTA_SET_HABILITADO,
    payload
})