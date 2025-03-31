import vector from "/img/Advantages/Vector.png"
import achiv from "/img/Advantages/achiv.png"
import delivery from "/img/Advantages/delivery.png"
import doggovor from "/img/Advantages/doggovor.png"
import time from "/img/Advantages/time.png"
import styles from "./Advantages.module.css";
interface ActionsProps {
	imagesrc: string;
	label: string;
}
export default function Advantages(){
	const advantagesList = [
		{ imagesrc: vector, label: "В наличии 10 000+ позиций" },
		{ imagesrc: time, label: "Отправка от 1 дня" },
		{ imagesrc: achiv, label: "Гарантия качества" },
		{ imagesrc: delivery, label: "Доставка по России в срок" },
		{ imagesrc: doggovor, label: "Работаем по договору" },
	 ];
	 
	function Adv({imagesrc,label}:ActionsProps){
		return (
			<div className={styles.productContainer}>
			  <img className={styles.productImage} src={imagesrc} alt="" />
			  <span className={styles.productLabel}>{label}</span>
			</div>
		 );
	}
	return(
		<div style={{marginBottom:80}}>
			<div className={styles.productCards}>
				{advantagesList.map((adv, index) => (
			<Adv key={index} imagesrc={adv.imagesrc} label={adv.label} />
				))}
			</div>
			<h2 style={{margin:"30px auto",display:"block",fontSize:25,fontWeight:"bold",lineHeight:"130%",textAlign:"center", }}>500+ компаний по всей РФ уже работают с нами</h2>
		</div>
	)
}
