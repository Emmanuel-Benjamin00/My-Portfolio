import { useCallback, useEffect, useRef } from "react";
import { useResumeAccess } from "./ResumeAccessContext";

// The secret unlock code. Type these keys in order (case-insensitive)
// while on the About page to reveal the hidden Resume tab.
// Change this to anything only you know.
const SECRET = "secretresume";

// Mobile fallback: tap the "About me" label this many times in a row
// (with no long pause between taps) to reveal the hidden Resume tab.
const TAP_COUNT = 10;

// Listens for the secret sequence being typed anywhere on the page, and
// returns a tap handler for touch devices where typing isn't practical.
// Only wire this up on the About page. Ignores typing inside inputs,
// and resets if you pause for more than a couple of seconds.
export function useResumeSecret() {
  const { unlocked, unlock, lock } = useResumeAccess();
  const buffer = useRef("");
  const timer = useRef(null);
  const taps = useRef(0);
  const tapTimer = useRef(null);

  // Unlocking is meant to be hard to stumble onto (long secret / 10 taps),
  // but hiding it again should be easy. Kept in a ref so the keydown listener
  // always sees the latest state without re-subscribing on every lock/unlock.
  const stateRef = useRef({ unlocked, unlock, lock });
  stateRef.current = { unlocked, unlock, lock };

  useEffect(() => {
    const secret = SECRET.toLowerCase();

    const onKeyDown = (e) => {
      // Already unlocked? Escape hides it instantly.
      if (e.key === "Escape" && stateRef.current.unlocked) {
        stateRef.current.lock();
        return;
      }

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
        stateRef.current.unlock();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearTimeout(timer.current);
      clearTimeout(tapTimer.current);
    };
  }, []);

  // Attach this to the "About me" label. When hidden, it takes TAP_COUNT taps
  // to reveal; once unlocked, a single tap hides it again.
  const onSecretTap = useCallback(() => {
    if (stateRef.current.unlocked) {
      stateRef.current.lock();
      return;
    }

    taps.current += 1;

    clearTimeout(tapTimer.current);
    tapTimer.current = setTimeout(() => {
      taps.current = 0;
    }, 2000);

    if (taps.current >= TAP_COUNT) {
      taps.current = 0;
      stateRef.current.unlock();
    }
  }, []);

  return { onSecretTap };
}
