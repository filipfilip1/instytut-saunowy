import { api } from './api';
import { Product, ApiResponse } from '../types/Product';

// Backend product structure with MongoDB _id
interface BackendProduct extends Omit<Product, 'id'> {
  _id: string;
}

// Transform backend product to frontend format
function transformProduct(backendProduct: BackendProduct): Product {
  const { _id, ...rest } = backendProduct;
  return {
    id: _id,
    ...rest
  };
}

// Transform array of backend products
function transformProducts(backendProducts: BackendProduct[]): Product[] {
  return backendProducts.map(transformProduct);
}

// Extended response with pagination metadata
interface ProductResponse extends ApiResponse<BackendProduct[]> {
  total?: number;
  page?: number;
  pages?: number;
}

class ProductService {
  // Fetches all products with filtering/pagination. Returns [] on error for UI consistency
  async getAllProducts(params?: {
    category?: string;
    sort?: string;
    limit?: string;
    page: number; // Required to prevent unbounded queries
    search?: string;
  }): Promise<Product[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.category) queryParams.append('category', params.category);
      if (params?.sort) queryParams.append('sort', params.sort);
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.search) queryParams.append('search', params.search);

      const queryString = queryParams.toString();
      const endpoint = queryString ? `/api/products?${queryString}` : '/api/products';

      const response = await api.get<ApiResponse<BackendProduct[]>>(endpoint);
      return response.data ? transformProducts(response.data) : [];
    } catch (error) {
      console.error('Error fetching products', error);
      return [];
    }
  }


  // Fetches single product by ID. Returns null on error to distinguish from "not found"
  async getProductById(id: number): Promise<Product | null> {
    try {
      const response = await api.get<ApiResponse<BackendProduct>>(`/api/products/id/${id}`);
      return response.data ? transformProduct(response.data) : null;
    } catch (error) {
      console.error('Error fetching product', error);
      return null;
    }
  }

  // Fetches single product by URL slug. Used for SEO-friendly routes
  async getProductBySlug(slug: string): Promise<Product | null> {
    try {
      const response = await api.get<ApiResponse<BackendProduct>>(`/api/products/slug/${slug}`);
      return response.data ? transformProduct(response.data) : null;
    } catch (error) {
      console.error('Error fetching product by slug', error);
      return null;
    }
  }

  // Fetches products by category with optional pagination. Returns [] on error
  async getProductsByCategory(category: string, params?: {
    sort?: string;
    limit?: number;
    page?: number;
  }): Promise<Product[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.sort) queryParams.append('sort', params.sort);
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.page) queryParams.append('page', params.page.toString());

      const queryString = queryParams.toString();
      const endpoint = queryString
        ? `/api/products/category/${category}?${queryString}`
        : `/api/products/category/${category}`;

      const response = await api.get<ProductResponse>(endpoint);
      return response.data ? transformProducts(response.data) : [];
    } catch (error) {
      console.error('Error fetching products by category', error);
      return [];
    }
  }
}

export const productService = new ProductService(); 