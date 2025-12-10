<script>
  import Header from "./lib/Header.svelte";
  import Project from "./lib/Project.svelte";
  import Timeline from "./lib/Timeline.svelte"; // <-- New Timeline Component Import
  import { Circle } from '@lucide/svelte'; // No longer needed directly, but keeping just in case
  import profile_image from './assets/profile.png';
  // User edits: Added image import (assuming the 'assets' folder is structured correctly)
  import research_image from "./assets/research.png";

  // --- Single Project Data: My Research Section (RPT) ---
  const researchPaper = {
      date: "Fall 2026",
      title: "Rotating Policy Training",
      subtitle: "Submitting to IROS 2026",
      blurb: "Traditional Multi-Agent Reinforcement Learning (MARL) typically focuses on homogeneous teams, leaving heterogeneous agents (teammates with differing abilities or unknown policies) relatively underexplored. This paper introduces <strong>Rotating Policy Training (RPT)</strong>, a novel paradigm that co-trains policies of different architectures. Inspired by league play, RPT rotates teammates through various policy combinations to expose the target agent to unique play styles and skill levels. Applied to the collaborative HeMAC enviorment, RPT outperforms standard MARL baselines when generalizing to novel, unseen teammate policies.",
      link: "https://github.com/rylero/RPT",
      isWIP: true,
      imageUrl: research_image,
      imageAlt: "Screenshot of the collaborative HeMAC environment where training took place",
      techStack: ['Python', 'PyTorch', 'MARL', 'RayLib', 'PettingZoo'] 
  };

  // --- Timeline Data: Engineering Journey (Combined Academic/Engineering Projects) ---
  const engineeringTimelineEvents = [
      // 1. Robotics Vision System Rework (from original academicEvents)
      {
          date: "Spring 2026",
          title: "Robotics Vision System Rework",
          subtitle: "Research Assistant Project",
          blurb: "Developed a robust vision pipeline using OpenCV and a stereo camera setup to improve object detection and 3D localization accuracy for a custom robotic arm. Transitioned the system from synchronous processing to an asynchronous, multi-threaded framework, reducing latency by 40%.",
          link: "#",
          isWIP: false,
          imageUrl: "https://placehold.co/400x200/f87171/ffffff?text=Robotics+Vision+Setup",
          imageAlt: "3D Localization Robotics Setup",
          techStack: ['C++', 'OpenCV', 'ROS2', 'YAML', 'Stereo Vision'] 
      },
      // 2. Personal Portfolio Website (from original academicEvents)
      {
          date: "Summer 2025",
          title: "Personal Portfolio Website (v2)",
          subtitle: "Side Project",
          blurb: "Designed and implemented a modern, responsive developer portfolio from scratch using SvelteKit and Tailwind CSS. The design focuses on clean aesthetics and performance, structured around a clear timeline of academic and professional work.",
          link: "#",
          isWIP: false,
          imageUrl: "https://placehold.co/400x200/22c55e/ffffff?text=Svelte+App+Screenshot",
          imageAlt: "Portfolio Website Screenshot",
          techStack: ['Svelte', 'Tailwind CSS', 'TypeScript', 'Vite'] 
      },
      // 3. Autonomous Navigation System (from original engineeringEvents)
      {
          date: "Fall 2024",
          title: "Autonomous Navigation System",
          subtitle: "Capston Project",
          blurb: "Designed and implemented a path planning and obstacle avoidance system for a scaled autonomous vehicle using sensor fusion (LiDAR and Camera) and a state machine approach. Achieved 95% navigation success rate in varied environments.",
          link: "#",
          isWIP: false,
          imageUrl: "https://placehold.co/400x200/9333ea/ffffff?text=Capston+Vehicle+Mockup",
          imageAlt: "Autonomous Vehicle Path Planning visualization",
          techStack: ['Python', 'LiDAR', 'Camera', 'Path Planning', 'MicroPython'] 
      },
      // 4. Microcontroller Firmware Development (from original engineeringEvents)
      {
          date: "Spring 2024",
          title: "Microcontroller Firmware Development",
          subtitle: "Coursework",
          blurb: "Developed low-level firmware in C for an ARM Cortex-M micro-controller to manage motor control, sensor data acquisition, and communication protocols (I2C, SPI). Focused on optimizing for real-time constraints and power consumption.",
          link: "#",
          isWIP: false,
          imageUrl: "https://placehold.co/400x200/f59e0b/ffffff?text=Embedded+Code+Snippet",
          imageAlt: "Embedded C code structure",
          techStack: ['C', 'Embedded Systems', 'ARM Cortex-M', 'I2C', 'SPI'] 
      }
  ];
  
  // --- Header Data ---
  const socialLinks = [
      {
          name: "github",
          url: "https://github.com/rylero",
          className: "transition duration-300 transform hover:scale-110 hover:-translate-y-1"
      },
      {
          name: "linkedin",
          url: "https://www.linkedin.com/in/ryan-leroy/",
          className: "transition duration-300 transform hover:scale-110 hover:-translate-y-1"
      },
      {
          name: "email",
          url: "mailto:leroy.ryan09@gmail.com",
          className: "transition duration-300 transform hover:scale-110 hover:-translate-y-1"
      }
  ];
</script>

<Header 
  name="Ryan LeRoy"
  picture={profile_image}
  message="Robotics Enthusiast"
  socials={socialLinks}
/>

<!-- Main Content for Projects/Research -->
<main class="max-w-4xl mx-auto px-4 pb-20 pt-6">

  <!-- Separator for visual break after the Header section -->
  <!-- <div class="h-px w-full max-w-lg mx-auto bg-gray-200 my-10"></div> -->

  <!-- 1. My Research Section (Single Project, Non-Timeline) -->
  <section id="my-research" class="py-6">
      <h2 class="text-3xl font-extrabold mb-8 border-b-2 border-cyan-400 pb-2 inline-block">
          // My Research
      </h2>

      <Project 
          title={researchPaper.title}
          subtitle={researchPaper.subtitle}
          blurb={researchPaper.blurb}
          link={researchPaper.link}
          isWIP={researchPaper.isWIP}
          imageUrl={researchPaper.imageUrl}
          imageAlt={researchPaper.imageAlt}
          techStack={researchPaper.techStack}
      />
  </section>

  <!-- Separator between sections -->
  <div class="h-px w-full max-w-lg mx-auto bg-gray-200 my-10"></div>

  <!-- 2. Engineering Journey Timeline Section -->
  <section id="engineering-timeline" class="py-6">
      <h2 class="text-3xl font-extrabold border-b-2 border-cyan-400 pb-2 inline-block">
          // My Engineering Journey
      </h2>

      <!-- Timeline Container using the new component -->
  </section>
</main>

<div class="mx-10 xl:mx-40 -mt-8">
  <Timeline events={engineeringTimelineEvents} />
</div>