import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { BiCheck } from "react-icons/bi";

type PricingPlan = {
  planName: string;
  monthlyPrice: string;
  yearlyPrice: string;
  savingsAmount: string;
  features: string[];
  button: ButtonProps;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  audienceText: string;
  pricingPlan: PricingPlan;
  reassuranceText: string;
  testimonial: {
    quote: string;
    author: string;
  };
};

export type Pricing1Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Pricing1 = (props: Pricing1Props) => {
  const {
    tagline,
    heading,
    description,
    audienceText,
    pricingPlan,
    reassuranceText,
    testimonial,
  } = {
    ...Pricing1Defaults,
    ...props,
  };
  return (
    <section
      id="relume"
      className="px-[5%] py-20 md:py-32 lg:py-40 bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M20 20.5V18H14v-2h6v-2h-6v-2h6V8h2v4h6v2h-6v2h6v2h-6v2.5z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container max-w-7xl relative z-10">
        {/* Enhanced Header */}
        <div className="mx-auto mb-16 max-w-4xl text-center md:mb-20 lg:mb-24">
          <p className="mb-4 text-sm font-medium text-slate-600 tracking-wide uppercase md:mb-6">
            {tagline}
          </p>
          <h2 className="mb-6 text-4xl font-light text-slate-800 leading-tight tracking-tight font-serif md:mb-8 md:text-5xl lg:text-6xl">
            {heading}
          </h2>
          <p className="text-lg leading-relaxed text-slate-600 font-light md:text-xl max-w-3xl mx-auto mb-8">
            {description}
          </p>

          {/* Audience Section */}
          <div className="mb-10">
            <p className="text-base text-slate-600 font-medium bg-white/80 inline-block px-6 py-3 rounded-sm border border-slate-200">
              💡 {audienceText}
            </p>
          </div>
        </div>

        {/* Value-First Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Enhanced Pricing Card */}
          <div className="order-1 lg:order-2">
            <EnhancedPricingPlan
              plan={pricingPlan}
              reassuranceText={reassuranceText}
            />
          </div>

          {/* Value Content */}
          <div className="order-2 lg:order-1 space-y-8">
            <ValueContent plan={pricingPlan} />

            {/* Testimonial */}
            <div className="bg-white/90 border border-slate-200 rounded-sm p-6 shadow-sm">
              <blockquote className="text-slate-700 italic leading-relaxed mb-4">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <cite className="text-sm text-slate-600 font-medium">
                — {testimonial.author}
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ValueContent = ({ plan }: { plan: PricingPlan }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-2xl font-light text-slate-800 font-serif mb-6 md:text-3xl">
        What&apos;s Included
      </h3>
      <div className="space-y-4">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center">
                <BiCheck className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed font-light">
              {feature}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const EnhancedPricingPlan = ({
  plan,
  reassuranceText,
}: {
  plan: PricingPlan;
  reassuranceText: string;
}) => (
  <div className="bg-white border border-slate-200 rounded-sm shadow-xl shadow-slate-200/50 p-8 md:p-10 sticky top-8">
    <div className="text-center space-y-6">
      {/* Plan Name */}
      <h3 className="text-xl font-medium text-slate-800 md:text-2xl">
        {plan.planName}
      </h3>

      {/* Primary Pricing */}
      <div className="space-y-2">
        <div className="text-6xl font-light text-slate-800 font-serif md:text-7xl">
          {plan.monthlyPrice}
          <span className="text-2xl font-light text-slate-600 md:text-3xl">
            /session
          </span>
        </div>
      </div>

      {/* Secondary Pricing with Savings */}
      <div className="bg-slate-50 border border-slate-200 rounded-sm p-4 space-y-2">
        <p className="text-slate-700 font-medium">
          {plan.yearlyPrice} for 5 sessions
        </p>
        <p className="text-sm text-green-700 font-medium bg-green-50 inline-block px-3 py-1 rounded-sm">
          Save {plan.savingsAmount}
        </p>
      </div>

      {/* Enhanced CTA */}
      <div className="space-y-4 pt-4">
        <Button
          {...plan.button}
          className="w-full px-8 py-4 text-base font-medium tracking-wide bg-slate-800 text-white hover:bg-slate-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          {plan.button.title}
        </Button>

        {/* Reassurance Text */}
        <p className="text-sm text-slate-500 font-light leading-relaxed">
          {reassuranceText}
        </p>
      </div>
    </div>
  </div>
);

export const Pricing1Defaults: Props = {
  tagline: "Personal Consultation",
  heading: "Get Tailored Economic Insights from Professor Werner",
  description:
    "Whether you&apos;re researching monetary policy, developing an economic model, or exploring practical financial systems, a one-on-one session provides personal guidance and real-world context from decades of experience.",
  audienceText:
    "Ideal for students, researchers, policy professionals, and anyone seeking deeper understanding of monetary economics.",
  pricingPlan: {
    planName: "Private Consultation",
    monthlyPrice: "$300",
    yearlyPrice: "$1,200",
    savingsAmount: "$300",
    features: [
      "60-minute private video call with Professor Werner",
      "Personalized discussion of your research or questions",
      "Access to exclusive academic resources and materials",
      "Follow-up email summary with key insights and recommendations",
      "Priority scheduling for future sessions",
    ],
    button: { title: "📅 Book Your Consultation" },
  },
  reassuranceText: "Limited availability. Confirmation within 24 hours.",
  testimonial: {
    quote:
      "Professor Werner helped me refine my thesis and understand real-world banking dynamics. His insights completely changed my perspective on monetary policy.",
    author: "M.A. Student, London School of Economics",
  },
};
