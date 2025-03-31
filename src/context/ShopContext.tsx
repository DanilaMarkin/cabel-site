import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

// Типы и интерфейсы
export interface Product {
    id: string;
    baseId?: string;
    name: string;
    cost: string;
    quantity?: number;
    image?: string;
    manufacturer?: string;
    category?: string;
    article?: string;
    size?: string;
    text?: string;
    label?: string;
    features?: { name: string; value: string }[];
}

export interface FavoriteProduct extends Product {
    image?: string;
}

export interface FilterOptions {
    minPrice?: number;
    maxPrice?: number;
    category?: string;
    searchQuery?: string;
    sortType?: SortType;
}

export type SortType = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | '';

export interface ShopContextType {
    cartItems: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    compareItems: Product[];
    addToCompare: (product: Product) => void;
    removeFromCompare: (id: string) => void;
    clearCompare: () => void;
    favorites: FavoriteProduct[];
    addToFavorite: (product: FavoriteProduct) => void;
    removeFavorite: (id: string) => void;
    isInFavorites: (idOrProduct: string | Product | FavoriteProduct) => boolean;
    clearFavorites: () => void;
    filteredProducts: Product[];
    searchProducts: (query: string) => void;
    updateFilter: (key: keyof FilterOptions, value: string | number | undefined) => void;
    resetFilters: () => void;
    filterOptions: FilterOptions;
    applyFilters: () => void;
    products: Product[];
}

// Создаем контекст
const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Хук для использования контекста
export const useShop = (): ShopContextType => {
    const context = useContext(ShopContext);
    if (!context) {
        throw new Error('useShop must be used within a ShopProvider');
    }
    return context;
};

// Провайдер контекста
interface ShopProviderProps {
    children: ReactNode;
}

