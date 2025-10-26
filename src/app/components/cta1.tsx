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

export type Cta1Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Cta1 = (props: Cta1Props) => {
  const { heading, description, buttons, image } = {
    ...Cta1Defaults,
    ...props,
  };
  return (
    <section id="relume" className="px-[5%] py-20 md:py-32 lg:py-40 bg-white">
      <div className="container max-w-7xl">
        <div className="grid grid-cols-1 gap-x-24 gap-y-16 md:gap-y-20 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-light text-slate-800 leading-tight tracking-tight font-serif md:text-5xl lg:text-6xl">
              {heading}
            </h2>
            <p className="text-lg leading-relaxed text-slate-600 font-light max-w-2xl md:text-xl">
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
            <div className="aspect-[4/3] overflow-hidden rounded-sm shadow-2xl shadow-slate-200/50">
              <img
                src={image.src}
                className="w-full h-full object-cover"
                alt={image.alt}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Cta1Defaults: Props = {
  heading: "Deep Dive Into Economic Reality",
  description:
    "Join Professor Werner on YouTube for comprehensive analysis of banking systems, monetary policy, and economic reform. Watch detailed explanations, Q&A sessions, and exclusive insights that make complex economic concepts accessible to everyone.",
  buttons: [
    { title: "🔴 Subscribe to YouTube", variant: "primary" },
    { title: "📺 Watch Latest Video", variant: "secondary" },
  ],
  image: {
    src: "/proffesor.jpg",
    alt: "Professor Werner YouTube Channel",
  },
};
