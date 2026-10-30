import ImportanceTicker from "./ImportanceTicker";
import {
  FaBriefcase,
  FaGlobe,
  FaLaptopCode,
  FaLayerGroup,
  FaLightbulb,
  FaMobileAlt,
  FaPaintBrush,
  FaRocket,
  FaSearch,
  FaUsers,
} from "react-icons/fa";

const importance = [
  {
    icon: FaGlobe,
    title: "Foundation of every website",
    description: "Every web page starts with meaningful HTML structure.",
  },
  {
    icon: FaLaptopCode,
    title: "Gateway to web development",
    description: "Build a foundation for CSS, JavaScript, and modern frameworks.",
  },
  {
    icon: FaMobileAlt,
    title: "Responsive by design",
    description: "Semantic structure helps content work across screen sizes.",
  },
  {
    icon: FaSearch,
    title: "Clearer search indexing",
    description: "Well-structured pages are easier for search engines to understand.",
  },
  {
    icon: FaRocket,
    title: "Lean and accessible",
    description: "HTML works across browsers and supports accessible experiences.",
  },
  {
    icon: FaPaintBrush,
    title: "A flexible canvas",
    description: "Create the structure for blogs, portfolios, and applications.",
  },
  {
    icon: FaLayerGroup,
    title: "Organized content",
    description: "Use headings, lists, and landmarks to give content its shape.",
  },
  {
    icon: FaUsers,
    title: "Useful across disciplines",
    description: "Developers, designers, and creators all work with the web.",
  },
  {
    icon: FaBriefcase,
    title: "A practical career skill",
    description: "HTML knowledge supports a wide range of digital roles.",
  },
  {
    icon: FaLightbulb,
    title: "A base for advanced tools",
    description: "Understand the platform before building with frameworks.",
  },
];

export default function ImportanceOfHtml() {
  return (
    <ImportanceTicker
      actionLabel="Start learning HTML"
      description="HTML is the structure behind the web. Start with the fundamentals and build knowledge that carries into every frontend project."
      href="/html"
      id="importance-html"
      items={importance}
      sectionNumber="01"
      topic="HTML"
    />
  );
}
