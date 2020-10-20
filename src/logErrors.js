export const MessagesError = {
    codigo_verificacion: 'Código de verificación incorrecto'
}

export const logErrors = ( e ) => {
    const errorModel = {
        Type: '',
        Message: ''
    }

    if (e instanceof TypeError) {
        errorModel.Type = 'Type Error'
    } else if (e instanceof RangeError) {
        errorModel.Type = 'Range Error'
    } else if (e instanceof EvalError) {
        errorModel.Type = 'Eval Error'
    } else {
        errorModel.Type = 'Unspecified Error'
    }

    if ( e.Message )
        errorModel.Message = e.Message
    else
        errorModel.Message = e.toString()

    return errorModel
}
