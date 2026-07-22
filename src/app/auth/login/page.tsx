"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

type LoginForm = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
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

    console.log("Login Form:", formData);

    const { data, error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
      callbackURL: "/",
    });

    console.log("Response:", data);
    console.log("Error:", error);

    if (error) {
      toast.error(error.message || "Login failed!");
      return;
    }

    toast.success(`Welcome back, ${data.user.name}! 👋`);

    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-orange-500/5 px-4 py-10">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl border border-base-300/50">
        <div className="card-body">

          {/* Heading */}
          <div className="text-center space-y-2 mb-6">
            <h1 className="text-3xl font-bold text-orange-500">
              Welcome Back 👋
            </h1>

            <p className="text-sm text-base-content/60">
              Sign in to continue your learning journey with ICTBoost.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Email */}
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
                className="input input-bordered w-full focus:outline-orange-400"
                required
              />
            </div>

            {/* Password */}
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
                  className="input input-bordered w-full pr-12 focus:outline-orange-400"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500 transition-colors"
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn bg-orange-500 hover:bg-orange-600 border-none text-white w-full"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="divider text-sm text-gray-400">
            OR CONTINUE WITH
          </div>

          {/* Google Login */}
          <button className="btn btn-outline w-full border-orange-300 hover:bg-orange-100">
            <FcGoogle size={22} />
            Continue with Google
          </button>

          {/* Register */}
          <p className="text-center text-sm mt-5">
            Do not have an account?{" "}
            <Link
              href="/auth/register"
              className="font-semibold text-orange-500 hover:underline"
            >
              Register
            </Link>
          </p>

        </div>
      </div>
    </section>
  );
};

export default LoginPage;