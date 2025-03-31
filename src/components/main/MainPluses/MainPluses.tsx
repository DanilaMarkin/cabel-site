import Okey from "/img/Okey.png";
import "./MainPluses.css";

interface Props {
  label: string;
  text: string;
}

function Card({ label, text }: Props) {
  return (
    <div className="card">
      <img src={Okey} className="card-icon" alt="" />
      <div className="card-content">
        <h2 className="card-title">{label}</h2>
        <span className="card-text">{text}</span>
      </div>
    </div>
  );
}

export default function MainPluses() {
  return (
    <div className="main-pluses">
      <div className="pluses-wrapper">
        <h2 className="pluses-title">Почему стоит выбрать нас</h2>
        <div className="pluses-grid">
          <Card label="Надежность" text="сертифицированное качество" />
          <Card label="Скорость" text="доставка в срок" />
          <Card label="Поддержка" text="круглосуточная техническая поддержка" />
          <Card label="Индивидуальный подход" text="производство по вашим запросам" />
        </div>
      </div>
    </div>
  );
}
