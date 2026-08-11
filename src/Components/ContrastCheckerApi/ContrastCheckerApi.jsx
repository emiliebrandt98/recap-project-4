import { useEffect, useState } from "react";
import "./ContrastCheckerApi.css";

export function useContrastScore(hex, contrastText) {
  const [score, setScore] = useState(null);

  useEffect(() => {
    async function fetchScore() {
      try {
        const response = await fetch(
          "https://www.aremycolorsaccessible.com/api/are-they",
          {
            mode: "cors",
            method: "POST",
            body: JSON.stringify({ colors: [hex, contrastText] }),
          },
        );
        const data = await response.json();
        setScore(data);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchScore();
  }, [hex, contrastText]);

  return score;
}
