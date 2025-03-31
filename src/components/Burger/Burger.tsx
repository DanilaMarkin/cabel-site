import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Burger.module.css';
import { useShop } from '../../context/ShopContext';

export const Burger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, compareItems, favorites } = useShop();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  return (
    <div className={styles.burgerMenu}>
      <button 
        className={`${styles.burgerButton} ${isOpen ? styles.open : ''}`}
        onClick={toggleMenu}
        aria-label="Открыть меню"
      >
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
      </button>

      <div 
        className={`${styles.menuOverlay} ${isOpen ? styles.active : ''}`}
        onClick={toggleMenu}
      ></div>

      <div className={`${styles.menu} ${isOpen ? styles.active : ''}`}>
        <div className={styles.menuHeader}>
          <Link to="/" className={styles.logo} onClick={toggleMenu}>
            КабельОпт
          </Link>
          <button 
            className={styles.closeButton}
            onClick={toggleMenu}
            aria-label="Закрыть меню"
          >
            <span></span>
          </button>
        </div>

        <div className={styles.menuContent}>
          <div className={styles.menuSection}>
            <h3>Личный кабинет</h3>
            <ul className={styles.userActions}>
              <li>
                <Link to="/cart" onClick={toggleMenu} className={styles.actionLink}>
                  Корзина
                  {getCartCount() > 0 && <span className={styles.badge}>{getCartCount()}</span>}
                </Link>
              </li>
              <li>
                <Link to="/favorites" onClick={toggleMenu} className={styles.actionLink}>
                  Отложенные
                  {favorites.length > 0 && <span className={styles.badge}>{favorites.length}</span>}
                </Link>
              </li>
              <li>
                <Link to="/compare" onClick={toggleMenu} className={styles.actionLink}>
                  Сравнение
                  {compareItems.length > 0 && <span className={styles.badge}>{compareItems.length}</span>}
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.menuSection}>
            <h3>Каталог</h3>
            <ul>
              <li><Link to="/catalog" onClick={toggleMenu}>Все товары</Link></li>
              <li><Link to="/catalog/cable" onClick={toggleMenu}>Кабельная продукция</Link></li>
              <li><Link to="/catalog/accessories" onClick={toggleMenu}>Аксессуары</Link></li>
            </ul>
          </div>

          <div className={styles.menuSection}>
            <h3>Информация</h3>
            <ul>
              <li><Link to="/about" onClick={toggleMenu}>О компании</Link></li>
              <li><Link to="/delivery" onClick={toggleMenu}>Доставка</Link></li>
              <li><Link to="/contacts" onClick={toggleMenu}>Контакты</Link></li>
            </ul>
          </div>

          <div className={styles.menuSection}>
            <h3>Документы</h3>
            <ul>
              <li><Link to="/policy" onClick={toggleMenu}>Политика конфиденциальности</Link></li>
              <li><Link to="/offer" onClick={toggleMenu}>Договор оферты</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.menuFooter}>
          <a href="tel:+78001234567" className={styles.phone}>8 (800) 123-45-67</a>
          <a href="mailto:info@kabelopt.ru" className={styles.email}>info@kabelopt.ru</a>
        </div>
      </div>
    </div>
  );
};
