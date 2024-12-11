import UserDto from "../dtos/user-dto";
import userService from "../services/user-service";

class ActivateController {
	async activate(req, res) {
		// Activation logic
		const { name, avatar } = req.body;
		if (!name) {
			return res.status(400).json({ message: "Name is required" });
		}


    console.log(name, req.file);
    

		if (!avatar && !req.file?.location) {
			return res.status(400).json({ message: "Avatar is required" });
		}

		const userId = req.user._id;
		// Update user
		try {
			const user = await userService.findUser({ _id: userId });
			if (!user) {
				res.status(404).json({ message: "User not found!" });
			}
			user.activated = true;
			user.name = name;
			user.avatar = req.file?.location || avatar;
			user.save();
			res.json({ user: new UserDto(user), auth: true });
		} catch (err) {
			res.status(500).json({ message: "Something went wrong!" });
		}
	}
}

export default new ActivateController();
