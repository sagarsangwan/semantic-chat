import React, { useEffect, useState } from "react";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsmobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsmobile(window.innerWidth < breakpoint);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.addEventListener("resize", checkMobile);
  }, [breakpoint]);
  return isMobile;
}

export default useIsMobile;
