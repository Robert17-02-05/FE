// ============================================================
// auth/types/index.ts
// ============================================================
export interface LoginPayload {
  email:       string;
  password:    string;
  rememberMe?: boolean;
}

export interface RegisterPayload {
  fullName:        string;
  email:           string;
  password:        string;
  confirmPassword: string;
  phone?:          string;
}

export interface ForgotPasswordPayload { email: string; }

export interface ResetPasswordPayload {
  token:           string;
  password:        string;
  confirmPassword: string;
}

export interface AuthTokens {
  accessToken:  string;
  refreshToken: string;
  expiresIn:    number;
}

export interface AuthResponse {
  user: {
    id:       string;
    email:    string;
    fullName: string;
    avatar?:  string;
    role:     'admin' | 'user' | 'moderator';
  };
  tokens: AuthTokens;
}
