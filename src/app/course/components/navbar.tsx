import { Navbar2, Navbar2Props } from "@/app/components/Navbar2";

const courseNavLinks: Navbar2Props["navLinks"] = [
  { title: "Overview", url: "/course#course-hero" },
  { title: "Curriculum", url: "/course#course-collection" },
  { title: "Testimonials", url: "/course#testimonials" },
  { title: "FAQ", url: "/course#faq" },
];

const courseLogo: Navbar2Props["logo"] = {
  src: "/logo.png",
  alt: "Werner Finance Academy",
  className: "max-h-14 md:max-h-16",
};

const CourseNavbar = (props: Navbar2Props) => {
  return (
    <Navbar2
      {...props}
      logo={props.logo ?? courseLogo}
      navLinks={props.navLinks ?? courseNavLinks}
    />
  );
};

export { CourseNavbar };
export default CourseNavbar;
