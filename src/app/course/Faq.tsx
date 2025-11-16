"use client";

import { useState } from "react";
import { RxChevronDown } from "react-icons/rx";

type FaqItem = {
  question: string;
  answer: string;
  category: string;
};

type Props = {
  heading: string;
  description: string;
  faqs: FaqItem[];
  contactCopy: string;
  contactCta: string;
  contactHref: string;
};

export type FaqProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Faq = (props: FaqProps) => {
  const { heading, description, faqs, contactCopy, contactCta, contactHref } = {
    ...FaqDefaults,
    ...props,
  };

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
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
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <h2 className="text-4xl font-light text-slate-900 tracking-tight font-serif md:text-5xl">
            {heading}
          </h2>
          <p className="mt-5 text-lg text-slate-600 font-light leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={`${faq.category}-${faq.question}`}
                className="rounded-sm border border-slate-200 bg-white shadow-lg shadow-slate-200/60"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition hover:bg-slate-50"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                >
                  <div>
                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                      {faq.category}
                    </span>
                    <h3 className="mt-3 text-lg font-medium text-slate-900 leading-snug md:text-xl">
                      {faq.question}
                    </h3>
                  </div>
                  <span
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <RxChevronDown className="h-5 w-5" />
                  </span>
                </button>
                {isOpen && (
                  <div
                    id={`faq-panel-${index}`}
                    className="border-t border-slate-100 px-6 pb-6 text-base text-slate-600 leading-relaxed"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-sm border border-slate-200 bg-white px-8 py-6 shadow-lg shadow-slate-200/60 md:px-12 md:py-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              Still curious?
            </p>
            <p className="mt-2 text-lg text-slate-700 font-light max-w-2xl">
              {contactCopy}
            </p>
          </div>
          <a
            href={contactHref}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-900 px-6 py-2 text-sm font-medium text-white shadow-md transition hover:bg-slate-800"
          >
            {contactCta}
          </a>
        </div>
      </div>
    </section>
  );
};

export const FaqDefaults: Props = {
  heading: "Frequently Asked Questions",
  description:
    "Everything you need to know about Professor Werner's courses, from access and certification to refunds and live support.",
  faqs: [
    {
      category: "Enrollment",
      question: "Who are Professor Werner's courses designed for?",
      answer:
        "The curriculum serves professionals in finance, policy, and academia as well as motivated beginners. Each module pairs foundational theory with case studies from Professor Werner's research, making the lessons accessible without sacrificing rigor.",
    },
    {
      category: "Access",
      question: "How long do I retain access to the course materials?",
      answer:
        "Enrollment includes lifetime access. You can revisit the lectures, slide decks, and downloadable resources whenever you need, including any future updates that are added to the program.",
    },
    {
      category: "Format",
      question: "Are there live Q&A sessions or office hours?",
      answer:
        "Yes. Each cohort receives quarterly live Q&A calls where Professor Werner answers questions and discusses recent developments. Replays are uploaded to the course portal in case you cannot attend live.",
    },
    {
      category: "Downloads",
      question: "Can I download the lecture slides and data sets?",
      answer:
        "Absolutely. Every lesson includes downloadable slide decks, supplementary readings, and where applicable, macroeconomic data sheets used during the lectures.",
    },
    {
      category: "Certification",
      question: "Do I earn a certificate upon completion?",
      answer:
        "Once you complete all modules and quizzes, you can download a personalized certificate signed by Professor Werner. Many alumni include it in their professional portfolios and continuing education records.",
    },
    {
      category: "Refunds",
      question: "What is your refund policy?",
      answer:
        "We offer a 30-day money-back guarantee. If you feel the course isn't the right fit, email our support team within 30 days of purchase and we'll process a full refund—no questions asked.",
    },
  ],
  contactCopy:
    "Need a custom invoice, group pricing, or guidance on which track fits your goals? Our academic support team responds within one business day.",
  contactCta: "Email the academy team",
  contactHref: "mailto:academy@richardwerner.com",
};

export default Faq;

