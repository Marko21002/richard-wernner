import { Course } from "../components/Course";
import { Footer } from "../components/Footer";
import { Hero } from "./Hero";
import { Testimonial1 } from "./Testimonial1";
import { Course2 } from "./Course2";
import { Faq } from "./Faq";
import CourseNavbar from "./components/navbar";

export default function CoursePage() {
  return (
    <div>
      <CourseNavbar />
      <Hero
        buttons={[
          {
            title: "Enroll now",
            variant: "primary",
            href: "https://buy.polar.sh/polar_cl_zPyR4fHIjxLukXVA8Q4vUz7yFrBpoNnFGNB8z1DtA6Q",
          },
          {
            title: "View full curriculum",
            variant: "secondary",
            href: "#course",
          },
        ]}
      />
      <Course
        buttons={[
          {
            title: "Enroll in the masterclass",
            variant: "primary",
            href: "https://buy.polar.sh/polar_cl_zPyR4fHIjxLukXVA8Q4vUz7yFrBpoNnFGNB8z1DtA6Q",
          },
          {
            title: "Already enrolled? Log in",
            variant: "secondary",
            href: "/login",
          },
        ]}
      />
      <Faq />
      <Footer />
    </div>
  );
}
