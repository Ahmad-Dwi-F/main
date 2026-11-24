export function getApiMessage(
  error,
  fallback = "Terjadi kesalahan pada server.",
) {
  if (!error.response) return "Tidak dapat terhubung ke server.";
  return error.response.data?.message ?? fallback;
}
