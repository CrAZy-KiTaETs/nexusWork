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
    shopName: 'мониторы',
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
    shopName: 'мониторы',
    title: 'Торт Леапольд',
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
    shopName: 'Мышки',
    title: 'Торт "Хурма"',
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
    shopName: 'Мышки',
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
    shopName: 'Клавиатуры',
    title: 'Торт "Паладин"',
    description: 'Роскошь розового велюра',
    price: '500 000 ₸',
    methods: ['halyk', 'kaspi', 'money'],
    inStock: 5,
    rating: '4.5 (95)',
    count: 0,
  },
];

let URL = 'http://127.0.0.1:8000/api/v1';
const key =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ1c2VyIjp7ImVtYWlsIjoickByLmNvbSIsInBob25lIjoiNzc3NzUxODc1MDEiLCJpZCI6IjEifX0.9l-B_e4JNSa8IKDren_e11ONeUVCkY33kyhSaplOjaM';

const Home = () => {
  // Сюда будут записываться товары после получения с бэка
  const [myProducts, setMyProducts] = useState();
  // Выбранная категория CSS
  const [selectedSwitchbar, setSelectedSwitchbar] = useState('Все товары');
  //Активная категория
  const activeCategory = localStorage.getItem('activeCategory');
  // Здесь будут храниться категории товаров
  const [onlyCategory, setOnlyCategory] = useState();
  // отфильтрованные товары, они и отображаются на сайте
  const [filtredProducts, setFiltredProducts] = useState();

  // функция фильтрации товаров по нажатию на кнопку
  const productFilter = (filterCategory) => {
    if (filterCategory === 'Все товары') {
      setFiltredProducts(myProducts); //Записываем все товары
      setSelectedSwitchbar('Все товары'); // Подсвечиваем кнопку
      localStorage.setItem('activeCategory', 'Все товары'); //сохраняем в localStorage
    } else {
      setFiltredProducts(myProducts.filter((x) => x.subcategory.name == filterCategory)); //Записываем товары определенной категории
      setSelectedSwitchbar(filterCategory); // Подсвечиваем кнопку
      localStorage.setItem('activeCategory', filterCategory); //сохраняем в localStorage
    }
  };

  // функция получения товаров с бэка
  const getData = async () => {
    try {
      // Получаем товары
      const items = await fetch(`${URL}/stores/1/items/`, {
        headers: {
          Authorization: key,
        },
      });
      // Получаем категории товаров
      const subcategories = await fetch(`${URL}/stores/1/subcategories/`, {
        headers: {
          Authorization: key,
        },
      });

      if (!items.ok || !subcategories.ok) {
        throw new Error('Ошибка получения данных о продуктах');
      }
      const dataItems = await items.json();
      localStorage.setItem('products', JSON.stringify(dataItems))
      const dataSubcategories = await subcategories.json();
      // setOnlyCategory([...new Set(dataItems.map((product) => product.subcategory.name))]);

      // Если в СТОРЕДЖЕ была активная категория
      if (activeCategory) {
        // Фильтрует по категории
        setFiltredProducts(
          activeCategory === 'Все товары'
            ? dataItems
            : dataItems.filter((x) => x.subcategory.name === activeCategory),
        );
        setSelectedSwitchbar(activeCategory);
      } else {
        // Если в СТОРЕДЖЕ НЕ была активная категория
        setFiltredProducts(dataItems);
        setSelectedSwitchbar(activeCategory);
      }
      setOnlyCategory(dataSubcategories.map((x) => x.name)); // Записываем название категорий/подкатегорий
      setMyProducts(dataItems); // Записываем данные в переменную
      console.log('Полученные данные с API', dataItems);
    } catch (error) {
      console.error('Ошбика :', error);
    }
  };

  useEffect(() => {
    (window as any).Telegram?.WebApp.expand();
    getData();
  }, []);

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <p className={styles['header__title']}>
          Добро пожаловать {myProducts ? myProducts[0].subcategory.category.name : 'Пользователь'}
        </p>

        <nav className={styles['header__nav']}>
          <ul className={styles['header__nav-list']}>
            <li>
              <Link href='/buyer' className={cn(styles['header__nav-link'], styles['active'])}>
                Товары
              </Link>
            </li>
            {/* <li>
              <Link href='/buyer/shops' className={styles['header__nav-link']}>
                Магазины
              </Link>
            </li> */}
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
      {myProducts ? (
        <>
          <Switchbar className={styles['switchbar']}>
            <SwitchbarButton
              onClick={() => productFilter('Все товары')}
              active={selectedSwitchbar === 'Все товары'}
              count={myProducts.length}
            >
              Все товары
            </SwitchbarButton>
            {onlyCategory?.map((thisCategory, id) => (
              <SwitchbarButton
                key={id}
                onClick={() => productFilter(thisCategory)}
                active={selectedSwitchbar === thisCategory}
                count={myProducts.filter((shop) => shop.subcategory.name === thisCategory).length}
              >
                {thisCategory}
              </SwitchbarButton>
            ))}
          </Switchbar>

          <div className={styles['products']}>
            <ul className={styles['products__list']}>
              {filtredProducts?.map((product, key) => (
                <li key={key} className={styles['products__item']}>
                  <ProductCard product={product} />
                </li>
              ))}
              {/* {myProducts.map((product, key) => (
                <li key={key} className={styles['products__item']}>
                  <ProductCard product={product} />
                </li>
              ))} */}
            </ul>
          </div>
        </>
      ) : (
        <div className='loader-container'>
          <div className='loader'></div>
        </div>
      )}
    </div>
  );
};

export default Home;
