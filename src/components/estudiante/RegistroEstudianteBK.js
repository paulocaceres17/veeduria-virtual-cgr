import React, { useState, useCallback, useEffect } from 'react'

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
    FormLabel,
    FormGroup,
} from '@material-ui/core'

import { Autocomplete } from '@material-ui/lab'

import { ListadoEstudiantesScreen } from './ListadoEstudiantesScreen'
import SaveIcon from '@material-ui/icons/Save'
import { FormatoScreen } from '../formato/FormatoScreen'

import { useStyles, StyledAccordionSummary, StyledAccordionActions } from './RegistroEstudianteStyle'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useSelector, useDispatch } from 'react-redux'
import { getRegionesBD, getProvinciasBD, getDistritosBD } from '../../redux/thunk/ubigeoThunk'
import { TextNumber } from '../../controls/TextNumber'
import { getProvincias, getDistritos, getRegiones, resetRegiones, resetProvincias, resetDistritos } from '../../redux/actions/ubigeoActions'
import { getInstituciones, resetInstituciones } from '../../redux/actions/instEducativaActions'
import { getInstitucionesBD } from '../../redux/thunk/instEducativaThunk'
import { Formik, Field } from 'formik'
import MuiTextField from '@material-ui/core/TextField';
import {
    AutocompleteRenderInputParams,
} from 'formik-material-ui-lab';
import ProfileSchema from './registroEstudianteProfile'
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

    const [expanded, setexpanded] = useState(false)

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = useCallback(
        () => {
            setOpen(false);
        },
        [ setOpen ],
    )

    const [ nivel, setNivel ] = useState( null );
    const [ grado, setGrado ] = useState( null );
    const [ seccion, setSeccion ] = useState( null );
    const [ selectedRegion, setSelectedRegion ] = useState( null );
    const [ selectedProvincia, setSelectedProvincia ] = useState( null );
    const [ selectedDistrito, setSelectedDistrito ] = useState( null );
    const [ selectedInstitucion, setSelectedInstitucion ] = useState( null );

    useEffect( () => {
        if ( padre.severity === 'success' ) {
            setTimeout( () => {
                setexpanded( true )
            }, 1500 );
        }
    }, [ padre.severity, dispatch ] )
    
    const handleNivelChange = ( event ) => {
        setNivel( event.target.value )
        setSelectedRegion( null )
        setSelectedProvincia( null )
        setSelectedDistrito( null )
        setSelectedInstitucion( null )
        if ( !event.target.value ) {
            dispatch( resetRegiones() )
        }
        else {
            dispatch( getRegionesBD() )
        }
        dispatch( resetProvincias() )
        dispatch( resetDistritos() )
        dispatch( resetInstituciones() )
    }
    
    const handleGradoChange = ( event ) => {
        setGrado( event.target.value )
    }
    
    const handleSeccionChange = ( event ) => {
        setSeccion( event.target.value )
    }

    const handleRegionChange = ( _, value ) => {
        setSelectedRegion( value )
        if ( selectedProvincia?.PROVINCIA_COD !== value?.PROVINCIA_COD ) {
            setSelectedProvincia( null )
            setSelectedDistrito( null )
            setSelectedInstitucion( null )
        }
        if ( !value ) {
            dispatch( resetProvincias() )
        }
        else {
            dispatch( getProvinciasBD( value.REGION_COD ) )
        }
        dispatch( resetDistritos() )
        dispatch( resetInstituciones() )
    }

    const handleProvinciaChange = ( _, value ) => {
        setSelectedProvincia( value )
        if ( selectedDistrito?.DISTRITO_COD !== value?.DISTRITO_COD ) {
            setSelectedDistrito( null )
            setSelectedInstitucion( null )
        }
        if ( !value ) {
            dispatch( resetDistritos() )
        }
        else {
            dispatch( getDistritosBD( value.REGION_COD, value.PROVINCIA_COD ) )
        }
        dispatch( resetInstituciones() )
    }

    const handleDistritoChange = ( _, value ) => {
        setSelectedDistrito( value )
        if ( selectedInstitucion?.CUI !== value?.CUI ) {
            setSelectedInstitucion( null )
        }
        if ( !value ) {
            dispatch( resetInstituciones() )
        }
        else {
            dispatch( getInstitucionesBD( value.REGION_COD, value.PROVINCIA_COD, value.DISTRITO_COD, nivel ) )
        }
    }
    
    const handleInstitucionChange = ( _, value ) => {
        setSelectedInstitucion( value )
    }

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedF: true,
        checkedG: true,
    });
    
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <Formik
        initialValues={ estudiante }
        validationSchema={ ProfileSchema }
        onSubmit={ ( values, { props, setSubmitting, resetForm }) => {
            const payload = { 
                nombre: values.nombre, 
                apellido_paterno: values.apellido_paterno, 
                apellido_materno: values.apellido_materno,
                dni: values.dni, 
                nivel: values.nivel,
                grado: values.grado,
                seccion: values.seccion,
                region: values.region,
                provincia: values.provincia,
                distrito: values.distrito,
                inst_educativa: values.inst_educativa,
            }
            // dispatch( savePadreBD( payload ) ) 
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
            setFieldValue,
            ...props
        } ) => (

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
                                    <div className="s-y-5 s-x-1 s-cols-2
                                                    m-y-2 m-x-3 m-cols-2
                                                    l-y-1 l-x-9 l-cols-2">
                                        {/* variant="outlined" */}
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
                                            // onChange={ handleChange( 'nivel' ) }
                                            onChange={ e => {
                                                const { value } = e.target
                                                dispatch( getRegionesBD() )

        //                                         setNivel( event.target.value )
        // setSelectedRegion( null )
        // setSelectedProvincia( null )
        // setSelectedDistrito( null )
        // setSelectedInstitucion( null )
        // if ( !event.target.value ) {
        //     dispatch( resetRegiones() )
        // }
        // else {
        //     dispatch( getRegionesBD() )
        // }
        // dispatch( resetProvincias() )
        // dispatch( resetDistritos() )
        // dispatch( resetInstituciones() )


                                                setFieldValue("nivel", value);
                                                setFieldValue("region", '');
                                                setFieldValue("grado", '');
                                                if ( value === 'P')
                                                    setFieldValue("grados", grados_primaria);
                                                else
                                                    setFieldValue("grados", grados_secundaria);
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
                                            // onBlur={ event => {
                                            //     event.target.name = 'seccion'
                                            //     handleBlur( event )
                                            // } }
                                            onBlur={ handleBlur( 'seccion' ) }
                                            onChange={ handleChange( 'seccion' ) }
                                            // onChange={ handleSeccionChange } 
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
                                        {/* <FormControl fullWidth size="small" id="form-region">
                                        </FormControl> */}
                                        <div className={ classes.wrapper }>
                                        {/* <Field
                                        name="region"
                                        multiple
                                        component={Autocomplete}
                                        options={ regiones.listado }
                                        getOptionLabel={ option => option.REGION_DES }
                                        fullWidth
                                        renderInput={(params: AutocompleteRenderInputParams) => (
                                            <MuiTextField
                                            {...params}
                                            error={ touched.region && Boolean( errors.region ) }
                                            helperText={ touched.region ? errors.region : "" }
                                            label="Autocomplete"
                                            variant="outlined"
                                            />
                                        )}
                                        /> */}

                                            <Autocomplete
                                            id="region"
                                            options={ regiones.listado }
                                            getOptionLabel={ option => option.REGION_DES }
                                            // inputProps={ { style: { textTransform: 'uppercase' } } }
                                            // style={ { textTransform: 'uppercase' } }
                                            fullWidth
                                            size="small"
                                            autoHighlight
                                            value={ values.region }
                                            // onChange={ handleRegionChange }
                                            onChange={ ( e, value ) => {

                                                // const _regions = dispatch( getRegionesBD() )


                                                // if ( values?.provincia !== value?.PROVINCIA_COD ) {
                                                //     setSelectedProvincia( null )
                                                //     setSelectedDistrito( null )
                                                //     setSelectedInstitucion( null )
                                                //     props.setFieldValue("provincia", null);
                                                //     values.provincia = null
                                                // }

                                                if ( !value ) {
                                                    console.log(value)
                                                    dispatch( resetProvincias() )
                                                    setFieldValue( "region", '' )
                                                }
                                                else {
                                                    console.log(value)
                                                    dispatch( getProvinciasBD( value.REGION_COD ) )
                                                    setFieldValue( "region", value.REGION_COD )
                                                }
                                                dispatch( resetDistritos() )
                                                dispatch( resetInstituciones() )
                                                setFieldValue("provincia", '')
                                            } }
                                            getOptionSelected={ ( option, value ) => option.REGION_COD === value.REGION_COD }
                                            // value={ value }
                                            // onChange={ ( event, newValue ) => {
                                            //     onChangeRegion( newValue )
                                            // } }
                                            disabled={ regiones.isLoading }
                                            renderInput={ params => <TextField { ...params }
                                                                    label="Región"
                                                                    error={ touched.region && Boolean( errors.region ) }
                                                                    helperText={ touched.region ? errors.region : "" }
                                                                    /> }
                                            />
                                            { regiones.isLoading && <CircularProgress size={20} className={ classes.autocompleteProgress } /> }
                                        </div>
                                    </div>
                                    <div className="s-y-8 s-x-1 s-cols-2
                                                    m-y-3 m-x-3 m-cols-2
                                                    l-y-2 l-x-3 l-cols-2">
                                        <div className={ classes.wrapper }>
                                        {/* <Field
                                        name="provincia"
                                        component={ Autocomplete }
                                        options={ provincias.listado }
                                        getOptionLabel={ option => option.PROVINCIA_DES }
                                        fullWidth
                                        renderInput={ params => (
                                            <MuiTextField
                                            { ...params }
                                            error={ touched['provincia'] && !!errors['provincia'] }
                                            helperText={ touched['provincia'] && errors['provincia'] }
                                            label="Provincia"
                                            variant="outlined"
                                            />
                                        ) }
                                        /> */}

                                            <Autocomplete
                                            id="provincia"
                                            options={ provincias.listado }
                                            getOptionLabel={ option => option.PROVINCIA_DES }
                                            // getOptionSelected={ ( option, value ) => option.REGION_COD === value.REGION_COD && option.PROVINCIA_COD === value.PROVINCIA_COD }
                                            value={ values.provincia }
                                            // onChange={ handleProvinciaChange }
                                            onChange={ ( e, value ) => {

                                                
                                                // const _regions = dispatch( getRegionesBD() )


                                                // if ( selectedDistrito?.DISTRITO_COD !== value?.DISTRITO_COD ) {
                                                //     setSelectedDistrito( null )
                                                //     setSelectedInstitucion( null )
                                                // }
                                                setFieldValue("provincia", value?.REGION_COD);

                                                if ( !value ) {
                                                    dispatch( resetDistritos() )
                                                }
                                                else {
                                                    dispatch( getDistritosBD( value.REGION_COD, value.PROVINCIA_COD ) )
                                                }
                                                dispatch( resetInstituciones() )

                                                setFieldValue("distrito", null);
                                                // props.setFieldValue("regiones", _regions);
                                            } }
                                            autoHighlight
                                            disabled={ provincias.isLoading }
                                            renderInput={ params => <TextField { ...params }
                                                                    label="Provincia"
                                                                    name="provincia"
                                                                    fullWidth
                                                                    size="small"
                                                                    error={ touched.provincia && Boolean( errors.provincia ) }
                                                                    helperText={ touched.provincia ? errors.provincia : "" }
                                                                    /> }
                                            />
                                            { provincias.isLoading && <CircularProgress size={20} className={ classes.autocompleteProgress } /> }
                                        </div>
                                    </div>
                                    <div className="s-y-9 s-x-1 s-cols-2
                                                    m-y-3 m-x-5 m-cols-2
                                                    l-y-2 l-x-5 l-cols-2">
                                        <div className={ classes.wrapper }>
                                            <Autocomplete
                                            id="distrito"
                                            options={ distritos.listado }
                                            getOptionLabel={ option => option.DISTRITO_DES }
                                            getOptionSelected={ ( option, value ) => option.DISTRITO_COD === value.DISTRITO_COD }
                                            value={ selectedDistrito }
                                            onChange={ handleDistritoChange }
                                            fullWidth
                                            size="small"
                                            autoHighlight
                                            disabled={ distritos.isLoading }
                                            renderInput={ params => <TextField { ...params }
                                                                    label="Distrito"
                                                                    /> }
                                            />
                                            { distritos.isLoading && <CircularProgress size={20} className={ classes.autocompleteProgress } /> }
                                        </div>
                                    </div>
                                    <div className="s-y-10 s-x-1 s-cols-2
                                                    m-y-4 m-x-1 m-cols-6
                                                    l-y-2 l-x-7 l-cols-6">
                                        <div className={ classes.wrapper }>
                                            <Autocomplete
                                            id="inst-edu"
                                            options={ instituciones.listado }
                                            getOptionLabel={ option => option.IE_DES }
                                            getOptionSelected={ ( option, value ) => option.CUI === value.CUI }
                                            value={ selectedInstitucion }
                                            onChange={ handleInstitucionChange }
                                            fullWidth
                                            size="small"
                                            autoHighlight
                                            disabled={ instituciones.isLoading }
                                            renderInput={ params => <TextField { ...params }
                                                                    label="Institución Educativa"
                                                                    helperText={ selectedInstitucion ? 'DIRECCIÓN: '+ selectedInstitucion.DIRECCION : '' }
                                                                    /> }
                                            />
                                            { instituciones.isLoading && <CircularProgress size={20} className={ classes.autocompleteProgress } /> }
                                        </div>
                                    </div>

                                    
                                    {/* <div className="s-y-11 s-x-1 s-cols-2
                                                    m-y-5 m-x-1 m-cols-6
                                                    l-y-3 l-x-1 l-cols-12
                                                    s-right m-right lg-right">
                                        <Button variant="outlined" size="large"
                                        color="primary" startIcon={<SaveIcon />} onClick={ handleClickOpen } >
                                            Grabar
                                        </Button>
                                    </div> */}

                                    <div className="s-y-11 s-x-1 s-cols-2
                                                    m-y-5 m-x-1 m-cols-6
                                                    l-y-3 l-x-1 l-cols-12">
                                        
                                        <FormControl component="fieldset"
                                        className={ classes.formControl }
                                        error={ touched.acceptTerms && Boolean( errors.acceptTerms ) }
                                        >
                                            <FormLabel component="legend">Formato</FormLabel>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox
                                                        name="acceptTerms"
                                                        checked={ values.acceptTerms }
                                                        onBlur={ handleBlur }
                                                        onChange={ handleChange }
                                                        color="primary"
                                                    />
                                                    }
                                                    label="Aprendo en Casa"
                                                />
                                            </FormGroup>
                                            {
                                                touched.acceptTerms
                                                ? <FormHelperText>{ errors.acceptTerms }</FormHelperText>
                                                : null
                                            }
                                        </FormControl>
                                    </div>
                                    <div className="s-y-12 s-x-1 s-cols-2
                                                    m-y-6 m-x-1 m-cols-6
                                                    l-y-4 l-x-1 l-cols-12">
                                        {/* <ListadoEstudiantesScreen/> */}
                                        <FormatoScreen/>
                                    </div>
                                
                                </div>
                            
                                {/* <FormatoScreen
                                key={ open } 
                                open={ open } 
                                handleClose={ handleClose } /> */}

                            </AccordionDetails>
                            <Divider />
                            <StyledAccordionActions> 
                                <Button variant="outlined" size="large"
                                type="submit" 
                                disabled={ !isValid || isSubmitting }
                                color="primary" startIcon={ <SaveIcon /> } >
                                    Grabar
                                </Button>
                            </StyledAccordionActions>
                        </Accordion>
    
                    </form>
                )
        }
        />
    
    )
}
