import styles from "./Delivery.module.css";
import FooterForm from "../FooterForm/FooterForm";
import PageTitle from "../PageTitle/PageTitle";

export default function Delivery() {
  return (
    <div className={styles.delivery}>
      <PageTitle title="Доставка" />
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <a href="/" className={styles.breadcrumbLink}>Главная</a>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>Доставка</span>
        </div>
        
        <h1 className={styles.title}>Доставка</h1>
        
        <div className={styles.content}>
          <p className={styles.description}>
            Мы стремимся сделать процесс покупки максимально удобным для наших клиентов, поэтому предлагаем несколько вариантов доставки товара:
          </p>
          
          <div className={styles.deliveryOptions}>
            <div className={styles.option}>
              <h3>Курьерская доставка</h3>
              <p>Если вы живёте в городе, где у нас есть представительство, вы можете забрать товар самостоятельно или заказать доставку на дом. Стоимость и сроки доставки зависят от расстояния и веса товара.</p>
            </div>
            
            <div className={styles.option}>
              <h3>Самовывоз</h3>
              <p>Если вы предпочитаете забрать товар самостоятельно, вы можете приехать в наш магазин и забрать его в удобное для вас время. Обратите внимание, что самовывоз возможен не для всех товаров.</p>
            </div>
            
            <div className={styles.option}>
              <h3>Доставка в пункт выдачи</h3>
              <p>Вы можете забрать товар в одном из наших пунктов выдачи. Это удобно, если вы живёте не в городе, где у нас есть представительство, или предпочитаете не заказывать доставку на дом.</p>
            </div>
            
            <div className={styles.option}>
              <h3>Доставка до подъезда</h3>
              <p>Для некоторых товаров мы предлагаем услугу доставки до подъезда. Это удобно, если вы не можете забрать товар самостоятельно, но не хотите заказывать курьерскую доставку.</p>
            </div>
          </div>

          <div className={styles.notice}>
            <p>Обратите внимание, что некоторые товары могут иметь ограничения по доставке. Например, мы не доставляем товары, которые запрещены к пересылке по почте или курьерской службой. Также мы не можем гарантировать доставку крупногабаритных или нестандартных товаров.</p>
          </div>

          <FooterForm />
        </div>
      </div>
    </div>
  );
} 