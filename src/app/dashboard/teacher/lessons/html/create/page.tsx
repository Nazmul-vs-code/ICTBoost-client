"use client";

import { createHtmlLesson } from "@/lib/actions/html";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaBook,
  FaYoutube,
  FaGlobe,
  FaAlignLeft,
  FaLayerGroup,
} from "react-icons/fa";

const CreateHtmlLessonPage = () => {
  const { data: session } = authClient.useSession();

  const [formData, setFormData] = useState({
    title: "",
    videoUrl: "",
    referenceUrl: "",
    description: "",
    difficulty: "Beginner",
    authorEmail: session?.user.email || "",
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

  console.log(formData);

  const result = await createHtmlLesson(formData);

  console.log(result);
  result ? toast.success(`${formData.title} was created successfully !`) : toast.error(`Something went wrong!`)
};

  return (
    <section className="max-w-4xl mx-auto">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Create HTML Lesson
        </h1>

        <p className="text-gray-500 mt-2">
          Add a new HTML lesson for your students.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="card bg-white shadow-xl border border-orange-100"
      >
        <div className="card-body space-y-6">

          {/* Title */}
          <div>
            <label className="label font-semibold">
              Topic Name
            </label>

            <label className="input input-bordered flex items-center gap-3">
              <FaBook className="text-orange-500" />

              <input
                type="text"
                name="title"
                placeholder="Example: HTML Headings"
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
              <FaYoutube className="text-red-500" />

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

          {/* W3Schools */}
          <div>
            <label className="label font-semibold">
              W3Schools Reference URL
            </label>

            <label className="input input-bordered flex items-center gap-3">
              <FaGlobe className="text-blue-500" />

              <input
                type="url"
                name="referenceUrl"
                placeholder="https://www.w3schools.com/html/..."
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
              <FaLayerGroup className="text-orange-500" />

              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="grow bg-transparent outline-none"
              >
                <option className="text-yellow-500 my-1 bg-black">Beginner</option>
                <option className="text-red-500 my-1 bg-black">Intermediate</option>
                <option className="text-blue-500 my-1 bg-black">Advanced</option>
              </select>
            </label>
          </div>

          {/* Description */}
          <div>
            <label className="label font-semibold">
              Short Description
            </label>

            <label className="textarea textarea-bordered flex gap-3">
              <FaAlignLeft className="mt-1 text-orange-500" />

              <textarea
                rows={5}
                name="description"
                placeholder="Write a short lesson description..."
                value={formData.description}
                onChange={handleChange}
                className="grow resize-none outline-none"
                required
              />
            </label>
          </div>

          {/* Hidden Email */}
          <input
            type="hidden"
            name="authorEmail"
            value={session?.user.email || ""}
          />

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-2">
            <button
              type="reset"
              className="btn btn-outline"
            >
              Reset
            </button>

            <button
              type="submit"
              className="btn bg-orange-500 hover:bg-orange-600 border-none text-white"
            >
              Create Lesson 🚀
            </button>
          </div>

        </div>
      </form>

    </section>
  );
};

export default CreateHtmlLessonPage;