export const errorHandler = (error, req, res , next) =>{
    const message = error.message || 'internal error';
    const statusCode = error.status || 500

    res.status(statusCode).json({
        message, 
        sucess: false
    })
}

export const sendError = (res , error , statusCode)=>{
    res.status(statusCode).json({error , sucess: false})
}