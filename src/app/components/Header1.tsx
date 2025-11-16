import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  subtitle: string;
  tagline: string;
  description: string;
  credibilityText: string;
  buttons: ButtonProps[];
  image: ImageProps;
};

export type Header1Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Header1 = (props: Header1Props) => {
  const {
    heading,
    subtitle,
    tagline,
    description,
    credibilityText,
    buttons,
    image,
  } = {
    ...Header1Defaults,
    ...props,
  };
  return (
    <section
      id="relume"
      className="px-[5%] py-20 md:py-28 lg:py-32 bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden"
    >
      {/* Background Academic Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
      <div className="container max-w-7xl">
        <div className="grid grid-cols-1 gap-x-24 gap-y-16 md:gap-y-20 lg:grid-cols-2 lg:items-center lg:min-h-[60vh]">
          <div className="space-y-8 relative z-10">
            {/* Enhanced Header with Subtitle */}
            <div className="space-y-3">
              <h1 className="text-5xl font-light text-slate-800 leading-[1.1] tracking-tight md:text-6xl lg:text-7xl font-serif">
                {heading}
              </h1>
              <p className="text-lg font-medium text-slate-600 tracking-wide md:text-xl">
                {subtitle}
              </p>
            </div>

            {/* Main Description */}
            <p className="text-lg leading-relaxed text-slate-600 md:text-xl font-light max-w-2xl">
              {description}
            </p>

            {/* Mission Tagline */}
            <p className="text-lg font-medium text-slate-700 italic max-w-2xl border-l-2 border-slate-300 pl-4">
              {tagline}
            </p>

            {/* Enhanced CTAs */}
            <div className="pt-4 space-y-4">
              <div className="flex flex-wrap gap-6">
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

              {/* Credibility Text */}
              <p className="text-sm text-slate-500 font-light italic">
                {credibilityText}
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-2xl shadow-slate-200/50 max-w-sm mx-auto lg:max-w-md">
              <img
                src={image.src}
                className="w-full h-full object-cover grayscale-[20%] contrast-110 transition-all duration-500 hover:grayscale-[10%]"
                alt={image.alt}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Header1Defaults: Props = {
  heading: "Professor Richard A. Werner",
  subtitle: "Economist • Author • Professor of Banking & Finance",
  tagline:
    "Exploring how money creation and banking shape economies worldwide.",
  description:
    'Renowned for coining the term "quantitative easing" and for pioneering research on money creation and banking systems. Professor Werner\'s work challenges conventional thinking in economics and promotes a deeper understanding of how financial structures shape our world.',
  credibilityText:
    "Featured by BBC, Real Vision, and international publications.",
  buttons: [
    { title: "📚 Explore Research & Publications", variant: "primary" },
    { title: "📰 Read Insights on Substack", variant: "secondary" },
  ],
  image: {
    src: "/proffesor.jpg",
    alt: "Professor Richard A. Werner",
  },
};
