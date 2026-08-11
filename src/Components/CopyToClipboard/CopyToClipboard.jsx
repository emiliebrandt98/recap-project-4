import { useEffect, useState } from "react";
import "./CopyToClipboard.css";

export function CopyToClipboard({ color }) {
  const [copyConfirmation, setCopyConfirmation] = useState(false);

  useEffect(() => {
    if (!copyConfirmation) return;

    const timeoutId = setTimeout(() => {
      setCopyConfirmation(false);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [copyConfirmation]);

  async function handleCopyClick() {
    try {
      await navigator.clipboard.writeText(color.hex);
      setCopyConfirmation(true);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <button type="button" onClick={handleCopyClick}>
      {copyConfirmation ? "Successfully copied!" : "Copy"}
    </button>
  );
}
