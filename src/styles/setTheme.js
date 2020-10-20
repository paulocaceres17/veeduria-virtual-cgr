import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import { yellow, green } from '@material-ui/core/colors';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: red[700],
            bg_head: red[300],
            avatar: red[600],
            subAvatar: red[400],
        },
        secondary: {
            main: blue[700],
            bg_head: blue[100],
            avatar: blue[300],
        },
        warning: {
            main: yellow[700],
        },
        success: {
            main: green[400],
        },
        error: {
            main: red[400],
        },
        table: {
            bg_head: grey[400],
            bg_group: grey[200],
        },
    },
    // palette: {
    //     primary: blue,
    //     secondary: pink,
    // },
});
