// shared/types/src/common.ts

// Base entity interface that all entities extend
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Pagination types
export interface PaginationInput {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
}

// Error types
export interface ErrorResponse {
  message: string;
  code: string;
  statusCode: number;
  details?: Record<string, any>;
  timestamp: Date;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

// File upload types
export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  size: number;
  url?: string;
}

// Generic API response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ErrorResponse;
  meta?: Record<string, any>;
}

// Environment types
export type Environment = 'development' | 'staging' | 'production' | 'test';

// Database filter operators
export interface FilterOperators<T = any> {
  eq?: T;
  ne?: T;
  gt?: T;
  gte?: T;
  lt?: T;
  lte?: T;
  in?: T[];
  nin?: T[];
  contains?: string;
  startsWith?: string;
  endsWith?: string;
}

// Search and filter types
export interface SearchInput {
  query?: string;
  filters?: Record<string, FilterOperators>;
}

// Audit log types
export interface AuditLog extends BaseEntity {
  action: string;
  entityType: string;
  entityId: string;
  userId?: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}
