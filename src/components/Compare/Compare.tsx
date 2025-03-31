import { useState } from 'react';
import styles from './Compare.module.css';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import ImageModal from '../ImageModal/ImageModal';
import PageTitle from '../PageTitle/PageTitle';

export default function Compare() {
    const { compareItems, removeFromCompare } = useShop();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const characteristics = {
        'Сечение': '2.5 мм²',
        'Длина': '100 м',
        'Материал': 'Медь',
        'Изоляция': 'ПВХ',
        'Напряжение': '220В'
    };

    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        setIsImageModalOpen(true);
    };

    return (
        <div className={styles.compare}>
            <PageTitle title="Сравнение товаров" />
            <div className={styles.container}>
                <div className={styles.breadcrumbs}>
                    <Link to="/">Главная</Link>
                    <span>/</span>
                    <span>Сравнение товаров</span>
                </div>

                <div className={styles.compareHeader}>
                    <h1>Сравнение товаров</h1>
                    <div className={styles.compareActions}>
                        <button 
                            className={styles.clearAll}
                            onClick={() => compareItems.forEach(item => removeFromCompare(item.id || ''))}
                            disabled={compareItems.length === 0}
                        >
                            Очистить список
                        </button>
                        <div className={styles.displayToggle}>
                            <label>
                                <input type="checkbox" />
                                <span>Показать только различия</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className={styles.compareContent}>
                    {compareItems.length === 0 ? (
                        <div className={styles.emptyCompare}>
                            <p>Список сравнения пуст</p>
                            <Link to="/catalog" className={styles.continueShopping}>
                                Перейти к покупкам
                            </Link>
                        </div>
                    ) : (
                        <div className={styles.compareTable}>
                            <div className={styles.compareColumn}>
                                <div className={styles.columnHeader}>
                                    <h3>Характеристики</h3>
                                </div>
                                <div className={styles.characteristics}>
                                    {Object.keys(characteristics).map(key => (
                                        <div key={key} className={styles.characteristicRow}>
                                            <span>{key}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {compareItems.map(item => (
                                <div key={item.id} className={styles.compareColumn}>
                                    <div className={styles.columnHeader}>
                                        <div className={styles.productImage}>
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                onClick={() => handleImageClick(item.image || '')}
                                                style={{ cursor: 'zoom-in' }}
                                            />
                                        </div>
                                        <h3>{item.name}</h3>
                                        <p className={styles.price}>{item.cost}</p>
                                        <div className={styles.productActions}>
                                            <button className={styles.addToCart}>В корзину</button>
                                            <button 
                                                className={styles.removeFromCompare}
                                                onClick={() => removeFromCompare(item.id || '')}
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.characteristics}>
                                        {Object.entries(characteristics).map(([key, value]) => (
                                            <div key={key} className={styles.characteristicRow}>
                                                <span>{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <div className={styles.compareColumn}>
                                <div className={styles.columnHeader}>
                                    <div className={styles.addProduct}>
                                        <Link to="/catalog" className={styles.addButton}>
                                            <span>+</span>
                                            <span>Добавить товар</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Модальное окно для отображения изображения на весь экран */}
            <ImageModal 
                isOpen={isImageModalOpen}
                onClose={() => setIsImageModalOpen(false)}
                imageUrl={selectedImage || ''}
                altText="Изображение товара"
            />
        </div>
    );
} 