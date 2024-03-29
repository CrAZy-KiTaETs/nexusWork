import cn from 'classnames';
import styles from './Field.module.scss';

export function Field({ leftIcon, containerClassName, rightIcon, ...rest }: FieldProps) {
  return (
    <div className={cn(containerClassName, styles['field'])}>
      {leftIcon}
      <input type='text' {...rest} />
      {rightIcon}
    </div>
  );
}
