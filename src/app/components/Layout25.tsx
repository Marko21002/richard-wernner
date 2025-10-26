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
};

type Props = {
  heading: string;
  description: string;
  tagline: string;
  stats: StatsProps[];
  buttons: ButtonProps[];
  image: ImageProps;
};

export type Layout25Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Layout25 = (props: Layout25Props) => {
  const { tagline, heading, description, stats, buttons, image } = {
    ...Layout25Defaults,
    ...props,
  };
  return (
    <section id="relume" className="px-[5%] py-20 md:py-32 lg:py-40 bg-white">
      <div className="container max-w-7xl">
        <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:items-center md:gap-x-16 lg:gap-x-24">
          <div>
            <p className="mb-4 text-sm font-medium text-slate-600 tracking-wide uppercase md:mb-6">
              {tagline}
            </p>
            <h2 className="mb-6 text-4xl font-light text-slate-800 leading-tight tracking-tight font-serif md:mb-8 md:text-5xl lg:text-6xl">
              {heading}
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-slate-600 font-light max-w-2xl md:mb-10 md:text-xl">
              {description}
            </p>
            <div className="grid grid-cols-1 gap-8 py-4 sm:grid-cols-2 md:gap-10">
              {stats.map((stat, index) => (
                <div key={index} className="border-l-2 border-slate-200 pl-6">
                  <h3 className="mb-3 text-4xl font-light text-slate-800 font-serif md:text-5xl lg:text-6xl">
                    {stat.title}
                  </h3>
                  <p className="text-slate-600 font-light leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 md:mt-10">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  {...button}
                  className={`px-8 py-3 text-sm font-medium tracking-wide transition-all duration-200 ${
                    button.variant === "secondary"
                      ? "bg-white text-slate-800 border-2 border-slate-300 hover:bg-slate-50 hover:border-slate-400"
                      : button.variant === "link"
                      ? "text-slate-700 hover:text-slate-900 underline-offset-4 hover:underline"
                      : "bg-slate-800 text-white hover:bg-slate-700 border-slate-800"
                  }`}
                >
                  {button.title}
                </Button>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src={image.src}
              className="w-full aspect-[4/5] object-cover rounded-sm shadow-2xl shadow-slate-200/50"
              alt={image.alt}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const Layout25Defaults: Props = {
  tagline: "Research Excellence",
  heading: "Understanding How Money and Banking Shape Our World",
  description:
    "My research looks at how money is created, how banks actually work, and how financial systems influence the real economy. By combining data, history, and on-the-ground observation, I aim to make economics more transparent and useful for people, communities, and policymakers alike.",
  stats: [
    {
      title: "100+",
      description:
        "Publications, interviews, and reports on economics and finance",
    },
    {
      title: "30+",
      description: "Years of teaching, research, and public engagement",
    },
  ],
  buttons: [
    { title: "Explore Research", variant: "secondary" },
    {
      title: "Watch Recent Interview",
      variant: "link",
      size: "link",
      iconRight: <RxChevronRight />,
    },
  ],
  image: {
    src: "/proffesor.jpg",
    alt: "Professor Richard A. Werner",
  },
};
