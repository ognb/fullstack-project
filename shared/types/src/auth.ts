// shared/types/src/auth.ts

import { User, UserRole, Permission } from './user';

// Authentication method types
export enum AuthProvider {
  LOCAL = 'local',
  GOOGLE = 'google',
  GITHUB = 'github',
  FACEBOOK = 'facebook',
  APPLE = 'apple',
  MICROSOFT = 'microsoft',
}

// Token types
export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  tokenType: 'Bearer';
}

export interface AccessTokenPayload {
  sub: string; // user ID
  email: string;
  role: UserRole;
  permissions: Permission[];
  sessionId: string;
  iat: number;
  exp: number;
}

export interface RefreshTokenPayload {
  sub: string; // user ID
  sessionId: string;
  tokenVersion: number;
  iat: number;
  exp: number;
}

// Authentication input types
export interface LoginInput {
  email: string;
  password: string;
  rememberMe?: boolean;
  deviceInfo?: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  acceptTerms: boolean;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface VerifyEmailInput {
  token: string;
}

export interface ResendVerificationInput {
  email: string;
}

// OAuth types
export interface OAuthLoginInput {
  provider: AuthProvider;
  code: string;
  state?: string;
  redirectUri: string;
}

export interface OAuthUserInfo {
  id: string;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  emailVerified: boolean;
}

// Authentication responses
export interface LoginResponse {
  user: User;
  tokens: TokenPair;
  isFirstLogin: boolean;
}

export interface RegisterResponse {
  user: User;
  tokens: TokenPair;
  verificationEmailSent: boolean;
}

export interface RefreshTokenResponse {
  tokens: TokenPair;
}

// Two-factor authentication
export enum TwoFactorMethod {
  SMS = 'sms',
  EMAIL = 'email',
  TOTP = 'totp', // Time-based One-Time Password (Google Authenticator)
  BACKUP_CODES = 'backup_codes',
}

export interface TwoFactorSetupInput {
  method: TwoFactorMethod;
  phoneNumber?: string; // for SMS
}

export interface TwoFactorSetupResponse {
  secret?: string; // for TOTP
  qrCode?: string; // for TOTP
  backupCodes?: string[]; // for backup codes
}

export interface TwoFactorVerifyInput {
  code: string;
  method: TwoFactorMethod;
  trustDevice?: boolean;
}

export interface TwoFactorStatus {
  enabled: boolean;
  methods: TwoFactorMethod[];
  backupCodesRemaining?: number;
}

// Session management
export interface SessionInfo {
  id: string;
  userId: string;
  deviceInfo?: string;
  ipAddress?: string;
  location?: string;
  createdAt: Date;
  lastActiveAt: Date;
  expiresAt: Date;
  isCurrent: boolean;
}

export interface RevokeSessionInput {
  sessionId?: string; // if not provided, revokes current session
  revokeAll?: boolean; // revokes all sessions for the user
}

// Password policy
export interface PasswordPolicy {
  minLength: number;
  maxLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  preventCommonPasswords: boolean;
  preventReuse: number; // number of previous passwords to check
}

// Account lockout
export interface AccountLockout {
  maxAttempts: number;
  lockoutDuration: number; // in minutes
  currentAttempts: number;
  lockedUntil?: Date;
}

// Security events
export enum SecurityEventType {
  LOGIN_SUCCESS = 'login_success',
  LOGIN_FAILURE = 'login_failure',
  LOGOUT = 'logout',
  PASSWORD_CHANGE = 'password_change',
  PASSWORD_RESET = 'password_reset',
  EMAIL_VERIFICATION = 'email_verification',
  TWO_FACTOR_ENABLED = 'two_factor_enabled',
  TWO_FACTOR_DISABLED = 'two_factor_disabled',
  ACCOUNT_LOCKED = 'account_locked',
  ACCOUNT_UNLOCKED = 'account_unlocked',
  SUSPICIOUS_ACTIVITY = 'suspicious_activity',
}

export interface SecurityEvent {
  id: string;
  userId: string;
  type: SecurityEventType;
  ipAddress?: string;
  userAgent?: string;
  location?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}
