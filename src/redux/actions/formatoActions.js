import { formatoTypes } from "../../types/formatoTypes"

export const getFormatos = ( payload ) => ({
    type: formatoTypes.FORMATO_GET_START,
    payload
})

export const resetFormatos = ( payload = [] ) => ({
    type: formatoTypes.FORMATO_RESET,
    payload
})

