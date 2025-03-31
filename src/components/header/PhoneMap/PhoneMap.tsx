import { useState, useEffect, useRef } from "react";
import styles from "./PhoneMap.module.css";
import place from "/img/header/place.png";

const cities = ['Москва', 'Санкт-Петербург', 'Екатеринбург'];

export default function PhoneMap() {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedCity, setSelectedCity] = useState(() => {
		const savedCity = localStorage.getItem('selectedCity');
		return savedCity || 'Москва';
	});
	const citySelectorRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (citySelectorRef.current && !citySelectorRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleCitySelect = (city: string) => {
		setSelectedCity(city);
		localStorage.setItem('selectedCity', city);
		setIsOpen(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.citySelector} ref={citySelectorRef}>
				<button 
					className={styles.cityButton} 
					onClick={() => setIsOpen(!isOpen)}
				>
					<img src={place} alt="Выбрать город" className={styles.icon} />
					<span>{selectedCity}</span>
					<span className={`${styles.arrow} ${isOpen ? styles.arrowRotated : ''}`}>▼</span>
				</button>
				{isOpen && (
					<div className={styles.cityDropdown}>
						{cities.map(city => (
							<button
								key={city}
								className={`${styles.cityOption} ${selectedCity === city ? styles.selected : ''}`}
								onClick={() => handleCitySelect(city)}
							>
								{city}
							</button>
						))}
					</div>
				)}
			</div>
			<div className={styles.phoneNumber}>+7 (968) 462-73-64</div>

		</div>
	);
}