export const ShopProvider: React.FC<ShopProviderProps> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);

    // Состояние для корзины
    const [cartItems, setCartItems] = useState<Product[]>([]);

    // Состояние для сравнения
    const [compareItems, setCompareItems] = useState<Product[]>([]);

    // Состояние для избранного
    const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);

    // Состояние для фильтров и отфильтрованных товаров
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        minPrice: 0,
        maxPrice: 10000,
        category: '',
        searchQuery: '',
        sortType: ''
    });
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

    useEffect(() => {
        fetch("http://localhost:5000/api/products")
            .then(res => res.json())
            .then(data => {
                if (data.products && Array.isArray(data.products)) {
                    setProducts(data.products);
                    setFilteredProducts(data.products);
                } else {
                    console.error("Ошибка: products не является массивом!", data);
                }
            })
            .catch(error => console.error("Ошибка загрузки товаров:", error));
    }, []);

    // Поиск товаров
    const searchProducts = (query: string) => {
        setFilterOptions(prev => {
            const newOptions = { ...prev, searchQuery: query };
            const filtered = applyFiltersWithOptions(newOptions);
            setFilteredProducts(filtered);
            return newOptions;
        });
    };

    // Обновление отдельного фильтра
    const updateFilter = (key: keyof FilterOptions, value: string | number | undefined) => {
        setFilterOptions(prev => {
            const newOptions = { ...prev, [key]: value };

            // Если обновляется категория, сбрасываем поисковый запрос и сортировку
            if (key === 'category') {
                newOptions.searchQuery = '';
                newOptions.sortType = undefined;  // Сброс сортировки
            }

            fetchFilteredProducts(newOptions); // Загружаем данные с сервера
            return newOptions;
        });
    };


    const fetchFilteredProducts = async (options: FilterOptions) => {
        const params = new URLSearchParams({
            page: '1',
            limit: '20',
            category: options.category || '',
            sortType: options.sortType || '',  // проверяем, что сортировка действительно передается
            maxPrice: options.maxPrice ? options.maxPrice.toString() : ''
        });
    
        try {
            const res = await fetch(`http://localhost:5000/api/products?${params.toString()}`);
            const data = await res.json();
    
            if (data.products && Array.isArray(data.products)) {
                setFilteredProducts(data.products);  // Обновляем список товаров
            } else {
                console.error("Ошибка: products не является массивом!", data);
            }
        } catch (error) {
            console.error("Ошибка загрузки товаров:", error);
        }
    };
    

    // Применение фильтров
    const applyFilters = useCallback(() => {
        setFilteredProducts(applyFiltersWithOptions(filterOptions));
    }, [filterOptions]);

    // Вспомогательная функция для применения фильтров
    const applyFiltersWithOptions = (options: FilterOptions) => {
        let filtered = [...products];

        // Фильтрация по цене
        if (options.maxPrice !== undefined) {
            filtered = filtered.filter(product => {
                if (product.cost === "По запросу") return true;
                const price = parseFloat(product.cost.replace(/[^\d.]/g, '')) * 1000;
                return price <= options.maxPrice!;
            });
        }

        // Фильтрация по категории
        if (options.category) {
            filtered = filtered.filter(product =>
                product.category?.toLowerCase() === options.category?.toLowerCase()
            );
        }

        // Фильтрация по поисковому запросу
        if (options.searchQuery) {
            const query = options.searchQuery.toLowerCase();
            filtered = filtered.filter(product => {
                const searchFields = [
                    product.name,
                    product.label,
                    product.manufacturer,
                    product.category,
                    product.article,
                    product.text
                ];

                return searchFields.some(field =>
                    field && field.toLowerCase().includes(query)
                );
            });
        }

        // Сортировка
        if (options.sortType) {
            filtered.sort((a, b) => {
                const priceA = parseFloat(a.cost.replace(/[^\d.-]/g, ''));
                const priceB = parseFloat(b.cost.replace(/[^\d.-]/g, ''));

                switch (options.sortType) {
                    case 'price-asc':
                        return priceA - priceB;
                    case 'price-desc':
                        return priceB - priceA;
                    default:
                        return 0;
                }
            });
        }

        return filtered;
    };

    // Сброс фильтров
    const resetFilters = () => {
        const defaultOptions: FilterOptions = {
            minPrice: 0,
            maxPrice: 10000,
            category: '',
            searchQuery: '',
            sortType: undefined
        };

        setFilterOptions(defaultOptions);
        setFilteredProducts(applyFiltersWithOptions(defaultOptions));
    };

    // Загрузка данных из localStorage при инициализации
    useEffect(() => {
        try {
            // Загрузка корзины
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                const parsedCart = JSON.parse(savedCart);
                if (Array.isArray(parsedCart)) {
                    setCartItems(parsedCart);
                }
            }

            // Загрузка списка сравнения
            const savedCompare = localStorage.getItem('compare');
            if (savedCompare) {
                const parsedCompare = JSON.parse(savedCompare);
                if (Array.isArray(parsedCompare)) {
                    setCompareItems(parsedCompare);
                }
            }

            // Загрузка избранного
            const savedFavorites = localStorage.getItem('favorites');
            if (savedFavorites) {
                const parsedFavorites = JSON.parse(savedFavorites);
                if (Array.isArray(parsedFavorites)) {
                    setFavorites(parsedFavorites);
                }
            }
        } catch (error) {
            console.error('Ошибка при загрузке данных из localStorage:', error);
        }
    }, []);

    // Сохранение корзины в localStorage при изменении
    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Ошибка при сохранении корзины в localStorage:', error);
        }
    }, [cartItems]);

    // Сохранение списка сравнения в localStorage при изменении
    useEffect(() => {
        try {
            localStorage.setItem('compare', JSON.stringify(compareItems));
        } catch (error) {
            console.error('Ошибка при сохранении списка сравнения в localStorage:', error);
        }
    }, [compareItems]);

    // Сохранение избранного в localStorage при изменении
    useEffect(() => {
        try {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        } catch (error) {
            console.error('Ошибка при сохранении избранного в localStorage:', error);
        }
    }, [favorites]);

    // Функция для добавления товара в корзину
    const addToCart = (product: Product) => {
        try {
            if (!product || !product.id) {
                console.error('Попытка добавить некорректный товар в корзину:', product);
                return;
            }

            // Проверяем, существует ли уже такой товар в корзине по id или baseId
            const existingProductIndex = cartItems.findIndex(item =>
                (product.baseId && item.baseId === product.baseId) ||
                (item.id === product.id) ||
                (item.name === product.name && item.cost === product.cost)
            );

            if (existingProductIndex !== -1) {
                // Если товар уже есть, обновляем его количество
                const updatedCart = [...cartItems];
                const existingProduct = updatedCart[existingProductIndex];
                updatedCart[existingProductIndex] = {
                    ...existingProduct,
                    quantity: (existingProduct.quantity || 1) + (product.quantity || 1)
                };
                setCartItems(updatedCart);
            } else {
                // Если товара еще нет, добавляем его
                setCartItems(prevItems => [...prevItems, { ...product, quantity: product.quantity || 1 }]);
            }
        } catch (error) {
            console.error('Ошибка при добавлении товара в корзину:', error);
        }
    };

    // Функция для удаления товара из корзины
    const removeFromCart = (id: string) => {
        try {
            if (!id) {
                console.error('Попытка удалить товар с некорректным id:', id);
                return;
            }
            setCartItems(prevItems => prevItems.filter(item => item.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении товара из корзины:', error);
        }
    };

    // Функция для обновления количества товара в корзине
    const updateQuantity = (id: string, quantity: number) => {
        try {
            if (!id) {
                console.error('Попытка обновить количество товара с некорректным id:', id);
                return;
            }

            if (quantity <= 0) {
                // Если количество меньше или равно 0, удаляем товар из корзины
                removeFromCart(id);
                return;
            }

            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === id ? { ...item, quantity } : item
                )
            );
        } catch (error) {
            console.error('Ошибка при обновлении количества товара:', error);
        }
    };

    // Функция для очистки корзины
    const clearCart = () => {
        try {
            setCartItems([]);
        } catch (error) {
            console.error('Ошибка при очистке корзины:', error);
        }
    };

    // Функция для добавления товара в список сравнения
    const addToCompare = (product: Product) => {
        try {
            if (!product || !product.id) {
                console.error('Попытка добавить некорректный товар в список сравнения:', product);
                return;
            }

            // Проверка, существует ли уже такой товар в списке сравнения
            if (!compareItems.some(item => item.id === product.id)) {
                setCompareItems(prevItems => [...prevItems, product]);
            }
        } catch (error) {
            console.error('Ошибка при добавлении товара в список сравнения:', error);
        }
    };

    // Функция для удаления товара из списка сравнения
    const removeFromCompare = (id: string) => {
        try {
            if (!id) {
                console.error('Попытка удалить товар с некорректным id из списка сравнения:', id);
                return;
            }
            setCompareItems(prevItems => prevItems.filter(item => item.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении товара из списка сравнения:', error);
        }
    };

    // Функция для очистки списка сравнения
    const clearCompare = () => {
        try {
            setCompareItems([]);
        } catch (error) {
            console.error('Ошибка при очистке списка сравнения:', error);
        }
    };

    // Функция для добавления товара в избранное
    const addToFavorite = (product: FavoriteProduct) => {
        try {
            if (!product || !product.id) {
                console.error('Попытка добавить некорректный товар в избранное:', product);
                return;
            }

            // Проверка, существует ли уже такой товар в избранном
            if (!isInFavorites(product.id)) {
                setFavorites(prevItems => [...prevItems, product]);
            } else {
                // Если товар уже в избранном, удаляем его
                removeFavorite(product.id);
            }
        } catch (error) {
            console.error('Ошибка при добавлении товара в избранное:', error);
        }
    };

    // Функция для проверки, находится ли товар в избранном
    const isInFavorites = (idOrProduct: string | Product | FavoriteProduct): boolean => {
        try {
            if (typeof idOrProduct === 'string') {
                return favorites.some(item => item.id === idOrProduct);
            } else if (idOrProduct && idOrProduct.id) {
                return favorites.some(item => item.id === idOrProduct.id);
            }
            return false;
        } catch (error) {
            console.error('Ошибка при проверке наличия товара в избранном:', error);
            return false;
        }
    };

    // Функция для удаления товара из избранного
    const removeFavorite = (id: string) => {
        try {
            if (!id) {
                console.error('Попытка удалить товар с некорректным id из избранного:', id);
                return;
            }
            setFavorites(prevItems => prevItems.filter(item => item.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении товара из избранного:', error);
        }
    };

    // Функция для очистки избранного
    const clearFavorites = () => {
        try {
            setFavorites([]);
        } catch (error) {
            console.error('Ошибка при очистке избранного:', error);
        }
    };

    // Предоставляем контекст
    return (
        <ShopContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                compareItems,
                addToCompare,
                removeFromCompare,
                clearCompare,
                favorites,
                addToFavorite,
                removeFavorite,
                isInFavorites,
                clearFavorites,
                filteredProducts,
                searchProducts,
                updateFilter,
                resetFilters,
                filterOptions,
                applyFilters,
                products
            }}
        >
            {children}
        </ShopContext.Provider>
    );
}; 