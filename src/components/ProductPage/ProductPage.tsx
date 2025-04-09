import styles from './ProductPage.module.css';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { useState, useEffect, useCallback } from 'react';
import DeliveryInfo from './DeliveryInfo';
import ImageModal from '../ImageModal/ImageModal';
import PageTitle from '../PageTitle/PageTitle';
import SEO from '../SEO/SEO';
import { Helmet } from 'react-helmet-async';
import RequestProductModal from '../RequestProductModal/RequestProductModal';

// Типы для компонента
interface ProductData {
    title: string;
    description: string;
    price: string;
    article: string;
    brand: string;
    deliveryInfo: string;
    productImage?: string;
    features?: { name: string; value: string }[];
}

// Тип рекомендуемого продукта
interface Product {
    id: number;
    title: string;
    article: string;
    price: number;
    image: string;
    manufacturer: string;
    text: string;
}

type TabType = 'description' | 'delivery' | 'feature';

const recommendedProducts: Product[] = [
    {
        id: 1,
        title: 'Силовой кабель',
        article: 'СК-1234567890',
        price: 10.26,
        image: '/img/Cables/image1.jpg',
        manufacturer: 'Камкабель',
        text: 'Силовой кабель для промышленного использования. Высокая надежность и долговечность.'
    },
    {
        id: 2,
        title: 'Кабель управления',
        article: 'КУ-1234567890',
        price: 10.61,
        image: '/img/Cables/image12.jpg',
        manufacturer: 'Uncomtech',
        text: 'Кабель управления для систем автоматизации. Устойчив к помехам и электромагнитным воздействиям.'
    },
    {
        id: 3,
        title: 'Монтажный универсальный кабель',
        article: 'МУК-1234567890',
        price: 10.03,
        image: '/img/Cables/image-4.jpg',
        manufacturer: 'Спецкабельстрой',
        text: 'Универсальный монтажный кабель для различных типов соединений. Простота монтажа и надежность.'
    },
    {
        id: 4,
        title: 'Контрольный кабель',
        article: 'КК-1234567890',
        price: 10.17,
        image: '/img/Cables/image-7.jpg',
        manufacturer: 'Кабель Москва',
        text: 'Контрольный кабель для систем мониторинга и управления. Высокая точность передачи сигнала.'
    }
];

