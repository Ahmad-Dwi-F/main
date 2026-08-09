import { useContext } from "react";
import { EnrollmentContext } from "../context/EnrollmentContext";

export function useEnrollments() {
  return useContext(EnrollmentContext);
}
