"use client";

import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type SignUpForm = {
  name: string;
  image: string;
  email: string;
  password: string;
  role: "student" | "teacher";
};

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<SignUpForm>({
    name: "",
    image: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

    console.log("Form Data:", formData);

    const { data, error } = await (authClient.signUp.email!)({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      image: formData.image,
      // role: formData.role,
    //   callbackURL: "/",
    });

    console.log("Response:", data);
    console.log("Error:", error);

    if (error) {
      toast.error(error.message || "Registration failed.");
      return;
    }

    toast.success(
      `Welcome ${data.user.name}! Your account has been created successfully. 🎉`
    );

    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-orange-500/5 px-4 py-10">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl border border-base-300/50">
        <div className="card-body">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-orange-500">
              Create an Account 🚀
            </h1>

            <p className="text-base-content/60 mt-2">
              Join ICTBoost and start your programming journey today.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Username
                </span>
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your username"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Profile Photo URL
                </span>
              </label>

              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/profile.png"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Email Address
                </span>
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Password
                </span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input input-bordered w-full pr-12"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500"
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Select Role
                </span>
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="student">
                  🎓 Student
                </option>

                <option value="teacher">
                  👨‍🏫 Teacher
                </option>
              </select>

              <p className="mt-2 text-xs text-orange-500">
                Teacher accounts require admin approval before
                gaining access.
              </p>
            </div>

            <button
              type="submit"
              className="btn bg-orange-500 hover:bg-orange-600 text-white border-none w-full"
            >
              Create Account
            </button>
          </form>

          <div className="divider">OR</div>

          <button className="btn btn-outline border-orange-300 hover:bg-orange-100">
            <FcGoogle size={22} />
            Continue with Google
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-orange-500 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;