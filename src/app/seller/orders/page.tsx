'use client';

import cn from 'classnames';
import { useState } from 'react';

import { CreateOrder } from '@/components/modals/CreateOrder';
import Link from 'next/link';
import Image from 'next/image';
import FilterRowIcon from '@/assets/icons/filters/filter-row.svg';
import FilterColumnIcon from '@/assets/icons/filters/filter-column.svg';
import styles from './page.module.scss';

import { PlusIcon } from '@/assets/icons/Plus';
import { ChevronTopIcon } from '@/assets/icons/ChevronTop';
import { ChevronBottomIcon } from '@/assets/icons/ChevronBottom';
import { CalendarIcon } from '@/assets/icons/Calendar';
import { FilterIcon } from '@/assets/icons/Filter';
import { StatusSelect } from '@/components/shared/orders/StatusSelect';

export default function Orders() {
  const [isShowCreateOrderModal, setIsShowCreateOrderModal] = useState(false);

  const handleToggleCreateOrderModal = () => {
    setIsShowCreateOrderModal((prev) => !prev);
  };

  const handleCloseCreateOrderModal = () => {
    setIsShowCreateOrderModal(false);
  };

  return (
    <div className={styles['main']}>
      {/* Modals */}
      {isShowCreateOrderModal && <CreateOrder onClose={handleCloseCreateOrderModal} />}

      <div className={styles['order-management']}>
        <div className={styles['order-management__header']}>
          <div className={styles['order-management__left']}>
            <div className={styles['order-management__grid-actions']}>
              <button className={styles['order-management__grid-button']}>
                <FilterRowIcon />
              </button>

              <button className={styles['order-management__grid-button']}>
                <FilterColumnIcon />
              </button>
            </div>

            <nav className={styles['order-management__nav']}>
              <button className={styles['order-management__nav-link']}>Заявки</button>
              <button className={cn(styles['order-management__nav-link'], styles['active'])}>
                Заказы
              </button>
            </nav>
          </div>

          <p className={styles['order-management__title']}>4 заказа, 400 000 ₸</p>

          <div>
            <button className={styles['order-management__filter']}>
              <FilterIcon />
            </button>

            <button
              onClick={handleToggleCreateOrderModal}
              className={styles['order-management__button']}
            >
              <PlusIcon />
              <span>Создать заказ</span>
            </button>
          </div>
        </div>

        <div className={styles['order-management__table']}>
          <table className={styles['table']}>
            <thead className={styles['table__head']}>
              <tr>
                <th className={styles['table__head-th']}>
                  <div className={cn(styles['table__head-element'], styles['first'])}>
                    <p>Контрагент</p>
                    <span>
                      <ChevronTopIcon />
                      <ChevronBottomIcon />
                    </span>
                  </div>
                </th>

                <th className={styles['table__head-th']}>
                  <div className={styles['table__head-element']}>
                    <p>Номер заказа</p>
                    <span>
                      <ChevronTopIcon />
                      <ChevronBottomIcon />
                    </span>
                  </div>
                </th>

                <th className={styles['table__head-th']}>
                  <div className={styles['table__head-element']}>
                    <p>Сумма</p>
                    <span>
                      <ChevronTopIcon />
                      <ChevronBottomIcon />
                    </span>
                  </div>
                </th>

                <th className={styles['table__head-th']}>
                  <div className={cn(styles['table__head-element'], styles['last'])}>
                    <p>Статус</p>
                    <span>
                      <ChevronTopIcon />
                      <ChevronBottomIcon />
                    </span>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className={styles['table__body']}>
              {new Array(9).fill('').map((_, key) => (
                <tr key={key} className={styles['table__body-row']}>
                  <td className={styles['table__body-td']}>
                    <div className={cn(styles['table__information'], styles['first'])}>
                      <div className={styles['table__information-photo']}>
                        <Image src={require('@/assets/images/client.png')} alt='' />

                        <Image
                          className={styles['telegram']}
                          src={require('@/assets/images/icons/telegram.png')}
                          alt=''
                        />
                      </div>

                      <p className={styles['table__information-name']}>Виктория Свидролова</p>
                      <p className={styles['table__information-last-online']}>4 минуты назад</p>
                    </div>
                  </td>

                  <td className={styles['table__body-td']}>
                    <p className={styles['table__text']}>
                      <Link href={`orders/${key + 1}`}>№000000000</Link>
                    </p>
                  </td>

                  <td className={styles['table__body-td']}>
                    <p className={styles['table__text']}>100 000 ₸</p>
                  </td>

                  <td className={styles['table__body-td']}>
                    <StatusSelect />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles['sales-overview']}>
        <div className={styles['sales-overview__header']}>
          <h1 className={styles['sales-overview__title']}>Обзор продаж</h1>

          <nav className={styles['sales-overview__nav']}>
            <Link className={styles['sales-overview__nav-link']} href={'#'}>
              Общая выручка
            </Link>
            <Link className={cn(styles['sales-overview__nav-link'], styles['active'])} href={'#'}>
              Средний чек
            </Link>
            <Link className={styles['sales-overview__nav-link']} href={'#'}>
              Кол-во зказов
            </Link>
          </nav>
        </div>

        <div className={styles['sales-overview__main']}>
          <div className={styles['chart']}>
            <div className={styles['chart__header']}>
              <p className={styles['chart__title']}>Выбор периода</p>

              <nav className={styles['chart__nav']}>
                <button>
                  <CalendarIcon />
                </button>

                <Link className={styles['chart__nav-link']} href={'#'}>
                  Сегодня
                </Link>
                <Link className={cn(styles['chart__nav-link'], styles['active'])} href={'#'}>
                  Неделя
                </Link>
                <Link className={styles['chart__nav-link']} href={'#'}>
                  Месяц
                </Link>
              </nav>
            </div>

            <div className={styles['chart__main']}>
              <Image src={require('@/assets/images/test/chart.png')} alt='' />
            </div>
          </div>

          <div className={styles['completed-sales']}>
            <h1 className={styles['completed-sales__title']}>Завершенные продажи</h1>

            <div className={styles['completes-sales__table']}>
              <div className={styles['table-container']}>
                <table className={styles['table']}>
                  <thead className={styles['table__head']}>
                    <tr>
                      <th className={styles['table__head-th']}>
                        <div className={cn(styles['table__head-element'], styles['first'])}>
                          <p>Контрагент</p>
                        </div>
                      </th>

                      <th className={styles['table__head-th']}>
                        <div className={styles['table__head-element']}>
                          <p>Номер заказа</p>
                        </div>
                      </th>

                      <th className={styles['table__head-th']}>
                        <div className={styles['table__head-element']}>
                          <p>Цена</p>
                        </div>
                      </th>

                      <th className={styles['table__head-th']}>
                        <div className={cn(styles['table__head-element'], styles['last'])}>
                          <p>Статус</p>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody className={styles['table__body']}>
                    {new Array(4).fill('').map((_, key) => (
                      <tr key={key} className={styles['table__body-row']}>
                        <td className={styles['table__body-td']}>
                          <div className={cn(styles['table__information'], styles['first'])}>
                            <div className={styles['table__information-photo']}>
                              <Image src={require('@/assets/images/client.png')} alt='' />

                              <Image
                                className={styles['telegram']}
                                src={require('@/assets/images/icons/telegram.png')}
                                alt=''
                              />
                            </div>

                            <p className={styles['table__information-name']}>Виктория Свидролова</p>
                            <p className={styles['table__information-last-online']}>
                              4 минуты назад
                            </p>
                          </div>
                        </td>

                        <td className={styles['table__body-td']}>
                          <p className={styles['table__text']}>№000000000</p>
                        </td>

                        <td className={styles['table__body-td']}>
                          <p className={styles['table__text']}>100 000 ₸</p>
                        </td>

                        <td className={styles['table__body-td']}>
                          <div className={styles['table__select']}>
                            <div />
                            <p>В работе</p>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
