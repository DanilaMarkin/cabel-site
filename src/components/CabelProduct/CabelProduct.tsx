import { useLocation, useParams, Navigate } from 'react-router-dom';
import styles from './CabelProduct.module.css'
import CabelCatalog from "./CabelCatalog/CabelCatalog";
import CabelFilter from "./CabelFilter/CabelFilter";
import PageTitle from "../PageTitle/PageTitle";
import { useEffect, useState } from 'react';
import { useShop } from '../../context/ShopContext';

export default function CabelProduct() {
	
	return (
		<div className={styles.cabelProduct} key={`${key}-${location.pathname}`}>
			{showCatalog ? (
				<>
					<PageTitle title="Каталог товаров" />
					<CabelCatalog key={`catalog-${key}`} />
				</>
			) : (
				<CabelFilter key={`filter-${key}-${category}`} />
			)}
		</div>
	);
}