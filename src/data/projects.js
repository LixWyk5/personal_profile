import React from "react";

export const Project = {
  title: "",
  category: "",
  src: "",
  skills: {
    frontend: [],
    backend: [],
  },
  content: null,
  live: "",
  github: "",
  screenshots: [],
};

const projects = [
  {
    title: "Clinical Trial Component of e-Hospital",
    category: "Web App",
    src: require("../assets/projects/clinicaltrial_e-hospital/clinicaltrial_e-hospital.png"),
    skills: {
      frontend: ["React", "Tailwind"],
      backend: ["Node", "Mongodb", "MySql"],
    },
    content: (
      <>
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300">
          ✅Built a full-stack clinical trial module from scratch, covering
          requirements analysis, system design, and coding.
        </p>
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300">
          ✅Implemented full-cycle development for multi-role users using
          React.js and Node.js.
        </p>
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300">
          ✅Designed and maintained database schemas in MySQL and MongoDB; using
          Git for version control.
        </p>
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300">
          ✅Integrated a role-based dashboard, messaging system, and
          notification center to support end-to-end trial collaboration between
          doctors and patients.
        </p>
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300">
          ✅Below are screenshots of key interfaces from the platform (partial
          view only):
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="text-center">
            <p className="text-sm text-neutral-500 mb-2">
              📊 Dashboard Overview
            </p>
            <img
              src={require("../assets/projects/clinicaltrial_e-hospital/clinicaltrial_e-hospital.png")}
              alt="Trial Dashboard"
              className="rounded-md shadow-md w-full"
            />
          </div>
          <div className="text-center">
            <p className="text-sm text-neutral-500 mb-2">
              🧾 Management Component
            </p>
            <img
              src={require("../assets/projects/clinicaltrial_e-hospital/management.png")}
              alt="Trial Dashboard"
              className="rounded-md shadow-md w-full"
            />
          </div>
          <div className="text-center">
            <p className="text-sm text-neutral-500 mb-2">
              📋 Management Component Details
            </p>
            <img
              src={require("../assets/projects/clinicaltrial_e-hospital/management_details.png")}
              alt="Trial Details"
              className="rounded-md shadow-md w-full"
            />
          </div>
          <div className="text-center">
            <p className="text-sm text-neutral-500 mb-2">💬 Message System</p>
            <img
              src={require("../assets/projects/clinicaltrial_e-hospital/message.png")}
              alt="Doctor Messages"
              className="rounded-md shadow-md w-full"
            />
          </div>
          <div className="text-center">
            <p className="text-sm text-neutral-500 mb-2">
              🔔 Notifications Panel
            </p>
            <img
              src={require("../assets/projects/clinicaltrial_e-hospital/notifications.png")}
              alt="Notifications"
              className="rounded-md shadow-md w-full"
            />
          </div>
        </div>
      </>
    ),
    live: "http://www.e-hospital.ca/",
  },
  {
    title: "Single Image Haze Removal Using Dark Channel Prior",
    category: "Image Processing",
    src: require("../assets/projects/haze-removal/haze-removal.png"),
    skills: {
      frontend: ["Python"],
      backend: ["Python", "MATLAB", "OpenCV"],
    },
    content: (
      <>
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300">
          ✅Built from scratch using OpenCV and NumPy, and designed the system
          to support parameter tuning and optional gamma correction.
        </p>
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300">
          ✅Quantitatively evaluated performance using MSE, PSNR, and SSIM
          metrics; visually compared output quality with results from the
          original research.
        </p>
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300">
          ✅Final output shows successful haze removal with accurate color
          restoration and depth preservation. Each result is saved as a
          side-by-side comparison image.
        </p>

        <div className="flex flex-col items-center gap-6 mt-6">
          {/* House */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-neutral-500">📍 House</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="text-center">
                <p className="text-xs text-neutral-400 mb-1">🌫️ Hazy</p>
                <img
                  src={require("../assets/projects/haze-removal/hazy_image_house.jpg")}
                  alt="House - Hazy"
                  className="w-[300px] rounded-md shadow"
                />
              </div>
              <div className="text-center">
                <p className="text-xs text-neutral-400 mb-1">🧼 Dehazed</p>
                <img
                  src={require("../assets/projects/haze-removal/dehazed_image_house.jpg")}
                  alt="House - Dehazed"
                  className="w-[300px] rounded-md shadow"
                />
              </div>
            </div>
          </div>

          {/* Roofs */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-neutral-500">📍 Roofs</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="text-center">
                <p className="text-xs text-neutral-400 mb-1">🌫️ Hazy</p>
                <img
                  src={require("../assets/projects/haze-removal/hazy_image_roofs.jpg")}
                  alt="Roofs - Hazy"
                  className="w-[300px] rounded-md shadow"
                />
              </div>
              <div className="text-center">
                <p className="text-xs text-neutral-400 mb-1">🧼 Dehazed</p>
                <img
                  src={require("../assets/projects/haze-removal/dehazed_image_roofs.jpg")}
                  alt="Roofs - Dehazed"
                  className="w-[300px] rounded-md shadow"
                />
              </div>
            </div>
          </div>

          {/* New York */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-neutral-500">📍 New York</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="text-center">
                <p className="text-xs text-neutral-400 mb-1">🌫️ Hazy</p>
                <img
                  src={require("../assets/projects/haze-removal/hazy_image_ny.jpg")}
                  alt="New York - Hazy"
                  className="w-[300px] rounded-md shadow"
                />
              </div>
              <div className="text-center">
                <p className="text-xs text-neutral-400 mb-1">🧼 Dehazed</p>
                <img
                  src={require("../assets/projects/haze-removal/dehazed_image_ny.jpg")}
                  alt="New York - Dehazed"
                  className="w-[300px] rounded-md shadow"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    ),
    live: "https://github.com/LixWyk5/hazeremoval",
  },
];

export default projects;
