import { useState, useEffect } from "react";
import { EnrollmentContext } from "./EnrollmentContext";

const STORAGE_KEY = "videobelajar_enrollments";

function loadEnrollments() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function EnrollmentProvider({ children }) {
  const [enrollments, setEnrollments] = useState(loadEnrollments);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(enrollments));
  }, [enrollments]);

  const enrollCourse = (courseId) => {
    setEnrollments((prev) => {
      const alreadyEnrolled = prev.some((e) => e.courseId === courseId);
      if (alreadyEnrolled) return prev;
      return [
        ...prev,
        { courseId, progress: 0, enrolledAt: new Date().toISOString() },
      ];
    });
  };

  const toggleItemComplete = (courseId, itemKey) => {
    setEnrollments((prev) =>
      prev.map((e) => {
        if (e.courseId !== courseId) return e;
        const completed = e.completedItems || [];
        const isDone = completed.includes(itemKey);
        return {
          ...e,
          completedItems: isDone
            ? completed.filter((k) => k !== itemKey)
            : [...completed, itemKey],
        };
      }),
    );
  };

  return (
    <EnrollmentContext.Provider
      value={{ enrollments, enrollCourse, toggleItemComplete }}>
      {children}
    </EnrollmentContext.Provider>
  );
}
