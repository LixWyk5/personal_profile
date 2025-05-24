import { cn } from "../../utils/utils";
import React from "react";
import { Button } from "../ui/button";
import { File } from "lucide-react";
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
  const { isLoading } = usePreloader();

  return (
    <section id="hero" className={cn("relative w-full h-screen")}>
      <WorkExperience />
      <SkillOrbit />

      <div className="grid md:grid-cols-1">
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
                <BlurIn delay={0.7}>
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
                <BlurIn delay={1}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <h1
                          className={cn(
                            "font-thin text-6xl text-slate-800 ml-1 text-left",
                            "cursor-pointer text-edge-outline font-display sm:text-7xl md:text-9xl "
                          )}
                        >
                          {config.author.split(" ")[0]}
                          <br className="md:block hiidden" />
                          {config.author.split(" ")[1]}
                        </h1>
                      </TooltipTrigger>
                      <TooltipContent
                        side="left"
                        align="start"
                        className="bg-background/80 backdrop-blur-md rounded border border-foreground/15 max-w-[215px] p-3"
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
                <BlurIn delay={1.2}>
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
              <div className="mt-8 md:ml-2 flex flex-col gap-3">
                <a
                  href={config.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1"
                >
                  <BoxReveal delay={2} width="100%">
                    <Button className="flex items-center gap-2 w-full">
                      <File size={24} />
                      <p>Resume</p>
                    </Button>
                  </BoxReveal>
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
            </>
          )}
        </div>
      </div>
      <div className="absolute bottom-10 left-[50%] translate-x-[-50%]">
        <ScrollDownIcon />
      </div>
    </section>
  );
};

export default HeroSection;
