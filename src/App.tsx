import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import './App.css'
import AppHeader from "./components/header/AppHeader/AppHeader.tsx"
import SubHeader from './components/header/SubHeader'
import Footer from './components/Footer/Footer.tsx'
import { Burger } from "./components/Burger/Burger.tsx";
import CatalogPage from "./components/CabelProduct/CatalogPage.tsx";
import CategoryPage from "./components/CabelProduct/CategoryPage.tsx";
import Delivery from "./components/Delivery/Delivery.tsx";
import Main from "./components/Main.tsx";
import Payment from "./components/Payment/Payment.tsx";
import Return from "./components/Return/Return.tsx";
import Cart from "./components/Cart/Cart.tsx";
import Favorites from "./components/Favorites/Favorites.tsx";

import ProductPage from "./components/ProductPage/ProductPage.tsx";
import Contacts from "./components/Contacts/Contacts.tsx";
import Buyers from "./components/Buyers/Buyers.tsx";
import Compare from "./components/Compare/Compare.tsx";
import About from "./components/About/About.tsx";
import Policy from "./components/Policy/Policy.tsx";
import Offer from "./components/Offer/Offer.tsx";
import styles from './AppStyles.module.css';
import { ShopProvider } from './context/ShopContext';
import { PageTitleProvider } from './context/PageTitleContext';
import { HelmetProvider } from 'react-helmet-async';


// Компонент для отслеживания изменений маршрута
function RouteChangeObserver({ children }: { children: React.ReactNode }) {
	const location = useLocation();
	const [key, setKey] = useState(() => location.pathname); // Инициализируем ключ текущим pathname
	
	// При изменении URL обновляем ключ, чтобы принудительно перемонтировать содержимое
	useEffect(() => {
		// Используем новый pathname как ключ для обеспечения уникальности
		setKey(location.pathname);
		
		// Прокручиваем страницу вверх при смене маршрута
		window.scrollTo(0, 0);
		
		// Устанавливаем baseTitle для каждой страницы
		const baseTitle = "КабельОпт";
		switch (location.pathname) {
			case "/":
				document.title = `Главная | ${baseTitle}`;
				break;
			case "/catalog":
				document.title = `Каталог товаров | ${baseTitle}`;
				break;
			default:
				// Для страниц категорий title устанавливается в самих компонентах
				if (!location.pathname.startsWith("/catalog/")) {
					document.title = `${location.pathname.slice(1)} | ${baseTitle}`;
				}
		}
		
	}, [location.pathname]);
	
	// Оборачиваем содержимое в div с ключом для принудительного перемонтирования
	// Используем pathname как часть ключа для обеспечения уникальности
	return <div key={`route-${key}`}>{children}</div>;
}

// Компонент для отображения основного макета
function AppLayout() {
	// Отслеживаем размер окна для рендеринга SubHeader или Burger
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		function handleResize() {
			setWindowWidth(window.innerWidth);
		}
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div className={styles.pageWrapper}>
			<div className={styles.pageContainer}>
				<AppHeader />
				{windowWidth > 1180 && <SubHeader />}
				{windowWidth < 1180 && <Burger />}
				<main className={styles.mainContent}>
					<RouteChangeObserver>
						<Routes>
							<Route path="/" element={<Main />} />
							<Route path="/delivery" element={<Delivery />} />
							<Route path="/catalog" element={<CatalogPage />} />
							<Route path="/catalog/:category" element={<CategoryPage />} />
							<Route path="/payment" element={<Payment />} />
							<Route path="/return" element={<Return />} />
							<Route path="/cart" element={<Cart />} />
							<Route path="/favorites" element={<Favorites />} />
							
							<Route path="/product/:id" element={<ProductPage />} />
							<Route path="/contacts" element={<Contacts />} />
							<Route path="/buyers" element={<Buyers />} />
							<Route path="/compare" element={<Compare />} />
							<Route path="/about" element={<About />} />
							<Route path="/policy" element={<Policy />} />
							<Route path="/offer" element={<Offer />} />
							
							{/* Маршрут для обработки неизвестных путей */}
							<Route path="*" element={<Navigate to="/" replace />} />
						</Routes>
					</RouteChangeObserver>
				</main>
				<Footer />
			</div>
		</div>
	);
}

function App() {
	return (
		<HelmetProvider>
			<PageTitleProvider defaultTitle="Интернет-магазин кабельной продукции" defaultSuffix="КабельОпт">
				<Router>
					<ShopProvider>
						<AppLayout />
					</ShopProvider>
				</Router>
			</PageTitleProvider>
		</HelmetProvider>
	);
}

export default App;
