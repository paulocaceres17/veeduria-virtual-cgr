import { ubigeoTypes } from "../../types/ubigeoTypes"

export const getRegiones = ( payload ) => ({
    type: ubigeoTypes.REGION_GET_START,
    payload
})

export const resetRegiones = ( payload = [] ) => ({
    type: ubigeoTypes.REGION_RESET,
    payload
})

export const getProvincias = ( payload ) => ({
    type: ubigeoTypes.PROVINCIA_GET_START,
    payload
})

export const resetProvincias = ( payload = [] ) => ({
    type: ubigeoTypes.PROVINCIA_RESET,
    payload
})

export const getDistritos = ( payload ) => ({
    type: ubigeoTypes.DISTRITO_GET_START,
    payload
})

export const resetDistritos = ( payload = [] ) => ({
    type: ubigeoTypes.DISTRITO_RESET,
    payload
})

