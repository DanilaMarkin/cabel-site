import styles from './Cart.module.css';
import { Link } from 'react-router-dom';
import { useShop, FavoriteProduct } from '../../context/ShopContext';
import { useState } from 'react';
import image from '/img/header/heart.png'
import image1 from '/img/header/heart1.png'
import PageTitle from '../PageTitle/PageTitle';
import PaymentModal from '../PaymentModal/PaymentModal';

export default function Cart() {
    const { cartItems, removeFromCart, updateQuantity, addToFavorite, isInFavorites } = useShop();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const handleSelectAll = () => {
        if (selectedItems.length === cartItems.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cartItems.map(item => item.id || ''));
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
        selectedItems.forEach(id => removeFromCart(id));
        setSelectedItems([]);
    };

    const handleQuantityChange = (productId: string, delta: number) => {
        const product = cartItems.find(item => item.id === productId);
        if (product) {
            const newQuantity = (product.quantity || 1) + delta;
            if (newQuantity > 0) {
                updateQuantity(productId, newQuantity);
            }
        }
    };

    const handleFavoriteClick = (item: typeof cartItems[0]) => {
        const productToAdd: FavoriteProduct = {
            id: item.id,
            name: item.name,
            cost: item.cost,
            image: item.image,
            category: item.category
        };
        addToFavorite(productToAdd);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            // Удаляем все нечисловые символы, кроме точки и запятой
            const cost = parseFloat(item.cost.replace(/[^\d.,]/g, '').replace(',', '.'));
            return total + (cost * (item.quantity || 1));
        }, 0);
    };

    // Функция для подсчета общего количества товаров
    const getTotalItemsCount = () => {
        return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
    };

    // Функция для форматирования цены
    const formatPrice = (price: string, quantity: number = 1) => {
        // Удаляем все нечисловые символы, кроме точки и запятой
        const numericPrice = parseFloat(price.replace(/[^\d.,]/g, '').replace(',', '.'));
        return isNaN(numericPrice) ? price : `${(numericPrice * quantity).toFixed(2)} ₽`;
    };

    return (
        <div className={styles.cart}>
            <PageTitle title="Корзина" />
            <div className={styles.container}>
                <div className={styles.breadcrumbs}>
                    <Link to="/">Главная</Link>
                    <span>/</span>
                    <span>Корзина</span>
                </div>

                <div className={styles.cartHeader}>
                    <h1>Корзина</h1>
                    <div className={styles.cartActions}>
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

                <div className={styles.cartContent}>
                    <div className={styles.cartItems}>
                        {cartItems.length === 0 ? (
                            <div className={styles.emptyCart}>
                                <h2>Корзина пуста</h2>
                                <p>Добавьте товары для оформления заказа</p>
                                <Link to="/catalog" className={styles.continueShopping}>
                                    Перейти в каталог
                                </Link>
                            </div>
                        ) : (
                            cartItems.map(item => (
                                <div key={item.id} className={styles.cartItem}>
                                    <input 
                                        type="checkbox" 
                                        className={styles.itemCheckbox}
                                        checked={selectedItems.includes(item.id || '')}
                                        onChange={() => handleSelectItem(item.id || '')}
                                    />
                                    <div className={styles.itemImage}>
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className={styles.itemInfo}>
                                        <h3>{item.name}</h3>
                                        <p className={styles.itemArticle}>{item.category}</p>
                                        <div className={styles.itemControls}>
                                            <div className={styles.quantityControls}>
                                                <button 
                                                    onClick={() => handleQuantityChange(item.id!, -1)}
                                                    disabled={(item.quantity || 1) <= 1}
                                                    className={styles.quantityButton}
                                                >
                                                    -
                                                </button>
                                                <span>{item.quantity || 1}</span>
                                                <button 
                                                    onClick={() => handleQuantityChange(item.id!, 1)}
                                                    className={styles.quantityButton}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <div className={styles.itemPrice}>
                                                {formatPrice(item.cost, item.quantity || 1)}
                                            </div>
                                            <button 
                                                className={styles.removeButton}
                                                onClick={() => removeFromCart(item.id!)}
                                            >
                                                <span className={styles.cross}></span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.itemPrice}>
                                        <span className={styles.price}>{formatPrice(item.cost)}</span>
                                        <div className={styles.itemActions}>
                                            <img 
                                                src={isInFavorites(item) ? image1 : image}
                                                alt="В избранное"
                                                onClick={() => handleFavoriteClick(item)}
                                                className={styles.favoriteIcon}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {cartItems.length > 0 && (
                        <div className={styles.cartSummary}>
                            <div className={styles.summaryBlock}>
                                <h2>Итого</h2>
                                <div className={styles.summaryRow}>
                                    <span>Товары ({getTotalItemsCount()})</span>
                                    <span>{calculateTotal().toFixed(2)} ₽</span>
                                </div>
                                <button 
                                    className={styles.checkoutButton}
                                    onClick={() => setIsPaymentModalOpen(true)}
                                >
                                    Оформить заказ
                                </button>
                            </div>

                            <div className={styles.infoBlock}>
                                <h3>Информация</h3>
                                <ul>
                                    <li>Доставка по всей России</li>
                                    <li>Оплата при получении</li>
                                    <li>Гарантия качества</li>
                                    <li>Возврат в течение 14 дней</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <PaymentModal 
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                totalAmount={calculateTotal()}
            />
        </div>
    );
} 