"use client";

import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

import { FaPeopleGroup } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa";
import { IoRecording } from "react-icons/io5";
import styles from "./platform-section.module.css";
import { useInView } from "react-intersection-observer";

const Platform = () => {
	const cardItemsRef = useRef([]);
	const [activeTab, setActiveTab] = useState(0);

	const tabs = ["Meetings", "Calls", "Webinars", "Rooms"];

	const onTabClick = (index) => {
		if (cardItemsRef.current.length > index) cardItemsRef.current[index].scrollIntoView({ behavior: "smooth", block: index < tabs.length - 1 ? "center" : "nearest" });
	};

	const content = [
		{
			title: "Meetings",
			icons: [<FaVideo />, <IoRecording />, <FaPeopleGroup />],
			texts: ["Collaborate in video meetings", "Record and share web meetings", "Conduct department-specific meetings"],
			descriptions: ["Connect with your hybrid workforce through seamless audio conferencing and video conferencing to convey ideas better and build trust. Effectively collaborate with the meeting participants using screen sharing, whiteboards, and file sharing.", "Record, replay, and share your web meeting recordings with your team members who couldn’t make it to your meeting. Also, download your online meetings' and webinars' recordings for offline use.", "Manage multiple teams as different departments and host secure web conferencing sessions on our virtual meeting software. Add members to their relevant departments, assign specific roles, and schedule department-only meetings."],
		},
		{
			title: "Calls",
			icons: [<FaVideo />, <IoRecording />, <FaPeopleGroup />],
			texts: ["Get personalized business phone numbers", "Keep track of phone calls and SMS", "Customize numbers and configure calls"],
			descriptions: ["Connect with local and international clients in an instant via business phone calls and SMS using unique business phone numbers. Initiate quick calls with your team using extensions without having to switch between different apps.", "Monitor and analyze all of your cloud-based business phone communication from one place to gain better insights. Get essential stats on individual phone numbers, including call load and total calls for each country.", "Assign a unique name for each number, set a default voice and language, and configure inbound and outbound calls. You can customize the type of answering mode by choosing queue, Interactive Voice Response (IVR), or call forwarding."],
		},
		{
			title: "Webinars",
			icons: [<FaVideo />, <IoRecording />, <FaPeopleGroup />],
			texts: ["Broadcast video webinars", "Customize the attendee experience", "Live stream sessions"],
			descriptions: ["Host live video webinars and share multiple video feeds with your audience as you present. Share your screen and connect with the attendees by launching real-time polls and answering questions in Q&A sessions.", "Customize registration forms, webinar emails, and moderate attendees from our video meeting software. Persuade attendees to take action by directing them to any web page you want after a webinar.", "Reach a larger audience by YouTube livestreaming your business webinars and training sessions from our web meeting software. Respond to YouTube comments and questions in real time for maximum reach."],
		},
		{
			title: "Rooms",
			icons: [<FaVideo />, <IoRecording />, <FaPeopleGroup />],
			texts: ["Transform your physical meeting spaces", "Associate available meeting rooms", "Go hands-free during team meetings"],
			descriptions: ["Turn your physical conference rooms into powerful hubs of connectivity and collaboration. Brainstorm and work together with your team in virtual meeting rooms using just a display and controller.", "Create and manage multiple meeting rooms on your Zoho Meeting account, and connect those with the rooms controller instantly. Quickly associate an available room while scheduling your online meetings.", "Connect with ease and avoid the hassle of carrying around your laptops to conference rooms all day long. Launch scheduled meetings, utilize audio and video capabilities, and even invite participants directly from the controller."],
		},
	];

	const cardLength = content.length;

	return (
		<div className={styles.platformWrapper}>
			<div className={styles.contentWrapper}>
				<div className={styles.plateformHeadingWrapper}>
					<div className={styles.plateformHeadingInnerWrapper}>
						<h2 className={styles.plateformHeading}>Unified platform for</h2>
						<div className={styles.stickyOptionsWrapper}>
							<div className={styles.stickyOptions}>
								{tabs.map((tab, index) => (
									<div key={tab}>
										<TabItem key={index} isActive={activeTab === index} label={tab} onClick={() => onTabClick(index)} />
										{index < cardLength - 1 && <span></span>}
									</div>
								))}
							</div>
						</div>
					</div>{" "}
				</div>

				<div className={styles.plateformSection}>
					<div className={`${styles.platerfromSectionLeft}`}>
						<div className={styles.stickyCard}>
							<ImageSection alt='Zoho Webinar' className={styles.plateformMainImage} src='/assets/person.jpeg' />
							<div className={styles.plateformImagesWrapper}>
								<ImageSection alt='Meeting 1' className={`${styles.plateformSingleImage} ${styles.meeting1} ${activeTab === 0 && styles.activeMeeting1}`} src='assets/meeting1.png' />
								<ImageSection alt='Meeting 2' className={`${styles.plateformSingleImage} ${styles.meeting2} ${activeTab === 0 && styles.activeMeeting2}`} src='/assets/meeting2.png' />
								<ImageSection alt='Rooms 1' className={`${styles.plateformSingleImage} ${styles.room1} ${activeTab === 3 && styles.activeRoom1}`} src='/assets/rooms1.png' />
								<ImageSection alt='Rooms 2' className={`${styles.plateformSingleImage} ${styles.room2} ${activeTab === 3 && styles.activeRoom2}`} src='/assets/rooms2.png' />
								<ImageSection alt='Webinar 1' className={`${styles.plateformSingleImage} ${styles.webinar1} ${activeTab === 2 && styles.activeWebinar1}`} src='/assets/webinar1.png' />
								<ImageSection alt='Webinar 2' className={`${styles.plateformSingleImage} ${styles.webinar2} ${activeTab === 2 && styles.activeWebinar2}`} src='/assets/webinar2.png' />
								<ImageSection alt='Calls' className={`${styles.plateformSingleImage} ${styles.calls} ${activeTab === 1 && styles.activeCalls}`} src='/assets/calls.png' />
							</div>
						</div>
					</div>
					<div className={styles.plateformSectionRight}>
						<div className={styles.plateformTextSection}>
							<div className={styles.plateFromTextSubSection}>
								<ul>
									{content.map((item, tabIdx) => (
										<li key={item.title} ref={(el) => (cardItemsRef.current[tabIdx] = el)}>
											<CardList activeTab={activeTab} setActiveTab={setActiveTab} key={item.title} item={item} tabIdx={tabIdx} />
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Platform;

const CardList = ({ activeTab, setActiveTab, item, tabIdx }) => {
	const { ref, inView } = useInView({
		threshold: 1,
		delay: 100,
		trackVisibility: true,
	});

	useEffect(() => {
		if (inView) {
			setActiveTab(tabIdx);
		}
	}, [inView]);

	return (
		<div ref={ref} style={{ display: "flex", flexDirection: "column" }}>
			<h2 style={{ marginTop: tabIdx !== 0 ? "2rem" : 0 }} className={styles.nonStickyOptions} id={"#" + item.title}>
				{item.title}
			</h2>
			<ul style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
				{item.icons.map((icon, index) => (
					<CardItem key={index} isActive={activeTab === tabIdx} icon={icon} title={item.texts[index]} description={item.descriptions[index]} />
				))}
			</ul>
		</div>
	);
};

const TabItem = ({ isActive, label, onClick }) => (
	<p className={isActive ? styles.activeTab : ""} onClick={onClick}>
		{label}
	</p>
);

const ImageSection = ({ src, alt, className }) => <img alt={alt} className={className} height='670' data-lazy='true' src={src} width='440' />;

const CardItem = ({ isActive, icon, title, description }) => (
	<li>
		<div className={`${styles.subSectionCardHeadingWrapper} ${!isActive && styles.subSectionCardHeadingWrapperDissabled}`}>
			<span>{icon}</span>
			<h4>{title}</h4>
		</div>
		<p className={`${styles.subSectionCardHeadingText} ${!isActive && styles.subSectionCardHeadingTextDissabled}`}>{description}</p>
	</li>
);
