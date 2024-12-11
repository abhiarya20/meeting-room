class CustomError extends Error {
    constructor(error) {
        super(error);
        this.message = error.message;
        this.description = error.description
        this.code = error.code;
    }
}

export default CustomError;