export default function ProductPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const {
        products,
        addToCart,
        addToFavorite,
        isInFavorites,
        removeFavorite
    } = useShop();

    // Состояния
    const [activeTab, setActiveTab] = useState<TabType>('description');
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [productData, setProductData] = useState<ProductData | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

    // Получаем данные о товаре
    useEffect(() => {
        if (id) {
            // Находим продукт в списке всех продуктов
            const productInfo = products.find(product => product.id === id);

            if (productInfo) {
                // Если продукт найден, используем его данные
                const data = {
                    title: productInfo.name,
                    description: productInfo.text || `Подробное описание товара ${productInfo.name}. Характеристики и технические данные.`,
                    price: productInfo.cost,
                    article: productInfo.article || 'Н/Д',
                    brand: 'Проммедь',
                    deliveryInfo: "Доставка осуществляется по всей России. Оплата при получении или онлайн на сайте.",
                    productImage: productInfo.image,
                    features: productInfo.features || []
                };
                setProductData(data);
                setIsFavorite(isInFavorites(id));
            } else if (location.state) {
                // Если продукт не найден, но есть данные в location.state
                setProductData(location.state as ProductData);
            } else {
                // Если нет данных вообще, перенаправляем на каталог
                navigate('/catalog', { replace: true });
            }
        }
    }, [id, location.state, products, navigate, isInFavorites]);

    // Обработчики переключения вкладок
    const handleDescriptionClick = () => {
        setActiveTab('description');
    };

    const handleDeliveryClick = () => {
        setActiveTab('delivery');
    };

    const handleFeatureClick = () => {
        setActiveTab('feature');
    };

    const handleImageClick = () => {
        setIsImageModalOpen(true);
    };

    const handleQuantityChange = useCallback((delta: number) => {
        setQuantity(prev => Math.max(1, Math.min(99, prev + delta)));
    }, []);

    const isRequestPrice = useCallback(() => {
        if (!productData?.price) return false;
        return productData.price === "0" ||
            productData.price.toLowerCase().includes('запрос') ||
            productData.price === "по запросу";
    }, [productData?.price]);

    const handleAddToCart = useCallback(() => {
        if (productData && id) {
            if (isRequestPrice()) {
                setIsRequestModalOpen(true);
                return;
            }

            const product = {
                id,
                name: productData.title,
                cost: productData.price,
                quantity,
                image: productData.productImage,
                article: productData.article
            };
            addToCart(product);
            setIsAddedToCart(true);
            setTimeout(() => setIsAddedToCart(false), 2000);
        }
    }, [productData, id, quantity, addToCart, isRequestPrice]);

    const handleFavoriteClick = useCallback(() => {
        if (!productData || !id) return;

        if (isRequestPrice()) {
            setIsRequestModalOpen(true);
            return;
        }

        if (isFavorite) {
            removeFavorite(id);
            setIsFavorite(false);
        } else {
            const product = {
                id,
                name: productData.title,
                cost: productData.price,
                image: productData.productImage,
                article: productData.article
            };
            addToFavorite(product);
            setIsFavorite(true);
        }
    }, [productData, id, isFavorite, removeFavorite, addToFavorite, isRequestPrice]);

    if (!productData) {
        return <div className={styles.loading}>Загрузка товара...</div>;
    }

    // Определяем, нужно ли показывать вкладку с описанием
    const hasDescription = !!productData.description;
    const pageTitle = productData.title || 'Товар';

    return (
        <div className={styles.productPage}>
            <SEO
                title={productData.title}
                description={`${productData.title} - ${productData.description.substring(0, 150)}...`}
                keywords={`${productData.title}, купить ${productData.title}, ${productData.article}, кабельная продукция`}
                ogImage={productData.productImage}
                ogType="product"
            />

            {/* Структурированные данные schema.org */}
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org/",
                        "@type": "Product",
                        "name": productData.title,
                        "image": productData.productImage || "/img/products/product.png",
                        "description": productData.description,
                        "sku": productData.article,
                        "brand": {
                            "@type": "Brand",
                            "name": productData.brand
                        },
                        "offers": {
                            "@type": "Offer",
                            "url": window.location.href,
                            "priceCurrency": "RUB",
                            "price": productData.price,
                            "availability": "https://schema.org/InStock",
                            "itemCondition": "https://schema.org/NewCondition"
                        }
                    })}
                </script>
            </Helmet>

            <PageTitle title={pageTitle} />
            <div className={styles.container}>
                <div className={styles.breadcrumbs}>
                    <Link to="/">Главная</Link>
                    <span>/</span>
                    <Link to="/catalog">Каталог</Link>
                    <span>/</span>
                    <span>{productData.title}</span>
                </div>

                <div className={styles.productContent}>
                    <div className={styles.productImage}>
                        <img
                            src={`/${productData.productImage?.replace(/^\/?/, '') || "img/products/product.png"}`}
                            alt={productData.title || "Наименование товара"}
                            onClick={handleImageClick}
                            style={{ cursor: 'zoom-in' }}
                        />
                    </div>

                    <div className={styles.productInfo}>
                        <div className={styles.brand}>{productData.brand || 'Бренд'}</div>
                        <h1>{productData.title || "Наименование товара"}</h1>
                        <div className={styles.article}>Артикул: {productData.article || 'Н/Д'}</div>
                        <div className={styles.price}>{productData.price || "2990 ₽"}</div>

                        {/* Отображаем вкладки только если есть данные хотя бы для одной из них */}
                        {(hasDescription || productData.deliveryInfo) && (
                            <>
                                <div className={styles.tabs}>
                                    {hasDescription && (
                                        <button
                                            className={`${styles.tabButton} ${activeTab === 'description' ? styles.active : ''}`}
                                            onClick={handleDescriptionClick}
                                        >
                                            Описание
                                        </button>
                                    )}
                                    {productData.features && productData.features.length > 0 && (
                                        <button
                                            className={`${styles.tabButton} ${activeTab === 'feature' ? styles.active : ''}`}
                                            onClick={handleFeatureClick}
                                        >
                                            Характеристики
                                        </button>
                                    )}
                                    <button
                                        className={`${styles.tabButton} ${activeTab === 'delivery' ? styles.active : ''}`}
                                        onClick={handleDeliveryClick}
                                    >
                                        Доставка и оплата
                                    </button>
                                </div>

                                <div className={`${styles.tabContent} ${activeTab === 'description' ? styles.active : ''}`}>
                                    <div className={styles.description}>
                                        <p>{productData.description}</p>
                                    </div>
                                </div>

                                {productData.features && productData.features.length > 0 && (
                                    <div className={`${styles.tabContent} ${styles.featureBlock} ${activeTab === 'feature' ? styles.active : ''}`}>
                                        <div className={styles.feature}>
                                            <dl className={styles.featuresList}>
                                                {productData.features.map((feature, index) => (
                                                    <div key={index} className={styles.featureItem}>
                                                        <dt className={styles.featureName}>{feature.name}</dt>
                                                        <dd className={styles.featureValue}>{feature.value}</dd>
                                                    </div>
                                                ))}
                                            </dl>
                                        </div>
                                    </div>
                                )}

                                <div className={`${styles.tabContent} ${activeTab === 'delivery' ? styles.active : ''}`}>
                                    <DeliveryInfo customInfo={productData.deliveryInfo} />
                                </div>
                            </>
                        )}

                        <div className={styles.actions}>
                            <div className={styles.quantity}>
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    readOnly
                                />
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    disabled={quantity >= 99}
                                >
                                    +
                                </button>
                            </div>

                            <div className={styles.actionButtons}>
                                <button
                                    className={`${styles.addToCart} ${isAddedToCart ? styles.added : ''}`}
                                    onClick={handleAddToCart}
                                >
                                    {isAddedToCart ? 'Добавлено ✓' : 'Добавить в корзину'}
                                </button>
                                <button
                                    className={`${styles.favoriteButton} ${isFavorite ? styles.active : ''}`}
                                    onClick={handleFavoriteClick}
                                    aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
                                >
                                    <svg viewBox="0 0 24 24">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.recommendedSection}>
                    <h2>С этим товаром покупают</h2>
                    <div className={styles.recommendedProducts}>
                        {recommendedProducts.map(product => (
                            <div key={product.id} className={styles.recommendedCard}>
                                <div className={styles.cardImage}>
                                    <img src={product.image} alt={product.title} />
                                </div>
                                <div className={styles.cardInfo}>
                                    <h3>{product.title}</h3>
                                    <div className={styles.cardPrice}>
                                        <span>Цена: {product.price} руб.</span>
                                        <Link
                                            to={`/product/${product.id}`}
                                            state={{
                                                productImage: product.image,
                                                title: product.title,
                                                description: product.text || `Подробное описание товара ${product.title}. Характеристики и технические данные будут доступны в ближайшее время.`,
                                                price: product.price,
                                                article: product.article || 'Н/Д',
                                                brand: product.manufacturer || 'Проммедь',
                                                deliveryInfo: "Доставка осуществляется по всей России. Оплата при получении или онлайн на сайте."
                                            }}
                                            className={styles.detailsButton}
                                        >
                                            Подробнее
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Модальное окно для отображения изображения на весь экран */}
            <ImageModal
                isOpen={isImageModalOpen}
                onClose={() => setIsImageModalOpen(false)}
                imageUrl={productData.productImage || "/img/products/product.png"}
                altText={productData.title || "Наименование товара"}
            />

            <RequestProductModal
                isOpen={isRequestModalOpen}
                onClose={() => setIsRequestModalOpen(false)}
                productName={productData?.title || ''}
            />
        </div>
    );
} 