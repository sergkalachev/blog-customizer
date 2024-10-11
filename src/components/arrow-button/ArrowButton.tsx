import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

export interface ArrowButtonProps {
	toggleSidebar: (status: boolean) => void;
	isOpen: boolean;
}

export const ArrowButton = ({ toggleSidebar, isOpen }: ArrowButtonProps) => {
	return (
		<div
			role='button'
			aria-label={
				isOpen
					? 'Закрыть форму параметров статьи'
					: 'Открыть форму параметров статьи'
			}
			tabIndex={0}
			onClick={() => toggleSidebar(!isOpen)}
			className={clsx(styles.container, isOpen && styles.container_open)}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, isOpen && styles.arrow_open)}
			/>
		</div>
	);
};
