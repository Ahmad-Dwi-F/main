import { ENROLL_COURSE, TOOGLE_ITEM_COMPLETE } from "../action";

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
export function enrollmentReducer(state = initialState, action) {
  switch (action.type) {
    case ENROLL_COURSE: {
      const { courseId } = action.payload;
      const alreadyEnrolled = state.some((e) => e.courseId === courseId);
      if (alreadyEnrolled) return state;

      return [
        ...state,
        { courseId, progress: 0, enrolledAtt: new Date().toISOString() },
      ];
    }
    case TOOGLE_ITEM_COMPLETE: {
      const { courseId, itemKey } = action.payload;
      return state.map((enrollment) => {
        if (enrollment.courseId !== courseId) return enrollment;
        const complete = enrollment.completedItems || [];
        const isDone = complete.includes(itemKey);
        return {
          ...enrollment,
          completedItems: isDone
            ? complete.filter((k) => k !== itemKey)
            : [...complete, itemKey],
        };
      });
    }
    default:
      return state;
  }
}
