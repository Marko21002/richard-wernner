import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";

type ArticleProps = {
  title: string;
  excerpt: string;
  date: string;
  url: string;
  image: string;
  readTime: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  valuePoints: string[];
  benefits: string[];
  supportMessage: string;
  price: string;
  annualPrice: string;
  priceDescription: string;
  trustLine: string;
  buttons: ButtonProps[];
  telegramButton: ButtonProps;
  telegramMessage: string;
  articles: ArticleProps[];
};

export type SubstackProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Substack = (props: SubstackProps) => {
  const {
    tagline,
    heading,
    description,
    valuePoints,
    benefits,
    supportMessage,
    price,
    annualPrice,
    priceDescription,
    trustLine,
    buttons,
    telegramButton,
    telegramMessage,
    articles,
  } = {
    ...SubstackDefaults,
    ...props,
  };

  return (
    <section
      id="relume"
      className="px-[5%] py-20 md:py-32 lg:py-40 bg-gradient-to-br from-slate-50/50 to-white relative"
    >
      <div className="container max-w-7xl">
        {/* Header Section with Pricing */}
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

          {/* Enhanced Value Proposition Points */}
          <div className="mb-12 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {valuePoints.map((point, index) => (
                <div
                  key={index}
                  className="group text-center p-6 rounded-sm bg-white/80 hover:bg-white border border-slate-100 hover:border-slate-200 transition-all duration-300 hover:shadow-md"
                >
                  <p className="text-slate-700 font-medium leading-relaxed group-hover:text-slate-800 transition-colors duration-300">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* What You Get Preview */}
          <div className="mb-10 max-w-2xl mx-auto">
            <h3 className="text-lg font-medium text-slate-800 text-center mb-6">
              What You Get
            </h3>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-3"
                >
                  <div className="w-2 h-2 bg-slate-400 rounded-full flex-shrink-0" />
                  <p className="text-slate-600 font-light">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Support Message */}
          <div className="mb-6 text-center">
            <p className="text-lg font-medium text-slate-800 max-w-2xl mx-auto">
              💡 {supportMessage}
            </p>
          </div>

          {/* Enhanced Pricing Information */}
          <div className="mb-10 p-8 bg-white rounded-sm border border-slate-200 shadow-lg max-w-lg mx-auto">
            <div className="text-center space-y-4">
              <div className="text-4xl font-light text-slate-800 font-serif">
                {price}
                <span className="text-lg font-light text-slate-600">
                  /month
                </span>
              </div>
              <div className="text-sm text-slate-600 font-light">
                or {annualPrice}/year — 2 months free
              </div>
              <p className="text-slate-600 font-light leading-relaxed">
                {priceDescription}
              </p>
              <div className="pt-2 border-t border-slate-100">
                <p className="text-sm text-slate-500 font-light italic">
                  {trustLine}
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Call to Action Buttons */}
          <div className="space-y-6">
            <div className="flex flex-wrap justify-center gap-6">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  {...button}
                  className={`px-8 py-4 text-sm font-medium tracking-wide transition-all duration-300 transform hover:scale-105 ${
                    button.variant === "primary"
                      ? "bg-slate-800 text-white hover:bg-slate-700 border-slate-800 shadow-lg hover:shadow-xl"
                      : "bg-white text-slate-800 border-2 border-slate-300 hover:bg-slate-50 hover:border-slate-400 shadow-md hover:shadow-lg"
                  }`}
                >
                  {button.title}
                </Button>
              ))}
            </div>
            <p className="text-sm text-slate-500 font-light text-center">
              Cancel anytime. No spam.
            </p>
          </div>

          {/* Enhanced Telegram Channel Card */}
          <div className="mt-10 flex justify-center">
            <div className="bg-white border border-slate-200 rounded-sm p-6 max-w-sm mx-auto text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-center gap-2 mb-3">
                <svg
                  className="w-5 h-5 text-blue-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                <p className="text-slate-600 font-medium">{telegramMessage}</p>
              </div>
              <Button
                {...telegramButton}
                className="px-6 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 underline-offset-4 hover:underline transition-all duration-200 bg-transparent border-none"
              >
                {telegramButton.title} →
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Articles with Images */}
        <div>
          <h3 className="mb-12 text-2xl font-light text-slate-800 text-center font-serif md:text-3xl">
            Latest Articles
          </h3>
          <div className="grid grid-cols-1 gap-12 md:gap-16">
            {articles.map((article, index) => (
              <article
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full aspect-[4/3] object-cover rounded-sm shadow-lg"
                  />
                </div>
                <div
                  className={`${index % 2 === 1 ? "md:order-1" : ""} space-y-4`}
                >
                  <div className="flex items-center space-x-4 text-sm text-slate-500">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h4 className="text-2xl font-light text-slate-800 leading-tight font-serif md:text-3xl">
                    <a
                      href={article.url}
                      className="hover:text-slate-600 transition-colors duration-200"
                    >
                      {article.title}
                    </a>
                  </h4>
                  <p className="text-lg leading-relaxed text-slate-600 font-light">
                    {article.excerpt}
                  </p>
                  <a
                    href={article.url}
                    className="inline-flex items-center text-slate-700 hover:text-slate-900 font-medium transition-colors duration-200"
                  >
                    Read Full Article
                    <RxChevronRight className="ml-1 size-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const SubstackDefaults: Props = {
  tagline: "Publications",
  heading:
    "Independent Research and Real-World Analysis — Straight to Your Inbox",
  description:
    "Professor Werner shares in-depth commentary on money creation, banking reform, and the global economy — written for readers who want clarity, not jargon. Each article connects academic research with real-world insight.",
  valuePoints: [
    "🔍 Accessible, evidence-based research",
    "🧠 Independent thinking beyond the mainstream",
    "💬 Analysis that informs policy and practice",
  ],
  benefits: [
    "Weekly commentary and research notes",
    "Full access to premium archives",
    "Exclusive Q&A sessions and discussion threads",
  ],
  supportMessage:
    "Support independent economic research and get full access to all content.",
  price: "$8",
  annualPrice: "$80",
  priceDescription:
    "Premium articles, research papers, and exclusive commentary",
  trustLine:
    "Read by policymakers, professionals, and 15,000+ subscribers worldwide.",
  buttons: [
    { title: "📧 Subscribe & Support Research", variant: "primary" },
    { title: "📖 Read a Free Preview", variant: "secondary" },
  ],
  telegramMessage: "Prefer free updates?",
  telegramButton: {
    title: "Join the Telegram Channel",
    variant: "tertiary" as const,
  },
  articles: [
    {
      title: "The Real Cost of Central Bank Digital Currencies",
      excerpt:
        "Exploring the implications of CBDCs for privacy, monetary sovereignty, and the future of cash transactions in modern economies. This comprehensive analysis examines how digital currencies could reshape our financial landscape.",
      date: "March 15, 2024",
      readTime: "8 min read",
      image: "/proffesor.jpg",
      url: "#",
    },
    {
      title: "Why Regional Banking Models Matter More Than Ever",
      excerpt:
        "How community-focused banking can provide sustainable alternatives to the current centralized financial system. Learn about successful regional banking models from Germany and Japan that prioritize local economic development.",
      date: "February 28, 2024",
      readTime: "6 min read",
      image: "/proffesor.jpg",
      url: "#",
    },
    {
      title: "Understanding Money Creation in the Digital Age",
      excerpt:
        "Breaking down how banks actually create money and what this means for economic policy and individual financial decisions. A deep dive into the mechanics of credit creation and its real-world implications.",
      date: "February 12, 2024",
      readTime: "10 min read",
      image: "/proffesor.jpg",
      url: "#",
    },
  ],
};
