<script>
  import Header from "./lib/Header.svelte";
  import Project from "./lib/Project.svelte";
  import Timeline from "./lib/Timeline.svelte"; // <-- New Timeline Component Import
  import { Circle } from '@lucide/svelte'; // No longer needed directly, but keeping just in case
  import profile_image from './assets/profile.png';
  // User edits: Added image import (assuming the 'assets' folder is structured correctly)
  import research_image from "./assets/research.png";
  import vision_image from "./assets/vision.png";

  // --- Single Project Data: My Research Section (RPT) ---
  const researchPaper = {
      date: "Fall 2026",
      title: "IPPO Learns the Game, Not the Team",
      subtitle: "Submitting to IROS 2026",
      blurb: "Our research focused on evaluating IPPOs ability to learn the underlying game, rather than just learning to react to its teammate policies. Created a system called Rotation Policy Training (RPT) to evaluate how much adding novel training partners increases a models generalizability. The project used the SKRL framework with custom meta policies objects that allowed for switching teammate networks mid training.",
      link: "https://arxiv.org/abs/2512.08877",
      isWIP: true,
      imageUrl: research_image,
      imageAlt: "Screenshot of the collaborative HeMAC environment where training took place",
      techStack: ['Python', 'PyTorch', 'MARL', 'SKRL', 'PettingZoo'] 
  };

  // --- Timeline Data: Engineering Journey (Combined Academic/Engineering Projects) ---
  const engineeringTimelineEvents = [
      {
          date: "October 2024 - Present",
          title: "Robotics Vision System",
          subtitle: "Lead Programmer",
          blurb: "Developed a robust vision pipeline using OpenCV and RFDetr object detection. Built for the fastpaced FRC enviorment. Used multiple threads to both capture and process images at the same time. Created a data format for sending object detection results over network tables.",
          link: "https://github.com/rylero/ObjectDetectionRobot",
          isWIP: true,
          imageUrl: vision_image,
          imageAlt: "Object Detection Output",
          techStack: ['C++', 'OpenCV', 'RFDetr'] 
      },
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