// Error message mapping for user-friendly UI

const errorMap: Record<string, string> = {
  // Auth
  "Invalid credentials": "Email atau password salah.",
  "User not found": "Akun tidak ditemukan.",
  "Token expired": "Sesi Anda telah berakhir. Silakan login kembali.",
  Unauthorized: "Anda tidak memiliki akses. Silakan login ulang.",

  // Projects
  "Project not found": "Proyek tidak ditemukan.",
  "Project already exists": "Proyek sudah ada.",

  // Articles
  "Article not found": "Artikel tidak ditemukan.",
  "Article already exists": "Artikel sudah ada.",

  // General
  "Network Error": "Koneksi gagal. Silakan cek internet Anda.",
  "API call failed": "Terjadi kesalahan. Silakan coba lagi nanti."
};

export function getFriendlyErrorMessage(error: unknown): string {
  if (!error) return "Terjadi kesalahan. Silakan coba lagi.";
  if (typeof error === "string" && errorMap[error]) return errorMap[error];
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string" &&
    errorMap[error.message]
  )
    return errorMap[error.message];
  if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string")
    return error.message;
  return "Terjadi kesalahan. Silakan coba lagi.";
}
