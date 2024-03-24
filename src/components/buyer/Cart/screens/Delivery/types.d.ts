export type Nav = 'Самовывоз' | 'Курьером';

export interface CardProps {
  byCourier?: boolean;
  title: string;
}

export interface DeliveryScreenProps {
  onSubmit: () => void;
  onBack: () => void;
}
