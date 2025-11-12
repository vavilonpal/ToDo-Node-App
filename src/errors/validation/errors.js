


class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.status = 'error';
    }
}

class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
        super(message, 404);
    }
}

class ValidationError extends AppError {
    constructor(message = 'Validation failed') {
        super(message, 400);
    }
}

class DatabaseError extends AppError {
    constructor(message = 'Database error') {
        super(message, 500);
    }
}

module.exports = {
    AppError,
    NotFoundError,
    ValidationError,
    DatabaseError
};