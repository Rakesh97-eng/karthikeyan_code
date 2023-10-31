import { AxiosError } from 'axios';

interface APIError {
  statusCode: number;
  path: string;
  method: string;
  message: string | string[];
}

/**
 * default error handler
 * prints the stack trace if the dev env is development
 */
export const defaultErrorHandler = (message: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.trace(message);
  }
};

/**
 * handle axios error
 * if the error type is Axios Error this handles it by
 * calling the default handler but also looking into the response
 * of the error to check for server specific messages
 */
export const handleAxiosError = (
  error: AxiosError<APIError>,
  handler = defaultErrorHandler
) => {
  const errorResponse = error.response?.data;
  if (!errorResponse) {
    handler(`${error.code}: ${error.message}`);
    return;
  }
  if (Array.isArray(errorResponse.message)) {
    handler(`${errorResponse.statusCode}: ${errorResponse.message.join('. ')}`);
    return;
  }
  handler(`${errorResponse.statusCode}: ${errorResponse.message}`);
};
