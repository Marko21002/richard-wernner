import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";

type ImageProps = {
  src: string;
  alt?: string;
};

type StatsProps = {
  title: string;
  description: string;
  icon?: string;
};

type Props = {
  heading: string;
  description: string;
  tagline: string;
  stats: StatsProps[];
  buttons: ButtonProps[];
  substackLink?: ButtonProps;
  image: ImageProps;
};

export type Layout25Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Layout25 = (props: Layout25Props) => {
  const { tagline, heading, description, stats, buttons, substackLink, image } =
    {
      ...Layout25Defaults,
      ...props,
    };
  return (
    <section id="relume" className="px-[5%] py-20 md:py-32 lg:py-40 bg-white">
      <div className="container max-w-7xl">
        <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:items-center md:gap-x-20 lg:gap-x-28">
          <div className="space-y-8 md:pr-4 lg:pr-8">
            <p className="mb-4 text-sm font-medium text-slate-600 tracking-wide uppercase md:mb-6">
              {tagline}
            </p>
            <h2 className="mb-6 text-4xl font-light text-slate-800 leading-tight tracking-tight font-serif md:mb-8 md:text-5xl lg:text-6xl">
              {heading}
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-slate-600 font-light max-w-2xl md:mb-10 md:text-xl">
              {description}
            </p>
            {/* Enhanced Statistics */}
            <div className="grid grid-cols-1 gap-8 py-6 sm:grid-cols-2 md:gap-12">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group border-l-2 border-slate-200 pl-6 hover:border-slate-300 transition-all duration-300 cursor-default"
                >
                  {stat.icon && (
                    <div className="mb-4 text-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                      {stat.icon}
                    </div>
                  )}
                  <h3 className="mb-3 text-4xl font-light text-slate-800 font-serif md:text-5xl lg:text-6xl group-hover:text-slate-900 transition-colors duration-300">
                    {stat.title}
                  </h3>
                  <p className="text-slate-600 font-light leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
            {/* Enhanced CTAs */}
            <div className="mt-10 space-y-6 md:mt-12">
              <div className="flex flex-wrap items-center gap-6">
                {buttons.map((button, index) => (
                  <Button
                    key={index}
                    {...button}
                    className={`px-8 py-3 text-sm font-medium tracking-wide transition-all duration-300 transform hover:scale-105 ${
                      button.variant === "primary" || index === 0
                        ? "bg-slate-800 text-white hover:bg-slate-700 border-slate-800 shadow-lg hover:shadow-xl"
                        : button.variant === "link"
                        ? "text-slate-700 hover:text-slate-900 underline-offset-4 hover:underline"
                        : "bg-white text-slate-800 border-2 border-slate-300 hover:bg-slate-50 hover:border-slate-400 shadow-md hover:shadow-lg"
                    }`}
                  >
                    {button.title}
                  </Button>
                ))}
              </div>

              {/* Additional Substack Link */}
              {substackLink && (
                <div className="pt-2">
                  <Button
                    {...substackLink}
                    className="text-slate-600 hover:text-slate-800 text-sm font-medium transition-colors duration-200"
                  >
                    {substackLink.title}
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="relative max-w-lg mx-auto md:max-w-none">
            <img
              src={image.src}
              className="w-full aspect-[4/5] object-cover rounded-sm shadow-2xl shadow-slate-200/50 transition-all duration-500 hover:shadow-3xl hover:shadow-slate-300/30"
              alt={image.alt}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const Layout25Defaults: Props = {
  tagline: "Research Focus",
  heading: "How Money Creation and Banking Shape the Real Economy",
  description:
    "My research explores how money is created, how banks operate, and how financial systems influence economic growth and stability. By combining empirical analysis, historical context, and real-world observation, I aim to make economics more transparent and useful for individuals, communities, and policymakers.",
  stats: [
    {
      title: "100+",
      description: "Publications, interviews, and reports",
      icon: "📚",
    },
    {
      title: "30+",
      description: "Years of teaching & public engagement",
      icon: "🎓",
    },
  ],
  buttons: [
    { title: "Explore Research", variant: "primary" },
    {
      title: "Watch Recent Interview →",
      variant: "secondary",
      size: "primary",
    },
  ],
  substackLink: {
    title: "Read on Substack →",
    variant: "link" as const,
  },
  image: {
    src: "/proffesor.jpg",
    alt: "Professor Richard A. Werner",
  },
};
