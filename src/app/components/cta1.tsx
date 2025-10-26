import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  subscriberCount: string;
  socialProof: string;
  socialProofBadges: string[];
  buttons: ButtonProps[];
  image: ImageProps;
  videoThumbnail?: ImageProps;
  isVideo?: boolean;
};

export type Cta1Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Cta1 = (props: Cta1Props) => {
  const {
    tagline,
    heading,
    description,
    subscriberCount,
    socialProof,
    socialProofBadges,
    buttons,
    image,
    videoThumbnail,
    isVideo,
  } = {
    ...Cta1Defaults,
    ...props,
  };
  return (
    <section
      id="relume"
      className="px-[5%] py-20 md:py-32 lg:py-40 bg-gradient-to-br from-slate-50/50 to-white"
    >
      <div className="container max-w-7xl">
        <div className="grid grid-cols-1 gap-x-20 gap-y-16 md:gap-y-20 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8 lg:pr-8">
            {/* Enhanced Header with Tagline */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-slate-600 tracking-wide uppercase">
                {tagline}
              </p>
              <h2 className="text-4xl font-light text-slate-800 leading-tight tracking-tight font-serif md:text-5xl lg:text-6xl">
                {heading}
              </h2>
            </div>

            <p className="text-lg leading-relaxed text-slate-600 font-light max-w-lg md:text-xl">
              {description}
            </p>

            {/* Enhanced CTA Section */}
            <div className="pt-4 space-y-6">
              {/* Primary CTA with Enhanced Social Proof */}
              <div className="space-y-3">
                <Button
                  {...buttons[0]}
                  className="px-8 py-4 text-base font-medium tracking-wide transition-all duration-300 transform hover:scale-105 bg-red-600 text-white hover:bg-red-700 border-red-600 shadow-lg hover:shadow-xl"
                >
                  {buttons[0].title}
                </Button>
                <p className="text-sm text-slate-600 font-light leading-relaxed">
                  {subscriberCount}
                </p>
              </div>

              {/* Visual Divider */}
              <div className="w-12 h-px bg-slate-200"></div>

              {/* Secondary CTA */}
              <div>
                <Button
                  {...buttons[1]}
                  className="px-8 py-3 text-sm font-medium tracking-wide transition-all duration-300 bg-white text-slate-800 border-2 border-slate-300 hover:bg-slate-50 hover:border-slate-400 shadow-md hover:shadow-lg"
                >
                  {buttons[1].title}
                </Button>
              </div>

              {/* Enhanced Social Proof with Badges */}
              <div className="space-y-3">
                <p className="text-sm text-slate-500 font-light">
                  Featured by:
                </p>
                <div className="flex flex-wrap gap-2">
                  {socialProofBadges.map((badge, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-sm border border-slate-200"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Video/Image Section */}
          <div className="relative max-w-lg mx-auto lg:max-w-none">
            <VideoPreview
              image={videoThumbnail || image}
              isVideo={isVideo}
              alt={image.alt}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const VideoPreview = ({
  image,
  isVideo,
  alt,
}: {
  image: ImageProps;
  isVideo?: boolean;
  alt?: string;
}) => (
  <div className="group relative cursor-pointer">
    <div className="aspect-[4/3] overflow-hidden rounded-sm shadow-2xl shadow-slate-200/50 group-hover:shadow-3xl transition-shadow duration-300">
      <img
        src={image.src}
        className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
        alt={alt || image.alt}
      />

      {/* Video Play Overlay */}
      {isVideo && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all duration-300">
          <div className="bg-red-600 group-hover:bg-red-700 rounded-full p-6 transform group-hover:scale-110 transition-all duration-300 shadow-2xl">
            <svg
              className="w-8 h-8 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Hover Text Overlay */}
      {isVideo && (
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-sm font-medium bg-black/60 px-3 py-2 rounded-sm backdrop-blur-sm">
            ▶ Play Latest Video
          </p>
        </div>
      )}
    </div>
  </div>
);

export const Cta1Defaults: Props = {
  tagline: "On YouTube",
  heading: "Understand How the Economy Really Works",
  description:
    "Join Professor Werner for clear, engaging discussions on money creation, banking reform, and the real economy. Through real-world examples and Q&A sessions, he explains complex ideas in a practical, evidence-based way — for students, professionals, and anyone curious about how finance truly functions.",
  subscriberCount:
    "Join 60,000+ viewers learning about money, banking, and policy.",
  socialProof: "Featured by BBC, Real Vision, and international media.",
  socialProofBadges: ["BBC", "Real Vision", "International Media"],
  buttons: [
    { title: "🔴 Subscribe on YouTube", variant: "primary" },
    { title: "▶ Watch Most Recent Episode", variant: "secondary" },
  ],
  image: {
    src: "/proffesor.jpg",
    alt: "Professor Werner YouTube Channel",
  },
  videoThumbnail: {
    src: "/proffesor.jpg", // This would be replaced with actual video thumbnail
    alt: "Professor Werner Latest Video",
  },
  isVideo: true,
};
