// shared/types/src/user.ts

import { BaseEntity, PaginatedResponse, SearchInput } from './common';

// User role and permission types
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
  GUEST = 'guest',
}

export enum Permission {
  READ_USERS = 'read:users',
  WRITE_USERS = 'write:users',
  DELETE_USERS = 'delete:users',
  READ_ADMIN = 'read:admin',
  WRITE_ADMIN = 'write:admin',
  MANAGE_ROLES = 'manage:roles',
}

// User status
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  SUSPENDED = 'suspended',
  DELETED = 'deleted',
}

// Main User interface
export interface User extends BaseEntity {
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatar?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  timezone?: string;
  locale?: string;
  role: UserRole;
  status: UserStatus;
  permissions: Permission[];
  emailVerified: boolean;
  phoneVerified: boolean;
  lastLoginAt?: Date;
  loginCount: number;
  metadata?: Record<string, any>;
}

// User profile (public-facing subset)
export interface UserProfile {
  id: string;
  username?: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  createdAt: Date;
}

// User creation and update types
export interface CreateUserInput {
  email: string;
  password: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  role?: UserRole;
  permissions?: Permission[];
}

export interface UpdateUserInput {
  username?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatar?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  timezone?: string;
  locale?: string;
  metadata?: Record<string, any>;
}

export interface UpdateUserRoleInput {
  userId: string;
  role: UserRole;
  permissions?: Permission[];
}

// User queries and filters
export interface UserFilters {
  role?: UserRole[];
  status?: UserStatus[];
  emailVerified?: boolean;
  phoneVerified?: boolean;
  createdAfter?: Date;
  createdBefore?: Date;
  lastLoginAfter?: Date;
  lastLoginBefore?: Date;
}

export interface UserSearchInput {
  query?: string;
  filters?: UserFilters;
}

// Response types
export type UsersResponse = PaginatedResponse<User>;
export type UserProfilesResponse = PaginatedResponse<UserProfile>;

// User preferences
export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    profileVisible: boolean;
    emailVisible: boolean;
    phoneVisible: boolean;
  };
}

// User session info
export interface UserSession {
  userId: string;
  sessionId: string;
  deviceInfo?: string;
  ipAddress?: string;
  userAgent?: string;
  loginAt: Date;
  lastActiveAt: Date;
  expiresAt: Date;
}
