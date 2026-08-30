import { useSelector, useDispatch } from "react-redux";
import {
  enrollCourse as ennrolCourseAction,
  toogleItemComplete as toogleItemCompleteAction,
} from "../redux/action";

export function useEnrollments() {
  const enrollments = useSelector((state) => state.enrollments);
  const dispatch = useDispatch();

  const enrollCourse = (courseId) => dispatch(ennrolCourseAction(courseId));
  const toogleItemComplete = (courseId, itemKey) =>
    dispatch(toogleItemCompleteAction(courseId, itemKey));

  return { enrollments, enrollCourse, toogleItemComplete };
}
