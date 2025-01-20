export function convertToCustomFormatForDateTime(dateString) {
  const inputDate = new Date(dateString);

  if (isNaN(inputDate?.getTime())) {
    // Handle invalid date string
    // throw new Error("Invalid date string");s
    return;
  }

  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
  const day = inputDate.getDate().toString().padStart(2, "0");
  const hours = inputDate.getHours().toString().padStart(2, "0");
  const minutes = inputDate.getMinutes().toString().padStart(2, "0");

  const customFormattedString = `${year}-${month}-${day}T${hours}:${minutes}`;
  //   console.log({ customFormattedString });

  return customFormattedString;
}

export function convertToCustomFormat(dateString) {
  const inputDate = new Date(dateString);

  if (isNaN(inputDate?.getTime())) {
    // Handle invalid date string
    // throw new Error("Invalid date string");s
    return;
  }

  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
  const day = inputDate.getDate().toString().padStart(2, "0");

  const customFormattedString = `${year}-${month}-${day}`;
  //   console.log({ customFormattedString });

  return customFormattedString;
}
