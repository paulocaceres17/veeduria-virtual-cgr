import React from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'

const FORMATOS = {
    dni: '########',
    celular: '#### - #####',
}

export function TextNumber(props) {
    const { inputRef, onChange, ...other } = props;

    var format = ''
    switch ( props.name ) {
        case 'dni':
            format = FORMATOS.dni
            break;

        case 'celular':
            format = FORMATOS.celular
            break;
    
        default:
            break;
    }
    return (
        <NumberFormat
            { ...other }
            getInputRef={ inputRef }
            onValueChange={ (values) => {
                onChange( { 
                    target: {
                        name: props.name,
                        value: values.value,
                    } } )
                
            } }
            
            // thousandSeparator
            format={ format }
            isNumericString
            prefix=""
        />
    );
}
TextNumber.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};



{/* className={ clsx( classes.margin, classes.textField ) } */}
{/* <FormControl size="small" id="frm-dni" fullWidth>
    <InputLabel htmlFor="standard-adornment-password" required>
        DNI
    </InputLabel>
    <Input id="standard-adornment-password" type="text"
        endAdornment={
            <InputAdornment position="end">
                <IconButton>
                    <Search />
                </IconButton>
            </InputAdornment>
        }
    />
</FormControl> */}


