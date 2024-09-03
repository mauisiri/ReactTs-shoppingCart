import { Product } from '../types/Product';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('/products.json');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
