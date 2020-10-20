import React from 'react'
import { Avatar, Typography } from '@material-ui/core'

export const AvatarControl = ( { clase, numero, sizeText } ) => {

    return (
        <Avatar className={ clase }>
            <Typography className={ sizeText }>{ numero }</Typography>
        </Avatar>
    )
}
