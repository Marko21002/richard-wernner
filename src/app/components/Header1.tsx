import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  description: string;
  buttons: ButtonProps[];
  image: ImageProps;
};

export type Header1Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Header1 = (props: Header1Props) => {
  const { heading, description, buttons, image } = {
    ...Header1Defaults,
    ...props,
  };
  return (
    <section
      id="relume"
      className="px-[5%] py-20 md:py-32 lg:py-40 bg-slate-50"
    >
      <div className="container max-w-7xl">
        <div className="grid grid-cols-1 gap-x-24 gap-y-16 md:gap-y-20 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <h1 className="text-5xl font-light text-slate-800 leading-tight tracking-tight md:text-6xl lg:text-7xl font-serif">
              {heading}
            </h1>
            <p className="text-lg leading-relaxed text-slate-600 md:text-xl font-light max-w-2xl">
              {description}
            </p>
            <div className="pt-4 flex flex-wrap gap-6">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  {...button}
                  className={`px-8 py-3 text-sm font-medium tracking-wide transition-all duration-200 ${
                    button.variant === "primary"
                      ? "bg-slate-800 text-white hover:bg-slate-700 border-slate-800"
                      : "bg-white text-slate-800 border-2 border-slate-300 hover:bg-slate-50 hover:border-slate-400"
                  }`}
                >
                  {button.title}
                </Button>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-2xl shadow-slate-200/50">
              <img
                src={image.src}
                className="w-full h-full object-cover grayscale-[20%] contrast-110"
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
  description:
    "Economist, Author, and Professor of Banking and Finance. Renowned for coining the term 'quantitative easing' and challenging conventional economic thinking through his research on money creation and banking systems. Author of influential works including 'Princes of the Yen' and advisor to central banks worldwide.",
  buttons: [
    { title: "📚 Explore Research", variant: "primary" },
    { title: "📰 Subscribe on Substack", variant: "secondary" },
  ],
  image: {
    src: "/proffesor.jpg",
    alt: "Professor Richard A. Werner",
  },
};
