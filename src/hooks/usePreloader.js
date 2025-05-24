import { useState, useEffect, createContext, useContext, useRef } from "react";
import gsap from "gsap";

const PreloaderContext = createContext({
  isLoading: true,
  loadingPercent: 0,
  bypassLoading: () => {},
});

export function PreloaderProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const loadingTween = useRef();
  const loadingPercentRef = useRef({ value: 0 });

  const bypassLoading = () => {
    loadingTween.current?.progress(0.99).kill();
    setLoadingPercent(100);
    setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 1200);
  };

  useEffect(() => {
    const loadAssets = async () => {
      loadingPercentRef.current = { value: 0 };
      setLoadingPercent(0);

      const images = Array.from(document.querySelectorAll("img"));
      const totalAssets = images.length || 1;
      let loadedAssets = 0;

      const promises = images.map((img) => {
        return new Promise((resolve) => {
          if (img.complete) {
            loadedAssets++;
            setLoadingPercent(
              Math.min(Math.round((loadedAssets / totalAssets) * 100), 99)
            );
            resolve();
            return;
          }

          img.onload = () => {
            loadedAssets++;
            setLoadingPercent(
              Math.min(Math.round((loadedAssets / totalAssets) * 100), 99)
            );
            resolve();
          };

          img.onerror = () => {
            loadedAssets++;
            setLoadingPercent(
              Math.min(Math.round((loadedAssets / totalAssets) * 100), 99)
            );
            resolve();
          };
        });
      });

      await Promise.all(promises);

      setLoadingPercent(100);
      setTimeout(() => {
        setIsLoading(false);
        window.scrollTo(0, 0);
      }, 1200);
    };

    loadAssets();

    return () => {
      if (loadingTween.current) {
        loadingTween.current.kill();
      }
    };
  }, []);

  return (
    <PreloaderContext.Provider
      value={{ isLoading, loadingPercent, bypassLoading }}
    >
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  return useContext(PreloaderContext);
}
