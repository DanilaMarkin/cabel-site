import styles from './ProductPage.module.css';

interface DeliveryInfoProps {
    customInfo?: string;
}

export default function DeliveryInfo({ customInfo }: DeliveryInfoProps) {
    return (
        <div className={styles.deliveryInfo}>
            {customInfo ? (
                <p>{customInfo}</p>
            ) : (
                <>
                    <section>
                        <h3>Способы доставки</h3>
                        <ul className={styles.deliveryList}>
                            <li>
                                <strong>Курьерская доставка:</strong> 1-3 рабочих дня
                                <p className={styles.deliveryDetails}>
                                    Доставка до двери в удобное для вас время
                                </p>
                            </li>
                            <li>
                                <strong>Самовывоз из пунктов выдачи:</strong> 1-2 рабочих дня
                                <p className={styles.deliveryDetails}>
                                    Более 1000 пунктов выдачи по всей России
                                </p>
                            </li>
                            <li>
                                <strong>Почта России:</strong> 3-7 рабочих дней
                                <p className={styles.deliveryDetails}>
                                    Доставка в любой населенный пункт России
                                </p>
                            </li>
                            <li>
                                <strong>Транспортные компании:</strong> 2-5 рабочих дней
                                <p className={styles.deliveryDetails}>
                                    СДЭК, DPD, ПЭК и другие
                                </p>
                            </li>
                        </ul>
                    </section>
                    
                    <section>
                        <h3>Способы оплаты</h3>
                        <ul className={styles.paymentList}>
                            <li>
                                <strong>Наличными при получении</strong>
                                <p className={styles.paymentDetails}>
                                    Оплата курьеру или в пункте выдачи
                                </p>
                            </li>
                            <li>
                                <strong>Банковской картой онлайн</strong>
                                <p className={styles.paymentDetails}>
                                    Visa, MasterCard, МИР
                                </p>
                            </li>
                            <li>
                                <strong>Безналичный расчет (для юр. лиц)</strong>
                                <p className={styles.paymentDetails}>
                                    Выставление счета, оплата по реквизитам
                                </p>
                            </li>
                        </ul>
                    </section>
                    
                    <div className={styles.deliveryNote}>
                        <p>
                            <strong>Важно:</strong> стоимость доставки рассчитывается индивидуально в зависимости от:
                        </p>
                        <ul>
                            <li>Выбранного способа доставки</li>
                            <li>Региона доставки</li>
                            <li>Веса и габаритов заказа</li>
                        </ul>
                        <p>
                            Точную стоимость доставки вы можете узнать при оформлении заказа или у наших менеджеров.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
} 