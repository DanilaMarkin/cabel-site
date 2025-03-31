import styles from './Buyers.module.css';
import { Link } from 'react-router-dom';
import PageTitle from '../PageTitle/PageTitle';

export default function Buyers() {
    return (
        <div className={styles.buyers}>
            <div className={styles.container}>
                <div className={styles.breadcrumbs}>
                    <Link to="/">Главная</Link>
                    <span>/</span>
                    <span>Покупателям</span>
                </div>

                <PageTitle title="Информация для покупателей" />
                <h1 className={styles.title}>Информация для покупателей</h1>

                <div className={styles.buyersContent}>
                    <div className={styles.section}>
                        <h2>Как сделать заказ</h2>
                        <div className={styles.steps}>
                            <div className={styles.step}>
                                <div className={styles.stepNumber}>1</div>
                                <div className={styles.stepContent}>
                                    <h3>Выберите товар</h3>
                                    <p>Воспользуйтесь каталогом или поиском, чтобы найти нужный товар</p>
                                </div>
                            </div>
                            <div className={styles.step}>
                                <div className={styles.stepNumber}>2</div>
                                <div className={styles.stepContent}>
                                    <h3>Добавьте в корзину</h3>
                                    <p>Укажите необходимое количество и добавьте товар в корзину</p>
                                </div>
                            </div>
                            <div className={styles.step}>
                                <div className={styles.stepNumber}>3</div>
                                <div className={styles.stepContent}>
                                    <h3>Оформите заказ</h3>
                                    <p>Заполните форму заказа и выберите способ доставки</p>
                                </div>
                            </div>
                            <div className={styles.step}>
                                <div className={styles.stepNumber}>4</div>
                                <div className={styles.stepContent}>
                                    <h3>Получите товар</h3>
                                    <p>Дождитесь доставки или заберите заказ самостоятельно</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2>Способы оплаты</h2>
                        <div className={styles.paymentMethods}>
                            <div className={styles.paymentMethod}>
                                <h3>Банковской картой</h3>
                                <p>Visa, MasterCard, МИР</p>
                            </div>
                            <div className={styles.paymentMethod}>
                                <h3>Наличными</h3>
                                <p>При получении заказа</p>
                            </div>
                            <div className={styles.paymentMethod}>
                                <h3>Безналичный расчет</h3>
                                <p>Для юридических лиц</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2>Доставка</h2>
                        <div className={styles.deliveryInfo}>
                            <div className={styles.deliveryMethod}>
                                <h3>Самовывоз</h3>
                                <p>Бесплатно из нашего магазина</p>
                                <p>Срок: в день заказа</p>
                            </div>
                            <div className={styles.deliveryMethod}>
                                <h3>Курьерская доставка</h3>
                                <p>По Москве и области</p>
                                <p>Срок: 1-2 дня</p>
                            </div>
                            <div className={styles.deliveryMethod}>
                                <h3>Транспортные компании</h3>
                                <p>Доставка по всей России</p>
                                <p>Срок: 3-7 дней</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2>Гарантии и возврат</h2>
                        <div className={styles.guarantees}>
                            <div className={styles.guarantee}>
                                <h3>Гарантия качества</h3>
                                <p>На все товары действует гарантия производителя</p>
                                <p>Срок гарантии указан в карточке товара</p>
                            </div>
                            <div className={styles.guarantee}>
                                <h3>Проверка при получении</h3>
                                <p>Вы можете проверить товар при получении</p>
                                <p>В случае обнаружения брака - бесплатная замена</p>
                            </div>
                            <div className={styles.guarantee}>
                                <h3>Возврат товара</h3>
                                <p>В течение 14 дней без объяснения причин</p>
                                <p>При сохранении товарного вида и комплектации</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2>Часто задаваемые вопросы</h2>
                        <div className={styles.faq}>
                            <div className={styles.faqItem}>
                                <h3>Как узнать статус заказа?</h3>
                                <p>Статус заказа можно отслеживать в личном кабинете или уточнить у менеджера по телефону</p>
                            </div>
                            <div className={styles.faqItem}>
                                <h3>Можно ли изменить заказ?</h3>
                                <p>Да, вы можете изменить заказ до момента его передачи в доставку</p>
                            </div>
                            <div className={styles.faqItem}>
                                <h3>Как оформить возврат?</h3>
                                <p>Заполните заявление на возврат в личном кабинете или обратитесь к менеджеру</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 