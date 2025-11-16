"use client";

import { useState, useEffect } from "react";
import { Button, useMediaQuery } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import { RxChevronDown } from "react-icons/rx";

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type NavLink = {
  url: string;
  title: string;
  subMenuLinks?: NavLink[];
};

type Props = {
  logo: ImageProps;
  navLinks: NavLink[];
  buttons: ButtonProps[];
};

export type Navbar2Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Navbar2 = (props: Navbar2Props) => {
  const { logo, navLinks, buttons } = {
    ...Navbar2Defaults,
    ...props,
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen, isMobile]);

  return (
    <section
      id="relume"
      className="z-[999] flex w-full items-center border-b border-slate-200 bg-slate-50/80 backdrop-blur-sm lg:min-h-18 lg:px-[5%]"
    >
      <div className="mx-auto size-full lg:grid lg:grid-cols-[0.375fr_1fr_0.375fr] lg:items-center lg:justify-between lg:gap-4">
        <div className="flex min-h-16 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:px-0">
          <a
            href="/"
            className="text-slate-900 text-lg font-semibold uppercase tracking-[0.24em] font-serif"
          >
            {logo.src ? (
              <img src={logo.src} alt={logo.alt} className="max-h-10" />
            ) : (
              "R.W ACADEMY"
            )}
          </a>
          <div className="flex items-center gap-4 lg:hidden">
            <div>
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  className="w-full px-4 py-1 bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition-all duration-200"
                  {...button}
                >
                  {button.title}
                </Button>
              ))}
            </div>
            <button
              className="-mr-2 flex size-12 flex-col items-center justify-center"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <motion.span
                className="my-[3px] h-0.5 w-6 bg-slate-700"
                animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
                variants={topLineVariants}
              />
              <motion.span
                className="my-[3px] h-0.5 w-6 bg-slate-700"
                animate={isMobileMenuOpen ? "open" : "closed"}
                variants={middleLineVariants}
              />
              <motion.span
                className="my-[3px] h-0.5 w-6 bg-slate-700"
                animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
                variants={bottomLineVariants}
              />
            </button>
          </div>
        </div>
        <motion.div
          variants={{
            open: {
              height: "var(--height-open, 100dvh)",
            },
            close: {
              height: "var(--height-closed, 0)",
            },
          }}
          animate={isMobileMenuOpen ? "open" : "close"}
          initial="close"
          exit="close"
          transition={{ duration: 0.4 }}
          className="overflow-hidden px-[5%] text-center bg-slate-50/95 backdrop-blur-sm lg:flex lg:items-center lg:justify-center lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto] lg:bg-transparent lg:backdrop-blur-none"
        >
          {navLinks.map((navLink, index) =>
            navLink.subMenuLinks && navLink.subMenuLinks.length > 0 ? (
              <SubMenu
                key={index}
                navLink={navLink}
                isMobile={isMobile}
                onMobileLinkClick={() => isMobile && setIsMobileMenuOpen(false)}
              />
            ) : (
              <a
                key={index}
                href={navLink.url}
                className="block py-3 text-md font-light text-slate-700 hover:text-slate-900 transition-colors duration-200 first:pt-7 lg:px-4 lg:py-2 lg:text-base first:lg:pt-2"
                onClick={() => isMobile && setIsMobileMenuOpen(false)}
              >
                {navLink.title}
              </a>
            )
          )}
        </motion.div>
        <div className="hidden justify-self-end lg:block">
          {buttons.map((button, index) => (
            <Button
              key={index}
              className="px-6 py-2 bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition-all duration-200"
              {...button}
            >
              {button.title}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

const SubMenu = ({
  navLink,
  isMobile,
  onMobileLinkClick,
}: {
  navLink: NavLink;
  isMobile: boolean;
  onMobileLinkClick?: () => void;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <section
      onMouseEnter={() => !isMobile && setIsDropdownOpen(true)}
      onMouseLeave={() => !isMobile && setIsDropdownOpen(false)}
    >
      <button
        className="flex w-full items-center justify-center gap-4 py-3 text-center text-md font-light text-slate-700 hover:text-slate-900 transition-colors duration-200 lg:w-auto lg:flex-none lg:justify-start lg:gap-2 lg:px-4 lg:py-2 lg:text-base"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <span>{navLink.title}</span>
        <motion.span
          animate={isDropdownOpen ? "rotated" : "initial"}
          variants={{
            rotated: { rotate: 180 },
            initial: { rotate: 0 },
          }}
          transition={{ duration: 0.3 }}
        >
          <RxChevronDown />
        </motion.span>
      </button>
      {isDropdownOpen && (
        <AnimatePresence>
          <motion.nav
            animate={isDropdownOpen ? "open" : "close"}
            initial="close"
            exit="close"
            variants={{
              open: {
                visibility: "visible",
                opacity: "var(--opacity-open, 100%)",
                y: 0,
              },
              close: {
                visibility: "hidden",
                opacity: "var(--opacity-close, 0)",
                y: "var(--y-close, 0%)",
              },
            }}
            transition={{ duration: 0.2 }}
            className="bg-slate-50/95 backdrop-blur-sm lg:absolute lg:z-[1000] lg:border lg:border-slate-200 lg:p-2 lg:rounded-sm lg:shadow-lg lg:[--y-close:25%]"
          >
            {navLink.subMenuLinks?.map((subMenuLink, index) => (
              <a
                key={index}
                href={subMenuLink.url}
                className="block py-3 text-center text-slate-700 hover:text-slate-900 font-light transition-colors duration-200 lg:px-4 lg:py-2 lg:text-left lg:hover:bg-slate-100/50 lg:rounded-sm"
                onClick={onMobileLinkClick}
              >
                {subMenuLink.title}
              </a>
            ))}
          </motion.nav>
        </AnimatePresence>
      )}
    </section>
  );
};

export const Navbar2Defaults: Props = {
  logo: {
    url: "#",
    src: "",
    alt: "R.W Academy",
  },
  navLinks: [
    { title: "Research", url: "#research" },
    { title: "Publications", url: "#publications" },
    { title: "Teaching", url: "#teaching" },
    {
      title: "About",
      url: "#about",
      subMenuLinks: [
        { title: "Biography", url: "#biography" },
        { title: "CV", url: "#cv" },
        { title: "Awards & Recognition", url: "#awards" },
      ],
    },
  ],
  buttons: [
    {
      title: "Contact",
      size: "sm",
    },
  ],
};

const topLineVariants = {
  open: {
    translateY: 8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: -45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};

const middleLineVariants = {
  open: {
    width: 0,
    transition: { duration: 0.1 },
  },
  closed: {
    width: "1.5rem",
    transition: { delay: 0.3, duration: 0.2 },
  },
};

const bottomLineVariants = {
  open: {
    translateY: -8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: 45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};
