import React from "react";
import { SiGithub, SiLinkedin, SiInstagram } from "react-icons/si";
import { config } from "../data/config";
const Footer = () => {
  return (
    <footer className="bg-transparent dark:bg-transparent py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0" />

          <div className="flex items-center gap-6">
            <a
              href={config.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <SiGithub size={25} />
            </a>
            <a
              href={config.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <SiLinkedin size={25} />
            </a>
            <a
              href={config.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <SiInstagram size={25} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
