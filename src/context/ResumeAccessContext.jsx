import { createContext, useCallback, useContext, useState } from "react";
import PropTypes from "prop-types";

// Gates the hidden Resume Builder. The tab is invisible until the owner
// types the secret sequence on the About page (see useResumeSecret).
const STORAGE_KEY = "resume_access_unlocked";

const ResumeAccessContext = createContext(null);

export function ResumeAccessProvider({ children }) {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(STORAGE_KEY) === "true"
  );

  const unlock = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, "true");
    setUnlocked(true);
  }, []);

  const lock = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setUnlocked(false);
  }, []);

  return (
    <ResumeAccessContext.Provider value={{ unlocked, unlock, lock }}>
      {children}
    </ResumeAccessContext.Provider>
  );
}

ResumeAccessProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export function useResumeAccess() {
  const ctx = useContext(ResumeAccessContext);
  if (!ctx) {
    throw new Error("useResumeAccess must be used within ResumeAccessProvider");
  }
  return ctx;
}
