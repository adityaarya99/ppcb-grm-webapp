/**
 * API Client
 */

import { API_BASE_URL } from '@/lib/constants';

class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/* ================= SESSION HELPERS ================= */

// ✅ Login session
async function ensureLoginSession() {
  await fetch(`${API_BASE_URL}/public/login-session`, {
    method: "GET",
    credentials: "include",
  });
}

// ✅ Grievance session (ONLY for submit APIs)
async function ensureGrievanceSession() {
  await fetch(`${API_BASE_URL}/public/grievance-session`, {
    method: "GET",
    credentials: "include",
  });
}

/* ================= BASE REQUEST ================= */

async function request(url, options = {}) {
  const headers = { ...(options.headers || {}) };
  let body = options.body;

  // JSON handling
  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;

  if (!isFormData && body && typeof body === "object") {
    body = JSON.stringify(body);
    headers["Content-Type"] = "application/json";
  }

  // ✅ Attach JWT automatically
  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
    body,
    credentials: "include", // keep for cookies if needed
  };

  try {
    const res = await fetch(`${API_BASE_URL}${url}`, config);

    // 🔐 Handle token expiry
    if (res.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return;
    }

    const contentType = res.headers.get("content-type");
    const isJson = contentType?.includes("application/json");
    const data = isJson ? await res.json() : await res.text();

    if (!res.ok) {
      throw new ApiError(
        data?.message || "API error",
        res.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message || "Network error", 0);
  }
}

/* ================= API CLIENT ================= */

export const apiClient = {
  get: (url, options = {}) =>
    request(url, { ...options, method: "GET" }),

  post: (url, data, options = {}) =>
    request(url, {
      ...options,
      method: "POST",
      body: data,
    }),

  put: (url, data, options = {}) =>
    request(url, {
      ...options,
      method: "PUT",
      body: data,
    }),

  delete: (url, options = {}) =>
    request(url, { ...options, method: "DELETE" }),
};

/* ================= AUTH ================= */

export async function loginApi({ username, password }) {
  try {
    // ✅ STEP 1: create login session
    await ensureLoginSession();

    // ✅ STEP 2: login
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    // ✅ Save token
    localStorage.setItem("token", data.access_token);

    return data;
  } catch (error) {
    throw error;
  }
}

/* ================= GRIEVANCE ================= */

// ✅ Submit grievance (needs session)
export async function submitGrievance(formData) {
  await ensureGrievanceSession();

  return apiClient.post("/grievances/submit", formData);
}

// ✅ Fetch grievance list (ONLY JWT needed)
export async function getGrievances() {
  return apiClient.get("/grievances/list");
}

/* ================= MASTER ================= */

export async function getDistricts() {
  try {
    return await apiClient.get("/master/districts");
  } catch (error) {
    console.error("Error fetching districts:", error);
    return [];
  }
}

export async function getGroupTypes() {
  try {
    return await apiClient.get("/master/group-types");
  } catch (error) {
    console.error("Error fetching group types:", error);
    return [];
  }
}

export { ApiError };