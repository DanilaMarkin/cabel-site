import { useState } from 'react';
import plus from "/img/plus.png";
import styles from "./MainDelyvery.module.css";

interface DeliveryItem {
  title: string;
  content: string;
}

const deliveryItems: DeliveryItem[] = [
  {
    title: "Безналичный расчет",
    content: "Оплачивайте заказы удобным способом через банковский перевод. Для юридических лиц предоставляем полный пакет документов."
  },
  {
    title: "Оплата через онлайн-банк",
    content: "Быстрая и безопасная оплата через любой онлайн-банк. Поддерживаем все популярные платежные системы."
  },
  {
    title: "Оплата по договору",
    content: "Заключаем договоры с гибкими условиями оплаты. Возможна отсрочка платежа для постоянных клиентов."
  },
  {
    title: "Условия сотрудничества для юридических и физических лиц",
    content: "Индивидуальный подход к каждому клиенту. Специальные условия для оптовых заказов. Гибкая система скидок."
  }
];

export default function MainDelyvery() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Условия Доставки и Оплаты</h2>
        <div className={styles.list}>
          {deliveryItems.map((item, index) => (
            <div key={index} className={styles.itemWrapper}>
              <div 
                className={`${styles.item} ${openItems.includes(index) ? styles.active : ''}`}
                onClick={() => toggleItem(index)}
              >
                {item.title}
                <img 
                  src={plus} 
                  className={`${styles.icon} ${openItems.includes(index) ? styles.rotated : ''}`} 
                  alt="" 
                />
              </div>
              <div className={`${styles.itemContent} ${openItems.includes(index) ? styles.expanded : ''}`}>
                {item.content}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <p className={styles.statNumber}>100%</p>
            <span className={styles.statText}>наших клиентов довольны условиями оплаты</span>
          </div>
          <div className={styles.stat}>
            <p className={styles.statNumber}>95%</p>
            <span className={styles.statText}>заказов доставлены вовремя</span>
          </div>
        </div>
      </div>
    </div>
  );
}
