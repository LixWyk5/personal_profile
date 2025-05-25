import { cn } from "../../utils/utils";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { File, X } from "lucide-react";
import { usePreloader } from "../../hooks/usePreloader";
import { BlurIn, BoxReveal } from "../RevealAnimations";
import ScrollDownIcon from "../ScrollDownIcon";
import { SiGithub, SiLinkedin, SiInstagram } from "react-icons/si";
import { config } from "../../data/config";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "../ui/tooltip";
import SkillOrbit from "../SkillOrbit";
import WorkExperience from "../WorkExperience";

const HeroSection = () => {
  const preloader = usePreloader();
  const { isLoading } = preloader;
  const setResumeLoaded = preloader.setResumeLoaded || (() => {});
  const [showMobileDescription, setShowMobileDescription] = useState(false);

  const toggleMobileDescription = () => {
    const newState = !showMobileDescription;
    setShowMobileDescription(newState);
    
    // 发布自定义事件通知其他组件描述状态变化
    const event = new CustomEvent('custom_event', { 
      detail: { 
        type: 'description_toggle',
        expanded: newState
      } 
    });
    window.dispatchEvent(event);
  };
  
  // 加载Resume数据并在加载完成后通知预加载器
  useEffect(() => {
    const loadResumeData = async () => {
      if (config.resume) {
        try {
          // 模拟Resume加载延迟，真实场景可能是获取Resume数据的API调用
          await new Promise(resolve => setTimeout(resolve, 300));
          if (typeof setResumeLoaded === 'function') {
            setResumeLoaded(true);
          }
        } catch (error) {
          console.error("Failed to load resume:", error);
          // 如果加载失败，仍然设置为已加载以避免卡住加载进度
          if (typeof setResumeLoaded === 'function') {
            setResumeLoaded(true);
          }
        }
      } else {
        // 如果没有Resume配置，直接标记为已加载
        if (typeof setResumeLoaded === 'function') {
          setResumeLoaded(true);
        }
      }
    };
    
    loadResumeData();
  }, [setResumeLoaded]);

  return (
    <section id="hero" className={cn("relative w-full h-screen")}>
      {/* PC端的WorkExperience和SkillOrbit (绝对定位) */}
      <div className="hidden md:block">
        <WorkExperience />
        <SkillOrbit />
      </div>

      <div id="about" className="grid md:grid-cols-1">
        <div
          className={cn(
            "h-[calc(100dvh-3rem)] md:h-[calc(100dvh-4rem)] z-[2]",
            "flex flex-col justify-start md:justify-center items-center md:items-start",
            "pt-28 sm:pt-0 sm:pb-32 md:p-24 lg:p-40 xl:p-48"
          )}
        >
          {!isLoading && (
            <>
              <div className="relative">
                <BlurIn delay={0.5}>
                  <p
                    className={cn(
                      "md:self-start mt-4 font-thin text-md text-slate-500 dark:text-zinc-400 ml-3",
                      "cursor-default font-display sm:text-xl md:text-xl whitespace-nowrap bg-clip-text "
                    )}
                  >
                    Hi, I am
                    <br className="md:hidden" />
                  </p>
                </BlurIn>
                <BlurIn delay={0.7}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <h1
                          className={cn(
                            "font-thin text-6xl text-slate-800 ml-1 text-left",
                            "cursor-pointer text-edge-outline font-display sm:text-7xl md:text-9xl "
                          )}
                          onClick={toggleMobileDescription}
                        >
                          {config.author.split(" ")[0]}
                          <br className="md:block hiidden" />
                          {config.author.split(" ")[1]}
                        </h1>
                      </TooltipTrigger>
                      <TooltipContent
                        side="left"
                        align="start"
                        className="bg-background/80 backdrop-blur-md rounded border border-foreground/15 max-w-[215px] p-3 hidden md:block"
                        sideOffset={15}
                        alignOffset={-15}
                      >
                        <p className="text-sm text-foreground">
                          {config.description.long}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </BlurIn>
                <BlurIn delay={0.9}>
                  <p
                    className={cn(
                      "md:self-start md:mt-4 font-thin text-md text-slate-500 dark:text-zinc-400 ml-3",
                      "cursor-default font-display sm:text-xl md:text-xl whitespace-nowrap bg-clip-text "
                    )}
                  >
                    {config.description.short}
                  </p>
                </BlurIn>
              </div>
              
              {/* Mobile description */}
              {showMobileDescription && (
                <div className="md:hidden mt-4 relative w-full max-w-[90%] mx-auto">
                  <div className="bg-background/80 backdrop-blur-md rounded border border-foreground/15 p-3 text-sm text-foreground relative">
                    <button 
                      className="absolute top-2 right-2 p-1"
                      onClick={toggleMobileDescription}
                    >
                      <X size={16} />
                    </button>
                    <p>{config.description.long}</p>
                  </div>
                </div>
              )}
              
              <div className="mt-8 md:ml-2 flex flex-col gap-3">
                <a
                  href={config.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1"
                >
                  <BlurIn delay={1.1}>
                    <Button className="flex items-center gap-2 w-full">
                      <File size={24} />
                      <p>Resume</p>
                    </Button>
                  </BlurIn>
                </a>
                <div className="md:self-start flex gap-3">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a href={"#contact"}>
                          <Button
                            variant={"outline"}
                            className="block w-full overflow-hidden"
                          >
                            Hire Me
                          </Button>
                        </a>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>pls 🥹 🙏</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <a
                    href={config.social.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button variant={"outline"}>
                      <SiGithub size={25} />
                    </Button>
                  </a>
                  <a
                    href={config.social.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button variant={"outline"}>
                      <SiLinkedin size={25} />
                    </Button>
                  </a>
                  <a
                    href={config.social.instagram}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button variant={"outline"}>
                      <SiInstagram size={25} />
                    </Button>
                  </a>
                </div>
              </div>
              
              {/* 移动端的WorkExperience和SkillOrbit (流布局) */}
              <div className="md:hidden mt-5 w-full">
                <div className="relative">
                  <h3 className="text-lg font-medium text-foreground mb-2 pl-4">
                    Work Experience
                  </h3>
                  <WorkExperience inMobileHero={true} />
                </div>
                
                <div className="relative mt-1">
                  <h3 className="text-lg font-medium text-foreground mb-2 pl-4">
                    Tech Stack
                  </h3>
                  <SkillOrbit inMobileHero={true} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="absolute bottom-10 left-[50%] translate-x-[-50%] hidden md:block">
        <ScrollDownIcon />
      </div>
    </section>
  );
};

export default HeroSection;
