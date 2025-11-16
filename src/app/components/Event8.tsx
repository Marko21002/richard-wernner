import type { ButtonProps } from "@relume_io/relume-ui";
import { Button } from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";

type ImageProps = {
  src: string;
  alt?: string;
};

type Date = {
  weekday: string;
  day: string;
  monthYear: string;
};

type FeaturedEvent = {
  url: string;
  image: ImageProps;
  date: Date;
  category: string;
  title: string;
  location: string;
  description: string;
  button: ButtonProps;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  button: ButtonProps;
  featuredEvents: FeaturedEvent[];
};

export type Event8Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Event8 = (props: Event8Props) => {
  const { tagline, heading, description, button, featuredEvents } = {
    ...Event8Defaults,
    ...props,
  };
  return (
    <section
      id="events"
      className="px-[5%] py-20 md:py-32 lg:py-40 bg-slate-50 relative overflow-hidden"
    >
      {/* Background Academic Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container max-w-7xl relative z-10">
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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {featuredEvents.map((event, index) => (
            <FeaturedEvent key={index} {...event} />
          ))}
        </div>

        <div className="mt-16 text-center md:mt-20">
          <Button
            {...button}
            className="px-8 py-3 text-sm font-medium tracking-wide transition-all duration-300 transform hover:scale-105 bg-slate-800 text-white hover:bg-slate-700 border-slate-800 shadow-lg hover:shadow-xl"
          >
            {button.title}
          </Button>
        </div>
      </div>
    </section>
  );
};

const FeaturedEvent: React.FC<FeaturedEvent> = ({
  url,
  image,
  date,
  category,
  title,
  location,
  description,
  button,
}) => {
  return (
    <article className="bg-white border border-slate-200 rounded-sm shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <a href={url} className="relative block w-full">
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute right-4 top-4 flex min-w-20 flex-col items-center bg-white/95 backdrop-blur-sm px-3 py-2 text-sm rounded-sm shadow-md border border-slate-200">
          <span className="text-xs text-slate-600 font-light uppercase tracking-wide">
            {date.weekday}
          </span>
          <span className="text-2xl font-light text-slate-800 font-serif leading-none">
            {date.day}
          </span>
          <span className="text-xs text-slate-600 font-light">
            {date.monthYear}
          </span>
        </div>
      </a>
      <div className="p-6 space-y-4">
        <div className="space-y-3">
          <span className="inline-block bg-slate-100 text-slate-700 px-3 py-1 text-xs font-medium rounded-sm uppercase tracking-wide">
            {category}
          </span>
          <a href={url} className="block">
            <h3 className="text-xl font-medium text-slate-800 leading-tight font-serif group-hover:text-slate-600 transition-colors duration-200 md:text-2xl">
              {title}
            </h3>
          </a>
          <div className="space-y-2">
            <p className="text-sm text-slate-600 font-medium flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-slate-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              {location}
            </p>
          </div>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed font-light">
          {description}
        </p>
        <div className="pt-2">
          <Button
            {...button}
            className="inline-flex items-center text-slate-700 hover:text-slate-900 font-medium transition-colors duration-200"
          >
            {button.title}
            {button.iconRight}
          </Button>
        </div>
      </div>
    </article>
  );
};

export const Event8Defaults: Props = {
  tagline: "Speaking Engagements",
  heading: "Upcoming Academic Events",
  description:
    "Join Professor Werner at conferences, lectures, and policy discussions worldwide. Stay informed about the latest developments in banking theory, monetary policy, and economic reform through these exclusive academic gatherings.",
  button: {
    variant: "secondary",
    size: "primary",
    title: "📅 View All Events",
  },
  featuredEvents: [
    {
      url: "#",
      image: {
        src: "/economy.jpg",
        alt: "Economic Policy Conference",
      },
      date: {
        weekday: "Wed",
        day: "15",
        monthYear: "May 2024",
      },
      category: "Keynote Speech",
      title: "The Future of Central Banking in the Digital Age",
      location: "London School of Economics, UK",
      description:
        "Professor Werner will deliver a keynote address on how digital currencies and fintech innovations are reshaping central banking practices and monetary policy frameworks.",
      button: {
        title: "Register Now",
        variant: "link",
        size: "link",
        iconRight: <RxChevronRight />,
      },
    },
    {
      url: "#",
      image: {
        src: "/economy.jpg",
        alt: "Banking Research Symposium",
      },
      date: {
        weekday: "Fri",
        day: "24",
        monthYear: "May 2024",
      },
      category: "Research Panel",
      title: "Money Creation and Economic Stability: New Evidence",
      location: "University of Oxford, UK",
      description:
        "An intensive research symposium presenting Professor Werner's latest findings on the relationship between credit creation, economic cycles, and financial stability.",
      button: {
        title: "Learn More",
        variant: "link",
        size: "link",
        iconRight: <RxChevronRight />,
      },
    },
    {
      url: "#",
      image: {
        src: "/economy.jpg",
        alt: "Policy Workshop Session",
      },
      date: {
        weekday: "Sat",
        day: "08",
        monthYear: "Jun 2024",
      },
      category: "Workshop",
      title: "Reforming Banking Systems: A Practitioner's Guide",
      location: "Frankfurt Institute, Germany",
      description:
        "A hands-on workshop for policymakers and banking professionals exploring practical approaches to implementing Werner's banking reform proposals in modern economies.",
      button: {
        title: "Apply Now",
        variant: "link",
        size: "link",
        iconRight: <RxChevronRight />,
      },
    },
  ],
};
