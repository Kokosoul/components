/**
 * Convert an array of api properties into nice looking table headers
 */
export const mapToPrettyHeader = (keys, headers = {}) => {
    return keys.map((key) => headers[key] || key);
  };