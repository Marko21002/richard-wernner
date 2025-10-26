"use client";

import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";

type ContactInfo = {
  label: string;
  value: string;
  icon: string;
  href?: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  contactInfo: ContactInfo[];
  formFields: {
    name: string;
    email: string;
    subject: string;
    message: string;
    submitButton: ButtonProps;
  };
  socialLinks?: {
    label: string;
    url: string;
    icon: string;
  }[];
};

export type ContactsProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Contacts = (props: ContactsProps) => {
  const {
    tagline,
    heading,
    description,
    contactInfo,
    formFields,
    socialLinks,
  } = {
    ...ContactsDefaults,
    ...props,
  };

  return (
    <section
      id="contact"
      className="px-[5%] py-20 md:py-32 lg:py-40 bg-slate-50"
    >
      <div className="container max-w-7xl">
        {/* Header */}
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

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-light text-slate-800 font-serif mb-6 md:text-3xl">
                Get in Touch
              </h3>
              <p className="text-slate-600 font-light leading-relaxed mb-8">
                Whether you're interested in academic collaboration, media
                inquiries, or have questions about economic research, I'd be
                happy to hear from you.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <ContactItem key={index} info={info} />
              ))}
            </div>

            {/* Social Links */}
            {socialLinks && socialLinks.length > 0 && (
              <div className="pt-8 border-t border-slate-200">
                <h4 className="text-lg font-medium text-slate-800 mb-4">
                  Follow My Work
                </h4>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-sm transition-all duration-200 hover:shadow-sm"
                    >
                      <span className="text-lg">{link.icon}</span>
                      <span className="text-sm font-medium">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="bg-white border border-slate-200 rounded-sm shadow-lg p-8 md:p-10">
            <ContactForm formFields={formFields} />
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactItem = ({ info }: { info: ContactInfo }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 w-12 h-12 bg-slate-800 text-white rounded-sm flex items-center justify-center">
      <span className="text-lg">{info.icon}</span>
    </div>
    <div>
      <h4 className="text-base font-medium text-slate-800 mb-1">
        {info.label}
      </h4>
      {info.href ? (
        <a
          href={info.href}
          className="text-slate-600 hover:text-slate-800 font-light transition-colors duration-200"
        >
          {info.value}
        </a>
      ) : (
        <p className="text-slate-600 font-light">{info.value}</p>
      )}
    </div>
  </div>
);

const ContactForm = ({ formFields }: { formFields: Props["formFields"] }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-2xl font-light text-slate-800 font-serif mb-6 md:text-3xl">
          Send a Message
        </h3>
      </div>

      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 border border-slate-300 rounded-sm focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all duration-200 font-light"
          placeholder={formFields.name}
        />
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 border border-slate-300 rounded-sm focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all duration-200 font-light"
          placeholder={formFields.email}
        />
      </div>

      {/* Subject Field */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="w-full px-4 py-3 border border-slate-300 rounded-sm focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all duration-200 font-light"
          placeholder={formFields.subject}
        />
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full px-4 py-3 border border-slate-300 rounded-sm focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all duration-200 font-light resize-vertical"
          placeholder={formFields.message}
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          {...formFields.submitButton}
          type="submit"
          className="w-full px-8 py-4 text-base font-medium tracking-wide bg-slate-800 text-white hover:bg-slate-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          {formFields.submitButton.title}
        </Button>
        <p className="text-sm text-slate-500 font-light mt-3 text-center">
          I'll respond to your message within 24-48 hours.
        </p>
      </div>
    </form>
  );
};

export const ContactsDefaults: Props = {
  tagline: "Get in Touch",
  heading: "Connect with Professor Werner",
  description:
    "I welcome inquiries from researchers, students, media, and policymakers interested in monetary economics, banking systems, and economic reform. Let's start a conversation about the future of finance.",
  contactInfo: [
    {
      label: "Email",
      value: "contact@richardawerner.com",
      icon: "📧",
      href: "mailto:contact@richardawerner.com",
    },
    {
      label: "Office Phone",
      value: "+44 (0) 1234 567 890",
      icon: "📞",
      href: "tel:+441234567890",
    },
    {
      label: "University Office",
      value: "Winchester Business School\nWinchester, United Kingdom",
      icon: "🏢",
    },
    {
      label: "Response Time",
      value: "24-48 hours for most inquiries",
      icon: "⏱️",
    },
  ],
  formFields: {
    name: "Enter your full name",
    email: "Enter your email address",
    subject: "What would you like to discuss?",
    message: "Tell me about your inquiry, research interest, or question...",
    submitButton: { title: "📤 Send Message" },
  },
  socialLinks: [
    {
      label: "YouTube",
      url: "#",
      icon: "📺",
    },
    {
      label: "Substack",
      url: "#",
      icon: "📰",
    },
    {
      label: "LinkedIn",
      url: "#",
      icon: "💼",
    },
    {
      label: "Twitter",
      url: "#",
      icon: "🐦",
    },
  ],
};
