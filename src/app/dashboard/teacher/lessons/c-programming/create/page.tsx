"use client";

import { createCLesson } from "@/lib/actions/c";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaLaptopCode,
  FaYoutube,
  FaGlobe,
  FaAlignLeft,
  FaLayerGroup,
} from "react-icons/fa";
 
const CreateCLessonPage = () => {
  const { data: session } = authClient.useSession();

  const [formData, setFormData] = useState({
    title: "",
    videoUrl: "",
    referenceUrl: "",
    description: "",
    difficulty: "Beginner",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const lessonData = {
      ...formData,
      authorEmail: session?.user.email,
    };

    console.log("Submitting:", lessonData);

    try {
      const result = await createCLesson(lessonData);

      console.log(result);

      toast.success(
        `${formData.title} was created successfully! 🎉`
      );

      setFormData({
        title: "",
        videoUrl: "",
        referenceUrl: "",
        description: "",
        difficulty: "Beginner",
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <section className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-base-content">
          💻 Create C Programming Lesson
        </h1>

        <p className="text-base-content/50 mt-2 text-sm md:text-base">
          Add a new C programming lesson for your students. 🛠️
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="card bg-base-100 shadow-xl border border-sky-500/15"
      >
        <div className="card-body space-y-6">

          {/* Title */}
          <div>
            <label className="label font-semibold">
              Topic Name
            </label>

            <label className="input input-bordered flex items-center gap-3">
              <span className="text-blue-500">
                <FaLaptopCode />
              </span>

              <input
                type="text"
                name="title"
                placeholder="Example: C Variables and Data Types"
                value={formData.title}
                onChange={handleChange}
                className="grow"
                required
              />
            </label>
          </div>

          {/* Video */}
          <div>
            <label className="label font-semibold">
              YouTube Video URL
            </label>

            <label className="input input-bordered flex items-center gap-3">
              <span className="text-red-500">
                <FaYoutube />
              </span>

              <input
                type="url"
                name="videoUrl"
                placeholder="https://youtube.com/..."
                value={formData.videoUrl}
                onChange={handleChange}
                className="grow"
                required
              />
            </label>
          </div>

          {/* Programiz Reference */}
          <div>
            <label className="label font-semibold">
              Programiz Reference URL
            </label>

            <label className="input input-bordered flex items-center gap-3">
              <span className="text-blue-500">
                <FaGlobe />
              </span>

              <input
                type="url"
                name="referenceUrl"
                placeholder="https://www.programiz.com/c-programming/..."
                value={formData.referenceUrl}
                onChange={handleChange}
                className="grow"
                required
              />
            </label>
          </div>

          {/* Difficulty */}
          <div>
            <label className="label font-semibold">
              Difficulty
            </label>

            <label className="select select-bordered flex items-center gap-3">
              <span className="text-blue-500">
                <FaLayerGroup />
              </span>

              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="grow bg-transparent outline-none"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </label>
          </div>

          {/* Description */}
          <div>
            <label className="label font-semibold">
              Short Description
            </label>

            <label className="textarea textarea-bordered flex gap-3">
              <span className="mt-1 text-blue-500">
                <FaAlignLeft />
              </span>

              <textarea
                rows={5}
                name="description"
                placeholder="Write a short lesson description about this C programming concept..."
                value={formData.description}
                onChange={handleChange}
                className="grow resize-none outline-none"
                required
              />
            </label>
          </div>

          <div className="flex justify-end gap-4 pt-2">
            <button
              type="reset"
              className="btn btn-outline"
            >
              Reset
            </button>

            <button
              type="submit"
              className="btn bg-blue-500 hover:bg-blue-600 border-none text-white"
            >
              Create Lesson 🚀
            </button>
          </div>

        </div>
      </form>
    </section>
  );
};

export default CreateCLessonPage;
