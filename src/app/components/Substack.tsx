"use client";

import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";
import { useState } from "react";

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
  trustLine: string;
  buttons: ButtonProps[];
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
    trustLine,
    buttons,
    articles,
  } = {
    ...SubstackDefaults,
    ...props,
  };

  const [showAllArticles, setShowAllArticles] = useState(false);
  const displayedArticles = showAllArticles ? articles : articles.slice(0, 2);

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
          <p className="text-lg leading-relaxed text-slate-600 font-light md:text-xl max-w-2xl mx-auto mb-10">
            {description}
          </p>

          {/* Pricing Information */}
          <div className="mb-8 p-6 bg-white rounded-sm border border-slate-200 shadow-lg max-w-md mx-auto">
            <div className="text-center space-y-3">
              <div className="text-3xl font-light text-slate-800 font-serif">
                {price}
                <span className="text-base font-light text-slate-600">
                  /month
                </span>
              </div>
              <p className="text-slate-600 font-light">{priceDescription}</p>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-wrap justify-center gap-4">
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
            <p className="text-sm text-slate-500 font-light text-center">
              {trustLine}
            </p>
          </div>
        </div>

        {/* Featured Articles with Images */}
        <div>
          <h3 className="mb-12 text-2xl font-light text-slate-800 text-center font-serif md:text-3xl">
            Latest Articles
          </h3>
          <div className="grid grid-cols-1 gap-12 md:gap-16">
            {displayedArticles.map((article, index) => (
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

          {/* Show More/Less Button */}
          {articles.length > 2 && (
            <div className="mt-12 text-center">
              <Button
                onClick={() => setShowAllArticles(!showAllArticles)}
                className="px-8 py-3 text-sm font-medium tracking-wide transition-all duration-300 bg-white text-slate-800 border-2 border-slate-300 hover:bg-slate-50 hover:border-slate-400 shadow-md hover:shadow-lg"
              >
                {showAllArticles
                  ? "Show Less Articles"
                  : `Show More Articles (${articles.length - 2} more)`}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export const SubstackDefaults: Props = {
  tagline: "Paid Newsletter",
  heading: "Professor Werner's Exclusive Substack",
  description:
    "Get Professor Werner's latest economic analysis, research insights, and commentary delivered directly to your inbox. Subscribers access in-depth articles on banking, monetary policy, and economic reform.",
  price: "$8",
  priceDescription:
    "Premium articles, research papers, and exclusive commentary",
  trustLine:
    "Read by policymakers, professionals, and 15,000+ subscribers worldwide.",
  buttons: [
    { title: "📧 Subscribe Now", variant: "primary" },
    { title: "📖 Read a Free Preview", variant: "secondary" },
  ],
  articles: [
    {
      title:
        "Fed Faces Biggest Direct Challenge by a President since JFK - And this is a good thing",
      excerpt:
        "An analysis of the unprecedented confrontation between political leadership and central bank independence, examining the historical context and potential implications for monetary policy and democratic governance.",
      date: "March 15, 2024",
      readTime: "12 min read",
      image: "/substack/article1.webp",
      url: "#",
    },
    {
      title:
        "Japanese Lesson: Crises are Created to Centralise Control and Destroy the Middle Class",
      excerpt:
        "Examining Japan's economic transformation through decades of policy decisions, revealing how financial crises can be leveraged to concentrate power and reshape social structures at the expense of middle-class prosperity.",
      date: "February 28, 2024",
      readTime: "15 min read",
      image: "/substack/article2.webp",
      url: "#",
    },
    {
      title:
        "Bond Market Massacre Ahead: Financial Repression in the Land of the Free",
      excerpt:
        "A critical examination of current monetary policy trends and their impact on bond markets, exploring how financial repression mechanisms are being deployed in developed economies and what this means for investors and savers.",
      date: "February 12, 2024",
      readTime: "18 min read",
      image: "/substack/article3.webp",
      url: "#",
    },
  ],
};
