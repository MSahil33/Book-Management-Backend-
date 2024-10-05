// A utility file to standardized the template for sending the API Response 
class ApiResponse {
    constructor(statusCode,data,message="Success") {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = statusCode < 400;
    }
}

export {ApiResponse};