import styles from './CabelProduct.module.css';
import CabelFilter from "./CabelFilter/CabelFilter";
import PageTitle from "../PageTitle/PageTitle";
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useShop } from '../../context/ShopContext';
import { useLocation } from 'react-router-dom';
import SEO from '../SEO/SEO';

export default function CatalogPage() {
    
    
    return (
        <div className={styles.cabelProduct}>
            <SEO 
                title="Каталог товаров" 
                description="Полный каталог кабельной продукции, проводов и электротехнических товаров. Выбирайте из широкого ассортимента по лучшим ценам с доставкой."
                keywords="купить кабель, купить провод, каталог кабельной продукции, электротехника каталог, силовой кабель, оптический кабель"
            />
            <PageTitle title="Каталог товаров" />
            <CabelFilter />
        </div>
    );
} 