import { useSelector, useDispatch } from "react-redux";
import {
  enrollCourse as enrolCourseAction,
  toogleItemComplete as toogleItemCompleteAction,
} from "../rtk/feature/enrollment/enrollSlice";

export function useEnrollments() {
  const enrollments = useSelector((state) => state.enrollments);
  const dispatch = useDispatch();

  const enrollCourse = (courseId) => dispatch(enrolCourseAction({ courseId }));
  const toogleItemComplete = (courseId, itemKey) =>
    dispatch(toogleItemCompleteAction({ courseId, itemKey }));

  return { enrollments, enrollCourse, toogleItemComplete };
}
