import { useEffect, useRef } from "react";
import { useResumeAccess } from "./ResumeAccessContext";

// The secret unlock code. Type these keys in order (case-insensitive)
// while on the About page to reveal the hidden Resume tab.
// Change this to anything only you know.
const SECRET = "secretresume";

// Listens for the secret sequence being typed anywhere on the page.
// Only wire this up on the About page. Ignores typing inside inputs,
// and resets if you pause for more than a couple of seconds.
export function useResumeSecret() {
  const { unlock } = useResumeAccess();
  const buffer = useRef("");
  const timer = useRef(null);

  useEffect(() => {
    const secret = SECRET.toLowerCase();

    const onKeyDown = (e) => {
      const tag = (e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || e.target.isContentEditable) {
        return;
      }
      if (e.key.length !== 1) return; // ignore Shift, Arrow keys, etc.

      buffer.current = (buffer.current + e.key.toLowerCase()).slice(
        -secret.length
      );

      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        buffer.current = "";
      }, 2000);

      if (buffer.current === secret) {
        buffer.current = "";
        unlock();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearTimeout(timer.current);
    };
  }, [unlock]);
}
