import React, { useState, useCallback, useEffect, useMemo } from 'react'

import { TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Accordion,
    AccordionDetails,
    Typography,
    CircularProgress,
    Divider,
    FormControlLabel,
    Checkbox,
    FormHelperText,
    FormGroup,
    FormLabel,
    // AppBar,
    // Toolbar
} from '@material-ui/core'

import { Autocomplete } from '@material-ui/lab'

import { ListadoEstudiantesScreen } from './ListadoEstudiantesScreen'
import SendIcon from '@material-ui/icons/Send'
import CachedIcon from '@material-ui/icons/Cached'

import { FormatoScreen } from '../formato/FormatoScreen'

import { useStyles, StyledAccordionSummary, StyledAccordionActions } from './RegistroEstudianteStyle'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useSelector, useDispatch } from 'react-redux'
import { getRegionesBD, getProvinciasBD, getDistritosBD } from '../../redux/thunk/ubigeoThunk'
import { TextNumber } from '../../controls/TextNumber'
import { getProvincias, getDistritos, getRegiones, resetRegiones, resetProvincias, resetDistritos } from '../../redux/actions/ubigeoActions'
import { getInstituciones, resetInstituciones } from '../../redux/actions/instEducativaActions'
import { getInstitucionesBD } from '../../redux/thunk/instEducativaThunk'
import { Formik, Field, useFormikContext, useField } from 'formik'
import MuiTextField from '@material-ui/core/TextField';
import {
    AutocompleteRenderInputParams,
} from 'formik-material-ui-lab';
import ProfileSchema from './registroEstudianteProfile'
import { getPreguntasBD } from '../../redux/thunk/preguntaThunk'
import { getFormatosBD } from '../../redux/thunk/formatoThunk'

import { insertVeeduriaBD } from '../../redux/thunk/veeduriaThunk'
import { validarDNI } from '../../redux/thunk/estudianteThunk'
import { ConfirmControl } from '../../controls/Confirmacion'
import { Alerta } from '../../controls/Alerta'
import { useRef } from 'react'
import { Mensaje } from '../../controls/Mensaje'
// import Confirm from '../../controls/Confirmacion'

const { niveles, grados_primaria, grados_secundaria, secciones } = require("../../data/params")



