import React, { useEffect, useState } from 'react'
import { Typography, Divider, Avatar, FormControl, RadioGroup, FormControlLabel, Radio, InputLabel, Select, MenuItem, Checkbox, ListItemText, Input, withStyles, InputBase, FormGroup, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import { useStyles, 
    Accordion, 
    AccordionSummary,
    AccordionDetails
} from './BrowserStyle'
// import SimpleBar from 'simplebar-react';
import SimpleBarReact from "simplebar-react";
import 'simplebar/dist/simplebar.min.css';
import { setComplete, setHabilitado } from '../../redux/actions/preguntaActions';
import { DisabledControl } from './controles/Disabled';
import { RadioGroupControl } from './controles/RadioGroup';
import { CheckboxGroupControl } from './controles/CheckboxGroup';
import { SelectControl } from './controles/Select';
import { TextboxControl } from './controles/Textbox';
import { ComboCheckboxControl } from './controles/ComboCheckbox';




const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

export const BrowserScreen = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    let { grupos, preguntas, respuestas, dependencias } = useSelector( state => state.pregunta )
    const pregunta = useSelector( state => state.pregunta )
    const [value, setValue] = useState(null);
    const [preguntaState] = useState(pregunta);


        
    let habilita = 0;
    let listaDependencias = [];
    let habilitarPreguntas = [];


    const handleChange = (event, preguntaId) => {
        console.log(event.target.name);
        console.log(event.target.value);

        let cantRespuestasVacias = 0;
        
        preguntas.forEach(preg => {
            if ( preg.ID === preguntaId )
            {
                switch (preg.TIPO_RPTA_COD) {
                    case 1:
                    case 3:
                        // RADIOBUTTON
                        // SELECT
                        setValue({ ...value, [event.target.value]: event.target.value });
                        preg.RESPUESTA = []
                        preg.RESPUESTA.push( event.target.value.split('_')[1] )

                        setDependencias(preg, event.target.value.split('_')[1]);
                        break;

                    case 2:
                        // CHECKBOX
                        // setValue({ ...value, [event.target.name]: event.target.value });
                        setValue({ ...value, [event.target.name]: event.target.name });
                        
                        if ( event.target.checked )
                        {
                            preg.RESPUESTA.push( event.target.name.split('_')[1] )
                        }
                        else {
                            preg.RESPUESTA = preg.RESPUESTA.filter( id => id !== event.target.name.split('_')[1] )
                        }

                        setDependencias(preg, event.target.name.split('_')[1]);
                        break;

                    case 4:
                        // TEXTBOX
                        setValue({ ...value, [event.target.name]: event.target.value });
                        
                        preg.RESPUESTA = []
                        preg.RESPUESTA.push( event.target.value )

                        break;

                    case 5:
                    case 6:
                        // COMBOCHECKBOX
                        setValue({ ...value, [event.target.value]: event.target.value });
                        // let values = []
                        // event.target.value.forEach(element => {
                        //     values.push( element.split('_')[1]  )
                        // });
                        preg.RESPUESTA = event.target.value

                        // setDependencias(preg, event.target.value.split('_')[1]);
                        break;
                
                    default:
                        break;
                }
            }

            if (preg.RESPUESTA.length === 0 && preg.IND_PADRE === '0' && preg.HABILITADO)
            {
                cantRespuestasVacias++;
            }
        });

        
        dispatch( setComplete({ isComplete: (cantRespuestasVacias === 0) }) );

        console.log(preguntas)
    };


    const setDependencias = (preg, valor) => {
        listaDependencias = dependencias.filter(e => e.ID_PREGUNTA === preg.ID)
    
        if (listaDependencias.length > 0)
        {
            habilita = listaDependencias.filter(e => e.ID_RESPUESTA.toString() === valor).length
            habilitarPreguntas = preguntas.filter(e => e.DEPENDENCIA === preg.ID.toString());
            habilitarPreguntas.forEach( e => {
                if (habilita === 0){
                    e.RESPUESTA = [];
                }
                dispatch( setHabilitado({ ID: e.ID, HABILITADO: (habilita === 1) }) )
            })
        }
    }

    
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 100,
            },
        },
    }
    const [personName, setPersonName] = useState([])

    const handleChangeSelect = (event) => {
        setPersonName(event.target.value);
    }

    return (
        <SimpleBarReact style={{ maxHeight: 500 }} forceVisible="y" autoHide={ false }>
            <div className="ed-grid s-grid-1">
                {
                    grupos.map( grupo => (
                        <Accordion square expanded>
                            <AccordionSummary aria-controls="panel1d-content" id={ grupo.ID }>
                                <Typography>{ grupo.DESCRIPCION }</Typography>
                            </AccordionSummary>
                            {
                                preguntas.filter( preg => preg.GRUPO_COD === grupo.ID && preg.ID_PADRE === 0 )
                                .map( preg => (
                                    <>
                                    {
                                        ( preg.IND_PADRE === '0' )
                                        ?
                                            <AccordionDetails>
                                                <div className="ed-container full">
                                                    <div className="ed-item" style={ { padding: '0px' } }>
                                                        <div className="ed-grid s-grid-8 m-grid-12">
                                                            <div className={ classes.center_item }>
                                                                <Avatar className={classes.orange}>
                                                                    <Typography>{ preg.CODIGO }</Typography>
                                                                </Avatar>
                                                            </div>
                                                            <div className="s-cols-7 m-cols-11 ed-grid rows-gap">
                                                                <div className={ classes.center_item }>
                                                                    <Typography>{ preg.DESCRIPCION }</Typography>
                                                                </div>
                                                                <div className={ classes.center_item }>
                                                                    {
                                                                        // RADIOBUTTON
                                                                        ( preg.TIPO_RPTA_COD === 1 )
                                                                        &&
                                                                        <div>
                                                                            {
                                                                                ( preg.HABILITADO )
                                                                                &&
                                                                                // <FormControl component="fieldset">
                                                                                //     <RadioGroup row name={ preg.ID } onChange={ ( e ) => handleChange( e, preg.ID ) }>
                                                                                //         {
                                                                                //             respuestas.filter( rpta => rpta.ID_PREGUNTA === preg.ID )
                                                                                //             .map( rpta => (
                                                                                //                 <FormControlLabel value={ preg.ID + '_' + rpta.ID }
                                                                                //                 name={ preg.ID + '_' + rpta.ID }
                                                                                //                 control={ <Radio color="primary" /> } 
                                                                                //                 label={ rpta.DESCRIPCION } />
                                                                                //             ) )
                                                                                //         }
                                                                                //     </RadioGroup>
                                                                                // </FormControl>
                                                                                <RadioGroupControl respuestas={ respuestas }
                                                                                preg={ preg }
                                                                                handleChange={ handleChange }/>
                                                                            }
                                                                            {
                                                                                ( !preg.HABILITADO )
                                                                                &&
                                                                                <DisabledControl/>
                                                                            }
                                                                        </div>
                                                                    }
                                                                    {
                                                                        // CHECKBOX
                                                                        ( preg.TIPO_RPTA_COD === 2 )
                                                                        &&
                                                                        <div>
                                                                            {
                                                                                ( preg.HABILITADO )
                                                                                &&
                                                                                // <FormControl component="fieldset">
                                                                                //     <FormGroup row>
                                                                                //         {
                                                                                //             respuestas.filter( rpta => rpta.ID_PREGUNTA === preg.ID )
                                                                                //             .map( rpta => (
                                                                                //                 <FormControlLabel
                                                                                //                 control={
                                                                                //                     <Checkbox
                                                                                //                         options={ rpta }
                                                                                //                         id={ preg.ID + '_' + rpta.ID  }
                                                                                //                         name={ preg.ID + '_' + rpta.ID }
                                                                                //                         onChange={ ( e ) => handleChange( e, preg.ID ) }
                                                                                //                         color="primary"
                                                                                //                     />
                                                                                //                 }
                                                                                //                 label={ rpta.DESCRIPCION }
                                                                                //                 />
                                                                                //             ) )
                                                                                //         }
                                                                                //     </FormGroup>
                                                                                // </FormControl>
                                                                                <CheckboxGroupControl respuestas={ respuestas }
                                                                                preg={ preg }
                                                                                handleChange={ handleChange }/>
                                                                            }
                                                                            {
                                                                                ( !preg.HABILITADO )
                                                                                &&
                                                                                <DisabledControl/>
                                                                            }
                                                                        </div>
                                                                    }
                                                                    {
                                                                        // SELECT
                                                                        ( preg.TIPO_RPTA_COD === 3 )
                                                                        &&
                                                                        <div>
                                                                            {
                                                                                ( preg.HABILITADO )
                                                                                &&
                                                                                // <FormControl id={ preg.ID } className={ classes.formControl } >
                                                                                //     <InputLabel>
                                                                                //         Respuesta
                                                                                //     </InputLabel>
                                                                                //     <Select
                                                                                //     name={ preg.ID }
                                                                                //     onChange={ ( e ) => handleChange( e, preg.ID ) } >
                                                                                //     {
                                                                                //         respuestas.filter( rpta => rpta.ID_PREGUNTA === preg.ID )
                                                                                //         .map( rpta => (
                                                                                //             <MenuItem
                                                                                //             key={ preg.ID + '_' + rpta.ID }
                                                                                //             name={ preg.ID + '_' + rpta.ID }
                                                                                //             value={ preg.ID + '_' + rpta.ID }>{ rpta.DESCRIPCION }</MenuItem>
                                                                                //         ) )
                                                                                //     }
                                                                                //     </Select>
                                                                                // </FormControl>
                                                                                <SelectControl respuestas={ respuestas }
                                                                                preg={ preg }
                                                                                classes={ classes }
                                                                                handleChange={ handleChange }/>
                                                                            }
                                                                            {
                                                                                ( !preg.HABILITADO )
                                                                                &&
                                                                                <DisabledControl/>
                                                                            }
                                                                        </div>
                                                                    }
                                                                    {
                                                                        // TEXTBOX
                                                                        ( preg.TIPO_RPTA_COD === 4 )
                                                                        &&
                                                                        // <TextField
                                                                        // className={ classes.textField }
                                                                        // size="small"
                                                                        // label="Respuesta"
                                                                        // name={ preg.ID }
                                                                        // value={ preg.RESPUESTA[0] }
                                                                        // onChange={ ( e ) => handleChange( e, preg.ID ) }
                                                                        // />
                                                                        <TextboxControl preg={ preg }
                                                                        classes={ classes }
                                                                        handleChange={ handleChange }/>
                                                                    }
                                                                    {
                                                                        // COMBOCHECKBOX
                                                                        ( preg.TIPO_RPTA_COD === 5 || preg.TIPO_RPTA_COD === 6 )
                                                                        &&
                                                                        // <FormControl className={ classes.multiSelect }>
                                                                        //     <InputLabel>Respuesta</InputLabel>
                                                                        //     <Select
                                                                        //     id={ preg.ID }
                                                                        //     multiple
                                                                        //     value={ preg.RESPUESTA }
                                                                        //     onChange={ ( e ) => handleChange( e, preg.ID ) }
                                                                        //     input={ <Input/> }
                                                                        //     renderValue={ ( selected ) =>{ 
                                                                        //         let arrDes = []
                                                                        //         selected.forEach(element => {
                                                                        //             arrDes.push( element.split('_')[2] )
                                                                        //         });
                                                                        //         return arrDes.join(', ')
                                                                        //     } }
                                                                        //     MenuProps={ MenuProps }
                                                                        //     >
                                                                        //     {
                                                                        //         respuestas.filter( rpta => rpta.ID_PREGUNTA === preg.ID )
                                                                        //         .map( rpta => (
                                                                        //             <MenuItem 
                                                                        //             key={ preg.ID + '_' + rpta.ID }
                                                                        //             value={ preg.ID + '_' + rpta.ID + '_' + rpta.DESCRIPCION }>
                                                                        //                 <Checkbox
                                                                        //                 checked={ preg.RESPUESTA.indexOf( preg.ID + '_' + rpta.ID + '_' + rpta.DESCRIPCION  ) > -1}
                                                                        //                 color="primary" />
                                                                        //                 <ListItemText primary={ rpta.DESCRIPCION } />
                                                                        //             </MenuItem>
                                                                        //         ) )
                                                                        //     }
                                                                        //     </Select>
                                                                        // </FormControl>
                                                                        <ComboCheckboxControl respuestas={ respuestas }
                                                                        preg={ preg }
                                                                        classes={ classes }
                                                                        MenuProps={ MenuProps }
                                                                        handleChange={ handleChange }/>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </AccordionDetails>
                                        :
                                            <AccordionDetails>
                                                <div className="ed-container full">
                                                    <div className="ed-item" style={ { padding: '0px' } }>
                                                        <div className="ed-grid s-grid-8 m-grid-12">
                                                            <div className={ classes.center_item }>
                                                                <Avatar className={ classes.orange }>
                                                                    <Typography>{ preg.CODIGO }</Typography>
                                                                </Avatar>
                                                            </div>
                                                            <div className="s-cols-3 m-cols-4" style={ { margin: 'auto' } }>
                                                                <Typography>{ preg.DESCRIPCION }</Typography>
                                                            </div>
                                                            <div className="s-cols-4 m-cols-6 ed-grid s-grid-4 m-grid-8 rows-gap">
                                                                {
                                                                    preguntas.filter( hijo => hijo.ID_PADRE === preg.ID )
                                                                    .map( (hijo, index) => (
                                                                        <>
                                                                            <div className={ classes.center_item }>
                                                                                <Avatar className={ classes.small }>
                                                                                    <Typography>{ hijo.CODIGO }</Typography>
                                                                                </Avatar>
                                                                            </div>
                                                                            <div className="s-cols-3 m-cols-7 ed-grid rows-gap">
                                                                                <div className={ classes.center_item }>
                                                                                    <Typography>{ hijo.DESCRIPCION }</Typography>
                                                                                </div>
                                                                                <div className={ classes.center_item }>
                                                                                    {
                                                                                        // RADIOBUTTON
                                                                                        ( hijo.TIPO_RPTA_COD === 1 )
                                                                                        &&
                                                                                        // <FormControl component="fieldset">
                                                                                        //     <RadioGroup row name={ hijo.ID } onChange={ ( e ) => handleChange( e, hijo.ID ) }>
                                                                                        //         {
                                                                                        //             respuestas.filter( rpta => rpta.ID_PREGUNTA === hijo.ID )
                                                                                        //             .map( rpta => (
                                                                                        //                 <FormControlLabel value={ hijo.ID + '_' + rpta.ID }
                                                                                        //                 name={ hijo.ID + '_' + rpta.ID }
                                                                                        //                 control={ <Radio color="primary" /> } 
                                                                                        //                 label={ rpta.DESCRIPCION } />
                                                                                        //             ) )
                                                                                        //         }
                                                                                        //     </RadioGroup>
                                                                                        // </FormControl>
                                                                                        <RadioGroupControl respuestas={ respuestas }
                                                                                        preg={ hijo }
                                                                                        handleChange={ handleChange }/>
                                                                                    }
                                                                                    {
                                                                                        // CHECKBOX
                                                                                        ( hijo.TIPO_RPTA_COD === 2 )
                                                                                        &&
                                                                                        // <FormControl component="fieldset">
                                                                                        //     <FormGroup row>
                                                                                        //         {
                                                                                        //             respuestas.filter( rpta => rpta.ID_PREGUNTA === hijo.ID )
                                                                                        //             .map( rpta => (
                                                                                        //                 <FormControlLabel
                                                                                        //                 control={
                                                                                        //                     <Checkbox
                                                                                        //                         options={ rpta }
                                                                                        //                         id={ hijo.ID + '_' + rpta.ID  }
                                                                                        //                         name={ hijo.ID + '_' + rpta.ID }
                                                                                        //                         onChange={ ( e ) => handleChange( e, hijo.ID ) }
                                                                                        //                         color="primary"
                                                                                        //                     />
                                                                                        //                 }
                                                                                        //                 label={ rpta.DESCRIPCION }
                                                                                        //                 />
                                                                                        //             ) )
                                                                                        //         }
                                                                                        //     </FormGroup>
                                                                                        // </FormControl>
                                                                                        <CheckboxGroupControl respuestas={ respuestas }
                                                                                        preg={ hijo }
                                                                                        handleChange={ handleChange }/>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            {
                                                                                ( index < preguntas.filter( hijo => hijo.ID_PADRE === preg.ID ).length - 1 )
                                                                                &&
                                                                                <div class="s-cols-4 m-cols-8 ed-grid rows-gap">
                                                                                    <Divider/>
                                                                                </div>
                                                                            }
                                                                        </>
                                                                    ) )
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </AccordionDetails>
                                    }
                                    <Divider/>
                                    </>
                                ) )
                            }
                        </Accordion>
                    ) )
                }
            </div>
        </SimpleBarReact>
    )
}
