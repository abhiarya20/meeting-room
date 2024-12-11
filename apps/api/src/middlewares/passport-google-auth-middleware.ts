import passport from "passport";
import userService from "../services/user-service";

const GoogleStrategy = require("passport-google-oauth20").Strategy;

class GoogleAuthProvider {
	clientSecret: string | undefined;
	clientId: string | undefined;
	callbackURL: string;
	constructor() {
		this.clientSecret = process.env.AUTH_GOOGLE_SECRET;
		this.clientId = process.env.AUTH_GOOGLE_ID;
		this.callbackURL = process.env.BASE_URL + "/auth/google/callback";
	}

	strategy = () => {
		return new GoogleStrategy(
			{
				clientID: this.clientId,
				clientSecret: this.clientSecret,
				callbackURL: this.callbackURL,
			},
			async (accessToken, refreshToken, profile, done) => {
				try {
					const { sub: id, name, email, picture } = profile._json;

					let user = await userService.findUser({ email });
					if (!user) {
						user = await userService.createUser({ googleId: id, name, avatar: picture, email });
					}

					return done(null, user);
				} catch (e) {
					return done(null, null);
				}
			}
		);
	};
}

export default GoogleAuthProvider;
