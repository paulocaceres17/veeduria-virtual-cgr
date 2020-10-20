import * as Yup from 'yup'

const ProfileSchema = Yup.object().shape( {
    dni: Yup.string()
        .required('Requerido')
        .min(8, 'Debe tener 8 dígitos')
        .max(8, 'Debe tener 8 dígitos'),
    fecha_emision: Yup.date()
        .max(new Date(), "No puede ser mayor a hoy")
        .typeError('Fecha incorrecta')
        .required('Requerido')
        .nullable(),
    codigo_verificacion: Yup.string()
        .required('Requerido')
        .min(4, 'Debe tener 4 caracteres')
        .max(4, 'Debe tener 4 caracteres'),
    celular: Yup.string()
    .min(9, 'Debe tener 9 dígitos')
    .max(9, 'Debe tener 9 dígitos')
    // password: Yup.string("")
    //     .min(8, "Password must contain at least 8 characters")
    //     .required("Enter your password"),
    // confirmPassword: Yup.string("Enter your password")
    //     .required("Confirm your password")
    //     .oneOf([Yup.ref("password")], "Password does not match")
} )
// validate={ values => { 
        //     var errors = {}
        //     if ( !values.dni ) {
        //         errors.dni = 'El DNI es requerido'
        //     }
        //     else if ( values.dni.length !== 8 ) {
        //         errors.dni = 'DNI tiene que tener 8 dígitos'
        //     }
        //     else if (isNaN(values.dni)) {
        //         errors.dni = 'DNI tiene que ser numérico';
        //     }
            
        //     if ( !values.celular ) {
        //         errors.celular = 'Es requerido'
        //     }
        //     else if ( values.celular.length !== 9 ) {
        //         errors.celular = 'DNI tiene que tener 8 dígitos'
        //     }
        //     else if (isNaN(values.celular)) {
        //         errors.dni = 'DNI celular tiene que ser numérico';
        //     }
        //     return errors
        // } }
export default ProfileSchema