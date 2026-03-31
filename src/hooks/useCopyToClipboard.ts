import { useCallback, useEffect, useRef, useState } from "react";

export function useCopyToClipboard(resetDelay = 2000) {
  const [copied, setCopied] = useState(false);
  const [isClipboardAvailable, setIsClipboardAvailable] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      setIsClipboardAvailable(true);
    }
  }, []);

  const scheduleReset = useCallback(() => {
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), resetDelay);
  }, [resetDelay]);

  const fallbackCopy = useCallback(
    (text: string): boolean => {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        scheduleReset();
        return true;
      } catch (err) {
        console.error("Fallback: Unable to copy", err);
        return false;
      } finally {
        document.body.removeChild(textArea);
      }
    },
    [scheduleReset],
  );

  const copy = useCallback(
    async (text: string) => {
      if (!isClipboardAvailable) {
        return fallbackCopy(text);
      }

      try {
        await navigator.clipboard.writeText(text);
        scheduleReset();
        return true;
      } catch {
        return fallbackCopy(text);
      }
    },
    [isClipboardAvailable, fallbackCopy, scheduleReset],
  );

  return { copied, copy } as const;
}
