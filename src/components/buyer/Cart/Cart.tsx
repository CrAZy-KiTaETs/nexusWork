'use client';

// Utils
import { useState } from 'react';
import cn from 'classnames';

// Components
import { Screens } from './screens';

// Styles
import styles from './Cart.module.scss';

export function CartModal({ onClose }: CartProps) {
  const [nav, setNav] = useState<Nav>('Корзина');

  return (
    <div className={cn(styles['cart'], nav === 'Успешно' && styles['success'])}>
      {
        {
          Корзина: (
            <Screens.Cart onBack={() => onClose()} onSubmit={() => setNav('Способ доставки')} />
          ),
          'Способ доставки': (
            <Screens.Delivery
              onBack={() => setNav('Корзина')}
              onSubmit={() => setNav('Оформление заказа')}
            />
          ),
          'Оформление заказа': (
            <Screens.MakingOrder
              onBack={() => setNav('Способ доставки')}
              onSubmit={() => setNav('Успешно')}
            />
          ),
          Успешно: <Screens.Success onClose={onClose} />,
        }[nav]
      }
    </div>
  );
}
