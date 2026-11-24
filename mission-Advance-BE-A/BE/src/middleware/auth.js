import { verifyToken } from "../utils/token.js";
import { HttpError } from "../utils/httpError.js";

export function requireAuth(req, res, next) {
  const [scheme, token] = (req.headers.authorization ?? "").split(" ");
  if (scheme !== "Bearer" || !token) {
    throw new HttpError(401, "Silakan masuk terlebih dahulu.");
  }

  try {
    req.userId = verifyToken(token).id;
  } catch {
    throw new HttpError(401, "Sesi tidak valid, silakan masuk lagi.");
  }
  next();
}
