import { makeStyles, withStyles } from '@material-ui/core/styles'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'

export const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
            height: theme.spacing(16),
        },
    },
    orange: {
        color: theme.white,
        backgroundColor: theme.palette.primary.avatar,
    },
    orangeMobile: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        color: theme.white,
        backgroundColor: theme.palette.primary.avatar,
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        color: theme.white,
        backgroundColor: theme.palette.primary.subAvatar,
    },
    smallMobile: {
        width: theme.spacing(2),
        height: theme.spacing(2),
        color: theme.white,
        backgroundColor: theme.palette.primary.subAvatar,
    },
    textBrowser: {
        fontSize: '14px',
    },
    textMobile: {
        fontSize: '10px',
    },
    center_item: {
        margin: 'auto',
    },
    dividerInset: {
        margin: `5px 0 0 ${theme.spacing(9)}px`,
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 250,
    },
    multiSelect: {
        margin: theme.spacing(0),
        minWidth: 250,
    },
    textField: {
        margin: theme.spacing(0),
        minWidth: 300,
    },
}));


export const Accordion = withStyles({
    root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    width: '100%',
    boxShadow: 'none',
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
    '&$expanded': {
        margin: 'auto',
    },
    },
    expanded: {},
})(MuiAccordion);

export const AccordionSummary = withStyles({
    root: {
    backgroundColor: '#eee',
    borderBottom: '1px solid #ddd',
    marginBottom: -1,
    minHeight: 46,
    '&$expanded': {
        minHeight: 46,
    },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

export const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    },
}))(MuiAccordionDetails);
