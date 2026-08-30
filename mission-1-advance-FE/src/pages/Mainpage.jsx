import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";
import CourseFilter from "../components/CourseFilter";
import FavoriteList from "../components/FavoriteList";
import { courses } from "../data/courses";
import "./Mainpage.css";

function Mainpage() {
  const [favorites, setFavorites] = useState([]);

  const handleAddFavorite = (course) => {
    setFavorites((prev) => {
      const alreadyExists = prev.some((fav) => fav.courseId === course.id);
      if (alreadyExists) return prev;

      const newFavorite = {
        id: `fav-${course.id}-${Date.now()}`,
        courseId: course.id,
        title: course.title,
        image: course.image,
        price: course.price,
        note: "",
      };

      return [...prev, newFavorite];
    });
  };

  const handleUpdateFavoriteNote = (favoriteId, newNote) => {
    setFavorites((prev) =>
      prev.map((fav) =>
        fav.id === favoriteId ? { ...fav, note: newNote } : fav,
      ),
    );
  };

  const handleDeleteFavorite = (favoriteId) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== favoriteId));
  };

  return (
    <div>
      <main>
        <Navbar />
        <Hero />
        <CourseFilter />
        <div className="course-list">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
              isFavorite={favorites.some((fav) => fav.courseId === course.id)}
              onAddFavorite={handleAddFavorite}
            />
          ))}
        </div>

        <FavoriteList
          favorites={favorites}
          onUpdateNote={handleUpdateFavoriteNote}
          onDelete={handleDeleteFavorite}
        />
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Mainpage;
