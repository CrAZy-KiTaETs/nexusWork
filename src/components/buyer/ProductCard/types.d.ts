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

export interface ProductCardProps {
  product: Product;
}
