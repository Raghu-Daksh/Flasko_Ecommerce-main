// Base Class
  class AppError extends Error {
    constructor(message, { status = 500, code = 'INTERNAL_ERROR', details = null } = {}) {
        super(message);
        this.name = this.constructor.name; // Class ka naam (e.g., 'BadRequestError')
        this.status = status;
        this.code = code; // Frontend ke liye helpful tag
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}

// 400: Jab user galat data bheje
  class BadRequestError extends AppError {
    constructor(message = 'Bad Request', details) {
        super(message, { status: 400, code: 'BAD_REQUEST', details });
    }
}

// 401: Jab user login na ho
  class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized', details) {
        super(message, { status: 401, code: 'UNAUTHORIZED', details });
    }
}

// 403: Jab login ho par permission na ho (Correction here)
  class ForbiddenError extends AppError {
    constructor(message = 'Forbidden', details) {
        super(message, { status: 403, code: 'FORBIDDEN', details });
    }
}

// Usage: if (!product) throw new NotFoundError('Product nahi mila');
  class NotFoundError extends AppError {
    constructor(message = 'Resource Not Found', details) {
        super(message, { status: 404, code: 'NOT_FOUND', details });
    }
}

// Usage: if (price < 0) throw new ValidationError('Price negative nahi ho sakti');
  class ValidationError extends AppError {
    constructor(message = 'Validation Failed', details) {
        super(message, { status: 422, code: 'VALIDATION_ERROR', details });
    }
}

// Usage: if (existingSku) throw new ConflictError('Ye SKU pehle se exist karta hai');
 class ConflictError extends AppError {
    constructor(message = 'Resource Conflict', details) {
        super(message, { status: 409, code: 'CONFLICT', details });
    }
}

 class ServerError extends AppError {
  constructor(message) {
    super(message, {status: 500, code:'Internal server error', details});
  }
}

export {
  AppError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
  ConflictError,
  ServerError
};