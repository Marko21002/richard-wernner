"use client";

import { useState } from "react";
import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";

type ImageProps = {
  src: string;
  alt?: string;
};

type Tag = {
  label: string;
  url: string;
};

type ProjectProps = {
  title: string;
  description: string;
  image: ImageProps;
  url: string;
  button: ButtonProps;
  tags: Tag[];
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  projects: ProjectProps[];
  button: ButtonProps;
};

export type Portfolio16Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Portfolio16 = (props: Portfolio16Props) => {
  const { tagline, heading, description, projects, button } = {
    ...Portfolio16Defaults,
    ...props,
  };

  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, 2);

  return (
    <section
      id="relume"
      className="px-[5%] py-20 md:py-32 lg:py-40 bg-slate-50"
    >
      <div className="container max-w-7xl">
        <header className="mb-16 max-w-3xl md:mb-20 lg:mb-24">
          <p className="mb-4 text-sm font-medium text-slate-600 tracking-wide uppercase md:mb-6">
            {tagline}
          </p>
          <h2 className="mb-6 text-4xl font-light text-slate-800 leading-tight tracking-tight font-serif md:mb-8 md:text-5xl lg:text-6xl">
            {heading}
          </h2>
          <p className="text-lg leading-relaxed text-slate-600 font-light md:text-xl">
            {description}
          </p>
        </header>
        <div>
          {displayedProjects.map((project, index) => (
            <Project key={index} {...project} />
          ))}
        </div>
        {projects.length > 2 && (
          <footer className="mt-16 flex justify-center md:mt-20 lg:mt-24">
            <Button
              variant="primary"
              size="primary"
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 text-sm font-medium tracking-wide bg-slate-800 text-white hover:bg-slate-700 transition-all duration-200"
            >
              {showAll ? "Show Less" : "View All Interviews"}
            </Button>
          </footer>
        )}
      </div>
    </section>
  );
};

const Project: React.FC<ProjectProps> = ({
  title,
  description,
  image,
  url,
  button,
  tags,
}) => (
  <article className="grid grid-cols-1 items-center gap-x-16 gap-y-8 border-t border-slate-200 py-12 md:grid-cols-2 md:gap-y-0 lg:gap-x-24 lg:py-16">
    <div>
      <a href={url} className="flex aspect-[4/3] w-full group">
        <img
          src={image.src}
          className="w-full object-cover rounded-sm shadow-lg group-hover:shadow-xl transition-shadow duration-300"
          alt={image.alt}
        />
      </a>
    </div>
    <div>
      <h3 className="mb-4 text-2xl font-light text-slate-800 leading-tight font-serif md:text-3xl lg:text-4xl">
        <a
          href={url}
          className="hover:text-slate-600 transition-colors duration-200"
        >
          {title}
        </a>
      </h3>
      <p className="text-lg leading-relaxed text-slate-600 font-light mb-6">
        {description}
      </p>
      <ul className="mb-6 flex flex-wrap gap-3">
        {tags.map((tag, index) => (
          <li key={index} className="flex">
            <a
              href={tag.url}
              className="bg-slate-100 hover:bg-slate-200 px-3 py-1 text-sm font-medium text-slate-700 rounded-sm transition-colors duration-200"
            >
              {tag.label}
            </a>
          </li>
        ))}
      </ul>
      <Button
        {...button}
        asChild
        className="text-slate-700 hover:text-slate-900 underline-offset-4 hover:underline font-medium"
      >
        <a href={url}>{button.title}</a>
      </Button>
    </div>
  </article>
);

const bbcDocumentary = {
  title: "The Real Story Behind Money Creation",
  description:
    "Professor Werner explains how banks actually create money and the implications for the economy. This comprehensive BBC documentary explores the mechanics of monetary policy and its real-world effects on society.",
  image: {
    src: "/proffesor.jpg",
    alt: "Professor Werner in BBC Documentary",
  },
  url: "#",
  button: {
    title: "Watch Documentary",
    variant: "link" as const,
    size: "link" as const,
    iconRight: <RxChevronRight />,
  },
  tags: [
    {
      label: "BBC Documentary",
      url: "#",
    },
    {
      label: "Money Creation",
      url: "#",
    },
    {
      label: "Banking",
      url: "#",
    },
  ],
};

const realVisionInterview = {
  title: "Rethinking Central Banking",
  description:
    "An in-depth conversation with Real Vision exploring alternative approaches to central banking and monetary policy. Professor Werner discusses sustainable finance and the future of economic systems.",
  image: {
    src: "/proffesor.jpg",
    alt: "Professor Werner Real Vision Interview",
  },
  url: "#",
  button: {
    title: "Watch Interview",
    variant: "link" as const,
    size: "link" as const,
    iconRight: <RxChevronRight />,
  },
  tags: [
    {
      label: "Real Vision",
      url: "#",
    },
    {
      label: "Central Banking",
      url: "#",
    },
    {
      label: "Policy",
      url: "#",
    },
  ],
};

const mmtTalk = {
  title: "How Banks Actually Work",
  description:
    "A comprehensive talk on Modern Monetary Theory and the practical mechanics of banking systems. Professor Werner breaks down complex economic concepts into accessible insights for policymakers and the public.",
  image: {
    src: "/proffesor.jpg",
    alt: "Professor Werner MMT Talk",
  },
  url: "#",
  button: {
    title: "Watch Talk",
    variant: "link" as const,
    size: "link" as const,
    iconRight: <RxChevronRight />,
  },
  tags: [
    {
      label: "Modern Monetary Theory",
      url: "#",
    },
    {
      label: "Banking Systems",
      url: "#",
    },
    {
      label: "Economics",
      url: "#",
    },
  ],
};

const oxfordPanel = {
  title: "The Future of Sustainable Finance",
  description:
    "Panel discussion at Oxford examining how financial systems can support sustainable development and environmental goals. Features Professor Werner's insights on reforming banking for a more sustainable future.",
  image: {
    src: "/proffesor.jpg",
    alt: "Professor Werner Oxford Panel Discussion",
  },
  url: "#",
  button: {
    title: "View Panel",
    variant: "link" as const,
    size: "link" as const,
    iconRight: <RxChevronRight />,
  },
  tags: [
    {
      label: "Oxford University",
      url: "#",
    },
    {
      label: "Sustainable Finance",
      url: "#",
    },
    {
      label: "Panel Discussion",
      url: "#",
    },
  ],
};

export const Portfolio16Defaults: Props = {
  tagline: "Featured Media",
  heading: "Conversations That Bring Economics to Life",
  description:
    "Through interviews, podcasts, and documentaries, Professor Werner shares insights on how money creation, banking, and policy decisions shape our daily lives. Each conversation offers a fresh perspective on topics that matter — from sustainable finance to global economic reform.",
  projects: [bbcDocumentary, realVisionInterview, mmtTalk, oxfordPanel],
  button: {
    title: "View All Interviews",
    variant: "secondary",
    size: "primary",
  },
};
