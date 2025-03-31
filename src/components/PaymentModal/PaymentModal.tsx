import { useState } from 'react';
import styles from './PaymentModal.module.css';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    totalAmount: number;
}

type PaymentMethod = 'sbp' | 'card';
type Bank = 'sber' | 'alfa' | 'tinkoff' | 'vtb' ;

interface CardData {
    number: string;
    expiry: string;
    cvc: string;
    name: string;
}

const banks = [
    { id: 'sber', name: 'Сбербанк', logo: '/img/banks/sber.svg' },
    { id: 'alfa', name: 'Альфа-Банк', logo: '/img/banks/alfa.svg' },
    { id: 'tinkoff', name: 'Тинькофф', logo: '/img/banks/tinkoff.svg' },
    { id: 'vtb', name: 'ВТБ', logo: '/img/banks/vtb.svg' },

];

export default function PaymentModal({ isOpen, onClose, totalAmount }: PaymentModalProps) {
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('sbp');
    const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
    const [cardData, setCardData] = useState<CardData>({
        number: '',
        expiry: '',
        cvc: '',
        name: ''
    });

    const handlePaymentSelect = (method: PaymentMethod) => {
        setSelectedMethod(method);
        if (method === 'card') {
            setSelectedBank(null);
        }
    };

    const handleBankSelect = (bankId: Bank) => {
        setSelectedBank(bankId);
        // Здесь можно добавить логику для перехода к оплате в выбранном банке
        console.log(`Переход к оплате в банке: ${bankId}`);
    };

    const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let formattedValue = value;

        // Форматирование номера карты
        if (name === 'number') {
            formattedValue = value
                .replace(/\D/g, '')
                .replace(/(\d{4})/g, '$1 ')
                .trim()
                .slice(0, 19);
        }

        // Форматирование срока действия
        if (name === 'expiry') {
            formattedValue = value
                .replace(/\D/g, '')
                .replace(/^(\d{2})/, '$1/')
                .slice(0, 5);
        }

        // Форматирование CVC
        if (name === 'cvc') {
            formattedValue = value.replace(/\D/g, '').slice(0, 3);
        }

        setCardData(prev => ({
            ...prev,
            [name]: formattedValue
        }));
    };

    const isCardDataValid = () => {
        if (selectedMethod !== 'card') return true;
        return (
            cardData.number.replace(/\s/g, '').length === 16 &&
            cardData.expiry.length === 5 &&
            cardData.cvc.length === 3 &&
            cardData.name.length > 0
        );
    };

    const handleSubmit = () => {
        if (!selectedMethod || (selectedMethod === 'card' && !isCardDataValid())) return;
        
        // Здесь будет логика обработки оплаты
        setTimeout(() => {
            onClose();
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                
                <h2>Оплата заказа</h2>
                <div className={styles.amount}>
                    <span>Сумма к оплате:</span>
                    <strong>{totalAmount.toFixed(2)} ₽</strong>
                </div>

                <div className={styles.paymentMethods}>
                    <div 
                        className={`${styles.paymentMethod} ${selectedMethod === 'sbp' ? styles.selected : ''}`}
                        onClick={() => handlePaymentSelect('sbp')}
                    >
                        <div className={styles.methodIcon}>
                            <img src="/img/7.png" alt="СБП" />
                        </div>
                        <div className={styles.methodInfo}>
                            <h3>Система быстрых платежей</h3>
                            <p>Быстрый перевод через СБП</p>
                        </div>
                    </div>

                    <div 
                        className={`${styles.paymentMethod} ${selectedMethod === 'card' ? styles.selected : ''}`}
                        onClick={() => handlePaymentSelect('card')}
                    >
                        <div className={styles.methodIcon}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                                <path d="M2 10H22" stroke="currentColor" strokeWidth="2"/>
                                <path d="M6 15H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <div className={styles.methodInfo}>
                            <h3>Банковская карта</h3>
                            <p>Visa, Mastercard, МИР</p>
                        </div>
                    </div>
                </div>

                {selectedMethod === 'sbp' && (
                    <div className={styles.banksList}>
                        {banks.map(bank => (
                            <div
                                key={bank.id}
                                className={`${styles.bankOption} ${selectedBank === bank.id ? styles.selected : ''}`}
                                onClick={() => handleBankSelect(bank.id as Bank)}
                            >
                                <div className={styles.bankLogo}>
                                    <img src={bank.logo} alt={bank.name} />
                                </div>
                                <span className={styles.bankName}>{bank.name}</span>
                            </div>
                        ))}
                    </div>
                )}

                {selectedMethod === 'card' && (
                    <div className={styles.cardForm}>
                        <div className={styles.formGroup}>
                            <label>Номер карты</label>
                            <input
                                type="text"
                                name="number"
                                value={cardData.number}
                                onChange={handleCardInputChange}
                                placeholder="0000 0000 0000 0000"
                                maxLength={19}
                            />
                        </div>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Срок действия</label>
                                <input
                                    type="text"
                                    name="expiry"
                                    value={cardData.expiry}
                                    onChange={handleCardInputChange}
                                    placeholder="ММ/ГГ"
                                    maxLength={5}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>CVC</label>
                                <input
                                    type="password"
                                    name="cvc"
                                    value={cardData.cvc}
                                    onChange={handleCardInputChange}
                                    placeholder="***"
                                    maxLength={3}
                                />
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Имя держателя карты</label>
                            <input
                                type="text"
                                name="name"
                                value={cardData.name}
                                onChange={handleCardInputChange}
                                placeholder="IVAN IVANOV"
                                style={{ textTransform: 'uppercase' }}
                            />
                        </div>
                    </div>
                )}

                <button 
                    className={styles.submitButton}
                    disabled={selectedMethod === 'card' ? !isCardDataValid() : !selectedBank}
                    onClick={handleSubmit}
                >
                    Оплатить
                </button>
            </div>
        </div>
    );
} 