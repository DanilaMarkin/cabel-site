import { useState } from 'react';
import styles from './FooterForm.module.css'
import Modal from '../Modal/Modal';

export default function FooterForm() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		message: ''
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Здесь можно добавить логику отправки данных формы
		setIsModalOpen(true);
		setFormData({
			name: '',
			phone: '',
			message: ''
		});
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	return (
		<>
			<form className={styles.deliveryForm} onSubmit={handleSubmit}>
				<h2>УКАЖИТЕ АДРЕС ДОСТАВКИ И МЫ ПОДБЕРЕМ НЕСКОЛЬКО ВАРИАНТОВ</h2>
				<div className={styles.formFields}>
					<input
						type="text"
						placeholder="Имя"
						className={styles.input}
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
					<input
						type="tel"
						placeholder="Телефон"
						className={styles.input}
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						required
					/>
					<input
						type="text"
						placeholder="С чем могу помочь?"
						className={styles.input}
						name="message"
						value={formData.message}
						onChange={handleChange}
						required
					/>
					<button type="submit" className={styles.submitButton}>Отправить</button>
				</div>
			</form>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Спасибо за заявку!"
				message="Мы свяжемся с вами в ближайшее время для уточнения деталей доставки."
			/>
		</>
	)
}
