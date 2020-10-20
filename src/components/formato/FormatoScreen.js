import React, { forwardRef } from 'react'
import { Dialog,
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Slide,
    Typography
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import { theme } from '../../styles/setTheme';

import {
    BrowserView,
    MobileView,
    // isBrowser,
    // isMobile
} from "react-device-detect";
import { MobileScreen } from './MobileScreen';
import { BrowserScreen } from './BrowserScreen';

const useStyles = makeStyles((theme) => ({
    title: {
        marginLeft: theme.spacing(0),
        flex: 1,
        fontSize: theme.typography.pxToRem(17),
        fontWeight: theme.typography.fontWeightRegular
    },
    toolbar: {
        minHeight: '30px',
        paddingLeft: '10px',
        paddingRight: '10px',
    },
}));

const StyledAppBar = withStyles({
    root: {
        position: 'relative',
        backgroundColor: theme.palette.primary.main,
        color: "#ffffff",
        marginBottom: -1,
        '&$expanded': {
            minHeight: 30,
        },
    },
})(AppBar);


export const FormatoScreen = () => {
    const classes = useStyles();

    return (
        <>
            {/* <StyledAppBar>
                <Toolbar className={ classes.toolbar }>
                    <Typography className={ classes.title }>
                        Registro de formato
                    </Typography>
                </Toolbar>
            </StyledAppBar> */}

            <BrowserView>
                <BrowserScreen/>
            </BrowserView>
            <MobileView>
                <BrowserScreen/>
                {/* <MobileScreen/> */}
            </MobileView>

        </>
    )
}
