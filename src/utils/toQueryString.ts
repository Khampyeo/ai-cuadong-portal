function toQueryString(obj?: { [key: string]: any }): string {
  if (!obj) return "";

  const keyValuePairs = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value !== undefined) {
        keyValuePairs.push(
          encodeURIComponent(key) + "=" + encodeURIComponent(value)
        );
      }
    }
  }

  return keyValuePairs.join("&");
}

export { toQueryString };
