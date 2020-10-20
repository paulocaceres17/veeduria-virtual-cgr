import React, { useState, useEffect, useRef } from 'react'

import { TextField,
    Accordion,
    AccordionDetails,
    Divider,
    Button,
    Typography
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
import { Formik } from 'formik'
import ProfileSchema from './registroPadreProfile'
import { bindActionCreators } from 'redux'
import { savePadre } from '../../redux/actions/padreActions'



export const RegistroPadre = () => {
    const classes = useStyles();


    const dispatch = useDispatch()
    const padre = useSelector( state => state.padre )
    const [ formValues, handleInputChange, reset ] = useForm( padre )
    const { dni, nombres_completos, celular, fecha_emision, codigo_verificacion, isLoading } = formValues

    const dniPadre = useRef( dni )

    // const [selectedDate, setSelectedDate] = useState(new Date('2020-08-18T21:11:54'));

    const handleDateChange = (date) => {
        handleInputChange( { 
                            target: {
                                name: 'fecha_emision',
                                value: date,
                            } } );
    };

    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message: 'Se guardó correctamente',
    });


    const handleClose = () => {
        setState({ ...state, open: false });
    };
    
    useEffect(() => {
        if ( isLoading && dni !== dniPadre.current )
        {
            setState({ ...state, open: true });
        }
    }, [ isLoading, dni, state ])
    

    const handleSubmit = ( e ) => {
      e.preventDefault()
      dispatch( savePadreBD( formValues ) )
  };

    return (
        
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
                          value={ dni }
                          onChange={ handleInputChange }
                          // helperText={ touched.dni ? errors.dni : ""}
                          // error={ touched.dni && Boolean(errors.dni) }
                          InputProps={{
                              inputComponent: TextNumber
                          }}
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


                              value={ fecha_emision }
                              onChange={ handleDateChange }
                              
                              // helperText={ touched.fecha_emision ? errors.fecha_emision : ""}
                              // error={ touched.fecha_emision && Boolean(errors.fecha_emision) }



                              />
                          </MuiPickersUtilsProvider>
                      </div>
                      <div>
                          <TextField
                          fullWidth
                          size="small"
                          label="Código de verificación"
                          name="codigo_verificacion"
                          // style={{ textTransform: 'uppercase' }}
                          inputProps={{ maxLength: 4, style: {textTransform: 'uppercase'} }}
                          value={ codigo_verificacion }
                          onChange={ handleInputChange }
                          />
                      </div>
                      <div>
                          <TextField
                          fullWidth 
                          size="small"
                          id="outlined-required"
                          label="Capchat"
                          />
                      </div>
                      <div className="s-y-3 s-x-1 s-cols-1 
                                      m-y-2 m-x-1 m-cols-2
                                      l-y-2 l-x-1 l-cols-2">
                          <TextField
                          disabled
                          helperText="Éste dato de completa de Reniec"
                          fullWidth 
                          size="small"
                          label="Nombres y apellidos"
                          name="nombres_completos"
                          value={ nombres_completos }
                          onChange={ handleInputChange }
                          // variant="outlined"
                          />
                      </div>
                      <div>
                          <TextField
                          fullWidth
                          size="small"
                          label="Celular"
                          name="celular"
                          value={ celular }
                          onChange={ handleInputChange }
                          // helperText={ touched.celular ? errors.celular : ""}
                          // error={ touched.celular && Boolean(errors.celular) }
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
                  type="submit"
                  // onClick={ handleSave }
                  color="primary" startIcon={<SearchIcon />} >
                      Buscar
                  </Button>
              </StyledAccordionActions>
          </Accordion>

      </form>
    )
}
