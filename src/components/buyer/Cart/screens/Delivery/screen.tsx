// Utils
import { useState } from 'react';
import cn from 'classnames';

// Components
import { Card } from './Card';

// Icons
import { PlusIcon } from '@/assets/icons/Plus';
import { ArrowRightIcon } from '@/assets/icons/ArrowRight';

// Styles
import styles from './screen.module.scss';

// Types
import type { DeliveryScreenProps, Nav } from './types';
import { ArrowLeftIcon } from '@/assets/icons/ArrowLeft';
import { Field } from '@/components/buyer/Field';
import { SearchIcon } from '@/assets/icons/Search';
import { TruckIcon } from '@/assets/icons/Truck';
import { MapIcon } from '@/assets/icons/Map';

export function DeliveryScreen({ onSubmit, onBack }: DeliveryScreenProps) {
  const [nav, setNav] = useState<Nav>('Самовывоз');
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState<boolean>(false);

  return (
    <>
      <div className={styles['mobile']}>
        <header className={styles['header']}>
          <button onClick={onBack} className={styles['header__back-button']}>
            <ArrowLeftIcon />
          </button>

          <p className={styles['header__title']}>Способ доставки</p>
        </header>

        <div className={styles['nav']}>
          <button
            onClick={() => setNav('Самовывоз')}
            className={cn(styles['nav__button'], nav === 'Самовывоз' && styles['active'])}
          >
            Самовывоз
          </button>
          <button
            onClick={() => setNav('Курьером')}
            className={cn(styles['nav__button'], nav === 'Курьером' && styles['active'])}
          >
            Курьером
          </button>
        </div>

        <div className={styles['main']}>
          {
            {
              Самовывоз: [1, 2, 3, 4, 5, 6, 7].map((key) => (
                <Card key={key} title='100004 Отделение КазПочты' />
              )),

              Курьером: [1].map((key) => (
                <Card
                  key={key}
                  byCourier
                  title='Карагандинская область, г. Караганда, ул. Орлова, д. 105/2'
                />
              )),
            }[nav]
          }

          <button className={styles['main__button']}>
            <PlusIcon />
            <span>Добавить точку самовывоза</span>
          </button>
        </div>

        <form className={styles['form']}>
          <div className={styles['form__main']}>
            <p className={styles['form__title']}>Данные получателя</p>

            <input
              type='text'
              className={styles['form__input']}
              placeholder='ФИО'
              defaultValue={'Алимжан Джолдаспаев'}
            />
            <input
              type='text'
              className={styles['form__input']}
              placeholder='Телефон'
              defaultValue={'+7 (747) 103-64-10'}
            />
          </div>

          <button onClick={onSubmit} className={styles['form__button']}>
            <span>Перейти к оформлению</span>
            <ArrowRightIcon />
          </button>
        </form>
      </div>

      <div className={styles['desktop']}>
        <header className={styles['header']}>
          <button onClick={onBack} className={styles['header__back-button']}>
            <ArrowLeftIcon />
          </button>

          <p className={styles['header__title']}>Способ доставки</p>
        </header>

        <div className={styles['wrapper']}>
          <div className={styles['delivery']}>
            <div className={styles['method']}>
              <button
                onClick={() => setNav('Самовывоз')}
                className={cn(styles['method__button'], nav === 'Самовывоз' && styles['active'])}
              >
                Самовывоз
              </button>
              <button
                onClick={() => setNav('Курьером')}
                className={cn(styles['method__button'], nav === 'Курьером' && styles['active'])}
              >
                Курьером
              </button>
            </div>

            {!selectedDeliveryAddress && (
              <>
                <p className={styles['delivery__title']}>Куда доставить заказ?</p>
                <p className={styles['delivery__description']}>
                  Выберите пункт выдачи на карте или используйте поиск
                </p>

                <Field
                  onClick={() => setSelectedDeliveryAddress((prev) => !prev)}
                  containerClassName={styles['delivery__search']}
                  leftIcon={<SearchIcon />}
                  placeholder='Искать на карте'
                />
              </>
            )}

            {selectedDeliveryAddress && nav === 'Самовывоз' && (
              <>
                <div className={styles['address']}>
                  <ul className={styles['address__list']}>
                    <li className={styles['address__item']}>
                      <TruckIcon />
                      <span>Доставка с четверга, 19 октября, бесплатно</span>
                    </li>

                    <li className={styles['address__item']}>
                      <MapIcon />
                      <span>Дворец культуры горняков</span>
                    </li>
                  </ul>
                </div>

                <form className={styles['form']}>
                  <div className={styles['form__main']}>
                    <p className={styles['form__title']}>Данные получателя</p>

                    <input
                      type='text'
                      className={styles['form__input']}
                      placeholder='ФИО'
                      defaultValue={'Алимжан Джолдаспаев'}
                    />
                    <input
                      type='text'
                      className={styles['form__input']}
                      placeholder='Телефон'
                      defaultValue={'+7 (747) 103-64-10'}
                    />
                  </div>

                  <button onClick={onSubmit} className={styles['form__button']}>
                    <span>Привезти сюда</span>
                    <ArrowRightIcon />
                  </button>
                </form>
              </>
            )}

            {selectedDeliveryAddress && nav === 'Курьером' && (
              <>
                <div className={styles['address']}>
                  <ul className={styles['address__list']}>
                    <li className={styles['address__item']}>
                      <TruckIcon />
                      <span>
                        Доставка с понедельника, 16 октября, от <b>1 200 ₸</b>
                      </span>
                    </li>
                  </ul>

                  <div className={styles['courier-form']}>
                    <input
                      className={styles['courier-form__input']}
                      type='text'
                      placeholder='Адрес'
                      defaultValue={'Дворец культуры горняков'}
                    />
                    <input
                      className={styles['courier-form__input']}
                      type='text'
                      placeholder='Квартира/Офис'
                    />
                    <input
                      className={styles['courier-form__input']}
                      type='text'
                      placeholder='Индекс'
                    />
                    <input
                      className={styles['courier-form__input']}
                      type='text'
                      placeholder='Подъезд'
                    />
                    <input
                      className={styles['courier-form__input']}
                      type='text'
                      placeholder='Этаж'
                    />
                    <input
                      className={styles['courier-form__input']}
                      type='text'
                      placeholder='Комментарий к курьеру'
                    />
                  </div>
                </div>

                <form className={styles['form']}>
                  <div className={styles['form__main']}>
                    <p className={styles['form__title']}>Данные получателя</p>

                    <input
                      type='text'
                      className={styles['form__input']}
                      placeholder='ФИО'
                      defaultValue={'Алимжан Джолдаспаев'}
                    />
                    <input
                      type='text'
                      className={styles['form__input']}
                      placeholder='Телефон'
                      defaultValue={'+7 (747) 103-64-10'}
                    />
                  </div>

                  <button onClick={onSubmit} className={styles['form__button']}>
                    <span>Перейти к оформлению</span>
                    <ArrowRightIcon />
                  </button>
                </form>
              </>
            )}
          </div>

          <div className={styles['map']}></div>
        </div>
      </div>
    </>
  );
}