export const RegistroEstudianteScreen = () => {

    const classes = useStyles()

    const dispatch = useDispatch()
    const padre = useSelector( state => state.padre )
    const estudiante = useSelector( state => state.estudiante )
    const regiones = useSelector( state => state.regiones )
    const provincias = useSelector( state => state.provincias )
    const distritos = useSelector( state => state.distritos )
    const instituciones = useSelector( state => state.instituciones )
    const formatos = useSelector( state => state.formatos )
    const { isComplete } = useSelector( state => state.pregunta )
    const veeduria = useSelector( state => state.veeduria )
    const [expanded, setexpanded] = useState(false)



    const [alert, setAlert] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message: '',
        severity: 'success'
    });
    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };
    const messageActive = useRef( veeduria.message )

    useEffect(() => {

        if ( veeduria.message !== messageActive.current && veeduria.severity === 'error' )
        {
            setAlert({ ...alert, open: true, message: veeduria.message, severity: veeduria.severity });
            messageActive.current = veeduria.message
        }
        if ( veeduria.message === 'ok' && veeduria.severity === 'success' )
        {
            Mensaje( 'Muchas gracias por participar de la veeduría virtual.', '¡Registro Exitoso!', 'success' )
            // setAlert({ ...alert, open: true, message: 'Se registró con éxito.', severity: veeduria.severity });
            messageActive.current = veeduria.message
            setTimeout(() => {
                handleReload();
            }, 3000);
        }

    }, [ veeduria, alert ])





    useEffect( () => {
        if ( padre.severity === 'success' ) {
            setTimeout( () => {
                setexpanded( true )
                dispatch( getFormatosBD() )
                dispatch( getPreguntasBD() )
            }, 1500 );
        }
    }, [ padre.severity, dispatch ] )



    const MyField = props => {
        const {
            setFieldValue,
        } = useFormikContext();
        const [field, meta] = useField(props);
    
        useEffect(() => {
            let isCurrent = true;
            if ( estudiante.message?.length > 0 && estudiante.severity !== 'success' && !estudiante.isLoading ) {
                if (!!isCurrent) {
                    setFieldValue(props.name, '');
                }
            }

            return () => {
                isCurrent = false;
            };
        }, [ setFieldValue, props.name ]);
    

        useEffect(() => {
            if (meta.value.length === 8 && !estudiante.isLoading)
            {
                if (meta.value !== padre.dni)
                {
                    dispatch( validarDNI( { dni: meta.value } ) )
                }
            }
        }, [ meta.value ]);

        return (
        <>
            <TextField
            fullWidth 
            size="small"
            label="DNI"
            onChange={ ( { target } ) => {
                console.log(target.value)

                if (target.value.length === 8)
                {
                    if (target.value !== padre.dni)
                    {
                        dispatch( validarDNI( { dni: target.value } ) )
                    }
                }
                setFieldValue( "dni", target.value )
            } }
            helperText={ meta.touched ? meta.error : ""}
            error={ meta.touched && Boolean( meta.error ) }
            InputProps={ { inputComponent: TextNumber } }
            disabled={ estudiante.isLoading }
            {...props} {...field}
            />
            { estudiante.isLoading && <CircularProgress size={ 20 } className={ classes.fieldProgress } /> }
            
        </>
        );
    };


    const handleReload = () => {
        // history.push('/')
        // history.replace('/')

        window.location.reload();
    }



    const [open, setOpen] = React.useState(false);

    const handleClickListItem = () => {
        setOpen(true);
    };

    const handleClose = (newValue) => {
        setOpen(false);
        if (newValue) {
            console.log(newValue);
        }
    };


    return (
        <Formik
        initialValues={ estudiante }
        validate={values => {
            let errors = {};
            
            if (values.dni.length === 8)
            {
                if (values.dni === padre.dni)
                {
                    errors.dni = 'No debe ser igual al DNI del padre'
                }
            }
            return errors;
        }}
        validationSchema={ ProfileSchema }
        onSubmit={ ( values, { setSubmitting, resetForm } ) => {
            const payload = { 
                nombre: values.nombre, 
                apellido_paterno: values.apellido_paterno, 
                apellido_materno: values.apellido_materno,
                dni: values.dni, 
                nivel: values.nivel,
                grado: values.grado,
                seccion: values.seccion,
                region: values.region.REGION_COD,
                provincia: values.provincia.PROVINCIA_COD,
                distrito: values.distrito.DISTRITO_COD,
                inst_educativa: values.inst_educativa.CUI,
                formato: values.formato,
            }
            setOpen(false);
            dispatch( insertVeeduriaBD( payload ) ) 
            setTimeout(() => {
                setSubmitting(false)
            }, 3000);
        } }
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                isValid,
                setFieldValue,
                ...props
            }) => (
                <form 
                className={ classes.form }
                autoComplete="off"
                id="frm-estudiante"
                onSubmit={ handleSubmit }>
                                            
                    <Accordion expanded={ expanded } id="acordion" onChange={ () => { setexpanded( !expanded ) } }
                    disabled={padre.severity !== 'success'} >
                        <StyledAccordionSummary aria-controls="panel2a-content" id="panel2a-header"
                        expandIcon={ <ExpandMoreIcon className={ classes.icon }/> } >
                            <Typography className={ classes.heading }>
                                Datos del estudiante
                            </Typography>
                        </StyledAccordionSummary>
                        <AccordionDetails className={ classes.detalle }>
                            
                            <div className="ed-grid rows-gap s-gap-3 m-gap-3 l-gap-3 s-grid-2 m-grid-6 lg-grid-12">
                                <div className="s-y-1 s-x-1 s-cols-2 
                                                m-y-1 m-x-1 m-cols-2
                                                l-y-1 l-x-1 l-cols-2">   
                                    <TextField
                                    fullWidth 
                                    size="small"
                                    label="Nombres"
                                    name="nombre"
                                    value={ values.nombre }
                                    onBlur={ handleBlur }
                                    onChange={ handleChange }
                                    helperText={ touched.nombre ? errors.nombre : ""}
                                    error={ touched.nombre && Boolean( errors.nombre ) }
                                    inputProps={ { style: { textTransform: 'capitalize' } } }
                                    />
                                </div>
                                <div className="s-y-2 s-x-1 s-cols-2
                                                m-y-1 m-x-3 m-cols-2
                                                l-y-1 l-x-3 l-cols-2">
                                    <TextField
                                    fullWidth 
                                    size="small"
                                    label="Apellido paterno"
                                    name="apellido_paterno"
                                    value={ values.apellido_paterno }
                                    onBlur={ handleBlur }
                                    onChange={ handleChange }
                                    // onChange={e => {
                                    //     let value = e.target.value;
                    
                                    //     value = value.replace(/[^A-Za-z]/gi, "");
                    
                                    //     this.setState({
                                    //         value
                                    //     });
                                    // }}
                                    helperText={ touched.apellido_paterno ? errors.apellido_paterno : ""}
                                    error={ touched.apellido_paterno && Boolean( errors.apellido_paterno ) }
                                    inputProps={ { style: { textTransform: 'capitalize' } } }
                                    />
                                </div>
                                <div className="s-y-3 s-x-1 s-cols-2
                                                m-y-1 m-x-5 m-cols-2
                                                l-y-1 l-x-5 l-cols-2">
                                    <TextField
                                    fullWidth 
                                    size="small"
                                    label="Apellido materno"
                                    name="apellido_materno"
                                    value={ values.apellido_materno }
                                    onBlur={ handleBlur }
                                    onChange={ handleChange }
                                    helperText={ touched.apellido_materno ? errors.apellido_materno : ""}
                                    error={ touched.apellido_materno && Boolean( errors.apellido_materno ) }
                                    inputProps={ { style: { textTransform: 'capitalize' } } }
                                    />
                                </div>
                                <div className="s-y-4 s-x-1 s-cols-2
                                                m-y-2 m-x-1 m-cols-2
                                                l-y-1 l-x-7 l-cols-2">
                                    <div className={ classes.wrapper }>
                                        <MyField name="dni"/>
                                        {/* 
                                        <TextField
                                        fullWidth 
                                        size="small"
                                        label="DNI"
                                        name="dni"
                                        value={ values.dni }
                                        onBlur={ handleBlur }
                                        // onChange={ handleChange }
                                        onChange={ ( { target } ) => {
                                            console.log(target.value)

                                            if (target.value.length === 8)
                                            {
                                                if (target.value !== padre.dni)
                                                {
                                                    dispatch( validarDNI( { dni: target.value } ) )
                                                }
                                            }
                                            setFieldValue( "dni", target.value )
                                        } }
                                        helperText={ touched.dni ? errors.dni : ""}
                                        error={ touched.dni && Boolean( errors.dni ) }
                                        InputProps={ { inputComponent: TextNumber } }
                                        disabled={ estudiante.isLoading }
                                        />
                                        { estudiante.isLoading && <CircularProgress size={ 20 } className={ classes.fieldProgress } /> }
                                     */}
                                    </div>
                                </div>
                                <div className="s-y-5 s-x-1 s-cols-2
                                                m-y-2 m-x-3 m-cols-2
                                                l-y-1 l-x-9 l-cols-2">
                                    <FormControl
                                    fullWidth
                                    size="small"
                                    id="form-nivel"
                                    name="nivel"
                                    error={ touched.nivel && Boolean( errors.nivel ) }
                                    >
                                        <InputLabel>
                                            Nivel
                                        </InputLabel>
                                        <Select
                                        value={ values.nivel }
                                        onBlur={ handleBlur( 'nivel' ) }
                                        onChange={ e => {
                                            const { value } = e.target

                                            setFieldValue("nivel", value);
                                            setFieldValue("inst_educativa", '');

                                            if( regiones.listado.length === 0 )
                                                dispatch( getRegionesBD() )

                                            dispatch( resetInstituciones() )
                                            if ( value === 'P')
                                                setFieldValue("grados", grados_primaria);
                                            else
                                                setFieldValue("grados", grados_secundaria);

                                            if ( values.distrito !== '' ){
                                                dispatch( getInstitucionesBD( values.region.REGION_COD, 
                                                                            values.provincia.PROVINCIA_COD,
                                                                            values.distrito.DISTRITO_COD,
                                                                            value ) )
                                            }
                                            
                                        } }
                                        >
                                            {
                                                niveles.map( nivel => (
                                                    <MenuItem key={ nivel.cod } value={ nivel.cod }>{ nivel.des }</MenuItem>
                                                ) )
                                            }
                                        </Select>
                                        {
                                            touched.nivel
                                            ? <FormHelperText>{ errors.nivel }</FormHelperText>
                                            : null
                                        }
                                    </FormControl>
                                </div>
                                <div>
                                    <FormControl
                                    fullWidth
                                    size="small"
                                    id="form-grado"
                                    name="grado"
                                    error={ touched.grado && Boolean( errors.grado ) }
                                    >
                                        <InputLabel>
                                            Grado
                                        </InputLabel>
                                        <Select
                                        value={ values.grado }
                                        id="grado"
                                        name="grado"
                                        onBlur={ handleBlur( 'grado' ) }
                                        onChange={ handleChange( 'grado' ) }
                                        >
                                        {
                                            values.grados  &&
                                            values.grados.map( grado => (
                                                <MenuItem key={ grado.cod } value={ grado.cod }>{ grado.des }</MenuItem>
                                            ) )
                                        }
                                        </Select>
                                        {
                                            touched.grado
                                            ? <FormHelperText>{ errors.grado }</FormHelperText>
                                            : null
                                        }
                                    </FormControl>
                                </div>
                                <div>
                                    <FormControl
                                    fullWidth
                                    size="small"
                                    id="form-seccion"
                                    name="seccion"
                                    error={ touched.seccion && Boolean( errors.seccion ) }
                                    >
                                        <InputLabel>
                                            Sección
                                        </InputLabel>
                                        <Select
                                        value={ values.seccion }
                                        onBlur={ handleBlur( 'seccion' ) }
                                        onChange={ handleChange( 'seccion' ) } 
                                        >
                                        {
                                            secciones.map( ( seccion, i) => (
                                                <MenuItem key={ i } value={ seccion.cod }>{ seccion.des }</MenuItem>
                                            ) )
                                        }
                                        </Select>
                                        {
                                            touched.seccion
                                            ? <FormHelperText>{ errors.seccion }</FormHelperText>
                                            : null
                                        }
                                    </FormControl>
                                </div>
                                <div className="s-y-7 s-x-1 s-cols-2 
                                                m-y-3 m-x-1 m-cols-2
                                                l-y-2 l-x-1 l-cols-2"> 
                                    <div className={ classes.wrapper }>
                                        <Autocomplete
                                        id="region"
                                        name="region"
                                        options={ regiones.listado }
                                        getOptionLabel={ option => ( option.REGION_DES ? option.REGION_DES : '' ) }
                                        getOptionSelected={ ( option, value ) => option.REGION_COD === value.REGION_COD }
                                        fullWidth
                                        size="small"
                                        autoHighlight
                                        value={ values.region }
                                        onBlur={ handleBlur( 'region' ) }
                                        onChange={ ( e, value ) => {

                                            if ( !value ) {
                                                dispatch( resetProvincias() )
                                                setFieldValue( "region", '' )
                                            }
                                            else {
                                                dispatch( getProvinciasBD( value.REGION_COD ) )
                                                setFieldValue( "region", value )
                                            }
                                            dispatch( resetDistritos() )
                                            dispatch( resetInstituciones() )
                                            setFieldValue("provincia", '')
                                            setFieldValue("distrito", '')
                                            setFieldValue("inst_educativa", '')

                                        } }
                                        disabled={ regiones.isLoading }
                                        renderInput={ params => <TextField { ...params }
                                                                label="Región"
                                                                error={ touched.region && Boolean( errors.region ) }
                                                                helperText={ touched.region ? errors.region : "" }
                                                                /> }
                                        />
                                        { regiones.isLoading && <CircularProgress size={ 20 } className={ classes.autocompleteProgress } /> }
                                    </div>
                                </div>
                                <div className="s-y-8 s-x-1 s-cols-2
                                                    m-y-3 m-x-3 m-cols-2
                                                    l-y-2 l-x-3 l-cols-2">
                                        <div className={ classes.wrapper }>
                                            <Autocomplete
                                            id="provincia"
                                            name="provincia"
                                            options={ provincias.listado }
                                            getOptionLabel={ option => ( option.PROVINCIA_DES ? option.PROVINCIA_DES : '' ) }
                                            getOptionSelected={ ( option, value ) => option.REGION_COD === value.REGION_COD && option.PROVINCIA_COD === value.PROVINCIA_COD }
                                            fullWidth
                                            size="small"
                                            autoHighlight
                                            autocomplete="off"
                                            value={ values.provincia }
                                            onBlur={ handleBlur( 'provincia' ) }
                                            onChange={ ( e, value ) => {

                                                if ( !value ) {
                                                    dispatch( resetDistritos() )
                                                    setFieldValue( "provincia", '' )
                                                }
                                                else {
                                                    dispatch( getDistritosBD( value.REGION_COD, value.PROVINCIA_COD ) )
                                                    setFieldValue( "provincia", value )
                                                }
                                                dispatch( resetInstituciones() )
                                                setFieldValue("distrito", '')
                                                setFieldValue("inst_educativa", '')
                                            } }
                                            disabled={ provincias.isLoading }
                                            renderInput={ params => <TextField { ...params }
                                                                    label="Provincia"
                                                                    error={ touched.provincia && Boolean( errors.provincia ) }
                                                                    helperText={ touched.provincia ? errors.provincia : "" }
                                                                    /> }
                                            />
                                            { provincias.isLoading && <CircularProgress size={ 20 } className={ classes.autocompleteProgress } /> }
                                        </div>
                                    </div>
                                    <div className="s-y-9 s-x-1 s-cols-2
                                                    m-y-3 m-x-5 m-cols-2
                                                    l-y-2 l-x-5 l-cols-2">
                                        <div className={ classes.wrapper }>
                                            <Autocomplete
                                            id="distrito"
                                            name="distrito"
                                            options={ distritos.listado }
                                            getOptionLabel={ option => ( option.DISTRITO_DES ? option.DISTRITO_DES : '' ) }
                                            getOptionSelected={ ( option, value ) => option.REGION_COD === value.REGION_COD && option.PROVINCIA_COD === value.PROVINCIA_COD && option.DISTRITO_COD === value.DISTRITO_COD }
                                            fullWidth
                                            size="small"
                                            autoHighlight
                                            value={ values.distrito }
                                            onBlur={ handleBlur( 'distrito' ) }
                                            onChange={ ( e, value ) => {

                                                if ( !value ) {
                                                    dispatch( resetInstituciones() )
                                                    setFieldValue( "distrito", '' )
                                                }
                                                else {
                                                    dispatch( getInstitucionesBD( value.REGION_COD, value.PROVINCIA_COD, value.DISTRITO_COD, values.nivel ) )
                                                    setFieldValue( "distrito", value )
                                                }
                                                setFieldValue("inst_educativa", '')

                                            } }
                                            disabled={ distritos.isLoading }
                                            renderInput={ params => <TextField { ...params }
                                                                    label="Distrito"
                                                                    error={ touched.distrito && Boolean( errors.distrito ) }
                                                                    helperText={ touched.distrito ? errors.distrito : '' }
                                                                    /> }
                                            />
                                            { distritos.isLoading && <CircularProgress size={ 20 } className={ classes.autocompleteProgress } /> }
                                        </div>
                                    </div>
                                    <div className="s-y-10 s-x-1 s-cols-2
                                                    m-y-4 m-x-1 m-cols-6
                                                    l-y-2 l-x-7 l-cols-6">
                                        <div className={ classes.wrapper }>
                                            <Autocomplete
                                            id="inst_educativa"
                                            name="inst_educativa"
                                            options={ instituciones.listado }
                                            getOptionLabel={ option => ( option.IE_DES ? option.IE_DES : '' ) }
                                            getOptionSelected={ ( option, value ) => option.CUI === value.CUI }
                                            fullWidth
                                            size="small"
                                            autoHighlight
                                            value={ values.inst_educativa }
                                            onBlur={ handleBlur( 'inst_educativa' ) }
                                            onChange={ ( e, value ) => {

                                                setFieldValue( 'formato', [] )

                                                if ( !value ) {
                                                    setFieldValue( "inst_educativa", '' )
                                                    if ( formatos.listado.length > 0 )
                                                    {
                                                        formatos.listado[0].SELECTED = false;
                                                    }
                                                }
                                                else {
                                                    setFieldValue( "inst_educativa", value )

                                                    if ( formatos.listado.length > 0 )
                                                    {
                                                        formatos.listado[0].SELECTED = true;
                                                        setFieldValue( 'formato', [ formatos.listado[0] ] )
                                                    }
                                                }

                                            } }
                                            disabled={ instituciones.isLoading }
                                            renderInput={ params => <TextField { ...params }
                                                                    label="Institución Educativa"
                                                                    error={ touched.inst_educativa && Boolean( errors.inst_educativa ) }
                                                                    helperText={ touched.inst_educativa ? errors.inst_educativa : '' }
                                                                    /> }
                                            />
                                            { instituciones.isLoading && <CircularProgress size={ 20 } className={ classes.autocompleteProgress } /> }
                                            {
                                                values.inst_educativa
                                                ? <FormHelperText>{ 'DIRECCIÓN: ' + values.inst_educativa.DIRECCION }</FormHelperText>
                                                : null
                                            }
                                        </div>
                                    </div>

                                <div className="s-y-11 s-x-1 s-cols-2
                                                m-y-5 m-x-1 m-cols-6
                                                l-y-3 l-x-1 l-cols-12">
                                    {/* https://stackblitz.com/edit/formik-checkbox-radio?file=index.tsx */}
                                    {/* <FormControl component="fieldset"
                                    className={ classes.formControl }
                                    value={ values.formato }
                                    onBlur={ handleBlur( 'formato' ) }
                                    error={ touched.formato && Boolean( errors.formato ) } >
                                        <FormLabel component="legend">Formato</FormLabel>
                                        <FormGroup row>
                                            {
                                                options.map( option => (
                                                    <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            options={ option }
                                                            id={ option.value }
                                                            defaultValue={ option.value }
                                                            onChange={ ( e, value ) => {
                                                                
                                                                const groups = values.formato
                                                                if ( value ) {
                                                                    if ( groups ) {
                                                                        setFieldValue( 'formato', [ option.value, ...groups ] )
                                                                    }
                                                                    else {
                                                                        setFieldValue( 'formato', [ option.value ] )
                                                                    }
                                                                }
                                                                else{
                                                                    setFieldValue( 'formato', groups.filter( note => note !== option.value ) )
                                                                }

                                                            } }
                                                            color="primary"
                                                        />
                                                    }
                                                    label={ option.label }
                                                    />
                                                ) )
                                            }
                                        </FormGroup>
                                        {
                                            touched.formato
                                            ? <FormHelperText>{ errors.formato }</FormHelperText>
                                            : null
                                        }
                                    </FormControl> */}

                                    <FormControl component="fieldset"
                                    className={ classes.formControl }
                                    value={ values.formato }
                                    onBlur={ handleBlur( 'formato' ) }
                                    error={ touched.formato && Boolean( errors.formato ) } >
                                        <FormLabel component="legend">Formato</FormLabel>
                                        <FormGroup row>
                                            {
                                                formatos.listado.map( formato => (
                                                    <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            options={ formato }
                                                            id={ formato.FORMATO_COD }
                                                            name={ formato.FORMATO_COD }
                                                            checked={ formato.SELECTED }
                                                            disabled
                                                            onChange={ ( e, value ) => {
                                                                const groups = values.formato
                                                                formato.SELECTED = value;
                                                                if ( value ) {
                                                                    if ( groups ) {
                                                                        setFieldValue( 'formato', [ formato.FORMATO_COD, ...groups ] )
                                                                    }
                                                                    else {
                                                                        setFieldValue( 'formato', [ formato.FORMATO_COD ] )
                                                                    }
                                                                }
                                                                else{
                                                                    setFieldValue( 'formato', groups.filter( note => note !== formato.FORMATO_COD ) )
                                                                }
                                                            } }
                                                            color="primary"
                                                        />
                                                    }
                                                    label={ formato.FORMATO_DES }
                                                    />
                                                ) )
                                            }
                                        </FormGroup>
                                        {
                                            touched.formato
                                            ? <FormHelperText>{ errors.formato }</FormHelperText>
                                            : null
                                        }
                                    </FormControl>

                                </div>
                                <div className="s-y-12 s-x-1 s-cols-2
                                                m-y-6 m-x-1 m-cols-6
                                                l-y-4 l-x-1 l-cols-12">
                                    {
                                        values.inst_educativa
                                        ?   <FormatoScreen/>
                                        :   null
                                    }
                                </div>
                            
                            </div>
                        </AccordionDetails>
                        <Divider />
                        {
                            veeduria.message !== 'ok'
                            ?
                                <StyledAccordionActions> 
                                    <Button size="small"
                                    type="submit"
                                    style={ { position: 'left' } }
                                    color="secondary" startIcon={ <CachedIcon /> }
                                    onClick={ handleReload }>
                                        Volver a cargar
                                    </Button>
                                    <Button variant="contained" size="large"
                                    disabled={ !isValid || !isComplete || isSubmitting }
                                    onClick={handleClickListItem}
                                    color="primary" startIcon={ <SendIcon /> } >
                                        Enviar
                                    </Button>
                                </StyledAccordionActions>
                            : null
                        }
                        <ConfirmControl
                            classes={{
                                paper: classes.paper,
                            }}
                            id="ringtone-menu"
                            keepMounted
                            open={ open }
                            onSubmit={ handleSubmit }
                            onClose={ handleClose }
                            dni={ values.dni }
                            nombre={ `${values.nombre} ${values.apellido_paterno} ${values.apellido_materno}` } />
                        <Alerta state={ alert } handleClose={ handleCloseAlert }/>
                    </Accordion>

                </form>
            ) }
        </Formik>
    )
}
