import "swiper/css";
import "swiper/css/bundle";

import { Autoplay, EffectCreative } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { forwardRef, useImperativeHandle, useRef } from "react";

import Button from "../../shared/button/button";
import { FaArrowRight } from "react-icons/fa";
import PaginationDots from "../../shared/pagination-dots/pagination-dots";
import styles from "./feature-card.module.css";
import { useNavigate } from "react-router-dom";

const allDetails = [
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

const FeatureCard = forwardRef(({ activeIndex, setActiveIndex }, ref) => {
	const swiperRef = useRef(null);

	const changeSlider = (index) => {
		swiperRef.current?.slideTo(index, 1000);
		setActiveIndex(index);
	};

	useImperativeHandle(ref, () => ({
		changeSlider,
	}));

	const progressCircle = useRef(null);
	const progressContent = useRef(null);
	const onAutoplayTimeLeft = (s, time, progress) => {
		progressCircle.current.style.setProperty("--progress", 1 - progress);
		progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
	};

	return (
		<div className={styles.featureCardWrapper}>
			<Swiper
				modules={[EffectCreative, Autoplay]}
				onSwiper={(swiper) => (swiperRef.current = swiper)}
				onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
				className={styles.featureCardSwiper}
				spaceBetween={0}
				slidesPerView={1}
				initialSlide={0}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				onAutoplayTimeLeft={onAutoplayTimeLeft}
				enabled={true}>
				<SwiperSlide className={styles.heroSectionRightSwipperSlide}>
					<SingleFeatureCard title={allDetails[0].title} message={allDetails[1].message} description={allDetails[0].description} image={allDetails[0].image} setActiveIndex={setActiveIndex} />
				</SwiperSlide>
				<SwiperSlide className={styles.heroSectionRightSwipperSlide}>
					<SingleFeatureCard title={allDetails[1].title} message={allDetails[2].message} description={allDetails[1].description} image={allDetails[1].image} setActiveIndex={setActiveIndex} />
				</SwiperSlide>
				<SwiperSlide className={styles.heroSectionRightSwipperSlide}>
					<SingleFeatureCard title={allDetails[2].title} message={allDetails[2].message} description={allDetails[2].description} image={allDetails[2].image} setActiveIndex={setActiveIndex} />
				</SwiperSlide>
				<SwiperSlide className={styles.heroSectionRightSwipperSlide}>
					<SingleFeatureCard title={allDetails[3].title} message={allDetails[3].message} description={allDetails[3].description} image={allDetails[3].image} setActiveIndex={setActiveIndex} />
				</SwiperSlide>
				<SwiperSlide className={styles.heroSectionRightSwipperSlide}>
					<SingleFeatureCard title={allDetails[4].title} message={allDetails[4].message} description={allDetails[4].description} image={allDetails[4].image} setActiveIndex={setActiveIndex} />
				</SwiperSlide>
				<SwiperSlide className={styles.heroSectionRightSwipperSlide}>
					<SingleFeatureCard title={allDetails[5].title} message={allDetails[5].message} description={allDetails[5].description} image={allDetails[5].image} setActiveIndex={setActiveIndex} />
				</SwiperSlide>
				<SwiperSlide className={styles.heroSectionRightSwipperSlide}>
					<SingleFeatureCard title={allDetails[6].title} message={allDetails[6].message} description={allDetails[6].description} image={allDetails[6].image} setActiveIndex={setActiveIndex} />
				</SwiperSlide>

				<div className={styles.autoplayProgress} slot='container-end'>
					<svg viewBox='0 0 48 48' ref={progressCircle}>
						<circle cx='24' cy='24' r='20'></circle>
					</svg>
					<span ref={progressContent}></span>
				</div>
			</Swiper>
			<div className={styles.customPaginationWrapper}>
				<PaginationDots count={7} activeIndex={activeIndex} onClick={(index) => changeSlider(index)} />
			</div>
		</div>
	);
});

export default FeatureCard;

export const SingleFeatureCard = ({ title, message, description, image, isVertical = false }) => {
	const navigate = useNavigate();
	return (
		<div className={`${styles.featureCard} ${isVertical && styles.vfeatureCard}`}>
			<div className={`${styles.featureCardLeft} ${isVertical && styles.vfeatureCardLeft}`}>
				<div className={styles.content}>
					<div className={styles.featureDetailsWrapper}>
						{title && (
							<div className={styles.titleWrapper}>
								<p className={styles.title}>{title}</p>
							</div>
						)}
						{message && <span className={styles.message}>{message}</span>}
						{description && (
							<div className={styles.descriptionWrapper}>
								<p className={`${styles.description} ${isVertical && styles.vdescription}`}>{description}</p>
							</div>
						)}
						<div className={styles.buttonWrapper}>
							<Button
								onClick={() => {
									navigate("/authenticate");
								}}
								className={styles.buttonExtention}>
								<span>{"Experience Now"}</span>
								<FaArrowRight />
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div className={`${styles.featureCardRight} ${isVertical && styles.vfeatureCardRight}`}>
				<img src={image} alt={"Meetings"} className={`${styles.featureCardImg} ${styles.vfeatureCardImg}`} />
			</div>
		</div>
	);
};
