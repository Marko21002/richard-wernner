import { RxArrowRight } from "react-icons/rx";

type CourseCard = {
  id: string;
  title: string;
  description: string;
  lessons: number;
  duration: string;
  students: number;
  price: string;
  rating: number;
  image: string;
  instructor: {
    name: string;
    avatar: string;
  };
};

type Props = {
  eyebrow: string;
  heading: string;
  ctaLabel: string;
  ctaHref: string;
  courses: CourseCard[];
};

export type Course2Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Course2 = (props: Course2Props) => {
  const { eyebrow, heading, ctaLabel, ctaHref, courses } = {
    ...Course2Defaults,
    ...props,
  };

  return (
    <section
      id="course-collection"
      className="px-[5%] py-20 md:py-28 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container max-w-7xl relative z-10">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-6 md:mb-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              {eyebrow}
            </p>
            <h2 className="mt-2 text-4xl font-light text-slate-900 tracking-tight font-serif md:text-5xl">
              {heading}
            </h2>
          </div>
          <a
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-700 shadow-md transition hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-lg"
          >
            {ctaLabel}
            <RxArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <article
              key={course.id}
              className="flex h-full flex-col overflow-hidden rounded-sm border border-slate-200 bg-white shadow-lg shadow-slate-200/60 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative">
                <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-800 shadow">
                  ⭐ {course.rating.toFixed(1)}
                </span>
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-48 w-full object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-medium text-slate-900 leading-tight font-serif">
                  {course.title}
                </h3>
                <p className="mt-3 flex-1 text-sm text-slate-600 leading-relaxed">
                  {course.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-3 text-xs text-slate-500">
                  <span className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1">
                    📘 {course.lessons} lessons
                  </span>
                  <span className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1">
                    ⏱️ {course.duration}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1">
                    👥 {course.students} learners
                  </span>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      className="h-10 w-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {course.instructor.name}
                      </p>
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                        Instructor
                      </p>
                    </div>
                  </div>
                  <span className="text-lg font-semibold text-slate-900">
                    {course.price}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Course2Defaults: Props = {
  eyebrow: "Werner Courses",
  heading: "Most Popular Research Programs",
  ctaLabel: "View all courses",
  ctaHref: "/course",
  courses: [
    {
      id: "1",
      title: "Bank Credit Creation Intensive",
      description:
        "Dive into the mechanics of bank credit and its impact on economic cycles, featuring Werner's original case studies.",
      lessons: 32,
      duration: "7h 15m",
      students: 987,
      price: "$297",
      rating: 4.9,
      image: "/economy.jpg",
      instructor: {
        name: "Prof. Richard A. Werner",
        avatar: "/proffesor.jpg",
      },
    },
    {
      id: "2",
      title: "Community Banking Blueprint",
      description:
        "Step-by-step roadmap for launching regional banks focused on local prosperity and sustainable growth.",
      lessons: 24,
      duration: "5h 45m",
      students: 642,
      price: "$249",
      rating: 4.8,
      image: "/economy.jpg",
      instructor: {
        name: "Prof. Richard A. Werner",
        avatar: "/proffesor.jpg",
      },
    },
    {
      id: "3",
      title: "Monetary Policy Masterclass",
      description:
        "Understand central banking decisions through the lens of the Quantity Theory of Credit and modern QE strategies.",
      lessons: 28,
      duration: "6h 20m",
      students: 754,
      price: "$329",
      rating: 5.0,
      image: "/economy.jpg",
      instructor: {
        name: "Prof. Richard A. Werner",
        avatar: "/proffesor.jpg",
      },
    },
    {
      id: "4",
      title: "Sustainable Economics Lab",
      description:
        "Practical frameworks for implementing ecological sustainability in banking and investment portfolios.",
      lessons: 18,
      duration: "4h 50m",
      students: 488,
      price: "$219",
      rating: 4.7,
      image: "/economy.jpg",
      instructor: {
        name: "Prof. Richard A. Werner",
        avatar: "/proffesor.jpg",
      },
    },
    {
      id: "5",
      title: "Asian Financial Crises Case Study",
      description:
        "Detailed breakdown of the Japanese asset bubble and Asian financial crises, including policy lessons and reforms.",
      lessons: 20,
      duration: "5h 05m",
      students: 561,
      price: "$279",
      rating: 4.8,
      image: "/economy.jpg",
      instructor: {
        name: "Prof. Richard A. Werner",
        avatar: "/proffesor.jpg",
      },
    },
    {
      id: "6",
      title: "Quantitative Easing Explained",
      description:
        "Learn the origins of QE from the economist who coined the term, plus insights on future monetary innovations.",
      lessons: 22,
      duration: "5h 30m",
      students: 712,
      price: "$309",
      rating: 4.9,
      image: "/economy.jpg",
      instructor: {
        name: "Prof. Richard A. Werner",
        avatar: "/proffesor.jpg",
      },
    },
  ],
};

export default Course2;
