'use client';

import cn from 'classnames';
import { useEffect, useState } from 'react';
import type { CounterProps } from './types';
import { useDispatch } from '@/hooks/useDispatch';
import { cartActions } from '@/store/slices/buyer/cart.slice';
import { useSelector } from '@/hooks/useSelector';

import { MinusIcon } from '@/assets/icons/Minus';
import { PlusIcon } from '@/assets/icons/Plus';
import TrashIcon from '@/assets/icons/trash.svg';
import styles from './Counter.module.scss';

let URL = 'http://127.0.0.1:8000/api/v1';
const key =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ1c2VyIjp7ImVtYWlsIjoickByLmNvbSIsInBob25lIjoiNzc3NzUxODc1MDEiLCJpZCI6IjEifX0.9l-B_e4JNSa8IKDren_e11ONeUVCkY33kyhSaplOjaM';

export function Counter({
  defaultCount,
  increment,
  decrement,
  className,
  max,
  product,
}: CounterProps) {














  let runOnce = false;
  // const productInBasket = useSelector((state) => state.buyerCart.find((x) => x.id == product.id))
  const [count, setCount] = useState<number>(defaultCount || 0);
  const dispatch = useDispatch();
  const lol = useSelector((state) => state.buyerCart);
  const [amounFromBack, setAbountFromBasket] = useState();

  const getAmount = async () => {
    const amount = await fetch(`${URL}/carts`, {
      headers: {
        Authorization: key,
      },
    });
    const data = await amount.json();
    const thisProduct = data.items.find((x) => x.item.id === product.id);
    setCount(thisProduct.amount);
    // console.log('ЭТО ТОВАРЫ КОРЗИНЫ СЕРВЕРА', thisProduct);
  };

  function handleIncrement() {
    const newCount = count === 5 ? 5 : count + 1;

    // console.log('ЧТО ЗА ПРОДУКТ ПРИХОДИТ В КАУНТЕР', product);
    setCount(newCount);
    sendDataToAPI({ item: product.id, amount: newCount });
    // console.log('НАЖАТИЕ НА +', lol);
    if (increment) increment(count);

    dispatch(
      cartActions.addToCart({
        id: product.id,
      }),
    );

    /*
    ДОбавляем продукт с его отдельной страницы
    в корзину

    if(dataFromSinglePage) {
      console.log('Это КАУНТЕР')
      
    }
    */
  }

  useEffect(() => {
    getAmount();
    runOnce = true;
  }, [runOnce]);

  function handleDecrement() {
    const newCount = count === 0 ? 0 : count - 1;

    setCount(newCount); // было 1 вместо 0
    sendDataToAPI({ item: product.id, amount: newCount });

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
        }),
      );
    }
  }

  const sendDataToAPI = async (dataArray) => {
    try {
      const response = await fetch(`${URL}/carts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: key,
          // Добавьте любые другие необходимые заголовки, например, авторизацию
        },
        body: JSON.stringify(dataArray),
      });

      if (!response.ok) {
        throw new Error('Ошибка отправки данных на сервер');
      }

      // console.log('Данные успешно отправлены на сервер');
    } catch (error) {
      console.error('Ошибка:', error.message);
    }
  };

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
