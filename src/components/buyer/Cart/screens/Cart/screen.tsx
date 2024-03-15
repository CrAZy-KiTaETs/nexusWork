// Components
import Image from 'next/image';
import { Card } from './Card';
import { Counter } from './Counter';
import { useDispatch } from '@/hooks/useDispatch';
import { cartActions } from '@/store/slices/buyer/cart.slice';

// Styles
import styles from './screen.module.scss';

// Icons
import { ArrowLeftIcon } from '@/assets/icons/ArrowLeft';
import { ArrowRightIcon } from '@/assets/icons/ArrowRight';

// Types
import type { CartScreenProps } from './types';
import { useSelector } from '@/hooks/useSelector';
import { useEffect, useState } from 'react';

export function CartScreen({ onSubmit, onBack }: CartScreenProps) {
  const [cartSize, setCartSize] = useState(0);

  const products = useSelector((state) => state.buyerCart);

  useEffect(() => {
    let size = 0;

    products.forEach((product) => (size = size + product.count));
    console.log(products, ' useEffect')
    setCartSize(size);
  }, [products, cartSize]);

  const dispatch = useDispatch()

  function deleteItem(product) {
    dispatch(
      cartActions.removeFromCart({
        id: product.id,
      }),
    );
  }

  return (
    <>
      <div className={styles['mobile']}>
        <header className={styles['header']}>
          <button onClick={onBack} className={styles['header__back-button']}>
            <ArrowLeftIcon />
          </button>

          <p className={styles['header__title']}>Корзина</p>

          <button className={styles['header__select-button']}>Выбрать</button>
        </header>

        <div className={styles['cart-screen']}>
          {products.map((product, key) => (
            <Card
              key={key}
              product={{
                id: product.id,
                image: require('@/assets/images/test/cake.png'),
                title: `Торт "Чизкейк"`,
                shop: 'Кондитерская “Hani”',
                weight: '1кг',
                count: product.count,
                price: '100 000 ₸',
                perPiece: 'Цена за 1 шт: 100 000 ₸',
                inStock: 3
              }}
              onBuy={() => onSubmit()}
            />
          ))}
        </div>

        {products.length && (
          <button onClick={onSubmit} className={styles['cart-screen__button']}>
            <span>Перейти к подтверждению</span>
            <span>
              {cartSize} шт., {cartSize}00 000 ₸
            </span>
          </button>
        )}
      </div>

      <div className={styles['desktop']}>
        <header className={styles['header']}>
          <button onClick={onBack} className={styles['header__back-button']}>
            <ArrowLeftIcon />
          </button>

          <p className={styles['header__title']}>Корзина</p>
        </header>

        <div className={styles['actions']}>
          <div className={styles['actions__select']}>
            <input type='checkbox' id='select-all' />
            <label htmlFor='select-all'>Выбрать все</label>
          </div>

          <button className={styles['actions__delete']}>
            <TrashIcon />
            <span>Удалить выбранные</span>
          </button>
        </div>

        <div className={styles['table-wrapper']}>
          <table className={styles['table']}>
            <tbody className={styles['table__body']}>
              {products.map((index) => (
                <tr key={index.id} className={styles['table__row']}>
                  <td className={styles['table__data']}>
                    <div className={styles['product']}>
                      <input type='checkbox' className={styles['product__checkbox']} />
                    </div>
                  </td>

                  <td className={styles['table__data']}>
                    <div className={styles['product']}>
                      <Image
                        src={require('@/assets/images/test/cake.png')}
                        alt=''
                        className={styles['product__image']}
                      />
                      <p className={styles['product__title']}>{index.title}</p>
                    </div>
                  </td>

                  <td className={styles['table__data']}>
                    <div className={styles['product']}>
                      <p className={styles['product__name']}>Кондитерская “Hani”</p>
                    </div>
                  </td>

                  <td className={styles['table__data']} align='right'>
                    <div className={styles['product']}>
                      <p className={styles['product__name']}>1 кг</p>
                    </div>
                  </td>

                  <td className={styles['table__data']} align='right'>
                    <div className={styles['product']}>
                      <p className={styles['product__name']}>{index.price}</p>
                    </div>
                  </td>
                  <td>
                    <p>На складе: {index.inStock}</p>
                  </td>

                  <td className={styles['table__data']} align='center'>
                    <div className={styles['product']}>
                      <Counter className={styles['product__counter']} product={index} defaultCount={index.count} />
                    </div>
                  </td>

                  <td className={styles['table__data']}>
                    <div className={styles['product']}>
                      <button onClick={() => deleteItem(index)} className={styles['product__delete-action']}>
                        <TrashIcon/>
                        <span >Удалить</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles['result']}>
          <div className={styles['result-header']}>
            <p className={styles['result-header__title']}>Ваша корзина</p>
            <p className={styles['result-header__result']}>3 товара, 3 кг</p>
          </div>

          <div className={styles['result-main']}>
            <ul className={styles['result-main__list']}>
              <li className={styles['result-main__item']}>
                <span>Товары (3)</span>
                <span>700 000 ₸</span>
              </li>
            </ul>

            <ul className={styles['result-main__list']}>
              <li className={styles['result-main__item']}>
                <span>Итого</span>
                <span>700 000 ₸</span>
              </li>
            </ul>

            <button onClick={onSubmit} className={styles['result-main__button']}>
              <span>Перейти к подтверждению</span>
              <ArrowRightIcon />
            </button>

            <div className={styles['result-main__banner']}></div>
          </div>
        </div>
      </div>
    </>
  );
}

function TrashIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
      <mask id='mask0_1072_8344' maskUnits='userSpaceOnUse' x='0' y='0' width='16' height='16'>
        <rect width='16' height='16' fill='#D9D9D9' />
      </mask>

      <g mask='url(#mask0_1072_8344)'>
        <path
          d='M3.5 16C3.04167 16 2.64944 15.8369 2.32333 15.5108C1.99667 15.1842 1.83333 14.7917 1.83333 14.3333V3.5C1.59722 3.5 1.39917 3.42028 1.23917 3.26083C1.07972 3.10083 1 2.90278 1 2.66667C1 2.43056 1.07972 2.2325 1.23917 2.0725C1.39917 1.91306 1.59722 1.83333 1.83333 1.83333H5.16667C5.16667 1.59722 5.24667 1.39917 5.40667 1.23917C5.56611 1.07972 5.76389 1 6 1H9.33333C9.56944 1 9.7675 1.07972 9.9275 1.23917C10.0869 1.39917 10.1667 1.59722 10.1667 1.83333H13.5C13.7361 1.83333 13.9339 1.91306 14.0933 2.0725C14.2533 2.2325 14.3333 2.43056 14.3333 2.66667C14.3333 2.90278 14.2533 3.10083 14.0933 3.26083C13.9339 3.42028 13.7361 3.5 13.5 3.5V14.3333C13.5 14.7917 13.3369 15.1842 13.0108 15.5108C12.6842 15.8369 12.2917 16 11.8333 16H3.5ZM5.16667 11.8333C5.16667 12.0694 5.24667 12.2672 5.40667 12.4267C5.56611 12.5867 5.76389 12.6667 6 12.6667C6.23611 12.6667 6.43417 12.5867 6.59417 12.4267C6.75361 12.2672 6.83333 12.0694 6.83333 11.8333V6C6.83333 5.76389 6.75361 5.56583 6.59417 5.40583C6.43417 5.24639 6.23611 5.16667 6 5.16667C5.76389 5.16667 5.56611 5.24639 5.40667 5.40583C5.24667 5.56583 5.16667 5.76389 5.16667 6V11.8333ZM8.5 11.8333C8.5 12.0694 8.58 12.2672 8.74 12.4267C8.89944 12.5867 9.09722 12.6667 9.33333 12.6667C9.56944 12.6667 9.7675 12.5867 9.9275 12.4267C10.0869 12.2672 10.1667 12.0694 10.1667 11.8333V6C10.1667 5.76389 10.0869 5.56583 9.9275 5.40583C9.7675 5.24639 9.56944 5.16667 9.33333 5.16667C9.09722 5.16667 8.89944 5.24639 8.74 5.40583C8.58 5.56583 8.5 5.76389 8.5 6V11.8333Z'
          fill='#FF316A'
        />
      </g>
    </svg>
  );
}
