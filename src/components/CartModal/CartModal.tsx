import { useEffect } from 'react';
import styles from './CartModal.module.css';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div 
        className={styles.modalContent} 
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2>Корзина</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.cartItems}>
            {/* Здесь будет список товаров */}
            <p className={styles.emptyCart}>Ваша корзина пуста</p>
          </div>
          <div className={styles.cartFooter}>
            <div className={styles.total}>
              <span>Итого:</span>
              <span>0 ₽</span>
            </div>
            <button className={styles.checkoutButton}>
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 