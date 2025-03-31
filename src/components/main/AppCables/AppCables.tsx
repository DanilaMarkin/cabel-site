import ProductCard from "../ProductCard";
import styles from "./AppCables.module.css";

// Используем правильные пути к изображениям из public
const image = "/img/Cables/image.jpg";
const imag1 = "/img/Cables/image1.jpg";
const imag12 = "/img/Cables/image12.jpg";
const image1 = "/img/Cables/image-1.jpg";
const image2 = "/img/Cables/image-2.jpg";
const image3 = "/img/Cables/image-3.jpg";
const image4 = "/img/Cables/image-4.jpg";
const image5 = "/img/Cables/image-5.jpg";
const image6 = "/img/Cables/image-6.jpg";
const image7 = "/img/Cables/image-7.jpg";
const image8 = "/img/Cables/image-8.jpg";
const image9 = "/img/Cables/image-9.jpg";
const image10 = "/img/Cables/image-10.jpg";
const image11 = "/img/Cables/image-11.jpg";

export default function AppCables() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Кабели</h2>
        <div className={styles.cables}>
          <ProductCard
            imagesrc={imag1}
            label="Силовой кабель"
            text="Для передачи и распределения электроэнергии"
            cost="10.26"
          />
			 <ProductCard
            imagesrc={imag12}
            label="Кабель управления"
            text="Для автоматизированных систем и управления технологическими процессами"
            cost=" 10.61"
          />
			 <ProductCard
            imagesrc={image4}
            label="Монтажный универсальный кабель"
            text="Универсальное решение для прокладки в различных условиях"
            cost="10.03"
          />
			 <ProductCard
            imagesrc={image7}
            label="Контрольный кабель"
            text="Для передачи сигналов управления и контроля"
            cost="10.17"
          />
			 <ProductCard
            imagesrc={image}
            label="Кабель сигнализации и блокировки"
            text="Для систем охранной и пожарной сигнализации"
            cost="10.11"
          />
			<ProductCard
            imagesrc={image2}
            label="Оптический кабель"
            text="Для высокоскоростной передачи данных"
            cost="0"
          />
			 <ProductCard
            imagesrc={image5}
            label="Судовой кабель"
            text="Для судостроения и эксплуатации в условиях повышенной влажности"
            cost="10.2"
          />
			 <ProductCard
            imagesrc={image8}
            label="Симметричный кабель"
            text="Для передачи низкочастотных сигналов"
            cost=" 10.21"
          />
			 <ProductCard
            imagesrc={image1}
            label="Кабель местной связи"
            text="Для телефонных сетей и передачи сигналов"
            cost="10.53"
          />
			 <ProductCard
            imagesrc={image3}
            label="Телефонный кабель"
            text="Для передачи голоса и данных"
            cost="11.32"
          />
			 <ProductCard
            imagesrc={image6}
            label="Коаксиальный кабель"
            text="Для передачи телевизионных сигналов и интернета"
            cost="10.37"
          />
			 <ProductCard
            imagesrc={image9}
            label="Кабель из полимерных композиций"
            text="Для сложных эксплуатационных условий"
            cost="14.4"
          />
			 <ProductCard
            imagesrc={image10}
            label="Lan-кабель"
            text="Для компьютерных сетей"
            cost="10.1"
          />
			 <ProductCard
            imagesrc={image11}
            label="Провод"
            text="Для подключения электрических приборов."
            cost="10.03"
          />
        </div>
      </div>
    </div>
  );
}
