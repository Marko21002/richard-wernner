import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { BiCheck } from "react-icons/bi";

type PricingPlan = {
  planName: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: string[];
  button: ButtonProps;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  pricingPlan: PricingPlan;
};

export type Pricing1Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Pricing1 = (props: Pricing1Props) => {
  const { tagline, heading, description, pricingPlan } = {
    ...Pricing1Defaults,
    ...props,
  };
  return (
    <section
      id="relume"
      className="px-[5%] py-20 md:py-32 lg:py-40 bg-slate-50"
    >
      <div className="container max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20 lg:mb-24">
          <p className="mb-4 text-sm font-medium text-slate-600 tracking-wide uppercase md:mb-6">
            {tagline}
          </p>
          <h2 className="mb-6 text-4xl font-light text-slate-800 leading-tight tracking-tight font-serif md:mb-8 md:text-5xl lg:text-6xl">
            {heading}
          </h2>
          <p className="text-lg leading-relaxed text-slate-600 font-light md:text-xl">
            {description}
          </p>
        </div>
        <div className="mx-auto w-full max-w-md">
          <PricingPlan plan={pricingPlan} />
        </div>
      </div>
    </section>
  );
};

const PricingPlan = ({ plan }: { plan: PricingPlan }) => (
  <div className="flex h-full flex-col justify-between border border-slate-200 bg-white px-8 py-10 rounded-sm shadow-xl shadow-slate-200/50 md:p-12">
    <div className="mb-8 md:mb-10">
      <div className="text-center">
        <h6 className="text-lg font-medium text-slate-800 md:text-xl">
          {plan.planName}
        </h6>
        <h1 className="my-4 text-5xl font-light text-slate-800 font-serif md:text-6xl lg:text-7xl">
          {plan.monthlyPrice}
          <span className="text-xl font-light text-slate-600 md:text-2xl lg:text-3xl">
            /session
          </span>
        </h1>
        <p className="text-slate-600 font-light">
          or {plan.yearlyPrice} for 5 sessions
        </p>
      </div>
    </div>
    <div className="mb-10 grid grid-cols-1 gap-5 py-4">
      {plan.features.map((feature, index) => (
        <div key={index} className="flex self-start">
          <div className="mr-4 flex-none self-start">
            <BiCheck className="size-6 text-slate-700" />
          </div>
          <p className="text-slate-700 leading-relaxed">{feature}</p>
        </div>
      ))}
    </div>
    <div>
      <Button
        {...plan.button}
        className="w-full px-8 py-4 text-sm font-medium tracking-wide bg-slate-800 text-white hover:bg-slate-700 transition-all duration-200"
      >
        {plan.button.title}
      </Button>
    </div>
  </div>
);

export const Pricing1Defaults: Props = {
  tagline: "Personal Consultation",
  heading: "One-on-One Sessions with Professor Werner",
  description:
    "Get personalized insights, discuss your research, or explore complex economic questions in a private session with Professor Werner. Each consultation is tailored to your specific interests and goals.",
  pricingPlan: {
    planName: "Private Consultation",
    monthlyPrice: "$300",
    yearlyPrice: "$1,200",
    features: [
      "60-minute private video call with Professor Werner",
      "Personalized discussion of your research or questions",
      "Access to exclusive academic resources and materials",
      "Follow-up email summary with key insights and recommendations",
      "Priority scheduling for future sessions",
    ],
    button: { title: "📅 Schedule Your Session" },
  },
};
