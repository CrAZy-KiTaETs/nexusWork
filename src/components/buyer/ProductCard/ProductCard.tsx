import Image from 'next/image';
import StarIcon from '@/assets/icons/star.svg';
import CartIcon from '@/assets/icons/cart.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import KaspiImage from '@/assets/images/payment-methods/kaspi.png';
import HalykImage from '@/assets/images/payment-methods/halyk.png';
import MoneyImage from '@/assets/images/payment-methods/money.png';
import styles from './ProductCard.module.scss';
import type { Product, ProductCardProps } from './types';
import { useState } from 'react';
import { Counter } from '../Cart/screens/Cart/Counter';
import { cartActions } from '@/store/slices/buyer/cart.slice';
import { useDispatch } from '@/hooks/useDispatch';
import { useSelector } from '@/hooks/useSelector';

import Link from 'next/link';

export function ProductCard({ product }: ProductCardProps) {
  const productInBasket = useSelector((state) => state.buyerCart.find((x) => x.id == product.id));

  const [counter, setCounter] = useState<number>(
    productInBasket?.count ? productInBasket?.count : product.count,
  );
  const [inStock, setInStock] = useState<number>(product.inStock);
  const dispatch = useDispatch();

  const handleSaveToCart = () => {
    /**
     * Сохранение в корзину
     */

    setCounter((prev) => (prev === product.inStock ? product.inStock : prev + 1));
    setInStock((prev) => (prev === 0 ? 0 : prev - 1));

    console.log(product);

    dispatch(
      cartActions.addToCart({
        id: product.id,
        count: counter === product.inStock ? product.inStock : counter + 1,
        inStock: inStock === 0 ? 0 : inStock - 1,
        price: product.price,
        title: product.title,
      }),
    );
  };

  const handleDecrement = (count: number) => {
    count = count - 1;
    setInStock((prev) => prev + 1);

    if (count === 0) {
      dispatch(cartActions.removeFromCart({ id: product.id, count }));
      return setCounter(count);
    }

    dispatch(
      cartActions.addToCart({
        id: product.id,
        count: count,
      }),
    );
  };

  const myNum1 = 1

  const _renderPaymentMethods = ({ methods }: Pick<Product, 'methods'>) => {
    /**
     * Рендер методов оплаты
     */

    return (
      <ul className={styles['product__methods']}>
        <li>
          <Image src={KaspiImage} alt='' />
        </li>
        <li>
          <Image src={HalykImage} alt='' />
        </li>
        <li>
          <Image src={MoneyImage} alt='' />
        </li>
      </ul>
    );
  };
  // href={`/buyer/productPage/${product.id}`

  // localStorage.clear
  // localStorage.setItem('thisProduct', JSON.stringify(product.id))

  return (
    <div className={styles['product']}>
      <div className={styles['product__image']}>
        <Link
          href={`/buyer/${product.id}/`}
          onClick={() => localStorage.setItem('thisProduct', JSON.stringify(product.id))}
        >
          <Image src={product.image} alt='product image' />
        </Link>
      </div>

      <p className={styles['product__shop-name']}>{product.shopName}</p>
      <h2 className={styles['product__title']}>{product.title}</h2>
      <p className={styles['product__description']}>{product.description}</p>

      <div className={styles['product__payment']}>
        <span className={styles['product__price']}>{product.price}</span>

        {_renderPaymentMethods({ methods: product.methods })}
      </div>

      <div className={styles['product__other']}>
        <p
          style={counter >= 1 ? { gridArea: '1/1/2/3' } : {}}
          className={styles['product__in-stock']}
        >
          На складе: <span>{inStock} шт.</span>
        </p>

        <div className={styles['product__rates']}>
          <StarIcon />
          <span>{product.rating}</span>
        </div>

        {counter === 0 ? (
          <button onClick={() => handleSaveToCart()} className={styles['product__cart-button']}>
            <span>Добавить в корзину</span>

            <CartIcon className={styles['product__cart-button_icon-1']} />

            <PlusIcon className={styles['product__cart-button_icon-2']} />
          </button>
        ) : (
          <Counter
          myNum={counter}
            max={product.inStock}
            defaultCount={counter}
            increment={handleSaveToCart}
            decrement={handleDecrement}
            className={styles['product__cart-counter']}
            
          />
        )}
      </div>
    </div>
  );
}
