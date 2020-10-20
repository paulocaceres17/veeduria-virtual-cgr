import { veeduriaTypes } from '../../types/veeduriaTypes'

export const insertVeeduria = ( payload ) => ({
    type: veeduriaTypes.VEEDURIA_SAVE_START,
    payload
})
