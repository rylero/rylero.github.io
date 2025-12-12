<script>
  import Header from "./lib/Header.svelte";
  import Project from "./lib/Project.svelte";
  import Timeline from "./lib/Timeline.svelte"; // <-- New Timeline Component Import
  import { Circle } from '@lucide/svelte'; // No longer needed directly, but keeping just in case
  import profile_image from './assets/profile.png';
  // User edits: Added image import (assuming the 'assets' folder is structured correctly)
  import research_image from "./assets/research.png";
  import vision_image from "./assets/vision.png";
  import weather_image from "./assets/weather.png";
  import robot_arm_image from "./assets/robotarm.png";
  import pikelabs_image from "./assets/pikelabs.png";
  import jobcamp_image from "./assets/jobcamp.png";
  import robotconference_image from "./assets/robot-conference-1.jpg";

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
          blurb: "Developed a robust vision pipeline using OpenCV and RFDetr object detection. Built for the fastpaced FRC enviorment. Used multiple threads to both capture and process images at the same time. Created a data format for sending object detection results over network tables. This project started with my time on team 972 and I later reworked the new system based on RFDetr for my current team, 6238.",
          link: "https://github.com/rylero/ObjectDetectionRobot",
          isWIP: true,
          imageUrl: vision_image,
          imageAlt: "Object Detection Output",
          techStack: ['C++', 'OpenCV', 'RFDetr'] 
      },
      {
          date: "October 2025",
          title: "WRRF Conference",
          subtitle: "Guest Speaker",
          blurb: "I was invited to speak at the WRRF Robotics conference. I lead a talk on Simulation and Autmoated Testing for FRC, diving into tools like JUnit and Mockito. I also covered mechanism physics simulation using WPILib. The talk ended with a discussion on when to unit test and the merits of testing.",
          isWIP: false,
          imageUrl: robotconference_image,
          techStack: ['Java', 'Mockito', 'JUnit5'] 
      },
      {
          date: "Januart 2025 - May 2025",
          title: "Politiscan",
          subtitle: "Programmer",
          blurb: "Our team won the PikeLabs App Design challenge with our app: Politiscan. Politiscan is a brower extension that scans the current new article your looking at and provides information about bias and factuality, opposing and supporting articles, and even supports a chat functionality for further information. This project taught me about websocket protocols, caching, and extension development.",
          link: "https://github.com/rylero/PikeLabsCompetition",
          isWIP: false,
          imageUrl: pikelabs_image,
          techStack: ['Javascript', 'FastAPI', 'Tavily', 'ExtPay-Js'] 
      },
      {
          date: "July 2023 - March 2025",
          title: "JobCamp",
          blurb: "Created a platform for students to be matched with companies in a job shadowing program for my school. Used by over 60 companies and 300 students annually. Originaly built with vue and firebase, it was later converted to use svelte, sveltekit and a custom backend with primsa for database management and lucia-auth for login.",
          link: "https://jobcamp.org/about",
          isWIP: false,
          imageUrl: jobcamp_image,
          techStack: ['Typescript', "SvelteKit", "PrismaDB", "Lucia-Auth", "Postgress", "Tailwind"] 
      },
      {
          date: "December 2020",
          title: "Weather Station",
          blurb: "Created a weather station mounted on my roof using a rasperry pi and sensors from adafruit. It used Influx DB and a Grafana Dashboard for visualization and has been running for almost 6 years now!",
          link: "https://github.com/rylero/WeatherStation",
          isWIP: false,
          imageUrl: weather_image,
          imageAlt: "Graphs of our collected weather data",
          techStack: ['Python', 'Influx DB', 'Grafana'] 
      },
      {
          date: "September 2020",
          title: "Robot Arm",
          blurb: "Built a Robot Arm for the Robotics Merit Badge in Boy Scouts. It used a biking glove with an arduino, gyroscope, and bluetooth module mounted on it as a controller. The robot used an arduino to control the servos, which were powered by a PC power supply I took apart.",
          link: "https://github.com/rylero/Robot-Arm",
          isWIP: false,
          imageUrl: robot_arm_image,
          imageAlt: "Graphs of our collected weather data",
          techStack: ['Arduino'] 
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