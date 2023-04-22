import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    python,
    csharp,
    booklist,
    sql,
    graph,
    figma,
    docker,
    meta,
    starbucks,
    coderschool,
    tesla,
    shopify,
    carrent,
    jobit,
    tripguide,
    threejs,
    network,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Full Stack Web Developer",
      icon: web,
    },
    {
      title: "Unity Developer",
      icon: mobile,
    },
    {
      title: "Python Developer",
      icon: backend,
    },
    {
      title: "Programming Teacher",
      icon: creator,
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    // {
    //   name: "TypeScript",
    //   icon: typescript,
    // },
    {
      name: "React JS",
      icon: reactjs,
    },
    // {
    //   name: "Redux Toolkit",
    //   icon: redux,
    // },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "SQL",
      icon: sql,
    },
    {
      name: "GraphQL",
      icon: graph,
    },
    // {
    //   name: "Three JS",
    //   icon: threejs,
    // },
    {
      name: "git",
      icon: git,
    },
    {
      name: "Python",
      icon: python,
    },
    {
      name: "C#",
      icon: csharp,
    },
    // {
    //   name: "figma",
    //   icon: figma,
    // },
    // {
    //   name: "docker",
    //   icon: docker,
    // },
  ];
  
  const experiences = [
    {
      title: "Code Instructor",
      company_name: "The Coder School",
      icon: coderschool,
      iconBg: "#000000",
      date: "Febuary 2023 - Present",
      points: [
        "Working with kids and teaching them basic coding.",
        "Various game making tools like scratch, pixel pad, and unity.",
        "Basic Robotics Projects and Tinkercad modeling.",
      ],
    },
   
  ];
  
  const projects = [
    {
      name: "Booklist",
      description:
        "A reading website for finding new books to read based on answers to questions. Kind of like akinator, but for finding books! (https://ryansbookfinder.com/)",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "javascript",
          color: "orange-text-gradient",
        },
      ],
      image: booklist,
      source_code_link: "https://github.com/rylero/booklist",
    },
    {
      name: "Network Utils",
      description:
        "A python library for creating encrypted connections and communicating between clients. Uses sockets, pickle data dumps, and rsa cryptography.",
      tags: [
        {
          name: "python",
          color: "blue-text-gradient",
        },
        {
          name: "networking",
          color: "violet-text-gradient",
        },
      ],
      image: network,
      source_code_link: "https://github.com/rylero/NetworkUtils",
    },
  ];
  
  export { services, technologies, experiences, projects };