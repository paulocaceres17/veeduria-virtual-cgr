import React, { useState } from 'react'
import { Typography, Divider } from '@material-ui/core'
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
import { AvatarControl } from './controles/Avatar';
import { isBrowser } from "react-device-detect";

export const BrowserScreen = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    let { grupos, preguntas, respuestas, dependencias } = useSelector( state => state.pregunta )
    const [value, setValue] = useState(null);

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
                                                                <AvatarControl clase={ 
                                                                    isBrowser 
                                                                    ? classes.orange 
                                                                    : classes.orangeMobile } numero={ preg.CODIGO }
                                                                    sizeText={
                                                                        isBrowser 
                                                                        ? classes.textBrowser 
                                                                        : classes.textMobile }/>
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
                                                                                <RadioGroupControl respuestas={ respuestas }
                                                                                preg={ preg }
                                                                                handleChange={ handleChange }/>
                                                                            }
                                                                            {
                                                                                ( !preg.HABILITADO ) && <DisabledControl/>
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
                                                                                <CheckboxGroupControl respuestas={ respuestas }
                                                                                preg={ preg }
                                                                                handleChange={ handleChange }/>
                                                                            }
                                                                            {
                                                                                ( !preg.HABILITADO ) && <DisabledControl/>
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
                                                                                <SelectControl respuestas={ respuestas }
                                                                                preg={ preg }
                                                                                classes={ classes }
                                                                                handleChange={ handleChange }/>
                                                                            }
                                                                            {
                                                                                ( !preg.HABILITADO ) && <DisabledControl/>
                                                                            }
                                                                        </div>
                                                                    }
                                                                    {
                                                                        // TEXTBOX
                                                                        ( preg.TIPO_RPTA_COD === 4 )
                                                                        &&
                                                                        <TextboxControl preg={ preg }
                                                                        classes={ classes }
                                                                        handleChange={ handleChange }/>
                                                                    }
                                                                    {
                                                                        // COMBOCHECKBOX
                                                                        ( preg.TIPO_RPTA_COD === 5 || preg.TIPO_RPTA_COD === 6 )
                                                                        &&
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
                                                                <AvatarControl clase={ 
                                                                    isBrowser 
                                                                    ? classes.orange 
                                                                    : classes.orangeMobile } numero={ preg.CODIGO }
                                                                    sizeText={
                                                                        isBrowser 
                                                                        ? classes.textBrowser 
                                                                        : classes.textMobile }/>
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
                                                                                <AvatarControl clase={ 
                                                                                    isBrowser 
                                                                                    ? classes.small 
                                                                                    : classes.smallMobile } numero={ hijo.CODIGO }
                                                                                    sizeText={
                                                                                        isBrowser 
                                                                                        ? classes.textBrowser 
                                                                                        : classes.textMobile }/>
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
                                                                                        <RadioGroupControl respuestas={ respuestas }
                                                                                        preg={ hijo }
                                                                                        handleChange={ handleChange }/>
                                                                                    }
                                                                                    {
                                                                                        // CHECKBOX
                                                                                        ( hijo.TIPO_RPTA_COD === 2 )
                                                                                        &&
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
