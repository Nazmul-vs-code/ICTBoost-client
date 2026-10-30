import ImportanceTicker from "./ImportanceTicker";
import {
  FaAndroid,
  FaCogs,
  FaDatabase,
  FaGamepad,
  FaGraduationCap,
  FaLinux,
  FaMemory,
  FaMicrochip,
  FaProjectDiagram,
  FaServer,
} from "react-icons/fa";

const importance = [
  {
    icon: FaMicrochip,
    title: "Foundation of system programming",
    description: "C powers operating systems, embedded systems, and low-level software.",
  },
  {
    icon: FaCogs,
    title: "Understand how computers work",
    description: "Explore memory and hardware to see how programs operate underneath.",
  },
  {
    icon: FaDatabase,
    title: "Powers databases and compilers",
    description: "C is used to build essential tools, databases, and language runtimes.",
  },
  {
    icon: FaServer,
    title: "Backbone of modern languages",
    description: "Understanding C reveals how many popular languages are implemented.",
  },
  {
    icon: FaMemory,
    title: "Manual memory management",
    description: "Learn how allocation and pointers affect program behavior.",
  },
  {
    icon: FaGamepad,
    title: "Games and graphics",
    description: "C remains useful for performance-sensitive graphics and game systems.",
  },
  {
    icon: FaAndroid,
    title: "Embedded systems and IoT",
    description: "C runs on compact devices, controllers, and connected hardware.",
  },
  {
    icon: FaLinux,
    title: "Linux and open source",
    description: "Work with the language behind the Linux kernel and many core tools.",
  },
  {
    icon: FaProjectDiagram,
    title: "Data structures and algorithms",
    description: "Implement core structures while building a deeper CS foundation.",
  },
  {
    icon: FaGraduationCap,
    title: "A foundation for computer science",
    description: "Build practical fundamentals used throughout computer science.",
  },
];

export default function ImportanceOfC() {
  return (
    <ImportanceTicker
      actionLabel="Start learning C"
      description="C gives you a closer look at how software interacts with memory, hardware, and the systems beneath modern computing."
      href="/c"
      id="importance-c"
      items={importance}
      sectionNumber="02"
      topic="C Programming"
    />
  );
}
