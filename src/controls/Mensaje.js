import Swal from 'sweetalert2'

export const Mensaje = ( text, type = 'Error', icon = 'error' ) => {
    Swal.fire(type, text, icon)
}
