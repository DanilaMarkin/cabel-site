import ProductCard from "../ProductCard";
import image from "/img/Assec/image.jpg";
import image1 from "/img/Assec/image1.jpg";
import styles from "./AppAssec.module.css";

export default function AppAssec() {
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
        </div>
      </div>
    </div>
  );
}
