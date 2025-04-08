import styles from './About.module.css';
import PageTitle from '../PageTitle/PageTitle';

export default function About() {
  return (
    <div className={styles.about}>
      <div className={styles.breadcrumbs}>
        <a href="/">Главная</a>
        <span>/</span>
        <span>О компании</span>
      </div>

      <PageTitle title="О компании" />
      <h1>О компании</h1>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2>Наша миссия</h2>
          <p>Мы стремимся обеспечить наших клиентов качественной кабельно-проводниковой продукцией, предоставляя профессиональную поддержку и индивидуальный подход к каждому заказу.</p>
        </section>

        <section className={styles.section}>
          <h2>О нас</h2>
          <p>Наша компания является одним из ведущих поставщиков кабельной продукции на российском рынке. Мы работаем напрямую с крупнейшими производителями, что позволяет нам гарантировать качество продукции и оптимальные цены.</p>
        </section>

        <section className={styles.section}>
          <h2>Наши преимущества</h2>
          <ul className={styles.advantages}>
            <li>Широкий ассортимент кабельной продукции</li>
            <li>Гарантия качества и соответствие ГОСТ</li>
            <li>Оперативная доставка по всей России</li>
            <li>Техническая поддержка и консультации</li>
            <li>Гибкая система скидок для постоянных клиентов</li>
            <li>Индивидуальный подход к каждому заказу</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Наша команда</h2>
          <p>В нашей компании работают высококвалифицированные специалисты с многолетним опытом в сфере кабельной продукции. Мы постоянно повышаем свою квалификацию и следим за новинками рынка.</p>
        </section>

        <section className={styles.section}>
          <h2>Сертификаты и лицензии</h2>
          <p>Вся продукция сертифицирована и соответствует требованиям ГОСТ. Мы имеем все необходимые лицензии и разрешения для осуществления нашей деятельности.</p>
        </section>

        <section className={styles.section}>
          <h2>Контакты</h2>
          <div className={styles.contacts}>
            <p><strong>Адрес:</strong> ООО «ГК ПРОММЕДЬ»
Ул. Кравченко дом 12 , офис 11</p>
            <p><strong>Телефон:</strong> <a href="tel:+7(999)999-999" className={styles.link}>+7 (968) 462-73-64</a> </p>
            <p><strong>Email:</strong> <a href="mailto:prommedi@mail.ru" className={styles.link}>prommedi@mail.ru</a> </p>
            <p><strong>Режим работы:</strong> Пн-Пт: 9:00 - 18:00</p>
          </div>
        </section>
      </div>
    </div>
  );
} 