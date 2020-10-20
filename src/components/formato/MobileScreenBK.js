import React, { useState } from 'react'
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineDot,
    TimelineConnector,
    TimelineContent,
} from '@material-ui/lab'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { theme } from '../../styles/setTheme';
import { Typography, Button, Step, StepLabel, StepContent, Paper, FormControl, RadioGroup, FormControlLabel, Radio, InputLabel, Select, Input, MenuItem, Checkbox, ListItemText, Avatar, Divider } from '@material-ui/core';

import SimpleBarReact from "simplebar-react";
import 'simplebar/dist/simplebar.min.css';
import { useSelector } from 'react-redux';
import { useStyles,
    Stepper,
} from './MobileStyle'
import { AvatarControl } from './controles/Avatar';

// const preguntas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

// const useStyles = makeStyles((theme) => ({
//     timeline: {
//         padding: '6px 0px',
//     },
//     timelineItem: {
//         minHeight: '40px',
//         height: '40px'
//     }
// }));


// const TimelineDotCurrent = withStyles({
//     root: {
//         backgroundColor: theme.palette.primary.main,
//     },
// })(TimelineDot);

// const TimelineDotDone = withStyles({
//     root: {
//         borderColor: theme.palette.secondary.main,
//     },
// })(TimelineDot);


