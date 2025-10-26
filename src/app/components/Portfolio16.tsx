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
  quote?: string;
  metadata?: string;
  isVideo?: boolean;
};

type PreviewCardProps = {
  title: string;
  summary: string;
  image: ImageProps;
  url: string;
  type: string;
  date?: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  featuredProject: ProjectProps;
  previewCards: PreviewCardProps[];
  moreMediaLink: ButtonProps;
};

export type Portfolio16Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Portfolio16 = (props: Portfolio16Props) => {
  const {
    tagline,
    heading,
    description,
    featuredProject,
    previewCards,
    moreMediaLink,
  } = {
    ...Portfolio16Defaults,
    ...props,
  };

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
        {/* Featured Media */}
        <div className="mb-16 md:mb-20">
          <FeaturedProject {...featuredProject} />
        </div>

        {/* Preview Cards */}
        {previewCards && previewCards.length > 0 && (
          <div className="space-y-12">
            <h3 className="text-xl font-medium text-slate-800 text-center md:text-2xl">
              More Conversations
            </h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {previewCards.map((card, index) => (
                <PreviewCard key={index} {...card} />
              ))}
            </div>

            {/* More Media Link */}
            <div className="text-center pt-8">
              <Button
                {...moreMediaLink}
                className="text-slate-600 hover:text-slate-800 underline-offset-4 hover:underline font-medium transition-colors duration-200"
              >
                {moreMediaLink.title}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const FeaturedProject: React.FC<ProjectProps> = ({
  title,
  description,
  image,
  url,
  button,
  tags,
  quote,
  metadata,
  isVideo = true,
}) => (
  <article className="grid grid-cols-1 items-center gap-x-16 gap-y-8 py-12 md:grid-cols-2 md:gap-y-0 lg:gap-x-24 lg:py-16">
    <div className="relative group">
      <a href={url} className="flex aspect-[4/3] w-full">
        <img
          src={image.src}
          className="w-full object-cover rounded-sm shadow-xl group-hover:shadow-2xl transition-shadow duration-300"
          alt={image.alt}
        />
        {/* Play Icon Overlay */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all duration-300 rounded-sm">
            <div className="bg-white/90 group-hover:bg-white rounded-full p-4 transform group-hover:scale-110 transition-all duration-300 shadow-lg">
              <svg
                className="w-8 h-8 text-slate-800 ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </a>
    </div>
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-3xl font-light text-slate-800 leading-tight font-serif md:text-4xl lg:text-5xl">
          <a
            href={url}
            className="hover:text-slate-600 transition-colors duration-200"
          >
            {title}
          </a>
        </h3>
        <p className="text-lg leading-relaxed text-slate-600 font-light mb-4 md:text-xl">
          {description}
        </p>

        {/* Featured Quote */}
        {quote && (
          <blockquote className="border-l-2 border-slate-300 pl-6 py-4 mb-6">
            <p className="text-lg font-medium text-slate-700 italic leading-relaxed">
              "{quote}"
            </p>
          </blockquote>
        )}
      </div>

      {/* Tags */}
      <div className="space-y-4">
        <ul className="flex flex-wrap gap-3">
          {tags.map((tag, index) => (
            <li key={index} className="flex">
              <span
                className={`px-3 py-1 text-sm font-medium rounded-sm transition-colors duration-200 ${
                  tag.label.includes("BBC")
                    ? "bg-blue-100 text-blue-800"
                    : tag.label.includes("Real Vision")
                    ? "bg-purple-100 text-purple-800"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {tag.label}
              </span>
            </li>
          ))}
        </ul>

        {/* Metadata */}
        {metadata && (
          <p className="text-sm text-slate-500 font-light">{metadata}</p>
        )}
      </div>

      {/* CTA */}
      <div className="pt-2">
        <Button
          {...button}
          asChild
          className="inline-flex items-center px-6 py-3 bg-slate-800 text-white hover:bg-slate-700 transition-all duration-200 rounded-sm font-medium"
        >
          <a href={url} className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            {button.title}
          </a>
        </Button>
      </div>
    </div>
  </article>
);

const PreviewCard: React.FC<PreviewCardProps> = ({
  title,
  summary,
  image,
  url,
  type,
  date,
}) => (
  <article className="group cursor-pointer">
    <a href={url} className="block space-y-4">
      <div className="relative aspect-[16/9] overflow-hidden rounded-sm shadow-lg group-hover:shadow-xl transition-shadow duration-300">
        <img
          src={image.src}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          alt={image.alt}
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 text-slate-700 px-2 py-1 text-xs font-medium rounded-sm">
            {type}
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-lg font-medium text-slate-800 leading-tight group-hover:text-slate-600 transition-colors duration-200">
          {title}
        </h4>
        <p
          className="text-sm text-slate-600 leading-relaxed overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {summary}
        </p>
        {date && <p className="text-xs text-slate-500 font-light">{date}</p>}
      </div>
    </a>
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
    "Through interviews, podcasts, and documentaries, Professor Werner explores how money creation, banking, and public policy affect our everyday lives. These conversations turn complex ideas into accessible insights for anyone interested in understanding how modern economies really work.",
  featuredProject: {
    ...bbcDocumentary,
    quote:
      "Banks don't lend existing money — they create it. This realization changes everything about how we understand the economy.",
    metadata: "BBC · 2024 · 1M+ views",
    isVideo: true,
  },
  previewCards: [
    {
      title: "Rethinking Central Banking",
      summary:
        "An in-depth conversation exploring alternative approaches to central banking and sustainable finance.",
      image: {
        src: "/proffesor.jpg",
        alt: "Professor Werner Real Vision Interview",
      },
      url: "#",
      type: "Interview",
      date: "March 2024",
    },
    {
      title: "How Banks Actually Work",
      summary:
        "A comprehensive talk on Modern Monetary Theory and the practical mechanics of banking systems.",
      image: { src: "/proffesor.jpg", alt: "Professor Werner MMT Talk" },
      url: "#",
      type: "Lecture",
      date: "February 2024",
    },
    {
      title: "Future of Sustainable Finance",
      summary:
        "Panel discussion at Oxford examining how financial systems can support environmental goals.",
      image: { src: "/proffesor.jpg", alt: "Professor Werner Oxford Panel" },
      url: "#",
      type: "Panel",
      date: "January 2024",
    },
  ],
  moreMediaLink: {
    title: "View All Media Appearances →",
    variant: "link" as const,
  },
};
