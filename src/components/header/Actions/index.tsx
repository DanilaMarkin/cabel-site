import React from 'react';
import styles from "./Actions.module.css";
import { useNavigate } from 'react-router-dom';
import { useShop } from '../../../context/ShopContext';

interface ActionProps {
    imagesrc: string;
    label: string;
    route?: string;
}

const Actions: React.FC<ActionProps> = ({ imagesrc, label, route }) => {
    const navigate = useNavigate();
    const { cartItems, compareItems, favorites } = useShop();
    
    const getCount = () => {
        switch (label) {
            case "Корзина":
                return cartItems.length;
            case "Сравнение":
                return compareItems.length;
            case "Отложенные":
                return favorites.length;
            default:
                return 0;
        }
    };
    
    const handleClick = () => {
        switch (label) {
            case "Корзина":
                navigate('/cart');
                break;
            case "Сравнение":
                navigate('/compare');
                break;
            case "Отложенные":
                navigate('/favorites');
                break;
            default:
                if (route) {
                    navigate(route);
                }
        }
    };
    
    const count = getCount();
    
    return (
        <div 
            className={styles.header_action} 
            onClick={handleClick}
            data-cart-icon={label === "Корзина" ? true : undefined}
            data-compare-icon={label === "Сравнение" ? true : undefined}
        >
            <button className={styles.header_block}>
                <img src={imagesrc} alt={label} />
                <div className={styles.header_name}>{label}</div>
                {count > 0 && (
                    <div className={styles.count}>{count}</div>
                )}
            </button>
        </div>
    );
};

export default Actions; 