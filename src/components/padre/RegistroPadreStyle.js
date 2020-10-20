import { AccordionActions, makeStyles, AccordionSummary } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles'
import { theme } from '../../styles/setTheme'

export const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
        marginBottom: 0,
    },
    icon: {
        color: "#ffffff",
    },
    detalle: {
        padding: "25px 10px 20px",
    },
    wrapper: {
        position: 'relative',
    },
    captchaProgress: {
        color: theme.palette.secondary.main,
        position: 'absolute',
        top: '50%',
        left: '30%',
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
}));

export const StyledAccordionSummary = withStyles({
    root: {
        backgroundColor: theme.palette.primary.main,
        color: "#ffffff",
        marginBottom: -1,
        minHeight: 30,
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        '&$expanded': {
            minHeight: 30,
        },
    },
    content: {
        '&$expanded': {
            margin: '0px 0',
        },
    },
    expanded: {},
})(AccordionSummary);

export const StyledAccordionActions = withStyles({
    root: {
        padding: '8px 25px',
    },
})(AccordionActions);

