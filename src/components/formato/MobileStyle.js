import { makeStyles, withStyles } from '@material-ui/core/styles'
import MuiStepper from '@material-ui/core/Stepper'

export const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    center_item: {
        margin: 'auto',
    },
    dividerInset: {
        margin: `5px 0 0 ${theme.spacing(9)}px`,
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 200,
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        color: theme.white,
        backgroundColor: theme.palette.primary.subAvatar,
    },
    smallText: {
        fontSize: 14,
        fontWeight: 100,
    },
    // stepperRoot: {
    //     '& > *': {
    //         padding: theme.spacing(0),
    //     },
    // },
}));

export const Stepper = withStyles((theme) => ({
    root: {
        padding: theme.spacing(0),
    },
}))(MuiStepper);

