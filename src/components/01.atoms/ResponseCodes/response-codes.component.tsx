/** 
 * Component to display the response code
 * 
 * @param {number} respCode - The response code
 * @returns {string} - The response code
 *
 * @example
 * <ResponseCode respCode={0} />
 */
const ResponseCode = ({ respCode }: { respCode: number }) => {
  let code = '';

  switch (respCode) {
    case 0:
      code = 'Missing Parameter';
      break;
    case 1:
      code = 'Rate limit exceeded';
      break;
    case 2:
      code = 'Not Found';
      break;
    case 3:
      code = 'Unknown Parameter';
      break;
    case 4:
      code = 'Deprecated';
      break;
    case 5:
      code = 'Unsecure';
      break;
    default:
      code = '';
      break;
  }

  return code;
};

export default ResponseCode;