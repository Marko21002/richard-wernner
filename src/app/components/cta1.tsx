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
                  className="px-8 py-4 text-base font-medium tracking-wide transition-all duration-300 transform hover:scale-105 bg-red-600 text-white hover:bg-red-700 border-red-600 shadow-lg hover:shadow-xl flex items-center gap-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={20}
                    height={20}
                    className="text-white"
                    fill="none"
                  >
                    <path
                      d="M12 20.5C13.8097 20.5 15.5451 20.3212 17.1534 19.9934C19.1623 19.5839 20.1668 19.3791 21.0834 18.2006C22 17.0221 22 15.6693 22 12.9635V11.0365C22 8.33073 22 6.97787 21.0834 5.79937C20.1668 4.62088 19.1623 4.41613 17.1534 4.00662C15.5451 3.67877 13.8097 3.5 12 3.5C10.1903 3.5 8.45489 3.67877 6.84656 4.00662C4.83766 4.41613 3.83321 4.62088 2.9166 5.79937C2 6.97787 2 8.33073 2 11.0365V12.9635C2 15.6693 2 17.0221 2.9166 18.2006C3.83321 19.3791 4.83766 19.5839 6.84656 19.9934C8.45489 20.3212 10.1903 20.5 12 20.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M15.9621 12.3129C15.8137 12.9187 15.0241 13.3538 13.4449 14.2241C11.7272 15.1705 10.8684 15.6438 10.1728 15.4615C9.9372 15.3997 9.7202 15.2911 9.53799 15.1438C9 14.7089 9 13.8059 9 12C9 10.1941 9 9.29112 9.53799 8.85618C9.7202 8.70886 9.9372 8.60029 10.1728 8.53854C10.8684 8.35621 11.7272 8.82945 13.4449 9.77593C15.0241 10.6462 15.8137 11.0813 15.9621 11.6871C16.0126 11.8933 16.0126 12.1067 15.9621 12.3129Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
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
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={32}
              height={32}
              className="text-white"
              fill="none"
            >
              <path
                d="M12 20.5C13.8097 20.5 15.5451 20.3212 17.1534 19.9934C19.1623 19.5839 20.1668 19.3791 21.0834 18.2006C22 17.0221 22 15.6693 22 12.9635V11.0365C22 8.33073 22 6.97787 21.0834 5.79937C20.1668 4.62088 19.1623 4.41613 17.1534 4.00662C15.5451 3.67877 13.8097 3.5 12 3.5C10.1903 3.5 8.45489 3.67877 6.84656 4.00662C4.83766 4.41613 3.83321 4.62088 2.9166 5.79937C2 6.97787 2 8.33073 2 11.0365V12.9635C2 15.6693 2 17.0221 2.9166 18.2006C3.83321 19.3791 4.83766 19.5839 6.84656 19.9934C8.45489 20.3212 10.1903 20.5 12 20.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M15.9621 12.3129C15.8137 12.9187 15.0241 13.3538 13.4449 14.2241C11.7272 15.1705 10.8684 15.6438 10.1728 15.4615C9.9372 15.3997 9.7202 15.2911 9.53799 15.1438C9 14.7089 9 13.8059 9 12C9 10.1941 9 9.29112 9.53799 8.85618C9.7202 8.70886 9.9372 8.60029 10.1728 8.53854C10.8684 8.35621 11.7272 8.82945 13.4449 9.77593C15.0241 10.6462 15.8137 11.0813 15.9621 11.6871C16.0126 11.8933 16.0126 12.1067 15.9621 12.3129Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
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
    { title: "Subscribe on YouTube", variant: "primary" },
    { title: "▶ Watch Most Recent Episode", variant: "secondary" },
  ],
  image: {
    src: "/youtube.jpg",
    alt: "Professor Werner YouTube Channel",
  },
  videoThumbnail: {
    src: "/youtube.jpg",
    alt: "Professor Werner Latest Video",
  },
  isVideo: true,
};
