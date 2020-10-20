import { padreTypes } from "../../types/padreTypes"

export const savePadre = ( payload ) => ({
    type: padreTypes.PADRE_SAVE_START,
    payload
})

export const validCodigoVerificacion = ( payload ) => ({
    type: padreTypes.PADRE_VALIDATED,
    payload
})
