import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";
import { FloatingDock } from "../ui/floating-dock";
import projects from "../../data/projects";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="min-h-screen w-full max-w-7xl mx-auto py-12 md:pt-0 md:pb-20 px-4 flex flex-col justify-center relative z-20"
    >
      <h2 className="text-2xl md:text-3xl font-medium text-center mb-12">Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.title + index} project={project} />
        ))}
      </div>
    </section>
  );
}

const ProjectCard = ({ project }) => {
  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-transparent flex justify-center hover:cursor-pointer w-full">
          <div
            className="relative w-full h-auto rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-[1.02] bg-slate-900/80"
            style={{ aspectRatio: "3/2" }}
          >
            <img
              className="absolute w-full h-full top-0 left-0 hover:scale-[1.05] transition-all object-cover"
              src={project.src}
              alt={project.title}
            />
            <div className="absolute w-full h-1/2 bottom-0 left-0 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none">
              <div className="flex flex-col h-full items-start justify-end p-6">
                <div className="text-lg text-white text-left font-medium">
                  {project.title}
                </div>
                <div className="text-xs bg-white text-black rounded-lg w-fit px-2 mt-2">
                  {project.category}
                </div>
              </div>
            </div>
          </div>
        </ModalTrigger>
        <ModalBody className="md:max-w-4xl md:max-h-[80%] w-[95%] h-[95vh] md:h-auto overflow-hidden flex flex-col">
          <div className="flex-none">
            <ModalContent>
              <ProjectHeader project={project} />
            </ModalContent>
          </div>
          <div className="flex-1 overflow-y-auto px-2 custom-scrollbar">
            <div className="py-4">{project.content}</div>
          </div>
          <div className="flex-none mt-4 sticky bottom-0 bg-white dark:bg-gray-900 pt-2 pb-1 border-t border-gray-200 dark:border-gray-700">
            <ModalFooter className="gap-2 md:gap-4 flex-wrap justify-center md:justify-end">
              <button className="px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 w-[45%] md:w-28">
                Cancel
              </button>
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="w-[45%] md:w-auto">
                <button className="px-4 py-2 rounded-md bg-blue-600 text-white w-full md:w-28">
                  Visit
                </button>
              </a>
            </ModalFooter>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

const ProjectHeader = ({ project }) => {
  return (
    <>
      <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-2 md:mb-5">
        {project.title}
      </h4>
      <div className="flex flex-col md:flex-row md:justify-evenly max-w-screen overflow-hidden md:overflow-visible">
        <div className="flex flex-row md:flex-col-reverse justify-center items-center gap-2 text-3xl mb-0 md:mb-0 mt-5 md:mt-0">
          <p className="text-sm mt-1 text-neutral-600 dark:text-neutral-500">
            Frontend
          </p>
          {project.skills.frontend?.length > 0 && (
            <FloatingDock items={project.skills.frontend} />
          )}
        </div>
        {project.skills.backend?.length > 0 && (
          <div className="flex flex-row md:flex-col-reverse justify-center items-center gap-2 text-3xl mb-0 md:mb-0 mt-5 md:mt-0">
            <p className="text-sm mt-1 text-neutral-600 dark:text-neutral-500">
              Backend
            </p>
            <FloatingDock items={project.skills.backend} />
          </div>
        )}
      </div>
    </>
  );
};

const ProjectContent = ({ project }) => {
  return (
    <>
      <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
        {project.title}
      </h4>
      <div className="flex flex-col md:flex-row md:justify-evenly max-w-screen overflow-hidden md:overflow-visible">
        <div className="flex flex-row md:flex-col-reverse justify-center items-center gap-2 text-3xl mb-12 md:mb-8 mt-4 md:mt-0">
          <p className="text-sm mt-1 text-neutral-600 dark:text-neutral-500">
            Frontend
          </p>
          {project.skills.frontend?.length > 0 && (
            <FloatingDock items={project.skills.frontend} />
          )}
        </div>
        {project.skills.backend?.length > 0 && (
          <div className="flex flex-row md:flex-col-reverse justify-center items-center gap-2 text-3xl mb-12 md:mb-8 mt-4 md:mt-0">
            <p className="text-sm mt-1 text-neutral-600 dark:text-neutral-500">
              Backend
            </p>
            <FloatingDock items={project.skills.backend} />
          </div>
        )}
      </div>
      <div className="mt-6">{project.content}</div>
    </>
  );
};

const ScrollbarStyles = () => (
  <style jsx global>{`
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: rgba(155, 155, 155, 0.5);
      border-radius: 20px;
      border: transparent;
    }
  `}</style>
);
