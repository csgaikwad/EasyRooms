import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../../atoms/UserAtom";
import { useLocation } from "react-router-dom";
import Bar1 from "../../components/Bar1";

export default function Searchbar() {
  const user = useRecoilValue(UserAtom);
  const [fullBar, setFullBar] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/" && location.pathname !== "/home") {
      setFullBar(false);
      return;
    }

    let observer = null;
    const setupObserver = () => {
      const sentinel = document.getElementById("nav-sentinel");
      if (!sentinel) {
        requestAnimationFrame(setupObserver);
        return;
      }
      observer?.disconnect();
      observer = new IntersectionObserver(([e]) =>
        setFullBar(e.isIntersecting)
      );
      observer.observe(sentinel);
    };

    setupObserver();
    const interval = setInterval(setupObserver, 500);

    return () => {
      observer?.disconnect();
      clearInterval(interval);
    };
  }, [location.pathname]);

  return (
    <div className="hidden md:w-125 lg:flex w-[70%] items-center justify-center gap-4">
      <Bar1 user={user} fullBar={fullBar} />
    </div>
  );
}
