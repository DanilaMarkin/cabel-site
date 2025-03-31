import { useState } from 'react';
import styles from './RequestProductModal.module.css';

interface RequestProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    productName: string;
}

export default function RequestProductModal({ isOpen, onClose, productName }: RequestProductModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    });
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Здесь можно добавить логику отправки данных на сервер
        setIsSuccess(true);
        setTimeout(() => {
            setIsSuccess(false);
            onClose();
            setFormData({ name: '', phone: '', email: '' });
        }, 2000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                
                {!isSuccess ? (
                    <>
                        <h2>Запрос цены на товар</h2>
                        <p>Товар: {productName}</p>
                        
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGroup}>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ваше имя"
                                    className={styles.input}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Номер телефона"
                                    className={styles.input}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className={styles.input}
                                    required
                                />
                            </div>
                            <button type="submit" className={styles.submitButton}>
                                Отправить запрос
                            </button>
                        </form>
                        <p className={styles.privacy}>
                            Нажимая кнопку "Отправить запрос", вы соглашаетесь с политикой конфиденциальности
                        </p>
                    </>
                ) : (
                    <div className={styles.success}>
                        <div className={styles.successIcon}>
                            <svg viewBox="0 0 52 52">
                                <circle className={styles.circle} cx="26" cy="26" r="25" fill="none"/>
                                <path className={styles.check} d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                            </svg>
                        </div>
                        <h2>Спасибо за запрос!</h2>
                        <p>Мы свяжемся с вами в ближайшее время</p>
                    </div>
                )}
            </div>
        </div>
    );
} 