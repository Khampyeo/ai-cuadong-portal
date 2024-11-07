import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useCsrfCookie = () => {
  const [csrfToken, setCsrfToken] = useState(Cookies.get("XSRF-TOKEN"));

  useEffect(() => {
    const checkCsrfToken = async () => {
      if (!csrfToken) {
        try {
          const response = await fetch("/api/set-csrf-cookie", {
            method: "GET",
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error("Failed to set CSRF cookie");
          }

          const newToken = Cookies.get("XSRF-TOKEN");
          if (newToken) {
            setCsrfToken(newToken);
          }
        } catch (error) {
          console.error("Failed to set CSRF cookie:", error);
        }
      }
    };

    checkCsrfToken();
  }, [csrfToken]);

  return csrfToken;
};

export default useCsrfCookie;
