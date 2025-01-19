/* eslint-disable */
import get from "lodash/get";

const extractErrorMessage = (error: any): string => {
  let errorMessage: string = "";

  if (typeof error === "object" && error !== null) {
    if (error.message) {
      errorMessage += error.message + "\n";
    }

    if ("errors" in error) {
      console.log(get(error, "errors", []));
      get(error, "errors", [])?.forEach((err: any) => {
        if (err.message) {
          errorMessage += err.message + "\n";
        }
      });
    }

    if (error.response && error.response.data && error.response.data.error) {
      const responseError = error.response.data.error;
      if (responseError.message) {
        errorMessage += responseError.message + "\n";
      }
    }
  } else {
    errorMessage += String(error) + "\n";
  }

  return errorMessage.trim() || "Noma'lum xatolik";
};

export default extractErrorMessage;
