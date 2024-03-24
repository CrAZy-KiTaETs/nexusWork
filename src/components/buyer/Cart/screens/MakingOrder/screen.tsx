'use client';

// Utils
import cn from 'classnames';
import { useEffect, useState } from 'react';

// Components
import Image from 'next/image';
import { Field } from '@/components/buyer/Field';
import { PaymentMethodModal } from '@/components/buyer/PaymentMethod';

// Icons
import { MapIcon } from '@/assets/icons/Map';
import { UserIcon } from '@/assets/icons/User';
import { CashIcon } from '@/assets/icons/Cash';
import { ListIcon } from '@/assets/icons/List';
import { BankCardIcon } from '@/assets/icons/BankCard';
import { ArrowLeftIcon } from '@/assets/icons/ArrowLeft';
import { ArrowRightIcon } from '@/assets/icons/ArrowRight';
import { CryptoCurrencyIcon } from '@/assets/icons/CryptoCurrency';

// Styles
import styles from './screen.module.scss';
import { useSelector } from '@/hooks/useSelector';

export function MakingOrderScreen({ onSubmit, onBack }: MakingOrderScreenProps) {
  const [selectedPayment, setSelectedPayment] = useState({
    method: '',
    isShow: false,
  });
  const [cartSize, setCartSize] = useState(0);

  const products = useSelector((state) => state.buyerCart);

  useEffect(() => {
    let size = 0;

    products.forEach((product) => (size = size + product.count));

    setCartSize(size);
  }, [products, cartSize]);

  return (
    <>
      <div className={styles['mobile']}>
        <header className={styles['header']}>
          <button onClick={onBack} className={styles['header__back-button']}>
            <ArrowLeftIcon />
          </button>

          <p className={styles['header__title']}>Оформление заказа</p>
        </header>

        <div className={styles['card-list']}>
          <div className={styles['card']}>
            <div className={styles['card-header']}>
              <p className={styles['card-header__title']}>Способ получения</p>
            </div>

            <div className={styles['card-main']}>
              <div className={styles['address']}>
                <div className={styles['address__icon']}>
                  <MapIcon />
                </div>

                <div>
                  <p className={styles['address__title']}>100004 Отделение КазПочты</p>
                  <p className={styles['address__subtitle']}>
                    100004 Карагандинская область, г. Караганда, ул. Орлова, д. 105/2
                  </p>
                  <p className={styles['address__period']}>Срок хранения заказа - 14 дней</p>
                </div>
              </div>

              <div className={styles['receiver']}>
                <div className={styles['receiver__icon']}>
                  <UserIcon />
                </div>

                <div className={styles['receiver__content']}>
                  <span className={styles['receiver__name']}>Джолдаспаев Алимжан,</span>
                  <span className={styles['receiver__phone']}>+7 (747) 103-64-10</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles['card']}>
            <div className={styles['card-header']}>
              <p className={styles['card-header__title']}>Способ оплаты</p>
            </div>

            <div className={styles['card-main']}>
              <div className={styles['payments']}>
                <button
                  tabIndex={0}
                  onClick={() => setSelectedPayment({ isShow: true, method: 'bank-card' })}
                  className={cn(
                    styles['payments__cash'],
                    styles['payments__item'],
                    selectedPayment.method === 'bank-card' && styles['active'],
                  )}
                >
                  <BankCardIcon />
                  <span>Карта</span>
                </button>

                <button
                  tabIndex={0}
                  onClick={() => setSelectedPayment({ isShow: true, method: 'cash' })}
                  className={cn(
                    styles['payments__cash'],
                    styles['payments__item'],
                    selectedPayment.method === 'cash' && styles['active'],
                  )}
                >
                  <CashIcon />
                  <span>Наличными</span>
                </button>

                <button
                  tabIndex={0}
                  onClick={() => setSelectedPayment({ isShow: true, method: 'payment-invoice' })}
                  className={cn(
                    styles['payments__cash'],
                    styles['payments__item'],
                    selectedPayment.method === 'payment-invoice' && styles['active'],
                  )}
                >
                  <ListIcon />
                  <span>Счет на оплату</span>
                </button>

                <button
                  disabled
                  tabIndex={0}
                  className={cn(styles['payments__cash'], styles['payments__item'])}
                >
                  <CryptoCurrencyIcon />
                  <span>Криптовалюта</span>
                </button>
              </div>
            </div>
          </div>

          <div className={styles['card']}>
            <div className={styles['card-header']}>
              <p className={styles['card-header__title']}>Ваша корзина</p>
              <p className={styles['card-header__result']}>
                {cartSize} товара, {cartSize} кг
              </p>
            </div>

            <div className={styles['card-main']}>
              <ul className={styles['result-list']}>
                <li className={styles['result-item']}>
                  <span>Товары ({cartSize})</span>
                  <span>{cartSize}00 000 ₸ </span>
                </li>
              </ul>

              <div className={styles['divider']}></div>

              <ul className={styles['result-list']}>
                <li className={styles['result-item']}>
                  <span>Итого</span>
                  <span>{cartSize}00 000 ₸ </span>
                </li>
              </ul>
            </div>

            <button onClick={onSubmit} className={styles['card__button']}>
              <span>Оформить заказ</span>
              <ArrowRightIcon />
              {/* <span>1 шт., 100 000 ₸</span> */}
            </button>
          </div>

          <div className={styles['card']}>
            <div className={styles['card-header']}>
              <p className={styles['card-header__title']}>Дата доставки: 23 октября, бесплатно</p>
              <p className={styles['card-header__result']}>
                {cartSize} товара, {cartSize} кг
              </p>
            </div>

            <div className={styles['card-main']}>
              <div className={styles['products']}>
                <ul className={styles['products-list']}>
                  {products.map((index, key) => (
                    <li key={key}>
                      <div className={styles['product']}>
                        <div className={styles['product__image']}>
                          <Image src={require('@/assets/images/test/cake.png')} alt='' />
                        </div>
                        <p className={styles['product__price']}>{index.price}</p>
                        <p className={styles['product__shop']}>{index.title}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={styles['card']}>
            <div className={styles['card-header']}>
              <p className={styles['card-header__title']}>Дополнительные параметры</p>
            </div>

            <div className={styles['card-main']}>
              <div className={styles['parameters']}>
                <Field
                  containerClassName={styles['parameters__field']}
                  placeholder={'Выберите дату доставки'}
                />
                <Field
                  containerClassName={styles['parameters__field']}
                  placeholder={'Впишите комментарий'}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={cn(styles['card'], styles['confirm-order'])}>
          <div className={styles['card-header']}>
            <p className={styles['card-header__title']}>Ваша корзина</p>
            <p className={styles['card-header__result']}>
              {cartSize} товара, {cartSize} кг
            </p>
          </div>

          <div className={styles['card-main']}>
            <ul className={styles['result-list']}>
              <li className={styles['result-item']}>
                <span>Товары ({cartSize})</span>
                <span>{cartSize}00 000 ₸ </span>
              </li>
            </ul>

            <div className={styles['divider']}></div>

            <ul className={styles['result-list']}>
              <li className={styles['result-item']}>
                <span>Итого</span>
                <span>{cartSize}00 000 ₸ </span>
              </li>
            </ul>
          </div>

          <button onClick={onSubmit} className={styles['card__button']}>
            <span>Оформить заказ</span>
            <ArrowRightIcon />
            {/* <span>1 шт., 100 000 ₸</span> */}
          </button>
        </div>
      </div>

      {selectedPayment.isShow && (
        <PaymentMethodModal
          onSubmit={() => setSelectedPayment({ isShow: false, method: '' })}
          onClose={() => setSelectedPayment({ isShow: false, method: '' })}
          method={selectedPayment.method}
        />
      )}
    </>
  );
}
