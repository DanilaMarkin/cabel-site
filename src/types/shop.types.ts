export interface Product {
    id: string;
    name: string;
    cost: string;
    manufacturer?: string;
    category?: string;
    article?: string;
    size?: string;
    text?: string;
    label?: string;
    image?: string;
    quantity?: number;
}

export interface CategoryData {
    image: string;
    label: string;
    category: string;
    description: string;
}

export type SortType = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | '';

export interface FilterOptions {
    minPrice?: number;
    maxPrice?: number;
    category?: string;
    searchQuery?: string;
    sortType?: SortType;
}

export interface AnimationConfig {
    startPosition: { x: number; y: number };
    endPosition: { x: number; y: number };
    type: 'cart' | 'compare';
} 