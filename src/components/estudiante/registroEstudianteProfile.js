import * as Yup from 'yup'

const ProfileSchema = Yup.object().shape( {
    nombre: Yup.string()
        .required('Requerido'),
    apellido_paterno: Yup.string()
        .required('Requerido'),
    apellido_materno: Yup.string()
        .required('Requerido'),
    dni: Yup.string()
        .required('Requerido')
        .min(8, 'Debe tener 8 dígitos')
        .max(8, 'Debe tener 8 dígitos'),
    nivel: Yup.string()
        .required('Requerido'),
    grado: Yup.string()
        .required('Requerido')
        .nullable(),
    seccion: Yup.string()
        .required('Requerido'),
    region: Yup.string()
        .required('Requerido'),
    provincia: Yup.string()
        .required('Requerido'),
    distrito: Yup.string()
        .required('Requerido'),
    inst_educativa: Yup.string()
        .required('Requerido'),
    // acceptTerms: Yup.bool().oneOf([true], 'Debe seleccionar el formato'),
    formato: Yup.array().required("Debe seleccionar el formato"),
    // aceptar_termino: Yup.boolean()
    // .oneOf([true]),
    // riesgos: Yup.array( Yup.string().oneOf( ['High', 'Medium', 'Low'] ) ).min(1),
    // comentario_riesgos: Yup.mixed().when('riesgos', {
    //     is: ( riesgos ) => riesgos.find( ir => ir === 'High'),
    //     then: Yup.string().required().min(20).max(100),
    //     otherwise: Yup.string().min(20).max(100)
    // })
} )

// const schema = yup
//   .object({
//     red: yup.boolean(),
//     orange: yup.boolean(),
//     green: yup.boolean()
//   })
//   .test(
//     'myCustomTest',
//     null,
//     (obj) => {
//       if ( obj.red || obj.orange || obj.green ) {
//         return true; // everything is fine
//       }

//       return new yup.ValidationError(
//         'Please check one checkbox',
//         null,
//         'myCustomFieldName'
//       );
//     }
//   );

export default ProfileSchema