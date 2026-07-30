import type { UserRole } from "@/shared/types";

export interface AuthResponse {
  accessToken: string;
  // refreshToken: string;
  description?: {
    hasActiveSubscription: boolean;
    subscriptionStatus?: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}
