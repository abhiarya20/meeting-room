import "swiper/css";
import "swiper/css/bundle";

import { A11y, Autoplay, EffectCards, EffectCoverflow, Keyboard, Mousewheel, Navigation, Pagination, Parallax, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { BsBank2 } from "react-icons/bs";
import { FaCity } from "react-icons/fa6";
import { FaHospital } from "react-icons/fa";
import { FaSchool } from "react-icons/fa6";
import { GiShop } from "react-icons/gi";
import IndustryCard from "./Industry-card/industry-card";
import { RiGovernmentFill } from "react-icons/ri";
import styles from "./industries.module.css";

const industries = [
	{
		title: "Education",
		description: "Teach online and empower students",
		icon: <FaSchool />,
		background: "#fff5f5",
		btnText: "Get Started",
	},
	{
		title: "Retail",
		description: "Improve sales with video shopping",
		icon: <GiShop />,
		background: "#fff9e6",
		btnText: "Join Now",
	},
	{
		title: "Banking",
		description: "Build better customer relationships",
		icon: <BsBank2 />,
		background: "#f3ffe6",
		btnText: "Start Today",
	},
	{
		title: "Government",
		description: "Improve inter-agency communication",
		icon: <RiGovernmentFill />,
		background: "#f0f9ff",
		btnText: "Try Now",
	},
	{
		title: "Healthcare",
		description: "Provide remote medical consultations",
		icon: <FaHospital />,
		background: "#f5fff5",
		btnText: "Get In",
	},
	{
		title: "IT Industries",
		description: "Enhance collaboration and boost productivity",
		icon: <FaCity />,
		background: "#ffbfbf",
		btnText: "Start Here",
	},
];

const Industries = () => {
	return (
		<section className={styles.industriesSection}>
			<div className={styles.industriesSectionHeading}>
				<div className={styles.industriesSectionTitle}>Connecting Teams Across Industries and Geographies for Enhanced Collaboration.</div>
				<div className={styles.industriesSectionSubtitle}>Our online meeting software is flexible enough to meet growing video conferencing needs across industries. Connect, collaborate, and empower your business to stand out in your industry with our secure web meeting software.</div>
			</div>
			<div className={styles.industriesCardSliderWrapper}>
				<Swiper
					modules={[Virtual, Keyboard, Navigation, Pagination, Parallax, A11y, Autoplay, EffectCoverflow, EffectCards, Mousewheel]}
					autoplay={{ pauseOnMouseEnter: true }}
					mousewheel={true}
					grabCursor={true}
					slidesPerView={3}
					breakpoints={{
						0: { slidesPerView: 1 },
						768: { slidesPerView: 2 },
						1200: { slidesPerView: 3 },
						1600: { slidesPerView: 4 },
					}}>
					{industries.map((industry, index) => (
						<SwiperSlide key={index} className={styles.industriesSwiperSlide}>
							<IndustryCard btnText={industry.btnText} title={industry.title} description={industry.description} icon={industry.icon} background={industry.background} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
};

export default Industries;
