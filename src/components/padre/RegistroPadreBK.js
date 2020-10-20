import React, { useState, useEffect, useRef } from 'react'

import { TextField,
    Accordion,
    AccordionDetails,
    Divider,
    Button,
    Typography,
    CircularProgress,
} from '@material-ui/core'

import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers'


import SearchIcon from '@material-ui/icons/Search'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import DateFnsUtils from '@date-io/date-fns'
import esLocale from "date-fns/locale/es"
import 'date-fns'
// import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux'
import { savePadreBD } from '../../redux/thunk/padreThunk'
import { Alerta } from '../../controls/Alerta'
import { TextNumber } from '../../controls/TextNumber'
import { useStyles, StyledAccordionSummary, StyledAccordionActions } from './RegistroPadreStyle'
import { Formik, useField, useFormikContext } from 'formik'
import ProfileSchema from './registroPadreProfile'
import { getCaptchaSR } from '../../redux/thunk/captchaThunk'
import { validCodigoVerificacion } from '../../redux/actions/padreActions'


export const RegistroPadreScreen = ( ) => {
    const classes = useStyles();


    const dispatch = useDispatch()
    const padre = useSelector( state => state.padre )
    const captcha = useSelector( state => state.captcha )
    const estudiante = useSelector( state => state.estudiante )

    // const [selectedDate, setSelectedDate] = useState(new Date('2020-08-18T21:11:54'));
    // const handleDateChange = (date) => {
    //     handleInputChange( { 
    //                         target: {
    //                             name: 'fecha_emision',
    //                             value: date,
    //                         } } );
    // };

    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message: '',
        severity: 'success'
    });

    const [isLooked, setIsLooked] = useState(false)
    const [expanded, setexpanded] = useState(true)

    useEffect(() => {
        if (!isLooked) {
            setIsLooked( true )
            dispatch( getCaptchaSR() )
        }
    }, [ isLooked, dispatch ])

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const messageActive = useRef( padre.message )

    useEffect(() => {

        if ( padre.message !== '' && padre.severity === 'error' && !captcha.isLoading )
        {
            setState({ ...state, open: true, message: padre.message, severity: padre.severity });
            dispatch( getCaptchaSR() )
            dispatch( validCodigoVerificacion( { message: '' } ) )
            messageActive.current = padre.message
        }
        if ( padre.message !== messageActive.current && padre.severity === 'success' )
        {
            setState({ ...state, open: true, message: padre.message, severity: padre.severity });
            messageActive.current = padre.message
            setTimeout(() => {
                setexpanded( false )
            }, 1500);
        }

    }, [ padre, state, dispatch, captcha ])


    const MyField = props => {
        const {
            setFieldValue,
        } = useFormikContext();
        const [field, meta] = useField(props);
    
        useEffect(() => {
            let isCurrent = true;
            // your business logic around when to fetch goes here.
            if ( padre.codigo_verificacion.toLowerCase() !== captcha.codigo.toLowerCase()
            && !padre.isLoading ) {
                if (!!isCurrent) {
                    setFieldValue(props.name, '');
                    setFieldValue('codigo_verificacion', '');
                }
            }
            else if ( padre.nombre_completo !== '' && !padre.isLoading ) {
                if (!!isCurrent) {
                    setFieldValue(props.name, padre.nombre_completo);
                }
            }

            return () => {
                isCurrent = false;
            };
        }, [ setFieldValue, props.name ]);
    
        return (
        <>
            <TextField
            disabled
            helperText="Éste dato de completa de Reniec"
            fullWidth 
            size="small"
            label="Nombres y apellidos"
            {...props} {...field}
            // name="nombres_completos"
            // value={ nombres_completos }
            // onChange={ handleInputChange }
            // variant="outlined"
            />
            {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
        </>
        );
    };

    return (
        // initialValues={props.initialValues}
        <Formik
        // enableReinitialize={true}
        initialValues={ padre }
        validationSchema={ ProfileSchema }
        // onReset={ handleReset } 
        onSubmit={ ( values, { props, setSubmitting, resetForm }) => {
            const payload = { 
                dni: values.dni, 
                fecha_emision: values.fecha_emision, 
                codigo_verificacion: values.codigo_verificacion, 
                celular: values.celular 
            }
            // resetForm( { values: {...values, codigo_verificacion: '' } } )
            dispatch( savePadreBD( payload ) ) 
            setTimeout(() => {
                setSubmitting(false)
            }, 1000);
        } }

        render={ ( {
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid,
            ...props
        } ) => (
                    
                    <form 
                    className={classes.form}
                    autoComplete="off"
                    id="frm-padre"
                    onSubmit={ handleSubmit } >

                        <Accordion expanded={ expanded } id="acordion" onChange={ () => { setexpanded( !expanded ) } }>
                            <StyledAccordionSummary aria-controls="panel1a-content" id="panel1a-hea"
                            expandIcon={ <ExpandMoreIcon className={ classes.icon }/> } >
                                <Typography className={ classes.heading }>
                                    Datos del padre/madre de familia
                                </Typography>
                            </StyledAccordionSummary>
                            <AccordionDetails className={ classes.detalle }>

                                <div className="ed-grid rows-gap s-gap-3 m-gap-3 l-gap-3 s-grid-1 m-grid-2 lg-grid-4">
                                    <div>  
                                        <TextField
                                        fullWidth
                                        size="small"
                                        label="DNI"
                                        name="dni"
                                        value={ values.dni }
                                        onBlur={ handleBlur }
                                        onChange={ handleChange }
                                        helperText={ touched.dni ? errors.dni : ""}
                                        error={ touched.dni && Boolean( errors.dni ) }
                                        InputProps={ { inputComponent: TextNumber } }
                                        />
                                    </div>
                                    <div>
                                        <MuiPickersUtilsProvider utils={ DateFnsUtils } locale={ esLocale } >
                                            <KeyboardDatePicker
                                            disableFuture
                                            clearable
                                            // helperText="Localization done right"
                                            invalidDateMessage="Fecha incorrecta"
                                            maxDateMessage="No puede ser mayor a hoy"
                                            openTo="year"
                                            format="dd/MM/yyyy"
                                            clearLabel="borrar"
                                            cancelLabel="cancelar"
                                            okLabel="aceptar"
                                            label="Fecha de emisión del DNI"
                                            views={ ["year", "month", "date"] }
                                            // variant="inline"
                                            // maxDate={new Date("2020-03-30")}
                                            // inputVariant="outlined"
                                            fullWidth
                                            size="small"
                                            name="fecha_emision"
                                            value={ values.fecha_emision }
                                            onChange={ value => props.setFieldValue( "fecha_emision", value ) }
                                            KeyboardButtonProps={ { "aria-label": "change date" } }
                                            onBlur={ handleBlur }
                                            helperText={ touched.fecha_emision ? errors.fecha_emision : "" }
                                            error={ touched.fecha_emision && Boolean( errors.fecha_emision ) }
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                    <div>
                                        <TextField
                                        fullWidth
                                        size="small"
                                        label="Código de verificación"
                                        name="codigo_verificacion"
                                        value={ values.codigo_verificacion }
                                        inputProps={ { maxLength: 4, style: { textTransform: 'uppercase' } } }
                                        onBlur={ handleBlur }
                                        onChange={ handleChange }
                                        helperText={ touched.codigo_verificacion ? errors.codigo_verificacion : "" }
                                        error={ touched.codigo_verificacion && Boolean( errors.codigo_verificacion ) }
                                        />
                                    </div>
                                    <div>
                                        <div className={ classes.wrapper }>
                                            {
                                                ( captcha.imagen )
                                                    ? <img src={ captcha.imagen } alt="captcha"/>
                                                    : <CircularProgress size={30} className={ classes.captchaProgress } />
                                            }
                                        </div>
                                    </div>
                                    <div className="s-y-3 s-x-1 s-cols-1 
                                                    m-y-2 m-x-1 m-cols-2
                                                    l-y-2 l-x-1 l-cols-2">
                                        <MyField name="nombre_completo" />
                                    </div>
                                    <div>
                                        <TextField
                                        fullWidth
                                        size="small"
                                        label="Celular"
                                        name="celular"
                                        value={ values.celular }
                                        onChange={ handleChange }
                                        onBlur={ handleBlur }
                                        helperText={ touched.celular ? errors.celular : "" }
                                        error={ touched.celular && Boolean( errors.celular ) }
                                        InputProps={ { inputComponent: TextNumber } }
                                        />
                                    </div>
                                </div>

                                <Alerta state={ state } handleClose={ handleClose }/>

                            </AccordionDetails>
                            <Divider />
                            <StyledAccordionActions> 
                                <Button variant="outlined" size="large"
                                type="submit" disabled={ !isValid || isSubmitting }
                                color="primary" startIcon={ <SearchIcon /> } >
                                    Buscar
                                </Button>
                            </StyledAccordionActions>
                        </Accordion>

                    </form>
                )
        }
        />

    )
}
