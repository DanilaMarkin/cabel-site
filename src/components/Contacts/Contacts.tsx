import styles from './Contacts.module.css';
import { Link } from 'react-router-dom';
import PageTitle from '../PageTitle/PageTitle';

export default function Contacts() {
    return (
        <div className={styles.contacts}>
            <div className={styles.container}>
                <div className={styles.breadcrumbs}>
                    <Link to="/">Главная</Link>
                    <span>/</span>
                    <span>Контакты</span>
                </div>

                <PageTitle title="Контакты" />
                <h1 className={styles.title}>Контакты</h1>

                <div className={styles.contactsContent}>
                    <div className={styles.contactsInfo}>
                        <div className={styles.infoBlock}>
                            <h2>Наш адрес</h2>
                            <p>ООО «ГК ПРОММЕДЬ»
Ул. Кравченко дом 12 , офис 11</p>
                            <p>Время работы: Пн-Пт с 9:00 до 18:00</p>
                        </div>

                        <div className={styles.infoBlock}>
                            <h2>Телефоны</h2>
                            <a href="tel:+79999999999" className={styles.phone}>+7 (999) 999-99-99</a>
                            <p>Отдел продаж</p>
                            <a href="tel:+79999999998" className={styles.phone}>+7 (999) 999-99-98</a>
                            <p>Техническая поддержка</p>
                        </div>

                        <div className={styles.infoBlock}>
                            <h2>Email</h2>
                            <a href="mailto:info@example.com" className={styles.email}>info@example.com</a>
                            <p>Общие вопросы</p>
                            <a href="mailto:sales@example.com" className={styles.email}>sales@example.com</a>
                            <p>Отдел продаж</p>
                        </div>

                        <div className={styles.infoBlock}>
                            <h2>Реквизиты</h2>
                            <p>ООО "Компания"</p>
                            <p>ИНН: 1234567890</p>
                            <p>КПП: 123456789</p>
                            <p>ОГРН: 1234567890123</p>
                        </div>
                    </div>

                    <div className={styles.contactsForm}>
                        <h2>Напишите нам</h2>
                        <form className={styles.form}>
                            <div className={styles.formGroup}>
                                <input type="text" placeholder="Ваше имя" />
                            </div>
                            <div className={styles.formGroup}>
                                <input type="email" placeholder="Email" />
                            </div>
                            <div className={styles.formGroup}>
                                <input type="tel" placeholder="Телефон" />
                            </div>
                            <div className={styles.formGroup}>
                                <textarea placeholder="Сообщение" rows={5}></textarea>
                            </div>
                            <button type="submit" className={styles.submitButton}>Отправить</button>
                        </form>
                    </div>
                </div>

                <div className={styles.mapSection}>
                    <h2>Как нас найти</h2>
                    <div className={styles.map}>
                        {/* Здесь будет карта */}
                        <div className={styles.mapPlaceholder}>
                            Карта с расположением офиса
                        </div>
                    </div>
                </div>

                <div className={styles.deliveryInfo}>
                    <h2>Доставка</h2>
                    <div className={styles.deliveryBlocks}>
                        <div className={styles.deliveryBlock}>
                            <h3>Самовывоз</h3>
                            <p>Вы можете забрать товар самостоятельно с нашего склада по адресу:</p>
                            <p>г. Москва, ул. Складская, д. 456</p>
                            <p>Время работы склада: Пн-Пт с 9:00 до 18:00</p>
                        </div>
                        <div className={styles.deliveryBlock}>
                            <h3>Доставка по Москве</h3>
                            <p>Доставка осуществляется в течение 1-2 рабочих дней</p>
                            <p>Стоимость доставки зависит от веса заказа</p>
                        </div>
                        <div className={styles.deliveryBlock}>
                            <h3>Доставка по России</h3>
                            <p>Доставка осуществляется транспортными компаниями</p>
                            <p>Сроки и стоимость рассчитываются индивидуально</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 