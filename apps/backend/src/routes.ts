const router = require("express").Router();

import activateController from "./controllers/activate-controller";
import authController from "./controllers/auth-controller";
import authMiddleware from "./middlewares/auth-middleware";
import multerObj from "./middlewares/upload-middleware";
import roomsController from "./controllers/rooms-controller";
import tokenService from "./services/token-service";
import userService from "./services/user-service";
var passport = require("passport");



router.get("/auth/facebook", passport.authenticate("facebook",{scope: ['public_profile', 'email']}));

router.get("/oauth2/redirect/facebook", passport.authenticate("facebook", { session: false }), async (req, res) => {
	try {
		const user = req.user;
		if (!user || !user.email) {
			throw Error();
		}

		const { accessToken, refreshToken } = tokenService.generateTokens({ _id: user._id });
		await tokenService.storeRefreshToken(refreshToken, user.id);

		res.cookie("refreshToken", refreshToken, {
			maxAge: 365 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});

		res.cookie("accessToken", accessToken, {
			maxAge: 24 * 60 * 60 * 1000,
			httpOnly: true,
		});
		return res.status(301).redirect(process.env.FRONT_URL + "/meetings");
	} catch (err) {
		console.log(err);
		return res.status(301).redirect(process.env.FRONT_URL + "/authenticate");
	}
});

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/google/callback", passport.authenticate("google", { session: false }), async (req, res) => {
	try {
		const user = req.user;
		if (!user) {
			throw Error();
		}
		const { accessToken, refreshToken } = tokenService.generateTokens({ _id: user._id });

		await tokenService.storeRefreshToken(refreshToken, user.id);

		res.cookie("refreshToken", refreshToken, {
			maxAge: 365 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});

		res.cookie("accessToken", accessToken, {
			maxAge: 24 * 60 * 60 * 1000,
			httpOnly: true,
		});
		return res.status(301).redirect(process.env.FRONT_URL + "/meetings");
	} catch (err) {
		console.log(err);
		return res.status(301).redirect(process.env.FRONT_URL + "/authenticate");
	}
});

router.post("/api/send-otp", authController.sendOtp);
router.post("/api/verify-otp", authController.verifyOtp);
router.post("/api/activate", authMiddleware, multerObj.single("avatar"), activateController.activate);
router.get("/api/refresh", authController.refresh);
router.post("/api/logout", authMiddleware, authController.logout);
router.post("/api/rooms", authMiddleware, roomsController.create);
router.get("/api/rooms", authMiddleware, roomsController.index);
router.get("/api/rooms/:roomId", authMiddleware, roomsController.show);

export default router;
