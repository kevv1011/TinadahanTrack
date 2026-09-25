export const isForcedDemo = window.localStorage.getItem('force_demo_mode') === 'true';
export const IS_DEMO = isForcedDemo || import.meta.env.VITE_USE_MOCK_API !== 'false';
export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const TOKEN_KEY = 'tindahan_owner_token';
const NGROK_HEADERS = { 'ngrok-skip-browser-warning': '69420' };

export function getSessionToken() {
  return window.sessionStorage.getItem(TOKEN_KEY);
}

export function saveSessionToken(token) {
  window.sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearSessionToken() {
  window.sessionStorage.removeItem(TOKEN_KEY);
}

export function loginHeaders() {
  return { ...NGROK_HEADERS, 'Content-Type': 'application/json' };
}

export async function apiFetch(path, options = {}) {
  const headers = new Headers(options.headers || {});
  headers.set('ngrok-skip-browser-warning', '69420');

  const token = getSessionToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (response.status === 401) {
    window.dispatchEvent(new Event('tindahan-auth-required'));
  }
  return response;
}
