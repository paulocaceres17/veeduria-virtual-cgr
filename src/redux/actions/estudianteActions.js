import { estudianteTypes } from "../../types/estudianteTypes"

export const valida_DNI = ( payload ) => ({
    type: estudianteTypes.ESTUDIANTE_SAVE_START,
    payload
})
