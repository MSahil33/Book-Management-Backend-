// Creating a utility file for handling all the errors functionality
class ApiError extends Error {
    constructor(statusCode,message="Something went wrong",errors=[],stack="") {
        super(message); //calling the parent class constructore i,e Error class
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this,this.constructor);
        }
    }
}

export {ApiError};