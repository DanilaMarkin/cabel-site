import { Link } from 'react-router-dom';
import styles from './Actions.module.css';
import { useShop } from '../../context/ShopContext';

interface ActionsProps {
	imagesrc: string;
	label: string;
}

export default function Actions({ imagesrc, label }: ActionsProps) {
	const { cartItems, compareItems } = useShop();

	const getLink = (label: string) => {
		switch (label) {
			case "Корзина":
				return "/cart";
			case "Отложенные":
				return "/favorites";
			case "Сравнение":
				return "/compare";
			default:
				return "/";
		}
	};

	const getCount = (label: string) => {
		switch (label) {
			case "Корзина":
				return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
			case "Сравнение":
				return compareItems.length;
			default:
				return 0;
		}
	};

	const count = getCount(label);

	return (
		<Link 
			to={getLink(label)} 
			className={styles.actions}
			data-cart-icon={label === "Корзина" ? true : undefined}
			data-compare-icon={label === "Сравнение" ? true : undefined}
		>
			<div className={styles.iconWrapper}>
				<img src={imagesrc} alt={label} />
				{count > 0 && (
					<span className={styles.counter}>{count}</span>
				)}
			</div>
			<span>{label}</span>
		</Link>
	);
}