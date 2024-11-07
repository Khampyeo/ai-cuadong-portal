import dayjs from "dayjs";

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
