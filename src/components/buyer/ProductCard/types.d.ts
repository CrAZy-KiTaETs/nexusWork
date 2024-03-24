import type { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface Product {
  id?: number;
  image: StaticImport | string;
  shopName: string;
  title: string;
  description: string;
  price: string;
  methods: string[];
  inStock: number;
  rating: string;
  count: number;
}

export interface myProduct {
  id?: number;
  uom: {
      name: string;
  };
  subcategory: {
      id: number;
      category: {
          id: number;
          name: string;
          description: string;
          store: number;
      };
      name: string;
      description: string;
      store: number;
  };
  name: string;
  created_at: string;
  status: boolean;
  preview: string;
  store: number;
}

export interface ProductCardProps {
  product: Product;
}
