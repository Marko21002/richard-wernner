import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";

type FeatureProps = {
  icon: string;
  title: string;
  description: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  features: FeatureProps[];
  button: ButtonProps;
  contactInfo: string;
};

export type EventsProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Events = (props: EventsProps) => {
  const { tagline, heading, description, features, button, contactInfo } = {
    ...EventsDefaults,
    ...props,
  };

  return (
    <section
      id="events"
      className="px-[5%] py-20 md:py-32 lg:py-40 bg-gradient-to-br from-slate-50/50 to-white"
    >
      <div className="container max-w-5xl mx-auto">
        <div className="text-center space-y-12">
          {/* Header */}
          <div className="space-y-6">
            <p className="text-sm font-medium text-slate-600 tracking-wide uppercase">
              {tagline}
            </p>
            <h2 className="text-4xl font-light text-slate-800 leading-tight tracking-tight font-serif md:text-5xl lg:text-6xl">
              {heading}
            </h2>
            <p className="text-lg leading-relaxed text-slate-600 font-light max-w-3xl mx-auto md:text-xl">
              {description}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="space-y-4 p-6 bg-white border border-slate-200 rounded-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300"
              >
                <div className="text-4xl">{feature.icon}</div>
                <h3 className="text-xl font-medium text-slate-800">
                  {feature.title}
                </h3>
                <p className="text-slate-600 font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-sm shadow-xl shadow-slate-200/50 p-8 md:p-12">
            <div className="space-y-6">
              <Button
                {...button}
                className="px-8 py-4 text-base font-medium tracking-wide transition-all duration-300 transform hover:scale-105 bg-slate-800 text-white hover:bg-slate-700 border-slate-800 shadow-lg hover:shadow-xl"
              >
                {button.title}
              </Button>

              <p className="text-sm text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">
                {contactInfo}
              </p>
            </div>
          </div>

          {/* Visual Enhancement */}
          <div className="flex justify-center items-center gap-8 pt-8 opacity-60">
            <div className="w-16 h-px bg-slate-300"></div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-slate-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-sm text-slate-400 font-light">
                Speaking engagements worldwide
              </span>
            </div>
            <div className="w-16 h-px bg-slate-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const EventsDefaults: Props = {
  tagline: "Speaking Engagements",
  heading: "Invite Professor Werner to Speak",
  description:
    "Professor Werner regularly addresses universities, conferences, policy forums, and professional organizations worldwide. His engaging presentations make complex economic concepts accessible and provide valuable insights into banking, monetary policy, and economic reform.",
  features: [
    {
      icon: "🎓",
      title: "Academic Institutions",
      description:
        "Universities, business schools, and research institutions seeking expert insights on monetary economics and banking theory.",
    },
    {
      icon: "🏛️",
      title: "Policy Forums",
      description:
        "Government agencies, central banks, and international organizations exploring economic policy and financial regulation.",
    },
    {
      icon: "💼",
      title: "Professional Events",
      description:
        "Corporate conferences, industry summits, and professional associations focused on finance and economics.",
    },
  ],
  button: {
    title: "Submit Speaking Request",
    variant: "primary",
  },
  contactInfo:
    "Professor Werner is available for keynote presentations, panel discussions, workshops, and academic seminars. Each engagement is tailored to the audience and objectives of your event.",
};
