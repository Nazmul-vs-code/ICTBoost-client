"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";

const supportEmail = "support@ictboost.com";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailField = event.currentTarget.elements.namedItem("email");
    if (
      !name.trim() ||
      !email.trim() ||
      !message.trim() ||
      !(emailField instanceof HTMLInputElement) ||
      !emailField.validity.valid
    ) {
      toast.error("Enter your name, a valid email, and a message.");
      return;
    }

    try {
      const subject = encodeURIComponent(`Website inquiry from ${name.trim()}`);
      const body = encodeURIComponent(
        `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
      );
      window.location.href = `mailto:${supportEmail}?subject=${subject}&body=${body}`;
      toast.success("Email draft prepared. Send it from your email app.");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      toast.error("Unable to prepare your email. Please try again.");
    }
  };

  const inputClassName =
    "w-full border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-zinc-300";

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="theme-adaptive border-t border-zinc-800 bg-zinc-950 py-20 sm:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="space-y-5">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
            Get in touch
          </p>
          <h2
            id="contact-title"
            className="text-3xl font-semibold tracking-tight text-white sm:text-5xl"
          >
            Have a question?
          </h2>
          <p className="max-w-lg leading-7 text-zinc-400">
            Send a note to our team. Submitting opens a pre-filled message in
            your email app so you can review it before sending.
          </p>
          <a
            className="inline-block text-sm text-zinc-300 underline decoration-zinc-700 underline-offset-4 hover:text-white"
            href={`mailto:${supportEmail}`}
          >
            {supportEmail}
          </a>
        </div>

        <form className="space-y-5" noValidate onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-zinc-300">
              <span>Name</span>
              <input
                autoComplete="name"
                className={inputClassName}
                maxLength={100}
                name="name"
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                required
                value={name}
              />
            </label>
            <label className="space-y-2 text-sm text-zinc-300">
              <span>Email</span>
              <input
                autoComplete="email"
                className={inputClassName}
                maxLength={254}
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                type="email"
                value={email}
              />
            </label>
          </div>
          <label className="block space-y-2 text-sm text-zinc-300">
            <span>Message</span>
            <textarea
              className={`${inputClassName} min-h-36 resize-y`}
              maxLength={5000}
              name="message"
              onChange={(event) => setMessage(event.target.value)}
              placeholder="How can we help?"
              required
              value={message}
            />
          </label>
          <button
            className="inline-flex min-h-12 items-center gap-3 bg-white px-6 py-3 font-medium text-black transition-all duration-200 hover:bg-zinc-200"
            type="submit"
          >
            Prepare email <FaArrowRight aria-hidden="true" size={14} />
          </button>
        </form>
      </div>
    </section>
  );
}
