"use client";

import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { useState } from "react";

type Props = {
  tagline: string;
  heading: string;
  description: string;
  inputPlaceholder: string;
  button: ButtonProps;
  termsText: string;
  socialProof?: string;
};

export type NewsletterProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Newsletter = (props: NewsletterProps) => {
  const {
    tagline,
    heading,
    description,
    inputPlaceholder,
    button,
    termsText,
    socialProof,
  } = {
    ...NewsletterDefaults,
    ...props,
  };

  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Handle newsletter signup here
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <section
      id="newsletter"
      className="px-[5%] py-20 md:py-32 lg:py-40 bg-slate-800"
    >
      <div className="container max-w-4xl mx-auto text-center">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-6">
            <p className="text-sm font-medium text-slate-400 tracking-wide uppercase">
              {tagline}
            </p>
            <h2 className="text-4xl font-light text-white leading-tight tracking-tight font-serif md:text-5xl lg:text-6xl">
              {heading}
            </h2>
            <p className="text-lg leading-relaxed text-slate-300 font-light max-w-2xl mx-auto md:text-xl">
              {description}
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="max-w-lg mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={inputPlaceholder}
                  className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 text-white placeholder-slate-400"
                  required
                />
                <Button
                  {...button}
                  type="submit"
                  disabled={isSubmitted}
                  className={`px-8 py-3 text-sm font-medium tracking-wide transition-all duration-300 transform hover:scale-105 ${
                    isSubmitted
                      ? "bg-green-600 text-white"
                      : "bg-white text-slate-800 hover:bg-slate-100 border-white shadow-lg hover:shadow-xl"
                  }`}
                >
                  {isSubmitted ? "✓ Subscribed!" : button.title}
                </Button>
              </div>

              {/* Terms */}
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                {termsText}
              </p>
            </form>
          </div>

          {/* Social Proof */}
          {socialProof && (
            <div className="pt-6">
              <p className="text-sm text-slate-300 font-light">{socialProof}</p>
            </div>
          )}

          {/* Visual Enhancement */}
          <div className="flex justify-center items-center gap-8 pt-8 opacity-60">
            <div className="w-16 h-px bg-slate-600"></div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-slate-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <span className="text-sm text-slate-500 font-light">
                Monthly insights
              </span>
            </div>
            <div className="w-16 h-px bg-slate-600"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const NewsletterDefaults: Props = {
  tagline: "Stay Connected",
  heading: "Get Economic Insights Delivered",
  description:
    "Join thousands of readers who receive Professor Werner's latest research, commentary, and analysis on money creation, banking, and economic policy directly in their inbox.",
  inputPlaceholder: "Enter your email address",
  button: {
    title: "Subscribe Now",
    variant: "primary",
  },
  termsText:
    "By subscribing, you agree to receive periodic emails about economics research and commentary. Unsubscribe anytime. We respect your privacy.",
  socialProof:
    "Join 15,000+ subscribers including researchers, policymakers, and students worldwide",
};
