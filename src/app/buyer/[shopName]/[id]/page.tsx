'use client';
//Components
import React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector } from '@/hooks/useSelector';
import Image from 'next/image';
import StarIcon from '@/assets/icons/star.svg';
import CakeImage from '@/assets/images/test/cake.png';
import CartIcon from '@/assets/icons/cart.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import { ArrowLeftIcon } from '@/assets/icons/ArrowLeft';
import Slider from 'react-slick';
import { Counter } from '@/components/buyer/Cart/screens/Cart/Counter';
import { useCounter } from '@/providers/CounterProvider';
//styles
import './productPage.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch } from '@/hooks/useDispatch';
import { cartActions } from '@/store/slices/buyer/cart.slice';

import styles from '@/components/buyer/ProductCard/ProductCard.module.scss';

let URL = 'http://127.0.0.1:8000/api/v1';
const key =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ1c2VyIjp7ImVtYWlsIjoickByLmNvbSIsInBob25lIjoiNzc3NzUxODc1MDEiLCJpZCI6IjEifX0.9l-B_e4JNSa8IKDren_e11ONeUVCkY33kyhSaplOjaM';

interface ProjectData {
  id: number;
  name: string;
  title: string;
  body: string;
}

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

const ProductPage = () => {
  //место записи названия продукта с URL
  let folderName: any;
  //берем значения со слайсера корзины
  const dispath = useDispatch();

  const [tipoIdTovara, setTipoIdTovara] = useState();
  const [projectData, setProjectData] = useState<ProjectData | null>(); //Получаем данные товара по API

  const productInBasket = useSelector((state) => state.buyerCart); // корзина товаров
  const [counter, setCounter] = useState<number>(0); // счетчик в который будем ложить счетчик продукта
  const [thisProduct, setThisProduct] = useState(); // не помню что

  /*



 */

  const [productData, setProductData] = useState();

  const getProduct = async (id: number) => {
    //получаем id товара
    try {
      const res = await fetch(`${URL}/stores/1/items/${id}`, {
        headers: {
          Authorization: key,
        },
      });

      if (!res.ok) {
        throw new Error('Ошибка получения данных о продуктах');
      }
      const data = await res.json();
      setProductData(data);
      console.log('Полученные данные с API', data);
    } catch (error) {
      console.error('Ошбика :', error);
    }
  };

  useEffect(() => {
    //поулчаем название продукта с URL по которому перешли
    folderName = window.location.pathname.split('/').filter(Boolean).pop();
    //вызываем функцию где получаем данные товара
    getProduct(parseInt(folderName!, 10));
    /*здесь я хотел прописать логику при которой если корзина пуста 
    то не выполнять опередленную часть кода, но сейчас понимаю что 
    с рабочей апишкой буду брать с нее каунтер и записывать его в мой каунтер
    */
    //  if (productInBasket.length > 1) {

    //    setThisProduct(productInBasket.find(x => x.id == folderName))
    //  }
    // setThisProduct(prevState => {
    //   if (productInBasket.length > 1) {
    //     return productInBasket.find(x => x.id == folderName);
    //   } else {
    //     return undefined;
    //   }
    // });
    // if(thisProduct) {
    //   /*
    //     тут делаем проверку, если этот продукт есть в корзине то
    //     значение каунтер меняем на его значение и дальше отправляем
    //     продукт в корзину как ProductCard
    //    */
    //   setCounter(thisProduct.count)
    //   console.log('СРАБОТАЛО', thisProduct)
    // }
  }, [thisProduct]);

  const settings = {
    customPaging: function (i: any) {
      return <img src={productData.preview}  width="100%" height="100%" className='slider__img' alt='cake' />;
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleSaveToCart = async () => {
    // console.log('Нажатие на кнопку НАЧАЛО', thisProduct)
    setCounter((prev) => prev + 1);

    // if (thisProduct) {  //если этот товар есть в корзине
    //   dispath(
    //     cartActions.addToCart({
    //       id: thisProduct.id,
    //       count: counter,
    //       // inStock: inStock === 0 ? 0 : inStock - 1,
    //       price: thisProduct.price,
    //       title: thisProduct.title,
    //     }),
    //   );
    // } else ( console.log('ТОВАРА В КОРЗИНЕ НЕТ'))

    // console.log("Нажатие на кнопку КОНЕЦ", projectData, 'it;scouinter');
  };

  /* 
    по итогу - отображаем данные полученные с API (projectData)
    в Counter передаем созданный через useState counter 
    и проделываем ту же логику по добавлению в корзину как и в ProductCard
  */
  return (
    <>
      {productData ? (
        <>
          <div>
            <Link href='/buyer' className='back-btn'>
              <ArrowLeftIcon />
              Назад
            </Link>
          </div>
          <div className='productPage'>
            <div className='productPage__slider-container slider-container'>
              <Slider {...settings}>
                <img src={productData.preview} className='slider__img' alt='cake' />
                <img src={productData.preview} className='slider__img' alt='cake' />
                <img src={productData.preview} className='slider__img' alt='cake' />
                <img src={productData.preview} className='slider__img' alt='cake' />
                <img src={productData.preview} className='slider__img' alt='cake' />
                <img src={productData.preview} className='slider__img' alt='cake' />
                {/* <Image src={productData.preview} className='slider__img' alt='cake' />
                <Image src={CakeImage} className='slider__img' alt='cake' />
                <Image src={CakeImage} className='slider__img' alt='cake' />
                <Image src={CakeImage} className='slider__img' alt='cake' />
                <Image src={CakeImage} className='slider__img' alt='cake' /> */}
              </Slider>
            </div>
            <div className='productPage__specification specification'>
              <span>
                <h2 className='specification__title'>{productData.name}</h2>
                <picture className='specification__star'>
                  <StarIcon />
                  <p>4.5 (95)</p>
                </picture>
                <p className='specification__price'>
                  <span>Это цена -</span>
                  {productData.id}
                </p>
              </span>
              <div className='specification__characteristics'>
                <p>{productData.subcategory.name}</p>
                <p>{productData.subcategory.category.name}</p>
              </div>
              {/* {counter === 0 ? (
                <button
                  onClick={() => handleSaveToCart()}
                  className={styles['product__cart-button']}
                >
                  <span>Добавить в корзину</span>

                  <CartIcon className={styles['product__cart-button_icon-1']} />

                  <PlusIcon className={styles['product__cart-button_icon-2']} />
                </button>
              ) : (
                <Counter
                  increment={handleSaveToCart}
                  defaultCount={productInBasket.find((x) => x.id == projectData.id)?.count}
                  product={products}
                />
              )} */}
            </div>
          </div>

          {/* <div>
            <Link href='/buyer' className='back-btn'>
              <ArrowLeftIcon />
              Назад
            </Link>
          </div>
          <button onClick={() => console.log(productData)} >CLICK</button>
          <div className='productPage'>
            <div className='productPage__slider-container slider-container'>
              <Slider {...settings}>
                <Image src={CakeImage} className='slider__img' alt='cake' />
                <Image src={CakeImage} className='slider__img' alt='cake' />
                <Image src={CakeImage} className='slider__img' alt='cake' />
                <Image src={CakeImage} className='slider__img' alt='cake' />
                <Image src={CakeImage} className='slider__img' alt='cake' />
              </Slider>
            </div>
            <div className='productPage__specification specification'>
              <span>
                <h2 className='specification__title'>
                  <span>Это тайтл - </span>
                  {projectData.title}
                </h2>
                <picture className='specification__star'>
                  <StarIcon />
                  <p>4.5 (95)</p>
                </picture>
                <p className='specification__price'>
                  <span>Это цена -</span>
                  {projectData.id}
                </p>
              </span>
              <div className='specification__characteristics'>
                <p>Вес: информация</p>
                <p>Красота: информация</p>
                <p>Молодежность: информация</p>
                <p>Успешность: информация</p>
              </div>
              <p className='specification__description'>{projectData.body}</p>
              {counter === 0 ? (
                <button
                  onClick={() => handleSaveToCart()}
                  className={styles['product__cart-button']}
                >
                  <span>Добавить в корзину</span>

                  <CartIcon className={styles['product__cart-button_icon-1']} />

                  <PlusIcon className={styles['product__cart-button_icon-2']} />
                </button>
              ) : (
                <Counter
                  increment={handleSaveToCart}
                  defaultCount={productInBasket.find((x) => x.id == projectData.id)?.count}
                  product={products}
                />
              )}
            </div>
          </div> */}
        </>
      ) : (
        <div className='loader-container'>
          <div className='loader'>Loading...</div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
