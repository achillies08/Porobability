// Use aswitch case for error codes:

let errMessage = "";
function handleErr(code) {
  switch (code) {
    case 403:
      errMessage = code + " Error: API key expired.";
      break;
    case 404:
      errMessage = code + " Error: Data not found.";
      break;
    case 504:
      errMessage = code + " Error: Timeout.";
      break;
    case 503:
      errMessage = code + " Error: Service Unavailabe.";
      break;
  }
  return errMessage;
}

export { handleErr, errMessage };
