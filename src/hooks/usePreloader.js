import { useState, useEffect, createContext, useContext, useRef } from "react";
import gsap from "gsap";

const PreloaderContext = createContext({
  isLoading: true,
  loadingPercent: 0,
  bypassLoading: () => {},
  resumeLoaded: false,
  setResumeLoaded: () => {},
});

export function PreloaderProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [resumeLoaded, setResumeLoaded] = useState(false);
  const loadingTween = useRef();
  const loadingPercentRef = useRef({ value: 0 });
  const imagesLoadedRef = useRef(false);

  const bypassLoading = () => {
    loadingTween.current?.progress(0.99).kill();
    setLoadingPercent(100);
    setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 1200);
  };

  // 完成加载流程
  const finishLoading = () => {
    // 先显示100%
    setLoadingPercent(100);
    
    // 然后等待1200ms后完成过渡（与原始代码保持一致）
    setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 1200);
  };

  // 监视Resume加载状态
  useEffect(() => {
    if (resumeLoaded && imagesLoadedRef.current) {
      finishLoading();
    }
  }, [resumeLoaded]);

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
              Math.min(Math.round((loadedAssets / totalAssets) * 95), 95) // 最多到95%
            );
            resolve();
            return;
          }

          img.onload = () => {
            loadedAssets++;
            setLoadingPercent(
              Math.min(Math.round((loadedAssets / totalAssets) * 95), 95) // 最多到95%
            );
            resolve();
          };

          img.onerror = () => {
            loadedAssets++;
            setLoadingPercent(
              Math.min(Math.round((loadedAssets / totalAssets) * 95), 95) // 最多到95%
            );
            resolve();
          };
        });
      });

      await Promise.all(promises);
      
      // 标记图片已加载完成
      imagesLoadedRef.current = true;
      
      // 如果resume也加载完毕，完成整个加载流程
      if (resumeLoaded) {
        finishLoading();
      }
    };

    loadAssets();

    return () => {
      if (loadingTween.current) {
        loadingTween.current.kill();
      }
    };
  }, [resumeLoaded]);

  return (
    <PreloaderContext.Provider
      value={{ 
        isLoading, 
        loadingPercent, 
        bypassLoading, 
        resumeLoaded, 
        setResumeLoaded 
      }}
    >
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  return useContext(PreloaderContext);
}
