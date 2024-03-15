export interface CartScreenProps {
  onSubmit: () => void;
  onBack: () => void;
}

export interface CounterProps {
  defaultCount?: number;
  increment?: (count: number) => void;
  decrement?: (count: number) => void;
  className?: string;
  max?: number;
  product: Product;
  myNum:number;
}

export interface Product {
  id?: number;
  image: string;
  title: string;
  shop: string;
  weight: string;
  count: number;
  price: string;
  perPiece: string;
  inStock: number;
}

export interface CardProps {
  onBuy?: () => void;
  product: Product;
}
