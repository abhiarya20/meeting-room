import passport from "passport";
import userService from "../services/user-service";

const FacebookStrategy = require("passport-facebook").Strategy;


class FacebookAuthProvider {
	constructor() {
		this.clientSecret = process.env.AUTH_FACEBOOK_SECRET;
		this.clientId = process.env.AUTH_FACEBOOK_ID;
		this.callbackURL = process.env.BASE_URL + "/oauth2/redirect/facebook";
	}

	strategy = () => {
		return new FacebookStrategy(
			{
				clientID: this.clientId,
				clientSecret: this.clientSecret,
				callbackURL: this.callbackURL,
				profileFields: ["id", "displayName", "picture", "email"],
			},
			async (accessToken, refreshToken, profile, done) => {
				try {
					const { id, name, email, picture } = profile._json;
					let user = await userService.findUser({ $or: [{ email }, { facebookId: id }] });
					if (!user) {
						user = await userService.createUser({ facebookId: id, name, avatar: picture?.data?.url, email });
					}
					return done(null, user);
				} catch (e) {
					return done(null, {});
				}
			}
		);
	};
}

export default FacebookAuthProvider;
