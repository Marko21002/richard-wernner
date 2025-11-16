type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  quoteStart: string;
  quoteHighlight: string;
  quoteEnd: string;
  name: string;
  role: string;
  avatar: ImageProps;
};

export type Testimonial1Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Testimonial1 = (props: Testimonial1Props) => {
  const { quoteStart, quoteHighlight, quoteEnd, name, role, avatar } = {
    ...Testimonial1Defaults,
    ...props,
  };

  return (
    <section
      id="testimonial"
      className="px-[5%] py-20 md:py-28 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container max-w-7xl relative z-10">
        <figure className="text-center">
          <blockquote className="mx-auto max-w-4xl">
            <p className="text-2xl leading-[1.45] text-slate-900 md:text-[32px] font-light">
              <span className="font-serif text-[1.05em]">“</span>
              {quoteStart}
              <mark className="mx-1 inline rounded-sm bg-orange-500 px-2 py-1 text-white shadow-[0_2px_0_rgba(0,0,0,0.06)]">
                {quoteHighlight}
              </mark>
              {quoteEnd}
              <span className="font-serif text-[1.05em]">”</span>
            </p>
          </blockquote>

          <figcaption className="mt-10 md:mt-12">
            <div className="mx-auto h-20 w-20 overflow-hidden rounded-full border border-slate-200 shadow-md shadow-slate-200/60">
              <img
                src={avatar.src}
                alt={avatar.alt}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-6 text-slate-900 text-2xl font-light font-serif">
              {name}
            </div>
            <div className="mt-2 text-slate-600 text-lg font-light">{role}</div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export const Testimonial1Defaults: Props = {
  quoteStart: "If you're just starting with banking and monetary economics,",
  quoteHighlight: "this course is a game‑changer",
  quoteEnd:
    ". The lectures break complex topics into simple terms and don't stop at the basics. Real case studies help solidify your learning.",
  name: "Predrag Rovcanin",
  role: "Lead Designer at Vix Nova agency",
  avatar: {
    src: "/princes.png",
    alt: "Student headshot",
  },
};

export default Testimonial1;
