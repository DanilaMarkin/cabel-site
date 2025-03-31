import { Link } from "react-router-dom"
import styles from "./AppPresentation.module.css"
export default function AppPresentatio(){
	return(
		<div className={styles.presentation}>
			<div className={styles.presentation_container}>
				<div className={styles.presentation_content}>
					<div className={styles.presentation_text}>
						<div className={styles.presentation_title} >
							<h2>Быстрые поставки <br /> кабеля по России</h2>
						</div>
						<div className={styles.presentation_adv}>
							<span>Сертифицированные кабели с гарантией качества</span>
							<span>Широкий ассортимент для строительства  и промышленности</span>
							<span>Качество, подтверждённое ГОСТ</span>
						</div>
						<div className={styles.presentation_button}>
							<Link to="/catalog"><button>Узнать цену</button></Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}