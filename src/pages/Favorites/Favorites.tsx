import { useNavigate } from 'react-router-dom';
import { useShop, FavoriteProduct } from '../../context/ShopContext';
import styles from './Favorites.module.css';
import AppHeader from '../../components/header/AppHeader/AppHeader';
import Footer from '../../components/Footer/Footer';
import PageTitle from '../../components/PageTitle/PageTitle';

export default function Favorites() {
    const { favorites, addToCart, removeFavorite } = useShop();
    const navigate = useNavigate();
    
    const handleRemoveFavorite = (id: string) => {
        removeFavorite(id);
    };
    
    const handleAddToCart = (product: FavoriteProduct) => {
        const uniqueId = `${product.id}-${Date.now()}`;
        addToCart({
            id: uniqueId,
            baseId: product.id,
            name: product.name,
            cost: product.cost,
            quantity: 1
        });
    };
    
    const goToProductPage = (id: string) => {
        navigate(`/product/${id}`);
    };
    
    return (
        <div className={styles.favoritesPage}>
            <AppHeader />
            <PageTitle title="Избранные товары" />
            <div className={styles.container}>
                <h1 className={styles.title}>Избранные товары</h1>
                
                {favorites.length === 0 ? (
                    <div className={styles.emptyState}>
                        <h2>Ваш список избранного пуст</h2>
                        <p>Добавляйте товары в избранное, чтобы вернуться к ним позже</p>
                        <button 
                            className={styles.shopButton}
                            onClick={() => navigate('/catalog')}
                        >
                            Перейти к каталогу
                        </button>
                    </div>
                ) : (
                    <div className={styles.favorites}>
                        {favorites.map((product) => (
                            <div key={product.id} className={styles.favoriteItem}>
                                <div 
                                    className={styles.productInfo}
                                    onClick={() => goToProductPage(product.id)}
                                >
                                    <div className={styles.productImage}>
                                        <img src={product.image || '/img/no-image.png'} alt={product.name} />
                                    </div>
                                    <div className={styles.productDetails}>
                                        <h3>{product.name}</h3>
                                        <p className={styles.productPrice}>{product.cost}</p>
                                    </div>
                                </div>
                                <div className={styles.actions}>
                                    <button 
                                        className={styles.addToCartButton}
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        В корзину
                                    </button>
                                    <button 
                                        className={styles.removeButton}
                                        onClick={() => handleRemoveFavorite(product.id)}
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
} 