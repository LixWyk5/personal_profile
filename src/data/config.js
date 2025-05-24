const basePath = process.env.PUBLIC_URL || "";

const config = {
  title: "Keyou Liu | Portfolio",
  description: {
    long: (
      <>
        🎓 Master of Engineering in{" "}
        <span className="font-semibold text-primary">ECE</span> (UOttawa, GPA:{" "}
        <span className="text-amber-500">9.22/10</span>) <br />
        🎓 B.Eng. in{" "}
        <span className="font-semibold text-primary">
          Information Security
        </span>{" "}
        (BUPT, GPA: <span className="text-amber-500">82/100</span>) <br />
        💼{" "}
        <span className="font-semibold text-primary">
          4+ years @ China Unicom
        </span>
        : back-end, full-stack dev, broadband access network operations and
        telecom infrastructure maintenance <br />
        🛠️{" "}
        <span className="text-yellow-400 font-semibold">
          Python, C++, JavaScript
        </span>
        ,{" "}
        <span className="text-sky-400 font-semibold">
          Node.js, React.js, MySQL
        </span>{" "}
        <br />
        🧠{" "}
        <span className="text-green-400 font-semibold">
          Strong in system design, data structures, Git
        </span>
      </>
    ),
  },
  keywords: [
    "Keyou Liu",
    "portfolio",
    "full-stack developer",
    "creative technologist",
    "Python",
    "C++",
    "JavaScript",
    "React.js",
    "Node.js",
    "MongoDB",
    "MySQL",
    "BRAS",
    "OLT",
    "Routers",
  ],
  author: "Keyou Liu",
  email: "lixwyk@outlook.com",
  site: "https://www.linkedin.com/in/keyou-liu-975520297/",
  resume: `${basePath}/assets/data/Resume.pdf`,
  get ogImg() {
    return `${process.env.PUBLIC_URL}/assets/images/og-image.png`;
  },
  social: {
    linkedin: "https://www.linkedin.com/in/keyou-liu-975520297/",
    instagram: "https://www.instagram.com/lixwyk_",
    github: "https://github.com/LixWyk5",
  },
};
export { config };
