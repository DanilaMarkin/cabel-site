import { useState } from 'react';
import { Link } from "react-router-dom";
import PhoneMap from "./PhoneMap/PhoneMap";
import styles from "./SubHeader.module.css";
import RequestForm from '../RequestForm/RequestForm';

export default function SubHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.subHeader}>
      <div className={styles.navigation}>
        <Link to="/about" className={styles.navLink}>О компании</Link>
        <Link to="/buyers" className={styles.navLink}>Покупателям</Link>
        <Link to="/delivery" className={styles.navLink}>Оплата и доставка</Link>
        <Link to="/contacts" className={styles.navLink}>Контакты</Link>
      </div>
      <div className={styles.rightSection}>
        <button 
          className={styles.requestButton}
          onClick={() => setIsModalOpen(true)}
        >
          Оставить заявку
        </button>
        <PhoneMap />
      </div>

      <RequestForm 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}