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
      <Hero />
      <Course2 />
      <Course />
      <Faq />
      <Footer />
    </div>
  );
}
