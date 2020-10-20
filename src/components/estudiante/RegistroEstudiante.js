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
const { niveles, grados_primaria, grados_secundaria, secciones } = require("../../data/params")

export const RegistroEstudianteScreen = () => {

    const classes = useStyles()

    const dispatch = useDispatch()
    const padre = useSelector( state => state.padre )

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
                        required
                        fullWidth 
                        size="small"
                        id="nombres"
                        label="Nombres"
                        inputProps={ { style: { textTransform: 'capitalize' } } }
                        />
                    </div>
                    <div className="s-y-2 s-x-1 s-cols-2
                                    m-y-1 m-x-3 m-cols-2
                                    l-y-1 l-x-3 l-cols-2">
                        <TextField
                        required
                        fullWidth 
                        size="small"
                        id="apellido-paterno"
                        label="Apellido paterno"
                        inputProps={ { style: { textTransform: 'capitalize' } } }
                        />
                    </div>
                    <div className="s-y-3 s-x-1 s-cols-2
                                    m-y-1 m-x-5 m-cols-2
                                    l-y-1 l-x-5 l-cols-2">
                        <TextField
                        required
                        fullWidth 
                        size="small"
                        id="apellido-materno"
                        label="Apellido materno"
                        inputProps={ { style: { textTransform: 'capitalize' } } }
                        />
                    </div>
                    <div className="s-y-4 s-x-1 s-cols-2
                                    m-y-2 m-x-1 m-cols-2
                                    l-y-1 l-x-7 l-cols-2">
                        <TextField
                        required
                        fullWidth 
                        size="small"
                        id="dni-estudiante"
                        label="DNI"
                        InputProps={ { inputComponent: TextNumber } }
                        />
                    </div>
                    <div className="s-y-5 s-x-1 s-cols-2
                                    m-y-2 m-x-3 m-cols-2
                                    l-y-1 l-x-9 l-cols-2">
                        {/* variant="outlined" */}
                        <FormControl fullWidth size="small" id="form-nivel">
                            <InputLabel>
                                Nivel
                            </InputLabel>
                            <Select labelId="demo-simple-select-label"
                            value={ nivel } 
                            onChange={ handleNivelChange } >
                                {
                                    niveles.map( nivel => (
                                        <MenuItem value={ nivel.cod }>{ nivel.des }</MenuItem>
                                    ) )
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl fullWidth size="small" id="form-grado">
                            <InputLabel>
                                Grado
                            </InputLabel>
                            <Select labelId="demo-simple-select-label"
                            value={ grado }
                            onChange={ handleGradoChange } >
                            {
                                ( nivel ) &&
                                ( ( nivel === 'P' )
                                ?
                                    grados_primaria.map( grado => (
                                        <MenuItem value={ grado.cod }>{ grado.des }</MenuItem>
                                    ) )
                                :
                                grados_secundaria.map( grado => (
                                        <MenuItem value={ grado.cod }>{ grado.des }</MenuItem>
                                    ) )
                                )
                            }
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl fullWidth size="small" id="form-seccion">
                            <InputLabel>
                                Sección
                            </InputLabel>
                            <Select labelId="demo-simple-select-label"
                            value={ seccion }
                            onChange={ handleSeccionChange } >
                            {
                                secciones.map( seccion => (
                                    <MenuItem value={ seccion.cod }>{ seccion.des }</MenuItem>
                                ) )
                            }
                            </Select>                            
                        </FormControl>
                    </div>



                    <div className="s-y-7 s-x-1 s-cols-2 
                                    m-y-3 m-x-1 m-cols-2
                                    l-y-2 l-x-1 l-cols-2">   
                        {/* <FormControl fullWidth size="small" id="form-region">
                        </FormControl> */}
                        <div className={ classes.wrapper }>
                            <Autocomplete
                            id="region"
                            options={ regiones.listado }
                            getOptionLabel={ option => option.REGION_DES }
                            // inputProps={ { style: { textTransform: 'uppercase' } } }
                            // style={ { textTransform: 'uppercase' } }
                            fullWidth
                            size="small"
                            autoHighlight
                            value={ selectedRegion }
                            onChange={ handleRegionChange }
                            getOptionSelected={ ( option, value ) => option.REGION_COD === value.REGION_COD }
                            // value={ value }
                            // onChange={ ( event, newValue ) => {
                            //     onChangeRegion( newValue )
                            // } }
                            disabled={ regiones.isLoading }
                            renderInput={ params => <TextField { ...params }
                                                    label="Región"
                                                    /> }
                            />
                            { regiones.isLoading && <CircularProgress size={20} className={ classes.autocompleteProgress } /> }
                        </div>
                    </div>
                    <div className="s-y-8 s-x-1 s-cols-2
                                    m-y-3 m-x-3 m-cols-2
                                    l-y-2 l-x-3 l-cols-2">
                        <div className={ classes.wrapper }>
                            <Autocomplete
                            id="provincia"
                            options={ provincias.listado }
                            getOptionLabel={ option => option.PROVINCIA_DES }
                            getOptionSelected={ ( option, value ) => option.PROVINCIA_COD === value.PROVINCIA_COD }
                            value={ selectedProvincia }
                            onChange={ handleProvinciaChange }
                            fullWidth
                            size="small"
                            autoHighlight
                            disabled={ provincias.isLoading }
                            renderInput={ params => <TextField { ...params }
                                                    label="Provincia"
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
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={ state.checkedB }
                                onChange={ handleChange }
                                name="checkedB"
                                color="primary"
                            />
                            }
                            label="Aprendo en Casa"
                        />
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
                // disabled={ isSubmitting }
                color="primary" startIcon={ <SaveIcon /> } >
                    Grabar
                </Button>
            </StyledAccordionActions>
        </Accordion>
    )
}
