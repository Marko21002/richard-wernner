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
  price: string;
  priceDescription: string;
  buttons: ButtonProps[];
  telegramButton: ButtonProps;
  articles: ArticleProps[];
};

export type SubstackProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Substack = (props: SubstackProps) => {
  const {
    tagline,
    heading,
    description,
    price,
    priceDescription,
    buttons,
    telegramButton,
    articles,
  } = {
    ...SubstackDefaults,
    ...props,
  };

  return (
    <section id="relume" className="px-[5%] py-20 md:py-32 lg:py-40 bg-white">
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

          {/* Pricing Information */}
          <div className="mb-8 p-6 bg-slate-50 rounded-sm border border-slate-200 max-w-md mx-auto">
            <div className="text-3xl font-light text-slate-800 font-serif mb-2">
              {price}
              <span className="text-base font-light text-slate-600">
                /month
              </span>
            </div>
            <p className="text-slate-600 font-light">{priceDescription}</p>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap justify-center gap-6">
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

          {/* Free Telegram Channel */}
          <div className="mt-8 text-center">
            <p className="mb-4 text-slate-600 font-light">
              Or join our free Telegram channel for regular updates
            </p>
            <Button
              {...telegramButton}
              className="px-6 py-2 text-sm font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 transition-all duration-200"
            >
              {telegramButton.title}
            </Button>
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
    "Independent Analysis. Real-World Economics. Straight to Your Inbox.",
  description:
    "Professor Werner shares in-depth research and commentary on banking systems, monetary policy, and economic reform. Get access to exclusive articles that challenge conventional thinking and provide practical insights into how financial systems really work.",
  price: "$8",
  priceDescription: "Premium articles, research papers, and exclusive insights",
  buttons: [
    { title: "📰 Subscribe for $8/month", variant: "primary" },
    { title: "Read Sample Article", variant: "secondary" },
  ],
  telegramButton: {
    title: "💬 Join Free Telegram Channel",
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
