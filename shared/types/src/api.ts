// shared/types/src/api.ts

import { ApiResponse, PaginationInput } from './common';

// GraphQL specific types
export interface GraphQLError {
  message: string;
  locations?: Array<{
    line: number;
    column: number;
  }>;
  path?: Array<string | number>;
  extensions?: {
    code?: string;
    exception?: any;
  };
}

export interface GraphQLResponse<T = any> {
  data?: T;
  errors?: GraphQLError[];
  extensions?: Record<string, any>;
}

// HTTP Status codes
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}

// API Error codes
export enum ApiErrorCode {
  // Authentication errors
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_INVALID = 'TOKEN_INVALID',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',

  // Validation errors
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  INVALID_FORMAT = 'INVALID_FORMAT',

  // Resource errors
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  RESOURCE_ALREADY_EXISTS = 'RESOURCE_ALREADY_EXISTS',
  RESOURCE_CONFLICT = 'RESOURCE_CONFLICT',

  // Business logic errors
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',
  OPERATION_NOT_ALLOWED = 'OPERATION_NOT_ALLOWED',
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',

  // System errors
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',

  // File upload errors
  FILE_TOO_LARGE = 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE = 'INVALID_FILE_TYPE',
  FILE_UPLOAD_FAILED = 'FILE_UPLOAD_FAILED',
}

// Request context (passed between services)
export interface RequestContext {
  userId?: string;
  sessionId?: string;
  requestId: string;
  userAgent?: string;
  ipAddress?: string;
  correlationId?: string;
  timestamp: Date;
}

// Health check types
export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: Date;
  uptime: number;
  version: string;
  environment: string;
  checks: Record<string, HealthCheck>;
}

export interface HealthCheck {
  status: 'pass' | 'fail' | 'warn';
  responseTime?: number;
  message?: string;
  details?: Record<string, any>;
}

// API versioning
export interface ApiVersion {
  version: string;
  releaseDate: Date;
  deprecated?: boolean;
  sunsetDate?: Date;
  changelogUrl?: string;
}

// Rate limiting
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  resetTime: Date;
  retryAfter?: number;
}

// Webhook types
export enum WebhookEvent {
  USER_CREATED = 'user.created',
  USER_UPDATED = 'user.updated',
  USER_DELETED = 'user.deleted',
  USER_LOGIN = 'user.login',
  USER_LOGOUT = 'user.logout',
  PASSWORD_CHANGED = 'password.changed',
  EMAIL_VERIFIED = 'email.verified',
}

export interface WebhookPayload<T = any> {
  event: WebhookEvent;
  data: T;
  timestamp: Date;
  version: string;
  id: string;
}

// API Gateway specific types
export interface ServiceInfo {
  name: string;
  version: string;
  url: string;
  health: 'healthy' | 'unhealthy' | 'unknown';
  lastCheck: Date;
}

export interface GatewayConfig {
  services: ServiceInfo[];
  rateLimits: {
    global: number;
    perUser: number;
    perService: Record<string, number>;
  };
  timeout: number;
  retries: number;
}

// Monitoring and metrics
export interface MetricPoint {
  timestamp: Date;
  value: number;
  tags?: Record<string, string>;
}

export interface ServiceMetrics {
  requestCount: number;
  errorCount: number;
  averageResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  uptime: number;
  memoryUsage: number;
  cpuUsage: number;
}

// Audit trail
export interface ApiAuditLog {
  id: string;
  method: string;
  endpoint: string;
  statusCode: number;
  responseTime: number;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  requestBody?: any;
  responseBody?: any;
  error?: string;
  timestamp: Date;
}

// Feature flags
export interface FeatureFlag {
  key: string;
  enabled: boolean;
  description?: string;
  conditions?: Record<string, any>;
  rolloutPercentage?: number;
}

// Configuration types
export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl?: boolean;
  poolSize?: number;
  connectionTimeout?: number;
}

export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db?: number;
  ttl?: number;
}

export interface JwtConfig {
  secret: string;
  expiresIn: string;
  refreshExpiresIn: string;
  issuer: string;
  audience: string;
}

// Service communication types
export interface ServiceRequest<T = any> {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  headers?: Record<string, string>;
  body?: T;
  timeout?: number;
  retries?: number;
}

export interface ServiceResponse<T = any> {
  status: number;
  headers: Record<string, string>;
  data: T;
  duration: number;
}
