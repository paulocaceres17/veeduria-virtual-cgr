import React from 'react'

import { RegistroEstudianteScreen } from './components/estudiante/RegistroEstudianteScreen';
import { RegistroPadreScreen } from './components/padre/RegistroPadreScreen';

import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './styles/setTheme';

const { detect } = require('detect-browser');

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    }
}));

export const App = () => {

    const classes = useStyles();

    const browser = detect();
    switch (browser && browser.name) {
        case 'chrome':
        case 'firefox':
            console.log('supported');
            break;
        case 'edge':
            console.log('kinda ok');
            break;
        default:
            console.log('not supported');
    }

    if (browser) {
        console.log(browser.name, browser.version, browser.os);
    }

    return (
        <>
            <ThemeProvider theme={ theme }>
                <div className={ classes.root }>
                    <RegistroPadreScreen/>
                    <RegistroEstudianteScreen/>
                </div>
            </ThemeProvider>
        </>
    )
}