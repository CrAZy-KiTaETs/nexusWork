'use client';

import { useState } from 'react';
import cn from 'classnames';

import { Select } from '@/components/ui/Select';
import { Field, FieldPhoto } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import styles from './AddProduct.module.scss';
import type { AddProductProps, Navigation } from './types';

export function AddProductModal({ onClose }: AddProductProps) {
  const [navigation, setNavigation] = useState<Navigation>('Товар');

  return (
    <div className={styles['modal']}>
      <div onClick={onClose} className={styles['modal__space']}></div>

      <div className={styles['modal__main']}>
        <h1 className={styles['title']}>Добавить</h1>

        <div className={styles['nav']}>
          <button
            type='button'
            onClick={() => setNavigation('Товар')}
            className={cn(styles['nav__link'], navigation === 'Товар' && styles['active'])}
          >
            Товар
          </button>

          <button
            type='button'
            onClick={() => setNavigation('Категория')}
            className={cn(styles['nav__link'], navigation === 'Категория' && styles['active'])}
          >
            Категория
          </button>
        </div>

        {
          {
            Товар: (
              <form className={styles['form']}>
                <FieldPhoto placeholder='Название товара' onSelectPhoto={() => {}} />

                <Select
                  className={styles['form__select']}
                  placeholder='Выберите категорию'
                  options={{
                    category1: 'Категория 1',
                    category2: 'Категория 2',
                  }}
                />

                <Field
                  className={styles['form__field']}
                  type='number'
                  inputMode='numeric'
                  placeholder='Укажатие стоимость'
                />

                <Select
                  className={styles['form__select']}
                  placeholder='Выберите статус'
                  options={{
                    status1: 'Статус 1',
                    status2: 'Статус 2',
                  }}
                />

                <Button text='Сохранить' className={styles['form__button']} />
              </form>
            ),
            Категория: (
              <div className={styles['form']}>
                <FieldPhoto placeholder='Название товара' onSelectPhoto={() => {}} />

                <Select
                  className={styles['form__select']}
                  placeholder='Выберите родительскую категорию'
                  options={{
                    category1: 'Категория 1',
                    category2: 'Категория 2',
                  }}
                />

                <Select
                  className={styles['form__select']}
                  placeholder='Выберите подкатегорию'
                  options={{
                    category1: 'Категория 1',
                    category2: 'Категория 2',
                  }}
                />

                <Button text='Сохранить' className={styles['form__button']} />
              </div>
            ),
          }[navigation]
        }
      </div>
    </div>
  );
}
