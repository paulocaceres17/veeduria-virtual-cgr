import { institucionTypes } from '../../types/instEducativaTypes'

export const getInstituciones = ( payload ) => ({
    type: institucionTypes.INSTITUCION_GET_START,
    payload
})

export const resetInstituciones = ( payload = [] ) => ({
    type: institucionTypes.INSTITUCION_RESET,
    payload
})
