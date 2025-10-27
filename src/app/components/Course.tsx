"use client";

import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { RxChevronRight, RxPlay } from "react-icons/rx";
import { useState } from "react";

type LectureProps = {
  title: string;
  description: string;
  duration: string;
  slideCount: number;
  preview?: boolean;
  thumbnail: string;
  topics: string[];
};

type ModuleProps = {
  title: string;
  description: string;
  lectures: LectureProps[];
  isLocked?: boolean;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  price: string;
  originalPrice?: string;
  priceDescription: string;
  features: string[];
  trustLine: string;
  buttons: ButtonProps[];
  modules: ModuleProps[];
  totalLectures: number;
  totalHours: string;
  certificateIncluded: boolean;
};

export type CourseProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Course = (props: CourseProps) => {
  const {
    tagline,
    heading,
    description,
    price,
    originalPrice,
    priceDescription,
    features,
    trustLine,
    buttons,
    modules,
    totalLectures,
    totalHours,
    certificateIncluded,
  } = {
    ...CourseDefaults,
    ...props,
  };

  const [expandedModule, setExpandedModule] = useState<number | null>(0);

  return (
    <section
      id="course"
      className="px-[5%] py-20 md:py-32 lg:py-40 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="mx-auto mb-16 max-w-4xl text-center md:mb-20 lg:mb-24">
          <p className="mb-4 text-sm font-medium text-slate-600 tracking-wide uppercase md:mb-6">
            {tagline}
          </p>
          <h2 className="mb-6 text-4xl font-light text-slate-800 leading-tight tracking-tight font-serif md:mb-8 md:text-5xl lg:text-6xl">
            {heading}
          </h2>
          <p className="text-lg leading-relaxed text-slate-600 font-light md:text-xl max-w-3xl mx-auto mb-10">
            {description}
          </p>

          {/* Course Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-light text-slate-800 font-serif">
                {totalLectures}
              </div>
              <div className="text-sm text-slate-600 font-light">
                Pre-recorded Lectures
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-slate-800 font-serif">
                {totalHours}
              </div>
              <div className="text-sm text-slate-600 font-light">
                Total Content
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-slate-800 font-serif">
                {certificateIncluded ? "✓" : "–"}
              </div>
              <div className="text-sm text-slate-600 font-light">
                Certificate
              </div>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="mb-8 p-8 bg-white rounded-sm border border-slate-200 shadow-xl max-w-md mx-auto">
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <div className="text-4xl font-light text-slate-800 font-serif">
                  {price}
                  {originalPrice && (
                    <span className="text-lg font-light text-slate-500 line-through ml-3">
                      {originalPrice}
                    </span>
                  )}
                </div>
                <p className="text-slate-600 font-light">{priceDescription}</p>
              </div>

              {/* Features List */}
              <div className="pt-4 border-t border-slate-100">
                <ul className="space-y-3 text-left">
                  {features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm text-slate-700"
                    >
                      <svg
                        className="w-4 h-4 text-green-600 mr-3 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4">
            <div className="flex flex-wrap justify-center gap-4">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  {...button}
                  className={`px-8 py-3 text-sm font-medium tracking-wide transition-all duration-300 transform hover:scale-105 ${
                    button.variant === "primary"
                      ? "bg-slate-800 text-white hover:bg-slate-700 border-slate-800 shadow-lg hover:shadow-xl"
                      : "bg-white text-slate-800 border-2 border-slate-300 hover:bg-slate-50 hover:border-slate-400 shadow-md hover:shadow-lg"
                  }`}
                >
                  {button.title}
                </Button>
              ))}
            </div>
            <p className="text-sm text-slate-500 font-light text-center">
              {trustLine}
            </p>
          </div>
        </div>

        {/* Course Curriculum */}
        <div>
          <h3 className="mb-12 text-3xl font-light text-slate-800 text-center font-serif md:text-4xl">
            Course Curriculum
          </h3>

          <div className="max-w-4xl mx-auto space-y-6">
            {modules.map((module, index) => (
              <ModuleCard
                key={index}
                module={module}
                index={index}
                isExpanded={expandedModule === index}
                onToggle={() =>
                  setExpandedModule(expandedModule === index ? null : index)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ModuleCard = ({
  module,
  index,
  isExpanded,
  onToggle,
}: {
  module: ModuleProps;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) => (
  <div className="bg-white border border-slate-200 rounded-sm shadow-lg">
    <button
      onClick={onToggle}
      className="w-full p-6 text-left hover:bg-slate-50 transition-colors duration-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-2">
            <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-sm">
              Module {index + 1}
            </span>
            {module.isLocked && (
              <span className="text-xs text-amber-700 bg-amber-100 px-2 py-1 rounded-sm font-medium">
                🔒 Premium
              </span>
            )}
          </div>
          <h4 className="text-xl font-medium text-slate-800 leading-tight font-serif mb-2">
            {module.title}
          </h4>
          <p className="text-slate-600 font-light">{module.description}</p>
          <div className="mt-3 flex items-center text-sm text-slate-500">
            <span>{module.lectures.length} lectures</span>
            <span className="mx-2">•</span>
            <span>
              {module.lectures.reduce((total, lecture) => {
                const duration = parseInt(lecture.duration);
                return total + duration;
              }, 0)}{" "}
              minutes total
            </span>
          </div>
        </div>
        <RxChevronRight
          className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
            isExpanded ? "rotate-90" : ""
          }`}
        />
      </div>
    </button>

    {isExpanded && (
      <div className="border-t border-slate-100">
        <div className="p-6 pt-0">
          <div className="space-y-4 mt-6">
            {module.lectures.map((lecture, lectureIndex) => (
              <LectureCard key={lectureIndex} lecture={lecture} />
            ))}
          </div>
        </div>
      </div>
    )}
  </div>
);

const LectureCard = ({ lecture }: { lecture: LectureProps }) => (
  <div className="flex items-start space-x-4 p-4 bg-slate-50 rounded-sm hover:bg-slate-100 transition-colors duration-200">
    <div className="relative flex-shrink-0">
      <img
        src={lecture.thumbnail}
        alt={lecture.title}
        className="w-24 h-16 object-cover rounded-sm shadow-sm"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-sm">
        <RxPlay className="w-6 h-6 text-white" />
      </div>
      {lecture.preview && (
        <div className="absolute -top-1 -right-1">
          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-sm font-medium">
            Free
          </span>
        </div>
      )}
    </div>
    <div className="flex-1 min-w-0">
      <h5 className="font-medium text-slate-800 leading-tight mb-2">
        {lecture.title}
      </h5>
      <p className="text-sm text-slate-600 font-light mb-3 line-clamp-2">
        {lecture.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-xs text-slate-500">
          <span>⏱️ {lecture.duration}</span>
          <span>📄 {lecture.slideCount} slides</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {lecture.topics.slice(0, 2).map((topic, index) => (
            <span
              key={index}
              className="text-xs text-slate-600 bg-slate-200 px-2 py-1 rounded-sm"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const CourseDefaults: Props = {
  tagline: "Online Course",
  heading: "Banking & Finance Masterclass",
  description:
    "Master the fundamentals of banking, money creation, and financial systems through Professor Werner's comprehensive video course. Learn the theories that shaped modern economics and discover how banking really works behind the scenes.",
  price: "$297",
  originalPrice: "$497",
  priceDescription: "One-time payment • Lifetime access",
  features: [
    "25+ HD video lectures with slides",
    "Downloadable course materials",
    "Interactive Q&A sessions",
    "Certificate of completion",
    "30-day money-back guarantee",
    "Mobile & desktop access",
  ],
  trustLine: "Join 2,000+ students from 50+ countries",
  buttons: [
    { title: "🎓 Enroll Now", variant: "primary" },
    { title: "📺 Watch Free Preview", variant: "secondary" },
  ],
  totalLectures: 25,
  totalHours: "8 hours",
  certificateIncluded: true,
  modules: [
    {
      title: "Foundations of Modern Banking",
      description:
        "Understanding the historical development and current structure of banking systems worldwide.",
      lectures: [
        {
          title: "Introduction to Banking Systems",
          description:
            "Overview of how banking evolved from simple lending to complex financial intermediation.",
          duration: "18 mins",
          slideCount: 24,
          preview: true,
          thumbnail: "/economy.jpg",
          topics: ["History", "Structure"],
        },
        {
          title: "Central Banks vs Commercial Banks",
          description:
            "The critical differences in function, purpose, and power between central and commercial banking institutions.",
          duration: "22 mins",
          slideCount: 31,
          thumbnail: "/economy.jpg",
          topics: ["Central Banking", "Commercial Banking"],
        },
        {
          title: "Regulatory Framework Evolution",
          description:
            "How banking regulations developed in response to financial crises and economic changes.",
          duration: "16 mins",
          slideCount: 19,
          thumbnail: "/economy.jpg",
          topics: ["Regulation", "Policy"],
        },
      ],
    },
    {
      title: "Money Creation Mechanics",
      description:
        "The actual process of how money is created in modern economies and its implications.",
      lectures: [
        {
          title: "Fractional Reserve Banking Explained",
          description:
            "How banks create money through lending and the reserve requirement system.",
          duration: "25 mins",
          slideCount: 35,
          preview: true,
          thumbnail: "/economy.jpg",
          topics: ["Money Creation", "Reserves"],
        },
        {
          title: "Credit Creation Process",
          description:
            "Step-by-step analysis of how commercial banks create credit and expand money supply.",
          duration: "28 mins",
          slideCount: 42,
          thumbnail: "/economy.jpg",
          topics: ["Credit", "Money Supply"],
        },
        {
          title: "Quantitative Easing Deep Dive",
          description:
            "Professor Werner's original research on QE - what it is, how it works, and its real effects.",
          duration: "32 mins",
          slideCount: 28,
          thumbnail: "/economy.jpg",
          topics: ["QE", "Monetary Policy"],
        },
      ],
    },
    {
      title: "Economic Cycles & Banking",
      description:
        "How banking decisions drive economic booms, busts, and long-term structural changes.",
      isLocked: true,
      lectures: [
        {
          title: "The Japanese Economic Miracle & Crash",
          description:
            "Case study analysis of Japan's post-war boom and the role of directed credit in economic transformation.",
          duration: "35 mins",
          slideCount: 47,
          thumbnail: "/economy.jpg",
          topics: ["Japan", "Economic Cycles"],
        },
        {
          title: "Banking Crises Throughout History",
          description:
            "Examining major financial crises and how banking decisions precipitated or resolved them.",
          duration: "29 mins",
          slideCount: 38,
          thumbnail: "/economy.jpg",
          topics: ["Crises", "History"],
        },
      ],
    },
    {
      title: "Policy Implications & Reform",
      description:
        "Practical applications of banking theory to contemporary policy challenges and potential reforms.",
      isLocked: true,
      lectures: [
        {
          title: "Banking Reform Proposals",
          description:
            "Professor Werner's recommendations for reforming banking systems to better serve society.",
          duration: "24 mins",
          slideCount: 33,
          thumbnail: "/economy.jpg",
          topics: ["Reform", "Policy"],
        },
        {
          title: "Future of Banking Technology",
          description:
            "How digital currencies, fintech, and blockchain might reshape banking and money creation.",
          duration: "21 mins",
          slideCount: 26,
          thumbnail: "/economy.jpg",
          topics: ["Technology", "Future"],
        },
      ],
    },
  ],
};
