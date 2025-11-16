import { Course } from "../components/Course";
import { Navbar2 } from "../components/Navbar2";
import { Footer } from "../components/Footer";
import { Hero } from "./Hero";
import { Testimonial1 } from "./Testimonial1";
import { Course2 } from "./Course2";
import { Faq } from "./Faq";

export default function CoursePage() {
  return (
    <div>
      <Navbar2 />
      <Hero />
      <Course2 />
      <Course />
      <Faq />
      <Footer />
    </div>
  );
}
