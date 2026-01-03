import { delay, extractErrorMessage } from "utilzify";
import { type ErrorHandler, GrammyError, HttpError } from "grammy";

import { notifyDevelopers } from "@/utils";

import { getUsers } from "@/modules/sheets";

const errorHandlerMiddleware: ErrorHandler = async err => {
  const errorMessage = extractErrorMessage(err.error);
  const users = await getUsers();

  for (const user of users) {
    await notifyDevelopers({ user, message: errorMessage, isError: true });
    await delay(500);
  }

  if (err.error instanceof GrammyError) {
    console.error("Request error:", err.error.description);
  } else if (err.error instanceof HttpError) {
    console.error("Could not contact Telegram:", err.error);
  } else {
    console.error("Unknown error:", err.error);
  }
};

export default errorHandlerMiddleware;
