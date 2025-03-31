import ProductCard from "../ProductCard";
import image from "/img/Electric/image.jpg";
import image1 from "/img/Electric/image1.jpg";
import image2 from "/img/Electric/image2.jpg";
import styles from "./Appelectric.module.css";

export default function Appelectric() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Электротехническое оборудование</h2>
        <div className={styles.grid}>
          <ProductCard
            imagesrc={image}
            label="Низковольтное оборудование"
            text="Автоматические выключатели, УЗО, реле."
            cost="0"
          />
          <ProductCard
            imagesrc={image1}
            label="Системы безопасности"
            text="Оборудование для охранной и пожарной сигнализации."
            cost="0"
          />
          <ProductCard
            imagesrc={image2}
            label="Материалы для прокладки кабеля"
            text="Кабель-каналы, лотки, крепежи."
            cost="0"
          />
        </div>
      </div>
    </div>
  );
}
