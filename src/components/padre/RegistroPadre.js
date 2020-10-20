import React, { useState, useEffect, useRef } from 'react'

import { TextField,
    Accordion,
    AccordionDetails,
    Divider,
    Button,
    Typography,
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
import { useForm } from '../../hooks/useForm'
import { Formik, Field, Form, useField, useFormikContext } from 'formik'
import ProfileSchema from './registroPadreProfile'
import { getCaptchaSR } from '../../redux/thunk/captchaThunk'
import { validCodigoVerificacion } from '../../redux/actions/padreActions'
// import { isEmpty } from 'lodash';


export const RegistroPadreScreen = ( ) => {
    const classes = useStyles();


    const dispatch = useDispatch()
    const padre = useSelector( state => state.padre )
    const captcha = useSelector( state => state.captcha )
    const [ formValues, handleInputChange, reset ] = useForm( padre )
    const {  nombres_completos } = formValues

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
    const [iscaptcha, setiscaptcha] = useState(captcha)

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
    const captchaActive = useRef( captcha.codigo )


    // useEffect(() => {
    //     if ( iscaptcha.codigo !== captchaActive.current )
    //     {
    //         setState({ ...state, open: true, message: padre.message, severity: 'error' });
    //         dispatch( getCaptchaSR() )
    //         // reset( padre )
    //         setiscaptcha(captcha)
    //         captchaActive.current = captcha.codigo
    //     }
    // }, [ captcha, padre, iscaptcha.codigo, state, dispatch ])

    useEffect(() => {
        if ( padre.message !== messageActive.current )
        {
            setState({ ...state, open: true, message: messageActive.current, severity: 'error' });
            dispatch( getCaptchaSR() )
            dispatch( validCodigoVerificacion( { message: '' } ) )
            // reset( padre )
            messageActive.current = padre.message
        }
    }, [ padre, state, dispatch ])


    // useEffect(() => {
    //     if ( isLoading && dni !== dniPadre.current )
    //     {
    //         setState({ ...state, open: true });
    //     }
    // }, [ isLoading, dni, state ])

    // const handleReset = () => {
    //     if (!window.confirm('Reset?')) {
    //         throw new Error('Cancel reset');
    //     }
    // };


    // const resetRef = useRef();

    // useEffect(() => {
    //     resetRef.current && resetRef.current();
    // }, [initialValues]);

    // const render = ({ resetForm }) => {
    //     resetRef.current = resetForm;
    //     return ( .... )
    // };



    

    async function fetchNewTextC(a, b) {
        await new Promise(r => setTimeout(r, 1000));
        return `textA: ${a}, textB: ${b}`;
    }
    
    const MyField = props => {
        const {
        values: { dni, celular },
        setFieldValue,
        } = useFormikContext();
        const [field, meta] = useField(props);
    
        useEffect(() => {
        let isCurrent = true;
        // your business logic around when to fetch goes here.
        if (dni.trim() !== '' && celular.trim() !== '') {
            fetchNewTextC(dni, celular).then(nombres_completos => {
            if (!!isCurrent) {
                // prevent setting old values
                setFieldValue(props.name, nombres_completos);
            }
            });
        }
        return () => {
            isCurrent = false;
        };
        }, [celular, dni, setFieldValue, props.name]);
    
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
            console.log(values)
            const payload = { 
                dni: values.dni, 
                fecha_emision: values.fecha_emision, 
                codigo_verificacion: values.codigo_verificacion, 
                celular: values.celular 
            }
            resetForm( { values: {...values, codigo_verificacion: '' } } )
            dispatch( savePadreBD( payload ) ) 
            setTimeout(() => {
                // alert(JSON.stringify(values, null, 2))
                setSubmitting(false)
            }, 100);
        } }

        render={ ( {
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            ...props
        } ) => (
                    
                    <form 
                    className={classes.form}
                    autoComplete="off"
                    id="frm-padre"
                    onSubmit={ handleSubmit } >
                            

                        <Accordion defaultExpanded id="acordion">
                            <StyledAccordionSummary aria-controls="panel1a-content" id="panel1a-hea"
                            expandIcon={ <ExpandMoreIcon className={ classes.icon }/> } >
                                <Typography className={ classes.heading }>
                                    Datos del padre/madre de familia
                                </Typography>
                            </StyledAccordionSummary>
                            <AccordionDetails className={ classes.detalle }>

                                <div className="ed-grid rows-gap s-gap-3 m-gap-3 l-gap-4 s-grid-1 m-grid-2 lg-grid-4">
                                    <div>  
                                        <TextField
                                        fullWidth
                                        size="small"
                                        label="DNI"
                                        name="dni"
                                        value={ values.dni }
                                        // helperText="Incorrect entry."
                                        onBlur={ handleBlur }
                                        onChange={ handleChange }
                                        helperText={ touched.dni ? errors.dni : ""}
                                        error={ touched.dni && Boolean(errors.dni) }
                                        InputProps={{
                                            inputComponent: TextNumber
                                        }}
                                        // InputProps={{
                                        //     inputComponent: (props) => <TextNumber 
                                        //     name="dni"
                                        //     value={ dni }
                                        //     onChange={ handleInputChange }
                                        //     format="########" { ...props } />,
                                        // }}
                                        />
                                        {/* { touched.celular && errors.celular }
                                        <ErrorMessage component="span" name="dni" /> */}
                                        {/* <ErrorMessage name="dni">{(msg) => <div>{msg}</div>}</ErrorMessage> */}
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
                                            onChange={ value => props.setFieldValue("fecha_emision", value) }
                                            KeyboardButtonProps={{
                                                "aria-label": "change date"
                                            }}


                                            // value={ values.fecha_emision }
                                            // onChange={ handleChange }
                                            onBlur={ handleBlur }
                                            
                                            helperText={ touched.fecha_emision ? errors.fecha_emision : ""}
                                            error={ touched.fecha_emision && Boolean(errors.fecha_emision) }



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
                                        // style={{ textTransform: 'uppercase' }}
                                        inputProps={{ maxLength: 4, style: {textTransform: 'uppercase'} }}
                                        onBlur={ handleBlur }
                                        onChange={ handleChange }
                                        helperText={ touched.codigo_verificacion ? errors.codigo_verificacion : ""}
                                        error={ touched.codigo_verificacion && Boolean(errors.codigo_verificacion) }
                                        />
                                    </div>
                                    <div>
                                        {
                                            (captcha.imagen && <img src={ captcha.imagen } alt="captcha"/> )
                                        }
                                    </div>
                                    <div className="s-y-3 s-x-1 s-cols-1 
                                                    m-y-2 m-x-1 m-cols-2
                                                    l-y-2 l-x-1 l-cols-2">
                                        {/* <TextField
                                        disabled
                                        helperText="Éste dato de completa de Reniec"
                                        fullWidth 
                                        size="small"
                                        label="Nombres y apellidos"
                                        name="nombres_completos"
                                        value={ nombres_completos }
                                        onChange={ handleInputChange }
                                        // variant="outlined"
                                        /> */}
                                        <MyField name="nombres_completos" />
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
                                        helperText={ touched.celular ? errors.celular : ""}
                                        error={ touched.celular && Boolean(errors.celular) }
                                        InputProps={{
                                            inputComponent: TextNumber
                                        }}
                                        />
                                    </div>
                                </div>

                                <Alerta state={ state } handleClose={ handleClose }/>

                            </AccordionDetails>
                            <Divider />
                            <StyledAccordionActions> 
                                <Button variant="outlined" size="large"
                                type="submit" disabled={ isSubmitting }
                                // onClick={ handleSave }
                                color="primary" startIcon={<SearchIcon />} >
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
