// ===== DATABASE TYPES =====
// Canonical category list/type lives in lib/categories.ts (single source of
// truth, mirrored by the DB CHECK constraint). Re-exported here for the types
// that reference it below.
import { PRODUCT_CATEGORIES as CATEGORY_VALUES } from '@/lib/categories';
export type { ProductCategory } from '@/lib/categories';
import type { ProductCategory } from '@/lib/categories';

export interface Product {
  id: string;
  created_at: string;
  name: string;
  short_description: string | null;
  category: ProductCategory;
  image_url: string | null;
  is_active: boolean;
}

export interface ProductInsert {
  name: string;
  short_description?: string;
  category: ProductCategory;
  image_url?: string;
  is_active?: boolean;
}

export interface ProductUpdate {
  name?: string;
  short_description?: string;
  category?: ProductCategory;
  image_url?: string;
  is_active?: boolean;
}

// ===== UI/UX TYPES =====
export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  success: boolean;
}

export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export interface FilterParams {
  category?: ProductCategory;
  search?: string;
  isActive?: boolean;
  sortBy?: 'name' | 'created_at' | 'category';
  sortOrder?: 'asc' | 'desc';
}

export interface ProductsResponse {
  products: Product[];
  totalCount: number;
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
}

// ===== FORM TYPES =====
export interface ProductFormData {
  name: string;
  short_description: string;
  category: ProductCategory;
  image_url: string;
  is_active: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  subject: string;
  preferredContact: 'email' | 'phone' | 'whatsapp';
}

export interface SearchFormData {
  query: string;
  category?: ProductCategory;
}

// ===== COMPONENT PROPS TYPES =====
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export interface InputProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

// ===== NAVIGATION TYPES =====
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  isActive?: boolean;
  children?: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

// ===== ANIMATION TYPES =====
export interface AnimationVariants {
  hidden: object;
  visible: object;
  exit?: object;
}

export interface ScrollAnimation {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
  duration?: number;
}

// ===== SEO TYPES =====
export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  twitterCard?: 'summary' | 'summary_large_image';
  noindex?: boolean;
  nofollow?: boolean;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

// ===== ERROR TYPES =====
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

// ===== UTILITY TYPES =====
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type WithId<T> = T & { id: string };

export type WithTimestamps<T> = T & {
  created_at: string;
  updated_at?: string;
};

// ===== THEME TYPES =====
export interface Theme {
  colors: {
    brand: {
      primary: string;
      secondary: string;
      accent: string;
      muted: string;
    };
    bg: {
      main: string;
      alt: string;
      card: string;
    };
    text: {
      primary: string;
      secondary: string;
      muted: string;
    };
    status: {
      success: string;
      error: string;
      warning: string;
      info: string;
    };
  };
  spacing: Record<string, string>;
  breakpoints: Record<string, string>;
  fonts: Record<string, string>;
}

// ===== BUSINESS LOGIC TYPES =====
export interface BusinessInfo {
  name: string;
  tagline: string;
  description: string;
  address: {
    street: string;
    city: string;
    district: string;
    country: string;
    postalCode?: string;
  };
  contact: {
    phone: string;
    email: string;
    whatsapp?: string;
  };
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  workingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
}

// ===== ANALYTICS TYPES =====
export interface AnalyticsEvent {
  name: string;
  category: 'product' | 'navigation' | 'user_interaction' | 'conversion';
  properties?: Record<string, any>;
  timestamp: string;
}

export interface PageView {
  path: string;
  title: string;
  referrer?: string;
  timestamp: string;
}

// ===== FILE UPLOAD TYPES =====
export interface FileUploadConfig {
  maxSize: number; // in bytes
  allowedTypes: string[];
  multiple?: boolean;
  compress?: boolean;
  quality?: number; // for image compression (0-1)
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  thumbnailUrl?: string;
  uploadedAt: string;
}

// ===== NOTIFICATION TYPES =====
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  createdAt: string;
}

// ===== API TYPES =====
export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
  retryDelay: number;
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  signal?: AbortSignal;
}

// ===== RESPONSIVE DESIGN TYPES =====
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ResponsiveValue<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}

// ===== ACCESSIBILITY TYPES =====
export interface AriaProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  role?: string;
}

// ===== PERFORMANCE TYPES =====
export interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

// ===== FEATURE FLAGS =====
export interface FeatureFlags {
  enableNewDesign: boolean;
  enableAnalytics: boolean;
  enableChatbot: boolean;
  enableImageOptimization: boolean;
  enableOfflineMode: boolean;
}

// ===== CONSTANTS =====
// Re-exported from the single source of truth (lib/categories.ts).
export const PRODUCT_CATEGORIES: readonly ProductCategory[] = CATEGORY_VALUES;

export const SORT_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'created_at', label: 'Date Added' },
  { value: 'category', label: 'Category' }
] as const;

export const ITEMS_PER_PAGE_OPTIONS = [6, 12, 24, 48] as const;
