// ============================================================
// services/apiClient.ts — Shared fetch wrapper for Internery FE
// - baseURL from env (default empty → uses Next.js rewrites proxy)
// - Always sends credentials: 'include' for cookie-based auth
// - Parses backend error envelope: { error: { code, message, details?, requestId } }
// - Throws ApiError with typed fields on non-2xx responses
// ============================================================

export interface ApiErrorBody {
  code: string;
  message: string;
  details?: unknown;
  requestId?: string;
}

export class ApiError extends Error {
  public readonly code: string;
  public readonly details: unknown;
  public readonly requestId: string | undefined;
  public readonly status: number;

  constructor(status: number, body: ApiErrorBody) {
    super(body.message);
    this.name = 'ApiError';
    this.status = status;
    this.code = body.code;
    this.details = body.details;
    this.requestId = body.requestId;
  }
}

// Base URL — empty string means same-origin (proxied by Next.js rewrites)
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers: extraHeaders, ...rest } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(extraHeaders as Record<string, string>),
  };

  const response = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers,
    credentials: 'include',
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let errorBody: { error?: ApiErrorBody } = {};
    try {
      errorBody = await response.json();
    } catch {
      // non-JSON error response
    }

    const apiErrorBody: ApiErrorBody = errorBody.error ?? {
      code: 'UNKNOWN_ERROR',
      message: `HTTP ${response.status}`,
    };

    throw new ApiError(response.status, apiErrorBody);
  }

  // 204 No Content
  if (response.status === 204) {
    return undefined as unknown as T;
  }

  return response.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(path: string, options?: Omit<RequestOptions, 'body'>) =>
    request<T>(path, { ...options, method: 'GET' }),

  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'POST', body }),

  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'PATCH', body }),

  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'PUT', body }),

  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'DELETE' }),
};
