import { useEffect, useState } from 'react';
import styles from './AddToCartAnimation.module.css';

interface AddToCartAnimationProps {
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
  imageUrl: string;
  onComplete: () => void;
  type: 'cart' | 'compare';
}

export default function AddToCartAnimation({
  startPosition,
  endPosition,
  imageUrl,
  onComplete,
  type
}: AddToCartAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      onComplete();
    }, 3000); // Длительность анимации

    return () => clearTimeout(timer);
  }, [onComplete]);

  const style = {
    '--start-x': `${startPosition.x}px`,
    '--start-y': `${startPosition.y}px`,
    '--end-x': `${endPosition.x}px`,
    '--end-y': `${endPosition.y}px`,
  } as React.CSSProperties;

  if (!isAnimating) return null;

  return (
    <div 
      className={`${styles.animationWrapper} ${styles[type]}`} 
      style={style}
    >
      <img src={imageUrl} alt="Product" className={styles.productImage} />
    </div>
  );
} 