import Link from 'next/link';
import styles from './layout.module.scss';
import { ThemeSwitch } from '@/components/shared/ThemeSwitch';
import { Select } from '@/components/ui/Select';
import Image from 'next/image';
import { Logo } from '@/assets/icons/Logo';

import AmoCRMImage from '@/assets/images/partners/amocrm.png';
import MoySkladImage from '@/assets/images/partners/moy-sklad.png';
import AutodeskImage from '@/assets/images/partners/autodesk.png';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles['layout']}>
      <header className={styles['header']}>
        <Link href='/' className={styles['header__logo']}>
          <Logo />
        </Link>

        <div className={styles['header__switches']}>
          <ThemeSwitch />

          <Select
            className={styles['header__lang-switch']}
            options={{ ru: 'Русский', en: 'English', kz: 'Қазақша' }}
            defaultValue={{ ru: 'Русский' }}
          />
        </div>
      </header>

      {children}

      <footer className={styles['footer']}>
        {/* {progress && (
          <div
            className={cn(
              styles['progress'],
              progress === '0%' && styles['progress-0'],
              progress === '50%' && styles['progress-50'],
              progress === '100%' && styles['progress-100'],
            )}
          >
            <span>{progress}</span>
          </div>
        )} */}

        <div className={styles['partners']}>
          <div className={styles['partners__image']}>
            <Image src={MoySkladImage} alt='Мой склад' />
          </div>
          <div className={styles['partners__image']}>
            <Image src={AmoCRMImage} alt='amocrm' />
          </div>

          <div className={styles['partners__image']}>
            <Image style={{ width: 'fit-content' }} src={AutodeskImage} alt='Autodesk' />
          </div>
        </div>
      </footer>
    </div>
  );
}
