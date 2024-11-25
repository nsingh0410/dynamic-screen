function convertDateFormatToTimestamp(dateString) {
    // Parse the input date string in ISO 8601 format
    const parsedDate = new Date(dateString);
  
    // Check if the parsing was successful
    if (isNaN(parsedDate)) {
      console.error('Invalid date format');
      return null;
    }
  
    // Convert to Unix epoch timestamp (in seconds)
    const unixTimestamp = Math.floor(parsedDate.getTime() / 1000);
  
    return unixTimestamp;
  }
  
  export { convertDateFormatToTimestamp };
  