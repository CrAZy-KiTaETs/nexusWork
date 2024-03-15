'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSignin } from '@/api/auth/signin';
import type { ISignin } from '@/types/auth/signin';

import { Field } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import styles from './page.module.scss';

export default function Signin() {
  const router = useRouter();
  const signin = useSignin();

  const { register, handleSubmit } = useForm<ISignin>();

  async function handleLogin(formData: any) {
    try {
      const data = await signin.request(formData);

      console.log(data);

      // Перенаправление в страницу "Покупателя" при вводе валидных данных
      if (data?.access_token) {
        return router.push('/buyer');
      }
    } catch (e) {
      console.error('[NEXUS-MARKET:ERROR] Ошибка при авторизаций\n', e);
    }
  }

  return (
    <main className={styles['main']}>
      <h1 className={styles['main__title']}>
        Добро пожаловать
        <br /> в Nexus market
      </h1>

      <form onSubmit={handleSubmit(handleLogin)} className={styles['main__form']}>
        <Field
          {...register('phone', { required: true })}
          className={styles['main__form-field']}
          placeholder='Номер телефона / Email'
          type='text'
          autoComplete='off'
        />

        <Field
          {...register('password', { required: true })}
          className={styles['main__form-field']}
          placeholder='Пароль'
          type='password'
        />

        <Button
          className={styles['main__form-button']}
          loading={signin.isLoading}
          text='Войти в систему'
          type='submit'
        />

        <p className={styles['main__form-forgot']}>
          У вас нет аккаунта? <Link href='/signup'>Зарегистрироваться.</Link>
        </p>
      </form>
    </main>
  );
}
