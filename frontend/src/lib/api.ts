// Base URLs
export const API_BASE = 'http://localhost:8081';
export const NEWS_BASE = 'http://localhost:8080';

// Types for strong TS integration
export type HomeResponse = {
  organization_announcement: { url: string }[];
  leadership_notes: { leader_name: string; leader_message: string }[];
  message?: string;
};

export type UploadResponse = {
  message: string;
};

export type Article = {
  source: { id: string | null; name: string };
  author?: string | null;
  title: string;
  description?: string | null;
  url: string;
  publishedAt: string;
};

export type TechNewsResponse = {
  meta: { status: 'OK' | 'INTERNAL_SERVER_ERROR'; message: string };
  data: null | { status: string; totalResults: number; articles: Article[] };
};

// Basic Auth header per requirement
export const buildBasicAuth = (username: string, password: string) =>
  'Basic ' + btoa(`${username}:${password}`);

// Internal helpers for consistent error handling and JSON parsing
const handleHTTPError = async (res: Response) => {
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText}${text ? ` - ${text}` : ''}`);
  }
};

const toJSON = async <T>(res: Response): Promise<T> => {
  await handleHTTPError(res);
  return res.json() as Promise<T>;
};

// 1) Public Home (no auth)
export async function fetchHomeData(signal?: AbortSignal): Promise<HomeResponse> {
  const res = await fetch(`${API_BASE}/api/home`, { signal });
  return toJSON<HomeResponse>(res);
}

// 2) User Profile (Basic Auth)
export async function fetchUserProfile(
  username: string,
  password: string,
  signal?: AbortSignal
) {
  const res = await fetch(`${API_BASE}/api/user/profile`, {
    headers: { Authorization: buildBasicAuth(username, password) },
    signal,
  });
  return toJSON<HomeResponse>(res);
}

// 3) Admin Content (Basic Auth)
export async function fetchAdminContent(
  username: string,
  password: string,
  signal?: AbortSignal
) {
  const res = await fetch(`${API_BASE}/api/admin/content`, {
    headers: { Authorization: buildBasicAuth(username, password) },
    signal,
  });
  return toJSON<HomeResponse>(res);
}

// 5) Tech News Endpoint (public)
export async function fetchTechNews(signal?: AbortSignal): Promise<TechNewsResponse> {
  const res = await fetch(`${NEWS_BASE}/news/tech`, { signal });
  return toJSON<TechNewsResponse>(res);
}

// 4) File Upload (FormData + Basic Auth; no JSON)
export async function uploadFile(
  formData: FormData,
  username: string,
  password: string,
  signal?: AbortSignal
) {
  const res = await fetch(`${API_BASE}/api/admin/upload`, {
    method: 'POST',
    body: formData, // do not set Content-Type; browser sets boundary
    headers: { Authorization: buildBasicAuth(username, password) },
    signal,
  });
  return toJSON<UploadResponse>(res);
}
