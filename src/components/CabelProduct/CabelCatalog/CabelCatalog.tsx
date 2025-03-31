import { useShop } from '../../../context/ShopContext';
import styles from './CabelCatalog.module.css';
import { CategoryData } from '../../../types/shop.types';
import PageTitle from '../../PageTitle/PageTitle';
import { useMemo } from 'react';

// Импорт изображений
import cabelImage from '/img/CabelCatalog/image13.png';
import provodImage from '/img/CabelCatalog/image-11.jpg';
import svetImage from '/img/CabelCatalog/image1.png';
import lowVoltageImage from '/img/CabelCatalog/image.jpg';
import image2 from '/img/CabelCatalog/image2.png';
import image3 from '/img/CabelCatalog/image3.png';

export default function CabelCatalog() {
	const { resetFilters, updateFilter, applyFilters } = useShop();

	const categories = useMemo<CategoryData[]>(() => [
		{
			image: cabelImage,
			label: "Кабель",
			category: "Кабель",
			description: "Широкий выбор кабельной продукции для различных нужд"
		},
		{
			image: provodImage,
			label: "Провод",
			category: "Провод",
			description: "Провода различного сечения и назначения"
		},
		{
			image: svetImage,
			label: "Свет",
			category: "Свет",
			description: "Осветительные приборы"
		},
		{
			image: lowVoltageImage,
			label: "Низковольтное оборудование",
			category: "Низковольтное оборудование",
			description: "Надежное оборудование"
		},
		{
			image: image2,
			label: "Системы безопасности",
			category: "Системы безопасности",
			description: "Надежное оборудование"
		},
		{
			image: image3,
			label: "Материалы для прокладки кабеля",
			category: "Материалы для прокладки кабеля",
			description: "Надежное оборудование"
		}

	], []);

	const handleCategoryClick = (category: string) => {
		resetFilters();
		updateFilter('category', category);
		updateFilter('maxPrice', 20000);
		localStorage.setItem('selectedCategory', category);
		const filterSection = document.getElementById('filter-section');
		if (filterSection) {
			filterSection.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
		applyFilters();
	};

	return (
		<div className={styles.cabel}>
			<PageTitle title="Кабельная продукция" />
			<h2 className={styles.sectionTitle}>
				Кабельная продукция
			</h2>
			<div className={styles.products}>
				{categories.map((category, index) => (
					<div
						key={index}
						className={styles.card}
						onClick={() => handleCategoryClick(category.label)}
					>
						<div className={styles.image}>
							<img src={category.image} alt={category.label} />
						</div>
						<div className={styles.cardContent}>
							<h2>{category.label}</h2>
							<p className={styles.description}>{category.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
