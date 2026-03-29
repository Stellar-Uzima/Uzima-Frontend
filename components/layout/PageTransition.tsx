"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const currentPath = useRef(pathname);

  useEffect(() => {
    // If the route changes
    if (pathname !== currentPath.current) {
      setIsTransitioning(true);
      
      const timeout = setTimeout(() => {
        setDisplayChildren(children);
        setIsTransitioning(false);
        currentPath.current = pathname;
      }, 150);

      return () => clearTimeout(timeout);
    } else {
      // Keep children up to date if they change on the same route
      if (!isTransitioning) {
        setDisplayChildren(children);
      }
    }
  }, [pathname, children, isTransitioning]);

  return (
    <div
      className={`transition-opacity motion-reduce:transition-none motion-reduce:opacity-100 ${
        isTransitioning 
          ? "opacity-0 duration-150 ease-in" 
          : "opacity-100 duration-200 ease-out"
      }`}
    >
      {displayChildren}
    </div>
  );
}
