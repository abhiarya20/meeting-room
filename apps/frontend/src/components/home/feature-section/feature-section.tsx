import "swiper/css";
import "swiper/css/bundle";

import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import FeatureCard, { SingleFeatureCard } from "./feature-card";
import { Navigation, Pagination } from "swiper/modules";
import { ReactNode, useContext, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { FeatureSectionContext } from "../../../context/feature-section";
import { FreeMode } from "swiper/modules";
import styles from "./feature-section.module.css";

type AllDetailsType = {
	title: string;
	message: string;
	description: string;
	image: string;
};

const allDetails: AllDetailsType[] = [
	{
		title: "Meetings",
		message: "Oops! Something went wrong",
		description: "It looks like something didn't go as planned. Please try again in a moment,  We are fixing this issue very soon.",
		image: "/assets/Calling.avif",
	},
	{
		title: "Meetings",
		message: "Oops! Something went wrong",
		description: "It looks like something didn't go as planned. Please try again in a moment,  We are fixing this issue very soon.",
		image: "/assets/Events.avif",
	},
	{
		title: "Meetings",
		message: "Oops! Something went wrong",
		description: "It looks like something didn't go as planned. Please try again in a moment,  We are fixing this issue very soon.",
		image: "/assets/Meetings.avif",
	},
	{
		title: "Meetings",
		message: "Oops! Something went wrong",
		description: "It looks like something didn't go as planned. Please try again in a moment,  We are fixing this issue very soon.",
		image: "/assets/Calling.avif",
	},
	{
		title: "Meetings",
		message: "Oops! Something went wrong",
		description: "It looks like something didn't go as planned. Please try again in a moment,  We are fixing this issue very soon.",
		image: "/assets/Calling.avif",
	},
];

const FeatureSection = () => {
	const { activeOneTab } = useContext(FeatureSectionContext);
	return (
		<section className={styles.featuresWrapper}>
			<TabList />

			{activeOneTab === 0 && <SubTabList />}
			{activeOneTab === 1 && (
				<div className={styles.verticalFeatureCard}>
					<SingleFeatureCard isVertical message={allDetails[0].message} description={allDetails[0].description} image={allDetails[0].image} />
					<SingleFeatureCard isVertical message={allDetails[0].message} description={allDetails[0].description} image={allDetails[0].image} />
				</div>
			)}
			{activeOneTab === 2 && (
				<div className={styles.verticalFeatureCard}>
					<SingleFeatureCard isVertical message={allDetails[0].message} description={allDetails[0].description} image={allDetails[0].image} />
					<SingleFeatureCard isVertical message={allDetails[0].message} description={allDetails[0].description} image={allDetails[0].image} />
				</div>
			)}
		</section>
	);
};

const TabList = () => {
	const { activeOneTab, setActiveOneTab } = useContext(FeatureSectionContext);

	const tabs = ["Hybrid Work", "Experience", "Workspaces"];
	return (
		<div className={styles.hybridTabWrapper}>
			<div className={styles.tabsWrapper}>
				{tabs.map((tab, index) => (
					<Tab key={"desktop" + tab} index={index}>
						{tab}
					</Tab>
				))}
			</div>

			<div className={styles.optionSwiper}>
				<Swiper
					modules={[Navigation, Pagination]}
					slidesPerView={1}
					navigation={{
						enabled: true,
						nextEl: styles.customButtonNext,
						prevEl: styles.customButtonPrev,
					}}
					onTouchEnd={(swiper) => {
						console.log(swiper);
						if (swiper.swipeDirection === "next") {
							setActiveOneTab(swiper.activeIndex);
						} else if (swiper.swipeDirection === "prev") {
							setActiveOneTab(swiper.activeIndex);
						}
					}}
					initialSlide={activeOneTab}
					enabled={true}>
					{tabs.map((tab, index) => (
						<SwiperSlide key={"phone" + tab}>
							<Tab index={index}>{tab}</Tab>
						</SwiperSlide>
					))}
					<NavigationButtons />
				</Swiper>
			</div>
		</div>
	);
};

const Tab = ({ index, children }: { index: number; children: ReactNode }) => {
	const { activeOneTab, setActiveOneTab } = useContext(FeatureSectionContext);
	return (
		<div className={`${styles.oneTab} ${activeOneTab === index ? styles.activeOneTab : ""}`} onClick={() => setActiveOneTab(index)}>
			{children}
		</div>
	);
};

const SubTabList = () => {
	const swiperRef = useRef(null);
	const [activeIndex, setActiveIndex] = useState(0);

	const changeSlider = (index) => {
		swiperRef.current?.changeSlider(index);
	};

	return (
		<>
			<ul className={styles.subTabsWrapper}>
				<Swiper modules={[FreeMode]} spaceBetween={0} longSwipes={false} centeredSlides={true} centeredSlidesBounds={true} centerInsufficientSlides={true}>
					{["Calling", "Meetings", "Webinars", "Events", "Whiteboard", "Chats", "Recording"].map((subTab, index) => (
						<SwiperSlide className={styles.featureSwiperSlider} key={subTab}>
							<SubTab isActive={activeIndex === index} onClick={() => changeSlider(index)}>
								{subTab}
							</SubTab>
						</SwiperSlide>
					))}
				</Swiper>
			</ul>
			<FeatureCard activeIndex={activeIndex} setActiveIndex={setActiveIndex} ref={swiperRef} />
		</>
	);
};

const SubTab = ({ isActive, onClick, children }) => (
	<li className={`${styles.oneSubTabs} ${isActive ? styles.oneSubTabsActive : ""}`} onClick={onClick}>
		{children}
	</li>
);

const NavigationButtons = () => (
	<>
		<span className={styles.customButtonPrev}>
			<FaArrowAltCircleLeft />
		</span>
		<span className={styles.customButtonNext}>
			<FaArrowAltCircleRight />
		</span>
	</>
);

export default FeatureSection;
