'use client';

import cn from 'classnames';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import CakeImage from '@/assets/images/test/cake.png';
import { Field } from '@/components/buyer/Field';
import { Switchbar } from '@/components/buyer/Switchbar';
import { ProductCard } from '@/components/buyer/ProductCard';
import { SwitchbarButton } from '@/components/buyer/Switchbar/SwitchbarButton';
import { FilterIcon } from '@/assets/icons/Filter';
import { SearchIcon } from '@/assets/icons/Search';
import styles from './page.module.scss';


const products = [
  {
    id: 1,
    image: CakeImage,
    shopName: 'Кондитерская “КАРТОЖКА”',
    title: 'КАРТОЖКА',
    description: 'Роскошь розового велюра',
    price: '500 000 ₸',
    methods: ['halyk', 'kaspi', 'money'],
    inStock: 5,
    rating: '4.5 (95)',
    count: 0,
  },
  {
    id: 2,
    image: CakeImage,
    shopName: 'Кондитерская “Hani”',
    title: 'Торт "Чизкейк"',
    description: 'Роскошь розового велюра',
    price: '500 000 ₸',
    methods: ['halyk', 'kaspi', 'money'],
    inStock: 5,
    rating: '4.5 (95)',
    count: 0,
  },
  {
    id: 3,
    image: CakeImage,
    shopName: 'Кондитерская “Hani”',
    title: 'Торт "Чизкейк"',
    description: 'Роскошь розового велюра',
    price: '500 000 ₸',
    methods: ['halyk', 'kaspi', 'money'],
    inStock: 5,
    rating: '4.5 (95)',
    count: 0,
  },
  {
    id: 4,
    image: CakeImage,
    shopName: 'Кондитерская “Hani”',
    title: 'Торт "Чизкейк"',
    description: 'Роскошь розового велюра',
    price: '500 000 ₸',
    methods: ['halyk', 'kaspi', 'money'],
    inStock: 5,
    rating: '4.5 (95)',
    count: 0,
  },
  {
    id: 5,
    image: CakeImage,
    shopName: 'Кондитерская “Hani”',
    title: 'Торт "Чизкейк"',
    description: 'Роскошь розового велюра',
    price: '500 000 ₸',
    methods: ['halyk', 'kaspi', 'money'],
    inStock: 5,
    rating: '4.5 (95)',
    count: 0,
  },
];

const Home = () => {
  const [selectedSwitchbar, setSelectedSwitchbar] = useState('Чизкейки');


  useEffect(() => {
    (window as any).Telegram?.WebApp.expand();
  }, []);


  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <p className={styles['header__title']}>Добро пожаловать, Максим!</p>

        <nav className={styles['header__nav']}>
          <ul className={styles['header__nav-list']}>
            <li>
              <Link href='/buyer' className={cn(styles['header__nav-link'], styles['active'])}>
                Товары
              </Link>
            </li>
            <li>
              <Link href='/buyer/shops' className={styles['header__nav-link']}>
                Магазины
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles['header__filters']}>
          {/* <Field
            containerClassName={styles['header__filters-search']}
            leftIcon={<SearchIcon />}
            placeholder='Поиск'
          /> */}

          <div className={styles['header__filters-button']}>
            <FilterIcon />
          </div>
        </div>
      </div>

      <Switchbar className={styles['switchbar']}>
        <SwitchbarButton
          onClick={() => setSelectedSwitchbar('Чизкейки')}
          active={selectedSwitchbar === 'Чизкейки'}
          count={10}
        >
          Чизкейки
        </SwitchbarButton>
        <SwitchbarButton
          onClick={() => setSelectedSwitchbar('Торты')}
          active={selectedSwitchbar === 'Торты'}
          count={6}
        >
          Торты
        </SwitchbarButton>
        <SwitchbarButton
          onClick={() => setSelectedSwitchbar('Донаты')}
          active={selectedSwitchbar === 'Донаты'}
          count={8}
        >
          Донаты
        </SwitchbarButton>
        <SwitchbarButton
          onClick={() => setSelectedSwitchbar('Запчасти')}
          active={selectedSwitchbar === 'Запчасти'}
          count={12}
        >
          Запчасти
        </SwitchbarButton>
      </Switchbar>

      <div className={styles['products']}>
        <ul className={styles['products__list']}>
          {products.map((product, key) => (
            <li key={key} className={styles['products__item']}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export default Home