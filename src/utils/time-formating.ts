import dayjs from "dayjs";

export const timestampToFormattedString = (timestamp: string): string => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours =
    hours % 12 < 10 ? "0" + (hours % 12) : hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
  const formattedDate =
    date.getDate() < 10 ? "0" + date.getDate() : `${date.getDate()}`;
  const formattedMonth =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : `${date.getMonth() + 1}`;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm} ${formattedDate}/${formattedMonth}/${date.getFullYear()}`;
};


export function formatDate(date?: Date | string) {
  if (!date) {
    return "";
  }

  const parsedDate = dayjs(date);

  if (!parsedDate.isValid()) {
    return "Invalid date";
  }

  return parsedDate.format("DD/MM/YYYY");
}

export function formatDateTime(date?: Date | string) {
  if (!date) {
    return "";
  }

  const parsedDate = dayjs(date);

  if (!parsedDate.isValid()) {
    return "Invalid date";
  }

  return parsedDate.format("DD/MM/YYYY HH:mm:ss");
}
