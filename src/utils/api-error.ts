import { StatusCodes } from "http-status-codes";

type ErrorType =
  | "NotFound"
  | "BadRequest"
  | "Unauthenticated"
  | "Unauthorized"
  | "Validation"
  | "Internal"
  | "Conflict";

class ApiError extends Error {
  public statusCode: number;
  public errorType: ErrorType;

  constructor(type: ErrorType, message: string | string[], statusCode?: number) {
    super(Array.isArray(message) ? message.join(", ") : message);

    this.errorType = type;

    this.statusCode = statusCode || this.getDefaultStatusCode(type);

    this.name = `${type}Error`;
  }

  private getDefaultStatusCode(type: ErrorType): number {
    switch (type) {
      case "NotFound":
        return StatusCodes.NOT_FOUND;
      case "BadRequest":
      case "Validation":
        return StatusCodes.BAD_REQUEST;
      case "Unauthenticated":
        return StatusCodes.UNAUTHORIZED;
      case "Unauthorized":
        return StatusCodes.FORBIDDEN;
      case "Internal":
        return StatusCodes.INTERNAL_SERVER_ERROR;
      case "Conflict":
        return StatusCodes.CONFLICT;
      default:
        return StatusCodes.INTERNAL_SERVER_ERROR; // Fallback
    }
  }

  // Static factory methods for convenience
  static notFound(message: string | string[]) {
    return new ApiError("NotFound", message);
  }

  static badRequest(message: string | string[]) {
    return new ApiError("BadRequest", message);
  }

  static unauthenticated(message: string | string[]) {
    return new ApiError("Unauthenticated", message);
  }

  static unauthorized(message: string | string[]) {
    return new ApiError("Unauthorized", message);
  }

  static internal(message: string | string[]) {
    return new ApiError("Internal", message);
  }

  static conflict(message: string | string[]) {
    return new ApiError("Conflict", message);
  }

  static validation(message: string | string[], statusCode?: number) {
    return new ApiError("Validation", message, statusCode);
  }
}

export default ApiError;
