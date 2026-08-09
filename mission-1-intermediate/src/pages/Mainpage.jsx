import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";
import CourseFilter from "../components/CourseFilter";
import { courses } from "../data/courses";
import "./Mainpage.css";

function Mainpage() {
  return (
    <div>
      <main>
        <Navbar />
        <Hero />
        <CourseFilter />
        <div className="course-list">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Mainpage;
