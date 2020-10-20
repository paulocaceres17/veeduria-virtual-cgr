import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import { TextSnippet } from '../../icons/icons';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
}));

const StyledTableCell = withStyles((theme) => ({
    root: {
        padding: '0px',
    },
    head: {
        backgroundColor: theme.palette.table.bg_head,
        color: theme.palette.common.black,
        padding: '16px',
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRowGroup = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.table.bg_group,
    },
}))(TableRow);

const StyledTableRow = withStyles((theme) => ({
    root: {
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    },
}))(TableRow);

const StyledEyeIcon = withStyles((theme) => ({
    root: {
        color: theme.palette.warning.main,
    },
}))(RemoveRedEyeIcon);


const StyledTextSnippet = withStyles((theme) => ({
    root: {
        color: theme.palette.success.main,
    },
}))(TextSnippet);

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 'PAULO CESAR RAVICHAHUA CACERES', '44254145', 'SECUNDARIA', '2do A'),
    createData('Ice cream sandwich', 'AMELIA AIDA ROJAS QUISPE', '41567195', 'PRIMARIA', '3ro C'),
    createData('Eclair', 'ROSA CECILIA RAVICHAHUA CACERES', '42856336', 'SECUNDARIA', 'ÚNICO'),
];

export const ListadoEstudiantesScreen = () => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                    <StyledTableCell align="center">ACCIONES</StyledTableCell>
                    <StyledTableCell align="left">NOMBRES</StyledTableCell>
                    <StyledTableCell align="left">DNI</StyledTableCell>
                    <StyledTableCell align="left">NIVEL</StyledTableCell>
                    <StyledTableCell align="left">AÑO</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <StyledTableRowGroup key="grupo">
                        <StyledTableCell component="th" scope="row" colSpan="5">
                            <p style={{margin: '5px 15px'}}>Grupo</p>
                        </StyledTableCell>
                    </StyledTableRowGroup>
                    {rows.map((row) => (
                    <TableRow key={row.name}>
                        {/* <StyledTableCell component="th" scope="row">
                        {row.name}
                        </StyledTableCell> */}
                        <StyledTableCell align="center">
                            <IconButton color="secondary" aria-label="edit">
                                <EditIcon />
                            </IconButton>
                            <IconButton color="primary" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                            <IconButton color="warning" aria-label="search">
                                <StyledEyeIcon />
                            </IconButton>
                            <IconButton color="success" aria-label="save">
                                {/* <StyledSaveIcon /> */}
                                <StyledTextSnippet/>
                            </IconButton>
                        </StyledTableCell>
                        <StyledTableCell align="left">{row.calories}</StyledTableCell>
                        <StyledTableCell align="left">{row.fat}</StyledTableCell>
                        <StyledTableCell align="left">{row.carbs}</StyledTableCell>
                        <StyledTableCell align="left">{row.protein}</StyledTableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
