import CopyrightFooter from "../../components/shared/copywright-footer/copywright-footer";
import FeatureSection from "../../components/home/feature-section/feature-section";
import FeatureSectionContextProvider from "../../context/feature-section";
import HeroSection from "../../components/home/hero-section/hero-section";
import Industries from "../../components/home/industries/industries";
import Navbar from "../../components/shared/navbar/navbar";
import Platform from "../../components/home/platform-section/platform-section";

const Home = () => {
	return (
		<div>
			<Navbar withLoginButton={true} />
			<HeroSection />
		
			<FeatureSectionContextProvider>
				<FeatureSection />
			</FeatureSectionContextProvider>
			<Platform />
			<Industries />
			<CopyrightFooter />
		</div>
	);
};

export default Home;
