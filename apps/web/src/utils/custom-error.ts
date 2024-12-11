type ErrorType = {
	message: string;
	description?: string;
	code?: number;
};

class CustomError extends Error {
	code?: number;
	description?: string;
	constructor(error: ErrorType) {
		super(error.message);
		this.message = error.message;
		this.description = error.description;
		this.code = error.code;
	}
}

export default CustomError;
