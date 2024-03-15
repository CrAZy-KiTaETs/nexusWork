'use client';

// Components
import Image from 'next/image';
import { Counter } from './Counter';

// Icon
import { ArrowRightIcon } from '@/assets/icons/ArrowRight';

// Styles
import styles from './Card.module.scss';

// Types
import type { CardProps } from './types';
import { createRef } from 'react';
import { cartActions } from '@/store/slices/buyer/cart.slice';
import { useDispatch } from '@/hooks/useDispatch';

const products = {
  id: 32,
  image: 'string',
  title: 'string',
  shop: 'string',
  weight: 'string',
  count: 2,
  price: 'string',
  perPiece: 'string',
  inStock: 2,
};

export function Card({ product, onBuy }: CardProps) {
  const dispatch = useDispatch();

  const cardRef = createRef<HTMLDivElement>();

  const handleIncrement = (count: number) => {
    dispatch(cartActions.addToCart({ id: product.id, count: count + 1 }));
  };

  const handleDecrement = (count: number) => {
    count = count - 1;

    if (count === 0) {
      return dispatch(cartActions.removeFromCart({ id: product.id, count }));
    }

    return dispatch(cartActions.addToCart({ id: product.id, count }));
  };

  return (
    <div ref={cardRef} className={styles['card']}>
      <div className={styles['card__main']}>
        <div className={styles['card__image']}>
          <Image src={product.image} alt='' loading='lazy' />
        </div>

        <p className={styles['card__shop']}>{product.shop}</p>
        <p className={styles['card__title']}>{product.title}</p>

        <div className={styles['card__info']}>
          <Counter
          product={products}
            decrement={handleDecrement}
            increment={handleIncrement}
            defaultCount={product.count}
            className={styles['card__counter']}
          />

          <span className={styles['card__weight']}>
            Вес: <span>{product.weight}</span>
          </span>
        </div>
      </div>

      <div className={styles['card__footer']}>
        <p className={styles['card__price']}>{product.price}</p>
        <p className={styles['card__per-piece']}>{product.perPiece}</p>

        <button onClick={onBuy} className={styles['card__button']}>
          <span>Купить</span>
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}
