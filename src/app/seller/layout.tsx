'use client';

import cn from 'classnames';
import { store } from '@/store';
import { usePathname, useRouter } from 'next/navigation';
import { useState, type PropsWithChildren } from 'react';

import { Menu } from '@/components/seller/Menu';
import { Field } from '@/components/buyer/Field';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeSwitch } from '@/components/shared/ThemeSwitch';
import Link from 'next/link';
import Image from 'next/image';
import UserIcon from '@/assets/icons/user.svg';
import LogoIcon from '@/assets/icons/sidebar/logo.svg';
import MenuIcon from '@/assets/icons/sidebar/menu.svg';
import HomeIcon from '@/assets/icons/sidebar/home.png';
import ChatIcon from '@/assets/icons/sidebar/chat.svg';
import ShopIcon from '@/assets/icons/sidebar/shop.svg';
import BurgerMenuIcon from '@/assets/icons/burger.svg';
import TasksIcon from '@/assets/icons/sidebar/tasks.svg';
import BuyerIcon from '@/assets/icons/sidebar/buyer.svg';
import SearchIcon from '@/assets/icons/field/search.svg';
import OrdersIcon from '@/assets/icons/sidebar/orders.svg';
import TelegramIcon from '@/assets/icons/sidebar/telegram.svg';
import ProductsIcon from '@/assets/icons/sidebar/products.svg';
import SettingsIcon from '@/assets/icons/sidebar/settings.svg';
import NotificationIcon from '@/assets/icons/notification.svg';
import AnalyticsIcon from '@/assets/icons/sidebar/analytics.svg';
import CounterpartyIcon from '@/assets/icons/sidebar/counterparty.svg';
import styles from './layout.module.scss';

export default function SellerLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleSwitchSeller = () => {
    router.push('/buyer');
  };

  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <ReduxProvider store={store}>
      <div className={styles['layout']}>
        <aside className={styles['side-menu']}>
          <div className={styles['side-menu__header']}>
            <button className={styles['side-menu__button']}>
              <MenuIcon />
            </button>

            <div className={styles['side-menu__logo']}>
              <LogoIcon />
            </div>
          </div>

          <nav className={styles['side-menu__nav']}>
            <Link
              href={'/seller'}
              className={cn(
                styles['side-menu__nav-link'],
                pathname === '/seller' && styles['active'],
              )}
            >
              <Image src={HomeIcon} alt='' />
              <span>Рабочий стол</span>
            </Link>

            <Link
              href={'/seller/orders'}
              className={cn(
                styles['side-menu__nav-link'],
                pathname.includes('/seller/orders') && styles['active'],
              )}
            >
              <OrdersIcon />
              <span>Заказы</span>
            </Link>

            <Link
              href={'/seller/chats'}
              className={cn(
                styles['side-menu__nav-link'],
                pathname.includes('/seller/chats') && styles['active'],
              )}
            >
              <ChatIcon />
              <span>Чаты</span>
            </Link>

            <Link
              href={'/seller/tasks'}
              className={cn(
                styles['side-menu__nav-link'],
                pathname.includes('/seller/tasks') && styles['active'],
              )}
            >
              <TasksIcon />
              <span>Задачи</span>
            </Link>

            <Link
              href={'/seller/analytics'}
              className={cn(
                styles['side-menu__nav-link'],
                pathname.includes('/seller/analytics') && styles['active'],
              )}
            >
              <AnalyticsIcon />
              <span>Аналитика</span>
            </Link>

            <Link
              href={'/seller/products'}
              className={cn(
                styles['side-menu__nav-link'],
                pathname.includes('/seller/products') && styles['active'],
              )}
            >
              <ProductsIcon />
              <span>Товары</span>
            </Link>

            <Link
              href={'/seller/counterparty'}
              className={cn(
                styles['side-menu__nav-link'],
                pathname.includes('/seller/counterparty') && styles['active'],
              )}
            >
              <CounterpartyIcon />
              <span>Контрагенты</span>
            </Link>

            <Link
              href={'/seller/store-parameters'}
              className={cn(
                styles['side-menu__nav-link'],
                pathname.includes('/seller/store-parameters') && styles['active'],
              )}
            >
              <ShopIcon />
              <span>Параметры магазина</span>
            </Link>

            <Link
              href={'/seller/telegram-web'}
              className={cn(
                styles['side-menu__nav-link'],
                pathname.includes('/seller/telegram-web') && styles['active'],
              )}
            >
              <TelegramIcon />
              <span>Telegram-web</span>
            </Link>

            <Link
              href={'/seller/settings'}
              className={cn(
                styles['side-menu__nav-link'],
                pathname.includes('/seller/settings') && styles['active'],
              )}
            >
              <SettingsIcon />
              <span>Настройки</span>
            </Link>
          </nav>

          <div style={{ marginTop: '3rem' }} />

          <button onClick={handleSwitchSeller} className={styles['side-menu__change-role']}>
            <BuyerIcon />
            <span>Покупатель</span>
          </button>
        </aside>

        {/* Wrapper */}

        <div className={styles['wrapper']}>
          {/* Header  */}

          <header className={styles['header']}>
            <div className={styles['header__left']}>
              <button onClick={handleToggleMenu} className={styles['header__menu-button']}>
                <BurgerMenuIcon />
              </button>

              <ThemeSwitch className={cn(styles['header__theme-switch'], styles['mobile'])} />

              <Field
                containerClassName={styles['header__search']}
                leftIcon={<SearchIcon />}
                placeholder='Поиск'
              />
            </div>

            <Link href='/buyer' className={styles['header__logo']}>
              <LogoIcon />
            </Link>

            <div className={styles['header__right']}>
              <button className={styles['header__notification']}>
                <NotificationIcon />
              </button>

              <ThemeSwitch className={cn(styles['header__theme-switch'], styles['desktop'])} />

              <button className={styles['header__user-profile']}>
                <UserIcon />
              </button>
            </div>
          </header>

          {isMenuOpen && <Menu />}

          {children}
        </div>
      </div>
    </ReduxProvider>
  );
}
