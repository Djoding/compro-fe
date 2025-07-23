// API configuration and utility functions
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

// Auth token management
export const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("admin_token");
  }
  return null;
};

export const setAuthToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("admin_token", token);
  }
};

export const removeAuthToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("admin_token");
  }
};

// Generic API call function
import { getFriendlyErrorMessage } from "./error-messages";

// API Response Types
interface ApiResponse<T = unknown> {
  status: string;
  message?: string;
  data?: T;
}

const apiCall = async <T = unknown>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> => {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>)
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    if (!response.ok) {
      let error;
      try {
        error = await response.json();
      } catch {
        error = { message: response.statusText };
      }
      throw new Error(getFriendlyErrorMessage(error));
    }

    return response.json();
  } catch (err) {
    throw new Error(getFriendlyErrorMessage(err));
  }
};

// Generic API call for form data (file uploads)
const apiCallFormData = async <T = unknown>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> => {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>)
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    if (!response.ok) {
      let error;
      try {
        error = await response.json();
      } catch {
        error = { message: response.statusText };
      }
      throw new Error(getFriendlyErrorMessage(error));
    }

    return response.json();
  } catch (err) {
    throw new Error(getFriendlyErrorMessage(err));
  }
};

// Auth API
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials)
    }),

  register: (userData: { name: string; email: string; password: string }) =>
    apiCall("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData)
    })
};

// Company Profile API
export const companyProfileAPI = {
  getProfile: () => apiCall("/company-profile"),
  updateProfile: (data: Record<string, unknown>) =>
    apiCall("/company-profile", {
      method: "PUT",
      body: JSON.stringify(data)
    }),
  getStats: () => apiCall("/company-profile/stats")
};

// Projects API
export const projectsAPI = {
  getAll: () => apiCall("/projects"),
  getById: (id: string) => apiCall(`/projects/${id}`),
  create: (formData: FormData) =>
    apiCallFormData("/projects", {
      method: "POST",
      body: formData
    }),
  update: (id: string, formData: FormData) =>
    apiCallFormData(`/projects/${id}`, {
      method: "PUT",
      body: formData
    }),
  delete: (id: string) =>
    apiCall(`/projects/${id}`, {
      method: "DELETE"
    })
};

// Articles API
export const articlesAPI = {
  getAll: () => apiCall("/articles"),
  getFeatured: () => apiCall("/articles/featured"),
  getBySlug: (slug: string) => apiCall(`/articles/${slug}`),
  create: (formData: FormData) =>
    apiCallFormData("/articles", {
      method: "POST",
      body: formData
    }),
  update: (id: string, formData: FormData) =>
    apiCallFormData(`/articles/${id}`, {
      method: "PUT",
      body: formData
    }),
  delete: (id: string) =>
    apiCall(`/articles/${id}`, {
      method: "DELETE"
    })
};

// Team Members API
export const teamAPI = {
  getAll: () => apiCall("/team"),
  getById: (id: string) => apiCall(`/team/${id}`),
  create: (formData: FormData) =>
    apiCallFormData("/team", {
      method: "POST",
      body: formData
    }),
  update: (id: string, formData: FormData) =>
    apiCallFormData(`/team/${id}`, {
      method: "PUT",
      body: formData
    }),
  delete: (id: string) =>
    apiCall(`/team/${id}`, {
      method: "DELETE"
    })
};

// Services API
export const servicesAPI = {
  getAll: () => apiCall("/services"),
  getById: (id: string) => apiCall(`/services/${id}`),
  create: (data: Record<string, unknown>) =>
    apiCall("/services", {
      method: "POST",
      body: JSON.stringify(data)
    }),
  update: (id: string, data: Record<string, unknown>) =>
    apiCall(`/services/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    }),
  delete: (id: string) =>
    apiCall(`/services/${id}`, {
      method: "DELETE"
    })
};

// Testimonials API
export const testimonialsAPI = {
  getAll: () => apiCall("/testimonials"),
  create: (formData: FormData) =>
    apiCallFormData("/testimonials", {
      method: "POST",
      body: formData
    }),
  update: (id: string, formData: FormData) =>
    apiCallFormData(`/testimonials/${id}`, {
      method: "PUT",
      body: formData
    }),
  delete: (id: string) =>
    apiCall(`/testimonials/${id}`, {
      method: "DELETE"
    })
};

// Contact API
export const contactAPI = {
  getInfo: () => apiCall("/contact/info"),
  updateInfo: (data: Record<string, unknown>) =>
    apiCall("/contact/info", {
      method: "PUT",
      body: JSON.stringify(data)
    }),
  getMessages: () => apiCall("/contact/messages"),
  deleteMessage: (id: string) =>
    apiCall(`/contact/messages/${id}`, {
      method: "DELETE"
    })
};

// FAQ API
export const faqAPI = {
  getAll: () => apiCall("/faqs"),
  getById: (id: string) => apiCall(`/faqs/${id}`),
  create: (data: Record<string, unknown>) =>
    apiCall("/faqs", {
      method: "POST",
      body: JSON.stringify(data)
    }),
  update: (id: string, data: Record<string, unknown>) =>
    apiCall(`/faqs/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    }),
  delete: (id: string) =>
    apiCall(`/faqs/${id}`, {
      method: "DELETE"
    })
};

// Platforms API
export const platformsAPI = {
  getAll: () => apiCall("/platforms"),
  getById: (id: string) => apiCall(`/platforms/${id}`),
  create: (formData: FormData) =>
    apiCallFormData("/platforms", {
      method: "POST",
      body: formData
    }),
  update: (id: string, formData: FormData) =>
    apiCallFormData(`/platforms/${id}`, {
      method: "PUT",
      body: formData
    }),
  delete: (id: string) =>
    apiCall(`/platforms/${id}`, {
      method: "DELETE"
    })
};

// Certificates API
export const certificatesAPI = {
  getAll: () => apiCall("/certificates"),
  create: (formData: FormData) =>
    apiCallFormData("/certificates", {
      method: "POST",
      body: formData
    }),
  delete: (id: string) =>
    apiCall(`/certificates/${id}`, {
      method: "DELETE"
    })
};

// Journey API
export const journeyAPI = {
  getAll: () => apiCall("/journey"),
  create: (data: Record<string, unknown>) =>
    apiCall("/journey", {
      method: "POST",
      body: JSON.stringify(data)
    }),
  update: (id: string, data: Record<string, unknown>) =>
    apiCall(`/journey/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    }),
  delete: (id: string) =>
    apiCall(`/journey/${id}`, {
      method: "DELETE"
    })
};
