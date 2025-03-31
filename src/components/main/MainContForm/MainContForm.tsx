import { useState } from 'react';
import teleg from "/img/teleg.png";
import whats from "/img/whats.png";
import "./MainContForm.css";
import Modal from '../../Modal/Modal';

export default function MainContForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь можно добавить логику отправки данных формы
    setIsModalOpen(true);
    setFormData({
      name: '',
      phone: '',
      email: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const data = {
    adress: {
      label: "Адрес",
      text: "ООО «ГК ПРОММЕДЬ»\nУл. Кравченко, дом 12, офис 11",
    },
    email: {
      label: "Email",
      text: "prommedi@mail.ru",
    },
    telephone: {
      label: "Телефон",
      text: "+7 (968) 462-73-64",
    },
  };

  return (
    <>
      <div className="main-container">
        <div className="contact-wrapper">
          {/* Левая часть */}
          <div className="contact-info">
            <h2 className="contact-title">КОНТАКТЫ</h2>
            <div className="contact-details">
              {Object.values(data).map((e, index) => (
                <div className="contact-item" key={index}>
                  <h3 className="contact-label">{e.label}</h3>
                  <span className="contact-text">{e.text}</span>
                </div>
              ))}
              <div className="contact-icons">
                <a href="https://wa.me/79684627364" target='_blank'>
                  <img src={whats} alt="WhatsApp" />
                </a>
              </div>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2 className="form-title">
              Остались вопросы? Оставьте заявку и мы свяжемся с Вами
            </h2>
            <div className="form-input-group">
              <input
                type="text"
                placeholder="Имя"
                className="form-input"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                placeholder="+7 (000) 000-00-00"
                className="form-input"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <textarea
              name="message"
              placeholder="Ваш вопрос"
              className="form-textarea"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <div className="form-footer">
              <button type="submit" className="form-button">Отправить</button>
              <span className="form-note">
                *Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности
              </span>
            </div>
          </form>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Спасибо за обращение!"
        message="Мы получили вашу заявку и свяжемся с вами в ближайшее время."
      />
    </>
  );
}
