import { Button } from "@relume_io/relume-ui";

type LinkProps = {
  title: string;
  url: string;
};

type SocialLinkProps = {
  platform: string;
  url: string;
  icon: React.ReactNode;
};

type Props = {
  logo: {
    name: string;
    tagline: string;
  };
  description: string;
  navigationLinks: {
    title: string;
    links: LinkProps[];
  }[];
  socialLinks: SocialLinkProps[];
  contact: {
    email: string;
    phone?: string;
    address?: string;
  };
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
  };
  copyright: string;
  legalLinks: LinkProps[];
};

export type FooterProps = React.ComponentPropsWithoutRef<"footer"> &
  Partial<Props>;

export const Footer = (props: FooterProps) => {
  const {
    logo,
    description,
    navigationLinks,
    socialLinks,
    contact,
    newsletter,
    copyright,
    legalLinks,
  } = {
    ...FooterDefaults,
    ...props,
  };

  return (
    <footer className="px-[5%] py-16 md:py-20 lg:py-24 bg-slate-900 text-white">
      <div className="container max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 md:gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h3 className="text-2xl font-light font-serif text-white mb-2">
                {logo.name}
              </h3>
              <p className="text-sm text-slate-400 font-light">
                {logo.tagline}
              </p>
            </div>

            <p className="text-slate-300 font-light leading-relaxed">
              {description}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="text-slate-400 hover:text-white transition-colors duration-200"
                  aria-label={social.platform}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          {navigationLinks.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-4">
              <h4 className="text-lg font-medium text-white">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.url}
                      className="text-slate-300 hover:text-white font-light transition-colors duration-200"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-white mb-4">
                {newsletter.title}
              </h4>
              <p className="text-slate-300 font-light text-sm mb-4">
                {newsletter.description}
              </p>

              <form className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder={newsletter.placeholder}
                  className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent text-sm"
                />
                <Button className="px-4 py-2 text-sm bg-white text-slate-900 hover:bg-slate-100 transition-colors duration-200 font-medium">
                  Subscribe
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-medium text-white mb-4">Contact</h4>
              <div className="space-y-2 text-sm">
                <a
                  href={`mailto:${contact.email}`}
                  className="block text-slate-300 hover:text-white font-light transition-colors duration-200"
                >
                  {contact.email}
                </a>
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="block text-slate-300 hover:text-white font-light transition-colors duration-200"
                  >
                    {contact.phone}
                  </a>
                )}
                {contact.address && (
                  <p className="text-slate-300 font-light">{contact.address}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <p className="text-sm text-slate-400 font-light">{copyright}</p>

            <div className="flex flex-wrap items-center gap-6">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-sm text-slate-400 hover:text-white font-light transition-colors duration-200"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const FooterDefaults: Props = {
  logo: {
    name: "Professor Richard A. Werner",
    tagline: "Economist • Author • Banking Expert",
  },
  description:
    "Leading research on money creation, banking systems, and economic policy. Bringing clarity to complex economic concepts through evidence-based analysis and accessible communication.",
  navigationLinks: [
    {
      title: "Research",
      links: [
        { title: "Published Works", url: "#books" },
        { title: "Academic Papers", url: "#research" },
        { title: "Media Appearances", url: "#media" },
        { title: "Speaking Events", url: "#events" },
      ],
    },
    {
      title: "Publications",
      links: [
        { title: "Substack Newsletter", url: "#substack" },
        { title: "Latest Articles", url: "#articles" },
        { title: "Book Store", url: "#books" },
        { title: "Free Resources", url: "#resources" },
      ],
    },
  ],
  socialLinks: [
    {
      platform: "YouTube",
      url: "#",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      platform: "Twitter",
      url: "#",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
      ),
    },
    {
      platform: "LinkedIn",
      url: "#",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      platform: "Telegram",
      url: "#",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
    },
  ],
  contact: {
    email: "contact@richardwerner.net",
    address: "University of Southampton\nSouthampton, UK",
  },
  newsletter: {
    title: "Stay Updated",
    description:
      "Get notified about new research, articles, and speaking events.",
    placeholder: "Enter your email",
  },
  copyright: "© 2024 Professor Richard A. Werner. All rights reserved.",
  legalLinks: [
    { title: "Privacy Policy", url: "#privacy" },
    { title: "Terms of Service", url: "#terms" },
    { title: "Cookies", url: "#cookies" },
  ],
};
