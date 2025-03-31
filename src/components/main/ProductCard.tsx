import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AddToCartAnimation from '../AddToCartAnimation/AddToCartAnimation';
import RequestProductModal from '../RequestProductModal/RequestProductModal';
import styles from './ProductCard.module.css';
import { useShop, Product, FavoriteProduct } from '../../context/ShopContext';
import image from '/img/header/heart.png'
import image1 from '/img/header/heart1.png'

interface Props {
	imagesrc: string;
	label: string;
	text: string;
	cost: string;
}

export default function ProductCard({imagesrc, label, text, cost}: Props) {
	const navigate = useNavigate();
	const { addToCart, addToCompare, addToFavorite, isInFavorites, removeFavorite } = useShop();
	const cardRef = useRef<HTMLDivElement>(null);
	const [isAnimating, setIsAnimating] = useState(false);
	const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
	const [animationConfig, setAnimationConfig] = useState<{
		startPosition: { x: number; y: number };
		endPosition: { x: number; y: number };
		type: 'cart' | 'compare';
	} | null>(null);

	// Создаем стабильный ID на основе характеристик товара
	const productId = `${label}_${cost}`.replace(/\s+/g, '_').toLowerCase();
	
	const productData: Product = { 
		id: productId, 
		name: label, 
		cost: cost,
		image: imagesrc,
		category: text
	};
	
	const favoriteData: FavoriteProduct = {
		id: productId,
		name: label,
		cost: cost,
		image: imagesrc,
		category: text
	};

	const isFavorite = isInFavorites(productId);
	const isRequestPrice = cost === "0" || cost.toLowerCase().includes('запрос');

	const handleClick = () => {
		const prodcost = isRequestPrice ? "по запросу" : cost.replace('₽', '').trim();
		navigate(`/product/${productId}`, { 
			state: { 
				productImage: imagesrc, 
				title: label, 
				description: text, 
				price: prodcost,
				article: productId,
				brand: 'КабельОпт',
				deliveryInfo: "Доставка осуществляется по всей России. Оплата при получении или онлайн на сайте."
			} 
		});
	};

	const handleFavoriteClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (isRequestPrice) {
			setIsRequestModalOpen(true);
			return;
		}
		if (isFavorite) {
			removeFavorite(productId);
		} else {
			addToFavorite(favoriteData);
		}
	};

	const getTargetPosition = (type: 'cart' | 'compare') => {
		const targetElement = document.querySelector(
			type === 'cart' 
				? '[data-cart-icon]' 
				: '[data-compare-icon]'
		);
		if (targetElement) {
			const rect = targetElement.getBoundingClientRect();
			return {
				x: rect.left + rect.width / 2,
				y: rect.top + rect.height / 2
			};
		}
		return { x: 0, y: 0 };
	};

	const handleAddToCart = (e: React.MouseEvent, type: 'cart' | 'compare') => {
		e.stopPropagation();
		if (isRequestPrice) {
			setIsRequestModalOpen(true);
			return;
		}
		if (!cardRef.current) return;

		const rect = cardRef.current.getBoundingClientRect();
		const startPosition = {
			x: rect.left,
			y: rect.top
		};
		const endPosition = getTargetPosition(type);

		setAnimationConfig({
			startPosition,
			endPosition,
			type
		});
		setIsAnimating(true);

		if (type === 'cart') {
			addToCart(productData);
		} else {
			addToCompare(productData);
		}
	};

	return (
		<>
			<div 
				ref={cardRef}
				className={styles.productCard}
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 15,
					width: "100%",
					height: "100%",
					alignItems: "start",
					justifyContent: "space-between",
					position: "relative"
				}}
			>
				<img 
					src={imagesrc} 
					style={{
						boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
						width: "100%",
						height: "220px",
						objectFit: "cover",
						borderRadius: "5px"
					}} 
					alt="" 
					/>
					<img 
						src={isFavorite ? image1 : image} 
					alt="" 
					onClick={handleFavoriteClick}
					style={{
						position: "absolute",
						right: 10,
						top: 10,
						cursor: "pointer",
						padding: "5px",
						background: "transparent",
						transition: "background-color 0.3s ease"
					}}
				/>
				<h2 style={{fontSize:"18px",fontWeight:"bold"}}>{label}</h2>
				<span style={{fontSize:"16px"}}>{text}</span>
				{cost!="0" ? 
					<span style={{color:"#2A9E44",fontSize:16}}>{`Цена: от ${cost} руб.`}</span> 
					: <span style={{color:"#2A9E44",fontSize:16}}>Цена: по запросу</span>
				}
				<div className={styles.buttonGroup}>
					<button 
						onClick={handleClick}
						type="button" 
						style={{
							height: 35,
							width: 173,
							color: "white",
							background: "#2A9E44",
							padding: "0.5rem",
							borderRadius: 5,
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						}}
					>
						<span>Подробнее</span>
					</button>
					<div className={styles.actionButtons}>
						<button 
							onClick={(e) => handleAddToCart(e, 'cart')}
							className={styles.actionButton}
						>
							В корзину
						</button>
						<button 
							onClick={(e) => handleAddToCart(e, 'compare')}
							className={styles.actionButton}
						>
							Сравнить
						</button>
					</div>
				</div>
			</div>

			{isAnimating && animationConfig && (
				<AddToCartAnimation
					startPosition={animationConfig.startPosition}
					endPosition={animationConfig.endPosition}
					imageUrl={imagesrc}
					type={animationConfig.type}
					onComplete={() => setIsAnimating(false)}
				/>
			)}

			<RequestProductModal
				isOpen={isRequestModalOpen}
				onClose={() => setIsRequestModalOpen(false)}
				productName={label}
			/>
		</>
	);
}