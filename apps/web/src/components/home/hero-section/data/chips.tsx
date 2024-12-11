import { MdChat, MdVideoCameraFront } from "react-icons/md";

import { BiSolidChalkboard } from "react-icons/bi";
import { ReactNode } from "react";

type ChipsType = {
	label: string,
	icon: ReactNode
}

export const chips:ChipsType[] = [
	{ label: "Video", icon: <MdVideoCameraFront /> },
	{ label: "Chat", icon: <MdChat /> },
	{ label: "Whiteboard", icon: <BiSolidChalkboard /> },
];