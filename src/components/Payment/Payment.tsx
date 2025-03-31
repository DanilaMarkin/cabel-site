import styles from './Payment.module.css';
import image from '/img/payment/image.png'
import image1 from '/img/payment/image1.png'
import image2 from '/img/payment/image2.png'
import image3 from '/img/payment/image3.png'
import image4 from '/img/payment/image4.png'
import image5 from '/img/payment/image5.png'
import PageTitle from '../PageTitle/PageTitle';

export default function Payment() {
    return (
        <div className={styles.payment}>
            <PageTitle title="Оплата" />
            <div className={styles.container}>
                <div className={styles.breadcrumbs}>
                    <span>Главная</span> / <span>Оплата</span>
                </div>
                
                <h1 className={styles.title}>Оплата</h1>
                
                <div className={styles.paymentContent}>
                    <p className={styles.description}>
                        Для оплаты вы можете воспользоваться одним из предложенных способов:
                    </p>
                    
                    <ul className={styles.paymentMethods}>
                        <li>
                            <h3>Банковская карта</h3>
                            <p>Выберите предпочитаемый способ оплаты и введите данные вашей карты. Обратите внимание, что при оформлении заказа может потребоваться ввести данные карты повторно.</p>
                        </li>
                        <li>
                            <h3>Электронные деньги</h3>
                            <p>Выберите способ оплаты электронными деньгами и следуйте инструкциям на экране.</p>
                        </li>
                        <li>
                            <h3>Банковский перевод</h3>
                            <p>Вы можете произвести оплату через ваш банк. Для этого вам потребуется указать реквизиты для перевода средств.</p>
                        </li>
                        <li>
                            <h3>Наличные при самовывозе</h3>
                            <p>Если вы собираетесь забрать товар самостоятельно, вы можете оплатить его наличными при получении.</p>
                        </li>
                    </ul>

                    <div className={styles.legalPayment}>
                        <h2>Оплата для юридических лиц</h2>
                        <ul>
                            <li>
                                <h3>Расчётный счёт</h3>
                                <p>Выберите предпочитаемый способ оплаты и укажите реквизиты вашей организации. Обратите внимание, что при оформлении заказа может потребоваться ввести реквизиты повторно.</p>
                            </li>
                            <li>
                                <h3>Электронные деньги</h3>
                                <p>Выберите способ оплаты электронными деньгами и следуйте инструкциям на экране.</p>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.paymentSystems}>
                        <h2>МЫ ПРИНИМАЕМ К ОПЛАТЕ</h2>
                        <div className={styles.paymentIcons}>
                            <div className={styles.paymentIcon}><img src={image} alt="" /></div>
                            <div className={styles.paymentIcon}><img src={image1} alt="" /></div>
                            <div className={styles.paymentIcon}><img src={image2} alt="" /></div>
                            <div className={styles.paymentIcon}><img src={image3} alt="" /></div>
                            <div className={styles.paymentIcon}><img src={image4} alt="" /></div>
                            <div className={styles.paymentIcon}><img src={image5} alt="" /></div>
                        </div>
                    </div>

                    <p className={styles.note}>
                        Обратите внимание, что некоторые способы оплаты могут быть недоступны в зависимости от вашего местоположения и других факторов. Пожалуйста, убедитесь, что выбранный вами способ оплаты поддерживается на нашем сайте.
                    </p>
                    
                    <p className={styles.support}>
                        Если у вас возникнут вопросы или проблемы с оплатой, пожалуйста, свяжитесь с нашей службой поддержки.
                    </p>
                </div>
            </div>
        </div>
    );
} 