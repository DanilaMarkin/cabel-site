import search from '/img/header/search.png'
import stat from '/img/header/stats.png'
import heart from '/img/header/heart.png'
import card from '/img/header/card.png'
import Actions from '../Actions'
import styles from "./header.module.css";
import PhoneMap from '../PhoneMap/PhoneMap'
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useShop, Product } from '../../../context/ShopContext';

export default function Header() {
	const navigate = useNavigate();
	const { searchProducts, demoProducts } = useShop();
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [searchValue, setSearchValue] = useState('');
	const [showResults, setShowResults] = useState(false);
	const [searchResults, setSearchResults] = useState<Product[]>([]);
	const searchRef = useRef<HTMLDivElement>(null);
	
	useEffect(() => {
		function handleResize() {
			setWindowWidth(window.innerWidth);
		}
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	// Закрывать результаты поиска при клике вне компонента
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
				setShowResults(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [searchRef]);

	// Фильтрация товаров при вводе текста
	useEffect(() => {
		if (searchValue.trim() === '') {
			setSearchResults([]);
			setShowResults(false);
			return;
		}
		
		// Установим showResults в true когда есть текст для поиска
		setShowResults(true);
		
		// Проверим, существует ли demoProducts
		if (!demoProducts || !Array.isArray(demoProducts)) {
			console.error('demoProducts не найден или не является массивом', demoProducts);
			return;
		}
		
		try {
			const results = demoProducts.filter(product => 
				product.name.toLowerCase().includes(searchValue.toLowerCase())
			);
			setSearchResults(results.slice(0, 5)); // Максимум 5 результатов
		} catch (error) {
			console.error('Ошибка при фильтрации товаров:', error);
		}
	}, [searchValue, demoProducts]);

	const handleCatalogClick = () => {
		navigate('/catalog');
	};

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		searchProducts(searchValue);
		setShowResults(false);
		navigate('/catalog');
	};

	const handleSearchFocus = () => {
		if (searchValue.trim() !== '') {
			setShowResults(true);
		}
	};
	
	const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchValue(value);
		
		if (value.trim().length >= 3) {
			// Поиск товаров по запросу
			const results = demoProducts.filter(product => 
				product.name.toLowerCase().includes(value.toLowerCase()) ||
				(product.manufacturer && product.manufacturer.toLowerCase().includes(value.toLowerCase())) ||
				(product.category && product.category.toLowerCase().includes(value.toLowerCase())) ||
				(product.article && product.article.toLowerCase().includes(value.toLowerCase()))
			);
			
			setSearchResults(results);
		} else {
			setSearchResults([]);
		}
	};

	const handleProductSelect = (product: Product) => {
		setSearchValue(product.name);
		setShowResults(false);
		navigate(`/product/${product.id}`);
	};

	return(
		<header className={styles.header}>
			<div className={styles.header_container}>
				<div className={styles.header_content}>
					<Link to="/" className={styles.header_logo}>
						Logo
					</Link>
					{windowWidth < 1180 && <PhoneMap />}
					<div className={styles.header_serchCatal}>
						<div className={styles.header_catalog}>
							<button type='submit' onClick={handleCatalogClick}>
								<div className={styles.burger}><span></span></div>
								Каталог
							</button>
						</div>
						<div className={styles.header_search_container} ref={searchRef}>
							<form className={styles.header_search} onSubmit={handleSearch}>
								<input 
									type="text" 
									placeholder='Поиск по товарам'
									value={searchValue}
									onChange={handleSearchInputChange}
									onFocus={handleSearchFocus}
								/>
								<button type='submit'>
									<img src={search} alt="поиск" />
								</button>
							</form>
							{showResults && (
								<div className={styles.search_results}>
									{searchResults.length > 0 ? (
										<>
											{searchResults.map((product) => (
												<div 
													key={product.id} 
													className={styles.search_result_item}
													onClick={() => handleProductSelect(product)}
												>
													<div className={styles.result_item_image}>
														{product.image && (
															<img src={product.image} alt={product.name} />
														)}
													</div>
													<div className={styles.result_item_info}>
														<div className={styles.result_item_name}>{product.name}</div>
														<div className={styles.result_item_price}>{product.cost}</div>
													</div>
												</div>
											))}
											<div className={styles.search_all_results} onClick={handleSearch}>
												Показать все результаты
											</div>
										</>
									) : (
										<div className={styles.search_result_item}>
											<div className={styles.result_item_info}>
												<div className={styles.result_item_name}>Ничего не найдено</div>
											</div>
										</div>
									)}
								</div>
							)}
						</div>
					</div>
					<div className={styles.header_actions}>
						<Actions imagesrc={stat} label={"Сравнение"} />
						<Actions imagesrc={heart} label={"Отложенные"} />
						<Actions imagesrc={card} label={"Корзина"} />
					</div>
				</div>
			</div>
		</header>
	)
}