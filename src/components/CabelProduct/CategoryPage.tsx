import styles from './CabelProduct.module.css'
import CabelFilter from "./CabelFilter/CabelFilter";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useShop } from '../../context/ShopContext';
import SEO from '../SEO/SEO';

export default function CategoryPage() {
    return (
        <div className={styles.cabelProduct}>
            <SEO 
                title={`Категория: ${decodedCategory}`}
                description={`Товары категории ${decodedCategory} в интернет-магазине КабельОпт. Большой выбор продукции, выгодные цены, доставка по всей России.`}
                keywords={`${decodedCategory}, купить ${decodedCategory}, цена ${decodedCategory}, ${decodedCategory} оптом`}
            />
            <CabelFilter />
        </div>
    );
} 