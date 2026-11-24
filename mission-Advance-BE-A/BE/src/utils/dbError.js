import { HttpError } from "./httpError.js";

export function rethrowDbError(error, { duplicate, inUse, missingRef } = {}) {
  if (error.code === "ER_DUP_ENTRY" && duplicate) {
    throw new HttpError(409, duplicate);
  }
  if (error.code === "ER_ROW_IS_REFERENCED_2" && inUse) {
    throw new HttpError(409, inUse);
  }
  if (error.code === "ER_NO_REFERENCED_ROW_2" && missingRef) {
    throw new HttpError(400, missingRef);
  }
  throw error;
}
