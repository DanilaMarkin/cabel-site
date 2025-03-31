import AppPresentation from './main/AppPresentation/AppPresentatio.tsx'
import Advantages from './main/Advantages/Advantages.tsx'
import AppCables from './main/AppCables/AppCables.tsx'
import Appelectric from './main/Appelectric/Appelectric.tsx'
import AppAssec from './main/AppAssec/AppAssec.tsx'
import MainFind from './main/MainFind/MainFind.tsx'
import MainPluses from './main/MainPluses/MainPluses.tsx'
import MainDelyvery from './main/MainDelyvery/MainDelyvery.tsx'
import MainContForm from './main/MainContForm/MainContForm.tsx'
import PageTitle from './PageTitle/PageTitle.tsx'
import SEO from './SEO/SEO'

export default function Main(){
	return(
		<>
			<SEO 
				title="Главная" 
				description="КабельОпт - ведущий поставщик кабельной продукции. Широкий ассортимент кабелей, проводов и электротехнических товаров по выгодным ценам с доставкой по всей России."
				keywords="кабель, провод, электротехника, кабельная продукция, оптовые поставки, розничные продажи"
			/>
			<PageTitle title="Главная" />
			<AppPresentation />
			<Advantages />
			<AppCables />
			<Appelectric />
			<AppAssec />
			<MainFind />
			<MainPluses />
			<MainDelyvery />
			<MainContForm />
		</>
	)
}