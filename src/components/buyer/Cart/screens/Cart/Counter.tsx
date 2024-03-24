'use client';

import cn from 'classnames';
import { useState } from 'react';
import type { CounterProps } from './types';
import { useDispatch } from '@/hooks/useDispatch';
import { cartActions } from '@/store/slices/buyer/cart.slice';
import { useSelector } from '@/hooks/useSelector';

import { MinusIcon } from '@/assets/icons/Minus';
import { PlusIcon } from '@/assets/icons/Plus';
import TrashIcon from '@/assets/icons/trash.svg';
import styles from './Counter.module.scss';

export function Counter({
  defaultCount,
  increment,
  decrement,
  className,
  max,
  product,
}: CounterProps) {
  // const productInBasket = useSelector((state) => state.buyerCart.find((x) => x.id == product.id))
  const [count, setCount] = useState<number>(defaultCount || 0);
  const dispatch = useDispatch();
  const lol = useSelector(state => state.buyerCart)

  function handleIncrement() {
    setCount((prev) => (prev === max ? max : prev + 1));

    console.log(lol,'lool')
    if (increment) increment(count);

    /*
    ДОбавляем продукт с его отдельной страницы
    в корзину

    if(dataFromSinglePage) {
      console.log('Это КАУНТЕР')
      
    }
    */
  }


  function handleDecrement() {
    setCount((prev) => (prev === 0 ? prev : prev - 1)); // было 1 вместо 0
    if (decrement) decrement(count);
    //ниже кода не было
    // console.log(product)
    if (product) {
      if (count === 1) {
        dispatch(
          cartActions.removeFromCart({
            id: product.id,
          }),
        );
        return setCount(count);
      }

      dispatch(
        cartActions.addToCart({
          id: product.id,
          count: count,
          inStock: product.inStock,
          price: product.price,
          title: product.title,
        }),
      );
    }
  }



  return (
    <div className={cn(styles['counter'], className)}>
      <button
        onClick={handleDecrement}
        className={cn(styles['counter__button'], count === 1 && styles['trash'])}
      >
        {count === 1 ? <TrashIcon /> : <MinusIcon />}
      </button>

      <span className={styles['counter__count']}>{count}</span>

      <button onClick={handleIncrement} className={styles['counter__button']}>
        <PlusIcon />
      </button>
    </div>
  );
}
