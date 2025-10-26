import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";

type BookProps = {
  title: string;
  subtitle?: string;
  description: string;
  image: {
    src: string;
    alt?: string;
  };
  year?: string;
  publisher?: string;
  buttons: ButtonProps[];
  tags?: string[];
  impact?: string[];
  isFeatured?: boolean;
  pullQuote?: string;
  quoteSource?: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  books: BookProps[];
  socialProof?: string;
};

export type BooksProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Books = (props: BooksProps) => {
  const { tagline, heading, description, books, socialProof } = {
    ...BooksDefaults,
    ...props,
  };

  const featuredBooks = books.filter((book) => book.isFeatured);
  const regularBooks = books.filter((book) => !book.isFeatured);

  return (
    <section id="books" className="px-[5%] py-20 md:py-32 lg:py-40 bg-white">
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

        <div className="space-y-16 md:space-y-20">
          {/* Featured Books */}
          {featuredBooks.map((book, index) => (
            <FeaturedBookCard key={`featured-${index}`} book={book} />
          ))}

          {/* Regular Books Grid */}
          {regularBooks.length > 0 && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
              {regularBooks.map((book, index) => (
                <BookCard key={`regular-${index}`} book={book} />
              ))}
            </div>
          )}
        </div>

        {/* Social Proof */}
        {socialProof && (
          <div className="mt-16 text-center md:mt-20">
            <p className="text-sm text-slate-500 font-light italic max-w-2xl mx-auto">
              {socialProof}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

const BookCard = ({ book }: { book: BookProps }) => (
  <div className="bg-white border border-slate-200 rounded-sm shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 h-full">
    <div className="flex flex-col space-y-6 h-full">
      {/* Book Cover */}
      <div className="flex-shrink-0">
        <div className="w-full max-w-[160px] mx-auto group">
          <img
            src={book.image.src}
            className="w-full aspect-[3/4] object-contain rounded-sm shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105"
            alt={book.image.alt}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-4 text-center">
        {/* Tags */}
        {(book.tags || book.impact) && (
          <div className="flex flex-wrap gap-2 justify-center">
            {book.tags?.map((tag, index) => (
              <span
                key={`tag-${index}`}
                className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-sm"
              >
                {tag}
              </span>
            ))}
            {book.impact?.map((impact, index) => (
              <span
                key={`impact-${index}`}
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-sm"
              >
                {impact}
              </span>
            ))}
          </div>
        )}

        {/* Title and Meta */}
        <div>
          <h3 className="text-xl font-medium text-slate-800 leading-tight font-serif md:text-2xl mb-2">
            {book.title}
          </h3>
          {book.subtitle && (
            <p className="text-base font-light text-slate-600 leading-tight mb-3">
              {book.subtitle}
            </p>
          )}
          {(book.year || book.publisher) && (
            <p className="text-xs text-slate-500 font-light">
              {book.year} {book.publisher && `• ${book.publisher}`}
            </p>
          )}
        </div>

        {/* Description */}
        <p
          className="text-sm text-slate-600 leading-relaxed font-light overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {book.description}
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 pt-4 mt-auto">
          {book.buttons.map((button, buttonIndex) => (
            <Button
              key={buttonIndex}
              {...button}
              className={`px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 ${
                button.variant === "primary"
                  ? "bg-slate-800 text-white hover:bg-slate-700 border-slate-800 w-full"
                  : "bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 hover:border-slate-400 w-full"
              }`}
            >
              {button.title}
            </Button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const FeaturedBookCard = ({ book }: { book: BookProps }) => (
  <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-sm shadow-xl shadow-slate-200/50 p-8 md:p-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
      {/* Enhanced Book Cover */}
      <div className="flex justify-center md:justify-start">
        <div className="group">
          <img
            src={book.image.src}
            className="w-full max-w-[240px] aspect-[3/4] object-contain rounded-sm shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-105"
            alt={book.image.alt}
          />
        </div>
      </div>

      {/* Content */}
      <div className="md:col-span-2 space-y-6 text-center md:text-left">
        {/* Tags and Impact */}
        {(book.tags || book.impact) && (
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {book.tags?.map((tag, index) => (
              <span
                key={`tag-${index}`}
                className="px-3 py-1 bg-slate-800 text-white text-sm font-medium rounded-sm"
              >
                {tag}
              </span>
            ))}
            {book.impact?.map((impact, index) => (
              <span
                key={`impact-${index}`}
                className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-sm"
              >
                {impact}
              </span>
            ))}
          </div>
        )}

        {/* Title and Meta */}
        <div>
          <h3 className="text-3xl font-light text-slate-800 leading-tight font-serif md:text-4xl lg:text-5xl mb-3">
            {book.title}
          </h3>
          {book.subtitle && (
            <p className="text-xl font-light text-slate-700 leading-tight mb-4 md:text-2xl">
              {book.subtitle}
            </p>
          )}
          {(book.year || book.publisher) && (
            <p className="text-sm text-slate-500 font-light mb-4">
              {book.year} {book.publisher && `• ${book.publisher}`}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-lg text-slate-600 leading-relaxed font-light max-w-2xl">
          {book.description}
        </p>

        {/* Pull Quote */}
        {book.pullQuote && (
          <blockquote className="border-l-2 border-slate-300 pl-6 py-4 my-6">
            <p className="text-lg font-medium text-slate-700 italic leading-relaxed">
              "{book.pullQuote}"
            </p>
            {book.quoteSource && (
              <cite className="text-sm text-slate-600 font-light mt-2 block">
                — {book.quoteSource}
              </cite>
            )}
          </blockquote>
        )}

        {/* Enhanced Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          {book.buttons.map((button, buttonIndex) => (
            <Button
              key={buttonIndex}
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
      </div>
    </div>
  </div>
);

export const BooksDefaults: Props = {
  tagline: "Published Works",
  heading: "Essential Books on Economics and Banking",
  description:
    "Discover Professor Werner's influential publications that reveal how money creation and banking shape global economies — challenging mainstream economics and offering fresh perspectives on policy and reform.",
  socialProof:
    "Featured in BBC Documentary Princes of the Yen and cited in research by universities worldwide.",
  books: [
    {
      title: "Princes of the Yen",
      subtitle: "Japan's Central Bankers and the Transformation of the Economy",
      description:
        "A revelatory investigation into the Bank of Japan's role in Japan's economic boom and bust cycles. This book exposes how central banking decisions shape entire economies and introduces the concept of 'quantitative easing' to the world.",
      year: "2003",
      publisher: "M.E. Sharpe",
      image: {
        src: "/princes.png",
        alt: "Princes of the Yen book cover",
      },
      isFeatured: true,
      tags: ["🏛️ Central Banking", "💡 Quantitative Easing"],
      impact: ["BBC Documentary", "Policy Influence"],
      pullQuote:
        "A rare insider look at how central banks shape entire economies.",
      quoteSource: "BBC Documentary",
      buttons: [
        { title: "📖 Read Summary", variant: "primary" },
        { title: "🛒 Buy on Amazon", variant: "secondary" },
      ],
    },
    {
      title: "New Paradigm in Macroeconomics",
      subtitle: "Solving the Riddle of Japanese Macroeconomic Performance",
      description:
        "A rethinking of macroeconomic theory through Japan's experience, offering new frameworks for understanding recessions and monetary policy.",
      year: "2005",
      publisher: "Palgrave Macmillan",
      image: {
        src: "https://via.placeholder.com/300x400/9ca3af/ffffff?text=New+Paradigm+in+Macroeconomics",
        alt: "New Paradigm in Macroeconomics book cover",
      },
      tags: ["📊 Macroeconomics", "🔬 Theory"],
      impact: ["Academic Citation"],
      buttons: [
        { title: "📖 Read Summary", variant: "primary" },
        { title: "🛒 Buy from Publisher", variant: "secondary" },
      ],
    },
    {
      title: "Where Does Money Come From?",
      subtitle: "A Guide to the UK Monetary and Banking System",
      description:
        "Explains modern money creation and how commercial banks actually operate — a clear guide for students, researchers, and policymakers.",
      year: "2011",
      publisher: "New Economics Foundation",
      image: {
        src: "https://via.placeholder.com/300x400/9ca3af/ffffff?text=Where+Does+Money+Come+From%3F",
        alt: "Where Does Money Come From book cover",
      },
      tags: ["💰 Money Creation", "🏦 Banking"],
      impact: ["Education Resource"],
      buttons: [
        { title: "📖 Read Summary", variant: "primary" },
        { title: "📚 Get Free Copy", variant: "secondary" },
      ],
    },
    {
      title: "The Yen Conspiracy",
      subtitle: "How to Invest in Japan's Next Economic Boom",
      description:
        "Connects decades of research on Japanese finance with investment implications, revealing the forces behind future economic cycles.",
      year: "2018",
      publisher: "Independent",
      image: {
        src: "https://via.placeholder.com/300x400/9ca3af/ffffff?text=The+Yen+Conspiracy",
        alt: "The Yen Conspiracy book cover",
      },
      tags: ["📈 Investment", "🇯🇵 Japan"],
      impact: ["Market Analysis"],
      buttons: [
        { title: "📖 Read Summary", variant: "primary" },
        { title: "🛒 Purchase", variant: "secondary" },
      ],
    },
  ],
};
