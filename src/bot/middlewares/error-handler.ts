import { ErrorHandler, GrammyError, HttpError } from "grammy";

import { extractErrorMessage, notifyError } from "../../utils";

const errorHandler: ErrorHandler = async err => {
  const errorMessage = extractErrorMessage(err.error);
  await notifyError(errorMessage);

  if (err.error instanceof GrammyError) {
    console.error("Request error:", err.error.description);
  } else if (err.error instanceof HttpError) {
    console.error("Could not contact Telegram:", err.error);
  } else {
    console.error("Unknown error:", err.error);
  }
};

export default errorHandler;
