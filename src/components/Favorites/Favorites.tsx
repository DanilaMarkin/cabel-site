import styles from './Favorites.module.css';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { useState } from 'react';
import ImageModal from '../ImageModal/ImageModal';
import PageTitle from '../PageTitle/PageTitle';

export default function Favorites() {
    const { favorites, removeFavorite, addToCart } = useShop();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const handleSelectAll = () => {
        if (selectedItems.length === favorites.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(favorites.map(item => item.id || ''));
        }
    };

    const handleSelectItem = (itemId: string) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(prev => prev.filter(id => id !== itemId));
        } else {
            setSelectedItems(prev => [...prev, itemId]);
        }
    };

    const handleDeleteSelected = () => {
        selectedItems.forEach(id => removeFavorite(id));
        setSelectedItems([]);
    };

    const handleAddToCart = (item: typeof favorites[0]) => {
        addToCart(item);
    };

    const handleImageClick = (e: React.MouseEvent, imageUrl: string) => {
        e.stopPropagation();
        setSelectedImage(imageUrl);
        setIsImageModalOpen(true);
    };

    return (
        <div className={styles.favorites}>
            <PageTitle title="Избранное" />
            <div className={styles.container}>
                <div className={styles.breadcrumbs}>
                    <Link to="/">Главная</Link>
                    <span>/</span>
                    <span>Отложенные</span>
                </div>

                <div className={styles.favoritesHeader}>
                    <h1>Отложенные товары</h1>
                    <div className={styles.favoritesActions}>
                        <button 
                            className={styles.selectAll}
                            onClick={handleSelectAll}
                        >
                            <span className={styles.checkbox}></span>
                            Выделить всё
                        </button>
                        <button 
                            className={styles.deleteSelected}
                            onClick={handleDeleteSelected}
                            disabled={selectedItems.length === 0}
                        >
                            <span className={styles.cross}></span>
                            Удалить выбранные
                        </button>
                    </div>
                </div>

                <div className={styles.favoritesContent}>
                    <div className={styles.favoriteItems}>
                        {favorites.length === 0 ? (
                            <div className={styles.emptyFavorites}>
                                <h2>Список отложенных товаров пуст</h2>
                                <p>Добавьте товары, которые хотите купить позже</p>
                                <Link to="/catalog" className={styles.continueShopping}>
                                    Перейти в каталог
                                </Link>
                            </div>
                        ) : (
                            favorites.map(item => (
                                <div key={item.id} className={styles.favoriteItem}>
                                    <input 
                                        type="checkbox" 
                                        className={styles.itemCheckbox}
                                        checked={selectedItems.includes(item.id || '')}
                                        onChange={() => handleSelectItem(item.id || '')}
                                    />
                                    <div className={styles.itemImage}>
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            onClick={(e) => handleImageClick(e, item.image || '')}
                                            style={{ cursor: 'zoom-in' }}
                                        />
                                    </div>
                                    <div className={styles.itemInfo}>
                                        <h3>{item.name}</h3>
                                        <p className={styles.itemArticle}>{item.category}</p>
                                    </div>
                                    <div className={styles.itemPrice}>
                                        <span className={styles.price}>{item.cost}</span>
                                        <div className={styles.itemActions}>
                                            <button 
                                                className={styles.addToCart}
                                                onClick={() => handleAddToCart(item)}
                                            >
                                                В корзину
                                            </button>
                                            <button 
                                                className={styles.itemDelete}
                                                onClick={() => removeFavorite(item.id || '')}
                                            >
                                                <span className={styles.cross}></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {favorites.length > 0 && (
                        <div className={styles.favoritesInfo}>
                            <div className={styles.infoBlock}>
                                <h2>Информация</h2>
                                <p>В отложенных товарах вы можете сохранить интересующие вас позиции, чтобы вернуться к ним позже.</p>
                                <ul>
                                    <li>Товары сохраняются на 30 дней</li>
                                    <li>Вы можете добавить их в корзину в любой момент</li>
                                    <li>При изменении цены мы вас уведомим</li>
                                    <li>Вы можете сравнить товары между собой</li>
                                </ul>
                            </div>

                            <div className={styles.recommendedBlock}>
                                <h3>Рекомендуемые товары</h3>
                                <div className={styles.recommendedItems}>
                                    <p className={styles.emptyMessage}>
                                        Рекомендации появятся на основе ваших отложенных товаров
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ImageModal 
                isOpen={isImageModalOpen}
                onClose={() => setIsImageModalOpen(false)}
                imageUrl={selectedImage || ''}
                altText="Изображение товара"
            />
        </div>
    );
} 