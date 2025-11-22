"use client";

import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";

type HeroProps = {
  badge?: string;
  heading?: string;
  highlight?: string;
  description?: string;
  note?: string;
  trustLine?: string;
  buttons?: ButtonProps[];
  videoThumbnail?: string;
  videoLabel?: string;
};

export type CourseHeroProps = React.ComponentPropsWithoutRef<"section"> &
  HeroProps;

export const Hero = ({
  badge,
  heading,
  highlight,
  description,
  note,
  trustLine,
  buttons,
  videoThumbnail,
  videoLabel,
  className,
  ...props
}: CourseHeroProps) => {
  const resolvedBadge = badge ?? HeroDefaults.badge;
  const resolvedHeading = heading ?? HeroDefaults.heading;
  const resolvedHighlight = highlight ?? HeroDefaults.highlight;
  const resolvedDescription = description ?? HeroDefaults.description;
  const resolvedNote = note ?? HeroDefaults.note;
  const resolvedTrustLine = trustLine ?? HeroDefaults.trustLine;
  const resolvedButtons = buttons ?? HeroDefaults.buttons;
  const resolvedVideoThumbnail = videoThumbnail ?? HeroDefaults.videoThumbnail;
  const resolvedVideoLabel = videoLabel ?? HeroDefaults.videoLabel;

  return (
    <section
      id="course-hero"
      className={`px-[5%] py-20 md:py-28 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden ${
        className ?? ""
      }`}
      {...props}
    >
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
      <div className="container max-w-7xl relative z-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div className="space-y-5">
              <span className="inline-flex items-center rounded-full border border-slate-300 bg-white/70 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-600 shadow-sm">
                {resolvedBadge}
              </span>
              <h1 className="text-5xl font-light text-slate-900 leading-[1.05] tracking-tight font-serif md:text-6xl lg:text-7xl">
                {resolvedHeading}
                <span className="block text-slate-700 font-sans text-base font-semibold tracking-[0.32em] uppercase mt-4">
                  {resolvedHighlight}
                </span>
              </h1>
              <p className="max-w-2xl text-lg md:text-xl text-slate-600 font-light leading-relaxed">
                {resolvedDescription}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                {resolvedButtons.map((button, index) => (
                  <Button
                    key={index}
                    {...button}
                    className={`px-8 py-3 text-sm font-medium tracking-wide transition-transform duration-300 hover:scale-[1.02] ${
                      button.variant === "primary"
                        ? "bg-slate-900 text-white hover:bg-slate-800 border-slate-900 shadow-lg hover:shadow-xl"
                        : "bg-white text-slate-900 border-2 border-slate-300 hover:bg-slate-50 hover:border-slate-400 shadow-md hover:shadow-lg"
                    }`}
                  >
                    {button.title}
                  </Button>
                ))}
              </div>
              <p className="text-sm text-slate-500 italic">{resolvedNote}</p>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto aspect-[16/10] w-full overflow-hidden rounded-sm border border-slate-200 bg-white shadow-2xl shadow-slate-200/50 lg:max-w-[520px]">
              <img
                src={resolvedVideoThumbnail}
                alt={resolvedVideoLabel}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/10 via-slate-900/0 to-slate-900/15" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-xl shadow-slate-400/40">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-slate-900"
                  >
                    <path
                      d="M9.5 7.5L15.5 12L9.5 16.5V7.5Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 w-[90%] -translate-x-1/2 rounded-sm bg-white/90 px-4 py-3 text-center text-sm text-slate-700 backdrop-blur">
                {resolvedVideoLabel}
              </div>
            </div>
            <div className="absolute -left-6 -top-6 hidden lg:block">
              <div className="rounded-full bg-slate-900 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-white shadow-lg">
                {resolvedBadge}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const HeroDefaults: Required<HeroProps> = {
  badge: "New & Updated 2025 Edition",
  heading:
    "The definitive Richard Werner course to go from a curious learner to a confident banking expert.",
  highlight: "Richard A. Werner Academy",
  description:
    "Transform your understanding of banking, credit creation, and monetary policy through Professor Werner's signature curriculum. Blend academic rigor with real-world case studies drawn from decades of advising governments, banks, and investors.",
  note: "Includes lifetime access to future updates & downloadable lecture slides.",
  trustLine: "Trusted by 2,000+ professionals worldwide",
  buttons: [
    { title: "Enroll Now", variant: "primary" },
    { title: "Watch Intro Lesson", variant: "secondary" },
  ],
  videoThumbnail: "/economy.jpg",
  videoLabel: "Course walkthrough: Inside the Werner Method",
};

export default Hero;
