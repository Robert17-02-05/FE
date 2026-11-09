// ============================================================
// index.ts — Global TypeScript Types (Next.js)
// ============================================================

export type Nullable<T>  = T | null;
export type Optional<T>  = T | undefined;
export type ID           = string | number;

// ── API Response ─────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  data:       T;
  message:    string;
  success:    boolean;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page:       number;
    limit:      number;
    total:      number;
    totalPages: number;
    hasNext:    boolean;
    hasPrev:    boolean;
  };
}

export interface ApiError {
  message:   string;
  statusCode: number;
  errors?:   Record<string, string[]>;
}

// ── Params ────────────────────────────────────────────────────
export interface PaginationParams {
  page?:      number;
  limit?:     number;
  sortBy?:    string;
  sortOrder?: 'asc' | 'desc';
  search?:    string;
}

// ── User ─────────────────────────────────────────────────────
export type UserRole = 'admin' | 'user' | 'moderator';

export interface User {
  id:          string;
  email:       string;
  fullName:    string;
  avatar?:     string;
  role:        UserRole;
  isVerified:  boolean;
  createdAt:   string;
  updatedAt:   string;
}

// ── Product ──────────────────────────────────────────────────
export interface Product {
  id:          string;
  name:        string;
  description: string;
  price:       number;
  salePrice?:  number;
  images:      string[];
  category:    Category;
  stock:       number;
  rating:      number;
  reviewCount: number;
  isActive:    boolean;
  slug:        string;
  createdAt:   string;
}

// ── Category ─────────────────────────────────────────────────
export interface Category {
  id:     string;
  name:   string;
  slug:   string;
  image?: string;
}

// ── Order ────────────────────────────────────────────────────
export type OrderStatus = 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';

export interface Order {
  id:              string;
  user:            Pick<User, 'id' | 'fullName' | 'email'>;
  items:           OrderItem[];
  total:           number;
  status:          OrderStatus;
  shippingAddress: Address;
  createdAt:       string;
}

export interface OrderItem {
  product:  Pick<Product, 'id' | 'name' | 'images'>;
  quantity: number;
  price:    number;
}

// ── Address ──────────────────────────────────────────────────
export interface Address {
  fullName: string;
  phone:    string;
  province: string;
  district: string;
  ward:     string;
  street:   string;
}

// ── Blog ─────────────────────────────────────────────────────
export interface Post {
  id:          string;
  title:       string;
  slug:        string;
  excerpt:     string;
  content:     string;
  thumbnail:   string;
  author:      Pick<User, 'id' | 'fullName' | 'avatar'>;
  tags:        string[];
  publishedAt: string;
}

// ── Select / Table ────────────────────────────────────────────
export interface SelectOption<T = string> {
  label:     string;
  value:     T;
  disabled?: boolean;
}

// ── Theme & Language ──────────────────────────────────────────
export type Theme    = 'light' | 'dark' | 'system';
export type Language = 'vi' | 'en';
