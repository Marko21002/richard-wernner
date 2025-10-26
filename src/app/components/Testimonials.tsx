import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";

type TestimonialProps = {
  quote: string;
  author: string;
  title: string;
  organization?: string;
  category: "student" | "academic" | "media" | "policy" | "professional";
  isFeatured?: boolean;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  featuredTestimonial?: TestimonialProps;
  testimonials: TestimonialProps[];
  ctaSection?: {
    heading: string;
    description: string;
    button: ButtonProps;
  };
};

export type TestimonialsProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

const getCategoryColor = (category: string) => {
  switch (category) {
    case "student":
      return "bg-blue-100 text-blue-800";
    case "academic":
      return "bg-green-100 text-green-800";
    case "media":
      return "bg-purple-100 text-purple-800";
    case "policy":
      return "bg-orange-100 text-orange-800";
    case "professional":
      return "bg-indigo-100 text-indigo-800";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case "student":
      return "Student";
    case "academic":
      return "Academic";
    case "media":
      return "Media";
    case "policy":
      return "Policy Maker";
    case "professional":
      return "Professional";
    default:
      return "Reviewer";
  }
};

export const Testimonials = (props: TestimonialsProps) => {
  const {
    tagline,
    heading,
    description,
    featuredTestimonial,
    testimonials,
    ctaSection,
  } = {
    ...TestimonialsDefaults,
    ...props,
  };

  return (
    <section
      id="testimonials"
      className="px-[5%] py-20 md:py-32 lg:py-40 bg-slate-50"
    >
      <div className="container max-w-7xl">
        {/* Header */}
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

        {/* Featured Testimonial */}
        {featuredTestimonial && (
          <div className="mb-20">
            <FeaturedTestimonial testimonial={featuredTestimonial} />
          </div>
        )}

        {/* Testimonials Grid */}
        {testimonials && testimonials.length > 0 && (
          <div className="mb-16 md:mb-20">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} />
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        {ctaSection && (
          <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-sm p-8 md:p-12 text-center">
            <h3 className="mb-4 text-3xl font-light text-slate-800 font-serif md:text-4xl">
              {ctaSection.heading}
            </h3>
            <p className="mb-8 text-lg text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">
              {ctaSection.description}
            </p>
            <Button
              {...ctaSection.button}
              className="px-8 py-3 text-sm font-medium tracking-wide transition-all duration-300 transform hover:scale-105 bg-slate-800 text-white hover:bg-slate-700 border-slate-800 shadow-lg hover:shadow-xl"
            >
              {ctaSection.button.title}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

const FeaturedTestimonial = ({
  testimonial,
}: {
  testimonial: TestimonialProps;
}) => (
  <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-sm shadow-xl shadow-slate-200/50 p-8 md:p-12 text-center">
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-center">
        <span
          className={`px-4 py-2 text-sm font-medium rounded-sm ${getCategoryColor(
            testimonial.category
          )}`}
        >
          {getCategoryLabel(testimonial.category)}
        </span>
      </div>

      <blockquote className="text-2xl font-light text-slate-700 leading-relaxed italic md:text-3xl lg:text-4xl">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <div className="space-y-2">
        <cite className="text-lg font-medium text-slate-800 not-italic">
          {testimonial.author}
        </cite>
        <div className="text-slate-600 font-light">
          <p className="text-base">{testimonial.title}</p>
          {testimonial.organization && (
            <p className="text-sm">{testimonial.organization}</p>
          )}
        </div>
      </div>
    </div>
  </div>
);

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: TestimonialProps;
}) => (
  <div className="group bg-white border border-slate-200 rounded-sm p-6 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <span
          className={`px-3 py-1 text-xs font-medium rounded-sm ${getCategoryColor(
            testimonial.category
          )}`}
        >
          {getCategoryLabel(testimonial.category)}
        </span>
        <svg
          className="w-8 h-8 text-slate-300 group-hover:text-slate-400 transition-colors duration-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
        </svg>
      </div>

      <blockquote className="text-slate-700 font-light leading-relaxed italic">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <div className="pt-2 border-t border-slate-100">
        <cite className="text-sm font-medium text-slate-800 not-italic">
          {testimonial.author}
        </cite>
        <div className="text-xs text-slate-600 font-light mt-1">
          <p>{testimonial.title}</p>
          {testimonial.organization && (
            <p className="text-slate-500">{testimonial.organization}</p>
          )}
        </div>
      </div>
    </div>
  </div>
);

export const TestimonialsDefaults: Props = {
  tagline: "What People Say",
  heading: "Impact Across Academia, Policy, and Media",
  description:
    "Professor Werner&apos;s research and teaching have influenced students, colleagues, policymakers, and media professionals around the world. Here&apos;s what they say about his work on banking, monetary policy, and economic reform.",
  featuredTestimonial: {
    quote:
      "Professor Werner&apos;s research fundamentally changed how I understand banking and money creation. His empirical approach to economics provides clarity that mainstream theory often lacks.",
    author: "Dr. Sarah Mitchell",
    title: "Senior Economist",
    organization: "International Monetary Fund",
    category: "professional",
    isFeatured: true,
  },
  testimonials: [
    {
      quote:
        "The most eye-opening course I&apos;ve ever taken. Professor Werner&apos;s insights into how banks actually create money completely transformed my understanding of economics.",
      author: "James Richardson",
      title: "PhD Student in Economics",
      organization: "University of Oxford",
      category: "student",
    },
    {
      quote:
        "Werner&apos;s work on quantitative easing was prescient and his analysis of Japan&apos;s monetary policy remains essential reading for any serious monetary economist.",
      author: "Prof. Elena Rodriguez",
      title: "Professor of Monetary Economics",
      organization: "London School of Economics",
      category: "academic",
    },
    {
      quote:
        "His BBC documentary opened my eyes to how the financial system really works. Complex ideas explained with remarkable clarity and backed by solid research.",
      author: "Michael Thompson",
      title: "Financial Journalist",
      organization: "Financial Times",
      category: "media",
    },
    {
      quote:
        "Professor Werner&apos;s research on credit creation has been instrumental in shaping our understanding of banking regulation and financial stability policies.",
      author: "Dr. Anna Chen",
      title: "Senior Policy Advisor",
      organization: "Bank of England",
      category: "policy",
    },
    {
      quote:
        "His work bridges the gap between academic theory and real-world banking practice. Essential reading for anyone working in finance or economic policy.",
      author: "Robert Davies",
      title: "Chief Risk Officer",
      organization: "Deutsche Bank",
      category: "professional",
    },
    {
      quote:
        "Professor Werner&apos;s teaching style makes complex economic concepts accessible. His real-world examples and historical context bring theory to life.",
      author: "Maria Santos",
      title: "Master&apos;s Student",
      organization: "University of Southampton",
      category: "student",
    },
  ],
  ctaSection: {
    heading: "Experience the Impact Yourself",
    description:
      "Join thousands of students, professionals, and policymakers who have gained new insights from Professor Werner&apos;s research and teaching.",
    button: {
      title: "Explore His Work",
      variant: "primary",
    },
  },
};
