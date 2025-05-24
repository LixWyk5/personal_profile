import React, { useEffect } from "react";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import ElasticCursor from "./components/ui/ElasticCursor";
import CharacterParticles from "./components/CharacterParticles";
import Preloader from "./components/preloader/Preloader";
import HeroSection from "./components/sections/HeroSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import { TooltipProvider } from "./components/ui/tooltip";
import MetaUpdater from "./components/MetaUpdater";

window.scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    setTimeout(() => {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: offsetTop - 80,
        behavior: "smooth",
      });
    }, 50);
  }
};

function App() {
  useEffect(() => {
    const scrollToAbout = () => {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "auto",
        });
      }, 100);
    };

    scrollToAbout();
    
    // 确保页面加载完成后删除预加载的spline模型
    const cleanup = () => {
      // 从DOM中删除可能存在的spline iframe
      const splineElements = document.querySelectorAll('iframe[src*="spline"]');
      splineElements.forEach(el => {
        el.parentNode?.removeChild(el);
      });
    };
    
    // 页面加载后执行清理
    window.addEventListener('load', cleanup);
    
    return () => {
      window.removeEventListener('load', cleanup);
    };
  }, []);
  
  return (
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Preloader>
          <MetaUpdater />
          <CharacterParticles className="fixed inset-0 -z-10" quantity={100} />
          <div id="top" className="relative overflow-hidden">
            <Header />
            <main className="relative z-10 bg-transparent">
              <HeroSection />
              <ProjectsSection />
            </main>
            <Footer />
          </div>
          <ElasticCursor />
        </Preloader>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
