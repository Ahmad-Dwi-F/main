import { createSlice } from "@reduxjs/toolkit";
const STORAGE_KEY = "videobelajar_enrollments";

function loadEnrollments() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

const initialState = loadEnrollments();

const enrollSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollCourse: (state, action) => {
      const { courseId } = action.payload;
      const alreadyEnrolled = state.some((e) => e.courseId === courseId);
      if (!alreadyEnrolled) {
        state.push({
          courseId,
          progress: 0,
          enrolledAtt: new Date().toISOString(),
        });
      }
    },

    toogleItemComplete: (state, action) => {
      const { courseId, itemKey } = action.payload;
      const enrollment = state.find((e) => e.courseId === courseId);

      if (enrollment) {
        if (!enrollment.completedItems) {
          enrollment.completedItems = [];
        }

        const itemIndex = enrollment.completedItems.indexOf(itemKey);

        if (itemIndex !== -1) {
          enrollment.completedItems.splice(itemIndex, 1);
        } else {
          enrollment.completedItems.push(itemKey);
        }
      }
    },
    resetEnrollments: () => [],
  },
});

export default enrollSlice.reducer;
export const { enrollCourse, toogleItemComplete, resetEnrollments } =
  enrollSlice.actions;