export const MobileScreen = () => {
    const classes = useStyles();
    const { grupos, preguntas, respuestas } = useSelector( state => state.pregunta )

    function getSteps() {
        let arrPreguntas = []
        preguntas.filter( preg => preg.ID_PADRE === 0 )
                                    .map( preg => (
                                        arrPreguntas.push( preg.ID )
                                    ) )
        return arrPreguntas
    }
    // , preg.CODIGO

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };






    
    const [value, setValue] = useState(null);

    const handleChange = (event) => {
        console.log(event.target.value)
        setValue(event.target.value);
    };


    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 300,
            },
        },
    }
    const [personName, setPersonName] = useState([])

    const handleChangeSelect = (event) => {
        setPersonName(event.target.value);
    }

    function getStepContent(step) {
        return preguntas.filter( preg => preg.ID === step )
                                .map( preg => (
                                    ( preg.IND_PADRE === '0' )
                                    ?
                                        <div className="ed-container full">
                                            <div className="ed-item" style={ { padding: '0px' } }>
                                                <div className="ed-grid s-grid-5">
                                                    <div className="s-cols-5 ed-grid rows-gap">
                                                        <div className={ classes.center_item }>
                                                            <Typography>{ preg.DESCRIPCION }</Typography>
                                                        </div>
                                                        <div className={ classes.center_item }>
                                                            <FormControl component="fieldset">
                                                                <RadioGroup row name={ preg.ID } value={ value } onChange={ handleChange }>
                                                                    {
                                                                        respuestas.filter( rpta => rpta.ID_PREGUNTA === preg.ID )
                                                                        .map( rpta => (
                                                                            <FormControlLabel value={ rpta.DESCRIPCION }
                                                                            control={ <Radio color="primary" /> } 
                                                                            label={ rpta.DESCRIPCION } />
                                                                        ) )
                                                                    }
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    :
                                        <div className="ed-container full">
                                            <div className="ed-item" style={ { padding: '0px' } }>
                                                <div className="ed-grid s-grid-5">
                                                    <div className="s-cols-5" style={ { margin: 'auto' } }>
                                                        <Typography>{ preg.DESCRIPCION }</Typography>
                                                    </div>
                                                    <div className="s-cols-5 ed-grid rows-gap">
                                                        <Divider/>
                                                    </div>
                                                    <div className="s-cols-5 ed-grid s-grid-5 rows-gap">
                                                        {
                                                            preguntas.filter( hijo => hijo.ID_PADRE === preg.ID )
                                                            .map( (hijo, index) => (
                                                                <>
                                                                    <div className={ classes.center_item }>
                                                                        <Avatar className={ classes.small }>
                                                                            <Typography className={ classes.smallText }>{ hijo.CODIGO }</Typography>
                                                                        </Avatar>
                                                                        {/* <AvatarControl clase={ classes.orange } numero={ preg.CODIGO } sizeText={ classes.smallText }/> */}
                                                                    </div>
                                                                    <div className="s-cols-4 ed-grid rows-gap">
                                                                        <div className={ classes.center_item }>
                                                                            <Typography>{ hijo.DESCRIPCION }</Typography>
                                                                        </div>
                                                                        <div className={ classes.center_item }>
                                                                            <FormControl className={ classes.formControl }>
                                                                                <InputLabel id="demo-mutiple-checkbox-label">Respuesta</InputLabel>
                                                                                <Select
                                                                                labelId="demo-mutiple-checkbox-label"
                                                                                id="demo-mutiple-checkbox"
                                                                                multiple
                                                                                value={ personName }
                                                                                onChange={ handleChangeSelect }
                                                                                input={ <Input/> }
                                                                                renderValue={ ( selected ) => selected.join(', ') }
                                                                                MenuProps={ MenuProps }
                                                                                >
                                                                                {
                                                                                    respuestas.filter( rpta => rpta.ID_PREGUNTA === hijo.ID )
                                                                                    .map( rpta => (
                                                                                        <MenuItem key={ rpta.DESCRIPCION } value={ rpta.DESCRIPCION }>
                                                                                            <Checkbox checked={personName.indexOf( rpta.DESCRIPCION ) > -1}
                                                                                            color="primary" />
                                                                                            <ListItemText primary={ rpta.DESCRIPCION } />
                                                                                        </MenuItem>
                                                                                    ) )
                                                                                }
                                                                                </Select>
                                                                            </FormControl>
                                                                        </div>
                                                                    </div>
                                                                    {
                                                                        ( index < preguntas.filter( hijo => hijo.ID_PADRE === preg.ID ).length - 1 )
                                                                        &&
                                                                        <div class="s-cols-5 ed-grid rows-gap">
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
                                ) )
    }

    return (
        <SimpleBarReact style={{ maxHeight: 400 }} forceVisible="y" autoHide={ false }>

            <div className={ classes.root }>
                <Stepper activeStep={ activeStep } orientation="vertical">
                    { steps.map( label => (
                    <Step key={label}>
                        <StepLabel></StepLabel>
                        <StepContent>
                            <Typography>{ getStepContent(label) }</Typography>
                            <div className={ classes.actionsContainer }>
                                <div>
                                <Button
                                    disabled={ activeStep === 0 }
                                    onClick={ handleBack }
                                    className={ classes.button }
                                >
                                    Atrás
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={ handleNext }
                                    className={ classes.button }
                                >
                                    {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                                </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} className={classes.button}>
                        Reset
                    </Button>
                    </Paper>
                )}
            </div>

        </SimpleBarReact>
        // <div className="ed-grid s-grid-4 m-grid-6 lg-grid-9">
        //     <div>
        //         <Timeline align="right" className={ classes.timeline }>
        //             <TimelineItem>
        //                 <TimelineSeparator>
        //                 <TimelineDotDone variant="outlined"/>
        //                 <TimelineConnector />
        //                 </TimelineSeparator>
        //                 <TimelineContent>1</TimelineContent>
        //             </TimelineItem>
        //             <TimelineItem>
        //                 <TimelineSeparator>
        //                 <TimelineDotCurrent />
        //                 <TimelineConnector />
        //                 </TimelineSeparator>
        //                 <TimelineContent>2</TimelineContent>
        //             </TimelineItem>
        //             <TimelineItem>
        //                 <TimelineSeparator>
        //                 <TimelineDot />
        //                 <TimelineConnector />
        //                 </TimelineSeparator>
        //                 <TimelineContent>3</TimelineContent>
        //             </TimelineItem>
        //             <TimelineItem>
        //                 <TimelineSeparator>
        //                 <TimelineDot />
        //                 </TimelineSeparator>
        //                 <TimelineContent>4</TimelineContent>
        //             </TimelineItem>
        //         </Timeline>

        //     </div>
        //     <div className="s-cols-1 m-grid-5 lg-grid-8">
        //     </div>
        // </div>
    )
}
