export const avatarStyles = ["adventurer", "adventurer-neutral", "avataaars", "avataaars-neutral", "big-ears", "big-ears-neutral", "big-smile", "bottts", "bottts-neutral", "croodles", "dylan", "fun-emoji", "lorelei", "lorelei-neutral", "micah", "miniavs", "notionists", "notionists-neutral", "open-peeps", "personas", "thumbs"];

export function generateRandomAvatar() {
	const randomStyle = avatarStyles[Math.floor(Math.random() * avatarStyles.length)];
	const randomSeed = Math.random().toString(36).substring(2, 15);
	const flip = [true, false][Math.floor(Math.random() * 2)];
	return `https://api.dicebear.com/9.x/${randomStyle}/svg?seed=${randomSeed}&&flip=${flip}`;
}
