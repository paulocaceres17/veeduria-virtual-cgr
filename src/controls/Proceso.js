import Swal from 'sweetalert2'

export const ProcesoStart = ( title = '' ) => {
    Swal.fire({
        title,
        text: 'Procesando...',
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading()
        }
    })
}

export const ProcesoEnd = () => {
    Swal.close()
}