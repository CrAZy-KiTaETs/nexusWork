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

const ProductPage = () => {

  //место записи названия продукта с URL
  let folderName: any;
  //берем значения со слайсера корзины
  const dispath = useDispatch();

  const [tipoIdTovara, setTipoIdTovara] = useState();
  const [projectData, setProjectData] = useState(); //Получаем данные товара по API

  
  const productInBasket = useSelector((state) => state.buyerCart); // корзина товаров
  const [counter, setCounter] = useState<number>(0);// счетчик в который будем ложить счетчик продукта
  const [thisProduct, setThisProduct] = useState(); // не помню что

  const getProduct = async (id: number) => {
    //получаем id товара
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const data = await res.json();
      await setProjectData(data); //записываем его данные, в дальнейшем записываем с API
      console.log( 'Полученные данные с API -', data, 'Записанное в projectData');
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
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
    setThisProduct(productInBasket.length > 1 ? productInBasket.find(x => x.id == folderName) : null)

    if(thisProduct) {
      /*
        тут делаем проверку, если этот продукт есть в корзине то
        значение каунтер меняем на его значение и дальше отправляем 
        продукт в корзину как ProductCard
       */
      setCounter(thisProduct.count)
      console.log('СРАБОТАЛО', thisProduct)
    }
  }, [thisProduct]);

  const settings = {
    customPaging: function (i: any) {
      return <Image src={CakeImage} className='slider__img-dots' alt='cake' />;
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

    setTipoIdTovara((prev) => prev + 1);

    if (thisProduct) {  //если этот товар есть в корзине
      dispath(
        cartActions.addToCart({
          id: thisProduct.id,
          count: counter,
          // inStock: inStock === 0 ? 0 : inStock - 1,
          price: thisProduct.price,
          title: thisProduct.title,
        }),
      );
    } else ( console.log('ТОВАРА В КОРЗИНЕ НЕТ'))

    // console.log("Нажатие на кнопку КОНЕЦ", projectData, 'it;scouinter');
  };

  /* 
    по итогу - отображаем данные полученные с API (projectData)
    в Counter передаем созданный через useState counter 
    и проделываем ту же логику по добавлению в корзину как и в ProductCard
  */
  return (
    <>
      {projectData ? (
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
                {thisProduct ? thisProduct.title : projectData.title}
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
                {/* <p>{nice.title}</p> */}
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
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <div className='loader'>Loading...</div>
      )}
    </>
  );
};

export default ProductPage;
