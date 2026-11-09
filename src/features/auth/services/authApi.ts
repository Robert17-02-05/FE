// ============================================================
// authApi.ts — Auth API calls
// ============================================================
import axiosClient from '@/services/axiosClient';
import { AUTH_ENDPOINTS } from '@/constants/apiEndpoints';
import type {
  LoginPayload, RegisterPayload,
  ForgotPasswordPayload, ResetPasswordPayload, AuthResponse,
} from '../types';
import type { ApiResponse, User } from '@/types';

export const authApi = {
  login:          (p: LoginPayload): Promise<AuthResponse> =>
    axiosClient.post(AUTH_ENDPOINTS.LOGIN, p),

  register:       (p: RegisterPayload): Promise<AuthResponse> =>
    axiosClient.post(AUTH_ENDPOINTS.REGISTER, p),

  logout:         (): Promise<void> =>
    axiosClient.post(AUTH_ENDPOINTS.LOGOUT),

  getMe:          (): Promise<ApiResponse<User>> =>
    axiosClient.get(AUTH_ENDPOINTS.ME),

  forgotPassword: (p: ForgotPasswordPayload): Promise<ApiResponse<null>> =>
    axiosClient.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, p),

  resetPassword:  (p: ResetPasswordPayload): Promise<ApiResponse<null>> =>
    axiosClient.post(AUTH_ENDPOINTS.RESET_PASSWORD, p),

  refreshToken:   (refreshToken: string): Promise<{ accessToken: string }> =>
    axiosClient.post(AUTH_ENDPOINTS.REFRESH_TOKEN, { refreshToken }),
};
