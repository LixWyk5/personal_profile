export const WORK_CATEGORIES = {
  TELECOM: "Telecommunications",
  GAMING: "Gaming",
};

export const WORK_EXPERIENCE = {
  [WORK_CATEGORIES.TELECOM]: [
    {
      name: "china_unicom",
      company: "China Unicom",
      role: "Broadband Access Network Operation Support",
      period: "2019.08-2023.09",
      shortDescription: "Broadband Access Network Operation Support",
      description: [
        "Charged with daily maintenance of broadband access equipment",
        "Performed testing and analysis of home routers and optical fiber modems from major manufacturers",
        "Leveraged C++, Python, and Java to develop automation test scripts and functional solutions, such as internal cloud file system and OLT Automatic Network Entry tools",
        "Participated in the company’s AI programming skills competitions (2020 & 2021), achieving top rankings and won multiple awards, including the group first prize and individual title “Technical Expert”",
      ],
      color: "#E4A739",
      icon: require("../assets/work/logo.ChinaUnicom.ico"),
    },
  ],
  [WORK_CATEGORIES.GAMING]: [
    {
      name: "elex",
      company: "ELEX Technology",
      role: "Technical Artist( intern)",
      period: "2019.01-2019.02",
      shortDescription: "Technical Artist",
      description: [
        "Developed Python/Lua/C++ tools for cross-department collaboration",
        "Automated mobile testing with 90% coverage",
      ],
      color: "#FF5252",
      icon: require("../assets/work/logo.Elex.ico"),
    },
  ],
};

export const ALL_WORK_EXPERIENCES = [
  ...WORK_EXPERIENCE[WORK_CATEGORIES.TELECOM],
  ...WORK_EXPERIENCE[WORK_CATEGORIES.GAMING],
];
