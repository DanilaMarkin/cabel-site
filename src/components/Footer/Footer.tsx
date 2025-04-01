import { Link } from 'react-router-dom';
import styles from "./Footer.module.css"; // Импортируем стили

export default function Footer() {
  // Функция для прокрутки страницы наверх
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Плавная прокрутка
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_wrapper}>
        <div className={styles.footer_content}>
          <div className={styles.footer_left}>
            <Link to="/" className={styles.logo}>
              <img src="/img/logo.svg" alt="Логотип Проммедь" />
            </Link>
            <p className={styles.subtitle}>Интернет-магазин силовых кабелей</p>
          </div>

          <nav className={styles.footer_nav}>
            <ul className={styles.nav_list}>
              <li><Link to="/buyers">Покупателям</Link></li>
              <li><Link to="/policy">Политика конфиденциальности</Link></li>
              <li><Link to="/about">О компании</Link></li>
            </ul>
            <ul className={styles.nav_list}>
              <li><Link to="/offer">Договор публичной оферты</Link></li>
              <li><Link to="/contacts">Контакты</Link></li>
              <li><Link to="/payment">Оплата</Link></li>
              <li><Link to="/return">Возврат</Link></li>
            </ul>
          </nav>

          <div className={styles.footer_right}>
            <div className={styles.contact_info}>
              <a href="tel:+7(999)999-999" className={styles.phone}>+7 (968) 462-73-64</a>
              <a href="mailto:prommedi@mail.ru" className={styles.email}>Email: prommedi@mail.ru</a>
            </div>
            <button
              className={styles.button}
              onClick={scrollToTop}
              aria-label="Прокрутить страницу наверх"
            >
              Наверх
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
