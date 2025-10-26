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
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  books: BookProps[];
};

export type BooksProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Books = (props: BooksProps) => {
  const { tagline, heading, description, books } = {
    ...BooksDefaults,
    ...props,
  };

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

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-16 xl:gap-20">
          {books.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

const BookCard = ({ book }: { book: BookProps }) => (
  <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-8">
    <div className="flex-shrink-0">
      <div className="w-full max-w-[200px] mx-auto md:w-[200px]">
        <img
          src={book.image.src}
          className="w-full aspect-[3/4] object-contain rounded-sm shadow-lg shadow-slate-200/50"
          alt={book.image.alt}
        />
      </div>
    </div>

    <div className="flex-1 space-y-4">
      <div>
        <h3 className="text-2xl font-light text-slate-800 leading-tight font-serif md:text-3xl">
          {book.title}
        </h3>
        {book.subtitle && (
          <p className="mt-2 text-lg font-light text-slate-700">
            {book.subtitle}
          </p>
        )}
        {(book.year || book.publisher) && (
          <p className="mt-2 text-sm text-slate-500 font-light">
            {book.year} {book.publisher && `• ${book.publisher}`}
          </p>
        )}
      </div>

      <p className="text-slate-600 leading-relaxed font-light">
        {book.description}
      </p>

      <div className="flex flex-wrap gap-4 pt-2">
        {book.buttons.map((button, buttonIndex) => (
          <Button
            key={buttonIndex}
            {...button}
            className={`px-6 py-2 text-sm font-medium tracking-wide transition-all duration-200 ${
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
  </div>
);

export const BooksDefaults: Props = {
  tagline: "Published Works",
  heading: "Essential Books on Economics and Banking",
  description:
    "Explore Professor Werner's groundbreaking publications that challenge conventional economic thinking and offer new insights into how banking and monetary systems really work.",
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
      buttons: [
        { title: "📖 Read Online", variant: "primary" },
        { title: "🛒 Purchase", variant: "secondary" },
      ],
    },
    {
      title: "New Paradigm in Macroeconomics",
      subtitle: "Solving the Riddle of Japanese Macroeconomic Performance",
      description:
        "A comprehensive analysis of Japanese economic policy and performance, offering new theoretical frameworks for understanding macroeconomic phenomena. This work challenges traditional economic models and proposes innovative solutions.",
      year: "2005",
      publisher: "Palgrave Macmillan",
      image: {
        src: "https://via.placeholder.com/300x400/9ca3af/ffffff?text=New+Paradigm+in+Macroeconomics",
        alt: "New Paradigm in Macroeconomics book cover",
      },
      buttons: [
        { title: "📖 Read Online", variant: "primary" },
        { title: "🛒 Purchase", variant: "secondary" },
      ],
    },
    {
      title: "Where Does Money Come From?",
      subtitle: "A Guide to the UK Monetary and Banking System",
      description:
        "Co-authored with Josh Ryan-Collins, Tony Greenham, and Andrew Jackson, this accessible guide explains how money is created in modern economies and challenges common misconceptions about banking and monetary policy.",
      year: "2011",
      publisher: "New Economics Foundation",
      image: {
        src: "https://via.placeholder.com/300x400/9ca3af/ffffff?text=Where+Does+Money+Come+From%3F",
        alt: "Where Does Money Come From book cover",
      },
      buttons: [
        { title: "📖 Read Online", variant: "primary" },
        { title: "🛒 Purchase", variant: "secondary" },
      ],
    },
    {
      title: "The Yen Conspiracy",
      subtitle: "How to Invest in the Coming Japanese Economic Boom",
      description:
        "An investment-focused analysis that predicted Japan's economic recovery and provided insights into the mechanisms of economic cycles. This book demonstrates the practical applications of Werner's theoretical work.",
      year: "2018",
      publisher: "Independent",
      image: {
        src: "https://via.placeholder.com/300x400/9ca3af/ffffff?text=The+Yen+Conspiracy",
        alt: "The Yen Conspiracy book cover",
      },
      buttons: [
        { title: "📖 Read Online", variant: "primary" },
        { title: "🛒 Purchase", variant: "secondary" },
      ],
    },
  ],
};
