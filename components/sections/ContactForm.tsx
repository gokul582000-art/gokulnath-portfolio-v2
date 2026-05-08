"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Mail, Globe, User } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const subjects = [
  "Freelance Project",
  "Full-Time Opportunity",
  "General Inquiry",
];

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="glass p-8 text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-heading text-2xl text-white mb-2">Message Sent!</h3>
        <p className="font-body text-text-secondary">
          Thank you for reaching out. I&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass p-8 space-y-6">
      <div className="relative">
        <input
          {...register("name", { required: true })}
          id="name"
          className={cn(
            "peer w-full bg-white/5 border border-white/10 rounded-lg px-4 pt-6 pb-2 font-body text-white placeholder-transparent focus:border-gold-light focus:outline-none transition-all",
            errors.name && "border-red-500"
          )}
          placeholder="Name"
        />
        <label 
          htmlFor="name"
          className="absolute left-4 top-2 font-mono text-[10px] text-gold-light uppercase tracking-widest transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-placeholder-shown:text-text-muted peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-gold-light pointer-events-none"
        >
          Name
        </label>
      </div>

      <div className="relative">
        <input
          {...register("email", {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
          id="email"
          className={cn(
            "peer w-full bg-white/5 border border-white/10 rounded-lg px-4 pt-6 pb-2 font-body text-white placeholder-transparent focus:border-gold-light focus:outline-none transition-all",
            errors.email && "border-red-500"
          )}
          placeholder="Email"
        />
        <label 
          htmlFor="email"
          className="absolute left-4 top-2 font-mono text-[10px] text-gold-light uppercase tracking-widest transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-placeholder-shown:text-text-muted peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-gold-light pointer-events-none"
        >
          Email
        </label>
      </div>

      <div className="space-y-2">
        <label className="font-mono text-xs text-gold-light uppercase tracking-widest">
          Subject
        </label>
        <select
          {...register("subject", { required: true })}
          className={cn(
            "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-body text-white focus:border-gold-light focus:outline-none transition-colors appearance-none cursor-pointer",
            errors.subject && "border-red-500"
          )}
        >
          <option value="" className="bg-bg-secondary">
            Select a subject
          </option>
          {subjects.map((subject) => (
            <option
              key={subject}
              value={subject}
              className="bg-bg-secondary"
            >
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div className="relative">
        <textarea
          {...register("message", { required: true, minLength: 10 })}
          id="message"
          rows={5}
          className={cn(
            "peer w-full bg-white/5 border border-white/10 rounded-lg px-4 pt-6 pb-2 font-body text-white placeholder-transparent focus:border-gold-light focus:outline-none transition-all resize-none",
            errors.message && "border-red-500"
          )}
          placeholder="Message"
        />
        <label 
          htmlFor="message"
          className="absolute left-4 top-2 font-mono text-[10px] text-gold-light uppercase tracking-widest transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-placeholder-shown:text-text-muted peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-gold-light pointer-events-none"
        >
          Message
        </label>
      </div>

      <Button type="submit" size="lg" className="w-full" loading={isLoading}>
        Send Message
      </Button>
    </form>
  );
}

const socialLinks = [
  { icon: Mail, href: "mailto:gokul582000@gmail.com", label: "Email" },
  { icon: Globe, href: "https://www.instagram.com/_gsm_photography/", label: "Instagram" },
  { icon: User, href: "https://www.linkedin.com/in/gokul-nath-49ba4b221/", label: "LinkedIn" },
];

export function SocialChips() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {socialLinks.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full glass font-ui text-sm text-text-muted hover:text-gold-light transition-colors"
        >
          <social.icon className="w-4 h-4" />
          {social.label}
        </a>
      ))}
    </div>
  );
}