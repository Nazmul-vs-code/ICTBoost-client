"use client";

import { FaSearch, FaLayerGroup } from "react-icons/fa";

type FilterProps = {
  search: string;
  onSearchChange: (value: string) => void;
  difficulty: string;
  onDifficultyChange: (value: string) => void;
};

const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

const HtmlLessonFilter = ({
  search,
  onSearchChange,
  difficulty,
  onDifficultyChange,
}: FilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Search Bar */}
      <div className="relative flex-1">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <FaSearch />
        </span>
        <input
          type="text"
          placeholder="Search lessons by title..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input input-bordered w-full pl-11 focus:outline-orange-400"
        />
      </div>

      {/* Difficulty Filter */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500">
          <FaLayerGroup />
        </span>
        <select
          value={difficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
          className="select select-bordered pl-11 w-full sm:w-auto focus:outline-orange-400"
        >
          {difficulties.map((level) => (
            <option key={level} value={level}>
              {level === "All" ? "All Difficulties" : level}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default HtmlLessonFilter;
