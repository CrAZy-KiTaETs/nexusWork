import Image from 'next/image';
import StarIcon from '@/assets/icons/star.svg';
import CartIcon from '@/assets/icons/cart.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import KaspiImage from '@/assets/images/payment-methods/kaspi.png';
import HalykImage from '@/assets/images/payment-methods/halyk.png';
import MoneyImage from '@/assets/images/payment-methods/money.png';
import styles from './ProductCard.module.scss';
import type { Product, ProductCardProps, myProduct } from './types';
import { useEffect, useState } from 'react';
import { Counter } from '../Cart/screens/Cart/Counter';
import { cartActions } from '@/store/slices/buyer/cart.slice';
import { useDispatch } from '@/hooks/useDispatch';
import { useSelector } from '@/hooks/useSelector';

import Link from 'next/link';

let URL = 'http://127.0.0.1:8000/api/v1';
const key =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ1c2VyIjp7ImVtYWlsIjoickByLmNvbSIsInBob25lIjoiNzc3NzUxODc1MDEiLCJpZCI6IjEifX0.9l-B_e4JNSa8IKDren_e11ONeUVCkY33kyhSaplOjaM';

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

console.log(JSON.parse(localStorage.getItem('Products')), 'LOCALSTORAGE232');

export function ProductCard({ product }: myProduct) {
  const productInBasket = useSelector((state) => state.buyerCart.find((x) => x.id == product.id));

  const [counter, setCounter] = useState<number>(0);
  const [inStock, setInStock] = useState<number>(product.inStock);
  const dispatch = useDispatch();

  const handleSaveToCart = () => {
    /*Сохранение в корзину*/

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

  const _renderPaymentMethods = ({ methods }: Pick<Product, 'methods'>) => {
    /* Рендер методов оплаты */

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

  // console.log('ЭТО ПРОДУКТЫ В КРТОЧКЕ', product);

  const nice = {
    user: 0,
    cart_items: [
      {
        item: {
          id: 0,
          uom: {
            name: 'string',
          },
          subcategory: {
            id: 0,
            category: {
              id: 0,
              name: 'string',
              description: 'string',
              store: 0,
            },
            name: 'string',
            description: 'string',
            store: 0,
          },
          name: 'string',
          created_at: '2024-03-22',
          status: true,
          preview: 'string',
          store: 0,
        },
        amount: 9223372036854776000,
      },
    ],
  };

  const sendDataToAPI = async (dataArray) => {
    try {
      const response = await fetch(`${URL}/carts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: key,
          // Добавьте любые другие необходимые заголовки, например, авторизацию
        },
        body: JSON.stringify(nice),
      });

      if (!response.ok) {
        throw new Error('Ошибка отправки данных на сервер');
      }

      console.log('Данные успешно отправлены на сервер');
    } catch (error) {
      console.error('Ошибка:', error.message);
    }
  };

  function putInBasket(params: type) {
    sendDataToAPI(nice);
    console.log(product);
  }

  return (
    <div className={styles['product']}>
      <div className={styles['product__image']}>
        <Link
          href={`/buyer/${product.subcategory.store}/${product.id}/`}
          onClick={() => localStorage.setItem('thisProduct', JSON.stringify(product.id))}
        >
          {/* <Image src={product.image} alt='product image' /> */}
          <img src={product.preview} />
        </Link>
      </div>

      <h2 className={styles['product__title']}>{product.name}</h2>
      <p className={styles['product__description']}>{product.subcategory.name}</p>

      <div className={styles['product__payment']}>
        <span className={styles['product__price']}>667$</span>

        {_renderPaymentMethods({ methods: product.methods })}
      </div>

      <div className={styles['product__other']}>
        <p
          style={counter >= 1 ? { gridArea: '1/1/2/3' } : {}}
          className={styles['product__in-stock']}
        >
          На складе:{' '}
          <span>
            {product.id} {product.uom.name}
          </span>
        </p>

        <div className={styles['product__rates']}>
          <StarIcon />
          <span>{product.subcategory.id}</span>
        </div>

        {counter === 0 ? (
          <button onClick={() => handleSaveToCart()} className={styles['product__cart-button']}>
            <span>Добавить в корзину</span>

            <CartIcon className={styles['product__cart-button_icon-1']} />

            <PlusIcon className={styles['product__cart-button_icon-2']} />
          </button>
        ) : (
          <Counter
            product={products}
            max={product.inStock}
            defaultCount={counter}
            increment={handleSaveToCart}
            decrement={handleDecrement}
            className={styles['product__cart-counter']}
          />
        )}
      </div>
      <button onClick={putInBasket}>CLICK</button>
    </div>
  );
}

// import Image from 'next/image';
// import StarIcon from '@/assets/icons/star.svg';
// import CartIcon from '@/assets/icons/cart.svg';
// import PlusIcon from '@/assets/icons/plus.svg';
// import KaspiImage from '@/assets/images/payment-methods/kaspi.png';
// import HalykImage from '@/assets/images/payment-methods/halyk.png';
// import MoneyImage from '@/assets/images/payment-methods/money.png';
// import styles from './ProductCard.module.scss';
// import type { Product, ProductCardProps, myProduct } from './types';
// import { useState } from 'react';
// import { Counter } from '../Cart/screens/Cart/Counter';
// import { cartActions } from '@/store/slices/buyer/cart.slice';
// import { useDispatch } from '@/hooks/useDispatch';
// import { useSelector } from '@/hooks/useSelector';

// import Link from 'next/link';

// const products = {
//   id: 32,
//   image: 'string',
//   title: 'string',
//   shop: 'string',
//   weight: 'string',
//   count: 2,
//   price: 'string',
//   perPiece: 'string',
//   inStock: 2,
// };

// export function ProductCard({ product }: ProductCardProps) {
//   const productInBasket = useSelector((state) => state.buyerCart.find((x) => x.id == product.id));
//   const img = 'http://127.0.0.1:8000/media/images/noimage.png';

//   const [counter, setCounter] = useState<number>(
//     productInBasket?.count ? productInBasket?.count : product.count,
//   );
//   const [inStock, setInStock] = useState<number>(product.inStock);
//   const dispatch = useDispatch();

//   const handleSaveToCart = () => {
//     /**
//      * Сохранение в корзину
//      */

//     setCounter((prev) => (prev === product.inStock ? product.inStock : prev + 1));
//     setInStock((prev) => (prev === 0 ? 0 : prev - 1));

//     console.log(product);

//     dispatch(
//       cartActions.addToCart({
//         id: product.id,
//         count: counter === product.inStock ? product.inStock : counter + 1,
//         inStock: inStock === 0 ? 0 : inStock - 1,
//         price: product.price,
//         title: product.title,
//       }),
//     );
//   };

//   const handleDecrement = (count: number) => {
//     count = count - 1;
//     setInStock((prev) => prev + 1);

//     if (count === 0) {
//       dispatch(cartActions.removeFromCart({ id: product.id, count }));
//       return setCounter(count);
//     }

//     dispatch(
//       cartActions.addToCart({
//         id: product.id,
//         count: count,
//       }),
//     );
//   };

//   const _renderPaymentMethods = ({ methods }: Pick<Product, 'methods'>) => {
//     /**
//      * Рендер методов оплаты
//      */

//     return (
//       <ul className={styles['product__methods']}>
//         <li>
//           <Image src={KaspiImage} alt='' />
//         </li>
//         <li>
//           <Image src={HalykImage} alt='' />
//         </li>
//         <li>
//           <Image src={MoneyImage} alt='' />
//         </li>
//       </ul>
//     );
//   };
//   // href={`/buyer/productPage/${product.id}`

//   // localStorage.clear
//   // localStorage.setItem('thisProduct', JSON.stringify(product.id))

//   return (
//     <div className={styles['product']}>
//       <div className={styles['product__image']}>
//         <Link
//           href={`/buyer/${product.id}/`}
//           onClick={() => localStorage.setItem('thisProduct', JSON.stringify(product.id))}
//         >
//           <Image src={product.image} alt='product image' />
//           {/* <img  src={img}/> */}
//         </Link>
//       </div>

//       <h2 className={styles['product__title']}>{product.title}</h2>
//       <p className={styles['product__description']}>{product.title}</p>

//       <div className={styles['product__payment']}>
//         <span className={styles['product__price']}>667$</span>

//         {_renderPaymentMethods({ methods: product.methods })}
//       </div>

//       <div className={styles['product__other']}>
//         <p
//           style={counter >= 1 ? { gridArea: '1/1/2/3' } : {}}
//           className={styles['product__in-stock']}
//         >
//           На складе:{' '}
//           <span>
//             {product.id} {product.inStock}
//           </span>
//         </p>

//         <div className={styles['product__rates']}>
//           <StarIcon />
//           <span>{product.rating}</span>
//         </div>

//         {counter === 0 ? (
//           <button onClick={() => handleSaveToCart()} className={styles['product__cart-button']}>
//             <span>Добавить в корзину</span>

//             <CartIcon className={styles['product__cart-button_icon-1']} />

//             <PlusIcon className={styles['product__cart-button_icon-2']} />
//           </button>
//         ) : (
//           <Counter
//             product={products}
//             max={product.inStock}
//             defaultCount={counter}
//             increment={handleSaveToCart}
//             decrement={handleDecrement}
//             className={styles['product__cart-counter']}
//           />
//         )}
//       </div>
//     </div>
//   );
// }
